/**
 * K-패스(모두의 카드) 환급 계산.
 *
 * ── 왜 만들었나 ────────────────────────────────────────────────
 * 조회수 58위(168,033) 「대중교통비 환급 지원(모두의카드)」의 본문은 환급을
 * 이렇게만 말한다.
 *
 *     월 15회 이상 대중교통 이용금액의 20%~53.3% 환급
 *     기준금액(3~10만원)을 초과하는 지출 금액 전액 환급
 *
 * **범위만 있고 내 값이 없다.** 20%인지 53%인지, 기준금액이 3만원인지
 * 10만원인지는 내가 어느 유형이고 어디 사는지에 달렸는데 원문에 그 표가
 * 없다. 복지로가 안 싣는 값이라 우리가 1차 출처에서 찾아 왔다 —
 * `lib/payDates.ts`(지급일)와 똑같은 자리다.
 *
 * 수요는 두 곳에서 겹쳐 확인됐다. 네이버 데이터랩 12개월 월평균으로
 * 「K패스」가 실업급여의 **2.4배**이고, 토스 미니앱 인기 100선에도
 * K패스 환급 계산이 **세 개**(53·78·100위) 올라 있다.
 *
 * ── 요약본을 믿지 않는다 (2026-09-08에 실제로 틀릴 뻔했다) ──────
 * 공단 페이지를 요약해서 읽었더니 "어르신 50%, 2자녀 53%"라고 나왔다.
 * 원문 표를 열어 보니 **어르신은 30%**였다 — `<td colspan="3">30%</td>`로
 * 청년·어르신·2자녀가 한 칸에 묶여 있었고, 요약이 그 병합을 못 읽고
 * 값을 오른쪽으로 밀어 배정한 것이다. 국토교통부 보도자료 제목이
 * "K-패스 어르신 유형(**환급률 30%**) 신설"이라 대조하면 바로 걸린다.
 *
 * **돈이 걸린 표는 병합 셀까지 보고 옮긴다.** 요약을 그대로 실었으면
 * 어르신에게 실제의 1.7배를 알려 줄 뻔했다.
 *
 * ── 교차 검증 ──────────────────────────────────────────────────
 * 아래 기준금액 표의 최솟값 3.0만원 · 최댓값 10.0만원이 복지로 원문의
 * "기준금액(3~10만원)"과 정확히 맞는다. 요율 최댓값 53%도 원문의
 * "20%~53.3%" 안에 든다. 서로 다른 두 출처가 같은 수를 가리킨다.
 *
 * ⚠ 이 파일은 **아무것도 import하지 않는다.** 계산기가 클라이언트 번들에
 *   실리므로 여기서 `@/data/services`를 끌어오면 2.9MB가 딸려 온다
 *   (`lib/aliases.ts`·`lib/searchText.ts`와 같은 이유).
 */

/** 이 표를 1차 출처에서 확인한 날. 화면에 그대로 띄운다. */
export const KPASS_CHECKED = "2026-09-08";

export const KPASS_SOURCE = "TS한국교통안전공단 「대중교통비 환급 지원 사업(K-패스)」";
export const KPASS_SOURCE_URL =
  "https://main.kotsa.or.kr/portal/contents.do?menuCode=01080300";

/** 환급을 받으려면 넘어야 하는 최소 이용 횟수. 원문: "월 1일~말일 기준". */
export const MIN_RIDES = 15;

/** 일반형이 대상으로 삼는 1회 요금 상한. 원문: "3000원 미만 대중교통 이용내역 대상". */
export const NORMAL_FARE_CAP = 3000;

/**
 * 기준금액 표의 열 묶음.
 *
 * 요율 표(유형 6개)와 기준금액 표(묶음 3개)의 칸이 서로 다르다. 유형마다
 * 어느 묶음에 드는지를 여기서 잇는다 — 화면에서 유형 하나만 고르면 두 표를
 * 모두 쓸 수 있게 하려는 것이다.
 */
export type ThresholdGroup = "general" | "mid" | "high";

export type KpassType = {
  id: string;
  label: string;
  /** 기본형(정률) 환급 비율. 공단 표 그대로. */
  rate: number;
  group: ThresholdGroup;
  /** 공단 페이지가 표 밑에 각주로 단 정의. 우리가 고쳐 쓰지 않는다. */
  note: string | null;
};

/**
 * ① K-패스 기본형 환급 비율 (공단 표 그대로)
 *
 *   구분    일반  청년  어르신  2자녀  3자녀  저소득
 *   환급비율 20%  ←── 30% (한 칸) ──→   50%   53%
 */
