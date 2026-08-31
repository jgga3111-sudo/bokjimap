import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SIDO_LIST, sidoBySlug } from "@/lib/regions";
import { services } from "@/data/services";
import ServiceList from "@/components/ServiceList";

export function generateStaticParams() {
  return SIDO_LIST.map((s) => ({ sido: s.slug }));
}

/** 그 지역의 지자체 사업. 중앙부처 사업은 전국 공통이라 따로 다룬다. */
const localOf = (fullName: string) =>
  services.filter((s) => s.sidoName === fullName);

/**
 * 전국 어디서나 신청 가능한 중앙부처 사업.
 *
 * 이걸 빼먹으면 "서울 복지·지원금" 페이지에 기초연금도 주거급여도 청년월세도
 * 안 나온다. 이용자가 실제로 받을 수 있는 것의 대부분을 가리는 셈이다.
 */
const NATIONWIDE = services.filter((s) => s.provider === "central");

export async function generateMetadata({
  params,
}: PageProps<"/region/[sido]">): Promise<Metadata> {
  const { sido: slug } = await params;
  const sido = sidoBySlug(slug);
  if (!sido) return {};

  const count = localOf(sido.fullName).length;
  return {
    title: `${sido.name} 복지·지원금`,
    description: `${sido.fullName}의 지자체 복지 사업 ${count}건과 전국 어디서나 신청할 수 있는 중앙부처 사업을 함께 정리했습니다.`,
    alternates: { canonical: `/region/${sido.slug}` },
    /* 지자체 사업이 없는 지역은 이 페이지만의 내용이 없다. 남는 건 다른 지역
       페이지와 똑같은 중앙부처 목록뿐이라 색인에서 뺀다(docs/02). */
    robots: count === 0 ? { index: false, follow: true } : undefined,
  };
}

export default async function RegionPage({
  params,
}: PageProps<"/region/[sido]">) {
  const { sido: slug } = await params;
  const sido = sidoBySlug(slug);
  if (!sido) notFound();

  const local = localOf(sido.fullName);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">
          {sido.name} 복지·지원금
        </h1>
        <p className="mt-2 text-sm text-muted">
          {sido.fullName} · 지자체 사업 {local.length}건
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-lg font-bold">
          {sido.name}이 직접 하는 사업
        </h2>
        {local.length > 0 ? (
          <ServiceList services={local} />
        ) : (
          /* 없는 것을 없다고 쓴다. 세종시가 여기 해당한다 — 공공데이터포털
             복지서비스 4,758건에 세종시 자체 사업이 한 건도 없다. */
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
            공공데이터포털 복지서비스 데이터에 {sido.fullName}이 등록한 자체
            사업이 아직 없습니다. 아래 중앙부처 사업은 {sido.name}에서도 그대로
            신청할 수 있습니다.
          </p>
        )}
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">
              {sido.name}에서도 신청할 수 있는 전국 사업
            </h2>
            <p className="mt-0.5 text-xs text-muted">
              중앙부처가 운영해 거주지와 무관하게 신청합니다
            </p>
          </div>
          <Link
            href="/service"
            className="shrink-0 text-sm text-muted hover:text-brand"
          >
            전체 보기 →
          </Link>
        </div>
        <ServiceList services={NATIONWIDE.slice(0, 6)} />
      </section>
    </div>
  );
}
