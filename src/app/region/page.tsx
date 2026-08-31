import Link from "next/link";
import type { Metadata } from "next";
import { SIDO_LIST } from "@/lib/regions";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "지역별 복지·지원금",
  description: "시·도를 골라 해당 지역의 복지 서비스와 지원금을 확인하세요.",
};

export default function RegionIndex() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">지역별 복지·지원금</h1>
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {SIDO_LIST.map((sido) => {
          const count = services.filter((s) => s.sidoName === sido.fullName).length;
          return (
            <li key={sido.slug}>
              <Link
                href={`/region/${sido.slug}`}
                className="block rounded-md border border-slate-200 px-3 py-2 text-center text-sm hover:border-slate-400"
              >
                <span className="block">{sido.name}</span>
                <span className="block text-xs text-slate-400">{count}건</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
