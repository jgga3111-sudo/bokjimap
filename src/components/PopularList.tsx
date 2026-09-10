import Link from "next/link";
import Badge from "./Badge";
import IncomeMatch from "./IncomeMatch";
import type { CardService } from "./ServiceCard";
import { nameWithAlias } from "@/lib/aliases";
import { payType, views, placeLabel, visiblePayTypes } from "@/lib/display";

/**
 * 첫 화면 「많이 찾는 지원」 전용 순위 목록.
 *
 * 여기는 원래 `ServiceList`(카드 여덟 장)를 썼다. 375px에서 카드 한 장이
 * 약 200px이라 이 블록 하나가 **1,700px 가까이** 됐다 — 첫 화면 전체
 * (5,700px)의 3할이다. 그런데 이 자리의 일은 "무엇이 많이 찾아지나"를
 * 훑게 하는 것이지 요약을 읽히는 것이 아니다. 요약 두 줄은 누르면
 * 상세 맨 위에 그대로 있다.
 *
 * 그래서 첫 화면에서만 **한 줄짜리 순위표**로 바꿨다. 남긴 것 — 순위,
 * 이름(통칭 포함), 지역·부처, 지급 형태 하나, 자가진단 일치 딱지, 조회수.
 * 뺀 것 — 요약 두 줄과 주기·대상 회색 줄. 허브 목록은 카드 그대로다
 * (거기서는 요약이 고르는 근거라 빼면 안 된다).
 */
export default function PopularList({
  services,
}: {
  services: readonly CardService[];
}) {
  return (
    <ol className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
      {services.map((s, i) => {
        const pay = visiblePayTypes(s.payTypes)[0];
        return (
          <li key={s.id}>
            <Link
              href={`/service/${s.id}`}
              className="group flex items-center gap-3 px-4 py-3 transition hover:bg-ground"
            >
              <span className="w-5 shrink-0 text-center text-sm font-extrabold text-brand tabular-nums">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="line-clamp-2 font-semibold leading-snug text-ink group-hover:text-brand">
                  {nameWithAlias(s.id, s.name)}
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted">
                  {[placeLabel(s), s.department].filter(Boolean).join(" · ")}
                </span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-1">
                <span className="flex items-center gap-1 empty:hidden">
                  <IncomeMatch percent={s.medianPercent} />
                  {pay && (
                    <Badge tone={payType(pay).tone}>{payType(pay).label}</Badge>
                  )}
                </span>
                {s.views > 0 && (
                  <span
                    className="text-xs text-slate-400 tabular-nums"
                    title="복지로 누적 조회수"
                  >
                    조회 {views(s.views)}
                  </span>
                )}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
