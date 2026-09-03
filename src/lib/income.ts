import { services } from "@/data/services";
import { MIN_SERVICES } from "@/lib/axes";
import { CUTOFFS } from "@/lib/midIncome";
import type { WelfareService } from "@/types/welfare";

/**
 * 소득기준 축 — "기준 중위소득 몇 % 이하인가"로 묶는다.
 *
 * 왜 이 축을 뒤늦게 만들었나. 축이 다섯 개 있었다 — 주제·혜택·대상·생애주기·
 * 지역. 정작 이 사이트가 내세우는 **소득만 축이 없었다.** 자가진단에서
 * "중위소득 70.2%"라는 답을 받아도 그 기준선의 사업을 모아 놓은 주소가
 * 없어서, `/check` 안에서 기준선마다 4건씩만 보고 끝났다(IncomeCheck의
 * `.slice(0, 4)`).
 *
 * ── 누적이 아니라 기준선별로 나눈다 ────────────────────────────
 * "중위소득 70%인 사람이 충족하는 사업 전부"(누적)로 만들면 30% 페이지 217건,
 * 40% 페이지 214건처럼 **거의 같은 목록이 열여덟 개** 생긴다. 얇은 페이지가
 * 아니라 중복 페이지를 양산하는 쪽이고, 구글이 하나만 남기고 접는다
 * (docs/02에서 겪은 "크롤링됨 – 색인 안 됨"의 한 갈래다).
 *
 * 기준선별로 나누면 한 사업은 정확히 한 페이지에만 실린다. 그리고 이 구분은
 * `/check` 결과 화면이 이미 쓰고 있는 구분이라, 거기서 "이 구간 전체 보기"로
 * 자연스럽게 이어진다.
 *
 * ── 값은 데이터에서 온다 ──────────────────────────────────────
 * 기준선 목록을 손으로 적지 않는다. `medianPercent`는 선정기준 **원문에
 * "기준 중위소득 N%"가 적혀 있을 때만** 채워지는 값이고(없으면 null),
 * 수집이 늘면 새 기준선이 생긴다. 실제로 CUTOFFS(자가진단 표)에 없는
 * 52·65·70·72·75·85·140·200%가 데이터에 있다.
 */
export type IncomeBand = {
  percent: number;
  count: number;
  /** 급여 이름이 붙는 기준선만 있다(생계·의료·주거·교육급여). 나머지는 null. */
  label: string | null;
};

const LABEL = new Map(CUTOFFS.map((c) => [c.percent, c.label]));

const tally = new Map<number, number>();
for (const s of services) {
  if (s.medianPercent === null) continue;
  tally.set(s.medianPercent, (tally.get(s.medianPercent) ?? 0) + 1);
}

/**
 * 사업이 MIN_SERVICES개 이상인 기준선만 페이지로 만든다. 한두 건짜리
 * 목록 페이지를 찍어내면 저품질 페이지 양산이 된다(docs/02).
 */
export const INCOME_BANDS: readonly IncomeBand[] = [...tally.entries()]
  .filter(([, count]) => count >= MIN_SERVICES)
  .map(([percent, count]) => ({
    percent,
    count,
    label: LABEL.get(percent) ?? null,
  }))
  .sort((a, b) => a.percent - b.percent);

const BY_PERCENT = new Map(INCOME_BANDS.map((b) => [b.percent, b]));

/** URL 조각("50")을 기준선으로. 페이지가 없는 값이면 undefined. */
export const incomeBandOf = (raw: string): IncomeBand | undefined => {
  /* Number("")는 0이고 Number("50.")은 50이다. 숫자만으로 이뤄진 것만 받는다. */
  if (!/^\d+$/.test(raw)) return undefined;
  return BY_PERCENT.get(Number(raw));
};

/** 이 기준선이 선정기준에 적힌 사업들. 조회수 순은 services가 이미 지켰다. */
export const servicesAt = (percent: number): WelfareService[] =>
  services.filter((s) => s.medianPercent === percent);
