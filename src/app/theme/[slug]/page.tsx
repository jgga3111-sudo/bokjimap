import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { THEMES, themeBySlug } from "@/lib/axes";
import { services } from "@/data/services";
import ServiceList from "@/components/ServiceList";

export function generateStaticParams() {
  return THEMES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/theme/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = themeBySlug(slug);
  if (!t) return {};

  const count = services.filter((s) => s.themes.includes(t.value)).length;
  return {
    title: `${t.label} 복지·지원금`,
    description: t.blurb,
    alternates: { canonical: `/theme/${t.slug}` },
    /* 항목이 없는 축은 색인에서 뺀다. 지금은 15종 모두 값이 있지만,
       수록 범위가 바뀌면 0건짜리가 생길 수 있다. */
    robots: count === 0 ? { index: false, follow: true } : undefined,
  };
}

export default async function ThemePage({ params }: PageProps<"/theme/[slug]">) {
  const { slug } = await params;
  const t = themeBySlug(slug);
  if (!t) notFound();

  /* 데이터에는 슬러그가 아니라 원문 값("생활지원")이 들어 있다. */
  const list = services.filter((s) => s.themes.includes(t.value));

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">{t.label} 복지·지원금</h1>
        <p className="text-sm text-muted">{t.blurb}</p>
        <p className="text-sm text-muted">{list.length}건 · 조회수 높은 순</p>
      </header>
      <ServiceList services={list} />
    </div>
  );
}
