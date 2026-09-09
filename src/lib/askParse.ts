import { norm } from "@/lib/searchText";
import { TARGETS, LIFE_STAGES } from "@/lib/axes";
import { BENEFITS } from "@/lib/benefits";
import { SIDO_LIST } from "@/lib/regions";

/**
 * 말로 물어본 질문을 **조건과 낱말로 가른다.**
 *
 * ── 왜 필요했나 ────────────────────────────────────────────────
 * 찾는 길이 셋 있었는데 셋 다 **먼저 축을 알아야** 쓸 수 있었다.
 * 헤더 검색은 이름을 알아야 하고(`lib/search.ts`), 축 페이지와 `/find`는
 * "생애주기"·"대상"이 무엇인지 알아야 한다. 그런데 처음 온 사람이 품고
 * 오는 것은 축이 아니라 문장이다 — "서울 사는 30대인데 월세 지원 있나요".
 *
 * ── 이건 AI가 아니다 ───────────────────────────────────────────
 * 모델을 부르지 않는다. **질문에 있는 낱말을 표와 대조할 뿐이다.** 그래서
 * 화면에도 "이렇게 읽었습니다"를 반드시 펼쳐 보여주고, 틀리게 읽었으면
 * 사람이 지울 수 있게 한다. 알아듣는 척하면서 조용히 좁히면, 안 나온 것이
 * 없는 것인지 못 읽은 것인지 구분할 방법이 사라진다.
 *
 * **자격 판정은 하지 않는다**(CLAUDE.md 3절). 여기서 하는 일은 900건을
 * 좁혀 주는 것까지다. 소득 금액이 보이면 판정하지 않고 `/check`로 보낸다.
 *
 * ── 주제(themes)를 조건으로 쓰지 않는 이유 ─────────────────────
 * `themes`는 **중앙부처 사업에만 붙는다**(900건 중 329건, 전부 central).
 * "주거"를 조건으로 걸면 지자체 570건이 통째로 사라지는데, 화면에는
 * 그냥 결과가 적게 나온 것처럼 보인다. 5절의 「중앙과 지자체는 주는 필드가
 * 다르다」가 그대로 걸리는 자리다. 그래서 주제어는 **조건이 아니라 찾을
 * 낱말**로 넘긴다 — 본문 검색은 양쪽 다 걸린다.
 *
 * 이 파일은 데이터를 import하지 않는다(축 목록만 읽는다). 시·군·구 이름은
 * 900건을 봐야 알 수 있으므로 `/ask`(서버)가 따로 맞춘다.
 */

export type Axis = "life" | "target" | "benefit" | "region";

export type Chip = {
  axis: Axis;
  slug: string;
  label: string;
  /** 질문의 **어느 낱말** 때문에 이렇게 읽었는지. 화면에 그대로 보여준다. */
  from: string;
};

export type AskRead = {
  chips: Chip[];
  /** 조건으로 못 바꾼 낱말들 — 이름·본문에서 찾는다. */
  words: string[];
  /** 나이를 생애주기로 읽었을 때만 값이 있다(그 사실을 화면에 밝힌다). */
  ageUsed: number | null;
  /** 소득 금액으로 읽은 것. 판정하지 않고 `/check`를 권한다. */
  incomeSeen: boolean;
};

/* ── 낱말 표 ──────────────────────────────────────────────────────
   전부 **사람이 실제로 치는 말**이다. 축 이름(저소득)만 적어 두면 축을
   아는 사람만 쓸 수 있어서, 축을 모르는 사람이 쓰는 말을 같이 담는다.

   넣지 않은 것도 이유가 있다.
   · 집·카드·상담 — 너무 흔해 엉뚱한 데 걸린다("우리 집에서는",
     "신용카드", "상담 받고 싶어요"). 좁힌 형태만 넣는다.
   · 외국인 — 축은 「다문화·탈북민」이라 외국인 일반과 같지 않다.
   · 60대 — 노년(65세~)과 중장년의 경계에 걸친다. 나이 숫자로 들어오면
     아래 bandOf가 처리하므로 표에는 두지 않는다.
   ──────────────────────────────────────────────────────────────── */

const LIFE_WORDS: Record<string, readonly string[]> = {
  pregnancy: ["임신", "출산", "임산부", "산모", "난임", "산후", "조리원"],
  infant: ["영유아", "신생아", "아기", "기저귀", "분유", "어린이집", "유아"],
  child: ["아동", "어린이", "초등학생", "초등", "취학"],
  teen: ["청소년", "중학생", "고등학생", "중고생", "학교밖청소년"],
  youth: ["청년", "대학생", "취준생", "사회초년생", "20대", "30대", "이십대", "삼십대"],
  "middle-age": ["중장년", "중년", "장년", "40대", "50대", "사십대", "오십대"],
  senior: ["노년", "노인", "어르신", "고령", "경로", "은퇴", "70대", "80대", "할머니", "할아버지"],
};