export const KPASS_TYPES: readonly KpassType[] = [
  { id: "general", label: "일반", rate: 0.2, group: "general", note: null },
  {
    id: "youth",
    label: "청년",
    rate: 0.3,
    group: "mid",
    note: "「청년기본법」에 따른 만 19~34세",
  },
  { id: "senior", label: "어르신", rate: 0.3, group: "mid", note: null },
  { id: "child2", label: "2자녀", rate: 0.3, group: "mid", note: null },
  { id: "child3", label: "3자녀", rate: 0.5, group: "high", note: null },
  {
    id: "lowIncome",
    label: "저소득",
    rate: 0.53,
    group: "high",
    note: "만 19세 이상 「기초생활보장법」에 따른 기초생활수급자 및 차상위계층",
  },
];

export type KpassRegion = {
  id: string;
  label: string;
  /** [일반형 기준금액, 플러스형 기준금액] — 원 단위. */
  threshold: Record<ThresholdGroup, [number, number]>;
};

/** 만원 단위로 적힌 표를 원 단위로 편다. 표를 눈으로 대조하기 쉽게 남겨 둔다. */
const M = (v: number) => Math.round(v * 10000);

/**
 * ② 모두의 카드 환급 기준 금액 (공단 표 그대로, 단위 만원)
 *
 *   구분          일반 국민      청년·2자녀·어르신   3자녀 이상·저소득
 *                 일반  플러스    일반   플러스       일반   플러스
 *   수도권        6.2   10       5.5    9           4.5    8
 *   일반 지방권    5.5   9.5      5      8.5         4      7.5
 *   우대지원지역   5     9        4.5    8           3.5    7
 *   특별지원지역   4.5   8.5      4      7.5         3      6.5
 */
export const KPASS_REGIONS: readonly KpassRegion[] = [
  {
    id: "capital",
    label: "수도권",
    threshold: {
      general: [M(6.2), M(10)],
      mid: [M(5.5), M(9)],
      high: [M(4.5), M(8)],
    },
  },
  {
    id: "local",
    label: "일반 지방권",
    threshold: {
      general: [M(5.5), M(9.5)],
      mid: [M(5), M(8.5)],
      high: [M(4), M(7.5)],
    },
  },
  {
    id: "priority",
    label: "우대지원지역",
    threshold: {
      general: [M(5), M(9)],
      mid: [M(4.5), M(8)],
      high: [M(3.5), M(7)],
    },
  },
  {
    id: "special",
    label: "특별지원지역",
    threshold: {
      general: [M(4.5), M(8.5)],
      mid: [M(4), M(7.5)],
      high: [M(3), M(6.5)],
    },
  },
];

export type KpassResult = {
  /** 기본형 — 이용금액 × 요율 */
  basic: number;
  /** 플러스형 — 전체 이용분에서 기준금액을 뺀 나머지 */
  plus: number;
  /**
   * 일반형 — 3,000원 미만 이용분에서 기준금액을 뺀 나머지.
   * 그 금액을 모르면 `null`이다. 0으로 두지 않는다 — 0은 "계산해 보니
   * 없다"는 뜻이고 null은 "계산할 수 없다"는 뜻이라 화면에서 달리 적어야 한다.
   */
  normal: number | null;
  /** 셋(또는 계산된 것들) 중 가장 큰 값. 공단: "가장 유리한 유형으로 자동 적용". */
  best: number;
  /** `best`가 어느 유형에서 나왔는가. */
  bestLabel: string;
  /** 계산에 쓴 기준금액 — 화면에 근거로 같이 적는다. */
  usedThreshold: { normal: number; plus: number };
};

/**
 * 환급액을 유형별로 모두 계산하고 가장 큰 값을 고른다.
 *
 * **판정하지 않는다.** 자격이 되는지(15회를 채웠는지, 유형에 해당하는지)는
 * 우리가 정하지 않는다. 넣은 값에 공단 표를 적용하면 얼마가 되는지까지다.
 *
 * @param spend      월 대중교통 이용금액(원) — 전체
 * @param under3000  그중 1회 3,000원 미만인 이용분(원). 모르면 null.
 */
export function calcKpass(
  spend: number,
  under3000: number | null,
  type: KpassType,
  region: KpassRegion,
): KpassResult {
  const [normalT, plusT] = region.threshold[type.group];

  /* 원 단위 아래는 반올림한다. 공단 표에 절사·반올림 규정이 없어 우리가
     정한 것이고, 그래서 화면에 "우리가 계산한 값"이라고 밝힌다. */
  const basic = Math.round(spend * type.rate);
  const plus = Math.max(0, spend - plusT);
  const normal = under3000 === null ? null : Math.max(0, under3000 - normalT);

  const candidates: { v: number; label: string }[] = [
    { v: basic, label: "기본형" },
    { v: plus, label: "플러스형" },
  ];
  if (normal !== null) candidates.push({ v: normal, label: "일반형" });

  /* 같은 값이면 앞의 것을 쓴다 — 기본형이 가장 설명하기 쉬운 유형이다. */
  const top = candidates.reduce((a, b) => (b.v > a.v ? b : a));

  return {
    basic,
    plus,
    normal,
    best: top.v,
    bestLabel: top.label,
    usedThreshold: { normal: normalT, plus: plusT },
  };
}
