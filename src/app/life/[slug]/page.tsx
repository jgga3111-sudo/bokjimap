import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LIFE_STAGES, lifeStageBySlug } from "@/lib/axes";
import { services } from "@/data/services";
import ServiceList from "@/components/ServiceList";

export function generateStaticParams() {
  return LIFE_STAGES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/life/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = lifeStageBySlug(slug);
  if (!t) return {};
  return {
    title: `${t.label} 복지·지원금`,
    description: t.blurb,
    alternates: { canonical: `/life/${t.slug}` },
  };
}

export default async function LifePage({ params }: PageProps<"/life/[slug]">) {
  const { slug } = await params;
  const t = lifeStageBySlug(slug);
  if (!t) notFound();

  const list = services.filter((s) => s.lifeStages.includes(t.slug));
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">{t.label} 복지·지원금</h1>
        <p className="text-sm text-muted">{t.blurb}</p>
        <p className="text-sm text-muted">{list.length}건</p>
      </header>
      <ServiceList services={list} />
    </div>
  );
}
