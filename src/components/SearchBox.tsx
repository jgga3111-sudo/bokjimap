"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { searchAll } from "@/lib/search";

/**
 * 사이트 내 검색창.
 *
 * 브라우저에 내려둔 이름 색인을 즉시 거르므로 검색 버튼이 없다. 치는 대로
 * 결과가 뜬다. 키보드로만도 쓸 수 있어야 한다 — ↑↓ 이동, Enter 이동, Esc 닫기.
 *
 * 한글은 조합 중(예: "청녀"+ㄴ)에 onChange가 여러 번 불린다. 그래도 매번
 * 거르는 편이 자연스럽다 — 900건이라 체감되는 지연이 없다.
 *
 * **여기는 이름만 본다.** 본문(지원내용·지원대상)까지 찾는 것은 `/search`가
 * 서버에서 한다. 그래서 이 드롭다운의 밑줄은 언제나 그리로 가는 길이다.
 *
 * 드롭다운은 8건까지만 보여준다. 그런데 "청년"에는 60건이 걸린다. 예전에는
 * 나머지 52건으로 갈 길이 아예 없었다 — Enter를 쳐도 1등 항목으로 넘어갈 뿐.
 * 그래서 **아무것도 고르지 않은 채 친 Enter는 전체 결과 페이지로 보낸다.**
 * ↓로 항목을 고른 뒤의 Enter만 그 항목으로 간다.
 */
/** 드롭다운에 띄우는 개수. 더 늘리면 화면을 덮어 뒤가 안 보인다. */
const VISIBLE = 8;

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

  /* 전부 거른 뒤 앞의 8건만 띄운다. 전체 건수를 알아야 "60건 모두 보기"를
     쓸 수 있는데, 자른 배열로는 몇 건이 더 있는지 알 수 없다. */
  const all = useMemo(() => searchAll(query), [query]);
  const hits = useMemo(() => all.slice(0, VISIBLE), [all]);

  /* 바깥을 누르면 닫는다. 결과가 떠 있는 채로 다른 걸 누르면 방해가 된다. */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const leave = () => {
    setOpen(false);
    setQuery("");
    setCursor(-1);
  };

  const goService = (id: string) => {
    leave();
    router.push(`/service/${id}`);
  };

  /** 전체 결과 페이지로. 검색어는 그대로 넘긴다. */
  const goResults = () => {
    const q = query.trim();
    if (!q) return;
    leave();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      /* 고른 게 있으면 그리로, 없으면 전체 결과로. 결과가 하나도 없을 때도
         전체 결과 페이지로 보낸다 — 거기에 다음에 뭘 할지 안내가 있다. */
      if (cursor >= 0 && hits[cursor]) goService(hits[cursor].id);
      else goResults();
      return;
    }
    if (hits.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % hits.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c <= 0 ? hits.length - 1 : c - 1));
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
            /*
              여기는 **막다른 골목이면 안 된다.**

              이 드롭다운은 이름만 본다. 그래서 "백신"·"도배"처럼 이름에 없는
              낱말은 여기서 0건이 나오는데, `/search`는 본문까지 뒤지므로
              실제로는 걸린다(백신 5건·도배 6건). 0건이라고 적고 끝내면
              **있는 걸 없다고 말하는 화면**이 된다.

              그러니 0건일 때야말로 본문 검색으로 보내야 한다.
            */
            <Link
              href={`/search?q=${encodeURIComponent(query.trim())}`}
              onClick={leave}
              className="block px-4 py-5 text-center hover:bg-brand-soft/40"
            >
              <span className="block text-sm text-muted">
                이름에 <strong className="text-ink">{query}</strong> 이(가) 들어간
                서비스가 없습니다.
              </span>
              <span className="mt-1.5 block text-sm font-medium text-brand">
                지원내용·지원대상까지 찾아보기 →
              </span>
            </Link>
          ) : (
            <>
              <ul id={listId} role="listbox" className="divide-y divide-line">
                {hits.map((h, i) => (
                  <li key={h.id} role="option" aria-selected={i === cursor}>
                    <Link
                      href={`/service/${h.id}`}
                      onClick={leave}
                      onMouseEnter={() => setCursor(i)}
                      className={`block px-4 py-2.5 ${
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
              {/*
                항상 건다. 예전에는 8건이 넘을 때만 보여줬는데, 여기 목록은
                **이름만 본 결과**라 8건 이하일 때도 본문에는 더 있다.
                「치과」는 이름으로 3건이지만 본문까지 보면 7건이다.
              */}
              <Link
                href={`/search?q=${encodeURIComponent(query.trim())}`}
                onClick={leave}
                className="block border-t border-line bg-slate-50 px-4 py-2.5 text-center text-sm font-medium text-brand hover:bg-brand-soft"
              >
                {all.length > VISIBLE
                  ? `이름에 걸린 ${all.length.toLocaleString()}건 모두 + 본문까지 →`
                  : "지원내용·지원대상까지 찾아보기 →"}
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
