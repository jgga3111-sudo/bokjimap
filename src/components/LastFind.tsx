"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  rememberFind,
  clearLastFind,
  lastFindHref,
  lastFindLabels,
} from "@/lib/lastFind";

/**
 * 지난번 조건 다시 보기 — 첫 화면 「조건을 겹쳐서 좁히기」 위 한 줄 (2026-09-11).
 *
 * 서버에서는 늘 아무것도 안 그리고, 브라우저에 값이 있으면 그때 나타난다.
 * `useSyncExternalStore`를 쓰는 이유는 RecentViews와 같다 — useEffect로
 * setState를 하면 서버 렌더와 첫 브라우저 렌더가 어긋나 경고가 난다.
 *
 * 값이 없으면 아무것도 그리지 않는다. 처음 온 사람에게 "지난번 조건이
 * 없습니다"는 자리만 차지한다.
 *
 * 이름은 축 표기(`axes.ts`·`regions.ts`)에서 가져온다. 슬러그가 축 목록에서
 * 빠지면(있을 일은 없지만) 그 이름만 조용히 빠지고 링크는 그대로 간다 —
 * `/find`는 모르는 슬러그를 무시하므로 어차피 나머지 조건으로 열린다.
 */
export default function LastFind() {
  const v = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!v) return null;

  const labels = lastFindLabels(v);
  if (labels.length === 0) return null;

  return (
    <p className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
      <span>
        지난번:{" "}
        <span className="font-medium text-ink">{labels.join(" · ")}</span>{" "}
        {v.count.toLocaleString()}건
      </span>
      <Link
        href={lastFindHref(v)}
        className="font-medium text-brand underline hover:opacity-80"
      >
        → 다시 보기
      </Link>
      <button
        type="button"
        onClick={clearLastFind}
        className="underline hover:text-brand"
      >
        지우기
      </button>
    </p>
  );
}

/**
 * `/find` 결과 화면이 그리는 **쓰기 전용** 조각. 화면에는 아무것도 없다.
 *
 * `/find`는 서버 컴포넌트라 localStorage에 손을 못 댄다. 그래서 서버가 걸러
 * 낸 슬러그와 센 건수를 props로 받아 브라우저에서 한 번 적는다 — 데이터를
 * 브라우저로 내리지 않고, 계산도 서버 것을 그대로 믿는다.
 *
 * 조건이 하나도 없을 때(`/find` 맨 화면)는 find/page.tsx가 아예 그리지
 * 않는다. 그려져도 `rememberFind`가 거르지만, 안 그리는 쪽이 분명하다.
 */
export function RememberFind({
  life,
  target,
  region,
  count,
}: {
  life: string;
  target: string;
  region: string;
  count: number;
}) {
  useEffect(() => {
    rememberFind({ life, target, region, count });
  }, [life, target, region, count]);
  return null;
}
