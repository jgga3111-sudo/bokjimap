import Link from "next/link";
import { SITE } from "@/lib/site";
import MailLink from "./MailLink";

/**
 * 푸터 — 4분류(복지 찾기 / 신청 안내 / 도움말 / 사이트).
 *
 * 아직 없는 페이지는 링크하지 않는다(`ready: false`). 404를 푸터에 깔면
 * 크롤러가 사이트 전체를 낮게 본다. 페이지를 만들 때 true로 바꾼다.
 *
 * 2026-09-01, 둘째 칸을 "자가진단"에서 "신청 안내"로 바꿨다. 안내 글 네 편이
 * 생기면서 자가진단 칸에 계획만 있고 없던 두 줄이 실제 페이지가 됐다.
 * 자가진단 링크는 도움말 칸으로 옮겼다 — 헤더에 이미 강조 칩으로 있어서
 * 푸터에서까지 칸 하나를 차지할 이유가 없다.
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
      { href: "/benefit", label: "혜택 종류별 찾기", ready: true },
      /* 마감 임박 페이지는 만들지 않는다. 원본 enfcEndYmd 570건 중
         554건이 9999-12-31(종료일 없음)이고, 올해 안에 실제로 마감하는
         사업은 6건뿐이다. 데이터가 없는 기능이다. */
    ],
  },
  {
    title: "신청 안내",
    items: [
      { href: "/guide/apply", label: "신청 방법 총정리", ready: true },
      { href: "/guide/documents", label: "필요 서류 안내", ready: true },
      { href: "/guide/online", label: "온라인 신청 가능 지원", ready: true },
      { href: "/guide/terms", label: "복지 용어 풀이", ready: true },
    ],
  },
  {
    title: "도움말",
    items: [
      { href: "/check", label: "자격 자가진단", ready: true },
      { href: "/check#median-table", label: "기준 중위소득 표", ready: true },
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
            복지<span className="text-brand">클릭</span>
          </p>
          <p className="mt-2 text-sm text-muted">{SITE.description}</p>
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
            복지클릭은 공공데이터포털의 복지서비스 정보를 정리해 보여주는 민간
            사이트입니다. 정부·지자체 공식 기관이 아닙니다.
          </p>
          <p>
            신청 자격·금액·기간은 각 서비스의 공식 안내로 반드시 최종
            확인하세요.
          </p>
          {/*
            저작권 표시를 정확히 적는다. 그냥 "© 복지클릭"이라고만 두면 정부
            원자료까지 우리 것이라고 주장하는 것처럼 읽힌다. 실제로는 자료를
            모으고 분류하고 배치한 결과물과 사이트의 문장·디자인만 우리 것이다
            (데이터 출처 페이지에 같은 취지로 적어 두었다).
          */}
          <p className="pt-1">
            © {SITE.foundedYear} {SITE.name}. 정부 원자료의 저작권은 각
            제공기관에 있습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
