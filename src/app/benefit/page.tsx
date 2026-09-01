import type { Metadata } from "next";
import Link from "next/link";
import { BENEFITS, servicesOf } from "@/lib/benefits";
import { services } from "@/data/services";
import AxisGrid from "@/components/AxisGrid";

export const metadata: Metadata = {
  title: "혜택 종류별 복지·지원금 — 현금·바우처·요금감면",
  description:
    "무엇을 받는지로 골라 보세요. 계좌로 들어오는 현금, 카드에 충전되는 바우처, 요금이 깎이는 감면, 물건으로 받는 현물, 돌봄 서비스, 갚아야 하는 융자로 나눠 정리했습니다.",
  alternates: { canonical: "/benefit" },
};

export default function BenefitIndex() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">혜택 종류별 복지·지원금</h1>
        <p className="text-sm leading-relaxed text-muted">
          지원금이라고 다 계좌로 들어오는 것은 아닙니다. 카드 포인트로 오는
          것, 요금이 깎이는 것, 물건으로 주는 것, 나중에 갚아야 하는 것이 모두
          섞여 있습니다. <strong>무엇을 받는지</strong>로 먼저 골라 보세요.
        </p>
      </header>

      <AxisGrid
        base="/benefit"
        items={BENEFITS}
        countOf={(b) => servicesOf(services, b).length}
      />

      {/* 이 축이 무엇을 못 담는지 밝혀 둔다. 목록에 없는 사업을 찾다가
          "빠졌다"고 오해하지 않도록. */}
      <p className="rounded-xl border border-line bg-slate-50 px-4 py-3 text-xs leading-relaxed text-muted">
        원본 자료가 지급 형태를 <strong>&ldquo;기타&rdquo;</strong>로만 적어 둔
        사업은 위 여섯 갈래 어디에도 넣지 않았습니다. 무엇을 주는지 원문이
        말해 주지 않아 짐작으로 분류할 수 없기 때문입니다. 이런 사업은{" "}
        <Link href="/service" className="text-brand underline">
          전체 목록
        </Link>
        이나 주제·지역별 페이지에서 찾을 수 있습니다.
      </p>
    </div>
  );
}
