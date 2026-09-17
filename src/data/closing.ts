/**
 * 마감 표 — **자동 생성 파일. 직접 고치지 말 것.**
 *
 *   node scripts/build-data.mjs
 *
 * 끝나는 날이 적혀 있는 사업의 끝날. 지났는지는 브라우저가 오늘과 비교한다
 * (`components/DeadlineBadge.tsx`). 만드는 규칙은 build-data.mjs의 마감 표 주석.
 */
import { GOV24_CLOSING } from "./gov24Closing";

export type Closing = {
  /** period = 본문의 신청 기간 · program = 사업 시행 종료일 · stated = 원문이 마감이라고 적음
   *  · gov24 = 보조금24 「신청기한」 칸(받은 날은 gov24.ts의 GOV24_CHECKED, scripts/build-gov24.mjs) */
  kind: "period" | "program" | "stated" | "gov24";
  /** YYYY-MM-DD. stated는 날짜가 없어 null이고, 늘 마감으로 본다. */
  end: string | null;
  /** 원문 조각 그대로 */
  text: string;
  name: string;
};

const BOKJIRO: Readonly<Record<string, Closing>> = {
 "WLF00000060": {
  "kind": "period",
  "end": "2026-05-20",
  "text": "'26.5.4.(월) ~ '26.5.20.",
  "name": "청년내일저축계좌"
 },
 "WLF00004661": {
  "kind": "period",
  "end": "2026-05-29",
  "text": "3.30(월) 09:00 ~ 5.29",
  "name": "청년월세 지원사업"
 },
 "WLF00004717": {
  "kind": "period",
  "end": "2026-05-29",
  "text": "2026.3.30. ~ .5.29.",
  "name": "인천형 청년월세 지원사업"
 },
 "WLF00004006": {
  "kind": "program",
  "end": "2026-09-30",
  "text": "~ 2026-09-30",
  "name": "청년희망적금"
 },
 "WLF00000946": {
  "kind": "period",
  "end": "2026-01-30",
  "text": "2026년 1월 2일 ~ 2026년 1월 30일",
  "name": "산림복지서비스이용권"
 },
 "WLF00005696": {
  "kind": "period",
  "end": "2026-12-15",
  "text": "2026. 2. 2.(월) ~ 12. 15.",
  "name": "청년 전월세보증금 대출이자 지원사업"
 },
 "WLF00003862": {
  "kind": "program",
  "end": "2030-12-31",
  "text": "~ 2030-12-31",
  "name": "저소득계층 임대보증금 지원 사업"
 },
 "WLF00004076": {
  "kind": "period",
  "end": "2026-04-20",
  "text": "2026년 4월 16일 ~ 4월 20일",
  "name": "경기여성 취업지원금 지원 사업"
 },
 "WLF00003627": {
  "kind": "program",
  "end": "2099-12-31",
  "text": "~ 2099-12-31",
  "name": "산모신생아건강관리사예외지원 확대실시사업"
 },
 "WLF00005566": {
  "kind": "period",
  "end": "2025-12-31",
  "text": "2025. 1. 08.(수) ~ 12. 31.",
  "name": "아동건강체험활동비 지원"
 },
 "WLF00004692": {
  "kind": "stated",
  "end": null,
  "text": "신청 마감",
  "name": "청년 주거금융지원(고양 청년둥지론) - 신청 마감"
 },
 "WLF00005437": {
  "kind": "period",
  "end": "2026-03-31",
  "text": "2026. 3. 3. ~ 3. 31.",
  "name": "저소득층 자녀교육비 지원사업"
 },
 "WLF00005107": {
  "kind": "program",
  "end": "2027-12-31",
  "text": "~ 2027-12-31",
  "name": "전북형 청년활력수당"
 },
 "WLF00004165": {
  "kind": "period",
  "end": "2026-06-24",
  "text": "2026. 6. 17. ~ 6. 24.",
  "name": "공공근로사업"
 },
 "WLF00004719": {
  "kind": "program",
  "end": "2026-12-31",
  "text": "~ 2026-12-31",
  "name": "서울 디딤돌소득 시범사업"
 },
 "WLF00005270": {
  "kind": "program",
  "end": "2050-12-31",
  "text": "~ 2050-12-31",
  "name": "경기도 소규모 노후주택 집수리 지원사업"
 },
 "WLF00002362": {
  "kind": "program",
  "end": "2026-12-31",
  "text": "~ 2026-12-31",
  "name": "장애인통합복지카드(A형)발급수수료 지원사업"
 },
 "WLF00001229": {
  "kind": "period",
  "end": "2024-02-23",
  "text": "2024. 1. 22.~2. 23.",
  "name": "여성농업인 행복바우처 지원"
 },
 "WLF00002325": {
  "kind": "program",
  "end": "2030-01-01",
  "text": "~ 2030-01-01",
  "name": "신중년 일자리 지원사업 (부산광역시)"
 },
 "WLF00006067": {
  "kind": "program",
  "end": "2026-12-31",
  "text": "~ 2026-12-31",
  "name": "구미시 청년일자리 근속장려금 지원사업"
 },
 "WLF00005418": {
  "kind": "program",
  "end": "2026-12-31",
  "text": "~ 2026-12-31",
  "name": "청년ㆍ신혼 희망터치(Touch) 보증금 이자지원"
 },
 "WLF00004252": {
  "kind": "period",
  "end": "2026-07-28",
  "text": "2026.7.20.~7.28.",
  "name": "공공근로사업 추진"
 },
 "WLF00004947": {
  "kind": "program",
  "end": "2032-12-31",
  "text": "~ 2032-12-31",
  "name": "청소년 꿈키움 바우처 지원"
 },
 "WLF00002332": {
  "kind": "period",
  "end": "2026-11-30",
  "text": "2026. 1. 15. ~ 11. 30.",
  "name": "성북구 아동·청소년동행카드 지원사업"
 },
 "WLF00005099": {
  "kind": "period",
  "end": "2026-03-16",
  "text": "'26. 3. 3. ~ '26. 3. 16.",
  "name": "전북청년 함께 두배적금"
 },
 "WLF00005018": {
  "kind": "stated",
  "end": null,
  "text": "2025년도 신청 마감",
  "name": "청년 주택임차보증금 이자 지원사업"
 }
};

/* 두 원천을 합친다(2026-09-17).
   · 원문이 마감이라고 적은 것(stated)은 그대로 둔다.
   · 복지로에 사업 기간(program)만 있으면 보조금24의 **신청** 기간이 이긴다 —
     전북형 청년활력수당은 사업 기간이 2027년인데 신청은 2026.3.20.에 끝났다.
   · 둘 다 신청 기간이면 **끝날이 늦은 쪽**(더 새 공고)을 쓴다 — 아동건강체험활동비는
     복지로 원문에 작년 기간만 남아 「마감」으로 나갔는데 보조금24에는 올해 기간이 있었다. */
const pick = (b: Closing | undefined, g: Closing | undefined): Closing =>
  !g ? b! : !b ? g : b.kind === "stated" ? b : b.kind === "program" ? g : (g.end ?? "") > (b.end ?? "") ? g : b;

export const CLOSING: Readonly<Record<string, Closing>> = Object.fromEntries(
  [...new Set([...Object.keys(BOKJIRO), ...Object.keys(GOV24_CLOSING)])].map((id) => [
    id,
    pick(BOKJIRO[id], GOV24_CLOSING[id]),
  ]),
);
