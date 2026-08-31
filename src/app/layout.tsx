import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — 전국 복지·지원금 정보`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE.name,
    url: SITE.url,
  },
  /*
    아직 데이터가 하나도 없다. 빈 사이트가 색인되면 "가치 없는 콘텐츠"로 남아
    애드센스 심사에도 불리하다. 데이터를 채운 뒤 이 줄을 지운다.
  */
  robots: { index: false, follow: false },
};

function SiteHeader() {
  return (
    <header className="border-b border-slate-200">
      <div className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-4">
        <Link href="/" className="text-lg font-bold text-slate-900">
          {SITE.name}
        </Link>
        <nav className="flex gap-4 text-sm text-slate-600">
          <Link href="/region" className="hover:text-slate-900">
            지역별
          </Link>
          <Link href="/target" className="hover:text-slate-900">
            대상별
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200">
      <div className="mx-auto max-w-5xl space-y-3 px-4 py-8 text-sm text-slate-500">
        <p>
          {SITE.name}은 공공데이터를 정리해 보여주는 민간 사이트입니다.
          정부·지자체 공식 기관이 아닙니다.
        </p>
        <p>신청 자격과 금액은 반드시 각 서비스의 공식 안내로 최종 확인하세요.</p>
        {/*
          소개·개인정보처리방침·이용약관·문의 링크는 해당 페이지를 실제로 쓴 뒤에
          넣는다. 지금 넣으면 404가 되고, 자리만 채운 얇은 페이지를 만드는 것도
          해법이 아니다(러닝온에서 얇은 페이지 241개를 지운 이유와 같다).
          개인정보처리방침은 애드센스 신청 전에 반드시 있어야 한다.
        */}
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-slate-900">
        <SiteHeader />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
