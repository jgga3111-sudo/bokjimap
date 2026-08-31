import type { Metadata } from "next";
import { services } from "@/data/services";
import ServiceList from "@/components/ServiceList";

export const metadata: Metadata = {
  title: "전체 복지·지원금",
  description: "중앙부처와 지자체가 제공하는 복지 서비스 전체 목록입니다.",
};

export default function ServiceIndex() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">전체 복지·지원금</h1>
        <p className="text-sm text-slate-500">{services.length}건</p>
      </header>
      <ServiceList services={services} />
    </div>
  );
}
