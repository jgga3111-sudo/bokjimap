"use client";

/**
 * 「신청할 때 필요한 서류」만 인쇄한다 (2026-09-24).
 *
 * 서류 목록은 주민센터에 들고 가는 것인데, 그냥 인쇄하면 헤더·목차·다른 절까지
 * 열 장 넘게 찍혔다. 인쇄하는 동안만 body에 표시를 달고, globals.css의
 * `@media print`가 그 표시를 보고 서류 절 말고는 숨긴다. 글자는 화면과 같다.
 */
export default function PrintPapers() {
  const print = () => {
    const body = document.body;
    body.dataset.print = "papers";
    window.addEventListener("afterprint", () => delete body.dataset.print, { once: true });
    window.print();
  };
  return (
    <button
      type="button"
      onClick={print}
      className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-ground px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-brand-soft hover:text-brand print:hidden"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M5.5 7.5V3h9v4.5M5.5 14H3.5v-6h13v6h-2" strokeLinejoin="round" />
        <rect x="5.5" y="11.5" width="9" height="5.5" rx="0.5" />
      </svg>
      이 서류 목록만 인쇄하기
    </button>
  );
}
