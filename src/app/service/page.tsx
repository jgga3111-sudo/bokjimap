import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import ServiceList from "@/components/ServiceList";
import ClosedList from "@/components/ClosedList";
import DeadlineBadge from "@/components/DeadlineBadge";
import { nameWithAlias } from "@/lib/aliases";
import { placeLabel } from "@/lib/display";

export const metadata: Metadata = {
  title: "많이 찾는 복지·지원금 순위",
  description:
    "중앙부처와 전국 시·군·구의 복지 서비스를 복지로 조회수가 많은 순서로 정리했습니다. 현금 지원, 바우처, 요금 감면 등 지원 형태와 대상을 한눈에 볼 수 있습니다.",
  alternates: { canonical: "/service" },
};

/** 한 화면에 거는 개수. 스크롤이 끝없이 길어지면 아무것도 안 읽힌다. */
const PAGE_SIZE = 60;

export default function ServiceIndex() {
  const list = services.slice(0, PAGE_SIZE);
  const online = services.filter((s) => s.onlineApply).length;
  const cash = services.filter((s) => s.payTypes.includes("현금지급")).length;
  /* 09-24 「최근 바뀐·새로 실은 지원」. 날짜는 이미 항목마다 있다(changedAt·addedAt) —
     관심 지원의 「내용 바뀜」에만 쓰던 값을 목록으로도 보인다. 따로 페이지를 만들면
     스무 건 남짓의 얇은 페이지라 여기 한 칸으로 둔다. 새로 실은 것은 받은 날이 곧
     바뀐 날이라 changedAt보다 addedAt을 먼저 본다. */
  const recent = services
    .filter((s) => s.addedAt || s.changedAt)
    .map((s) => ({ s, added: !!s.addedAt, date: (s.addedAt ?? s.changedAt)! }))
    .sort((a, b) => b.date.localeCompare(a.date) || b.s.views - a.s.views);

  return (
    <div className="space-y-6">
      <header className="band">
        <h1 className="text-2xl font-extrabold sm:text-3xl">
          많이 찾는 복지·지원금
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          복지로에서 실제로 많이 조회된 순서입니다. 사람들이 가장 많이 찾는
          지원이 위에 옵니다.
        </p>
        <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <div className="flex items-baseline gap-1.5">
            <dt className="text-muted">수록</dt>
            <dd className="font-bold">{services.length.toLocaleString()}건</dd>
          </div>
          <div className="flex items-baseline gap-1.5">
            <dt className="text-muted">현금 지원</dt>
            <dd className="font-bold">{cash.toLocaleString()}건</dd>
          </div>
          <div className="flex items-baseline gap-1.5">
            <dt className="text-muted">온라인 신청</dt>
            <dd className="font-bold">{online.toLocaleString()}건</dd>
          </div>
        </dl>
      </header>

      <div className="rounded-2xl bg-brand-soft px-5 py-4 text-sm">
        내 소득이 어느 구간인지 모르겠다면{" "}
        <Link href="/check" className="font-bold text-brand underline">
          1분 자가진단
        </Link>
        부터 해보세요.
      </div>

      <ServiceList services={list} ranked />

      {services.length > PAGE_SIZE && (
        <p className="text-center text-sm leading-relaxed text-muted">
          여기는 <strong>조회수 상위 {PAGE_SIZE}건</strong>입니다. 나머지{" "}
          {(services.length - PAGE_SIZE).toLocaleString()}건은 축 페이지에 모두
          있습니다 —{" "}
          <Link href="/theme" className="text-brand underline">
            주제별
          </Link>
          {" · "}
          <Link href="/benefit" className="text-brand underline">
            혜택별
          </Link>
          {" · "}
          <Link href="/target" className="text-brand underline">
            대상별
          </Link>
          {" · "}
          <Link href="/region" className="text-brand underline">
            지역별
          </Link>
          . 각 목록에서 조건으로 좁히거나 전체를 이름으로 훑어볼 수 있습니다.
        </p>
      )}

      {recent.length > 0 && (
        <section className="card p-5 sm:p-7">
          <h2 className="text-lg font-extrabold text-ink">최근 바뀐·새로 실은 지원</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            원본을 다시 받아 대조했을 때 <strong>내용이 달라진 사업</strong>과 나중에{" "}
            <strong>새로 실은 사업</strong>입니다. 날짜는 저희가 대조·수록한 날입니다.
          </p>
          <ul className="mt-3 divide-y divide-line">
            {recent.map(({ s, added, date }) => (
              <li key={s.id}>
                <Link
                  href={`/service/${s.id}`}
                  className="group flex flex-wrap items-baseline gap-x-2 gap-y-0.5 py-3"
                >
                  <span
                    className={`shrink-0 rounded-md px-1.5 py-0.5 text-[11px] font-bold ${
                      added ? "bg-emerald-50 text-emerald-700" : "bg-brand-soft text-brand"
                    }`}
                  >
                    {added ? "새로 실음" : "내용 바뀜"} {date.slice(5).replace("-", "/")}
                  </span>
                  <span className="min-w-0 flex-1 text-[15px] font-medium text-ink group-hover:text-brand">
                    {nameWithAlias(s.id, s.name)}
                  </span>
                  <span className="text-xs text-muted">{placeLabel(s)}</span>
                  <DeadlineBadge id={s.id} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 마감된 것을 따로 모은다(2026-09-13). 위 목록에서는 빼지 않고 딱지만
          붙인다 — 숨기지 말고 마감으로 표기(3절). 브라우저가 오늘로 고른다. */}
      <ClosedList />
    </div>
  );
}
