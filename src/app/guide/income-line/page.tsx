import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import { BASE_YEAR, medianIncome, thresholdOf } from "@/lib/midIncome";
import { won } from "@/lib/display";

const G = guideBySlug("income-line")!;

/*
  이 글의 근거는 통째로 데이터에서 나온다. 하나도 손으로 적지 않는다.

  `medianPercent`는 선정기준 원문에 "중위소득 N%"가 **명시된 경우에만** 채워지는
  값이다. 우리가 사업을 보고 배정한 게 아니다(check/page.tsx와 같은 규칙).
  그래서 이 글이 말할 수 있는 것은 "비율이 적힌 사업들 사이의 분포"까지이고,
  "복지 전체의 분포"가 아니다. 그 한계를 마지막 절에 적어 둔다.
*/
const withPercent = services
  .filter((s) => s.medianPercent != null)
  .sort((a, b) => b.views - a.views);

type Bucket = { percent: number; list: typeof withPercent };
const buckets: Bucket[] = [];
for (const s of withPercent) {
  const p = s.medianPercent!;
  const found = buckets.find((b) => b.percent === p);
  if (found) found.list.push(s);
  else buckets.push({ percent: p, list: [s] });
}
buckets.sort((a, b) => a.percent - b.percent);

const maxCount = Math.max(...buckets.map((b) => b.list.length));
const atOrAbove100 = withPercent.filter((s) => s.medianPercent! >= 100).length;
const atOrBelow50 = withPercent.filter((s) => s.medianPercent! <= 50).length;
const busiest = [...buckets].sort((a, b) => b.list.length - a.list.length)[0];
const pct = (n: number) => Math.round((n / withPercent.length) * 100);

/*
  metadata가 계산 아래에 있는 이유: 제목과 설명에도 실제 집계값을 쓴다.
  본문만 계산으로 짜 놓고 metadata에는 "191건"을 박아 두었다가, 재수집으로
  214건이 된 뒤에도 검색결과에는 191건이라고 나가고 있었다(2026-09-02).
  눈에 안 보이는 자리일수록 상수로 두면 틀린 채로 오래 간다.
*/
export const metadata: Metadata = {
  title: `${G.title} — 복지 자격선 ${withPercent.length}건 실측`,
  description: `선정기준에 '기준 중위소득 몇 %'가 적힌 ${withPercent.length}건을 세어 봤습니다. 가장 많은 기준선은 기초생활 구간이 아니라 ${busiest.percent}%였고, ${pct(atOrAbove100)}%가 100% 이상 구간이었습니다.`,
  alternates: { canonical: "/guide/income-line" },
};

/** 4인 가구를 예로 든다 — 표에서 가장 자주 인용되는 기준이다. */
const HH = 4;

