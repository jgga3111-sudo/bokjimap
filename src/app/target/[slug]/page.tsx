import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TARGETS, targetBySlug } from "@/lib/axes";
import { services } from "@/data/services";
import HubList from "@/components/HubList";
import { toRow, facetsFor } from "@/lib/hubRows";
import NarrowChips from "@/components/NarrowChips";
import { topBenefits, joinCounts, withTail } from "@/lib/hubMeta";
import AdSenseScript from "@/components/AdSenseScript";
import HubIntro from "@/components/HubIntro";
import { TARGET_NOTES } from "@/lib/hubNotes";

export function generateStaticParams() {
  return TARGETS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/target/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = targetBySlug(slug);
  if (!t) return {};
  /* 건수와 상위 혜택은 데이터에서 센다(hubMeta.ts, 2026-09-11). */
  const list = services.filter((s) => s.targets.includes(t.slug));
  const top = topBenefits(list);
  const tail = top.length ? ` — ${joinCounts(top)}` : "";
  return {
    title: withTail(`${t.label} 복지·지원금 ${list.length}건`, top),
    description: `${t.blurb} ${t.label} 대상으로 분류된 ${list.length}건${tail}.`,
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
  const rows = list.map(toRow);
  const note = TARGET_NOTES[t.slug];
  const groups = facetsFor(rows, ["region", "benefit", "life"]);
  return (
    <div className="space-y-6">
      <AdSenseScript />
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">{t.label} 복지·지원금</h1>
        <p className="text-sm text-muted">{t.blurb}</p>
        <p className="text-sm text-muted">{rows.length}건 · 조회수 높은 순</p>
      </header>
      <NarrowChips base={{ target: t.slug }} />
      {note && (
        <HubIntro
          axisLabel={t.label}
          fieldLabel="지원 대상"
          list={list}
          note={note}
        />
      )}
      <HubList rows={rows} groups={groups} />
    </div>
  );
}
