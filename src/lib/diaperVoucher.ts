/**
 * 저소득층 기저귀·조제분유 지원 — 신청일에 따라 달라지는 지원 개월수 (2026-09-21 아침 루틴).
 *
 * ── 왜 따로 확인했나 ────────────────────────────────────────────
 * 복지로 원문(WLF00000092, 조회수 20위)은 금액을 한 줄로 적는다 —
 * 「기저귀(월 9만원)·조제분유(월 11만원) 구매비용을 국민행복카드에
 * 바우처 포인트로 지원합니다」. 그런데 **얼마나 오래 받는지가 신청일에
 * 달려 있다는 말이 원문에 한 글자도 없다.**
 *
 * 지침을 보면 갈림길이 뚜렷하다. 출생일로부터 60일 안에 신청하면 24개월분을
 * 전부 받고, **하루가 지나 61일째에 신청하면 22개월분**이 된다. 기저귀만
 * 받는 가구라면 216만원과 198만원의 차이이고, 조제분유까지 받는 가구라면
 * 480만원과 440만원의 차이다. 그 뒤로는 한 달이 지날 때마다 한 달치씩 준다.
 *
 * ── 출처 ────────────────────────────────────────────────────────
 * 「2026년 모자보건사업 안내」(보건복지부, 발간등록번호 11-1352000-100441-10,
 * 560쪽 PDF) 제Ⅶ장 「저소득층 기저귀·조제분유 지원사업」.
 * **인쇄 쪽 = PDF 파일 쪽 − 30**이다(인쇄 341쪽 = 파일 371쪽).
 *  · 지원 개월수 표: 인쇄 364~366쪽
 *  · 신청 기간(60일 규칙): 인쇄 348쪽·363쪽
 *  · 지원 유형과 금액: 인쇄 363쪽
 *  · 바우처 생성·이용기간·소멸: 인쇄 367~368쪽
 *  · 중지 사유: 인쇄 362쪽
 *  · 소득 기준(건강보험료) 표: 인쇄 358쪽
 *
 * ⚠ **복지로 원문 첨부는 「2022년 모자보건사업 안내」다.** 네 해 낡았다.
 * 그래서 첨부가 아니라 2026년판을 따로 받아 썼다(법제처 「찾기쉬운 생활법령정보」
 * 미러, 보건복지부 누리집 게시분과 같은 파일).
 *
 * ⚠ **지침 본문과 각주가 어긋나 보인다.** 장애인·다자녀 가구의 소득 기준이
 * 본문에는 「기준중위소득 80% 이하」로 적혀 있고 각주에 「80% → 100%,
 * '26.7월~」이 붙는다. 지금은 7월이 지났으므로 **100%가 맞고**, 복지로 원문도
 * 100%로 적고 있다. 본문 숫자만 보고 옮기면 받을 수 있는 사람을 놓친다.
 *
 * ── 계산에서 뺀 것 ──────────────────────────────────────────────
 * 자격 판정은 하지 않는다(CLAUDE.md 3절). 이 파일이 하는 일은 **이미 대상인
 * 사람의 지원 개월수와 총액**을 지침의 표 그대로 세는 것뿐이다. 소득이
 * 기준 안에 드는지, 어느 유형인지는 보건소가 정한다.
 */

/** 지침을 받아 옮긴 날. */
export const DV_CHECKED = "2026-09-21";
export const DV_SOURCE_ID = "WLF00000092";

/** 법제처 「찾기쉬운 생활법령정보」에 올라온 2026년판 원본 PDF. */
export const DV_GUIDE_PDF =
  "https://www.easylaw.go.kr/CSP/FlDownload.laf?flSeq=1769406083842";
export const DV_GUIDE_NAME = "「2026년 모자보건사업 안내」";
/** 바우처 잔액·사용처를 확인하는 곳. 복지로 원문이 적어 둔 두 곳이다. */
export const DV_VOUCHER_SITE = "https://www.socialservice.or.kr:444/";
export const DV_VOUCHER_TEL = "1566-3232";

/** 인쇄 363쪽 「지원대상별 지원금액」. 월 단위 금액이다. */
export const DV_MONTHLY = {
  diaper: 90_000,
  formula: 110_000,
  both: 200_000,
} as const;

export type DvKind = "diaper" | "both";

