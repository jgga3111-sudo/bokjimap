/**
 * 상세 「함께 보는 지원」 (2026-10-04).
 *
 * `/guide/combined-support`가 법령·지침·원문으로 **관계를 직접 확인한** 쌍만 적는다.
 * 비슷해 보이는 사업을 이어 붙이지 않는다 — 근거 없는 쌍은 곧 판정이다(3절).
 * `why`는 그 글이 적은 사실을 줄여 옮긴 것이고, 자세한 근거(조문·쪽수)는 글에 있다.
 * 번호는 `serviceExtras.ts`의 combined-support 목록 안에 있는 사업뿐이다.
 */
export type ServicePair = { a: string; b: string; why: string };

export const SERVICE_PAIRS: readonly ServicePair[] = [
  {
    a: "WLF00004657",
    b: "WLF00001171",
    why: "부모급여는 아동수당법 제4조제5항이 아동수당에 「추가로 지급」하는 것이라 함께 나옵니다.",
  },
  {
    a: "WLF00004657",
    b: "WLF00003250",
    why: "부모급여를 받으면서 어린이집 보육료를 쓰면 0세만 차액이 나옵니다(복지로 원문).",
  },
  {
    a: "WLF00003249",
    b: "WLF00001164",
    why: "장애인연금 기초급여는 기초연금과 함께 받을 수 없습니다(장애인연금법 제6조제5항). 65세가 되는 달부터 기초연금으로 바뀌며 따로 신청해야 합니다.",
  },
  {
    a: "WLF00004661",
    b: "WLF00003201",
    why: "청년월세는 주거급여로 받는 월 임차료 몫을 뺀 금액만 받습니다(복지로 원문).",
  },
];

/** 이 사업과 근거가 있는 짝 — 상대 사업 번호와 이유. */
export function pairsOf(id: string): { id: string; why: string }[] {
  return SERVICE_PAIRS.flatMap((p) =>
    p.a === id ? [{ id: p.b, why: p.why }] : p.b === id ? [{ id: p.a, why: p.why }] : [],
  );
}
