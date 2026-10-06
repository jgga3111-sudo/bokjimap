"use client";

import { useEffect, useRef } from "react";

/**
 * 신청 달력의 달 하나 — 접었다 펴는 상자 (2026-10-06).
 *
 * 달력 글이 휴대폰에서 15,000px이 넘었다. 달 열둘을 전부 펼쳐 두고 있어서다.
 * 접어도 글자는 HTML에 그대로 있다(`<details>`). **이번 달과 다음 달**, 그리고 주소의
 * `#m10`이 가리키는 달만 브라우저에서 편다 — 서버에는 "오늘"이 없으니 처음엔 전부 접혀 온다.
 */
export default function MonthFold({
  m,
  count,
  children,
}: {
  m: number;
  count: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const now = new Date().getMonth() + 1;
    const next = (now % 12) + 1;
    if (m === now || m === next || window.location.hash === `#m${m}`) ref.current!.open = true;
  }, [m]);

  return (
    <details
      ref={ref}
      id={`m${m}`}
      className="group scroll-mt-24 overflow-hidden rounded-xl border border-line bg-white"
    >
      <summary className="flex min-h-11 cursor-pointer list-none items-center bg-sunken px-4 py-2.5 text-sm font-extrabold text-ink [&::-webkit-details-marker]:hidden">
        {m}월
        <span className="ml-2 text-xs font-normal text-muted">{count}건</span>
        <span className="ml-auto text-xs font-normal text-brand group-open:hidden">펼치기</span>
        <span className="ml-auto hidden text-xs font-normal text-muted group-open:inline">접기</span>
      </summary>
      {children}
    </details>
  );
}
