/**
 * 신청 달력 — **달마다 챙길 것.**
 *
 * 왜 만들었나. 네이버 데이터랩으로 지난 1년 검색량을 재 봤더니(2026-09-06,
 * 2025-09~2026-09 월 단위), 사람들은 복지를 아무 때나 찾지 않았다.
 *
 *   근로장려금 무리   5월 100 / 7월 18   → 5.5배
 *   청년 지원금 무리  5월 100 / 7월 12   → 8배
 *   문화누리 무리     2월  30 / 8월 8.7  → 3.5배
 *   에너지·난방 무리  7월  12 / 4월 4.0  → 3배
 *
 * 5월의 청년 봉우리는 이 표를 만들고 나서 설명이 붙었다 — 2026년 청년월세
 * 접수 마감이 **5월 29일**이었다. 수요는 제도가 아니라 **마감일**에 붙는다.
 *
 * 그런데 이 사이트에는 시기라는 개념이 아예 없었다. 안내 글 열두 편 중
 * 시기를 다루는 글이 하나도 없었고, 목록은 전부 "당신이 누구인가"로만
 * 갈린다.
 *
 * ── 왜 데이터에서 못 뽑고 손으로 적나 ──────────────────────────
 * `applyEnd`가 있는 사업이 570건인데 **554건이 `9999-12-31`**이다(상시).
 * 진짜 마감일은 API에 없다. 짐작해서 채우면 사람을 헛걸음시킨다(3절).
 * 그래서 **공식 출처에서 하나씩 확인한 것만** 여기 적는다.
 *
 * ── 적는 규칙 ──────────────────────────────────────────────────
 * · `source`는 반드시 **제도를 운영하는 기관**이다. 블로그·요약 기사는
 *   쓰지 않는다. 검색으로 먼저 걸린 것들이 전부 그런 글이었다.
 * · `period`는 **원문 표현 그대로** 옮긴다. 반올림도 요약도 하지 않는다.
 * · `checkedAt`은 사람이 실제로 그 페이지를 열어 확인한 날이다.
 *   3절이 요구하는 확인일을 이 파일에서는 항목마다 남긴다.
 * · 확인 못 한 것은 **적지 않는다.** 달을 골고루 채우려고 아는 척하지
 *   않는다. 스포츠강좌이용권은 신청 기간이 공식 화면에 안 적혀 있어
 *   12월 결제 마감만 넣었다.
 * · **내년 날짜를 지어내지 않는다.** 노인일자리는 2026년 사업 모집이
 *   2025년에 끝났다. 그 사실을 그대로 적고, 다음 해는 "그맘때 다시"로
 *   둔다 — 작년 공고를 올해로 옮기지 않는다(3절).
 *
 * 이 파일은 `services.ts`(2.9MB)를 **부르지 않는다.** 첫 화면의 이번 달
 * 알림이 클라이언트 컴포넌트라, 여기서 데이터를 물면 번들에 딸려 간다.
 */

export type CalendarEntry = {
  /** 잇는 상세 페이지. 수록된 사업이어야 한다. */
  id: string;
  /** 화면에 쓰는 짧은 이름. 원문 사업명이 길면 줄여 적는다. */
  label: string;
  /** 그 달에 무슨 일이 있는가 — 한 줄. */
  what: string;
  /** 걸리는 달(1~12). 여러 달에 걸치면 전부 적는다. */
  months: readonly number[];
  /** 원문에 적힌 기간 표현. 그대로 옮긴다. */
  period: string;
  /** 놓치면 어떻게 되는지. 없으면 null. */
  note: string | null;
  source: string;
  sourceUrl: string;
  /** 사람이 그 화면을 열어 확인한 날 */
  checkedAt: string;
};

const CHECKED = "2026-09-06";

