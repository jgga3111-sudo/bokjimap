"use client";

import { CLOSING } from "@/data/closing";
import { useLocalToday } from "@/lib/useLocalToday";
import { nextCheckDate } from "@/lib/reminder";
import { SITE } from "@/lib/site";

/**
 * 신청 기간이 지난 사업에 「내년에 다시 확인하기」를 붙인다 (2026-09-17).
 *
 * 날짜의 뜻은 `lib/reminder.ts` 머리말 — **공고일이 아니라 우리가 정한 확인할 날**이다.
 * 화면에 그 말을 같이 적는다. 날짜가 오늘에 달려 있어 브라우저에서 그린다
 * (PastPeriodNotice와 같은 이유).
 */
export default function NextYearCheck({ id }: { id: string }) {
  const today = useLocalToday();
  const c = CLOSING[id];
  if (!today || !c) return null;
  const date = nextCheckDate(c, today);
  if (!date) return null;

  const [y, m, d] = date.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
  const google = `https://calendar.google.com/calendar/render?${new URLSearchParams({
    action: "TEMPLATE",
    text: `[${SITE.name}] ${c.name} · 모집 공고 확인하기`,
    dates: `${date.replace(/-/g, "")}/${next.replace(/-/g, "")}`,
    details: `지난 신청 기간: ${c.text}\n이 날짜는 공고일이 아닙니다. 지난번 신청 기간이 시작된 날의 2주 전으로 복지클릭이 정한 「확인해 볼 날」입니다.\n자세히: ${SITE.url}/service/${id}`,
  }).toString()}`;

  return (
    <div className="mt-2 rounded-xl border border-line bg-white px-4 py-3 text-sm leading-relaxed text-slate-700">
      <p>
        <strong className="text-ink">
          다음에 놓치지 않게 — {y}년 {m}월 {d}일에 「모집 공고 확인하기」를 캘린더에 담아 두세요.
        </strong>{" "}
        <span className="text-muted">
          공고일이 아니라, 지난번 신청이 시작된 날의 2주 전으로 저희가 정한 날입니다.
          다시 모집하는지는 아직 알 수 없습니다.
        </span>
      </p>
      <p className="mt-2 flex flex-wrap gap-1.5">
        <a
          href={`/remind/${id}.ics`}
          download
          className="inline-flex items-center rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-bold text-ink transition hover:border-brand hover:text-brand"
        >
          캘린더에 담기
        </a>
        <a
          href={google}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-bold text-muted transition hover:border-brand hover:text-brand"
        >
          구글 캘린더
        </a>
      </p>
    </div>
  );
}
