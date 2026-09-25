import Link from "next/link";
import type { Metadata } from "next";
import { SIDO_LIST } from "@/lib/regions";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "지역별 복지·지원금",
  description:
    "시·도를 골라 해당 지역의 지자체 복지 사업을 확인하세요. 전국 어디서나 신청할 수 있는 중앙부처 사업도 함께 보여줍니다.",
  alternates: { canonical: "/region" },
};

const nationwide = services.filter((s) => s.provider === "central").length;
const localAll = services.filter((s) => s.provider === "local");
const sigunguLevel = localAll.filter((s) => s.sigunguName).length;
const bySido = SIDO_LIST.map((d) => ({
  name: d.name,
  n: localAll.filter((s) => s.sidoName === d.fullName).length,
})).sort((a, b) => b.n - a.n);

export default function RegionIndex() {
  return (
    <div className="space-y-6">
      {/* 광고 코드 없음(2026-09-13) — 칸 몇 개로 된 길잡이 화면이라 본문이 200~500자다.
          애드센스 「탐색용 화면에 광고」 정책에 걸리지 않게 뺀다(AdSenseScript 머리말). */}
      <header className="band">
        <h1 className="text-2xl font-extrabold sm:text-3xl">지역별 복지·지원금</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          지자체가 직접 하는 사업은 지역마다 다릅니다. 중앙부처 사업{" "}
          {nationwide}건은 거주지와 무관하게 어디서나 신청할 수 있어, 각 지역
          페이지에 함께 실었습니다.
        </p>
      </header>

      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {SIDO_LIST.map((sido) => {
          const count = services.filter(
            (s) => s.sidoName === sido.fullName,
          ).length;
          return (
            <li key={sido.slug}>
              <Link
                href={`/region/${sido.slug}`}
                className="block rounded-xl border border-line bg-white px-3 py-3 text-center transition hover:border-brand hover:text-brand"
              >
                <span className="block text-sm font-medium">{sido.name}</span>
                {/* 0건인 곳을 숨기지 않는다. 세종은 08-31 원본에 자체 사업이 없었다가
                    09-13에 생겼다 — 지금은 0건인 곳이 없다. */}
                <span className="mt-0.5 block text-xs text-muted">
                  {count > 0 ? `지자체 ${count}건` : "지자체 사업 없음"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* 설명 문단(2026-09-25) — 애드센스 점검에서 본문이 링크 글자뿐이라는 지적. 숫자는 렌더 때 센다. */}
      <section className="card space-y-3 px-5 py-5 text-sm leading-relaxed text-slate-700 sm:px-7 sm:py-6">
        <h2 className="text-lg font-extrabold text-ink">이 목록은 이렇게 읽어 주세요</h2>
        <p>
          지자체 사업 {localAll.length.toLocaleString()}건 중 {sigunguLevel.toLocaleString()}건은
          시·군·구가, {(localAll.length - sigunguLevel).toLocaleString()}건은 시·도나 교육청이 하는
          사업입니다. 같은 시·도 안에서도 시·군·구 사업은 사는 곳에 따라 신청할 수 있는지가
          갈리므로, 지역 페이지에서 사업마다 붙은 시·군·구 이름을 먼저 보세요.
        </p>
        <p>
          건수가 곧 그 지역 복지의 많고 적음은 아닙니다. 복지클릭은 공공데이터에 올라온 지자체 사업
          가운데 복지로 조회수가 높은 것부터 싣고 있어서, 지금은 {bySido[0].name}{" "}
          {bySido[0].n}건부터 {bySido[bySido.length - 1].name} {bySido[bySido.length - 1].n}건까지
          차이가 납니다. 조회수가 낮아 아직 싣지 않은 사업이 지역마다 더 있습니다.
        </p>
        <p>
          중앙부처 사업은 어디에 살든 조건이 같습니다. 지역과 나이·대상을 겹쳐 보려면{" "}
          <Link href="/find" className="text-brand underline">
            조건으로 좁히기
          </Link>
          를 쓰면 그 지역에서 직접 하는 사업이 먼저 나옵니다.
        </p>
      </section>
    </div>
  );
}
