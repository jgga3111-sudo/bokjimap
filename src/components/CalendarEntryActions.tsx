"use client";

import AddToCalendar from "@/components/AddToCalendar";
import DdayChip from "@/components/DdayChip";
import { useLocalToday } from "@/lib/useLocalToday";
import type { DatedEntry } from "@/lib/calendar";

/**
 * 신청 달력 항목의 딱지와 「캘린더에 담기」 단추 (2026-09-15).
 *
 * 첫 화면 이번 달 카드(`ThisMonth`)는 끝난 기간에 「기간 지남」을 달고 단추를 숨기는데,
 * 상세 페이지의 「복지클릭이 따로 확인한 것」과 `/guide/calendar`는 **지난 일정에도
 * 담기 단추를 내보내고 있었다**(조회수 2위 청년월세의 3/30~5/29 등, 09-15 점검에서 발견).
 * 지난 날짜를 캘린더에 담게 하는 것은 틀린 안내다.
 *
 * 판정은 브라우저가 오늘로 한다(`useLocalToday`). 서버에서는 오늘을 모르므로 단추만
 * 그리고, 수화 뒤에 지났으면 「기간 지남」으로 바꾼다 — 빌드한 날을 정적 HTML에 굳히지 않는다.
 */
export default function CalendarEntryActions({ entry }: { entry: DatedEntry }) {
  const today = useLocalToday();
  const passed = today !== null && entry.end < today;

  if (passed) {
    return (
      <span
        title={`${entry.period} — 이 기간은 지났습니다. 다음 일정은 공식 공고에서 확인해 주세요.`}
        className="inline-flex items-center rounded bg-sunken px-1.5 py-0.5 text-[11px] font-bold text-muted"
      >
        기간 지남
      </span>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <DdayChip end={entry.end} title={entry.period} />
      <AddToCalendar entry={entry} />
    </div>
  );
}
