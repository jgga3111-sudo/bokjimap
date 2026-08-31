import Link from "next/link";
import { SIDO_LIST } from "@/lib/regions";
import { TARGETS, LIFE_STAGES } from "@/lib/axes";
import { services } from "@/data/services";

function SectionHeader({
  icon,
  title,
  href,
}: {
  icon: string;
  title: string;
  href: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="flex items-center gap-2 font-bold">
        <span aria-hidden>{icon}</span>
        {title}
      </h2>
      <Link href={href} className="text-sm text-muted hover:text-brand">
        전체 보기 →
      </Link>
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
            className="inline-block rounded-full border border-line px-3 py-1.5 text-sm hover:border-brand hover:text-brand"
          >
            {i.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const count = services.length;

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-brand-soft p-6">
        <h1 className="text-2xl font-bold sm:text-3xl">
          내 지역 복지·지원금 찾기
        </h1>
        <p className="mt-2 text-sm text-slate-700 sm:text-base">
          중앙부처와 전국 시·군·구가 따로 공고하는 복지 서비스를 한곳에 모읍니다.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-brand">
            {count.toLocaleString()}건 수록
          </span>
          <span className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-muted">
            {SIDO_LIST.length}개 시·도
          </span>
        </div>
      </section>

      {count === 0 && (
        /* 빈 목록을 그럴듯하게 감추지 않는다. 예시 데이터를 넣으면 나중에
           진짜 데이터인 척 남는다. */
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-bold">데이터 준비 중</p>
          <p className="mt-1">
            수집한 5,219건을 사이트에 반영하는 작업이 진행 중입니다. 현재 표시
            가능한 서비스는 0건입니다.
          </p>
        </div>
      )}

      <section>
        <SectionHeader icon="📍" title="지역으로 찾기" href="/region" />
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {SIDO_LIST.map((sido) => (
            <li key={sido.slug}>
              <Link
                href={`/region/${sido.slug}`}
                className="block rounded-lg border border-line px-2 py-2.5 text-center text-sm hover:border-brand hover:text-brand"
              >
                {sido.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeader icon="👥" title="대상으로 찾기" href="/target" />
        <Chips base="/target" items={TARGETS} />
      </section>

      <section>
        <SectionHeader icon="🌱" title="생애주기로 찾기" href="/life" />
        <Chips base="/life" items={LIFE_STAGES} />
      </section>
    </div>
  );
}
