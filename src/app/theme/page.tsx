import type { Metadata } from "next";
import { THEMES } from "@/lib/axes";
import { services } from "@/data/services";
import AxisGrid from "@/components/AxisGrid";

export const metadata: Metadata = {
  title: "주제별 복지·지원금",
  description:
    "생활지원·주거·일자리·의료·교육·에너지 등 필요한 주제를 골라 중앙부처 복지 사업을 확인하세요.",
  alternates: { canonical: "/theme" },
};

export default function ThemeIndex() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">주제별 복지·지원금</h1>
        <p className="text-sm leading-relaxed text-muted">
          중앙부처가 운영하는 사업을 주제로 나눈 것입니다. 무엇이 급한지는
          아는데 사업 이름을 모를 때 여기서 찾으세요.
        </p>
      </header>
      <AxisGrid
        base="/theme"
        items={THEMES}
        countOf={(a) => services.filter((s) => s.themes.includes(a.value)).length}
      />
    </div>
  );
}
