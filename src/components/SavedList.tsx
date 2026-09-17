"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import DeadlineBadge from "./DeadlineBadge";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  removeSaved,
} from "@/lib/saved";

/**
 * 관심 지원 목록. 첫 화면(`limit`로 몇 건만)과 `/saved`(전부)가 같이 쓴다.
 *
 * 골라 둔 게 없으면 첫 화면에서는 **아무것도 그리지 않는다** — 처음 온
 * 사람에게 "관심 지원이 없습니다" 상자는 자리만 차지한다(RecentViews와 같다).
 * `/saved`에서는 비어 있다고 말하고 어떻게 담는지 알려 준다.
 */
export default function SavedList({
  limit,
  showEmpty = false,
  changed,
}: {
  limit?: number;
  showEmpty?: boolean;
  /** 내용이 바뀐 사업 id → 바뀐 날(`lib/changedAt.ts`). 서버가 넘긴다. */
  changed?: Readonly<Record<string, string>>;
}) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (items.length === 0) {
    if (!showEmpty) return null;
    return (
      <p className="rounded-xl border border-dashed border-line px-4 py-10 text-center text-sm leading-relaxed text-muted">
        아직 저장한 지원이 없습니다.
        <br />
        지원 상세 페이지 제목 옆의 <strong>☆ 관심 지원 저장</strong>을 누르면
        여기에 모입니다.
      </p>
    );
  }

  const shown = limit ? items.slice(0, limit) : items;

  return (
    <div>
      <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
        {shown.map((s) => (
          <li key={s.id} className="flex items-center gap-2 pr-2">
            <Link
              href={`/service/${s.id}`}
              className="min-w-0 flex-1 px-4 py-2.5 transition hover:bg-brand-soft/40"
            >
              <span className="text-sm font-medium text-ink">{s.name}</span>
              {/* 저장해 둔 사업이 그 뒤로 끝났을 수 있다 — 여기가 가장 먼저
                  알려야 하는 자리다(2026-09-13). */}{" "}
              <DeadlineBadge id={s.id} />
              {/* 저장해 둔 뒤 원문이 고쳐졌을 수 있다(09-17). 언제 바뀌었는지 날짜를
                  적는다 — 저장한 날을 따로 적지 않으므로 「저장 뒤에」라고는 쓰지 않는다. */}
              {changed?.[s.id] && (
                <span
                  title={`${changed[s.id]}에 다시 받아 보니 원문 내용이 달라져 반영했습니다`}
                  className="ml-1 inline-flex items-center rounded-full border border-brand/30 bg-brand-soft px-2 py-0.5 align-middle text-xs font-bold text-brand"
                >
                  {Number(changed[s.id].slice(5, 7))}/{Number(changed[s.id].slice(8, 10))} 내용 바뀜
                </span>
              )}
              {s.place && (
                <span className="ml-2 text-xs text-muted">{s.place}</span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => removeSaved(s.id)}
              aria-label={`${s.name} 관심 지원에서 빼기`}
              className="shrink-0 rounded-md px-2 py-1 text-xs text-muted hover:bg-sunken hover:text-ink"
            >
              빼기
            </button>
          </li>
        ))}
      </ul>
      {limit && items.length > limit && (
        <p className="mt-2 text-right">
          <Link href="/saved" className="text-sm text-muted hover:text-brand">
            {items.length}건 전체 보기 →
          </Link>
        </p>
      )}
    </div>
  );
}
