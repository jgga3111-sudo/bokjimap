import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LIFE_STAGES, lifeStageBySlug } from "@/lib/axes";
import { services } from "@/data/services";
import HubList from "@/components/HubList";
import { toRow, facetsFor } from "@/lib/hubRows";

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
  const count = services.filter((s) => s.lifeStages.includes(t.slug)).length;
  return {
    title: `${t.label} 시기 복지·지원금`,
    description: `${t.blurb} 생애주기 ${t.label} 단계로 분류된 ${count}건입니다.`,
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
      <HubList rows={rows} groups={groups} />
    </div>
  );
}
