import Link from "next/link";
import { SIDO_LIST } from "@/lib/regions";
import { TARGETS, LIFE_STAGES, THEMES } from "@/lib/axes";
import { BENEFITS, servicesOf } from "@/lib/benefits";
import { INCOME_BANDS } from "@/lib/income";
import { GUIDES } from "@/lib/guides";
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
 *   ④ 찾아보기 — 주제·혜택·대상·생애주기·지역을 한 상자에 묶는다.
 *   ⑤ 안내 글 — 신청에서 막힐 때 읽을 것.
 *
 * 처음 온 사람이 위에서 아래로 읽으면 "무엇 → 나는 대상인가 → 무엇이 있나
 * → 더 찾아보기 → 어떻게 신청하나" 순서가 된다.
 *
 * ⑤를 나중에 더했다. 안내 글을 푸터에만 걸어 두면 아무도 읽지 않는다. 그리고
 * 목록만 깔린 첫 화면은 "공공데이터를 옮겨 놓은 곳"으로 읽힌다 — 실제로 경쟁
 * 사이트를 열어 보고 나서 판단한 것이다(docs/03).
 */
const popular = services.slice(0, 8);

/* 건수는 렌더 때마다 900건을 다시 훑지 않도록 모듈 로드 때 한 번만 센다.
   축이 여섯이라 그냥 두면 첫 화면 한 장에 filter가 예순 번 넘게 돈다. */
const countBy = (pick: (s: (typeof services)[number]) => readonly string[]) => {
  const m = new Map<string, number>();
  for (const s of services) for (const v of pick(s)) m.set(v, (m.get(v) ?? 0) + 1);
  return m;
};
const THEME_COUNT = countBy((s) => s.themes);
const TARGET_COUNT = countBy((s) => s.targets);
const LIFE_COUNT = countBy((s) => s.lifeStages);
const BENEFIT_COUNT = new Map(
  BENEFITS.map((b) => [b.slug, servicesOf(services, b).length] as const),
);
const SIDO_COUNT = countBy((s) => (s.sidoName ? [s.sidoName] : []));

/** 히어로 수치용. 시·군·구가 자기 예산으로 하는 사업 수. */
const LOCAL_COUNT = services.filter((s) => s.provider === "local").length;

/**
 * 첫 화면 앞에 세우는 여덟 칸.
 *
 * 축(주제·혜택·대상·생애주기·지역·소득)을 **가로질러** 골랐다. 읽는 사람은
 * 자기가 어느 축에 속하는지 모른다 — "나는 청년이다", "현금으로 받고 싶다"로
 * 생각한다. 그래서 생애주기·대상·혜택·지역이 한 격자에 섞여 있다.
 *
 * 고른 기준은 **건수**다. 각 축에서 가장 큰 것부터 담되, 같은 말을 두 번
 * 담지 않았다(예: 영유아 171은 임신·출산 109와 겹쳐 읽히므로 하나만).
 * 지역은 시·도가 16개라 격자에 못 넣고 목록 페이지로 보낸다.
 *
 * 건수는 전부 렌더 시점 집계값이다. 손으로 적으면 수집이 늘 때 조용히 틀린
 * 말이 된다 — guides.ts에서 191건으로 겪었다.
 */
const QUICK = [
  { href: "/benefit/cash", label: "현금으로 받는 것", count: BENEFIT_COUNT.get("cash") ?? 0 },
  { href: "/life/youth", label: "청년", count: LIFE_COUNT.get("youth") ?? 0 },
  { href: "/target/low-income", label: "저소득", count: TARGET_COUNT.get("low-income") ?? 0 },
  { href: "/life/senior", label: "노년", count: LIFE_COUNT.get("senior") ?? 0 },
  { href: "/target/disability", label: "장애인", count: TARGET_COUNT.get("disability") ?? 0 },
  { href: "/target/single-parent", label: "한부모·조손", count: TARGET_COUNT.get("single-parent") ?? 0 },
  { href: "/life/pregnancy", label: "임신·출산", count: LIFE_COUNT.get("pregnancy") ?? 0 },
  /* 마지막 칸만 목록 페이지로 보낸다. 시·도가 16개라 격자에 못 담는다.
     건수는 시·군·구가 자기 예산으로 하는 사업 수 — 지역으로 들어가면
     만나게 되는 몫이라 이 숫자가 맞다. */
  { href: "/region", label: "우리 지역", count: LOCAL_COUNT },
] as const;

/** 칸이 제각각인 줄바꿈 대신 격자로 세운다. */
const GRID = "grid grid-cols-2 gap-1.5 sm:grid-cols-4";