export const DV_KINDS: readonly { id: DvKind; label: string; who: string }[] = [
  {
    id: "diaper",
    label: "기저귀만",
    who: "대부분이 여기에 듭니다. 지침은 「가유형」이라고 부릅니다.",
  },
  {
    id: "both",
    label: "기저귀 + 조제분유",
    who: "아동복지시설 등 아동이거나, 산모의 사망·질병으로 모유수유가 어렵다고 의사가 판단한 경우입니다(「나유형」).",
  },
];

/** 「n개월째 날」 — 출생일에 달을 더한 날. 그 달에 같은 날짜가 없으면 말일로 본다. */
function addMonths(born: Date, n: number): Date {
  const d = new Date(born.getFullYear(), born.getMonth() + n, born.getDate());
  if (d.getDate() !== born.getDate()) d.setDate(0);
  return d;
}

const dayDiff = (a: Date, b: Date) =>
  Math.round(
    (Date.UTC(a.getFullYear(), a.getMonth(), a.getDate()) -
      Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())) /
      86_400_000,
  );

export type DvResult =
  | { ok: false; reason: "before" | "over" }
  | {
      ok: true;
      /** 지원 개월수 */
      months: number;
      /** 총 지원금액 */
      total: number;
      /** 출생일로부터 며칠째에 신청하는가(출생일을 1일째로 센다) */
      dayNo: number;
      /** 60일 안에 신청했을 때와 견준 차액. 0이면 전액이다. */
      lost: number;
      /** 60일째 되는 날(그날까지 신청하면 24개월 전액) */
      deadline: Date;
    };

/**
 * 인쇄 364~366쪽의 표를 그대로 센다.
 *   · 출생일 ~ 출생일 기준 60일(출생일 포함)째 날 → 24개월
 *   · 61일째 날 ~ 3개월째 날의 전날 → 22개월
 *   · n개월째 날 ~ (n+1)개월째 날의 전날 → (24 − n)개월  (n = 3~23)
 *   · 24개월째 날부터는 신청할 수 없다(만 2년이 되는 날의 전날까지).
 */
export function calcDiaper(born: Date, apply: Date, kind: DvKind): DvResult {
  const dayNo = dayDiff(apply, born) + 1;
  if (dayNo < 1) return { ok: false, reason: "before" };

  const deadline = new Date(born.getFullYear(), born.getMonth(), born.getDate() + 59);
  if (apply >= addMonths(born, 24)) return { ok: false, reason: "over" };

  let months: number;
  if (dayNo <= 60) months = 24;
  else if (apply < addMonths(born, 3)) months = 22;
  else {
    let n = 3;
    while (n < 24 && apply >= addMonths(born, n + 1)) n += 1;
    months = 24 - n;
  }

  const per = DV_MONTHLY[kind === "both" ? "both" : "diaper"];
  return {
    ok: true,
    months,
    total: per * months,
    dayNo,
    lost: per * (24 - months),
    deadline,
  };
}

/** 인쇄 358쪽 「2026년 건강보험료 본인부담금에 의한 기준중위소득 100% 판정기준」. */
export const DV_INSURANCE_100: readonly {
  size: string;
  income: number;
  work: number;
  local: number;
  mixed: number;
}[] = [
  { size: "2인", income: 4_200_000, work: 151_148, local: 83_625, mixed: 152_775 },
  { size: "3인", income: 5_360_000, work: 195_073, local: 137_279, mixed: 197_469 },
  { size: "4인", income: 6_495_000, work: 236_378, local: 172_901, mixed: 240_050 },
  { size: "5인", income: 7_557_000, work: 274_221, local: 220_149, mixed: 279_461 },
  { size: "6인", income: 8_556_000, work: 309_777, local: 264_935, mixed: 318_043 },
  { size: "7인", income: 9_516_000, work: 348_913, local: 308_246, mixed: 360_410 },
];

/** 인쇄 362쪽 「중지사유별 바우처 자격관리」 — 전부 잔액 결제가 막힌다. */
export const DV_STOP: readonly { why: string; when: string }[] = [
  { why: "본인이 그만 받겠다고 한 경우", when: "변경 결정 다음 날부터" },
  { why: "영아가 사망한 경우", when: "변경 결정 다음 날부터" },
  { why: "지원 기간이 끝난 경우", when: "지원 기간 종료일 다음 날부터" },
  {
    why: "연 2회 확인조사에서 차상위 등 자격을 잃었거나 소득 기준을 넘은 경우",
    when: "변경 결정 다음 날부터",
  },
  {
    why: "영아 기준 최근 6개월 동안 통산 90일을 넘게 해외에 머문 경우",
    when: "변경 결정 다음 날부터",
  },
];
