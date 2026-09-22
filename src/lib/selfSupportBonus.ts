/**
 * 자활성공지원금 — 언제까지 일해야 받는가 (2026-09-23).
 *
 * ── 왜 따로 확인했나 ────────────────────────────────────────────
 * 복지로 원문(WLF00006196, 조회수 30위)은 금액과 요건 네 가지를 한 줄씩 적는다 —
 * 「자활근로사업 참여 이력 · 민간시장 취·창업 · 생계급여 탈수급 · 일정기간
 * (6개월·1년) 경과」. 그런데 **그 넷을 어떻게 재는지가 한 글자도 없다.**
 * 주 몇 시간을 일해야 하는지, 프리랜서는 얼마를 벌어야 하는지, 회사를 옮기면
 * 처음부터 다시 세는지, 이미 퇴사했으면 못 받는지 — 실제로 갈리는 자리가 전부
 * 빠져 있다.
 *
 * 서치콘솔에서 「자활성공지원금」이 몇 주째 노출만 되고 클릭이 0이었다
 * (2026-09-23 기준 7일 노출 10 · 클릭 0). 검색해서 들어와도 답이 없었다는 뜻이다.
 *
 * ── 출처 ────────────────────────────────────────────────────────
 * **복지로 원문에 첨부된 지침을 그대로 썼다** — 보건복지부 「자활성공지원금
 * 지급·관리('25.10월)」 13쪽. 이 사업은 '25년 11월에 지급이 시작돼서 첨부가
 * 낡지 않았다(기저귀·디딤씨앗통장에서 겪은 것과 다른 경우다).
 *  · 근거 법령·개요 2쪽 · 요건별 판단기준 3~7쪽 · 지급시기와 절차 8~9쪽
 *  · 중복 지급 불가 목록 9~10쪽 · 불가피한 사유 특례 10쪽 · 서식 11~13쪽
 *
 * ── 계산에서 한 것과 안 한 것 ──────────────────────────────────
 * 하는 것은 **지침 8쪽의 「역에 의한 계산」으로 1·2회차 날짜를 세는 것**뿐이다.
 * 지침이 든 예(’25.6.15. 취업 → 1회차 ’25.12.14., 2회차 ’26.6.14.)와 값이 같은 것을
 * 확인했다. 자격 판정은 하지 않는다(CLAUDE.md 3절) — 요건 충족 여부는 시·군·구가
 * 정하고, 처리기간은 30일(연장 시 60일)이다.
 */

export const SSB_CHECKED = "2026-09-23";
export const SSB_SOURCE_ID = "WLF00006196";
/** 자활근로 상세 — 이 지원금의 출발점이 되는 사업. */
export const SSB_JOB_ID = "WLF00001138";
export const SSB_DOC = "보건복지부 「자활성공지원금 지급·관리(’25.10월)」";

/** 회차별 금액 — 지침 2·8쪽. */
export const SSB_STEPS = [
  { round: 1, months: 6, amount: 500_000 },
  { round: 2, months: 12, amount: 1_000_000 },
] as const;
export const SSB_TOTAL = 1_500_000;

/** 임금근로자 요건 — 지침 3쪽. */
export const SSB_MIN_HOURS = 22;
/** 노무제공자·프리랜서 요건 — 지침 5쪽. */
export const SSB_MIN_INCOME = 900_000;

const lastDayOf = (y: number, m: number) => new Date(y, m + 1, 0).getDate();

/**
 * 「역에 의한 계산」 — 근무시작일부터 최후의 월에서 기산일의 전일까지(지침 8쪽).
 *
 * 그 달에 같은 날짜가 없으면 그 달의 말일로 본다. 예 —
 *  · ’25.6.15. 취업 + 6개월 → ’25.12.14.  (지침이 든 예와 같다)
 *  · ’25.3.1.  취업 + 6개월 → ’25.8.31.   (전일이 0일이라 앞 달 말일)
 */
export function servedUntil(start: Date, months: number): Date {
  const y = start.getFullYear();
  const m = start.getMonth() + months;
  const day = start.getDate() - 1;
  if (day === 0) {
    // 기산일이 1일이면 전일은 앞 달의 말일이다.
    const py = new Date(y, m - 1, 1);
    return new Date(py.getFullYear(), py.getMonth(), lastDayOf(py.getFullYear(), py.getMonth()));
  }
  const target = new Date(y, m, 1);
  const ty = target.getFullYear();
  const tm = target.getMonth();
  return new Date(ty, tm, Math.min(day, lastDayOf(ty, tm)));
}

export type SsbRound = {
  round: number;
  months: number;
  amount: number;
  until: Date;
  /** 오늘 기준으로 그 날이 지났는가 — 브라우저가 판정한다. */
  reached: boolean;
};

export function calcSelfSupportBonus(start: Date, today: Date): SsbRound[] {
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return SSB_STEPS.map((s) => {
    const until = servedUntil(start, s.months);
    return { ...s, until, reached: t.getTime() >= until.getTime() };
  });
}

/**
 * 같이 받을 수 없는 제도 — 지침 9~10쪽.
 * 「취·창업 및 근속 유도」를 목적으로 하는 사업끼리는 겹쳐 받지 못한다.
 */
export const SSB_CONFLICTS = [
  "취업성공수당 (고용노동부 국민취업지원제도)",
  "북한이탈주민 취업장려금 (통일부)",
  "고교 취업연계 장려금 (교육부)",
  "희망사다리장학금 (한국장학재단)",
  "청년 일자리도약 장려금 유형Ⅱ (고용노동부)",
  "근속을 조건으로 하는 자산형성지원사업 — 청년내일채움공제, 서울 희망두배 청년통장, 부산 청년 기쁨두배통장, 대구 청년희망적금, 인천 드림For 청년통장, 경기 청년 노동자 통장 등",
] as const;

/** 겹쳐 받아도 되는 것 — 지침이 예외로 못 박은 것들(9~10쪽). */
export const SSB_ALLOWED = [
  "희망저축계좌Ⅰ·Ⅱ (보건복지부)",
  "청년내일저축계좌 (차상위 이하)",
  "중소벤처기업부 내일채움공제 — 정부지원금 매칭이 없어서",
  "취·창업할 때 한 번 주는 지원금 중 근속 조건이 없는 것",
] as const;
