import { CLOSING } from "@/data/closing";
import { buildReminderIcs } from "@/lib/ics";
import { kstToday, nextCheckDate } from "@/lib/reminder";

/**
 * 「내년에 다시 확인하기」 일정 파일 — `/remind/<id>.ics` (2026-09-17).
 *
 * `/calendar/<key>.ics`와 달리 **요청 때 만든다.** 날짜가 오늘에 달려 있어서다
 * (지난 신청 시작일 2주 전이 올해 이미 지났으면 다음 해로 민다 — `lib/reminder.ts`).
 * 누를 때만 불리는 파일이라 비용이 거의 없다.
 *
 * 아이폰·네이버 캘린더는 파일 주소로 열어야 캘린더 앱이 뜬다 — 브라우저에서
 * 만든 data: 주소는 「파일」 앱으로 내려받아지고 만다. 그래서 서버 파일로 둔다.
 * 사이트맵에 넣지 않는다(페이지가 아니다).
 */
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  const id = key.replace(/\.ics$/, "");
  const c = /^WLF\d+$/.test(id) ? CLOSING[id] : undefined;
  const today = kstToday();
  const date = c ? nextCheckDate(c, today) : null;

  if (!c || !date) {
    return new Response(
      "이 사업은 지난 신청 기간을 읽을 수 없거나 기간이 아직 끝나지 않아 확인 일정을 만들지 않았습니다.\n",
      { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  return new Response(
    buildReminderIcs({ id, name: c.name, date, periodText: c.text, today }),
    {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="bokjiclick-remind-${id}.ics"`,
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
