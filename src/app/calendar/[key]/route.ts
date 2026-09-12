import { DATED, CALENDAR } from "@/lib/calendar";
import { buildIcs } from "@/lib/ics";

/**
 * 신청 달력 항목 하나를 `.ics` 파일로 내려 준다 — `/calendar/<key>.ics`.
 *
 * **빌드 때 미리 만들어 둔다**(`force-static` + `generateStaticParams`).
 * 이 사이트는 808쪽이 전부 정적이고, 달력 내용은 손으로 적은 상수라
 * 요청 때 계산할 것이 하나도 없다. 정적으로 두면 CDN이 그대로 먹인다.
 *
 * 주소 끝에 `.ics`를 붙인 이유 — 휴대폰이 확장자를 보고 캘린더 앱을 연다.
 * 그래서 `key`는 `ktc-h1.ics` 꼴로 들어오고, 여기서 꼬리를 떼어 찾는다.
 *
 * ⚠ **사이트맵에 넣지 않는다.** 페이지가 아니라 파일이고, 색인돼도 검색
 * 결과에서 할 일이 없다. `audit-indexability`는 사이트맵을 훑으므로 여기를
 * 보지 않는다.
 */

export const dynamic = "force-static";

export function generateStaticParams() {
  return DATED.map((e) => ({ key: `${e.key}.ics` }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  const entry = DATED.find((e) => `${e.key}.ics` === key);

  if (!entry) {
    /* 날짜가 없어 파일을 안 만든 항목(「9월 말까지」·노인일자리)도 여기로
       온다. 그건 우리가 확인 못 한 것이지 오류가 아니라서, 사람이 읽을 수
       있는 한 줄을 준다. */
    const known = CALENDAR.some((e) => `${e.key}.ics` === key);
    return new Response(
      known
        ? "이 항목은 날짜가 확정되지 않아 캘린더 파일을 만들지 않았습니다.\n"
        : "그런 달력 항목이 없습니다.\n",
      {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      },
    );
  }

  return new Response(buildIcs(entry), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="bokjiclick-${entry.key}.ics"`,
    },
  });
}
