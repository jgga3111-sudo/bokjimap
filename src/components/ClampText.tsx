"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 긴 원문을 접어 두고 「전부 보기」로 편다 (2026-10-05, 사용자 승인).
 *
 * 상세가 휴대폰에서 7,000px였다 — 같은 사업의 정부24 상세의 네 배다. 원문 절(지원 대상·선정
 * 기준·지원 내용)이 길이의 대부분인데, 탭 뒤로 숨기면 검색엔진·인쇄·찾기에 불리하다.
 * 그래서 **글자는 전부 HTML에 둔 채 높이만** 접는다. 인쇄할 때는 다 펴진다.
 *
 * 접을지는 **그려 보고** 정한다. 글자 수·줄 수로 미리 정했더니 넓은 화면에서는 접을 것이 없는데도
 * 단추와 흐림이 붙었다(기초연금 처리 절차 1280px: 상자 248px = 내용 248px). 접는 높이(288px)보다
 * 한 화면의 1/7쯤(48px) 넘게 길 때만 접는다 — 두어 줄 가리자고 단추를 달지 않는다.
 */
const LIMIT = 288; // max-h-72

export default function ClampText({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [needed, setNeeded] = useState(true);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      const el = box.current;
      if (el) setNeeded(el.scrollHeight > LIMIT + 48);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const clamped = needed && !open;
  return (
    <div>
      <div
        ref={box}
        className={clamped ? "relative max-h-72 overflow-hidden print:max-h-none" : undefined}
      >
        {children}
        {clamped && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent print:hidden"
          />
        )}
      </div>
      {needed && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-2 flex min-h-11 w-full items-center justify-center rounded-xl border border-line bg-white text-sm font-bold text-slate-700 transition hover:border-brand hover:text-brand print:hidden"
        >
          {open ? "접기 ↑" : "원문 전부 보기 ↓"}
        </button>
      )}
    </div>
  );
}
