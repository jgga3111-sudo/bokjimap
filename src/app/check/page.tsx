import type { Metadata } from "next";
import Link from "next/link";
import IncomeCheck, {
  type ServicesByPercent,
} from "@/components/IncomeCheck";
import { BASE_YEAR, medianIncome, thresholdOf, CUTOFFS } from "@/lib/midIncome";
import { won } from "@/lib/display";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: `${BASE_YEAR}년 복지 지원금 자격 자가진단 — 기준 중위소득 계산기`,
  description: `가구원 수와 월 소득(또는 연봉·건강보험료)을 넣으면 ${BASE_YEAR}년 기준 중위소득 대비 몇 %인지, 생계·의료·주거·교육급여와 차상위 기준에 해당하는지 바로 확인합니다.`,
  alternates: { canonical: "/check" },
};

/** 표에 실을 가구원 수. 1~6인은 고시 표, 7인은 고시 규칙으로 외삽한 값이다. */
const HOUSEHOLDS = [1, 2, 3, 4, 5, 6, 7];

/**
 * 기준선별 해당 사업 — **선정기준 원문에 "중위소득 N%"가 적힌 것만** 모은다.
 * 사업명을 우리가 기준선에 배정하지 않는다. 조회수 높은 순으로 몇 개만.
 */
const SERVICES_BY_PERCENT: ServicesByPercent = {};
for (const c of CUTOFFS) {
  const hits = services
    .filter((s) => s.medianPercent === c.percent)
    .slice(0, 4)
    .map((s) => ({ id: s.id, name: s.name! }));
  if (hits.length) SERVICES_BY_PERCENT[c.percent] = hits;
}

export default function CheckPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">
          내가 받을 수 있나?{" "}
          <span className="text-brand">1분 자가진단</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          복지 지원의 자격 기준은 대부분 &ldquo;기준 중위소득 몇 % 이하&rdquo;로
          정해집니다. 가구원 수와 소득만 넣으면 내가 어느 구간인지 바로
          계산됩니다.
        </p>
      </header>

      <IncomeCheck servicesByPercent={SERVICES_BY_PERCENT} />

      {/*
        계산기 바로 밑에 붙인다. 지식iN을 뒤져 보니(2026-08-31) 사람들이 실제로
        틀리는 지점은 계산식이 아니라 **무엇을 넣어야 하는지**였다. 맞벌이인데
        본인 보험료만 넣거나, 장기요양보험료까지 더해 넣는 경우가 압도적으로
        많다. 둘 다 결과를 실제보다 나쁘게 만들어 "나는 대상이 아니구나"로
        끝나게 한다. FAQ 페이지까지 찾아가는 사람은 드무니 여기 세 줄로 둔다.
      */}
      <aside className="rounded-xl border border-line bg-white px-4 py-4 text-sm leading-relaxed text-slate-700">
        <p className="font-bold text-ink">건강보험료로 넣으신다면</p>
        <ul className="mt-2 space-y-1.5">
          <li>
            맞벌이라면 <strong>부부의 보험료를 합쳐서</strong> 넣고, 가구원 수는
            2인으로 두세요. 본인 것만 넣어 &ldquo;기준 이하&rdquo;로 보였다가
            신청 후 탈락하는 경우가 가장 흔합니다.
          </li>
          <li>
            <strong>장기요양보험료는 빼고</strong> 건강보험료만 넣으세요.
            명세서에 나란히 찍혀 있어 함께 더하기 쉬운데, 그러면 소득이 실제보다
            높게 나옵니다.
          </li>
        </ul>
        <p className="mt-2.5 text-xs">
          <Link href="/faq#income" className="text-brand underline">
            건강보험료로 소득을 확인하는 방법 자세히 보기 →
          </Link>
        </p>
      </aside>

      {/* 계산기 밑에 표를 함께 둔다. 계산기는 클라이언트에서 그려지지만 이 표는
          서버 렌더라 검색엔진이 읽는다 — 페이지가 빈 껍데기가 되지 않게. */}
      <section id="median-table" className="scroll-mt-20">
        <h2 className="text-lg font-bold">
          {BASE_YEAR}년 기준 중위소득 표
        </h2>
        <p className="mt-1 text-xs text-muted">
          보건복지부 제77차 중앙생활보장위원회 의결(2025-07-31). 4인 가구 기준
          6.51% 인상으로 역대 최대 폭입니다.
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-y border-line bg-slate-50 text-left">
                <th className="px-3 py-2 font-semibold">가구원 수</th>
                <th className="px-3 py-2 font-semibold">기준 중위소득</th>
                <th className="px-3 py-2 font-semibold">생계급여 32%</th>
                <th className="px-3 py-2 font-semibold">의료급여 40%</th>
                <th className="px-3 py-2 font-semibold">주거급여 48%</th>
                <th className="px-3 py-2 font-semibold">교육급여 50%</th>
              </tr>
            </thead>
            <tbody>
              {HOUSEHOLDS.map((n) => (
                <tr key={n} className="border-b border-line">
                  <th scope="row" className="px-3 py-2 text-left font-medium">
                    {n === 7 ? "7인" : `${n}인`}
                  </th>
                  <td className="px-3 py-2 font-semibold text-brand">
                    {won(medianIncome(n))}
                  </td>
                  {[32, 40, 48, 50].map((p) => (
                    <td key={p} className="px-3 py-2 text-slate-600">
                      {won(thresholdOf(n, p))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          고시는 7인 가구까지 표로 정합니다. 8인 이상은 &ldquo;7인 가구 기준
          중위소득에서 6인 가구 기준 중위소득의 차액(959,198원)을 1인 늘어날
          때마다 더해&rdquo; 계산합니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold">소득 기준은 어떻게 정해지나</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
          <p>
            국민기초생활보장법은 네 가지 급여의 선정기준을 기준 중위소득의
            일정 비율로 정합니다. 생계급여 32%, 의료급여 40%, 주거급여 48%,
            교육급여 50%입니다. 흔히 말하는 <strong>차상위계층</strong>도 기준
            중위소득 50% 이하를 뜻합니다.
          </p>
          <p>
            그 밖의 사업은 60%, 100%, 150% 등 저마다 다른 기준선을 씁니다. 같은
            이름의 사업이라도 지자체마다 기준이 다르고 해마다 바뀌므로,{" "}
            <strong>
              이 사이트는 각 사업의 선정기준 원문에 적힌 비율만 그대로 옮깁니다.
            </strong>{" "}
            원문에 명시가 없으면 비워 둡니다 — 짐작해서 채우지 않습니다.
          </p>
          <p>
            심사에 쓰이는 값은 소득 자체가 아니라{" "}
            <strong>소득인정액</strong>입니다. 근로소득의 일부를 공제하고, 집·차·
            예금 같은 재산을 정해진 비율로 소득으로 환산해 더한 금액입니다.
            그래서 월급이 기준을 조금 넘어도 대상이 되거나, 반대로 소득이
            적어도 재산 때문에 탈락할 수 있습니다.
          </p>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          기준선별로 어떤 사업이 있는지는{" "}
          <Link href="/service" className="text-brand underline">
            복지 서비스 목록
          </Link>
          에서 각 사업의 선정기준을 확인하세요.
        </p>
      </section>
    </div>
  );
}
