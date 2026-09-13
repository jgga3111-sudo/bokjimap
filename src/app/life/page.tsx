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
      {/* 광고 코드 없음(2026-09-13) — 칸 몇 개로 된 길잡이 화면이라 본문이 200~500자다.
          애드센스 「탐색용 화면에 광고」 정책에 걸리지 않게 뺀다(AdSenseScript 머리말). */}
      <h1 className="text-2xl font-bold">생애주기별 복지·지원금</h1>
      <AxisGrid
        base="/life"
        items={LIFE_STAGES}
        countOf={(a) => services.filter((s) => s.lifeStages.includes(a.slug)).length}
      />
    </div>
  );
}