/**
 * 찾아보기 상자 안의 한 줄.
 *
 * 라벨 옆에 건수를 붙인다. 축 인덱스(`/theme`·`/target`·`/income`)에는
 * 진작 있었는데 첫 화면에만 없었다 — 여기가 제일 먼저 눌리는 자리인데
 * "주거"를 누르면 27건인지 270건인지 모르고 들어가게 된다. 경쟁 사이트가
 * 축마다 건수를 달아 두는 것도 같은 이유다(docs/03).
 *
 * 0건이면 회색으로 남기되 지우지는 않는다. 세종시처럼 **원본에 사업이 없는
 * 것**과 우리가 못 받은 것은 다른데, 숨기면 그 구분이 사라진다.
 */
function BrowseRow<T extends { slug: string; label: string }>({
  label,
  base,
  items,
  cols,
  countOf,
}: {
  label: string;
  base: string;
  items: readonly T[];
  cols?: string;
  countOf: (i: T) => number;
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
              <span className="ml-1 text-xs text-slate-400">
                {countOf(i).toLocaleString()}
              </span>
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
          {/*
            수치 세 개.

            한 줄짜리 회색 글씨였다 — "수록 900건 · 전국 17개 시·도 · 2026년
            기준". 히어로에서 **유일하게 사실을 말하는 줄**인데 각주처럼
            작게 붙어 있어 아무도 읽지 않는 크기였다.

            이 사이트가 AI 양산 블로그와 다른 점이 바로 여기다(CLAUDE.md 3절).
            몇 건을 다루는지, 어느 해 기준인지가 곧 신뢰의 근거다. 숫자를
            키우고 무엇을 센 값인지 아래에 붙인다.

            숫자는 전부 렌더 시점 집계값이다. 손으로 적은 상수를 두면 수집이
            늘 때 조용히 틀린 말이 된다(guides.ts에서 실제로 겪었다).

            가운데 칸은 원래 시·도 개수(16)였다. 데이터상 맞는 값이다 —
            API가 광주와 전남을 「전남광주통합특별시」 하나로 준다(regions.ts).
            그런데 화면에 "16개 시·도"만 있으면 17개로 아는 사람에게는 빠진
            것처럼 읽힌다. 설명 없이 해명할 수 없는 숫자를 첫 화면에 두느니,
            **지자체 사업 건수**를 쓴다. 이쪽이 이 사이트의 차이이기도 하다 —
            중앙부처 것만 옮겨 놓은 곳과 달리 시·군·구 공고가 570건 들어 있다.
          */}
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {[
              { n: services.length.toLocaleString(), unit: "건", k: "수록 지원사업" },
              { n: LOCAL_COUNT.toLocaleString(), unit: "건", k: "시·군·구 사업" },
              { n: BASE_YEAR.toString(), unit: "년", k: "기준연도" },
            ].map((s) => (
              <div key={s.k}>
                <dd className="text-lg font-extrabold text-ink sm:text-xl">
                  {s.n}
                  <span className="ml-0.5 text-sm font-bold">{s.unit}</span>
                </dd>
                <dt className="mt-0.5 text-xs text-muted">{s.k}</dt>
              </div>
            ))}
          </dl>
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

      {/*
        ── 61개를 8개로 (2026-09-05) ─────────────────────────────────
        이 상자는 축 여섯을 다섯 줄로 펼쳐 놓고 있었다. 첫 화면에서 누를 수
        있는 링크가 86개였고 그중 61개가 여기였다. 문제는 개수가 아니라
        **여섯이 전부 같은 900건을 다르게 자르는 자**라는 것이다. 처음 온
        사람은 목록을 보기도 전에 "어느 자로 자를까"부터 골라야 했다.

        당근은 큰 갈래를 아이콘 넷으로만 두고 나머지는 전부 햄버거 안에
        넣는다. 오늘의집은 아이콘을 열 개나 쓰지만 그 열 개는 **서로 다른
        일**이다(쇼핑·집들이·이사청소…). 같은 것을 여섯 가지로 자르는 걸
        앞에 늘어놓는 것과는 다르다(2026-09-05 실측).

        그래서 **사람이 자기를 설명하는 말** 여덟 개만 앞에 세운다. 축이
        무엇인지 몰라도 "나는 청년이다", "현금으로 받고 싶다"는 고를 수 있다.
        축을 가로질러 고른 것이라 생애주기·대상·혜택·지역이 한 격자에 섞여
        있다 — 읽는 사람에게는 그게 자연스럽다.

        나머지 53개는 **지우지 않고 접었다.** 접혀 있어도 HTML에는 있으므로
        크롤러는 그대로 읽는다(HubList에서 쓰는 것과 같은 수법).
      */}
      <section className="rounded-2xl border border-line bg-slate-50/60 p-5 sm:p-6">
        <h2 className="text-lg font-bold">어떤 분이신가요</h2>
        <p className="mt-0.5 mb-4 text-xs text-muted">
          해당하는 것을 고르면 그에 걸린 지원만 모아 보여드립니다
        </p>

        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {QUICK.map((q) => (
            <li key={q.href}>
              <Link
                href={q.href}
                className="flex h-full flex-col justify-between rounded-xl border border-line bg-white px-3.5 py-3 transition hover:border-brand hover:shadow-sm"
              >
                <span className="text-sm font-bold text-ink">{q.label}</span>
                <span className="mt-1.5 text-xs text-muted">
                  {q.count.toLocaleString()}건
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <details className="mt-4 border-t border-line pt-4">
          <summary className="cursor-pointer text-sm font-medium text-slate-600 hover:text-brand">
            전체 분류 보기
            <span className="ml-1.5 text-xs font-normal text-muted">
              주제 · 혜택 종류 · 소득기준 · 대상 · 생애주기 · 지역
            </span>
          </summary>
          <div className="space-y-5 pt-4">
          {/* 주제를 맨 위에 둔다. 중앙부처 사업(조회수 상위 대부분)이
              걸리는 유일한 축이라 여기가 가장 많이 눌린다. */}
          <BrowseRow
            label="주제"
            base="/theme"
            items={THEMES}
            cols={GRID}
            countOf={(t) => THEME_COUNT.get(t.value) ?? 0}
          />
          {/* 혜택 종류 — "무엇을 받는가". 주제(무엇이 급한가) 다음에 오는
              질문이라 바로 아래 둔다. */}
          <BrowseRow
            label="혜택 종류"
            base="/benefit"
            items={BENEFITS}
            cols={GRID}
            countOf={(b) => BENEFIT_COUNT.get(b.slug) ?? 0}
          />
          {/* 소득기준 — 자가진단이 내놓는 답과 같은 구분이다. 위 배너에서
              "중위소득 70%"를 받은 사람이 갈 곳이 여기다. 열여덟 개를 다
              깔면 줄이 길어지니 급여 이름이 붙는 구간만 건다. */}
          <BrowseRow
            label="소득기준"
            base="/income"
            items={INCOME_BANDS.filter((b) => b.label).map((b) => ({
              slug: String(b.percent),
              label: `중위 ${b.percent}%`,
              count: b.count,
            }))}
            cols={GRID}
            countOf={(b) => b.count}
          />
          <BrowseRow
            label="대상"
            base="/target"
            items={TARGETS}
            cols={GRID}
            countOf={(t) => TARGET_COUNT.get(t.slug) ?? 0}
          />
          <BrowseRow
            label="생애주기"
            base="/life"
            items={LIFE_STAGES}
            cols={GRID}
            countOf={(t) => LIFE_COUNT.get(t.slug) ?? 0}
          />
          <BrowseRow
            label="지역"
            base="/region"
            items={SIDO_LIST.map((s) => ({
              slug: s.slug,
              label: s.name,
              count: SIDO_COUNT.get(s.fullName) ?? 0,
            }))}
            cols="grid grid-cols-3 gap-1.5 sm:grid-cols-6"
            countOf={(s) => s.count}
          />
          </div>
        </details>
      </section>

      {/*
        안내 글. 목록만 있는 사이트는 "공공데이터를 옮겨 놓은 곳"으로 읽힌다.
        첫 화면에서 한 번은 보이게 둔다 — 푸터에만 있으면 아무도 안 읽는다.
      */}
      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">신청에서 막힌다면</h2>
            <p className="mt-0.5 text-xs text-muted">
              수록 {services.length.toLocaleString()}건을 직접 집계해
              정리했습니다
            </p>
          </div>
          <Link
            href="/guide"
            className="shrink-0 text-sm text-muted hover:text-brand"
          >
            전체 보기 →
          </Link>
        </div>
        {/* 여덟 편을 다 깔면 첫 화면이 글 목록 페이지가 된다. 넷만. */}
        <ul className="grid gap-3 sm:grid-cols-2">
          {GUIDES.slice(0, 4).map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guide/${g.slug}`}
                className="group block h-full rounded-xl border border-line bg-white p-4 transition hover:border-brand"
              >
                <p className="font-semibold text-ink group-hover:text-brand">
                  {g.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {g.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
