/**
 * 정신건강 심리상담 바우처 — 본인부담 계산 (2026-09-13).
 *
 * 값은 전부 수록 원문(조회수 12위, `WLF00005567`, 기준연도 2026)의 「지원 내용」에서 옮겼다.
 * 밖에서 가져온 숫자가 없다(근로장려금 금액 글과 같은 자리).
 *
 * ── 계산하지 않는 것 ───────────────────────────────────────────
 * 원문 문장이 "기초생활수급자, 차상위계층, 자립준비청년 및 보호연장아동, 법정한부모가족은
 * 본인부담률, 재난피해자는 본인부담률 0%"로 **앞 무리의 비율이 빠져 있다.** 0%로 읽히지만
 * 그건 우리 짐작이라 계산하지 않고 원문을 그대로 보여 준다(3절). 재난피해자는 0%가 적혀 있어 계산한다.
 * 첨부 안내서는 2025년판이라 숫자를 옮기지 않는다(작년 공고를 올해로 옮기지 않는다).
 */
export const MV_SOURCE_ID = "WLF00005567";
export const MV_CHECKED = "2026-09-13";
export const MV_SESSIONS = 8;

export type MvTier = { id: "t1" | "t2"; label: string; price: number; who: string };

export const MV_TIERS: readonly MvTier[] = [
  {
    id: "t1",
    label: "1급 유형",
    price: 80_000,
    who: "(국가전문자격)정신건강전문요원 1급, 청소년상담사 1급, 전문상담교사 1급, (민간자격)임상심리전문가, 상담심리사 1급, 전문상담사 1급",
  },
  {
    id: "t2",
    label: "2급 유형",
    price: 70_000,
    who: "(국가전문자격)정신건강전문요원 2급, 청소년상담사 2급, 전문상담교사 2급, (국가기술자격)임상심리사 1급, (민간자격)상담심리사 2급, 전문상담사 2급",
  },
];

export type MvBand = { id: string; label: string; rate: number | null; note?: string };

export const MV_BANDS: readonly MvBand[] = [
  { id: "b70", label: "기준 중위소득 70% 이하", rate: 0 },
  { id: "b120", label: "70% 초과~120% 이하", rate: 0.1 },
  { id: "b180", label: "120% 초과~180% 이하", rate: 0.3 },
  { id: "bover", label: "180% 초과", rate: 0.5 },
  { id: "disaster", label: "재난피해자", rate: 0 },
  {
    id: "special",
    label: "기초생활수급자·차상위·자립준비청년·보호연장아동·법정한부모",
    rate: null,
    note: "원문 문장에 이 무리의 본인부담률 숫자가 빠져 있어(“…법정한부모가족은 본인부담률, 재난피해자는 본인부담률 0%”) 계산하지 않았습니다.",
  },
];

export type MvResult = { perSession: number; mineTotal: number; govTotal: number; total: number };

export function calcMentalVoucher(tier: MvTier, band: MvBand): MvResult | null {
  if (band.rate === null) return null;
  const perSession = Math.round(tier.price * band.rate);
  return {
    perSession,
    mineTotal: perSession * MV_SESSIONS,
    govTotal: (tier.price - perSession) * MV_SESSIONS,
    total: tier.price * MV_SESSIONS,
  };
}
