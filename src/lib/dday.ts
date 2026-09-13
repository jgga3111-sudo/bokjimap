/**
 * D-day 계산 — 끝나는 날까지 **며칠 남았나**.
 *
 * 2026-09-13 사용자 결정: **D-10부터 보여 주고, 끝나는 날이 지나면 「마감」**.
 *
 * ── 왜 10일부터인가 ────────────────────────────────────────────
 * 끝날이 적힌 사업을 전부 세 보면(09-13) D-2부터 **D-26772**(2099년)까지 있다.
 * 2050·2099년 같은 날짜는 신청 마감이 아니라 사업 시행 기간을 형식으로 채운
 * 값이라, 숫자를 그대로 걸면 이상한 사이트로 읽힌다. 열흘 안으로 좁히면 그런
 * 숫자는 저절로 안 나오고, 남는 것은 **정말로 곧 끝나는 것**뿐이다.
 *
 * ── 판정은 브라우저가 한다 ─────────────────────────────────────
 * 이 파일은 계산만 한다. 오늘은 부르는 쪽이 `useLocalToday()`로 넘긴다 —
 * 빌드한 날로 세면 D-2가 정적 HTML에 굳어 사흘 뒤에도 D-2라고 말한다.
 * 브라우저가 매번 오늘로 세므로 **배포를 안 해도 하루마다 하나씩 줄어든다.**
 */

/** 이 날수 안으로 들어오면 D-day를 보여준다. */
export const DDAY_WINDOW = 10;

/**
 * `today`에서 `end`까지 남은 날수. 같은 날이면 0, 지났으면 음수.
 *
 * 두 날짜를 **UTC 자정**으로 놓고 뺀다. `YYYY-MM-DD` 문자열은 이미 현지 날짜라
 * 시각이 끼면 안 된다 — `new Date("2026-09-15")`를 현지 시각과 섞으면 한국에서
 * 하루가 어긋난다.
 */
export function daysUntil(end: string, today: string): number {
  const toDay = (s: string) => {
    const [y, m, d] = s.split("-").map(Number);
    return Date.UTC(y, m - 1, d) / 86_400_000;
  };
  return toDay(end) - toDay(today);
}

/** D-day 창 안이면 남은 날수, 아니면 null. 끝나는 당일(0)도 창 안이다. */
export function ddayIn(end: string | null, today: string | null): number | null {
  if (!end || !today) return null;
  const n = daysUntil(end, today);
  return n >= 0 && n <= DDAY_WINDOW ? n : null;
}

/** 0 → "D-day", 3 → "D-3" */
export const ddayLabel = (n: number) => (n === 0 ? "D-day" : `D-${n}`);
