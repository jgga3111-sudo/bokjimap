"use client";

import { useState } from "react";

/**
 * 긴 원문을 접어 두고 「전부 보기」로 편다 (2026-10-05, 사용자 승인).
 *
 * 상세가 휴대폰에서 7,000px였다 — 같은 사업의 정부24 상세의 네 배다. 원문 절(지원 대상·선정
 * 기준·지원 내용)이 길이의 대부분인데, 탭 뒤로 숨기면 검색엔진·인쇄·찾기에 불리하다.
 * 그래서 **글자는 전부 HTML에 둔 채 높이만** 접는다. 인쇄할 때는 다 펴진다.
 * 짧은 글은 호출하는 쪽이 이 부품을 쓰지 않는다(접을 것이 없는데 단추만 생긴다).
 */
export default function ClampText({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className={open ? undefined : "relative max-h-72 overflow-hidden print:max-h-none"}>
        {children}
        {!open && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent print:hidden"
          />
        )}
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-2 flex min-h-11 w-full items-center justify-center rounded-xl border border-line bg-white text-sm font-bold text-slate-700 transition hover:border-brand hover:text-brand print:hidden"
      >
        {open ? "접기 ↑" : "원문 전부 보기 ↓"}
      </button>
    </div>
  );
}
