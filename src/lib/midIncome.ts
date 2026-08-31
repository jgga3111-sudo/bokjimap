/**
 * 기준 중위소득 — 자가진단의 근거 데이터.
 *
 * 우리나라 복지사업의 자격 기준은 대부분 "기준 중위소득 ○○% 이하"로 쓰인다.
 * 그래서 이 표 하나면 대부분의 사업에 대해 "내가 대략 어느 구간인지"를 계산할
 * 수 있다.
 *
 * ── 출처 ─────────────────────────────────────────────────────────
 * 보건복지부 2025-07-31 제77차 중앙생활보장위원회 의결 (2026년도 적용).
 * https://www.mohw.go.kr/board.es?mid=a10503010100&bid=0027&act=view&list_no=1487098
 * 4인 가구 기준 6.51% 인상(역대 최대), 1인 가구는 7.20% 인상.
 *
 * **이 숫자는 추정이 아니라 고시값이다.** 매년 7~8월에 다음 해 값이 고시되므로
 * 그때 이 파일만 갱신하면 사이트 전체의 판정이 따라 바뀐다.
 * ────────────────────────────────────────────────────────────────
 */

export const BASE_YEAR = 2026;

/**
 * 가구원 수별 기준 중위소득(월, 원). 인덱스 = 가구원 수.
 *
 * ⚠ 처음엔 7인을 표에서 빼고 "6인 + (6인−5인)=999,233"으로 외삽했다가 틀렸다.
 * **고시는 7인까지 표로 준다.** 7인은 9,515,150원이고, 외삽으로 계산한
 * 9,555,185원과 40,035원 차이가 났다. 8인 이상 규칙도 다르다 — 보건복지부는
 * "8인 이상 가구는 7인가구 기준 중위소득에서 6인가구 기준 중위소득의 차액을
 * 7인가구 기준 중위소득에 더하여 산정"이라고 명시한다. 즉 증분은
 * (7인 − 6인) = 959,198원이지 999,233원이 아니다.
 *
 * 교훈 두 가지. 고시에 있는 값을 "없겠지" 하고 규칙으로 대체하지 않는다.
 * 그리고 검증 스크립트가 1~6인만 대조하고 있어서 이 오차를 못 잡았다 —
 * 검증은 내가 자신 없는 구간을 반드시 포함해야 한다(지금은 7인 포함).
 */
const TABLE = [
  0,
  2_564_238, // 1인
  4_199_292, // 2인
  5_359_036, // 3인
  6_494_738, // 4인
  7_556_719, // 5인
  8_555_952, // 6인
  9_515_150, // 7인
] as const;

/** 8인 이상 가구에서 1인 증가할 때마다 더하는 금액(고시 규정). */
const PER_EXTRA_PERSON = TABLE[7] - TABLE[6]; // 959,198

export const MAX_TABLE_SIZE = TABLE.length - 1; // 7

/** 가구원 수 → 기준 중위소득(월, 원). 8인 이상은 고시 규칙으로 외삽한다. */
export function medianIncome(household: number): number {
  const n = Math.max(1, Math.floor(household));
  if (n <= MAX_TABLE_SIZE) return TABLE[n];
  return TABLE[MAX_TABLE_SIZE] + PER_EXTRA_PERSON * (n - MAX_TABLE_SIZE);
}

/**
 * 기준 중위소득의 몇 % 에 해당하는 금액.
 *
 * 반올림 규칙은 고시된 급여별 선정기준과 대조해 정했다. 예를 들어
 * 6인 주거급여(48%)는 8,555,952 × 0.48 = 4,106,856.96 이고 고시값은
 * 4,106,857 — **버림이 아니라 반올림**이다. (scripts/verify-mid-income.mjs)
 */
export function thresholdOf(household: number, percent: number): number {
  return Math.round((medianIncome(household) * percent) / 100);
}

/** 소득이 기준 중위소득의 몇 %인가. 소수 첫째 자리까지. */
export function percentOfMedian(household: number, monthlyIncome: number): number {
  return Math.round((monthlyIncome / medianIncome(household)) * 1000) / 10;
}

