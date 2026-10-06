/**
 * `/ask`(말로 물어보기)가 **아는 질문에 아는 답을 내는지** 본다.
 *
 *   node scripts/verify-ask.mjs
 *
 * 2026-10-02 — 질문 203개를 넣어 보고 30가지쯤을 고쳤다(낱말 한가운데가 잘리던 것,
 * 띄어쓰기를 건너 조건으로 읽던 것, 조사가 아닌 끝 글자를 떼던 것, 안내 글이 있는데
 * 안 이어지던 것). 그때 고친 자리가 다시 깨지지 않게 대표 질문을 여기 남긴다.
 *
 * 화면에 예시로 내건 문장(`components/AskBox.tsx`의 ASK_EXAMPLES·ASK_EXAMPLE_GROUPS)은
 * **전부** 여기 기대값이 있어야 한다 — 없으면 실패한다. 예시는 "넣어 보면 맞는 답이
 * 나오는 문장"이라고 내건 것이라, 데이터가 바뀌어 답이 달라지면 예시를 바꿔야 한다.
 *
 * 기대값 쓰는 법:
 *   top   — 맨 위 결과의 이름에 들어 있어야 하는 말
 *   in3   — 위 셋 가운데 하나의 이름에 들어 있어야 하는 말
 *   place — 맨 위 결과의 지역에 들어 있어야 하는 말
 *   guide — 이어져야 하는 안내 글(주소 끝)
 *   chip  — 읽혀야 하는 조건(축 이름)   noChip — 읽히면 안 되는 조건(축)
 *   word  — 찾을 낱말로 남아야 하는 말   noWord — 낱말로 남으면 안 되는 말
 */
import { createJiti } from "jiti";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(import.meta.url, { alias: { "@": path.join(root, "src") } });
const { parseAsk } = await jiti.import("@/lib/askParse");
const { askSearch } = await jiti.import("@/lib/askSearch");
const { askGuides } = await jiti.import("@/lib/askGuides");
const { ASK_EXAMPLES, ASK_EXAMPLE_GROUPS } = await jiti.import("@/lib/askExamples");

