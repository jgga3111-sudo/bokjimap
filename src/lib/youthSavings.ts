/**
 * 청년미래적금 — 3년 뒤 얼마가 되나.
 *
 * ── 왜 만들었나 ────────────────────────────────────────────────
 * 조회수 96위(80,450) 「청년미래적금」의 지원 내용은 이렇게만 말한다.
 *
 *     은행이자에 더해 납입액의 **일정비율**로 정부기여금 지원 및
 *     이자소득 비과세 혜택 제공
 *
 * **"일정비율"이 얼마인지가 없다.** K-패스가 "20%~53.3%"라고만 했던 것과
 * 같은 자리다(`lib/kpass.ts`). 토스 미니앱 인기 100선에도 이 제도의
 * "3년 뒤 얼마 받는지 계산"이 82위로 올라 있다.
 *
 * ── 두 출처가 어긋난다 (그대로 적어 둔다) ──────────────────────
 * 기여금 비율은 금융위원회 보도자료에서 확인했다.
 *
 *     일반형 — "매월 납입금의 6%를 정부 기여금으로 지급",
 *              소득기준 "총급여 6,000만원(종합소득 4,800만 원) 이하"
 *     우대형 — "매월 납입금의 12%를 정부 기여금으로 지급",
 *              소득기준 "총급여 3,600만원(종합소득 2,600만 원) 이하"
 *
 * 그런데 우리 수록 원문(복지로)은 **가입 요건**을 이렇게 적는다.
 *
 *     (일반형) 개인소득 7,500만원 이하 …
 *     (우대형) 개인소득 3,600만원 이하 …
 *
 * 일반형이 한쪽은 6,000만원, 다른 쪽은 7,500만원이다. 우대형(3,600만원)은
 * 두 출처가 같다. **6,000만~7,500만 구간이 어떻게 되는지는 두 문서만으로
 * 단정할 수 없어 계산하지 않고, 그 사실을 화면에 적는다**(CLAUDE.md 3절:
 * 엇갈리면 어떻게 엇갈렸는지 기록한다).
 *
 * ── 이자는 넣지 않는다 ─────────────────────────────────────────
 * "은행이자에 더해"라고만 되어 있고 금리는 취급 은행마다 다르다. 모르는
 * 값을 그럴듯한 수로 채우지 않는다. 계산은 **납입 원금 + 정부기여금**까지다.
 *
 * ⚠ 아무것도 import하지 않는다. 계산기가 클라이언트 번들에 실린다.
 */

export const YS_SOURCE_ID = "WLF00006266";
export const YS_CHECKED = "2026-09-08";
export const YS_FSC_URL = "https://www.fsc.go.kr/no010101/86767";

/** 원문: "만기 3년 동안 매월 50만원 한도 내에서 자유롭게 납입". */
export const MONTHS = 36;
export const MONTHLY_CAP = 500000;

export type YsTier = {
  id: string;
  label: string;
  /** 매월 납입금 대비 정부기여금 비율. 금융위 보도자료 그대로. */
  rate: number;
  /** 금융위가 적은 소득기준. */
  income: string;
};

export const YS_TIERS: readonly YsTier[] = [
  {
    id: "preferred",
    label: "우대형",
    rate: 0.12,
    income: "총급여 3,600만원(종합소득 2,600만원) 이하",
  },
  {
    id: "general",
    label: "일반형",
    rate: 0.06,
    income: "총급여 6,000만원(종합소득 4,800만원) 이하",
  },
  {
    id: "none",
    label: "기여금 없음",
    rate: 0,
    income: "기여금 기준을 넘는 경우 — 이자소득 비과세만",
  },
];

export type YsResult = {
  /** 3년간 낸 돈 */
  paid: number;
  /** 3년간 받는 정부기여금 */
  bonus: number;
  /** 둘의 합. **이자는 빠져 있다.** */
  total: number;
};

/** @param monthly 매월 납입액(원) */
export function calcYouthSavings(monthly: number, tier: YsTier): YsResult {
  const paid = monthly * MONTHS;
  const bonus = Math.round(monthly * tier.rate) * MONTHS;
  return { paid, bonus, total: paid + bonus };
}
