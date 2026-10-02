import type { Metadata } from "next";
import { SITE } from "@/lib/site";

/*
  안내 글의 공유 유형은 article이다 (2026-10-02). 루트 layout의 openGraph는 type이 website라
  글 54편이 모두 웹사이트로 공유됐다. 페이지가 openGraph를 주면 이쪽을 통째로 바꾸므로(병합 아님)
  locale·siteName을 같이 적는다. 목록(/guide)은 자기 page.tsx에서 website로 되돌린다.
*/
export const metadata: Metadata = {
  openGraph: { type: "article", locale: "ko_KR", siteName: SITE.name },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
