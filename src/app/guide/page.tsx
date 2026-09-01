import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "복지 신청 안내 — 신청 방법·서류·용어",
  description:
    "복지 지원금을 어디서 신청하는지, 어떤 서류가 필요한지, 공고문의 낯선 말이 무슨 뜻인지 — 수록 900건을 직접 집계해 정리한 안내 글입니다.",
  alternates: { canonical: "/guide" },
};

export default function GuideIndex() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <h1 className="text-2xl font-extrabold sm:text-3xl">복지 신청 안내</h1>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          받을 수 있는 지원을 찾았는데 정작 신청에서 막히는 경우가 많습니다.
          어디서 신청하는지, 무엇을 챙겨 가는지, 공고문의 저 말이 무슨 뜻인지
          — 수록한 900건을 직접 집계해 정리했습니다.
        </p>
      </header>

      <ul className="space-y-3">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guide/${g.slug}`}
              className="group block rounded-xl border border-line p-5 transition hover:border-brand"
            >
              <h2 className="font-bold text-ink group-hover:text-brand">
                {g.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {g.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5 text-sm leading-relaxed text-amber-900">
        이 글들은 <strong>제도 안내</strong>이지 자격 판정이 아닙니다. 실제
        신청 자격·금액·기간은 각 사업의 공식 안내와 담당 기관에서 반드시
        최종 확인하세요.
      </p>
    </div>
  );
}
