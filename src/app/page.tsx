import Link from "next/link";
import { SIDO_LIST } from "@/lib/regions";
import { TARGETS, LIFE_STAGES } from "@/lib/axes";
import { services } from "@/data/services";
import ServiceList from "@/components/ServiceList";
import { BASE_YEAR } from "@/lib/midIncome";

/** 조회수 상위 — 데이터가 이미 조회수 내림차순이라 앞에서 자르면 된다. */
const popular = services.slice(0, 8);

function SectionHeader({
  icon,
  title,
  sub,
  href,
}: {
  icon: string;
  title: string;
  sub?: string;
  href?: string;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <span aria-hidden>{icon}</span>
          {title}
        </h2>
        {sub && <p className="mt-0.5 text-xs text-muted">{sub}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-sm text-muted hover:text-brand"
        >
          전체 보기 →
        </Link>
      )}
    </div>
  );
}

function Chips({
  base,
  items,
}: {
  base: string;
  items: readonly { slug: string; label: string }[];
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((i) => (
        <li key={i.slug}>
          <Link
            href={`${base}/${i.slug}`}
            className="inline-block rounded-full border border-line bg-white px-3.5 py-2 text-sm hover:border-brand hover:text-brand"
          >
            {i.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <div className="space-y-12">
      {/* 히어로 — 페이지 여백을 뚫고 배경을 깔기 위해 음수 마진을 쓴다. */}
      <section className="-mx-4 -mt-8 bg-gradient-to-b from-brand-soft to-white px-4 pt-10 pb-8">
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

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/check"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3.5 font-bold text-white shadow-sm transition hover:brightness-110"
            >
              <span aria-hidden>🧮</span>
              내가 대상자인지 1분 확인
            </Link>
            <Link
              href="/service"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-3.5 font-bold text-ink transition hover:border-brand hover:text-brand"
            >
              <span aria-hidden>📋</span>
              많이 찾는 지원 보기
            </Link>
          </div>

          <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div className="flex items-baseline gap-1.5">
              <dt className="text-muted">수록</dt>
              <dd className="font-bold text-ink">
                {services.length.toLocaleString()}건
              </dd>
            </div>
            <div className="flex items-baseline gap-1.5">
              <dt className="text-muted">지역</dt>
              <dd className="font-bold text-ink">{SIDO_LIST.length}개 시·도</dd>
            </div>
            <div className="flex items-baseline gap-1.5">
              <dt className="text-muted">기준연도</dt>
              <dd className="font-bold text-ink">{BASE_YEAR}년</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-bold">
              소득이 중위소득 몇 %인지부터 확인하세요
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              복지 지원의 자격은 대부분 &ldquo;기준 중위소득 몇 % 이하&rdquo;로
              정해집니다. <strong>월 소득·연봉·건강보험료</strong> 중 아는 것
              하나만 넣으면 어느 구간인지 바로 나옵니다.
            </p>
          </div>
          <Link
            href="/check"
            className="shrink-0 rounded-xl bg-brand px-5 py-3 font-bold text-white transition hover:brightness-110"
          >
            자가진단 하기 →
          </Link>
        </div>
      </section>

      <section>
        <SectionHeader
          icon="🔥"
          title="사람들이 가장 많이 찾는 지원"
          sub="복지로 누적 조회수 순"
          href="/service"
        />
        <ServiceList services={popular} ranked />
      </section>

      <section>
        <SectionHeader icon="👥" title="대상으로 찾기" href="/target" />
        <Chips base="/target" items={TARGETS} />
      </section>

      <section>
        <SectionHeader icon="🌱" title="생애주기로 찾기" href="/life" />
        <Chips base="/life" items={LIFE_STAGES} />
      </section>

      <section>
        <SectionHeader icon="📍" title="지역으로 찾기" href="/region" />
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {SIDO_LIST.map((sido) => (
            <li key={sido.slug}>
              <Link
                href={`/region/${sido.slug}`}
                className="block rounded-lg border border-line bg-white px-2 py-2.5 text-center text-sm hover:border-brand hover:text-brand"
              >
                {sido.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
