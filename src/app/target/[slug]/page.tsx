import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TARGETS, targetBySlug } from "@/lib/axes";
import { services } from "@/data/services";
import ServiceList from "@/components/ServiceList";

export function generateStaticParams() {
  return TARGETS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/target/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = targetBySlug(slug);
  if (!t) return {};
  return {
    title: `${t.label} 복지·지원금`,
    description: t.blurb,
    alternates: { canonical: `/target/${t.slug}` },
  };
}

export default async function TargetPage({
  params,
}: PageProps<"/target/[slug]">) {
  const { slug } = await params;
  const t = targetBySlug(slug);
  if (!t) notFound();

  const list = services.filter((s) => s.targets.includes(t.slug));
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
