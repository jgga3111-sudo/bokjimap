"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AxisIcon from "@/components/AxisIcon";

/**
 * 안내 글 목록 — 갈래를 골라 보는 화면 (2026-10-05, 사용자 요청).
 *
 * 글이 56편이 되니 상황별로 묶어도 휴대폰에서 끝없이 내려갔다. 그래서
 *  · 넓은 화면은 **왼쪽에 갈래 목록**(붙어 다님), 오른쪽에 두 칸 카드
 *  · 좁은 화면은 위에 붙는 갈래 칩 줄, 「전체」에서는 제목만 촘촘히
 *  · 갈래를 누르면 **그 갈래만** 남는다. 글 제목으로 바로 찾는 칸도 둔다.
 *
 * 처음 그릴 때는 늘 「전체」다 — 서버가 보낸 HTML에 56편이 전부 보이는 채로
 * 있어야 검색엔진이 다 읽는다. 주소의 `#baby` 같은 갈래는 브라우저에서 뒤에 읽는다
 * (첫 화면 「이런 일이 생겼다면」이 그 주소로 보낸다).
 */
export type GuideGroupView = {
  key: string;
  short: string;
  title: string;
  hint: string;
  guides: { slug: string; title: string; summary: string }[];
};

/** 갈래 그림. 축 아이콘에 있는 것은 그걸 쓰고, 없는 셋은 같은 굵기로 여기서 그린다. */
const AXIS: Record<string, string> = {
  baby: "infant",
  money: "cash",
  job: "job",
  care: "care",
  youth: "youth",
  bills: "discount",
};
const LOCAL: Record<string, React.ReactNode> = {
  all: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  basics: (
    <>
      <path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20V3.5Z" />
      <path d="M14 3.5v4h4M10 12h5M10 15.5h5" />
    </>
  ),
  dates: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  data: <path d="M5 20V11M12 20V5M19 20v-6M3.5 20h17" />,
};

function GroupIcon({ k, className = "h-5 w-5" }: { k: string; className?: string }) {
  if (AXIS[k]) return <AxisIcon slug={AXIS[k]} className={className} />;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      {LOCAL[k] ?? LOCAL.all}
    </svg>
  );
}

/** 전체 보기에서 갈래마다 먼저 보이는 글 수. 좁은 화면은 하나 적게(셋) 보인다. */
const PREVIEW = 4;

const norm = (s: string) => s.toLowerCase().replace(/[\s·\-]/g, "");