const TARGET_WORDS: Record<string, readonly string[]> = {
  "low-income": [
    "저소득", "기초생활", "기초수급", "수급자", "차상위", "빈곤",
    "형편이어려", "생활이어려", "생계가어려",
  ],
  disability: ["장애인", "장애", "발달장애", "지체장애", "중증장애"],
  veteran: ["보훈", "국가유공자", "유공자", "참전", "상이군경"],
  /* 「혼자 아이 키우는데」는 낱말이 붙어 있지 않다. `&`로 이은 것은 **둘 다
     있어야** 걸린다(아래 `pick` 참고). 09-09에 "혼자키우"만 적어 뒀다가
     정작 사람들이 쓰는 어순에서 하나도 안 걸리는 것을 보고 고쳤다. */
  "single-parent": [
    "한부모", "미혼모", "미혼부", "조손",
    "혼자&키우", "혼자&아이", "홀로&키우", "홀로&아이", "혼자서&키우",
  ],
  "multi-child": ["다자녀", "셋째", "세자녀", "두자녀"],
  multicultural: ["다문화", "결혼이민", "탈북", "북한이탈", "이주여성"],
};

const BENEFIT_WORDS: Record<string, readonly string[]> = {
  cash: ["현금", "돈으로", "수당", "현금지원", "매달받"],
  voucher: ["바우처", "이용권", "국민행복카드", "문화누리"],
  discount: ["감면", "할인", "요금할인"],
  loan: ["융자", "대출", "빌리", "빌려"],
  goods: ["현물", "물품"],
  service: ["돌봄서비스", "방문서비스", "시설입소"],
  "local-currency": ["지역화폐", "지역상품권"],
};

/** 시·도는 이름이 짧아 별칭이 필요하다(전남과 광주가 한 축이다). */
const REGION_WORDS: Record<string, readonly string[]> = {
  seoul: ["서울"],
  busan: ["부산"],
  daegu: ["대구"],
  incheon: ["인천"],
  daejeon: ["대전"],
  ulsan: ["울산"],
  sejong: ["세종"],
  gyeonggi: ["경기"],
  gangwon: ["강원"],
  chungbuk: ["충북", "충청북도"],
  chungnam: ["충남", "충청남도"],
  jeonbuk: ["전북", "전라북도"],
  "jeonnam-gwangju": ["전남", "전라남도", "광주"],
  gyeongbuk: ["경북", "경상북도"],
  gyeongnam: ["경남", "경상남도"],
  jeju: ["제주"],
};

/**
 * 나이 → 생애주기.
 *
 * ⚠ 이건 **판정이 아니라 목록을 좁히는 자**다. 청년의 상한은 사업마다
 * 34세이기도 39세이기도 해서, 여기 그은 선이 곧 자격선은 아니다. 화면에
 * "나이 기준은 사업마다 다릅니다"를 반드시 함께 적는다.
 */
function bandOf(age: number): string | null {
  if (age < 0 || age > 120) return null;
  if (age <= 5) return "infant";
  if (age <= 12) return "child";
  if (age <= 18) return "teen";
  if (age <= 39) return "youth";
  if (age <= 64) return "middle-age";
  return "senior";
}

/**
 * 조사와 어미. **긴 것부터** 떼어 본다. 떼고 두 글자가 안 남으면 안 뗀다.
 *
 * 순서가 중요하다. "부담됩니다"에서 「니다」를 먼저 떼면 「부담됩」이 남는다.
 * 「됩니다」가 앞에 있어야 「부담」이 나온다.
 */
const PARTICLES = [
  "됩니다", "입니다", "합니다", "습니다", "했어요", "이에요", "인데요",
  "에서는", "으로는", "이라도", "해서요", "네요", "군요", "나요", "까요",
  "해요", "어요", "아요", "한테", "에게", "에서", "으로", "인데", "까지",
  "부터", "이나", "라도", "처럼", "만큼", "는데", "은데", "이랑", "하고",
  "라서", "해서", "라고",
  "은", "는", "이", "가", "을", "를", "에", "로", "도", "만", "의", "랑",
];

