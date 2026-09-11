"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { subscribe, getSnapshot, getServerSnapshot } from "@/lib/saved";
import SavedList from "./SavedList";

/**
 * 첫 화면의 「관심 지원」 칸. 골라 둔 게 없으면 제목까지 통째로 안 그린다
 * — SavedList만 쓰면 목록은 사라져도 제목이 덩그러니 남는다.
 */
export default function SavedHome() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (items.length === 0) return null;

  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">관심 지원</h2>
          <p className="mt-0.5 text-xs text-muted">☆로 저장한 지원</p>
        </div>
        <Link
          href="/saved"
          className="shrink-0 text-sm text-muted hover:text-brand"
        >
          전체 보기 →
        </Link>
      </div>
      <SavedList limit={5} />
    </section>
  );
}
