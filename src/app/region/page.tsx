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

export default function RegionIndex() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">지역별 복지·지원금</h1>
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
                {/* 0건인 곳을 숨기지 않는다. 세종시는 원본 데이터에 자체 사업이
                    한 건도 없다 — 우리가 못 받은 게 아니라 없는 것이다. */}
                <span className="mt-0.5 block text-xs text-muted">
                  {count > 0 ? `지자체 ${count}건` : "지자체 사업 없음"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
