import { guideBySlug } from "@/lib/guides";
import { INCOME_BANDS } from "@/lib/income";

/**
 * 질문 말투 → 이미 있는 안내 글.
 *
 * 목록이 답이 아닌 질문이 있다 — 「얼마 받나」「언제 들어오나」「같이 받을 수 있나」.
 * 수록분에서 낱말을 찾아 봐야 사업 이름만 나오고 답은 안 나온다. 그 답을 1차 출처로
 * 확인해 써 둔 글이 있으면 **판정하지 않고 그 글로 보낸다.**
 *
 * ── 2026-10-02 — 아홉 갈래에서 글 전체로 넓혔다 ────────────────────
 * 안내 글이 54편인데 여기 이어진 것은 아홉뿐이었다. 「산후도우미 본인부담금」을 물으면
 * 그 표를 실은 글이 있는데도 본문에 「도우미」가 든 산림일자리가 나왔다.
 *
 * 글 제목은 `guides.ts`에서 읽는다(여기 따로 적으면 제목을 고칠 때 어긋난다).
 * `lead`는 그 글이 **왜 이 질문의 답인지**를 한마디로 적을 때만 둔다. 사실을 새로 말하는
 * 자리가 아니다 — 글에 없는 말을 여기 적지 않는다.
 *
 * 순서가 우선순위다. 화면에는 앞에서부터 `ASK_GUIDE_MAX`개만 낸다.
 */
type Rule = { re: RegExp; slug: string; lead?: string };

