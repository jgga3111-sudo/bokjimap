import type { Metadata } from "next";
import Link from "next/link";
import SavedList from "@/components/SavedList";
import { AUTH_ON } from "@/lib/auth/config";

export const metadata: Metadata = {
  title: "관심 지원",
  /*
    **색인시키지 않는다.** 사람마다 내용이 다르고, 크롤러가 보는 정적 HTML은
    늘 빈 목록이다. 빈 페이지를 색인에 올리면 얇은 페이지 하나가 는다.
    `/search`·`/find`·`/ask`와 같은 줄에 선다(audit-sitemap 「일부러
    제출하지 않는 것」 표에 같이 적었다).
  */
  robots: { index: false, follow: true },
  alternates: { canonical: "/saved" },
};

/**
 * 관심 지원 전체 목록 (2026-09-11).
 *
 * 목록은 브라우저 저장소에서 그린다(`lib/saved.ts`). 이 페이지 자체는
 * 정적이다 — 누가 무엇을 골랐는지 서버는 모른다.
 */
export default function SavedPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold">관심 지원</h1>
        {/* 계정 기능이 켜지면 문장이 달라진다 — 로그인하면 계정에 저장되므로
            "이 브라우저에만"은 틀린 말이 된다(09-11 점검에서 걸림). 누가
            로그인했는지는 이 정적 페이지가 모르므로 두 경우를 함께 적는다. */}
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {AUTH_ON ? (
            <>
              ☆로 저장한 지원입니다. 로그인하지 않으면{" "}
              <strong>이 브라우저에만</strong> 저장되고,{" "}
              <Link href="/login" className="text-brand underline">
                로그인
              </Link>
              하면 계정에 저장돼 휴대폰·PC 어디서나 볼 수 있습니다.
            </>
          ) : (
            <>
              ☆로 저장한 지원입니다. 지금은 <strong>이 브라우저에만</strong>{" "}
              저장돼 있어서, 다른 기기나 다른 브라우저에서는 보이지 않습니다.
              브라우저의 사이트 데이터를 지우면 함께 사라집니다.
            </>
          )}
        </p>
      </header>
      <SavedList showEmpty />
    </div>
  );
}
