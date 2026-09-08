/**
 * 근로장려금·자녀장려금 산정.
 *
 * ── 이 파일이 특별한 이유 ──────────────────────────────────────
 * `lib/kpass.ts`(K-패스)와 `lib/payDates.ts`(지급일)는 복지로가 안 싣는 값을
 * **밖에서 찾아와** 손으로 적은 표다. 이건 다르다 — **산식이 우리 수록
 * 데이터의 원문에 통째로 들어 있다.**
 *
 * 조회수 23위 「근로·자녀장려금」(858,026)의 지원 내용이 가구 유형 셋의
 * 전 구간 산식과 자녀장려금, 재산 감액까지 그대로 적고 있다. 아래 숫자는
 * 전부 그 문장에서 옮긴 것이고, 밖에서 가져온 것이 하나도 없다.
 *
 * ── 왜 계산기를 만드나 ─────────────────────────────────────────
 * 토스 미니앱 인기 100선에서 **단일 주제로 가장 많은 것이 근로장려금**이다
 * (10·22·26·30·55·74위 — 여섯 개). 우리는 같은 산식을 이미 갖고도
 * 산문으로만 보여주고 있었다.
 *
 * ── "총급여액 등"을 우리가 정의하지 않는다 ─────────────────────
 * 원문이 쓰는 말이 "총급여액 등"이다. 근로소득만인지 사업·종교인 소득까지
 * 포함하는지는 원문에 정의가 없고, 그 판정은 국세청이 한다. 우리는 그 말을
 * 그대로 쓰고 정의는 국세청 안내로 보낸다(CLAUDE.md 3절).
 *
 * ⚠ 아무것도 import하지 않는다. 계산기가 클라이언트 번들에 실린다.
 */

/** 산식을 옮겨 온 곳. 화면에 근거로 띄운다. */
export const TC_SOURCE_ID = "WLF00001148";
export const TC_SOURCE_NAME = "근로·자녀장려금";

/** 계산은 전부 **만원 단위**로 한다. 원문이 만원으로 적혀 있어 대조하기 쉽다. */
export type Household = {
  id: string;
  label: string;
  /** 근로장려금: [체증 구간 상한, 최대액, 평탄 구간 상한, 소멸 지점] */
  work: { rise: number; max: number; flat: number; end: number };
  /** 자녀장려금: [정액 구간 상한, 소멸 지점] · 단독가구는 없다(원문에 없음). */
  child: { flat: number; end: number } | null;
};

/**
 * 원문 그대로:
 *
 *   단독가구
 *    - (총급여액 등 400만원 미만) 총급여액 등 x 400분의 165
 *    - (400만원~900만원 미만) 165만원 정액
 *    - (900만원~2,200만원 미만) 165만원 - (총급여액 등 - 900만원) x 1,300분의 165
 *   홑벌이 가구  … 700 / 285만 / 1,400 / 3,200 (체감 분모 1,800)
 *   맞벌이 가구  … 800 / 330만 / 1,700 / 4,400 (체감 분모 2,700)
 *
 *   자녀장려금은 자녀 1인당 50만원~100만원
 *    홑벌이 (2,100만원 미만) 자녀수 x 100만원
 *          (2,100만~7,000만원 미만) 자녀수 x [100만원 - (총급여액 등 - 2,100만원) x 4,900분의 50]
 *    맞벌이 (2,500만원 미만) 자녀수 x 100만원
 *          (2,500만~7,000만원 미만) 자녀수 x [100만원 - (총급여액 등 - 2,500만원) x 4,500분의 50]
 *
 * 체감 구간의 분모(1,300 · 1,800 · 2,700 / 4,900 · 4,500)는 따로 적지 않는다.
 * `end - flat`과 같은 값이라 계산해서 쓴다 — 두 군데 적으면 한쪽만 고쳐진다.
 */