export const CALENDAR: readonly CalendarEntry[] = [
  /* ── 근로·자녀장려금 (국세청) ───────────────────────────────
     조회수 23위인데 검색 수요는 우리가 잰 것 중 가장 컸다. 신청 창구가
     한 해에 **넷**이라 "언제인가"가 곧 "얼마 받는가"로 이어진다.

     정기신청 마감일은 국세청 안내 화면 둘이 서로 다르게 적고 있었다
     — 한 곳은 5월 31일, 다른 곳은 6월 1일. 둘 다 국세청이라 어느 쪽을
     버릴 근거가 없어, 5월 1일 시작만 단정하고 마지막 날은 홈택스에서
     확인하도록 적었다(3절: 엇갈리면 기록한다). */
  {
    id: "WLF00001148",
    label: "근로·자녀장려금",
    what: "반기신청 — 지난해 하반기 소득분",
    months: [3],
    period: "3월 1일~3월 15일",
    note: "근로소득만 있는 사람이 미리 나눠 받는 방식입니다.",
    source: "국세청",
    sourceUrl:
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40397&cntntsId=238977",
    checkedAt: CHECKED,
  },
  {
    id: "WLF00001148",
    label: "근로·자녀장려금",
    what: "정기신청 — 한 해에 한 번뿐인 본신청",
    months: [5],
    period: "5월 1일~5월 31일",
    note: "국세청 안내 화면에 마감일이 5월 31일과 6월 1일로 다르게 적혀 있습니다. 마지막 날은 홈택스에서 확인하세요.",
    source: "국세청",
    sourceUrl:
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2453&cntntsId=7784",
    checkedAt: CHECKED,
  },
  {
    id: "WLF00001148",
    label: "근로·자녀장려금",
    what: "기한 후 신청 — 5월을 놓쳤다면",
    months: [6, 7, 8, 9, 10, 11, 12],
    period: "6월 2일~12월 1일",
    note: "받을 수는 있지만 95%만 나옵니다. 5월에 하는 것과 5%가 다릅니다.",
    source: "국세청",
    sourceUrl:
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40397&cntntsId=238977",
    checkedAt: CHECKED,
  },
  {
    id: "WLF00001148",
    label: "근로·자녀장려금",
    what: "반기신청 — 올해 상반기 소득분",
    months: [9],
    period: "9월 1일~9월 15일",
    note: "상반기분을 신청하면 하반기분도 자동으로 신청된 것으로 봅니다.",
    source: "국세청",
    sourceUrl:
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40397&cntntsId=238977",
    checkedAt: CHECKED,
  },
  {
    id: "WLF00001148",
    label: "근로·자녀장려금",
    what: "정기신청분 지급",
    months: [9],
    period: "9월 말까지",
    note: null,
    source: "국세청",
    sourceUrl:
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2453&cntntsId=7784",
    checkedAt: CHECKED,
  },
  {
    id: "WLF00001148",
    label: "근로·자녀장려금",
    what: "반기 상반기분 지급",
    months: [12],
    period: "2026년 12월 30일",
    note: "연간 산정액의 35%가 먼저 나옵니다. 나머지는 다음 해 6월 말입니다.",
    source: "국세청",
    sourceUrl:
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2453&cntntsId=7784",
    checkedAt: CHECKED,
  },

  /* ── 청년월세 지원 (국토교통부·복지로) ──────────────────────
     조회수 2위. 5월의 검색 봉우리를 만든 장본인이다 — 마감이 5월 29일
     16시로 **시각까지** 정해져 있다. */
  {
    id: "WLF00004661",
    label: "청년월세 지원",
    what: "신청 접수 (2026년분)",
    months: [3, 4, 5],
    period: "2026년 3월 30일(월) 09시 ~ 2026년 5월 29일(금) 16시",
    note: "월 20만원씩 최대 24개월, 생애 1회입니다. 마감이 시각까지 정해져 있습니다.",
    source: "복지로",
    sourceUrl: "https://blog.bokjiro.go.kr/1828",
    checkedAt: CHECKED,
  },

  /* ── 에너지바우처 (한국에너지공단) ──────────────────────────
     조회수 5위. 신청은 한 번인데 **쓰는 기간이 여름·겨울로 갈린다.**
     여름 몫을 안 쓰고 넘기면 그대로 사라진다. */
  {
    id: "WLF00000072",
    label: "에너지바우처",
    what: "신청 접수 — 여름·겨울 몫을 한 번에",
    months: [6, 7, 8, 9, 10, 11, 12],
    period: "2026년 6월 15일 ~ 2026년 12월 31일",
    note: "읍·면·동 행정복지센터에서 신청합니다.",
    source: "한국에너지공단 에너지바우처",
    sourceUrl: "https://www.energyv.or.kr/",
    checkedAt: CHECKED,
  },
  {
    id: "WLF00000072",
    label: "에너지바우처",
    what: "여름 몫 사용 기간",
    months: [7, 8, 9],
    period: "2026년 7월 1일 ~ 2026년 9월 30일",
    note: "전기요금에서 차감되는 방식입니다. 이 기간에 발행된 고지서에만 붙습니다.",
    source: "한국에너지공단 에너지바우처",
    sourceUrl: "https://www.energyv.or.kr/",
    checkedAt: CHECKED,
  },
  {
    id: "WLF00000072",
    label: "에너지바우처",
    what: "겨울 몫 사용 기간",
    months: [10, 11, 12, 1, 2, 3, 4, 5],
    period: "2026년 10월 1일 ~ 2027년 5월 31일",
    note: "전기·도시가스·지역난방·등유·연탄·LPG에 쓸 수 있습니다.",
    source: "한국에너지공단 에너지바우처",
    sourceUrl: "https://www.energyv.or.kr/",
    checkedAt: CHECKED,
  },

  /* ── 통합문화이용권 = 문화누리카드 (지역문화진흥원) ──────────
     조회수 35위. 이름이 둘이라 검색이 갈린다 — 우리 데이터에 적힌 이름은
     「통합문화이용권」인데 사람들이 치는 말은 「문화누리카드」다. */
  {
    id: "WLF00000055",
    label: "문화누리카드(통합문화이용권)",
    what: "카드 발급 — 예산이 떨어지면 조기 마감됩니다",
    months: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    period: "2026. 2. 2.(월) ~ 2026. 11. 30.(월)",
    note: "기본 15만원에 생애주기별 추가 1만원이 붙습니다.",
    source: "문화누리카드",
    sourceUrl: "https://www.mnuri.kr/munhwa/cardIssueGuide.do",
    checkedAt: CHECKED,
  },
  {
    id: "WLF00000055",
    label: "문화누리카드(통합문화이용권)",
    what: "사용 마감 — 남은 돈은 이월되지 않습니다",
    months: [12],
    period: "2026. 2. 2.(월) ~ 2026. 12. 31.(목)",
    note: "12월 31일이 지나면 쓰지 않은 잔액은 사라집니다.",
    source: "문화누리카드",
    sourceUrl: "https://www.mnuri.kr/munhwa/cardIssueGuide.do",
    checkedAt: CHECKED,
  },

  /* ── 노인일자리 (보건복지부) ────────────────────────────────
     조회수 31위. **모집이 전년도에 끝난다** — 이 달력에서 가장 놓치기
     쉬운 항목이다. 2026년에 일하려면 2025년 11월에 신청했어야 했다. */
  {
    id: "WLF00001155",
    label: "노인일자리",
    what: "다음 해 참여자 모집",
    months: [11, 12],
    period: "2026년 사업은 2025년 11월 28일(금)~12월 26일(금)에 모집했습니다",
    note: "해가 바뀌기 전에 모집이 끝납니다. 다음 해 날짜는 그맘때 보건복지부 발표를 확인하세요.",
    source: "보건복지부 보도자료(2025-11-27)",
    sourceUrl:
      "https://www.mohw.go.kr/board.es?mid=a10503000000&bid=0027&list_no=1488037&act=view",
    checkedAt: CHECKED,
  },

  /* ── 스포츠강좌이용권 (국민체육진흥공단) ────────────────────
     신청 기간은 공식 화면에 안 적혀 있어 넣지 않았다. 대신 **매달 쓰지
     않으면 사라진다**는 것과 12월 마감만 확인해 적는다. */
  {
    id: "WLF00000076",
    label: "스포츠강좌이용권",
    what: "그해 마지막 결제 마감",
    months: [12],
    period: "2026년 12월 10일 (기한 이후 결제 절대 불가)",
    note: "당월에 쓰지 않은 지원금은 매달 자동으로 사라집니다.",
    source: "국민체육진흥공단 스포츠강좌이용권",
    sourceUrl: "https://svoucher.kspo.or.kr/",
    checkedAt: CHECKED,
  },
] as const;

/** 그 달에 걸리는 항목. 원본 순서를 지킨다(제도별로 묶여 있다). */
export function entriesOfMonth(month: number): readonly CalendarEntry[] {
  return CALENDAR.filter((e) => e.months.includes(month));
}

/** 이 달력이 다루는 제도 수 — 항목 수가 아니라 제도 수를 센다. */
export const PROGRAM_COUNT = new Set(CALENDAR.map((e) => e.id)).size;

export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
