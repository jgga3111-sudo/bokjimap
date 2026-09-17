import { services } from "@/data/services";
import { placeLabel } from "@/lib/display";
import { norm } from "@/lib/searchText";
import { nameWithAlias, searchableNames } from "@/lib/aliases";
import { BENEFITS } from "@/lib/benefits";
import { sidoBySlug } from "@/lib/regions";
import { formsOf, type AskRead, type Chip } from "@/lib/askParse";

/**
 * 읽어 낸 조건과 낱말로 900건을 좁힌다 — **서버에서만 쓴다.**
 *
 * ⚠ 이 파일을 클라이언트 컴포넌트에서 import하면 `services.ts` 1.8MB가
 * 통째로 번들에 실린다(`lib/searchFull.ts`의 경고와 같은 함정).
 *
 * ── 조건은 AND, 낱말은 OR ──────────────────────────────────────
 * 조건(생애주기·대상·혜택·지역)은 사람이 자기를 설명한 것이라 **모두**
 * 걸어야 한다. 낱말은 다르다. "서울 사는 30대인데 월세 지원 있나요"에서
 * 남는 낱말이 「월세」 하나면 괜찮지만 두셋이 되면 AND로는 늘 0건이 된다
 * (`/search`가 AND인 것은 사람이 직접 고른 짧은 질의이기 때문이다).
 *
 * 그래서 **몇 개가 걸렸는지를 1순위, 점수를 2순위**로 세운다. 다 걸린 것이
 * 위로 오므로 결과는 AND처럼 보이면서, 하나도 안 걸려도 0건이 되지 않는다.
 *
 * ── 못 찾은 낱말은 못 찾았다고 적는다 ──────────────────────────
 * 낱말이 하나도 안 걸리면 조건만으로 좁힌 목록이 조회수순으로 나온다.
 * 그 화면은 **잘 찾아 준 것처럼 보이지만 사실 질문의 절반을 버린 것**이다.
 * 어느 낱말을 못 찾았는지 돌려주고 화면에 그대로 적는다.
 */

export type AskHit = {
  id: string;
  name: string;
  place: string;
  dept: string;
  /** 이름 밖에서 걸렸을 때, 어디에 걸렸는지 보여줄 본문 조각. */
  snippet: string | null;
};

export type AskAnswer = {
  /** 낱말까지 걸린 것 — 질문에 곧바로 답하는 몫. */
  matchedHits: AskHit[];
  /** 낱말은 안 걸렸지만 조건에는 맞는 것 — 아래에 따로 붙인다. */
  otherHits: AskHit[];
  /** 실제로 건 조건. */
  applied: Chip[];
  /** 0건이라 도로 뺀 조건 — 뺐다는 사실을 화면에 적는다. */
  dropped: Chip[];
  /** 어디엔가 걸린 낱말. `via`는 바꿔서 찾았을 때의 원문 말(병원비 → 의료비). */
  usedWords: { word: string; via: string | null }[];
  /** 900건 어디에도 없던 낱말. */
  missedWords: string[];
  /** 낱말까지 걸린 것의 전체 수(잘리기 전). */
  matchedTotal: number;
  /** 조건만으로 좁혔을 때의 수. */
  poolTotal: number;
};

/** 본문 — `lib/searchFull.ts`가 실측으로 고른 조합과 같게 둔다. */
const bodyOf = (s: (typeof services)[number]) =>
  [s.summary, s.supportContent, s.eligibility].filter(Boolean).join(" ");

/** 걸린 자리 앞뒤를 원문에서 잘라 온다(`lib/searchFull.ts`와 같은 규칙). */
function snippetOf(body: string, token: string): string | null {
  const at = body.toLowerCase().indexOf(token);
  if (at < 0) return null;
  const from = Math.max(0, at - 30);
  const to = Math.min(body.length, at + token.length + 60);
  return (
    (from > 0 ? "…" : "") +
    body.slice(from, to).trim() +
    (to < body.length ? "…" : "")
  );
}

/* 혜택 슬러그 → 지급형태 원문 값. `lib/benefits.ts`가 가진 표를 그대로 쓴다. */
const BENEFIT_VALUES = new Map(
  BENEFITS.map((b) => [b.slug, b.values as readonly string[]] as const),
);

/**
 * 조건 하나를 건다. 축마다 보는 필드가 다르다.
 *
 * 지역은 `/find`와 **같은 범위**로 본다 — 그 지역 지자체 사업 + 전국 공통.
 * 한쪽만 고치면 같은 조건인데 두 화면이 다른 답을 낸다.
 */
