import type { Metadata } from "next";
import { LIFE_STAGES } from "@/lib/axes";
import { services } from "@/data/services";
import AxisGrid from "@/components/AxisGrid";
import AxisIndexNote from "@/components/AxisIndexNote";
import Link from "next/link";

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
      <header className="band">
        <h1 className="text-2xl font-extrabold sm:text-3xl">생애주기별 복지·지원금</h1>
      </header>
      <AxisGrid
        base="/life"
        items={LIFE_STAGES}
        countOf={(a) => services.filter((s) => s.lifeStages.includes(a.slug)).length}
      />
      <AxisIndexNote field="lifeStages" word="생애주기" axes={LIFE_STAGES}>
        나이 선도 사업마다 다릅니다. 같은 「청년」 칸이라도 34세까지인 사업과 39세까지인 사업이
        섞여 있어서, 이 목록은 나이로 거른 것이 아니라 그 칸이 붙은 사업을 모은 것입니다. 정확한
        나이 기준은 각 상세의 지원 대상에서 확인하세요. 「청년이면서 저소득」처럼 둘을 겹쳐 보려면{" "}
        <Link href="/find" className="text-brand underline">
          조건으로 좁히기
        </Link>
        를 쓰면 됩니다.
      </AxisIndexNote>
    </div>
  );
}
