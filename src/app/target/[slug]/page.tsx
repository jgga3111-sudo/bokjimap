import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TARGETS, targetBySlug } from "@/lib/targets";
import { services } from "@/data/services";
import ServiceList from "@/components/ServiceList";

export function generateStaticParams() {
  return TARGETS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/target/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const target = targetBySlug(slug);
  if (!target) return {};
  return { title: `${target.label} 복지·지원금`, description: target.blurb };
}

export default async function TargetPage({
  params,
}: PageProps<"/target/[slug]">) {
  const { slug } = await params;
  const target = targetBySlug(slug);
  if (!target) notFound();

  const list = services.filter((s) => s.targets.includes(target.slug));

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">{target.label} 복지·지원금</h1>
        <p className="text-sm text-slate-600">{target.blurb}</p>
        <p className="text-sm text-slate-500">{list.length}건</p>
      </header>
      <ServiceList services={list} />
    </div>
  );
}