const RULES: readonly Rule[] = [
  /* ── 묻는 방식 ── */
  {
    re: /중복|(같이|함께|동시에?|둘\s*다)\s*받|더\s*받을|받으면서/,
    slug: "combined-support",
    lead: "자주 묻는 조합은 법령·부처 지침으로 확인해 따로 정리했습니다.",
  },
  {
    re: /지급일|입금일|언제\s*(들어|나와|나오|입금|지급|줘|주)/,
    slug: "pay-dates",
    lead: "법령에 지급일이 적힌 제도는 따로 모아 두었습니다.",
  },
  { re: /환수|반환|부정\s*수급|돌려\s*(달|내|줘|주)|토해/, slug: "refund" },
  /* 원문·복지로·지침을 **말한** 질문만 잇는다(10-04). 「금액이 달라요」만으로 걸었더니
     「지역마다 금액이 달라요」「가구원 수에 따라 금액이 다르나요」까지 이 글로 갔다.
     「다른」은 뺀다 — 「복지로 말고 다른 지원」이 걸린다. */
  { re: /(원문|복지로|지침|안내서).{0,8}(다르|달라|다릅|틀리|틀린|틀렸|어긋)/, slug: "source-conflicts" },

  /* ── 아이 ── */
  { re: /기저귀|분유/, slug: "diaper-formula" },
  { re: /산후\s*도우미|산모.{0,3}신생아|건강관리사|산후\s*관리/, slug: "postpartum-care" },
  { re: /아이\s*돌봄|아이\s*돌보미|돌보미|(아이|애)[를을]?\s*맡[길기]/, slug: "childcare-service" },
  { re: /(야간|연장|24\s*시간|휴일).{0,6}(어린이집|보육)|(어린이집|보육).{0,6}(야간|연장|24\s*시간|휴일)/, slug: "childcare-extended" },
  { re: /보육료|양육\s*수당|유아\s*학비|유치원|어린이집/, slug: "childcare-choice" },
  { re: /디딤\s*씨앗/, slug: "child-development-account" },
  { re: /교육\s*급여|교육비|고교\s*학비|교육활동\s*지원비|(고등|중|초등)학(생|교).{0,8}(학비|수업료|교육비)/, slug: "school-support" },
  { re: /한부모|미혼모|미혼부|(혼자|홀로)서?.{0,8}(키우|키워|아이)/, slug: "single-parent-support" },
  { re: /출산|낳[으았을]|태어[나났난]|첫만남|부모\s*급여|(?<!장애)아동\s*수당/, slug: "baby-money" },

  /* ── 청년·청소년 ── */
  { re: /청년\s*내일\s*저축/, slug: "youth-tomorrow-savings" },
  { re: /청년\s*미래\s*적금/, slug: "youth-savings" },
  { re: /자립\s*준비\s*청년|자립\s*수당|보호\s*종료|자립\s*정착금/, slug: "self-reliance-allowance" },
  { re: /청소년\s*특별\s*지원|위기\s*청소년/, slug: "youth-special-support" },
  { re: /생리대|생리\s*용품/, slug: "period-product-voucher" },

  /* ── 생계·일자리 ── */
  {
    re: /실업\s*급여|구직\s*급여|실직|해고|잘렸|잘리|퇴사|(일자리|직장)[을를]?\s*잃/,
    slug: "unemployment",
    lead: "실업급여는 고용보험 제도라 복지로 수록 목록에 없습니다.",
  },
  {
    re: /실직|해고|잘렸|잘리|퇴사|(일자리|직장)[을를]?\s*잃|국민\s*취업|구직\s*촉진/,
    slug: "national-employment",
    lead: "실업급여를 못 받거나 끝난 사람도 받을 수 있는 구직촉진수당이 있습니다.",
  },
  {
    re: /(생계|생활비|생활|먹고\s*살)[이가]?\s*(막|어려|어렵|없|힘들)|긴급\s*(복지|지원)|당장\s*(생활비|돈)|일을?\s*못\s*하|(남편|아내|배우자|가장)[이가은는]?.{0,12}(사고|사망|쓰러|입원|다쳐|다쳤)/,
    slug: "emergency",
    lead: "갑자기 소득이 끊겼을 때 받는 긴급복지 생계지원 금액을 정리했습니다.",
  },
  { re: /자활\s*성공/, slug: "self-support-bonus" },
  { re: /희망\s*저축/, slug: "hope-savings" },
  { re: /(근로|자녀)\s*장려금.{0,10}(얼마|금액|계산)/, slug: "tax-credit-amount" },
  { re: /(근로|자녀)\s*장려금/, slug: "tax-credit" },
  { re: /(근로|자녀)\s*장려금/, slug: "tax-credit-amount" },
  { re: /장제|장례|해산\s*급여/, slug: "funeral-birth-benefit" },
  {
    re: /생계\s*급여|(기초\s*생활|기초\s*수급|수급자).{0,6}(되려면|되는|되나|자격|조건|신청|얼마|금액)/,
    slug: "livelihood",
  },

  /* ── 건강·돌봄 ── */
  { re: /재난적\s*의료비|(병원비|수술비|치료비|의료비|입원비).{0,10}(많|폭탄|감당|부담|비싸|못\s*내|없)/, slug: "catastrophic-medical" },
  { re: /차상위.{0,8}(본인\s*부담|병원|의료)|본인\s*부담\s*경감/, slug: "low-income-copay" },
  { re: /의료\s*급여/, slug: "medical-aid" },
  { re: /암\s*검진/, slug: "cancer-screening" },
  { re: /심리\s*상담|우울|마음\s*투자|정신(과|\s*건강).{0,6}상담/, slug: "mental-health-voucher" },
  {
    re: /발달\s*장애|활동\s*지원/,
    slug: "disability-activity-support",
    lead: "장애인활동지원의 구간별 한도와 본인부담금을 정리했습니다.",
  },
  {
    re: /돌봐\s*줄\s*사람|돌봄이?\s*(끊|필요)|(아파|다쳐)서?.*(돌봐|돌봄)|긴급\s*돌봄/,
    slug: "emergency-care",
    lead: "갑자기 돌봄이 끊겼을 때는 긴급돌봄, 몇 달 이상 필요하면 일상돌봄을 봅니다.",
  },
  { re: /노인\s*맞춤\s*돌봄|(어르신|노인|부모님|어머니|아버지|할머니|할아버지).{0,8}(돌봄|돌봐)/, slug: "senior-care" },
  { re: /일상\s*돌봄|가족\s*돌봄\s*청년/, slug: "daily-care" },

  /* ── 요금·바우처 ── */
  { re: /에너지\s*바우처|난방비|냉방비/, slug: "energy-voucher" },
  { re: /통신비|통신\s*요금|(휴대폰|핸드폰|이동\s*통신).{0,6}(요금|감면|할인)/, slug: "phone-bill-discount" },
  { re: /k\s*-?\s*패스|케이\s*패스|모두의\s*카드/i, slug: "k-pass" },
  { re: /문화\s*누리/, slug: "voucher-use" },
  { re: /과학.{0,3}바우처/, slug: "science-voucher" },
  { re: /양곡|나라미|쌀.{0,6}(할인|지원|싸게)/, slug: "grain-discount" },

  /* ── 신청 ── */
  {
    re: /(온라인|인터넷|모바일|앱)\s*(으로\s*)?신청/,
    slug: "online",
    lead: "온라인 신청이 되는지는 사업마다 다릅니다.",
  },
  {
    re: /신청\s*(방법|하는\s*법|절차)|어디(서|에서)?\s*신청|어떻게\s*신청/,
    slug: "apply",
    lead: "신청 창구는 사업마다 다릅니다. 각 사업 페이지의 신청 방법 칸과 함께 보세요.",
  },
  { re: /서류/, slug: "documents" },
  { re: /신청\s*기간|언제까지|마감/, slug: "calendar" },
  { re: /(차상위|소득\s*인정액|부양\s*의무자|중위\s*소득)(계층)?[이가은는]?\s*(뭐|뭔|무엇|무슨|뜻)/, slug: "terms" },
];

/** 한 화면에 내는 글 수. 넘치면 목록이 답을 가린다. */
const ASK_GUIDE_MAX = 3;

export type AskGuide = { href: string; label: string; lead: string | null };

export function askGuides(q: string): AskGuide[] {
  const out: AskGuide[] = [];
  const seen = new Set<string>();
  const add = (href: string, label: string, lead: string | null) => {
    if (seen.has(href) || out.length >= ASK_GUIDE_MAX) return;
    seen.add(href);
    out.push({ href, label, lead });
  };

  /* 「중위소득 60 이하」처럼 기준선을 숫자로 물으면 그 기준선의 목록이 곧 답이다.
     그 숫자의 페이지가 있을 때만 잇는다(없는 숫자는 404다). */
  const m = q.match(/중위\s*소득\s*(\d{2,3})/);
  if (m && INCOME_BANDS.some((b) => b.percent === Number(m[1])))
    add(
      `/income/${Number(m[1])}`,
      `기준 중위소득 ${Number(m[1])}% 이하 지원 목록 — 가구원 수별 금액과 연봉 환산`,
      null,
    );

  for (const r of RULES) {
    if (!r.re.test(q)) continue;
    const g = guideBySlug(r.slug);
    if (g) add(`/guide/${g.slug}`, g.title, r.lead ?? null);
  }
  return out;
}