/* ── 주요 기준선 ──────────────────────────────────────────────────
   퍼센트는 제도별 기준선이다.

   ⚠ 처음엔 각 기준선마다 '대표 사업'을 손으로 적었다가 지웠다. 에너지바우처를
   60%로, 아이돌봄서비스를 120%로 적었는데 실제 기준과 달랐다. 사업별 소득
   기준은 해마다 바뀌고 지자체마다 다르므로 **기억으로 적으면 반드시 틀린다.**

   그래서 지금은 두 가지만 쓴다.
     ① 법정 급여 4종(생계·의료·주거·교육) — 국민기초생활보장법이 정한 기준이라
        확실하다. 차상위계층 50%도 마찬가지.
     ② 그 밖의 기준선 — 사업명을 적지 않고, 우리가 수집한 서비스의 선정기준
        문장에서 실제로 읽어낸 것(medianPercent)만 화면에 붙인다.
   ──────────────────────────────────────────────────────────────── */

export type Cutoff = {
  percent: number;
  /** 법으로 이름이 정해진 기준선만 라벨을 갖는다. 나머지는 null. */
  label: string | null;
  /** 라벨이 있는 경우의 근거 */
  note: string | null;
  tone: "rose" | "amber" | "emerald" | "sky" | "slate";
};

export const CUTOFFS: readonly Cutoff[] = [
  {
    percent: 32,
    label: "생계급여",
    note: "국민기초생활보장 생계급여 선정기준",
    tone: "rose",
  },
  {
    percent: 40,
    label: "의료급여",
    note: "국민기초생활보장 의료급여 선정기준",
    tone: "rose",
  },
  {
    percent: 48,
    label: "주거급여",
    note: "국민기초생활보장 주거급여 선정기준",
    tone: "amber",
  },
  {
    percent: 50,
    label: "교육급여 · 차상위계층",
    note: "교육급여 선정기준이자 차상위계층 기준",
    tone: "amber",
  },
  { percent: 60, label: null, note: null, tone: "emerald" },
  { percent: 80, label: null, note: null, tone: "emerald" },
  { percent: 100, label: null, note: null, tone: "sky" },
  { percent: 120, label: null, note: null, tone: "sky" },
  { percent: 150, label: null, note: null, tone: "slate" },
  { percent: 180, label: null, note: null, tone: "slate" },
] as const;

/* ── 건강보험료 → 소득 역산 ───────────────────────────────────────
   많은 사람이 자기 "소득"은 몰라도 "건강보험료"는 안다. 그래서 보험료로
   소득을 되짚는 입력 방식을 둔다.

   2026년 직장가입자 건강보험료율 7.19% (2025년 7.09%에서 인상),
   가입자와 사업주가 각각 절반씩 부담 → **본인부담률 3.595%**.
   보수월액 = 본인부담 보험료 ÷ 0.03595

   지역가입자는 [소득월액 × 7.19%] + [재산점수 × 211.5원] 구조라 보험료만으로
   소득을 되짚을 수 없다. 그래서 이 역산은 **직장가입자에게만** 제공한다.
   출처: 국민건강보험공단 2026년도 보험료율 인상 안내.
   ──────────────────────────────────────────────────────────────── */
export const HEALTH_INSURANCE = {
  /** 2026년 직장가입자 건강보험료율(사업주 포함 전체) */
  rate: 0.0719,
  /** 본인부담분 = 전체의 절반 */
  employeeRate: 0.0719 / 2,
  /** 장기요양보험료율(건강보험료 대비) */
  longTermCareRatio: 0.1314,
} as const;

/** 직장가입자 본인부담 건강보험료 → 보수월액(추정). */
export function incomeFromHealthPremium(monthlyPremium: number): number {
  return Math.round(monthlyPremium / HEALTH_INSURANCE.employeeRate);
}

/** 보수월액 → 직장가입자 본인부담 건강보험료(장기요양 제외). */
export function healthPremiumFromIncome(monthlyIncome: number): number {
  return Math.round(monthlyIncome * HEALTH_INSURANCE.employeeRate);
}
