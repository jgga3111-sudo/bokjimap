/**
 * 상세 「신청 전 체크」의 용어 풀이 줄 (2026-09-28).
 *
 * 원문이 설명 없이 쓰는 말이 본문에 있으면 `/guide/terms`의 그 항목으로 잇는다.
 * id는 terms 페이지의 앵커 id와 같아야 한다(거기 TERMS 표). 지급형태·주기 말(바우처
 * 빼고)은 이미 상세 위쪽 핵심 칸이 풀어 주므로 넣지 않는다. 「사회보장급여」는 910건 중
 * 한 건에만 나와 뺐다.
 */
export const TERM_CHIPS = [
  { id: "median", word: "기준 중위소득", re: /중위\s*소득/ },
  { id: "recognized-income", word: "소득인정액", re: /소득\s*인정액/ },
  { id: "near-poor", word: "차상위계층", re: /차상위/ },
  { id: "supporter", word: "부양의무자", re: /부양\s*의무자/ },
  { id: "voucher", word: "바우처", re: /바우처/ },
] as const;

/** 본문 조각들에 나오는 용어. 없으면 빈 배열. */
export const termsIn = (...texts: (string | null | undefined)[]) => {
  const t = texts.filter(Boolean).join(" ");
  return TERM_CHIPS.filter((c) => c.re.test(t));
};