function passes(
  s: (typeof services)[number],
  chip: Chip,
  sidoFullName: string | null,
): boolean {
  switch (chip.axis) {
    case "life":
      return s.lifeStages.includes(chip.slug);
    case "target":
      return s.targets.includes(chip.slug);
    case "benefit":
      return s.payTypes.some((p) => BENEFIT_VALUES.get(chip.slug)?.includes(p));
    case "region":
      return s.sidoName === sidoFullName || s.provider === "central";
  }
}

/**
 * ── 혜택은 **거르지 않고 올리기만 한다** (2026-09-09) ────────────────
 * 처음에는 혜택도 조건으로 걸었다. 「기초생활수급자 전기요금 감면」을 넣어
 * 보니 저소득 + 요금감면 24건이 나오는데 **정작 「전기요금 복지할인」이
 * 빠져 있었다.** 원본이 그 사업의 지급형태를 「감면」이 아니라 **「현금지급」**
 * 으로 분류해 놨기 때문이다(실측: payTypes `["현금지급"]`).
 *
 * 지급형태는 원본이 매긴 값이라 우리가 고칠 수 없고, 걸러 내는 데 쓰면
 * **가장 맞는 답이 조용히 사라진다.** 대신 본문에는 "요금감면을 지원합니다"가
 * 그대로 있다 — 낱말로 찾으면 걸린다. 그래서 혜택은 조건에서 빼고 **점수만**
 * 준다. 「현금으로 받고 싶다」처럼 본문에 안 적히는 말도 있어서 축 자체를
 * 버리지는 않는다(현금지급 481건 대 본문에 「현금」 46건).
 *
 * 5절의 「중앙과 지자체는 주는 필드가 다르다」와 같은 자리다 — 필드가 있다고
 * 축으로 쓸 수 있는 것은 아니다.
 */
const BENEFIT_BOOST = 40;

/**
 * 조건을 뺄 때의 순서.
 *
 * 뒤엣것부터 뺀다. 지역을 마지막까지 붙드는 이유 — "서울"이라고 말한 사람에게
 * 전국 결과를 주면 조건을 못 알아들은 것처럼 보인다. 혜택은 애초에 거르지
 * 않으므로(위 참고) 뺄 것도 없다.
 */
const DROP_ORDER: Chip["axis"][] = ["target", "life", "region"];

/** 낱말까지 걸린 것 / 조건만 맞는 것을 각각 몇 개까지 보일지. */
const MAX_MATCHED = 40;
const MAX_OTHER = 20;

