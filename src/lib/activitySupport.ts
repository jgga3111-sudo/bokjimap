/**
 * 장애인활동지원 — 월 한도액과 본인부담금 (2026-09-25).
 *
 * 복지로 원문(조회수 34위, `WLF00003260`)은 "인정등급에 해당되는 만큼의 매월 일정액의 바우처"
 * "매월 일정액의 본인부담금"이라고만 적고 금액이 없다. 첨부 안내서는 2025년판이라 쓰지 않았고,
 * 보건복지부 「2026 장애인활동지원 사업안내」(법제처 생활법령 미러)에서 옮겼다.
 * **인쇄 쪽 = PDF 파일 쪽 − 34.**
 *
 * - 구간·월 한도액: 71쪽 표. 본인부담률·상한: 77~78쪽.
 * - 본인부담금 = 활동지원급여 월 한도액 × 본인부담률, 100원 미만 버림, 상한 216,200원(2026).
 *   이 규칙으로 78쪽 조견표 90칸을 전부 다시 만들 수 있는 것을 `scripts/verify-activity-support.mjs`가
 *   확인한다 — 옮겨 적은 한도액과 비율이 서로 맞는다는 교차 확인이다.
 *
 * ── 계산하지 않는 것 ───────────────────────────────────────────
 * 종합점수(방문조사 결과)·소득 구간(건강보험료 조견표)은 공단과 시·군·구가 정한다 — 고르는 값이다.
 * 가족인 활동지원사(월 한도액 50% 감산)·발달장애인 주간활동 확장형 이용자는 한도액과 본인부담금이
 * 달라져 계산에서 뺐다. 특별지원급여(출산·자립준비·보호자 일시부재)는 본인부담이 없고 더해질 뿐이라
 * 표로만 싣는다.
 */
export const AS_SOURCE_ID = "WLF00003260";
export const AS_CHECKED = "2026-09-25";
export const AS_COPAY_CAP = 216_200;

export type AsBand = { band: number; min: number; max: number | null; limit: number };

/** 71쪽 「활동지원급여의 구간」. min 이상 ~ max 미만. */
export const AS_BANDS: readonly AsBand[] = [
  { band: 1, min: 465, max: null, limit: 8_293_000 },
  { band: 2, min: 435, max: 465, limit: 7_774_000 },
  { band: 3, min: 405, max: 435, limit: 7_257_000 },
  { band: 4, min: 375, max: 405, limit: 6_739_000 },
  { band: 5, min: 345, max: 375, limit: 6_221_000 },
  { band: 6, min: 315, max: 345, limit: 5_703_000 },
  { band: 7, min: 285, max: 315, limit: 5_181_000 },
  { band: 8, min: 255, max: 285, limit: 4_665_000 },
  { band: 9, min: 225, max: 255, limit: 4_148_000 },
  { band: 10, min: 195, max: 225, limit: 3_629_000 },
  { band: 11, min: 165, max: 195, limit: 3_112_000 },
  { band: 12, min: 135, max: 165, limit: 2_593_000 },
  { band: 13, min: 105, max: 135, limit: 2_076_000 },
  { band: 14, min: 75, max: 105, limit: 1_558_000 },
  { band: 15, min: 42, max: 75, limit: 1_040_000 },
];

export type AsIncome = { id: string; label: string; rate: number | null; flat?: number };

/** 77~78쪽 본인부담금 기준. rate null이면 정액(flat). */
export const AS_INCOMES: readonly AsIncome[] = [
  { id: "basic", label: "생계·의료급여 수급자", rate: null, flat: 0 },
  { id: "near", label: "차상위계층·의료급여 수급권자", rate: null, flat: 20_000 },
  { id: "m70", label: "기준 중위소득 70% 이하", rate: 0.04 },
  { id: "m120", label: "70% 초과~120% 이하", rate: 0.06 },
  { id: "m180", label: "120% 초과~180% 이하", rate: 0.08 },
  { id: "over", label: "180% 초과", rate: 0.1 },
];

export function copayOf(limit: number, inc: AsIncome): number {
  if (inc.rate === null) return inc.flat ?? 0;
  return Math.min(AS_COPAY_CAP, Math.floor((limit * inc.rate) / 100) * 100);
}

/** 71쪽 특별지원급여 — 월 한도액에 더해지고 본인부담이 없다. */
export const AS_SPECIAL: readonly { what: string; period: string; amount: number }[] = [
  { what: "출산(유·사산 포함)", period: "개시일부터 만 6개월이 되는 날이 속한 달까지", amount: 1_385_000 },
  { what: "자립준비(거주시설 등에서 퇴소)", period: "개시일부터 만 6개월이 되는 날이 속한 달까지", amount: 349_000 },
  {
    what: "보호자 일시부재",
    period: "결혼·사망 등 1개월 · 출산 3개월 · 입원(5일 이상인 달) 최대 6개월",
    amount: 349_000,
  },
];
