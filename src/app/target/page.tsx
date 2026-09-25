import type { Metadata } from "next";
import { TARGETS } from "@/lib/axes";
import { services } from "@/data/services";
import AxisGrid from "@/components/AxisGrid";
import AxisIndexNote from "@/components/AxisIndexNote";
import Link from "next/link";

export const metadata: Metadata = {
  title: "대상별 복지·지원금",
  description:
    "저소득·장애인·보훈대상자·한부모·다자녀·다문화 등 대상을 골라 해당하는 복지 서비스를 확인하세요.",
  alternates: { canonical: "/target" },
};

export default function TargetIndex() {
  return (
    <div className="space-y-6">
      {/* 광고 코드 없음(2026-09-13) — 칸 몇 개로 된 길잡이 화면이라 본문이 200~500자다.
          애드센스 「탐색용 화면에 광고」 정책에 걸리지 않게 뺀다(AdSenseScript 머리말). */}
      <header className="band">
        <h1 className="text-2xl font-extrabold sm:text-3xl">대상별 복지·지원금</h1>
      </header>
      <AxisGrid
        base="/target"
        items={TARGETS}
        countOf={(a) => services.filter((s) => s.targets.includes(a.slug)).length}
      />
      <AxisIndexNote field="targets" word="대상" axes={TARGETS}>
        이 칸은 원문이 말하는 「주로 누구를 위한 사업인가」이지 받을 자격을 판정한 것이 아닙니다.
        「저소득」 칸에 있어도 소득 기준선은 사업마다 따로 있습니다. 기준선이 원문에 적힌 사업은{" "}
        <Link href="/income" className="text-brand underline">
          소득기준별 찾기
        </Link>
        에 모아 두었고, 내 소득이 기준 중위소득의 몇 %인지는{" "}
        <Link href="/check" className="text-brand underline">
          소득 자가진단
        </Link>
        에서 계산할 수 있습니다.
      </AxisIndexNote>
    </div>
  );
}
