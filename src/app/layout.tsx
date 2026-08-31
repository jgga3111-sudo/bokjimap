import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
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
  /* Bing 웹마스터도구 소유 확인. GSC 계정을 연동(Import)하면 구글 계정 권한을
     넘겨야 해서 메타태그 방식으로 했다. */
  verification: {
    other: { "msvalidate.01": "C5361F9F63266AE3AB236F6A6E92DED5" },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE.name,
    url: SITE.url,
  },
  /*
    상세 본문(지원대상·선정기준·지원내용)을 아직 못 받았다. 요약문만 있는
    600개 페이지가 색인되면 러닝온 /courses의 재현이 되고, 애드센스 심사에도
    그대로 남는다(docs/02). 상세를 채운 뒤 이 줄을 지운다.

    nofollow는 뺐다 — 내부 링크는 따라가게 두어야 색인 해제 시점에 구조가
    이미 파악돼 있다.
  */
  robots: { index: false, follow: true },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
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
