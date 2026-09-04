import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import ServiceList from "@/components/ServiceList";

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

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">
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

      <div className="rounded-xl border border-line bg-brand-soft/50 px-4 py-3 text-sm">
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
    </div>
  );
}
