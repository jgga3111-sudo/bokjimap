/**
 * 아동발달지원계좌(디딤씨앗통장) — 매칭 규칙과 만기 수령액 (2026-09-23 아침 루틴).
 *
 * ── 왜 따로 확인했나 ────────────────────────────────────────────
 * 복지로 원문(WLF00003258, 조회수 26위)은 금액을 적어 두긴 한다. 그런데 **그
 * 한 칸 안에서 두 줄이 서로 어긋난다.**
 *
 *   「아동이 …적립 시 월 5만원 내의 범위에서 1:2로 매칭하여 국가(지자체)가
 *     월 10만원 내 지원」
 *   「* 아동적립금은 월 최대 50만원, 정부 매칭 지원금은 월 최대 5만원까지 가능」
 *
 * 뒤 줄이 앞 줄의 절반이다. 어느 쪽이 맞는지는 조문과 운영기관 안내가 같이
 * 가리킨다 — 아동복지법 시행규칙 제19조제2항은 「해당 아동이 적립한 금액의
 * **2배**에 해당하는 금액을 매월 지원한다」이고, 국가아동권리보장원 사업안내의
 * 상품표도 정부지원 계좌 적립금액을 「1천 원 이상 **10만 원** 이하」로 적는다.
 * 그래서 이 파일은 10만원으로 센다. 화면에는 두 값을 나란히 적고 129·시군구에
 * 확인하라고 안내한다(CLAUDE.md 3절 — 어긋나면 어긋난 사실을 싣는다).
 *
 * ── 출처 ────────────────────────────────────────────────────────
 * 국가아동권리보장원(사업 운영기관) 디딤씨앗통장 「사업안내」와 「자주하는 질문」.
 * 그 두 쪽이 보건복지부 「2026년 아동분야 사업안내(2) 디딤씨앗통장」의 쪽수를
 * 달아 두었다 — 해지 p.65~66, 사망 p.67~68, 상품·이율 p.70~71·75, 만기
 * 수령액 표 p.76.
 *  · 사업안내 https://www.ncrc.or.kr/ncrc/cm/cntnts/cntntsView.do?cntntsId=1142
 *  · 자주하는 질문 https://www.ncrc.or.kr/ncrc/cm/cntnts/cntntsView.do?cntntsId=1160&mi=1062
 * 근거 법령은 아동복지법 제42~44조와 같은 법 시행규칙 제19조(법제처 API 전문 대조).
 *
 * ⚠ **복지로 원문 첨부는 「2023 아동분야 사업안내 [2권]」이다.** 세 해 낡았다.
 *   그 사이에 바뀐 것이 있다 — 차상위계층 아동은 '25년부터 가입 대상이고,
 *   조기인출 요건도 '25년에 완화됐다.
 *
 * ── 계산에서 한 것과 안 한 것 ──────────────────────────────────
 * 하는 것은 **이자를 뺀 원금 합계**뿐이다. 운영기관이 공개한 만기 수령액 표
 * (월 3·5·10만원 × 1·5·10·15·18년, 이자 제외)와 전 칸이 맞는 것을 확인하고
 * 썼다. 이자·수익률은 해마다 달라지므로 계산에 넣지 않는다.
 * 자격 판정은 하지 않는다(CLAUDE.md 3절) — 대상인지는 시·군·구가 정한다.
 */

export const CDA_CHECKED = "2026-09-23";
export const CDA_SOURCE_ID = "WLF00003258";

export const CDA_BIZ_URL = "https://www.ncrc.or.kr/ncrc/cm/cntnts/cntntsView.do?cntntsId=1142";
export const CDA_FAQ_URL =
  "https://www.ncrc.or.kr/ncrc/cm/cntnts/cntntsView.do?cntntsId=1160&mi=1062";
export const CDA_DOC = "보건복지부 「2026년 아동분야 사업안내(2) 디딤씨앗통장」";
export const CDA_ORG = "국가아동권리보장원";

/** 아동이 한 달에 넣을 수 있는 최대 금액(적립예금). */
export const CDA_MAX_SAVE = 500_000;
/** 그중 정부 매칭 대상이 되는 몫. 이 금액까지만 1:2가 붙는다. */
export const CDA_MATCH_BASE = 50_000;
/** 정부(지자체) 매칭금의 월 상한 — 시행규칙 제19조제2항의 「2배」. */
export const CDA_MAX_MATCH = 100_000;

