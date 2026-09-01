import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { BENEFITS, benefitBySlug, servicesOf } from "@/lib/benefits";
import { services } from "@/data/services";
import ServiceList from "@/components/ServiceList";
import { MIN_SERVICES } from "@/lib/axes";
import { ro } from "@/lib/display";

/**
 * 한 화면에 거는 개수. `/service`와 같은 규칙이다.
 *
 * 처음엔 전부 깔았다가 `/benefit/cash`의 HTML이 **1.3MB**가 됐다(481장).
 * 지금까지 가장 큰 목록이던 `/theme/living`이 137건이니 3배가 넘는다.
 * 모바일에서 그만큼을 받아 그리는 동안 읽는 사람이 얻는 건 없다.
 *
 * 자르되 **잘랐다고 화면에 적는다.** 조용히 60건만 보여주면 나머지가
 * 없는 줄 안다.
 */
const PAGE_SIZE = 60;

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

  const all = servicesOf(services, b);
  const list = all.slice(0, PAGE_SIZE);

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
        <p className="text-sm text-muted">{all.length}건 · 조회수 높은 순</p>
      </header>

      {/* 목록 위에 한 문단. 축 페이지가 목록만 있는 껍데기가 되지 않게 하고,
          그 형태를 받을 때 실제로 놓치는 것을 먼저 알린다. */}
      <p className="rounded-xl border border-line bg-slate-50/70 px-4 py-3.5 text-sm leading-relaxed text-slate-700">
        {b.note}
      </p>

      <ServiceList services={list} />

      {all.length > PAGE_SIZE && (
        <p className="text-center text-sm text-muted">
          {all.length.toLocaleString()}건 중 조회수 상위 {PAGE_SIZE}건입니다.
          나머지는{" "}
          <Link href="/theme" className="text-brand underline">
            주제별
          </Link>
          {" · "}
          <Link href="/region" className="text-brand underline">
            지역별
          </Link>{" "}
          찾기에서 좁혀 보세요.
        </p>
      )}
    </div>
  );
}