/**
 * 사람이 쓰는 말 → 원문이 쓰는 말.
 *
 * ── 넣는 기준(2026-09-09 실측) ─────────────────────────────────
 * ㉠ 사람 말이 수록 900건의 이름·본문에 **0건**일 것
 * ㉡ 원문 말은 여러 건 있을 것
 *
 * 둘 다여야 넣는다. `lib/aliases.ts`가 별칭을 넣을 때 쓰는 방식과 같다 —
 * 짐작으로 늘리지 않고 **세어 보고** 넣는다. 실측:
 *
 *     병원비 0 → 의료비 58 · 약값 0 → 약제비 9 · 전기세 0 → 전기요금 10
 *     가스비 0 → 가스요금 3 · 수도세 0 → 수도요금 11 · 집세 0 → 임차료 9
 *     밥값 0 · 끼니 0 → 급식 20
 *
 * **탈락시킨 것도 적어 둔다**(다시 후보로 올라오지 않게). 치료비 19 ·
 * 진료비 24 · 등록금 12 · 학원비 7 · 차비 4 · 간병비 9 — 사람 말이 이미
 * 원문에 있어서 바꿔 줄 이유가 없다. 목록이 길어지면 기준이 느슨해진
 * 것이니 위 두 줄을 다시 읽는다.
 *
 * 화면에는 **바꿔서 찾았다고 적는다** — "병원비 → 의료비로 찾음".
 * 조용히 바꾸면 왜 이 결과가 나왔는지 설명할 길이 없다.
 */
export const SYNONYMS: Record<string, readonly string[]> = {
  병원비: ["의료비"],
  약값: ["약제비"],
  전기세: ["전기요금"],
  가스비: ["가스요금"],
  수도세: ["수도요금"],
  집세: ["임차료"],
  밥값: ["급식"],
  끼니: ["급식"],
};

/** 낱말 하나가 걸릴 수 있는 형태들 — 자기 자신이 먼저다. */
export const formsOf = (word: string): string[] => [
  word,
  ...(SYNONYMS[word] ?? []),
];

/**
 * 질문에서 빼는 말 — 어느 질문에나 붙어 있어 찾는 데 도움이 안 된다.
 * "지원금"·"복지"를 남기면 900건이 거의 다 걸려 순위가 조회수순으로 무너진다.
 */
const STOP = new Set([
  "지원금", "지원", "혜택", "복지", "정부", "나라", "제도", "사업", "정책",
  "무엇", "뭐가", "뭔가", "있나요", "있나", "있어요", "있을까요", "있을까",
  "알려줘", "알려주세요", "알려", "받을수", "받을", "받는", "받고", "받나요",
  "싶어요", "싶은", "싶습니다", "궁금", "어떤", "어떻게", "무슨", "저는",
  "제가", "나는", "내가", "현재", "지금", "요즘", "사는", "살고", "삽니다",
  "입니다", "이에요", "예요", "해주세요", "부탁", "가능한", "가능", "관련",
  "대해", "대한", "것들", "신청", "대상", "조건", "자격", "얼마", "해당",
  /* 뜻이 없는 조각들. 09-09에 「있는」 하나가 900건 중 275건에 걸려
     "혼자 아이 키우는데" 결과를 통째로 조회수순으로 만들었다. 어느 문장에나
     붙는 말은 **좁혀 주는 척만 하고 실제로는 순위만 흔든다.** */
  "있는", "있을", "없는", "없어", "없습니다", "되는", "하는", "한데",
  "그런", "이런", "저런", "같은", "정도", "여기", "거기", "우리", "그리고",
  "그런데", "혹시", "많이", "너무", "정말", "제일", "가장",
  /* 「부담」은 원문에도 흔한데("경제적 부담 경감") 질문에서는 심정을 말하는
     자리라 좁혀 주지 못한다. 「본인부담」처럼 붙은 말은 따로 잡히니 안전하다. */
  "부담", "어려", "힘들", "걱정", "고민",
  /* 「소득」·「기준」은 선정기준 문장에 거의 다 들어 있어 좁혀 주지 못한다.
     09-09에 "월 200만원 버는 35살인데 소득 기준 되나요"가 305건 중 201건에
     걸렸다 — 답이 아니라 목록이다. 소득을 물은 것은 아래 `incomeSeen`이
     따로 받아 `/check`로 보낸다. */
  "소득", "기준", "버는", "벌어", "되나", "되나요", "얼마나",
  /* "일자리 찾고 싶어요"의 「찾고」처럼, 무엇을 하겠다는 말은 찾을 대상이
     아니다. 남겨 두면 "「찾고」는 못 찾았습니다"가 화면에 나간다. */
  "찾고", "찾는", "찾아", "알아보", "보고", "듣고", "쓰고",
]);

/**
 * 숫자만 있는 말은 버린다 — "200만원"·"35살"·"3명".
 *
 * 질문에 적힌 금액과 나이는 **그 사람의 형편**이지 찾을 사업의 이름이
 * 아니다. 그대로 본문에서 찾으면 「대여한도 1,200만원」 같은 데 걸린다
 * (09-09 실측). 나이는 위에서 생애주기로 이미 읽었고, 금액은 `incomeSeen`이
 * 받아 `/check`로 보낸다.
 */
const NUMERIC = /^\d[\d,]*(만원|천원|원|살|세|년|개월|일|명|대|번|차)?$/;