export type CdaResult = {
  months: number;
  /** 아동(보호자·후원자)이 넣는 돈의 합계 */
  child: number;
  /** 정부(지자체) 매칭금의 합계 */
  match: number;
  total: number;
  /** 한 달 매칭금 */
  matchMonthly: number;
};

/** 매달 `monthly`원을 `months`개월 넣었을 때의 원금 합계. 이자는 세지 않는다. */
export function calcCda(monthly: number, months: number): CdaResult {
  const save = Math.max(0, Math.min(monthly, CDA_MAX_SAVE));
  const matchMonthly = Math.min(save, CDA_MATCH_BASE) * 2;
  const m = Math.max(0, months);
  return {
    months: m,
    child: save * m,
    match: matchMonthly * m,
    total: (save + matchMonthly) * m,
    matchMonthly,
  };
}

/**
 * 태어난 날로부터 **18세가 되는 생일이 든 달**까지 남은 개월수.
 *
 * ⚠ 이것은 어림이다. 실제 지원은 생일이 아니라 **적립계좌 만기일이 속한 달**까지
 * 간다(운영기관 자주하는 질문). 만기일은 통장마다 다르므로 우리가 알 수 없다.
 * 화면에 그 사실을 함께 적는다.
 */
export function monthsToEighteen(born: Date, from: Date): number {
  const end = new Date(born.getFullYear() + 18, born.getMonth(), 1);
  const start = new Date(from.getFullYear(), from.getMonth(), 1);
  return Math.max(0, (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()));
}

/**
 * 운영기관이 공개한 만기 수령액 표(이자 제외, 단위 만원). 계산기가 맞는지
 * 대조하는 데 쓰고 화면에도 그대로 싣는다 — 「2026년 아동분야 사업안내(2)」 p.76.
 */
export const CDA_OFFICIAL_TABLE = [
  { monthly: 30_000, years: [108, 540, 1_080, 1_620, 1_944] },
  { monthly: 50_000, years: [180, 900, 1_800, 2_700, 3_240] },
  { monthly: 100_000, years: [240, 1_200, 2_400, 3_600, 4_320] },
] as const;
export const CDA_TABLE_YEARS = [1, 5, 10, 15, 18] as const;

/** 만기(18세)에 찾을 때 인정되는 사용 용도 — 사업안내 「적립금 세부 사용 용도」. */
export const CDA_USES = [
  "학자금 — 입학금·등록금·기숙사비, 대학 생활지원비",
  "기술자격·취업훈련 비용 — 국가자격증, 국가고시, 학원 등록금(온라인 강의 포함)",
  "창업지원금 — 사무실 보증금, 장비 구입비, 시설 설치비",
  "주거마련 — 임대아파트 보증금, 전세금, 주택구입자금, 월세(6개월 이상 계약)",
  "의료비 — 진료비·입원비·재활치료비",
  "결혼 — 결혼 및 결혼생활 비용",
  "그 밖에 시·군·구청장이 자립에 필요하다고 인정하는 것",
] as const;

/** 해지 네 갈래. 정부매칭금을 언제 받고 언제 못 받는지가 갈리는 표다(p.65~66). */
export const CDA_EXIT = [
  {
    kind: "만기 해지",
    when: "18세 이상, 적립금 사용 용도를 갖춤",
    child: true,
    match: true,
    note: "17세라도 용도를 갖추면 시·군·구 판단으로 가능(’25년부터). 24세 이후에는 용도 제한 없이 전액.",
  },
  {
    kind: "만기 뒤 적립예금 인출",
    when: "일부 금액만 용도를 갖춤",
    child: true,
    match: false,
    note: "정부매칭금은 나중에 만기해지할 때 받습니다. 조기인출을 합쳐 5회까지.",
  },
  {
    kind: "조기 인출",
    when: "13세 이상이고 1년 이상 적립",
    child: true,
    match: false,
    note: "학자금·기술자격·취업훈련·의료비만 됩니다. 정부매칭금은 나중에 만기해지할 때 받습니다.",
  },
  {
    kind: "중도 해지",
    when: "아동의 사망, 이민, 이에 준하는 사유",
    child: true,
    match: false,
    note: "정부매칭금은 환수됩니다. 24세 이후 사망은 매칭금도 상속인에게 지급.",
  },
] as const;