const CASES = {
  /* ── 화면에 내건 예시 ── */
  "서울 사는 30대인데 월세 지원 있나요": { top: "청년월세 지원사업", chip: ["서울", "청년"] },
  "혼자 아이 키우는데 받을 수 있는 게 있을까요": { top: "한부모가족 아동양육비", guide: "single-parent-support" },
  "67세인데 병원비가 부담됩니다": { top: "재난적의료비", guide: "catastrophic-medical", chip: ["노년"] },
  "기초생활수급자 전기요금 감면": { top: "전기요금 복지할인", noWord: ["수급자"] },
  "아기 낳으면 받는 돈": { guide: "baby-money" },
  "어린이집 보육료 지원": { in3: "영유아보육료 지원", guide: "childcare-choice" },
  "산후도우미 본인부담금": { top: "산모·신생아 건강관리 지원사업", guide: "postpartum-care", noWord: ["도우미"] },
  "고등학생 학비 지원": { top: "고교학비", guide: "school-support" },
  "청년내일저축계좌 조건": { top: "청년내일저축계좌", guide: "youth-tomorrow-savings" },
  "국민취업지원제도 신청": { top: "국민취업지원제도", guide: "national-employment" },
  "근로장려금 지급일": { top: "근로·자녀장려금", guide: "pay-dates", noWord: ["지급일"] },
  "차상위계층 혜택": { top: "차상위", noWord: ["계층"] },
  "노인 틀니 지원": { in3: "의료급여 틀니" },
  "혼자 사는 노인 지원": { top: "독거노인" },
  "장애인 활동지원 본인부담금": { top: "장애인활동지원", guide: "disability-activity-support" },
  "휴대폰 요금 감면": { top: "이동통신요금감면", guide: "phone-bill-discount" },
  "문화누리카드 사용처": { top: "문화누리카드", guide: "voucher-use", noWord: ["카드"] },
  "수원 출산지원금": { place: "수원시" },
  "제주 이사비": { place: "제주" },
  "대구 다자녀": { place: "대구" },

  /* ── 10-05에 고친 자리 (질문 667개) ── */
  // 붙여 쓴 「이름+신청(방법·기간·자격)」이 통째로 0건이던 것
  기초연금신청방법: { top: "기초연금" },
  부모급여신청: { top: "부모급여" },
  노인일자리신청: { top: "노인일자리" },
  "근로장려금 신청기간": { top: "근로·자녀장려금" },
  "주거급여 신청방법": { top: "주거급여" },
  // 「평택시」「주택시설」 한가운데에 걸리던 것
  택시: { top: "택시" },
  // 사람 말 → 원문 말
  케이패스: { top: "K-패스" },
  기초노령연금: { top: "기초연금" },
  유치원: { top: "유아학비" },
  출산휴가: { top: "출산전후휴가" },
  "희귀병 진단을 받았어요": { top: "희귀질환" },
  "빚이 너무 많아서 살 수가 없어요": { top: "채무" },
  // 조건어가 낱말 일부를 먹던 것
  경로당: { noChip: ["life"], word: ["경로당"] },
  "육아기 근로시간 단축": { noChip: ["life"] },
  // 뜻 없는 풀이말·가족 호칭이 낱말이 되던 것
  "휠체어 지원받고 싶어요": { in3: "보조기기", noWord: ["지원받고"] },
  "엄마가 요양원에 들어가셔야 하는데 비용이 걱정이에요": { noWord: ["엄마"] },
  // 안내 글
  "국민연금 받으면 기초연금 깎이나요": { guide: "combined-support" },
  "먹고살기 힘들어요": { guide: "emergency" },
  "권고사직 당했어요": { guide: "unemployment" },
  "집주인이 보증금을 안 돌려줘요": { noGuide: "refund" },

  /* ── 10-02에 고친 자리 ── */
  // 낱말 한가운데가 빼는 말(「가장」「부담」)로 잘리던 것
  국가장학금: { top: "국가장학금(Ⅰ", word: ["국가장학금"] },
  // 띄어쓰기를 건너 「수당」으로 읽던 것
  "환수 당했어요": { noChip: ["benefit"], guide: "refund" },
  // 「수급자격」을 「수급자」로 읽던 것
  "기초연금 수급자격": { top: "기초연금", noChip: ["target"] },
  // 조사가 아닌 끝 글자를 떼던 것
  "자활근로 하고 있는데": { top: "자활근로", word: ["자활근로"] },
  "쌍둥이 낳았는데 지원": { word: ["쌍둥이"] },
  // 조건어를 뗀 나머지가 엉뚱한 낱말이 되던 것
  "참전용사 수당": { top: "참전", noWord: ["용사"] },
  "분유값 지원": { top: "조제분유", guide: "diaper-formula" },
  // 조건 칸 때문에 이름이 맞는 사업이 걸러지던 것
  보호종료아동: { in3: "자립정착금", guide: "self-reliance-allowance" },
  "학교 밖 청소년 지원": { top: "학교 밖 청소년 지원" },
  // 사람 말과 원문 말이 달라 안 걸리던 것
  "청소년 생리대 지원": { top: "여성청소년 생리용품 지원", guide: "period-product-voucher" },
  "유치원비 지원": { top: "유아학비" },
  "장례비 지원": { top: "장제급여", guide: "funeral-birth-benefit" },
  "쌀 할인": { top: "양곡할인", guide: "grain-discount" },
  "탈북민 정착 지원": { top: "북한이탈주민" },
  // 좁혀 주지 못하는 말이 순위를 흔들던 것
  "보훈 급여 지급일": { guide: "pay-dates", noWord: ["급여", "지급일"] },
  "아이 돌봐줄 사람이 필요해요": { top: "아이돌봄서비스", noWord: ["필요"] },
  월세: { top: "청년월세 지원사업" },
  // 기준선을 숫자로 물으면 그 목록으로
  "중위소득 60 이하 연봉": { guide: "/income/60" },
  // 뜻 없는 조각이 「못 찾았습니다」로 나가던 것
  "당장 돈이 없어요": { guide: "emergency", noWord: ["돈이", "당장"] },
  "장애아동 수당": { top: "장애아동수당" },

  /* ── 문장으로 길게 물을 때(10-02 2차) ── */
  // 풀이말 조각(생활·어렵)이 낱말이 되어 216건이 걸리던 것
  "저는 40대 가장인데 실직해서 생활이 어렵습니다": { guide: "emergency", chip: ["중장년"], noWord: ["생활", "어렵"] },
  // 과거형 줄기(받았)와 풀이말 끝(돌려달래요)
  "지원금 받았는데 돌려달래요": { guide: "refund", noWord: ["받았", "돌려달래요"] },
  // 붙임표에서 끊겨 「패스」만 남던 것
  "K-패스 환급률": { top: "K-패스", word: ["K패스"], guide: "k-pass" },
  // 이름 안의 「지원」에서 잘려 「활동」만 남던 것
  "장애인활동지원 시간": { top: "장애인활동지원", noWord: ["활동", "시간"] },
  "군대 전역했는데 지원금": { top: "제대군인" },
  // 본문에만 걸린 전국 사업이 이름에 걸린 사업을 넘던 것
  "중학생 교복 지원": { top: "교복" },
  // 대상 칸이 빈 사업이 낱말 하나로 끼어들던 것
  "국가유공자 의료비": { top: "국가유공자" },
  "장애인 교통비": { in3: "장애인" },
  "생계급여 받으면서 근로장려금 받을 수 있나요": { top: "생계급여", guide: "combined-support" },

  // 10-04 — 원문을 말한 질문만 어긋남 글로 간다. 프로토타입 이름은 500을 냈다.
  "복지로랑 금액이 달라요": { guide: "source-conflicts" },
  "구미 청년월세 지원 신청": { guide: "gumi-youth-rent" },
  "서울 청년월세": { noGuide: "gumi-youth-rent" },
  "지역마다 금액이 달라요": { noGuide: "source-conflicts" },
  "가구원 수에 따라 금액이 다르나요": { noGuide: "source-conflicts" },
  "복지로 말고 다른 지원": { noGuide: "source-conflicts" },
  "발달재활서비스 본인부담금": { guide: "developmental-rehab" },
  constructor: {},
  "toString 청년": {},
};

