import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { BENEFITS, benefitBySlug, servicesOf } from "@/lib/benefits";
import { services } from "@/data/services";
import HubList from "@/components/HubList";
import { toRow, facetsFor } from "@/lib/hubRows";
import { MIN_SERVICES } from "@/lib/axes";
import { ro } from "@/lib/display";

export function generateStaticParams() {
  return BENEFITS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/benefit/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = benefitBySlug(slug);
  if (!b) return {};

  const count = servicesOf(services, b).length;
  return {
    title: `${ro(b.label)} 받는 복지·지원금`,
    description: `${b.blurb} 수록 ${count}건을 복지로 누적 조회수 순으로 정리했습니다.`,
    alternates: { canonical: `/benefit/${b.slug}` },
    robots: count < MIN_SERVICES ? { index: false, follow: true } : undefined,
  };
}

export default async function BenefitPage({
  params,
}: PageProps<"/benefit/[slug]">) {
  const { slug } = await params;
  const b = benefitBySlug(slug);
  if (!b) notFound();

  /*
    예전엔 여기서 60건에 잘랐다. 전부 그리면 `/benefit/cash`가 481장이라
    HTML이 1.3MB가 됐기 때문인데, 그 대가로 **나머지 421건은 이 사이트에서
    갈 길이 없었다.** 상위 60건 밑에 "주제별·지역별로 좁혀 보세요"라고 적어
    뒀지만 그건 다른 목록이지 이 목록의 나머지가 아니다.

    `HubList`가 둘 다 푼다 — 카드는 24장만 그려 가볍게 두고, 전체는 맨 아래
    이름 목록에 링크로 남긴다. 자를 이유가 없어졌다.
  */
  const rows = servicesOf(services, b).map(toRow);
  const groups = facetsFor(rows, ["region", "theme", "life"]);

  return (
    <div className="space-y-6">
      <nav aria-label="위치" className="text-xs text-muted">
        <Link href="/" className="hover:text-brand">
          홈
        </Link>
        {" › "}
        <Link href="/benefit" className="hover:text-brand">
          혜택 종류별
        </Link>
        {" › "}
        <span className="text-slate-600">{b.label}</span>
      </nav>

      <header className="space-y-2">
        <h1 className="text-2xl font-bold">{ro(b.label)} 받는 복지·지원금</h1>
        <p className="text-sm text-muted">{b.blurb}</p>
        <p className="text-sm text-muted">{rows.length}건 · 조회수 높은 순</p>
      </header>

      {/* 목록 위에 한 문단. 축 페이지가 목록만 있는 껍데기가 되지 않게 하고,
          그 형태를 받을 때 실제로 놓치는 것을 먼저 알린다. */}
      <p className="rounded-xl border border-line bg-slate-50/70 px-4 py-3.5 text-sm leading-relaxed text-slate-700">
        {b.note}
      </p>

      <HubList rows={rows} groups={groups} />
    </div>
  );
}
