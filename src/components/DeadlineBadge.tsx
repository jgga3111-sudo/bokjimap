"use client";

import { CLOSING, type Closing } from "@/data/closing";
import { useLocalToday } from "@/lib/useLocalToday";
import { ddayIn, ddayLabel } from "@/lib/dday";

/**
 * 끝나는 날 딱지 — **D-10부터 「D-3」, 끝나는 날이 지나면 「마감」.**
 *
 * 처음(2026-09-13)에는 「마감」만 붙이는 `ClosedBadge`였다. 조회수 1위
 * 청년내일저축계좌('26.5.20. 모집 끝)가 첫 화면 순위표 맨 위에서 아무 표시 없이
 * 나가고 있어서 만들었다. 09-13에 사용자가 **끝나기 전 열흘도 세어 보여 달라**고
 * 해서 이름을 바꾸고 D-day를 더했다. 같은 표(`CLOSING`) · 같은 오늘
 * (`useLocalToday`)을 쓰므로, 「D-day」 다음 날이 곧바로 「마감」이다 — 둘 사이에
 * 빈 날이 생기지 않는다.
 *
 * ── 판정은 브라우저가 한다 ─────────────────────────────────────
 * 끝날은 빌드 때 뽑아 둔 `CLOSING` 표에서 읽고, 오늘과의 비교만 여기서 한다.
 * 서버에서는 아무것도 그리지 않는다. 그래서 배포를 안 해도 하루마다 D-day가
 * 하나씩 줄고, 날이 지나는 순간 「마감」으로 바뀐다.
 *
 * ── 무엇을 뜻하나 ──────────────────────────────────────────────
 * 우리가 아는 것은 **원문에 적힌 기간**뿐이다. 추가 모집·올해 새 공고·예산 조기
 * 소진은 모른다(3절). 딱지는 짧게 쓰고, 마우스를 올리면 무엇이 끝나는지 원문
 * 조각을 그대로 보여준다. 긴 설명은 상세의 띠가 한다(`DeadlineNotice`).
 * `stated`(원문이 마감이라고 적은 것)는 날짜가 없어 D-day가 없다.
 *
 * ── 색 ──────────────────────────────────────────────────────────
 * 지급 형태 딱지는 파랑·회색 두 가지만 쓴다(display.ts). 이건 그 규칙의
 * 예외다 — `IncomeMatch`처럼 **조건이 맞을 때만** 나타나는 상태 표시다.
 * 마감은 상세의 지난 기간 띠와 같은 호박색, D-day는 서둘러야 한다는 뜻이라
 * 붉은색으로 갈랐다(`DdayChip`과 같은 색).
 */
export default function DeadlineBadge({ id }: { id: string }) {
  const today = useLocalToday();
  const state = deadlineState(id, today);
  if (!state) return null;
  const c = CLOSING[id];

  if (state.kind === "closed") {
    return (
      <span
        title={closedTitle(c)}
        className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-900"
      >
        마감
      </span>
    );
  }
  return (
    <span
      title={`${what(c)}(${c.text})이 끝나기까지 ${state.days}일 남았습니다. 예산이 떨어지면 일찍 끝날 수 있습니다.`}
      className="inline-flex items-center rounded-full border border-rose-300 bg-rose-50 px-2 py-0.5 text-xs font-extrabold text-rose-700 tabular-nums"
    >
      {ddayLabel(state.days)}
    </span>
  );
}

const what = (c: Closing) =>
  c.kind === "period" ? "원문에 적힌 신청 기간" : "원문에 적힌 사업 기간";

const closedTitle = (c: Closing) =>
  c.kind === "stated"
    ? `원문에 「${c.text}」이라고 적혀 있습니다`
    : `${what(c)}(${c.text})이 지났습니다`;

export type DeadlineState =
  | { kind: "closed" }
  | { kind: "soon"; days: number };

/**
 * 이 사업이 지금 어느 상태인가. 서버에서는 늘 null(오늘이 없다).
 *
 * · `closed` — 끝나는 날이 지났거나, 원문이 마감이라고 적었다(`stated`).
 * · `soon`   — 끝나는 날까지 0~10일(`DDAY_WINDOW`). 0은 「D-day」.
 * · null     — 끝날이 없거나 열흘보다 멀다.
 *
 * `stated`도 `today`가 있을 때만 closed를 준다 — 딱지가 브라우저에서만
 * 그려진다는 규칙을 갈래마다 같게 지켜야 서버 HTML과 화면이 어긋나지 않는다.
 */
export function deadlineState(id: string, today: string | null): DeadlineState | null {
  const c = CLOSING[id];
  if (!today || !c) return null;
  if (c.kind === "stated") return { kind: "closed" };
  if (c.end === null) return null;
  if (c.end < today) return { kind: "closed" };
  const days = ddayIn(c.end, today);
  return days === null ? null : { kind: "soon", days };
}

/** 지났는지 — 「기간이 지난 지원」 모음이 고를 때 쓴다. */
export function isClosed(id: string, today: string | null): boolean {
  return deadlineState(id, today)?.kind === "closed";
}