export const HOUSEHOLDS: readonly Household[] = [
  {
    id: "single",
    label: "단독",
    work: { rise: 400, max: 165, flat: 900, end: 2200 },
    child: null,
  },
  {
    id: "single_earner",
    label: "홑벌이",
    work: { rise: 700, max: 285, flat: 1400, end: 3200 },
    child: { flat: 2100, end: 7000 },
  },
  {
    id: "dual_earner",
    label: "맞벌이",
    work: { rise: 800, max: 330, flat: 1700, end: 4400 },
    child: { flat: 2500, end: 7000 },
  },
];

/** 자녀장려금 1인당 최대액(만원). 원문: "자녀 1인당 50만원~100만원". */
export const CHILD_MAX = 100;
/** 체감 구간에서 깎이는 폭(만원). 100만원에서 50만원까지 줄어든다. */
const CHILD_DROP = 50;

/**
 * 재산 구간별 지급률.
 *
 * 원문(지원 대상):
 *   재산 합계액이 2.4억원 미만이면 신청할 수 있습니다.
 *   1.7억 미만 : 해당장려금의 100% 지급
 *   1.7억 이상 ~ 2.4억 미만 : 해당장려금의 50% 지급
 */
export const ASSET_TIERS = [
  { id: "under17", label: "1.7억원 미만", rate: 1 },
  { id: "17to24", label: "1.7억 이상 ~ 2.4억 미만", rate: 0.5 },
  { id: "over24", label: "2.4억원 이상", rate: 0 },
] as const;

export type AssetTier = (typeof ASSET_TIERS)[number]["id"];

/** 만원 단위 실수를 원 단위 정수로. 표시 직전에만 쓴다. */
const toWon = (manwon: number) => Math.round(manwon * 10000);

/**
 * 사다리꼴 한 개를 계산한다 — 올라가고, 평평하고, 내려온다.
 * 근로장려금 세 유형이 전부 이 모양이다.
 */
function trapezoid(g: number, w: Household["work"]): number {
  if (g <= 0) return 0;
  if (g < w.rise) return (g * w.max) / w.rise;
  if (g < w.flat) return w.max;
  if (g < w.end) return w.max - ((g - w.flat) * w.max) / (w.end - w.flat);
  return 0;
}

function childCredit(g: number, kids: number, h: Household): number {
  if (!h.child || kids <= 0) return 0;
  const c = h.child;
  if (g < c.flat) return kids * CHILD_MAX;
  if (g < c.end)
    return kids * (CHILD_MAX - ((g - c.flat) * CHILD_DROP) / (c.end - c.flat));
  return 0;
}

export type TaxCreditResult = {
  /** 재산 감액 **전** 금액(원) */
  workRaw: number;
  childRaw: number;
  /** 재산 감액을 적용한 금액(원) */
  work: number;
  child: number;
  total: number;
  /** 적용된 지급률 (1 · 0.5 · 0) */
  assetRate: number;
  /** 총급여액 등이 소멸 지점을 넘어 근로장려금이 0이 되었는가 */
  workZeroByIncome: boolean;
};

/**
 * @param grossManwon 총급여액 등 (만원)
 * @param kids        부양자녀 수
 */
export function calcTaxCredit(
  grossManwon: number,
  kids: number,
  h: Household,
  asset: AssetTier,
): TaxCreditResult {
  const rate = ASSET_TIERS.find((t) => t.id === asset)!.rate;

  const workRawM = trapezoid(grossManwon, h.work);
  const childRawM = childCredit(grossManwon, kids, h);

  /* 원 단위 아래는 반올림한다. 국세청은 별도 절사 규정을 두지만 원문에
     적혀 있지 않아, 우리가 정했다는 사실을 화면에 밝힌다. */
  return {
    workRaw: toWon(workRawM),
    childRaw: toWon(childRawM),
    work: toWon(workRawM * rate),
    child: toWon(childRawM * rate),
    total: toWon((workRawM + childRawM) * rate),
    assetRate: rate,
    workZeroByIncome: grossManwon >= h.work.end,
  };
}
