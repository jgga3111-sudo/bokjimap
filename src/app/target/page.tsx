import Link from "next/link";
import type { Metadata } from "next";
import { TARGETS } from "@/lib/targets";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "대상별 복지·지원금",
  description: "청년·노인·장애인 등 대상을 골라 해당하는 복지 서비스를 확인하세요.",
};

export default function TargetIndex() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">대상별 복지·지원금</h1>
      <ul className="space-y-2">
        {TARGETS.map((target) => {
          const count = services.filter((s) =>
            s.targets.includes(target.slug),
          ).length;
          return (
            <li key={target.slug}>
              <Link
                href={`/target/${target.slug}`}
                className="block rounded-md border border-slate-200 px-4 py-3 hover:border-slate-400"
              >
                <span className="font-medium">{target.label}</span>
                <span className="ml-2 text-xs text-slate-400">{count}건</span>
                <span className="mt-1 block text-sm text-slate-600">
                  {target.blurb}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
