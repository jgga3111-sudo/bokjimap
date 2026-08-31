"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { search, INDEX } from "@/lib/search";

/**
 * 사이트 내 검색창.
 *
 * 600건을 브라우저에서 즉시 거르므로 검색 버튼이 없다. 치는 대로 결과가 뜬다.
 * 키보드로만도 쓸 수 있어야 한다 — ↑↓로 이동, Enter로 이동, Esc로 닫기.
 *
 * 한글은 조합 중(예: "청녀"+ㄴ)에 onChange가 여러 번 불린다. 그래도 매번
 * 거르는 편이 자연스럽다 — 600건이라 체감되는 지연이 없다.
 */
export default function SearchBox({
  placeholder = "복지 서비스 검색",
  autoFocus = false,
  size = "md",
}: {
  placeholder?: string;
  autoFocus?: boolean;
  size?: "md" | "lg";
}) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);

  const hits = useMemo(() => search(query), [query]);

  /* 바깥을 누르면 닫는다. 결과가 떠 있는 채로 다른 걸 누르면 방해가 된다. */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/service/${id}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (hits.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % hits.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c <= 0 ? hits.length - 1 : c - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(hits[cursor >= 0 ? cursor : 0].id);
    }
  };

  const big = size === "lg";

  return (
    <div ref={boxRef} className="relative">
      <div
        className={`flex items-center gap-2 rounded-xl border border-line bg-white px-3 transition focus-within:border-brand ${
          big ? "h-13 py-3" : "h-10"
        }`}
      >
        <span aria-hidden className="shrink-0 text-muted">
          🔍
        </span>
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          placeholder={placeholder}
          role="combobox"
          aria-expanded={open && hits.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-label="복지 서비스 검색"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setCursor(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className={`w-full bg-transparent outline-none placeholder:text-slate-400 ${
            big ? "text-base" : "text-sm"
          }`}
        />
        {query && (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={() => {
              setQuery("");
              setCursor(-1);
            }}
            className="shrink-0 text-sm text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        )}
      </div>

      {open && query.trim().length > 0 && (
        <div className="absolute top-full right-0 left-0 z-40 mt-1 overflow-hidden rounded-xl border border-line bg-white shadow-lg">
          {hits.length === 0 ? (
            /* 없으면 없다고 쓴다. 비슷한 걸 억지로 보여주면 있는 줄 안다. */
            <p className="px-4 py-5 text-center text-sm text-muted">
              <strong className="text-ink">{query}</strong> 에 해당하는 서비스가
              없습니다.
              <br />
              <span className="text-xs">
                수록된 {INDEX.length}건 중에서 찾습니다. 조회수 높은 순으로
                채우고 있어 아직 없을 수 있습니다.
              </span>
            </p>
          ) : (
            <ul id={listId} role="listbox">
              {hits.map((h, i) => (
                <li key={h.id} role="option" aria-selected={i === cursor}>
                  <Link
                    href={`/service/${h.id}`}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    onMouseEnter={() => setCursor(i)}
                    className={`block border-b border-line px-4 py-2.5 last:border-0 ${
                      i === cursor ? "bg-brand-soft" : ""
                    }`}
                  >
                    <p className="text-sm font-medium text-ink">{h.name}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {[h.place, h.dept].filter(Boolean).join(" · ")}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
