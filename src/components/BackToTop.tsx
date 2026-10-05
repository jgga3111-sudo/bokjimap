"use client";

import { useEffect, useState } from "react";

/**
 * 「맨 위로」 — 두 화면 넘게 내려갔을 때만 오른쪽 아래에 뜬다 (2026-10-05).
 * 상세·전체 목록·조건 찾기가 휴대폰에서 6,000~25,000px인데 돌아갈 길이 없었다.
 * 본문을 가리지 않게 작게(44px) 두고, 인쇄에는 안 나온다.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 2);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="맨 위로"
      className="fixed right-4 bottom-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/95 text-slate-700 shadow-md backdrop-blur transition hover:border-brand hover:text-brand print:hidden"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
      </svg>
    </button>
  );
}
