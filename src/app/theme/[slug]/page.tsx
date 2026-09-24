import { notFound } from "next/navigation";
import { ROBOTS_INDEX } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { THEMES, themeBySlug } from "@/lib/axes";
import { services } from "@/data/services";
import HubList from "@/components/HubList";
import { toRow, facetsFor } from "@/lib/hubRows";
import { FindLink } from "@/components/NarrowChips";
import { topBenefits, joinCounts, withTail } from "@/lib/hubMeta";
import { ro } from "@/lib/display";
import HubIntro from "@/components/HubIntro";
import { THEME_NOTES } from "@/lib/hubNotes";

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
  const list = services.filter((s) => s.themes.includes(t.value));
  const rows = list.map(toRow);
  const note = THEME_NOTES[t.slug];
  /* 자기 축(주제)은 빼고 셋만 건다. 다섯을 다 걸면 필터 상자가 화면 한 장을
     차지해 정작 목록이 안 보인다. */
  const groups = facetsFor(rows, ["region", "benefit", "life"]);

  return (
    <div className="space-y-6">
      <header className="band space-y-1.5">
        <h1 className="text-2xl font-extrabold sm:text-3xl">{t.label} 복지·지원금</h1>
        <p className="text-sm text-muted">{t.blurb}</p>
        <p className="text-sm text-muted">{rows.length}건 · 조회수 높은 순</p>
      </header>
      <FindLink axisLabel="주제" />
      {note && (
        <HubIntro
          lead={
            <>
              복지로 원문의 <strong>관심주제</strong> 칸 값이 &ldquo;{t.label}
              &rdquo;인 사업 {rows.length}건입니다. 이 칸은 중앙부처 사업에만
              적혀 있어, 같은 주제의 지자체 사업은{" "}
              <Link href="/region" className="text-brand underline">
                지역별 목록
              </Link>
              에서 따로 찾아야 합니다.
            </>
          }
          list={list}
          note={note}
        />
      )}
      <HubList rows={rows} groups={groups} />
    </div>
  );
}
