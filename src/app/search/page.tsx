import type { Metadata } from "next";
import { Suspense } from "react";
import SearchResults from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "복지 서비스 검색",
  /*
    검색 결과 페이지는 **절대 색인시키지 않는다.**

    질의마다 URL이 하나씩 생기므로 그대로 두면 내용이 거의 같은 페이지가
    무한히 만들어진다. 구글이 명시적으로 색인하지 말라고 안내하는 유형이고,
    러닝온에서 겪은 "발견됨 – 색인 안 됨"을 스스로 만드는 짓이다.

    follow는 남긴다 — 결과에서 상세로 가는 링크는 따라가도 된다.
  */
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  /* useSearchParams를 쓰는 컴포넌트는 Suspense로 감싸야 한다. */
  return (
    <Suspense
      fallback={
        <p className="py-16 text-center text-sm text-muted">불러오는 중…</p>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