export default function IncomeLineGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="“내 소득이면 어차피 안 되겠지” 하고 알아보지도 않는 경우가 많습니다. 실제 기준선이 어디에 몰려 있는지 세어 봤습니다."
        updated={`최종 수정 ${G.updated} · 선정기준에 비율이 명시된 ${withPercent.length}건 기준`}
      >
        <DocSection title={`가장 많은 기준선은 ${busiest.percent}%였습니다`}>
          <p>
            수록한 {services.length.toLocaleString()}건 가운데 선정기준 원문에{" "}
            &ldquo;기준 중위소득 ○○% 이하&rdquo;가 적혀 있는 것은{" "}
            <strong>{withPercent.length}건</strong>입니다. 그 비율을 그대로
            세어 늘어놓으면 이렇습니다.
          </p>

          {/*
            flex로 짰다가 375px에서 가로 스크롤이 났다(문서 폭 448px). 막대에
            `width: 100%`를 주면 그 100%가 **남은 공간이 아니라 컨테이너 전체**를
            가리키는데, 양옆 라벨은 shrink-0이라 줄지 않으니 라벨 폭만큼 넘친다.

            격자로 바꾸면 막대가 자기 칸(1fr) 안에서만 100%가 된다. 값이 아무리
            커도 넘칠 수 없다.
          */}
          <div className="space-y-1">
            {buckets.map((b) => (
              <div
                key={b.percent}
                className="grid grid-cols-[3rem_1fr_2.75rem] items-center gap-2 text-sm"
              >
                <span className="text-right font-medium text-slate-600 tabular-nums">
                  {b.percent}%
                </span>
                <span
                  className="h-4 rounded-sm bg-brand/70"
                  style={{
                    width: `${Math.max(2, (b.list.length / maxCount) * 100)}%`,
                  }}
                  aria-hidden
                />
                <span className="text-xs text-muted tabular-nums">
                  {b.list.length}건
                </span>
              </div>
            ))}
          </div>

          <p>
            가장 두꺼운 구간은 <strong>{busiest.percent}%</strong>로{" "}
            {busiest.list.length}건입니다. 기초생활보장 급여가 쓰는
            32~50% 구간이 아닙니다.
          </p>
          <p>
            <strong>
              {withPercent.length}건 중 {atOrAbove100}건({pct(atOrAbove100)}%)이
              중위소득 100% 이상
            </strong>
            을 기준선으로 씁니다. 반대로 50% 이하는 {atOrBelow50}건(
            {pct(atOrBelow50)}%)뿐입니다. 복지를 저소득층만의 것으로 알고
            있으면 절반 이상을 스스로 지워 버리는 셈입니다.
          </p>
        </DocSection>

        <DocSection title="그래서 그게 얼마인가">
          <p>
            {BASE_YEAR}년 4인 가구 기준으로 환산하면 이렇습니다. 기준 중위소득
            자체가 {won(medianIncome(HH))}입니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-slate-50 text-left">
                  <th className="px-3 py-2 font-semibold">기준선</th>
                  <th className="px-3 py-2 font-semibold">
                    4인 가구 월 소득인정액
                  </th>
                  <th className="px-3 py-2 font-semibold">해당 사업</th>
                </tr>
              </thead>
              <tbody>
                {[50, 100, 150, 180].map((p) => {
                  const b = buckets.find((x) => x.percent === p);
                  return (
                    <tr key={p} className="border-b border-line">
                      <th
                        scope="row"
                        className="px-3 py-2 text-left font-medium"
                      >
                        {p}%
                      </th>
                      <td className="px-3 py-2 font-semibold text-brand tabular-nums">
                        {won(thresholdOf(HH, p))}
                      </td>
                      <td className="px-3 py-2 text-slate-600">
                        {b ? `${b.list.length}건` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <DocNote tone="brand">
            비교하는 값은 월급이 아니라 <strong>소득인정액</strong>입니다.
            근로소득의 일부를 공제하고 재산을 소득으로 환산해 더한 금액이라
            월급과 다릅니다.{" "}
            <Link href="/guide/terms#recognized-income" className="text-brand underline">
              소득인정액이 무엇인지 보기
            </Link>
            {" · "}
            <Link href="/check" className="text-brand underline">
              내 구간 계산하기
            </Link>
          </DocNote>
        </DocSection>

        <DocSection title="기준선마다 어떤 사업이 있나">
          <p>
            조회수가 가장 높은 것을 기준선별로 하나씩 뽑았습니다. 누르면 그
            사업의 선정기준 원문을 볼 수 있습니다.
          </p>
          <ul className="space-y-1.5">
            {buckets
              .filter((b) => b.list.length >= 3)
              .sort((a, b) => b.list.length - a.list.length)
              .map((b) => (
                <li key={b.percent} className="flex flex-wrap gap-x-2 text-sm">
                  <span className="w-12 shrink-0 text-right font-medium text-slate-500 tabular-nums">
                    {b.percent}%
                  </span>
                  <Link
                    href={`/service/${b.list[0].id}`}
                    className="min-w-0 text-slate-700 hover:text-brand hover:underline"
                  >
                    {b.list[0].name}
                  </Link>
                  <span className="text-xs text-muted">
                    외 {b.list.length - 1}건
                  </span>
                </li>
              ))}
          </ul>
        </DocSection>

        <DocSection title="이 숫자가 말하지 않는 것">
          <p>
            분포를 그대로 믿기 전에 알아야 할 것이 있습니다.
          </p>
          <ul className="space-y-2">
            <li>
              <strong>
                비율이 적혀 있는 {withPercent.length}건만 센 것입니다.
              </strong>{" "}
              나머지 {(services.length - withPercent.length).toLocaleString()}
              건은 선정기준에 비율 표현이 없습니다. 연령·거주 기간·장애
              정도처럼 다른 잣대를 쓰거나, 원문이 구체적으로 적지 않은
              경우입니다. 우리가 짐작해서 채우지 않습니다.
            </li>
            <li>
              <strong>기준선이 높다고 쉬운 것은 아닙니다.</strong> 재산 기준이
              따로 붙거나, 예산 범위에서 선착순으로 끊거나, 연령·거주지 요건이
              함께 걸리는 경우가 많습니다. 소득은 여러 관문 중 하나입니다.
            </li>
            <li>
              <strong>기준선은 해마다 바뀝니다.</strong> 같은 사업이라도 올해
              기준이 작년과 다를 수 있습니다. 각 사업의 기준연도를 함께
              보세요.
            </li>
          </ul>
          <p>
            그래도 결론은 남습니다 —{" "}
            <strong>
              해 보지도 않고 소득 때문에 안 될 거라고 접는 것이 가장 흔한
              손해입니다.
            </strong>
          </p>
        </DocSection>
      </DocPage>

      <div className="mx-auto max-w-3xl">
        <GuideNav current="income-line" />
      </div>
    </>
  );
}
