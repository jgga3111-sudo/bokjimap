import { services } from "@/data/services";
import { placeLabel } from "@/lib/display";
import { toChoseong, isChoseongQuery, norm } from "@/lib/searchText";

/**
 * 전문(全文) 검색 — **서버에서만 쓴다.**
 *
 * ⚠ 이 파일을 클라이언트 컴포넌트에서 import하면 `services.ts` 1.8MB가
 * 통째로 번들에 실린다. `lib/search.ts`의 경고와 같은 함정이다.
 * 헤더 검색창은 계속 가벼운 색인(`lib/search.ts`)을 쓰고, 여기는
 * `/search` 서버 컴포넌트만 부른다.
 *
 * ── 왜 본문까지 뒤지나 ──────────────────────────────────────────
 * 색인은 [id, 이름, 지역, 부처]뿐이라 **이름에 없는 낱말은 못 찾았다.**
 * 자주 칠 만한 20개 낱말로 재 봤다(2026-09-04, 수록 900건).
 *
 *     이름만                 137건  ·  "백신"·"도배"는 0건
 *     +요약                  181건  ·  0건 질의 사라짐
 *     +요약+지원내용          269건
 *     +요약+지원내용+지원대상  313건  ← 여기
 *
 * 2.3배다. 클라이언트 색인에 본문을 실으면 169~738KB가 늘지만,
 * 서버에서 돌리면 **번들이 0바이트도 안 늘어난다.** `/search`는 어차피
 * 색인 대상이 아니라(robots noindex) 정적 생성을 포기해도 잃는 게 없다.
 * ────────────────────────────────────────────────────────────────
 */

export type FullHit = {
  id: string;
  name: string;
  place: string;
  dept: string;
  /** 이름 밖에서 걸렸을 때, 어디에 걸렸는지 보여줄 본문 조각. */
  snippet: string | null;
};

/** 본문 — 어디까지 뒤질지. 위 측정에서 고른 조합이다. */
const bodyOf = (s: (typeof services)[number]) =>
  [s.summary, s.supportContent, s.eligibility].filter(Boolean).join(" ");

/**
 * 걸린 자리 앞뒤를 잘라 온다.
 *
 * 정규화된 문자열이 아니라 **원문에서** 찾는다. 정규화는 공백과 가운뎃점을
 * 지우기 때문에 위치가 원문과 어긋나, 그대로 자르면 엉뚱한 데가 나온다.
 * 원문에서 못 찾으면(띄어쓰기가 낀 질의 등) 조각 없이 넘어간다 —
 * 억지로 만들어 보여주느니 안 보여주는 편이 낫다.
 */
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

/**
 * 전부 점수순으로 준다.
 *
 * 등급은 `lib/search.ts`와 같은 규칙을 쓴다 — 이름 시작 100, 이름 포함 50,
 * 지역·부처 10. 여기에 **본문 포함 5**를 더한다. 본문 점수를 낮게 두는 이유는
 * "월세"를 쳤을 때 이름이 「청년월세 지원사업」인 것이, 지원내용 어딘가에
 * "월세"가 스치는 사업보다 항상 위여야 하기 때문이다.
 *
 * 여러 낱말은 **모두** 걸려야 한다. 다만 낱말마다 걸리는 자리는 달라도 된다
 * ("서울 치과" → 지역에서 서울, 본문에서 치과).
 */
export function searchFull(query: string): FullHit[] {
  const raw = query.trim();
  if (raw.length === 0) return [];

  const useCho = isChoseongQuery(raw);
  const tokens = raw.split(/\s+/).map(norm).filter(Boolean);
  if (tokens.length === 0) return [];

  const scored: { s: (typeof services)[number]; score: number; hitAt: string | null }[] =
    [];

  for (const s of services) {
    const body = bodyOf(s);
    const place = placeLabel(s);
    const name = useCho ? norm(toChoseong(s.name)) : norm(s.name);
    const meta = useCho
      ? norm(toChoseong(place + s.department))
      : norm(place + s.department);
    /* 초성 질의는 본문까지 초성으로 바꾸지 않는다. 본문은 한 건에 수백 자라
       초성으로 접으면 "ㅈㄴ"이 거의 모든 사업에 걸린다 — 뒤지는 의미가 없다. */
    const text = useCho ? "" : norm(body);

    let score = 0;
    let bodyToken: string | null = null;
    let matchedAll = true;

    for (const t of tokens) {
      if (name.startsWith(t)) score += 100;
      else if (name.includes(t)) score += 50;
      else if (meta.includes(t)) score += 10;
      else if (text.includes(t)) {
        score += 5;
        bodyToken ??= t;
      } else {
        matchedAll = false;
        break;
      }
    }
    if (!matchedAll) continue;

    score += Math.log10(s.views + 1);
    scored.push({ s, score, hitAt: bodyToken });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .map(({ s, hitAt }) => ({
      id: s.id,
      name: s.name,
      place: placeLabel(s),
      dept: s.department ?? "",
      snippet: hitAt ? snippetOf(bodyOf(s), hitAt) : null,
    }));
}
