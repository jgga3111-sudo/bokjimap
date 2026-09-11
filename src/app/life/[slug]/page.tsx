import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LIFE_STAGES, lifeStageBySlug } from "@/lib/axes";
import { services } from "@/data/services";
import HubList from "@/components/HubList";
import { toRow, facetsFor } from "@/lib/hubRows";
import NarrowChips from "@/components/NarrowChips";
import { topBenefits, joinCounts, withTail } from "@/lib/hubMeta";

export function generateStaticParams() {
  return LIFE_STAGES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/life/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = lifeStageBySlug(slug);
  if (!t) return {};

  /* 제목에 "시기"를 넣는 이유. 주제 축에도 같은 이름의 라벨이 있다
     (`/theme/pregnancy-birth`의 "임신·출산"). 라벨만 쓰면 두 페이지의
     <title>이 글자까지 같아져서, 내용이 달라도 구글이 하나로 접는다
     — 서치콘솔의 "중복 페이지" 자리다. 축 이름으로 갈라 놓는다. */
  const list = services.filter((s) => s.lifeStages.includes(t.slug));
  const count = list.length;
  /* 제목 뒤 곁말은 이 허브에 실제로 든 사업에서 센 상위 혜택이다 — 손으로
     지어 쓰지 않는다(hubMeta.ts 머리말, 2026-09-11). */
  const top = topBenefits(list);
  const tail = top.length ? ` — ${joinCounts(top)}` : "";
  return {
    title: withTail(`${t.label} 시기 복지·지원금 ${count}건`, top),
    description: `${t.blurb} 생애주기 ${t.label} 단계로 분류된 ${count}건${tail}.`,
    alternates: { canonical: `/life/${t.slug}` },
  };
}

export default async function LifePage({ params }: PageProps<"/life/[slug]">) {
  const { slug } = await params;
  const t = lifeStageBySlug(slug);
  if (!t) notFound();

  const rows = services.filter((s) => s.lifeStages.includes(t.slug)).map(toRow);
  const groups = facetsFor(rows, ["region", "benefit", "theme"]);
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">{t.label} 시기 복지·지원금</h1>
        <p className="text-sm text-muted">{t.blurb}</p>
        <p className="text-sm text-muted">{rows.length}건 · 조회수 높은 순</p>
      </header>
      <NarrowChips base={{ life: t.slug }} />
      <HubList rows={rows} groups={groups} />
    </div>
  );
}
