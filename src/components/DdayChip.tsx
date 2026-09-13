"use client";

import { useLocalToday } from "@/lib/useLocalToday";
import { ddayIn, ddayLabel } from "@/lib/dday";

/**
 * 「D-3」 딱지 — 끝나는 날이 **열흘 안**일 때만 나타난다(`lib/dday.ts`).
 *
 * 서버에서는 아무것도 그리지 않는다. 브라우저가 오늘로 세므로 하루가 지날
 * 때마다 배포 없이 하나씩 줄고, 끝나는 날이 지나면 사라진다 — 그다음부터는
 * 「마감」 딱지(`DeadlineBadge`)나 「기간 지남」이 그 자리를 받는다.
 *
 * 색은 「마감」의 호박색과 **다르게** 붉은 쪽으로 뒀다. 둘은 읽는 사람이 할 일이
 * 반대다 — 마감은 "이번엔 끝났다", D-day는 "지금 서둘러야 한다".
 */
export default function DdayChip({
  end,
  title,
}: {
  /** 끝나는 날 `YYYY-MM-DD`. null이면 아무것도 안 그린다. */
  end: string | null;
  /** 마우스를 올리면 보이는 설명. 무엇이 끝나는지 원문 조각을 넣는다. */
  title?: string;
}) {
  const today = useLocalToday();
  const n = ddayIn(end, today);
  if (n === null) return null;

  return (
    <span
      title={title}
      className="inline-flex items-center rounded-full border border-rose-300 bg-rose-50 px-2 py-0.5 text-xs font-extrabold text-rose-700 tabular-nums"
    >
      {ddayLabel(n)}
    </span>
  );
}
