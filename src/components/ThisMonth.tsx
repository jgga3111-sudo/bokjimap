"use client";

import Link from "next/link";
import { useLocalToday } from "@/lib/useLocalToday";
import { entriesOfMonth, hasDates } from "@/lib/calendar";
import AddToCalendar from "@/components/AddToCalendar";
import DdayChip from "@/components/DdayChip";

/**
 * 첫 화면 「이번 달에 챙길 것」 — 이번 달에 걸리는 신청·마감을 펼친다.
 *
 * ── 왜 클라이언트인가 (그대로 둔 이유) ─────────────────────────
 * 이 사이트는 전부 정적으로 미리 만들어 둔다. 서버에서 `new Date()`를 부르면
 * **빌드한 날의 달**이 HTML에 박히고, 배포를 안 하면 10월에도 9월이라고 적혀
 * 있게 된다. 그래서 서버는 아무것도 그리지 않고(null), 브라우저에서 달을 읽은
 * 뒤에만 나타난다. 색인으로 잃는 것은 없다 — 여기가 가리키는
 * `/guide/calendar`는 정적으로 만들어져 사이트맵에 들어간다.
 *
 * `calendar.ts`는 `services.ts`(2.9MB)를 부르지 않는다. 그래서 이 컴포넌트를
 * 클라이언트로 둬도 번들이 커지지 않는다. 같은 이유로 담기 링크는 `ics.ts`가
 * 아니라 가벼운 `calendarLinks.ts`에서 온다(`AddToCalendar` 머리말).
 *
 * ── 한 줄 배너에서 목록으로 (2026-09-12) ──────────────────────
 * 사용자가 "이번 달 마감되는 걸 첫 화면에 보여 달라"고 했다. 원래는 제도
 * 이름 둘만 흘리고 `/guide/calendar`로 보내는 한 줄이었다.
 *
 * ⚠ **수록 데이터의 마감일 칸으로는 못 만든다.** 900건 중 `applyEnd`가 실제
 * 날짜인 것이 16건뿐이고(330건은 칸 자체가 없고 554건이 `9999-12-31`),
 * 이번 달 마감은 **1건**이다. 그래서 여기 쓰는 것은 그 칸이 아니라 **공식
 * 출처에서 하나씩 확인해 손으로 적은 `calendar.ts`**다.
 *
 * 날짜 칸 달력(월 그리드)이 아니라 목록인 것도 데이터 때문이다 — 항목 절반이
 * 「6월 2일~12월 1일」처럼 여러 달에 걸친 기간이라, 칸을 칠하면 9월 30칸이
 * 거의 다 칠해져 **언제가 급한지가 안 보인다.**
 */

/* 오늘은 `useLocalToday`(현지 시각, 서버에서는 null)로 읽는다. 09-19까지 여기 사본이 있었는데
   세션 도중 날짜가 안 바뀐다고 봐서, 자정을 넘겨 열어 둔 탭이 어제 달·D-day에 머물렀다. */

/** 첫 화면에 펼칠 최대 개수. 넘는 것은 수로 말하고 달력으로 보낸다. */
const SHOWN = 4;

