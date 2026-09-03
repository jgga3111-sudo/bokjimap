import type { Metadata } from "next";
import Link from "next/link";
import { INCOME_BANDS } from "@/lib/income";
import { BASE_YEAR, thresholdOf } from "@/lib/midIncome";
import { won } from "@/lib/display";
import { services } from "@/data/services";

const covered = INCOME_BANDS.reduce((sum, b) => sum + b.count, 0);

export const metadata: Metadata = {
  title: "소득기준별 복지·지원금 — 기준 중위소득 몇 % 이하인가",
  description: `복지 지원의 자격은 대부분 "기준 중위소득 몇 % 이하"로 정해집니다. 선정기준에 기준선이 명시된 사업을 기준선별로 모았습니다. ${BASE_YEAR}년 기준 금액도 함께 보여줍니다.`,
  alternates: { canonical: "/income" },
};

export default function IncomeIndex() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold sm:text-3xl">소득기준별 찾기</h1>
        <p className="text-sm leading-relaxed text-slate-600">
          복지 지원의 자격은 대부분 &ldquo;기준 중위소득 몇 % 이하&rdquo;로
          정해집니다. 선정기준 원문에 그 기준선이 적혀 있는 사업을 기준선별로
          모았습니다.
        </p>
      </header>

      <div className="rounded-xl border border-brand/20 bg-brand-soft/50 px-4 py-3 text-sm leading-relaxed">
        내가 몇 %인지부터 알아야 합니다.{" "}
        <Link href="/check" className="font-bold text-brand underline">
          1분 자가진단
        </Link>
        에서 월 소득·연봉·건강보험료 중 하나만 넣으면 바로 나옵니다.
      </div>

      <ul className="grid gap-2.5 sm:grid-cols-2">
        {INCOME_BANDS.map((b) => (
          <li key={b.percent}>
            <Link
              href={`/income/${b.percent}`}
              className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3.5 transition hover:border-brand"
            >
              <span className="min-w-0">
                <span className="font-bold text-ink group-hover:text-brand">
                  중위소득 {b.percent}% 이하
                </span>
                {b.label && (
                  <span className="ml-1.5 text-sm text-muted">{b.label}</span>
                )}
                <span className="mt-0.5 block text-xs text-muted">
                  1인 가구 {won(thresholdOf(1, b.percent))} · 4인 가구{" "}
                  {won(thresholdOf(4, b.percent))}
                </span>
              </span>
              <span className="shrink-0 text-sm font-bold text-slate-500">
                {b.count}건
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/*
        수록 900건 중 기준선이 잡히는 것은 일부다. 그 사실을 숨기면 "여기
        없으면 소득 기준이 없는 사업"으로 읽힌다. 실제로는 선정기준 문장에
        퍼센트가 안 적혀 있을 뿐, 기준이 없는 게 아니다.
      */}
      <p className="text-sm leading-relaxed text-muted">
        수록 {services.length.toLocaleString()}건 가운데 선정기준 문장에
        기준선이 명시된 {covered}건만 여기 실립니다. 나머지가 소득 기준이
        없다는 뜻은 아닙니다 — 문장에 퍼센트로 적혀 있지 않아 우리가 읽어내지
        못한 것이고, <strong>짐작해서 배정하지 않습니다.</strong> 그 사업들은{" "}
        <Link href="/theme" className="text-brand underline">
          주제별
        </Link>
        {" · "}
        <Link href="/target" className="text-brand underline">
          대상별
        </Link>{" "}
        찾기에서 볼 수 있습니다.
      </p>
    </div>
  );
}
