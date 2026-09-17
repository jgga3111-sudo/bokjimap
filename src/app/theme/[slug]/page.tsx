import { notFound } from "next/navigation";
import { ROBOTS_INDEX } from "@/lib/site";
import type { Metadata } from "next";
import { THEMES, themeBySlug } from "@/lib/axes";
import { services } from "@/data/services";
import HubList from "@/components/HubList";
import { toRow, facetsFor } from "@/lib/hubRows";
import { FindLink } from "@/components/NarrowChips";
import { topBenefits, joinCounts, withTail } from "@/lib/hubMeta";
import { ro } from "@/lib/display";

export function generateStaticParams() {
  return THEMES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/theme/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = themeBySlug(slug);
  if (!t) return {};

  const list = services.filter((s) => s.themes.includes(t.value));
  const count = list.length;
  /* 건수와 상위 혜택은 데이터에서 센다(hubMeta.ts, 2026-09-11). 관심주제는
     중앙부처 사업에만 붙는 값이라(5절) 설명에 그렇게 적는다. */
  const top = topBenefits(list);
  const tail = top.length ? ` — ${joinCounts(top)}` : "";
  return {
    title: withTail(`${t.label} 복지·지원금 ${count}건`, top),
    description: `${t.blurb} 관심주제 ${ro(t.label)} 분류된 중앙부처 사업 ${count}건${tail}.`,
    alternates: { canonical: `/theme/${t.slug}` },
    /* 항목이 없는 축은 색인에서 뺀다. 지금은 15종 모두 값이 있지만,
       수록 범위가 바뀌면 0건짜리가 생길 수 있다. */
    robots: count === 0 ? { index: false, follow: true } : ROBOTS_INDEX,
  };
}

export default async function ThemePage({ params }: PageProps<"/theme/[slug]">) {
  const { slug } = await params;
  const t = themeBySlug(slug);
  if (!t) notFound();

  /* 데이터에는 슬러그가 아니라 원문 값("생활지원")이 들어 있다. */
  const rows = services.filter((s) => s.themes.includes(t.value)).map(toRow);
  /* 자기 축(주제)은 빼고 셋만 건다. 다섯을 다 걸면 필터 상자가 화면 한 장을
     차지해 정작 목록이 안 보인다. */
  const groups = facetsFor(rows, ["region", "benefit", "life"]);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">{t.label} 복지·지원금</h1>
        <p className="text-sm text-muted">{t.blurb}</p>
        <p className="text-sm text-muted">{rows.length}건 · 조회수 높은 순</p>
      </header>
      <FindLink axisLabel="주제" />
      <HubList rows={rows} groups={groups} />
    </div>
  );
}
