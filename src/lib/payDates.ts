/**
 * 지원금이 **들어오는 날**.
 *
 * ── 왜 만들었나 ────────────────────────────────────────────────
 * 네이버 데이터랩으로 검색량을 재 봤다(2026-09-06, 최근 1년 월 단위).
 * "근로장려금 지급일" **한 낱말**이 "청년월세 · 청년월세지원 · 청년월세 신청"
 * 세 낱말을 합친 것의 3배였다(2026년 8월 기준). 그런데 그때 이 사이트에는
 * **"지급일"이라는 말이 한 번도 나오지 않았다.**
 *
 * 안 쓴 게 아니라 **알 수가 없었다.** 우리가 받는 공공데이터에 그 값이 없다.
 * 조회수 상위 120건의 본문을 다 뒤져 "매월 N일"이 적힌 것은 **2건**뿐이었다
 * (기초연금, 인천형 청년월세). 복지로 상세 화면에도 지급일 칸이 없다 —
 * 기초연금 페이지를 열어 확인했다.
 *
 * 그래서 이 파일은 데이터를 집계한 것이 아니라, **법령을 한 조씩 찾아
 * 옮긴 것**이다. 지급일은 대개 시행령·시행규칙에 못 박혀 있다.
 *
 * ── 규칙 ────────────────────────────────────────────────────────
 * · 근거 조문을 찾은 것만 싣는다. 부모급여는 조회수 11위(171만)로 크지만
 *   「아동수당법」에도 「영유아보육법」에도 지급일 조문이 없어 **뺐다.**
 *   흔히 25일이라고들 하지만, 확인 못 한 것은 넣지 않는다(CLAUDE.md 3절).
 * · `quote`는 **원문 그대로**다. 줄여 쓰거나 다듬지 않는다.
 * · 항목마다 출처 링크와 확인일을 남긴다.
 * · 법령은 개정된다. 화면에 확인일을 찍고 원문으로 보낸다.
 */

/** 국가법령정보센터. 법령명으로 바로 열린다. */
const lawUrl = (name: string) =>
  encodeURI(`https://www.law.go.kr/법령/${name}`);

export type PayDate = {
  /** 잇는 상세 페이지. 수록된 사업이어야 한다. */
  id: string;
  label: string;
  /** 매월 며칠. 달마다 고정이 아닌 것(근로장려금)은 null. */
  day: number | null;
  /** 사람이 읽는 표현. */
  when: string;
  /** 근거 원문. 손대지 않는다. */
  quote: string;
  source: string;
  sourceUrl: string;
  note: string | null;
  /** 사람이 그 화면을 열어 확인한 날 */
  checkedAt: string;
};

const CHECKED = "2026-09-06";

export const PAY_DATES: readonly PayDate[] = [
  {
    id: "WLF00003201",
    label: "주거급여",
    day: 20,
    when: "매월 20일",
    quote:
      "주거급여를 현금으로 정기적으로 실시하는 경우에는 매월 20일(토요일이거나 공휴일인 경우에는 그 전날로 한다)에 지급하여야 한다.",
    source: "주거급여법 시행규칙 제3조제2항",
    sourceUrl: lawUrl("주거급여법 시행규칙"),
    note: null,
    checkedAt: CHECKED,
  },
  {
    id: "WLF00003249",
    label: "장애인연금",
    day: 20,
    when: "매월 20일",
    quote:
      "장애인연금은 매월 20일(토요일이거나 공휴일인 경우에는 그 전날로 한다. 이하 같다)에 수급자가 지정하는 수급자 명의의 금융회사계좌에 입금하는 방법으로 지급한다.",
    source: "장애인연금법 시행령 제11조제1항",
    sourceUrl: lawUrl("장애인연금법 시행령"),
    note: "계좌가 없거나 타인 명의여서 20일에 못 넣은 경우에는, 계좌를 다시 받아 그 달 말일에 넣을 수 있다고 같은 조 제2항에 적혀 있습니다.",
    checkedAt: CHECKED,
  },
  {
    id: "WLF00001132",
    label: "생계급여",
    day: 20,
    when: "매월 20일",
    quote:
      "생계급여에 해당하는 금전을 매월 정기적으로 미리 지급하는 경우에는 매월 20일(토요일이거나 공휴일인 경우에는 그 전날로 한다)에 금융회사등의 수급자 명의의 지정된 계좌에 입금해야 한다.",
    source: "국민기초생활 보장법 시행령 제6조제1항",
    sourceUrl: lawUrl("국민기초생활 보장법 시행령"),
    note: "설·추석 연휴가 걸리면 정부가 앞당겨 지급한 해가 있습니다. 앞당기는 것은 그해 결정 사항이라 여기 적지 않습니다.",
    checkedAt: CHECKED,
  },
  {
    id: "WLF00001164",
    label: "기초연금",
    day: 25,
    when: "매월 25일",
    quote:
      "기초연금은 매월 25일(토요일이거나 공휴일인 경우에는 그 전날로 한다)에 금융기관 또는 우편관서의 기초연금 수급자 명의의 계좌에 입금하는 방법으로 지급한다.",
    source: "기초연금법 시행규칙 제9조제1항",
    sourceUrl: lawUrl("기초연금법 시행규칙"),
    note: null,
    checkedAt: CHECKED,
  },
  {
    id: "WLF00001171",
    label: "아동수당",
    day: 25,
    when: "매월 25일",
    quote:
      "아동수당은 매월 25일(토요일이거나 공휴일인 경우에는 그 전날로 한다. 이하 같다)에 수급아동 또는 그 보호자 명의의 금융회사계좌로 입금하는 방법으로 지급한다.",
    source: "아동수당법 시행령 제9조제1항",
    sourceUrl: lawUrl("아동수당법 시행령"),
    note: null,
    checkedAt: CHECKED,
  },
  {
    id: "WLF00001148",
    label: "근로·자녀장려금",
    day: null,
    when: "신청한 문에 따라 다름",
    quote:
      "정기신청분은 9월 말까지, 반기신청 상반기분은 2026년 12월 30일, 기한 후 신청은 신청일로부터 4개월 이내에 지급합니다.",
    source: "국세청 — 심사 및 지급",
    sourceUrl:
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2453&cntntsId=7784",
    note: "매달 들어오는 돈이 아닙니다. 어느 문으로 신청했느냐에 따라 시점이 갈립니다.",
    checkedAt: CHECKED,
  },
];

/** 같은 날 들어오는 것끼리 묶는다. 날짜가 정해진 것만. */
export function byDay(): { day: number; items: readonly PayDate[] }[] {
  const days = [...new Set(PAY_DATES.map((p) => p.day))]
    .filter((d): d is number => d !== null)
    .sort((a, b) => a - b);
  return days.map((day) => ({
    day,
    items: PAY_DATES.filter((p) => p.day === day),
  }));
}

/** 매달 같은 날이 아닌 것 — 근로장려금처럼 신청 방식으로 갈리는 것. */
export const IRREGULAR = PAY_DATES.filter((p) => p.day === null);
