"use client";

import { CLOSING } from "@/data/closing";
import { useLocalToday } from "@/lib/useLocalToday";

/**
 * 「마감」 딱지 — 끝나는 날이 적혀 있고 그날이 **이미 지난** 사업에만 붙는다.
 *
 * 2026-09-13 사용자 요청("마감된 정보는 마감 처리 따로"). 그 전에는 상세
 * 페이지 띠(`PastPeriodNotice`)에서만 알 수 있었다 — 조회수 1위
 * 청년내일저축계좌('26.5.20. 모집 끝)가 첫 화면 순위표 맨 위에서 아무 표시 없이
 * 나가고 있었다.
 *
 * ── 판정은 브라우저가 한다 ─────────────────────────────────────
 * 끝날은 빌드 때 뽑아 둔 `CLOSING` 표에서 읽고, 오늘과의 비교만 여기서 한다.
 * 서버에서는 아무것도 그리지 않는다(`useLocalToday`가 null). 그래서 배포를
 * 안 해도 날짜가 지나는 순간 스스로 붙는다.
 *
 * ── 「마감」 한 낱말이 무엇을 뜻하나 ───────────────────────────
 * 우리가 아는 것은 **원문에 적힌 기간이 지났다**는 사실뿐이다. 추가 모집이나
 * 올해 새 공고는 모른다(3절). 딱지는 짧게 「마감」이라고 쓰되, 마우스를 올리면
 * 무엇이 지났는지 원문 조각을 그대로 보여준다. 긴 설명은 상세의 띠가 한다.
 *
 * ── 색 ──────────────────────────────────────────────────────────
 * 지급 형태 딱지는 파랑·회색 두 가지만 쓴다(display.ts). 이건 그 규칙의
 * 예외다 — `IncomeMatch`처럼 **조건이 맞을 때만** 나타나는 상태 표시이고,
 * 상세의 지난 기간 띠와 같은 호박색으로 맞췄다.
 */
export default function ClosedBadge({ id }: { id: string }) {
  const today = useLocalToday();
  const c = CLOSING[id];
  if (!isClosed(id, today) || !c) return null;

  const title =
    c.kind === "stated"
      ? `원문에 「${c.text}」이라고 적혀 있습니다`
      : `원문에 적힌 ${c.kind === "period" ? "신청 기간" : "사업 기간"}(${c.text})이 지났습니다`;
  return (
    <span
      title={title}
      className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-900"
    >
      마감
    </span>
  );
}

/**
 * 지났는지. 서버에서는 늘 false(오늘이 없다).
 *
 * `stated`(원문이 마감이라고 적은 것)는 날짜가 없어 늘 마감이다. 그래도
 * `today`가 있을 때만 참을 돌려준다 — 딱지가 브라우저에서만 그려진다는 규칙을
 * 세 갈래 모두 같게 지켜야, 서버 HTML과 화면이 갈래마다 달라지지 않는다.
 */
export function isClosed(id: string, today: string | null): boolean {
  const c = CLOSING[id];
  if (!today || !c) return false;
  return c.kind === "stated" || (c.end !== null && c.end < today);
}