export default function GuideBrowser({ groups }: { groups: GuideGroupView[] }) {
  const [active, setActive] = useState("all");
  const [q, setQ] = useState("");
  const total = groups.reduce((n, g) => n + g.guides.length, 0);

  // 주소의 #갈래를 따른다(첫 화면에서 넘어온 경우, 뒤로 가기).
  useEffect(() => {
    const read = () => {
      const k = decodeURIComponent(window.location.hash.slice(1));
      setActive(groups.some((g) => g.key === k) ? k : "all");
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [groups]);

  const pick = (k: string) => {
    setActive(k);
    setQ("");
    window.history.replaceState(null, "", k === "all" ? window.location.pathname : `#${k}`);
    document.getElementById("guide-list")?.scrollIntoView({ block: "start" });
  };

  const needle = norm(q);
  const shown = useMemo(
    () =>
      groups
        .filter((g) => needle !== "" || active === "all" || g.key === active)
        .map((g) => ({
          ...g,
          guides:
            needle === ""
              ? g.guides
              : g.guides.filter((x) => norm(x.title + x.summary + g.hint).includes(needle)),
        }))
        .filter((g) => g.guides.length > 0),
    [groups, active, needle],
  );
  const found = shown.reduce((n, g) => n + g.guides.length, 0);
  // 한 갈래만 볼 때는 요약을 다 보여 주고, 전체일 때 좁은 화면은 제목만 둔다.
  const single = needle === "" && active !== "all";
  const brief = needle === "" && active === "all";

  const tabs = [{ key: "all", short: "전체", count: total }].concat(
    groups.map((g) => ({ key: g.key, short: g.short, count: g.guides.length })),
  );

  return (
    <div className="lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-8">
      {/* 넓은 화면 — 왼쪽 갈래 목록 */}
      <aside className="hidden lg:block">
        <nav aria-label="상황별 보기" className="sticky top-24">
          <p className="mb-2 px-3 text-xs font-bold text-muted">상황별 보기</p>
          <ul className="space-y-0.5">
            {tabs.map((t) => {
              const on = needle === "" && active === t.key;
              return (
                <li key={t.key}>
                  <button
                    type="button"
                    onClick={() => pick(t.key)}
                    aria-current={on ? "true" : undefined}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] transition ${
                      on
                        ? "bg-brand-soft font-bold text-brand"
                        : "font-medium text-slate-700 hover:bg-white hover:text-brand"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        on ? "bg-white text-brand" : "bg-white text-slate-500"
                      }`}
                    >
                      <GroupIcon k={t.key} />
                    </span>
                    <span className="min-w-0 flex-1">{t.short}</span>
                    <span className="text-xs font-normal tabular-nums text-slate-500">{t.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div id="guide-list" className="min-w-0 scroll-mt-14 sm:scroll-mt-28 lg:scroll-mt-24">
        {/* 좁은 화면 — 위에 붙는 갈래 칩 줄 */}
        <nav
          aria-label="상황별 보기"
          className="sticky top-[57px] z-10 -mx-4 mb-3 bg-ground/95 px-4 py-2 backdrop-blur sm:top-[99px] lg:hidden"
        >
          <ul className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((t) => {
              const on = needle === "" && active === t.key;
              return (
                <li key={t.key} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => pick(t.key)}
                    aria-current={on ? "true" : undefined}
                    className={`flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 text-sm transition ${
                      on
                        ? "border-brand bg-brand font-bold text-white"
                        : "border-line bg-white text-slate-700"
                    }`}
                  >
                    {t.short}
                    <span className={`text-xs tabular-nums ${on ? "text-white/80" : "text-slate-500"}`}>
                      {t.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <label className="mb-5 block">
          <span className="sr-only">글 제목으로 찾기</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="글 제목으로 찾기 — 예: 기초연금, 월세, 지급일"
            className="h-12 w-full rounded-xl border border-line bg-white px-4 text-base text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none"
          />
        </label>

        {needle !== "" && (
          <p className="mb-4 text-sm text-muted" role="status">
            {found > 0 ? (
              <>
                제목·요약에 「{q.trim()}」이 든 글 {found}편
              </>
            ) : (
              <>
                「{q.trim()}」이 든 글이 없습니다.{" "}
                <Link href={`/search?q=${encodeURIComponent(q.trim())}`} className="font-bold text-brand underline">
                  지원 사업에서 찾아보기
                </Link>
              </>
            )}
          </p>
        )}

        <div className="space-y-8">
          {shown.map((grp) => (
            <section key={grp.key} aria-labelledby={`g-${grp.key}`}>
              <div className="mb-3 flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <GroupIcon k={grp.key} />
                </span>
                <div className="min-w-0">
                  <h2 id={`g-${grp.key}`} className="text-lg font-extrabold leading-snug text-ink sm:text-xl">
                    {grp.title}
                  </h2>
                  <p className="mt-0.5 text-sm text-muted">
                    {grp.hint} · {grp.guides.length}편
                  </p>
                </div>
              </div>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {grp.guides.map((g, i) => (
                  // 전체 보기에서는 갈래마다 앞 넷만 보인다. 나머지도 HTML에는 있다(링크는 살아 있다).
                  <li
                    key={g.slug}
                    className={
                      !brief || i < PREVIEW - 1 ? undefined : i === PREVIEW - 1 ? "max-sm:hidden" : "hidden"
                    }
                  >
                    <Link
                      href={`/guide/${g.slug}`}
                      className="group card flex h-full flex-col px-4 py-3.5 transition hover:ring-2 hover:ring-brand/40 sm:p-4"
                    >
                      <h3 className="text-[15px] font-bold leading-snug text-ink group-hover:text-brand sm:text-base">
                        {g.title}
                      </h3>
                      <p
                        className={`mt-1.5 text-sm leading-relaxed text-muted ${
                          single ? "line-clamp-3" : "line-clamp-2 max-sm:hidden"
                        }`}
                      >
                        {g.summary}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              {brief && grp.guides.length >= PREVIEW && (
                <button
                  type="button"
                  onClick={() => pick(grp.key)}
                  className={`mt-2.5 ${grp.guides.length === PREVIEW ? "flex sm:hidden" : "flex"} min-h-11 w-full items-center justify-center rounded-xl border border-line bg-white text-sm font-bold text-slate-700 transition hover:border-brand hover:text-brand`}
                >
                  {grp.short} 글 {grp.guides.length}편 모두 보기 →
                </button>
              )}
            </section>
          ))}
        </div>

        {single && (
          <p className="mt-6">
            <button type="button" onClick={() => pick("all")} className="text-sm font-bold text-brand hover:underline">
              ← 전체 {total}편 보기
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
