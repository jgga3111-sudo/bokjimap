import Link from "next/link";
import Badge from "./Badge";
import { payType, cycleLabel, views, placeLabel, visiblePayTypes } from "@/lib/display";
import { targetBySlug, lifeStageBySlug } from "@/lib/axes";
import type { WelfareService } from "@/types/welfare";

/**
 * 서비스 카드 — 한 장에서 세 가지가 바로 읽혀야 한다.
 *   ① 어떤 지원인가  → 이름 + 요약
 *   ② 혜택이 무엇인가 → 지급형태·주기 배지 (현금 / 매월 …)
 *   ③ 대상이 누구인가 → 대상·생애주기 태그
 *
 * 값이 없는 줄은 통째로 비운다. "정보 없음"으로 채우면 카드가 노이즈가 된다.
 */
export default function ServiceCard({
  service: s,
  rank,
}: {
  service: WelfareService;
  rank?: number;
}) {
  const tags = [
    ...s.targets.map((t) => targetBySlug(t)?.label),
    ...s.lifeStages.map((t) => lifeStageBySlug(t)?.label),
  ].filter(Boolean);

  return (
    <Link
      href={`/service/${s.id}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-white p-4 transition hover:border-brand hover:shadow-[0_2px_12px_rgba(11,87,208,0.08)]"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        {visiblePayTypes(s.payTypes).slice(0, 2).map((p) => {
          const t = payType(p);
          return (
            <Badge key={p} tone={t.tone} icon={t.icon}>
              {t.label}
            </Badge>
          );
        })}
        {s.cycle && <Badge tone="slate">{cycleLabel(s.cycle)}</Badge>}
        {s.onlineApply && (
          <Badge tone="emerald" icon="🌐">
            온라인신청
          </Badge>
        )}
      </div>

      <h3 className="mt-2 font-bold leading-snug text-ink group-hover:text-brand">
        {rank !== undefined && (
          <span className="mr-1.5 text-sm font-extrabold text-brand">
            {rank}
          </span>
        )}
        {s.name}
      </h3>

      <p className="mt-1 text-xs text-muted">
        {[placeLabel(s), s.department].filter(Boolean).join(" · ")}
      </p>

      {s.summary && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {s.summary}
        </p>
      )}

      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
            >
              {t}
            </span>
          ))}
        </div>
        {s.views > 0 && (
          <span className="shrink-0 text-xs text-slate-400" title="복지로 누적 조회수">
            조회 {views(s.views)}
          </span>
        )}
      </div>
    </Link>
  );
}
