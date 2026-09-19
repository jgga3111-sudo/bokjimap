/**
 * 아이돌봄서비스 — 본인부담 계산 (2026-09-17).
 *
 * 값은 성평등가족부 아이돌봄서비스 누리집(idolbom.go.kr) 「서비스 유형 소개」의
 * **이용요금표**(아동 1명·30분당 정부지원금/본인부담금)를 그대로 옮긴 것이다.
 * 원문 첨부 「2026년 아이돌봄 지원사업 안내」 PDF는 글자가 그림으로만 들어 있어
 * 읽을 수 없었다.
 *
 * ── 교차 확인 ──────────────────────────────────────────────────
 * · 30분 정부지원금 × 2가 복지로 원문(WLF00000024)의 시간당 지원금과 전 유형 일치한다
 *   (가형 A 5,436 × 2 = 10,872원 · B 5,116 × 2 = 10,232원 … 라형 B 640 × 2 = 1,280원).
 * · 표의 본인부담금은 전부 「30분 요금 − 정부지원금」과 같다. 그래서 정부지원금만 적고
 *   본인부담은 뺄셈으로 구한다. 종합형은 정부지원금이 기본형과 같고 요금만 비싸다.
 *
 * ── 계산하지 않는 것 ───────────────────────────────────────────
 * · 한부모·장애부모·장애아동·청소년부모 가정의 가형 추가 지원 — 취학(B) 아동 비율이
 *   누리집 안내문(75% → 80%)과 복지로 원문(10,872원 = 85%)이 어긋난다. 글에 둘 다 적는다.
 * · 다자녀(본인부담 10%)·인구감소지역(5%) 추가 할인 — 둘이 겹칠 때 어떤 순서로 깎는지
 *   안내가 없다. 동시 돌봄(아이 2명 이상) 할인도 표만 싣고 계산하지 않는다.
 * · 연 960시간을 넘는 시간은 전액 본인부담이다. 누적 시간은 모르므로 안내만 한다.
 */
export const CS_CHECKED = "2026-09-17";
export const CS_SOURCE_ID = "WLF00000024";
export const CS_SITE = "https://idolbom.go.kr/front/biz/srvcGuide";

export type CsService = "basic" | "full" | "infant";
export type CsTier = "ga" | "na" | "da" | "ra" | "ma";
export type CsAge = "A" | "B";
export type CsTime = "day" | "night";

export const CS_SERVICES: readonly { id: CsService; label: string; note: string }[] = [
  { id: "basic", label: "시간제 기본형", note: "생후 3개월~만 12세 · 가사활동 제외 · 1회 2시간 이상" },
  { id: "full", label: "시간제 종합형", note: "기본형 + 아이와 관련된 세탁·청소·조리 · 1회 2시간 이상" },
  { id: "infant", label: "영아종일제", note: "생후 3개월~만 36개월 · 1회 3시간 이상" },
];

export const CS_TIERS: readonly { id: CsTier; label: string; who: string }[] = [
  { id: "ga", label: "가형", who: "기준 중위소득 75% 이하" },
  { id: "na", label: "나형", who: "기준 중위소득 120% 이하" },
  { id: "da", label: "다형", who: "기준 중위소득 150% 이하" },
  { id: "ra", label: "라형", who: "기준 중위소득 250% 이하" },
  { id: "ma", label: "마형", who: "250% 초과 또는 정부지원 대상이 아닌 경우 — 전액 본인부담" },
];

/** 30분 요금(원). 야간(22~06시)·휴일은 기본요금의 50%를 더한 값이다. */
export const CS_FEE_30: Readonly<Record<CsService, Record<CsTime, number>>> = {
  basic: { day: 6_395, night: 9_590 },
  full: { day: 8_310, night: 12_465 },
  infant: { day: 6_395, night: 9_590 },
};

/** 아동 1명·30분당 정부지원금(원) — [미취학 A, 취학 B]. 마형은 0. */
export const CS_GOV_30: Readonly<Record<CsTime, Record<Exclude<CsTier, "ma">, readonly [number, number]>>> = {
  day: { ga: [5_436, 5_116], na: [3_837, 3_198], da: [1_919, 1_599], ra: [960, 640] },
  night: { ga: [8_152, 7_672], na: [5_754, 4_795], da: [2_877, 2_398], ra: [1_439, 959] },
};

/** 영아종일제 정부지원 시간의 월 상한. */
export const INFANT_MAX_HOURS = 200;

/** 30분 단위 시간(0.5 배수)을 받아 한 달 요금을 나눈다. 영아종일제는 A형 표만 있다. */
export function calcChildcare(service: CsService, tier: CsTier, age: CsAge, time: CsTime, hours: number) {
  const fee = CS_FEE_30[service][time];
  const gov = tier === "ma" ? 0 : CS_GOV_30[time][tier][service === "infant" || age === "A" ? 0 : 1];
  const halves = Math.round(hours * 2);
  /* 영아종일제는 정부지원이 월 200시간까지다(누리집 「월 80~200시간」, 09-19 점검에서 한도 누락을 잡음).
     넘는 시간은 요금 전액을 본인이 낸다. */
  const govHalves = service === "infant" ? Math.min(halves, INFANT_MAX_HOURS * 2) : halves;
  return {
    fee: fee * halves,
    gov: gov * govHalves,
    mine: fee * halves - gov * govHalves,
    perHourMine: (fee - gov) * 2,
    overCap: halves > govHalves ? (halves - govHalves) / 2 : 0,
  };
}
