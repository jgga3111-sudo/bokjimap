import Link from "next/link";
import { SITE } from "@/lib/site";
import MailLink from "./MailLink";

/**
 * 푸터 — 4분류(복지 찾기 / 자가진단 / 도움말 / 사이트).
 *
 * 아직 없는 페이지는 링크하지 않는다(`ready: false`). 404를 푸터에 깔면
 * 크롤러가 사이트 전체를 낮게 본다. 페이지를 만들 때 true로 바꾼다.
 *
 * 칸마다 항목이 한둘뿐이면 분류가 잘못된 것이다. 없는 페이지를 걸러낸 뒤에도
 * 균형이 맞는지 보고 묶는다.
 */
type Item = { href: string; label: string; ready: boolean };

const COLUMNS: { title: string; items: Item[] }[] = [
  {
    title: "복지 찾기",
    items: [
      { href: "/service", label: "많이 찾는 지원", ready: true },
      { href: "/theme", label: "주제별 찾기", ready: true },
      { href: "/region", label: "지역별 찾기", ready: true },
      { href: "/target", label: "대상별 찾기", ready: true },
      { href: "/life", label: "생애주기별 찾기", ready: true },
      /* 마감 임박 페이지는 만들지 않는다. 원본 enfcEndYmd 570건 중
         554건이 9999-12-31(종료일 없음)이고, 올해 안에 실제로 마감하는
         사업은 6건뿐이다. 데이터가 없는 기능이다. */
    ],
  },
  {
    title: "자가진단",
    items: [
      { href: "/check", label: "자격 자가진단", ready: true },
      { href: "/check#median-table", label: "기준 중위소득 표", ready: true },
      { href: "/guide/apply", label: "신청 방법 총정리", ready: false },
      { href: "/guide/documents", label: "필요 서류 안내", ready: false },
    ],
  },
  {
    title: "도움말",
    items: [
      { href: "/faq", label: "자주 묻는 질문", ready: true },
      { href: "/contact", label: "문의·오류 신고", ready: true },
    ],
  },
  {
    title: "사이트",
    items: [
      { href: "/about", label: "사이트 소개", ready: true },
      { href: "/source", label: "데이터 출처", ready: true },
      { href: "/terms", label: "이용약관", ready: true },
      { href: "/privacy", label: "개인정보처리방침", ready: true },
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

        <div className="mt-10 space-y-2 border-t border-line pt-6 text-xs text-muted">
          <p>
            운영자 {SITE.operator} · 문의{" "}
            <MailLink className="underline hover:text-brand" />
          </p>
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
