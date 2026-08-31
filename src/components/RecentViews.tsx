"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  clearRecent,
} from "@/lib/recent";

/**
 * 최근 본 지원.
 *
 * 서버에서는 항상 빈 목록으로 그려지고, 브라우저에서 값이 있으면 그때
 * 나타난다. `useSyncExternalStore`를 쓰는 이유가 이것이다 — useEffect로
 * setState를 하면 서버 렌더와 첫 브라우저 렌더가 어긋나 경고가 난다
 * (MailLink에서 같은 문제를 겪었다).
 *
 * 본 게 없으면 아무것도 그리지 않는다. "최근 본 지원이 없습니다" 같은 빈
 * 상자는 첫 방문자에게 자리만 차지한다.
 */
export default function RecentViews() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (items.length === 0) return null;

  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">최근 본 지원</h2>
          <p className="mt-0.5 text-xs text-muted">
            이 브라우저에만 저장됩니다
          </p>
        </div>
        <button
          type="button"
          onClick={clearRecent}
          className="shrink-0 text-sm text-muted hover:text-brand"
        >
          지우기
        </button>
      </div>
      <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
        {items.map((s) => (
          <li key={s.id}>
            <Link
              href={`/service/${s.id}`}
              className="block px-4 py-2.5 transition hover:bg-brand-soft/40"
            >
              <span className="text-sm font-medium text-ink">{s.name}</span>
              {s.place && (
                <span className="ml-2 text-xs text-muted">{s.place}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