export default function ThisMonth() {
  const now = useLocalToday();

  if (now === null) return null;

  const month = Number(now.slice(5, 7));
  const rows = entriesOfMonth(month);
  if (rows.length === 0) return null;

  /* 끝나는 날이 가까운 것부터. "이번 달에 챙길 것"에서 알고 싶은 것은
     제도 이름이 아니라 **무엇이 먼저 끝나는가**다. 날짜를 확인 못 한 항목
     (「9월 말까지」·노인일자리)은 순서를 매길 수 없어 맨 뒤로 보낸다. */
  const sorted = [...rows].sort((a, b) => {
    const passed = (e: typeof a) => (hasDates(e) && e.end < now ? 1 : 0);
    if (passed(a) !== passed(b)) return passed(a) - passed(b);
    /* 둘 다 날짜가 없으면 0 — 전엔 양쪽 다 1을 돌려줘 순서가 흔들렸다. */
    if (!a.end || !b.end) return Number(!a.end) - Number(!b.end);
    return a.end.localeCompare(b.end);
  });

  const shown = sorted.slice(0, SHOWN);
  const more = sorted.length - shown.length;

  /* 09-24: 호박색 상자 → 흰 카드. 첫 화면에서 유일하게 노란 면이라 경고창처럼 보였다.
        호박색은 날짜 칸에만 남긴다 — 「기간」이라는 뜻은 거기서 충분히 읽힌다. */
  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(16,24,40,0.06)] ring-1 ring-line/70">
      <div className="flex items-baseline justify-between gap-3 px-5 pt-5 sm:px-6">
        <h2 className="inline-flex items-center gap-2 text-xl font-extrabold text-ink">
          {/* 📅였다. 기기마다 다른 그림이 나와 선 아이콘으로 바꿨다
              (SearchBox 주석과 같은 이유). 글자색을 따라가 호박색에 맞는다. */}
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            className="size-5 shrink-0 text-amber-600"
          >
            <rect x="2" y="3.5" width="12" height="10.5" rx="2" />
            <path d="M5.5 1.75v3M10.5 1.75v3M2 7.25h12" />
          </svg>
          {month}월에 챙길 것 {rows.length}가지
        </h2>
        <Link
          href={`/guide/calendar#m${month}`}
          className="shrink-0 text-sm text-muted hover:text-brand"
        >
          열두 달 전체 →
        </Link>
      </div>

      <p className="px-5 pb-3 pt-0.5 text-xs text-muted sm:px-6">
        기간이 정해져 있어 놓치면 못 받는 것만 공식 공고에서 확인해 모았습니다.
      </p>

      <ul className="divide-y divide-line border-t border-line">
        {shown.map((e) => {
          const dated = hasDates(e);
          const passed = dated && e.end < now;
          return (
            <li key={e.key} className="flex gap-3.5 px-5 py-3.5 sm:px-6">
              {/* 끝나는 날 조각(2026-09-19) — 무엇이 먼저 끝나는지를 글을 읽기 전에 보게 한다.
                  날짜를 확인 못 한 항목은 빈 조각을 그리지 않고 자리만 둔다. */}
              <span
                aria-hidden
                className={`flex w-11 shrink-0 flex-col items-center self-start rounded-lg border pt-1 pb-1.5 ${
                  !dated
                    ? "border-transparent"
                    : passed
                      ? "border-line bg-sunken text-muted"
                      : "border-amber-200 bg-amber-50 text-amber-800"
                }`}
              >
                {dated && (
                  <>
                    <span className="text-[10px] font-bold leading-tight">
                      {Number(e.end.slice(5, 7))}월
                    </span>
                    <span className="text-lg leading-none font-extrabold tabular-nums">
                      {Number(e.end.slice(8, 10))}
                    </span>
                    <span className="mt-0.5 text-[10px] leading-none">까지</span>
                  </>
                )}
              </span>
              <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <Link
                  href={`/service/${e.id}`}
                  className="font-bold text-ink hover:text-brand hover:underline"
                >
                  {e.label}
                </Link>
                <span className="text-sm text-slate-700">{e.what}</span>
                {/* D-10부터 끝나는 날까지(2026-09-13). 지나면 아래 「기간 지남」이
                    받는다. 목록·상세의 딱지와 같은 계산(lib/dday.ts)이다. */}
                {dated && !passed && <DdayChip end={e.end} title={e.period} />}
                {passed && (
                  <span className="rounded bg-sunken px-1.5 py-0.5 text-[11px] font-bold text-muted">
                    기간 지남
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted">{e.period}</p>
              {/* `note`(「95%만 나옵니다」 같은 것)는 여기서 뺐다. 넣으면 한 줄이
                  150px가 되어 넷만 펼쳐도 첫 화면이 700px 넘게 길어진다 —
                  09-11에 5,709 → 4,662px로 줄여 놓은 자리다. 이 카드가 답할 것은
                  **무엇이 언제 끝나는가**이고, 놓치면 어떻게 되는지는 바로
                  아래 「열두 달 전체」에 그대로 있다. */}
              {/* 날짜를 확인한 것만, 그리고 아직 안 지난 것만 담을 수 있다.
                  확인 못 한 것은 싣지 않는다(3절). */}
              {dated && !passed && (
                <div className="mt-2">
                  <AddToCalendar entry={e} />
                </div>
              )}
              </div>
            </li>
          );
        })}
      </ul>

      {more > 0 && (
        <Link
          href={`/guide/calendar#m${month}`}
          className="block border-t border-line px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-ground hover:text-brand"
        >
          이번 달 남은 {more}가지 더 보기 →
        </Link>
      )}
    </section>
  );
}
