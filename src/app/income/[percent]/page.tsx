import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { INCOME_BANDS, incomeBandOf, servicesAt } from "@/lib/income";
import { BASE_YEAR, thresholdOf } from "@/lib/midIncome";
import { won } from "@/lib/display";
import HubList from "@/components/HubList";
import { toRow, facetsFor } from "@/lib/hubRows";
import AdSenseScript, { AD_MIN_ITEMS } from "@/components/AdSenseScript";
import HubIntro from "@/components/HubIntro";
import { INCOME_NOTES } from "@/lib/hubNotes";

export function generateStaticParams() {
  return INCOME_BANDS.map((b) => ({ percent: String(b.percent) }));
}

/** 제목에 급여 이름을 함께 쓴다 — "중위소득 48%"보다 "주거급여"로 검색된다. */
const heading = (percent: number, label: string | null) =>
  `기준 중위소득 ${percent}% 이하 복지·지원금${label ? ` (${label})` : ""}`;

export async function generateMetadata({
  params,
}: PageProps<"/income/[percent]">): Promise<Metadata> {
  const { percent } = await params;
  const band = incomeBandOf(percent);
  if (!band) return {};
  return {
    title: heading(band.percent, band.label),
    description: `선정기준의 소득 기준선이 "기준 중위소득 ${band.percent}% 이하" 한 가지로 적힌 복지 사업 ${band.count}건입니다. ${BASE_YEAR}년 기준 1인 가구 월 ${won(
      thresholdOf(1, band.percent),
    )}(연봉 환산 ${won(thresholdOf(1, band.percent) * 12)}), 4인 가구 월 ${won(thresholdOf(4, band.percent))} 이하입니다.`,
    alternates: { canonical: `/income/${band.percent}` },
  };
}

/** 표에 실을 가구원 수. /check의 고시 표와 같은 범위를 쓴다. */
const HOUSEHOLDS = [1, 2, 3, 4, 5, 6];

export default async function IncomeBandPage({
  params,
}: PageProps<"/income/[percent]">) {
  const { percent } = await params;
  const band = incomeBandOf(percent);
  /* 09-15에 소득 기준선을 "값이 하나일 때만" 읽게 바꾸면서 72·85·140·200% 목록이 3건
     아래로 줄어 사라졌다(build-data.mjs pickMedianPercent). 색인됐던 주소라 404 대신
     기준선 목록으로 보낸다. */
  if (!band) {
    if (/^\d+$/.test(percent)) permanentRedirect("/income");
    notFound();
  }

  const list = servicesAt(band.percent);
  const rows = list.map(toRow);
  const note = INCOME_NOTES[band.percent];
  const groups = facetsFor(rows, ["region", "benefit", "life"]);

  return (
    <div className="space-y-6">
      {note && rows.length >= AD_MIN_ITEMS && <AdSenseScript />}
      <div className="band">
      <nav aria-label="위치" className="text-xs text-muted">
        <Link href="/" className="hover:text-brand">
          홈
        </Link>
        {" › "}
        <Link href="/income" className="hover:text-brand">
          소득기준별
        </Link>
        {" › "}
        <span className="text-slate-600">중위소득 {band.percent}%</span>
      </nav>

      <header className="mt-3 space-y-2">
        <h1 className="text-2xl font-extrabold sm:text-3xl">
          {heading(band.percent, band.label)}
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          선정기준 원문의 소득 기준선이 &ldquo;기준 중위소득 {band.percent}%&rdquo;
          한 가지로 적힌 사업 {band.count}건입니다. 기준이 문장에 명시되지 않았거나
          대상마다 기준선이 여럿 적힌 사업은 짐작해서 넣지 않았습니다.
        </p>
      </header>
      </div>

      {/* 퍼센트만 보면 내 소득이 여기 드는지 알 수 없다. 금액으로 바꿔 준다.
          계산은 /check와 같은 고시 표(thresholdOf)를 쓴다. */}
      <section className="card px-5 py-5 sm:px-7">
        <h2 className="text-sm font-bold text-ink">
          {BASE_YEAR}년 중위소득 {band.percent}%는 얼마인가 — 월 소득·연봉 환산
        </h2>
        <dl className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
          {HOUSEHOLDS.map((n) => (
            <div key={n} className="flex items-baseline justify-between gap-2">
              <dt className="text-sm text-muted">{n}인 가구</dt>
              <dd className="text-right">
                <span className="text-sm font-bold text-ink">
                  {won(thresholdOf(n, band.percent))}
                </span>
                {/* 연봉 환산 (2026-09-16). 서치콘솔에서 「중위소득 60 이하 연봉」
                    「120 이하 연봉」으로 들어오는데 화면에는 월 금액만 있었다.
                    월 기준액 × 12일 뿐이고 세전이라는 것을 아래 단서에 적는다 —
                    실제 심사는 소득인정액으로 하므로 이 값은 환산값이다. */}
                <span className="block text-xs font-normal text-muted">
                  연 {won(thresholdOf(n, band.percent) * 12)}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          세전 월 소득 기준이고, 연 금액은 <strong>그 값에 12를 곱한 환산값</strong>
          입니다(상여·수당이 있으면 달라집니다). 실제 심사는 월급이 아니라
          소득인정액(소득 + 재산의 소득환산액)으로 하고 공제 항목이 있어, 월급이 이
          금액을 넘어도 해당될 수 있습니다.
        </p>
      </section>

      {/* 자격 판정은 하지 않는다(CLAUDE.md 3절). 계산까지만 하고 보낸다. */}
      <div className="rounded-xl border border-brand/20 bg-brand-soft/50 px-4 py-3 text-sm leading-relaxed">
        내 소득이 몇 %인지 모르겠다면{" "}
        <Link href="/check" className="font-bold text-brand underline">
          1분 자가진단
        </Link>
        에서 월 소득·연봉·건강보험료 중 하나만 넣으면 바로 나옵니다.
      </div>

      {note && <HubIntro lead={<></>} list={list} note={note} incomeLine={false} />}

      <HubList rows={rows} groups={groups} />

      <p className="text-sm leading-relaxed text-muted">
        여기 있는 것은 <strong>소득 기준 한 가지</strong>로만 묶은 목록입니다.
        각 사업에는 연령·재산·거주지 요건이 따로 있으니 신청 전에 상세와 공식
        안내를 확인하세요.{" "}
        <Link href="/income" className="text-brand underline">
          다른 기준선 보기
        </Link>
      </p>
    </div>
  );
}