const LABELS = {
  life: new Map(LIFE_STAGES.map((l) => [l.slug, l.label] as const)),
  target: new Map(TARGETS.map((t) => [t.slug, t.label] as const)),
  benefit: new Map(BENEFITS.map((b) => [b.slug, b.label] as const)),
  region: new Map(SIDO_LIST.map((s) => [s.slug, s.name] as const)),
};

/**
 * 표에서 **가장 긴** 낱말을 찾는다. 긴 쪽을 쓰는 이유 — "고등학생"이
 * "학생"보다, "기초생활"이 "생활"보다 정확한 신호다.
 *
 * `&`로 이은 것은 조각이 **전부** 들어 있어야 걸린다. 한국어는 어순이
 * 흔들려서("혼자 아이 키우는데" / "아이를 혼자 키워요") 붙은 낱말 하나로는
 * 못 잡는 신호가 있다. 길이는 조각을 합쳐 센다.
 */
function pick(
  flat: string,
  table: Record<string, readonly string[]>,
): { slug: string; from: string } | null {
  let best: { slug: string; from: string; len: number } | null = null;
  for (const [slug, words] of Object.entries(table)) {
    for (const w of words) {
      const parts = w.split("&");
      if (!parts.every((p) => flat.includes(norm(p)))) continue;
      const len = parts.join("").length;
      if (!best || len > best.len)
        best = { slug, from: parts.join(" "), len };
    }
  }
  return best ? { slug: best.slug, from: best.from } : null;
}

export function parseAsk(question: string): AskRead {
  const raw = question.trim();
  const flat = norm(raw);
  const chips: Chip[] = [];
  const consumed: string[] = [];

  const add = (axis: Axis, hit: { slug: string; from: string } | null) => {
    if (!hit) return;
    const label = LABELS[axis].get(hit.slug);
    if (!label) return;
    chips.push({ axis, slug: hit.slug, label, from: hit.from });
    consumed.push(norm(hit.from));
  };

  add("region", pick(flat, REGION_WORDS));
  add("life", pick(flat, LIFE_WORDS));
  add("target", pick(flat, TARGET_WORDS));
  add("benefit", pick(flat, BENEFIT_WORDS));

  /* 나이는 낱말로 못 읽었을 때만 쓴다. "청년"이라고 직접 말한 사람에게
     "35살"을 이유로 다른 칸을 켜 주면 스스로 고른 것을 뒤집는 셈이다. */
  let ageUsed: number | null = null;
  if (!chips.some((c) => c.axis === "life")) {
    const m = raw.match(/(\d{1,3})\s*(?:살|세)(?![0-9])/);
    const age = m ? Number(m[1]) : null;
    const band = age != null ? bandOf(age) : null;
    if (age != null && band) {
      add("life", { slug: band, from: `${age}세` });
      ageUsed = age;
    }
  }

  /* 소득 금액. **금액만으로는 안 읽는다** — "월세 50만원"은 소득이 아니다.
     소득을 가리키는 말이 함께 있을 때만 읽고, 읽어도 판정하지 않는다. */
  const incomeSeen =
    /소득|월급|연봉|수입|버는|벌어|건강보험료/.test(raw) && /\d/.test(raw);

  /* 남은 낱말 — 조건으로 못 바꾼 것들. 이름과 본문에서 찾는다. */
  const words: string[] = [];
  const seen = new Set<string>();
  for (const rawTok of raw.split(/[^0-9A-Za-z가-힣]+/)) {
    let t = rawTok;
    if (t.length < 2 || NUMERIC.test(t)) continue;

    /*
      조사·어미를 뗀다. **두 글자 이상짜리 어미가 걸리는데 남는 게 한 글자면
      그 낱말은 버린다** — 「되나요」→「되」, 「버는」은 남긴다. 한 글자 조사도
      같은 규칙으로 버리면 「아이」가 「아」가 되어 사라지므로, 한 글자짜리는
      **떼서 두 글자가 남을 때만** 뗀다. 09-09에 「되나요」가 낱말로 남아
      "어디에도 없습니다"로 나가는 것을 보고 갈랐다.
    */
    let dead = false;
    for (const p of PARTICLES) {
      if (!t.endsWith(p)) continue;
      if (t.length - p.length >= 2) t = t.slice(0, -p.length);
      else if (p.length >= 2) dead = true;
      break;
    }
    if (dead || t.length < 2 || STOP.has(t) || NUMERIC.test(t)) continue;
    const n = norm(t);
    /* 이미 조건이 된 말은 빼야 한다. "청년"이 칩이 됐는데 낱말로도 남으면
       청년 305건 안에서 다시 "청년"을 찾게 되어 순위가 흔들린다. */
    if (consumed.some((c) => c.includes(n) || n.includes(c))) continue;
    if (seen.has(n)) continue;
    seen.add(n);
    words.push(t);
  }

  return { chips, words, ageUsed, incomeSeen };
}
