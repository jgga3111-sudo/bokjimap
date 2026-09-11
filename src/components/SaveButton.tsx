"use client";

import { useSyncExternalStore } from "react";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  toggleSaved,
  type SavedItem,
} from "@/lib/saved";

/**
 * 상세 페이지 제목 옆의 ☆ 단추.
 *
 * 서버 렌더에서는 늘 「저장」(빈 별)로 나가고, 브라우저에서 저장돼 있으면
 * 채운 별로 바뀐다. 정적 HTML에 "저장됨"이 굳으면 안 되기 때문이다
 * (`useSyncExternalStore` — RecentViews와 같은 이유).
 *
 * 별은 AxisIcon과 같은 선 굵기(1.6)로 그린다. 저장됐을 때만 면을 칠한다 —
 * 칠한 것과 안 칠한 것의 차이가 곧 상태라, 글자를 안 읽어도 구분된다.
 */
export default function SaveButton(item: SavedItem) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const on = items.some((x) => x.id === item.id);

  return (
    <button
      type="button"
      onClick={() => toggleSaved(item)}
      aria-pressed={on}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
        on
          ? "border-amber-300 bg-amber-50 text-amber-800"
          : "border-line bg-white text-slate-600 hover:border-brand hover:text-brand"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill={on ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
      </svg>
      {on ? "저장됨" : "관심 지원 저장"}
    </button>
  );
}
