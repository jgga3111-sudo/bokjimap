import Link from "next/link";
import { SIDO_LIST } from "@/lib/regions";
import { TARGETS, LIFE_STAGES, THEMES } from "@/lib/axes";
import { services } from "@/data/services";
import ServiceList from "@/components/ServiceList";
import { BASE_YEAR } from "@/lib/midIncome";
import RecentViews from "@/components/RecentViews";

/**
 * 첫 화면.
 *
 * 처음에는 블록이 여섯 개였다 — 히어로(제목+검색+버튼 둘+수치 셋),
 * 자가진단 배너, 인기 지원, 대상, 생애주기, 지역. 자가진단으로 가는 길이
 * 히어로 버튼과 바로 아래 배너에 두 번 있었고, 찾아보는 방법 세 가지가
 * 각각 제목을 달고 따로 서 있어 목차만 다섯 개처럼 보였다.
 *
 * 네 블록으로 줄였다.
 *   ① 히어로 — 무엇을 하는 곳인지. **버튼도 검색창도 없다.**
 *        (검색은 헤더 것 하나만 쓴다. 아래 히어로 주석 참고.)
 *   ② 자가진단 — 이 사이트의 핵심 기능. 여기에만 버튼을 둔다.
 *   ③ 많이 찾는 지원 — 바로 볼 것.
 *   ④ 찾아보기 — 대상·생애주기·지역을 한 상자에 묶는다.
 *
 * 처음 온 사람이 위에서 아래로 읽으면 "무엇 → 나는 대상인가 → 무엇이 있나
 * → 더 찾아보기" 순서가 된다.
 */
const popular = services.slice(0, 8);

/** 칸이 제각각인 줄바꿈 대신 격자로 세운다. */
const GRID = "grid grid-cols-2 gap-1.5 sm:grid-cols-4";

/** 찾아보기 상자 안의 한 줄. */
function BrowseRow({
  label,
  base,
  items,
  cols,
}: {
  label: string;
  base: string;
  items: readonly { slug: string; label: string }[];
  cols?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-bold text-ink">{label}</h3>
        <Link
          href={base}
          className="shrink-0 text-xs text-muted hover:text-brand"
        >
          전체 보기 →
        </Link>
      </div>
      <ul className={cols ?? "flex flex-wrap gap-1.5"}>
        {items.map((i) => (
          <li key={i.slug}>
            <Link
              href={`${base}/${i.slug}`}
              className={`block rounded-lg border border-line bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-brand hover:text-brand ${
                cols ? "text-center" : ""
              }`}
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-10">
      {/* 히어로 — 페이지 여백을 뚫고 배경을 깔기 위해 음수 마진을 쓴다. */}
      <section className="-mx-4 -mt-8 bg-gradient-to-b from-brand-soft to-white px-4 pt-10 pb-9">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl leading-tight font-extrabold sm:text-4xl">
            내가 받을 수 있는
            <br />
            <span className="text-brand">복지 지원금</span>을 한눈에
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            중앙부처와 전국 시·군·구가 따로 공고하는 복지 서비스를 한곳에
            모았습니다. 사람들이 가장 많이 찾는 것부터 정리했습니다.
          </p>

          {/*
            히어로에도 큰 검색창을 뒀었다. 375px 화면을 찍어 보니 헤더 검색과
            히어로 검색이 **한 화면에 나란히** 보였다 — 같은 모양의 둥근 상자
            두 개. 헤더 것은 sticky라 어느 페이지에서든 따라오고, 히어로 것은
            조금만 내리면 사라진다. 남길 것을 고르면 헤더다.
          */}
          <p className="mt-5 text-xs text-muted">
            수록 {services.length.toLocaleString()}건 · 전국 {SIDO_LIST.length}
            개 시·도 · {BASE_YEAR}년 기준
          </p>
        </div>
      </section>

      {/* 자가진단 — 이 사이트에만 있는 것. 첫 화면에서 버튼은 여기 하나뿐이다. */}
      <section className="rounded-2xl border border-brand/20 bg-brand-soft/40 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-bold">
              내가 대상자인지 1분이면 압니다
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              복지 지원의 자격은 대부분 &ldquo;기준 중위소득 몇 % 이하&rdquo;로
              정해집니다. <strong>월 소득·연봉·건강보험료</strong> 중 아는 것
              하나만 넣으면 어느 구간인지 바로 나옵니다.
            </p>
          </div>
          <Link
            href="/check"
            className="shrink-0 rounded-xl bg-brand px-5 py-3.5 font-bold text-white shadow-sm transition hover:brightness-110"
          >
            자가진단 하기 →
          </Link>
        </div>
      </section>

      {/* 본 게 있을 때만 나타난다. 처음 온 사람에게는 아예 안 보인다. */}
      <RecentViews />

      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">사람들이 가장 많이 찾는 지원</h2>
            <p className="mt-0.5 text-xs text-muted">복지로 누적 조회수 순</p>
          </div>
          <Link
            href="/service"
            className="shrink-0 text-sm text-muted hover:text-brand"
          >
            전체 보기 →
          </Link>
        </div>
        <ServiceList services={popular} ranked />
      </section>

      {/* 찾아보는 방법 셋을 한 상자에 묶는다. 각각 제목을 달아 따로 세우면
          첫 화면이 목차처럼 보인다. */}
      <section className="rounded-2xl border border-line bg-slate-50/60 p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-bold">조건으로 찾아보기</h2>
        <div className="space-y-5">
          {/* 주제를 맨 위에 둔다. 중앙부처 사업(조회수 상위 대부분)이
              걸리는 유일한 축이라 여기가 가장 많이 눌린다. */}
          <BrowseRow label="주제" base="/theme" items={THEMES} cols={GRID} />
          <BrowseRow label="대상" base="/target" items={TARGETS} cols={GRID} />
          <BrowseRow
            label="생애주기"
            base="/life"
            items={LIFE_STAGES}
            cols={GRID}
          />
          <BrowseRow
            label="지역"
            base="/region"
            items={SIDO_LIST.map((s) => ({ slug: s.slug, label: s.name }))}
            cols="grid grid-cols-3 gap-1.5 sm:grid-cols-6"
          />
        </div>
      </section>
    </div>
  );
}