export function askSearch(read: AskRead): AskAnswer {
  /* 낱말 하나가 여러 형태로 걸릴 수 있다 — 사람 말과 원문 말이 다른 자리
     (`lib/askParse.ts`의 SYNONYMS). 어느 형태로 걸렸는지도 들고 다닌다. */
  const words = read.words
    .map((w) => ({
      raw: w,
      forms: formsOf(w)
        .map((f) => ({ raw: f, n: norm(f) }))
        .filter((f) => f.n),
    }))
    .filter((w) => w.forms.length > 0);

  /* 조건을 다 걸어 보고, 0건이면 하나씩 빼면서 다시 센다. 어디까지 뺐는지를
     그대로 돌려준다 — 조용히 빼면 "왜 서울 아닌 게 나오지"가 된다. */
  let applied = [...read.chips];
  const dropped: Chip[] = [];
  const sidoFull = (c: Chip) =>
    c.axis === "region" ? (sidoBySlug(c.slug)?.fullName ?? null) : null;

  /* 이름을 적어 물은 사업(09-15). 「부모급여 아동수당 같이」에서 「아동」이 조건이
     되자 생애주기가 영유아뿐인 부모급여가 걸러져 사라졌다. 사람이 이름을 댄 사업은
     생애주기·대상 조건으로 거르지 않는다 — 지역은 그대로 건다("서울 청년월세"에
     인천형이 섞이면 안 된다). 낱말로 걸리지 않은 통째 이름은 점수만 올린다. */
  const nameForms = new Map(
    services.map((s) => [s.id, searchableNames(s.id, s.name).map(norm)] as const),
  );
  const wordNorms = new Set(read.words.map(norm));
  const extraNames = read.names.filter((x) => !wordNorms.has(x.name));
  /* 이름의 **대부분**을 댄 경우만 친다(질문 낱말이 이름 길이의 60% 이상). 「기초생활수급자」는
     「기초생활수급자 명절 위로금 지원」의 앞머리일 뿐 그 사업을 가리킨 말이 아니다. */
  const namedBy = (s: (typeof services)[number], list: AskRead["names"]) =>
    list.filter((x) =>
      nameForms.get(s.id)!.some((nm) => nm.includes(x.name) && x.name.length >= nm.length * 0.6),
    );

  /* 생애주기·대상 칸이 **빈** 사업은 조건으로 거르지 않는다(09-15). 910건 중
     lifeStages가 빈 것 241건, targets가 빈 것 459건 — 조회수 22위 「한부모가족
     아동양육비」가 생애주기가 비어 「한부모 아동양육비」에서 사라졌다. 원본이 칸을
     안 채운 것이지 조건에 안 맞는 것이 아니다(주제·혜택을 거르지 않는 것과 같은 이유).
     다만 **낱말까지 걸린 것만** 보인다 — 칸이 빈 사업을 「조건에 맞는 것」으로
     내보내면 그건 우리가 맞다고 말하는 셈이다(아래 unknownIds). */
  const unknownIds = new Set<string>();
  const passesOrBlank = (s: (typeof services)[number], c: Chip) => {
    if (passes(s, c, sidoFull(c))) return true;
    const blank =
      (c.axis === "life" && s.lifeStages.length === 0) ||
      (c.axis === "target" && s.targets.length === 0);
    if (blank) unknownIds.add(s.id);
    return blank;
  };

  /* 혜택은 거르는 데 안 쓴다(위 BENEFIT_BOOST 주석). */
  const filter = (chips: Chip[]) => {
    unknownIds.clear();
    return services.filter((s) => {
      const named = namedBy(s, read.names);
      return chips.every(
        (c) =>
          c.axis === "benefit" ||
          /* 이름을 댄 사업은 그 이름과 무관한 생애주기·대상 조건, 또는 그 이름
             안에서 나온 조건으로 거르지 않는다. */
          ((c.axis === "life" || c.axis === "target") &&
            named.some((x) => x.covers.length === 0 || x.covers.includes(norm(c.from)))) ||
          passesOrBlank(s, c),
      );
    });
  };

  let pool = filter(applied);
  while (pool.length === 0 && applied.length > 0) {
    const axis = DROP_ORDER.find((a) => applied.some((c) => c.axis === a));
    const idx = applied.findIndex((c) => c.axis === axis);
    dropped.push(applied[idx]);
    applied = applied.filter((_, i) => i !== idx);
    pool = filter(applied);
  }

  /** 걸린 낱말 → 실제로 걸린 형태. 자기 자신으로 걸렸으면 값이 자기 자신이다. */
  const hitWords = new Map<string, string>();
  const scored: {
    s: (typeof services)[number];
    matched: number;
    score: number;
    bodyToken: string | null;
  }[] = [];

  for (const s of pool) {
    const body = norm(bodyOf(s));
    const place = norm(placeLabel(s));
    const forms = nameForms.get(s.id)!;

    let matched = 0;
    let score = 0;
    let bodyToken: string | null = null;

    for (const w of words) {
      let best = 0;
      let via: string | null = null;
      let bodyForm: string | null = null;

      /* 형태를 앞에서부터 본다 — 자기 자신이 맨 앞이라, 그걸로 걸리면
         굳이 바꿔 찾았다고 말하지 않는다. */
      for (const f of w.forms) {
        let here = 0;
        for (const n of forms) {
          if (n.startsWith(f.n)) {
            here = 100;
            break;
          }
          if (n.includes(f.n)) here = Math.max(here, 50);
        }
        /* 시·군·구 이름은 축이 아니라 낱말로 걸린다. "성남시 청년"에서
           「성남시」가 여기서 잡힌다 — 시·군·구를 축으로 만들면 171개짜리
           표가 하나 더 는다. */
        /* 담당 부서 이름은 보지 않는다(09-15). 「치매 부모님 돌봄」의 1위가 부서
           「미래교육돌봄국」에 걸린 구미 청년월세였다 — 부서 이름은 사업 내용이 아니다. */
        if (here === 0 && place.includes(f.n)) here = 12;
        if (here === 0 && body.includes(f.n)) {
          here = 6;
          bodyForm = f.raw;
        }
        if (here > best) {
          best = here;
          via = f.raw;
        }
        if (best === 100) break;
      }

      if (best > 0) {
        matched += 1;
        score += best;
        if (!hitWords.has(w.raw)) hitWords.set(w.raw, via ?? w.raw);
        if (best === 6) bodyToken ??= bodyForm ?? w.raw;
      }
    }

    if (extraNames.length && namedBy(s, extraNames).length) {
      matched += 1;
      score += 100;
    } else if (extraNames.some((x) => forms.some((nm) => nm.includes(x.name)))) {
      /* 이름의 일부만 댄 경우(「아동양육비」 → 「한부모가족 아동양육비 지원」)는 개수는
         안 늘리고 같은 개수 안에서만 위로 올린다. */
      score += 60;
    }

    /* 혜택은 걸러 내지 않고 위로 올리기만 한다. */
    for (const c of applied)
      if (c.axis === "benefit" && passes(s, c, null)) score += BENEFIT_BOOST;

    score += Math.log10(s.views + 1);
    scored.push({ s, matched, score, bodyToken });
  }

  /* 몇 개가 걸렸는지가 1순위. 같은 개수 안에서 점수로 가른다. */
  scored.sort((a, b) => b.matched - a.matched || b.score - a.score);

  /*
    ── 낱말이 걸린 것과 조건만 맞는 것을 **가른다** ──────────────────
    09-09에 두 번 고친 자리다. 어느 쪽으로 몰아도 답이 나빴다.

    ㉠ 처음에는 조건에 맞는 것을 **전부** 점수순으로 냈다. "서울 사는
       30대인데 월세 지원 있나요"의 위 넷은 월세 사업이 맞는데 다섯째부터
       장애인연금·정신건강 바우처가 나왔다. 낱말이 하나도 안 걸린 채
       조회수로만 올라온 것들인데, "122건"이라고만 적어 두니 읽는 사람은
       "월세로 122건이 있구나"로 읽는다.

    ㉡ 그래서 안 걸린 것을 **뺐더니** 이번엔 "혼자 아이 키우는데"가
       한부모 117건에서 4건으로 줄고, 정작 「한부모가족 아동양육비」가
       사라졌다. 원인은 낱말이 나빠서가 아니라 **관공서 문장이 「아이」를
       안 쓰기 때문**이다 — 원문은 아동·자녀라고 쓴다. 사람의 말과 원문의
       말이 어긋나는 자리에서 걸러 내면 좋은 것부터 없어진다.

    그래서 **자르지 말고 가른다.** 낱말까지 걸린 것을 먼저 내고, 조건만
    맞는 것을 그 아래 따로 붙인다. 화면에서 그 경계에 줄을 긋고 무엇이
    달라지는지 적는다. 어느 쪽도 버리지 않으면서, 읽는 사람이 "이건 내가
    말한 낱말로 찾은 것"과 "조건만 맞는 것"을 구분할 수 있다.
  */
  const toHit = ({
    s,
    bodyToken,
  }: {
    s: (typeof services)[number];
    bodyToken: string | null;
  }): AskHit => ({
    id: s.id,
    name: nameWithAlias(s.id, s.name),
    place: placeLabel(s),
    dept: s.department ?? "",
    snippet: bodyToken ? snippetOf(bodyOf(s), norm(bodyToken)) : null,
  });

  const matched = scored.filter((x) => x.matched > 0);
  const rest = scored.filter((x) => x.matched === 0 && !unknownIds.has(x.s.id));
  /* 지역을 말했으면 조건만 맞는 것 중 **그 지역 사업을 먼저**(09-17). 조회수로만
     세우면 전국 사업이 위를 다 차지한다 — 「경기도 사는 28살 직장인」의 첫 20건에
     경기도 사업이 0건이었다. sort는 안정 정렬이라 같은 무리 안의 순서는 그대로다. */
  if (applied.some((c) => c.axis === "region"))
    rest.sort((a, b) => Number(b.s.provider !== "central") - Number(a.s.provider !== "central"));

  return {
    matchedHits: matched.slice(0, MAX_MATCHED).map(toHit),
    otherHits: rest.slice(0, MAX_OTHER).map(toHit),
    applied,
    dropped,
    usedWords: read.words
      .filter((w) => hitWords.has(w))
      .map((w) => ({ word: w, via: hitWords.get(w) === w ? null : hitWords.get(w)! })),
    missedWords: read.words.filter((w) => !hitWords.has(w)),
    matchedTotal: matched.length,
    poolTotal: matched.length + rest.length,
  };
}
