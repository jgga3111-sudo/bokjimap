"use client";

import { useState } from "react";

/**
 * 「보내기」 단추 (2026-09-17).
 *
 * 복지 정보는 가족·지인에게 카톡으로 건네지는 일이 많다("엄마 이거 신청해 봐").
 * 휴대폰에서는 **기기 공유 창**(`navigator.share`)을 연다 — 카카오톡·문자가 거기
 * 다 있어 카카오 SDK를 따로 싣지 않는다(스크립트·키·CSP가 늘지 않는다).
 * 공유 창이 없는 PC 브라우저에서는 주소를 복사한다.
 *
 * 주소는 canonical과 같은 **쿼리 없는 경로**를 쓴다 — 보내는 쪽 주소창의
 * 꼬리(`#official` 따위)가 딸려 가지 않게.
 */
export default function ShareButton({ title, path }: { title: string; path: string }) {
  const [note, setNote] = useState<string | null>(null);

  async function share() {
    const url = `${location.origin}${path}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* 이용자가 공유 창을 닫은 것 — 할 일 없다. */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setNote("주소 복사됨");
    } catch {
      /* 복사 권한이 막힌 브라우저 — 조용히 넘기면 눌러도 아무 일이 없는 단추가 된다. */
      setNote("주소창의 주소를 복사해 주세요");
    }
    setTimeout(() => setNote(null), 2500);
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-brand hover:text-brand"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 15V4M8 8l4-4 4 4M5 13v5.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V13" />
      </svg>
      <span aria-live="polite">{note ?? "보내기"}</span>
    </button>
  );
}
