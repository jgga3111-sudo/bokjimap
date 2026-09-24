import { GUIDES } from "@/lib/guides";
import { GUIDE_PUBLISHED } from "@/lib/guidePublished";
import { SITE } from "@/lib/site";

/**
 * 안내 글 RSS — `/rss.xml` (2026-09-24).
 *
 * 글이 거의 매일 한 편씩 느는데 구독할 길이 없었다. 네이버 서치어드바이저도
 * RSS를 따로 받는다(제출은 사용자 몫). 상세·허브는 싣지 않는다 — 원문을
 * 옮긴 페이지라 새 글 소식이 아니다.
 *
 * 빌드 때 만든다. guides.ts가 손으로 적은 상수라 요청 때 계산할 것이 없다.
 */
export const dynamic = "force-static";

const esc = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** 날짜만 있는 값을 RFC 822로. 한국 오전 9시(00:00 UTC)로 둔다. */
const rfc822 = (ymd: string) => new Date(`${ymd}T00:00:00Z`).toUTCString();

export function GET() {
  const items = [...GUIDES]
    .sort((a, b) =>
      (GUIDE_PUBLISHED[b.slug] ?? b.updated).localeCompare(GUIDE_PUBLISHED[a.slug] ?? a.updated),
    )
    .map((g) => {
      const url = `${SITE.url}/guide/${g.slug}`;
      return `    <item>
      <title>${esc(g.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(g.summary)}</description>
      <pubDate>${rfc822(GUIDE_PUBLISHED[g.slug] ?? g.updated)}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)} — 복지 신청 안내</title>
    <link>${SITE.url}/guide</link>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${esc(SITE.description)}</description>
    <language>ko</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
