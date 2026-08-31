import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
import { jsonLd } from "@/lib/safe";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — 전국 복지·지원금 정보`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  /*
    검색엔진 소유 확인 — 둘 다 메타태그 방식이다.

    구글은 URL 접두어 속성(https://bokjimap.co.kr)으로 등록했다. 도메인 속성은
    가비아에 DNS TXT를 넣어야 하는데, www와 vercel.app을 이미 apex로 308
    보내고 있어서 접두어 하나로 충분하다. 계정은 jgga1234567 쪽이다.

    빙은 GSC 계정을 연동(Import)하면 구글 계정 권한을 넘겨야 해서 메타태그로 했다.

    ⚠ 이 값을 지우면 소유 확인이 풀린다. 도메인이나 계정을 바꿀 때만 건드린다.
  */
  verification: {
    google: "xE6nEUGW4MWq9peHNikUemhdKxL1EAfsw5eFvEuDiBU",
    other: { "msvalidate.01": "C5361F9F63266AE3AB236F6A6E92DED5" },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE.name,
    url: SITE.url,
  },
  /*
    2026-09-01, 사이트 전체 noindex를 풀었다.

    걸어 둔 이유는 "요약문만 있는 페이지가 색인되면 러닝온 /courses의 재현이
    된다"였다(docs/02). 이제 상세 본문을 받아 수록 900건 중 670건에 본문이
    있고, 본문 길이 중앙값이 64자에서 355자가 됐다.

    여기를 푼다고 전부 색인되는 것은 아니다. 본문이 MIN_BODY_LENGTH에 못 미치는
    항목은 상세 페이지에서 각자 noindex로 나가고 사이트맵에도 안 실린다
    (types/welfare.ts의 isIndexable). 얇은 페이지를 거르는 일은 그쪽이 계속 한다.
  */
};

/**
 * 사이트 수준 구조화 데이터.
 *
 * WebSite로 사이트 정체를 알리고, publisher를 Organization이 아니라 Person으로
 * 둔다 — 개인이 운영하는 사이트를 기관인 것처럼 표시하면 안 된다. 정부 기관과
 * 혼동될 여지를 만들지 않는 게 이 주제에서는 특히 중요하다.
 */
const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: "ko-KR",
  publisher: { "@type": "Person", name: SITE.operator },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(siteJsonLd) }}
        />
        <SiteHeader />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