const shown = [...ASK_EXAMPLES, ...ASK_EXAMPLE_GROUPS.flatMap((g) => g.examples)];
const fails = [];
for (const q of shown) if (!CASES[q]) fails.push(`예시 「${q}」에 기대값이 없다 — CASES에 더한다`);

for (const [q, want] of Object.entries(CASES)) {
  const read = parseAsk(q);
  const a = askSearch(read);
  const hits = a.matchedHits.length ? a.matchedHits : a.otherHits;
  const guides = askGuides(q).map((g) => g.href);
  const bad = (msg) => fails.push(`「${q}」 ${msg}`);

  if (want.top && !hits[0]?.name.includes(want.top)) bad(`맨 위가 「${want.top}」이 아니다 → ${hits[0]?.name ?? "없음"}`);
  if (want.in3 && !hits.slice(0, 3).some((h) => h.name.includes(want.in3)))
    bad(`위 셋에 「${want.in3}」이 없다 → ${hits.slice(0, 3).map((h) => h.name).join(" / ")}`);
  if (want.place && !hits[0]?.place.includes(want.place)) bad(`맨 위 지역이 ${want.place}이 아니다 → ${hits[0]?.place ?? "없음"}`);
  if (want.guide && !guides.some((h) => h.endsWith(want.guide))) bad(`안내 글 ${want.guide}로 안 이어진다 → ${guides.join(", ") || "없음"}`);
  if (want.noGuide && guides.some((h) => h.endsWith(want.noGuide))) bad(`안내 글 ${want.noGuide}로 잘못 이어진다`);
  for (const c of want.chip ?? []) if (!a.applied.some((x) => x.label === c)) bad(`조건 ${c}을(를) 못 읽었다`);
  for (const c of want.noChip ?? []) if (a.applied.some((x) => x.axis === c)) bad(`조건(${c})을 잘못 읽었다`);
  const words = [...a.usedWords.map((w) => w.word), ...a.missedWords];
  for (const w of want.word ?? []) if (!words.includes(w)) bad(`낱말 「${w}」이 없다 → ${words.join(", ") || "없음"}`);
  for (const w of want.noWord ?? []) if (words.includes(w)) bad(`낱말 「${w}」이 남았다`);
}

if (fails.length) {
  console.error(`✗ /ask 점검 실패 ${fails.length}건`);
  for (const f of fails) console.error("  - " + f);
  process.exit(1);
}
console.log(`✓ /ask 점검 통과 — 질문 ${Object.keys(CASES).length}개(화면 예시 ${shown.length}개 포함)`);
