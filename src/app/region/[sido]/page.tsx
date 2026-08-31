import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SIDO_LIST, sidoBySlug } from "@/lib/regions";
import { services } from "@/data/services";
import ServiceList from "@/components/ServiceList";

export function generateStaticParams() {
  return SIDO_LIST.map((s) => ({ sido: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/region/[sido]">): Promise<Metadata> {
  const { sido: slug } = await params;
  const sido = sidoBySlug(slug);
  if (!sido) return {};
  return {
    title: `${sido.name} 복지·지원금`,
    description: `${sido.fullName}에서 신청할 수 있는 복지 서비스와 지원금 목록입니다.`,
  };
}

export default async function RegionPage({
  params,
}: PageProps<"/region/[sido]">) {
  const { sido: slug } = await params;
  const sido = sidoBySlug(slug);
  if (!sido) notFound();

  const list = services.filter((s) => s.sidoName === sido.name);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">{sido.name} 복지·지원금</h1>
        <p className="text-sm text-slate-500">{sido.fullName} · {list.length}건</p>
      </header>
      <ServiceList services={list} />
    </div>
  );
}
