import { notFound } from "next/navigation";
import { ROBOTS_INDEX } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { BENEFITS, benefitBySlug, servicesOf } from "@/lib/benefits";
import { services } from "@/data/services";
import HubList from "@/components/HubList";
import { toRow, facetsFor } from "@/lib/hubRows";
import { FindLink } from "@/components/NarrowChips";
import { topLifeStages, joinCounts, withTail } from "@/lib/hubMeta";
import { MIN_SERVICES } from "@/lib/axes";
import { ro } from "@/lib/display";
import HubIntro from "@/components/HubIntro";
import { BENEFIT_GUIDES } from "@/lib/hubNotes";

export function generateStaticParams() {
  return BENEFITS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/benefit/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = benefitBySlug(slug);
  if (!b) return {};

  const list = servicesOf(services, b);
  const count = list.length;
  /* 혜택 허브에 상위 혜택을 달면 제자리 말이라 생애주기로 곁말을 단다.
     값은 데이터에서 센다(hubMeta.ts, 2026-09-11). */
  const top = topLifeStages(list);
  const tail = top.length ? ` 생애주기로는 ${joinCounts(top)}입니다.` : "";
  return {
    title: withTail(`${ro(b.label)} 받는 복지·지원금 ${count}건`, top),
    description: `${b.blurb} 수록 ${count}건을 복지로 누적 조회수 순으로 정리했습니다.${tail}`,
    alternates: { canonical: `/benefit/${b.slug}` },
    robots: count < MIN_SERVICES ? { index: false, follow: true } : ROBOTS_INDEX,
  };
}

export default async function BenefitPage({
  params,
}: PageProps<"/benefit/[slug]">) {
  const { slug } = await params;
  const b = benefitBySlug(slug);
  if (!b) notFound();

  /*
    예전엔 여기서 60건에 잘랐다. 전부 그리면 `/benefit/cash`가 481장이라
    HTML이 1.3MB가 됐기 때문인데, 그 대가로 **나머지 421건은 이 사이트에서
    갈 길이 없었다.** 상위 60건 밑에 "주제별·지역별로 좁혀 보세요"라고 적어
    뒀지만 그건 다른 목록이지 이 목록의 나머지가 아니다.

    `HubList`가 둘 다 푼다 — 카드는 24장만 그려 가볍게 두고, 전체는 맨 아래
    이름 목록에 링크로 남긴다. 자를 이유가 없어졌다.
  */
  const list = servicesOf(services, b);
  const rows = list.map(toRow);
  const groups = facetsFor(rows, ["region", "theme", "life"]);

  return (
    <div className="space-y-6">
      <div className="band">
      <nav aria-label="위치" className="text-xs text-muted">
        <Link href="/" className="hover:text-brand">
          홈
        </Link>
        {" › "}
        <Link href="/benefit" className="hover:text-brand">
          혜택 종류별
        </Link>
        {" › "}
        <span className="text-slate-600">{b.label}</span>
      </nav>

      <header className="mt-3 space-y-2">
        <h1 className="text-2xl font-extrabold sm:text-3xl">{ro(b.label)} 받는 복지·지원금</h1>
        <p className="text-sm text-muted">{b.blurb}</p>
        <p className="text-sm text-muted">{rows.length}건 · 조회수 높은 순</p>
      </header>
      </div>

      <FindLink axisLabel="혜택" />

      {/* 목록 위 머리말. 그 형태를 받을 때 실제로 놓치는 것(benefits.ts의 note)을
          다른 허브와 같은 머리말 틀에 싣는다(09-17, 전에는 note 한 문단뿐). */}
      <HubIntro
        lead={
          <>
            복지로 원문의 <strong>지급형태</strong> 칸에{" "}
            {b.values.map((v, i) => (
              <span key={v}>
                {i > 0 && " · "}&ldquo;{v}&rdquo;
              </span>
            ))}{" "}
            값이 있는 사업 {rows.length}건입니다. 한 사업에 형태가 여럿 적힌
            경우가 있어 다른 혜택 목록과 겹칠 수 있습니다.
          </>
        }
        list={list}
        note={{ body: b.note, guides: BENEFIT_GUIDES[b.slug] ?? [] }}
      />

      <HubList rows={rows} groups={groups} />
    </div>
  );
}
