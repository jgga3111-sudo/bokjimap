"use client";

import { useLocalToday } from "@/lib/useLocalToday";

/**
 * 희망저축계좌 2026년 모집 일정 표의 줄들. 「지남」 표시는 빌드한 날이 아니라
 * 브라우저의 오늘로 정한다 — 배포를 안 하는 동안에도 날짜가 지나면 저절로 바뀐다.
 * (서버 렌더에서는 오늘을 모르므로 지남 표시 없이 그린다.)
 */
export type HopeRow = { kind: string; round: string; when: string; end: string };

const td = "px-3 py-2";

export default function HopeScheduleRows({ rows }: { rows: HopeRow[] }) {
  const today = useLocalToday();
  return (
    <>
      {rows.map((r) => {
        const past = today !== null && today > r.end;
        return (
          <tr key={`${r.kind}${r.round}`} className={`border-b border-line ${past ? "text-muted" : ""}`}>
            <td className={`${td} font-medium`}>{r.kind}</td>
            <td className={td}>{r.round}</td>
            <td className={`${td} tabular-nums`}>
              {r.when}
              {past ? " · 지남" : ""}
            </td>
          </tr>
        );
      })}
    </>
  );
}
