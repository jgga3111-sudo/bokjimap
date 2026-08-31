import type { Metadata } from "next";
import { LIFE_STAGES } from "@/lib/axes";
import { services } from "@/data/services";
import AxisGrid from "@/components/AxisGrid";

export const metadata: Metadata = {
  title: "생애주기별 복지·지원금",
  description:
    "임신·출산부터 영유아·아동·청소년·청년·중장년·노년까지, 생애주기에 맞는 복지 서비스를 찾아보세요.",
  alternates: { canonical: "/life" },
};

export default function LifeIndex() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">생애주기별 복지·지원금</h1>
      <AxisGrid
        base="/life"
        items={LIFE_STAGES}
        countOf={(a) => services.filter((s) => s.lifeStages.includes(a.slug)).length}
      />
    </div>
  );
}
