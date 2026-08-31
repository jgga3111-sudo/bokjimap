import Link from "next/link";
import { SITE } from "@/lib/site";

/**
 * 푸터 — 러닝온과 같은 4분류 구조(서비스 / 가이드 / 지원 / 정책).
 *
 * 아직 없는 페이지는 링크하지 않는다. 404를 푸터에 깔면 크롤러가 사이트 전체를
 * 낮게 본다. 페이지를 만들 때 이 목록에 추가한다.
 */
type Item = { href: string; label: string; ready: boolean };

const COLUMNS: { title: string; items: Item[] }[] = [
  {
    title: "서비스",
    items: [
      { href: "/check", label: "자격 자가진단", ready: true },
      { href: "/service", label: "많이 찾는 지원", ready: true },
      { href: "/region", label: "지역별 찾기", ready: true },
      { href: "/target", label: "대상별 찾기", ready: true },
      { href: "/life", label: "생애주기별 찾기", ready: true },
      { href: "/deadline", label: "마감 임박", ready: false },
    ],
  },
  {
    title: "가이드",
    items: [
      { href: "/guide", label: "복지 가이드", ready: false },
      { href: "/guide/apply", label: "신청 방법 총정리", ready: false },
      { href: "/guide/documents", label: "필요 서류 안내", ready: false },
      { href: "/check", label: "기준 중위소득 표", ready: true },
    ],
  },
  {
    title: "지원",
    items: [
      { href: "/faq", label: "자주 묻는 질문", ready: false },
      { href: "/contact", label: "문의하기", ready: false },
      { href: "/report", label: "오류 신고·수정 요청", ready: false },
    ],
  },
  {
    title: "정책",
    items: [
      { href: "/about", label: "사이트 소개", ready: false },
      { href: "/source", label: "데이터 출처", ready: false },
      { href: "/terms", label: "이용약관", ready: false },
      { href: "/privacy", label: "개인정보처리방침", ready: false },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-slate-50/60">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8">
          <p className="text-xl font-bold">
            복지<span className="text-brand">MAP</span>
          </p>
          <p className="mt-2 text-sm text-muted">
            {SITE.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="mb-3 text-sm font-bold">{col.title}</h2>
              <ul className="space-y-2 text-sm">
                {col.items
                  .filter((i) => i.ready)
                  .map((i) => (
                    <li key={i.href}>
                      <Link
                        href={i.href}
                        className="text-muted hover:text-brand"
                      >
                        {i.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-1 border-t border-line pt-6 text-xs text-muted">
          <p>
            복지MAP은 공공데이터포털의 복지서비스 정보를 정리해 보여주는 민간
            사이트입니다. 정부·지자체 공식 기관이 아닙니다.
          </p>
          <p>
            신청 자격·금액·기간은 각 서비스의 공식 안내로 반드시 최종
            확인하세요.
          </p>
        </div>
      </div>
    </footer>
  );
}
