import type { DatedEntry } from "@/lib/calendar";
import { icsPath } from "@/lib/calendar";
import { googleCalendarUrl } from "@/lib/calendarLinks";

/**
 * 「내 캘린더에 담기」 — 신청 달력 항목 하나를 이용자의 캘린더로 보낸다.
 *
 * **우리는 알림을 보내지 않는다.** 메일을 보내려면 이메일 주소를 받아야 하고,
 * 그 순간 개인정보처리방침을 고치고 7일 전에 알려야 한다(방침 9조). 대신
 * `.ics` 안에 **3일 전 알림**을 넣어 이용자의 캘린더가 스스로 울리게 했다.
 * 우리 서버에 남는 것이 하나도 없다.
 *
 * 단추가 둘인 이유 — 구글만 「링크 한 번」이 되고, 네이버·아이폰·아웃룩은
 * `.ics` 파일로 간다(`lib/calendarLinks.ts` 머리말).
 *
 * 훅이 없어서 서버·클라이언트 어느 쪽에서 불러도 된다. 첫 화면의 이번 달
 * 카드는 클라이언트, `/guide/calendar`는 서버다.
 */
export default function AddToCalendar({ entry }: { entry: DatedEntry }) {
  const label = `${entry.label} ${entry.what.split("—")[0].trim()}`;

  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      <a
        href={icsPath(entry.key)}
        download
        aria-label={`${label} 일정을 내 캘린더에 담기 (ics 파일)`}
        className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-bold text-ink transition hover:border-brand hover:text-brand"
      >
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5 shrink-0"
        >
          <rect x="2" y="3.5" width="12" height="10.5" rx="2" />
          <path d="M5.5 1.75v3M10.5 1.75v3M2 7.25h12M8 9.25v3.25M6.25 10.75 8 12.5l1.75-1.75" />
        </svg>
        캘린더에 담기
      </a>
      <a
        href={googleCalendarUrl(entry)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} 일정을 구글 캘린더에 담기 (새 창)`}
        className="rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-bold text-muted transition hover:border-brand hover:text-brand"
      >
        구글 캘린더
      </a>
    </span>
  );
}
