import type { Metadata } from "next";
import { TARGETS } from "@/lib/axes";
import { services } from "@/data/services";
import AxisGrid from "@/components/AxisGrid";

export const metadata: Metadata = {
  title: "대상별 복지·지원금",
  description:
    "저소득·장애인·보훈대상자·한부모·다자녀·다문화 등 대상을 골라 해당하는 복지 서비스를 확인하세요.",
};

export default function TargetIndex() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">대상별 복지·지원금</h1>
      <AxisGrid
        base="/target"
        items={TARGETS}
        countOf={(a) => services.filter((s) => s.targets.includes(a.slug)).length}
      />
    </div>
  );
}
