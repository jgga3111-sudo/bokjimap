import { SITE } from "@/lib/site";
import type { DatedEntry } from "@/lib/calendar";

/**
 * 캘린더 담기 **링크**만 만드는 곳 — 브라우저에서도 안전하다.
 *
 * `.ics`를 실제로 짓는 `lib/ics.ts`와 일부러 갈라 뒀다. 그쪽은 바이트를 세느라
 * `TextEncoder`를 쓰고 파일 한 장을 통째로 조립하는데, 첫 화면의 「이번 달에
 * 챙길 것」은 **클라이언트 컴포넌트**라(달을 브라우저에서 읽어야 한다) 거기서
 * `ics.ts`를 물면 그 코드가 전부 브라우저 번들로 딸려 간다. 화면에 필요한
 * 것은 주소 두 개뿐이라 그 몫만 여기 둔다.
 */

/** 달력 칸에 뜰 짧은 제목. `what`의 설명 꼬리(「— …」)는 떼고 앞부분만 쓴다. */
export function icsTitle(e: DatedEntry): string {
  const head = e.what.split("—")[0].trim();
  return `[${SITE.name}] ${e.label} · ${head}`;
}

/**
 * 구글 캘린더는 링크 한 번으로 담긴다.
 *
 * 네이버는 이런 주소가 **없다**(2026-09-12 확인). 공식 캘린더 API는 있지만
 * OAuth 로그인이 필요하고, 그 API가 받는 본문이 결국 iCalendar 문자열이다.
 * 그래서 네이버·아이폰·아웃룩은 `.ics` 파일로 간다.
 */
export function googleCalendarUrl(e: DatedEntry): string {
  const day = e.end.replace(/-/g, "");
  const d = new Date(`${e.end}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  const next = d.toISOString().slice(0, 10).replace(/-/g, "");

  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: icsTitle(e),
    /* 종일 일정의 끝날은 **다음 날**이다(끝을 포함하지 않는다). */
    dates: `${day}/${next}`,
    details: [
      `기간: ${e.period}`,
      e.note ?? "",
      `출처: ${e.sourceUrl}`,
      `자세히: ${SITE.url}/service/${e.id}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}
