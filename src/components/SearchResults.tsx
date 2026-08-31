"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { searchAll, INDEX } from "@/lib/search";
import SearchBox from "./SearchBox";

/**
 * 전체 검색 결과.
 *
 * 검색 색인은 브라우저에 통째로 내려가 있으므로(600건, 76KB) 서버를 거치지
 * 않는다. 그래서 이 화면은 클라이언트 컴포넌트다. 서버 렌더가 안 되지만
 * 검색 결과 페이지는 어차피 색인 대상이 아니라 손해가 없다.
 *
 * 한 화면에 다 건다. "청년" 60건이 가장 많은 축이라 더 나눌 이유가 없고,
 * 페이지를 나누면 오히려 원하는 걸 못 찾는다.
 */
const MAX = 120;

export default function SearchResults() {
  const q = (useSearchParams().get("q") ?? "").trim();
  const hits = useMemo(() => (q ? searchAll(q) : []), [q]);
  const shown = hits.slice(0, MAX);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">
          {q ? (
            <>
              <span className="text-brand">{q}</span> 검색 결과
            </>
          ) : (
            "복지 서비스 검색"
          )}
        </h1>
        {q && (
          <p className="mt-1 text-sm text-muted">
            {hits.length.toLocaleString()}건
            {hits.length > MAX && ` 중 ${MAX}건 표시`}
          </p>
        )}
      </div>

      {/* 결과를 보다가 바로 다시 칠 수 있어야 한다. 헤더 검색창까지
          올라가게 만들면 화면이 길 때 번거롭다. */}
      <SearchBox placeholder="다시 검색" size="lg" />

      {q === "" ? (
        <p className="rounded-xl border border-line bg-slate-50 px-4 py-10 text-center text-sm text-muted">
          찾으시는 지원금 이름을 넣어 보세요.
          <br />
          <span className="text-xs">
            초성으로도 찾습니다 — &ldquo;ㅊㄴㅇㅅ&rdquo; → 청년월세
          </span>
        </p>
      ) : hits.length === 0 ? (
        /* 없으면 없다고 쓴다. 비슷한 걸 억지로 보여주면 있는 줄 안다. */
        <div className="rounded-xl border border-line bg-slate-50 px-4 py-10 text-center">
          <p className="text-sm text-ink">
            <strong>{q}</strong> 에 해당하는 서비스가 없습니다.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            수록된 {INDEX.length.toLocaleString()}건 중에서 찾습니다. 조회수가
            높은 것부터 채우고 있어 아직 안 들어온 사업일 수 있습니다.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link
              href="/service"
              className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium hover:border-brand hover:text-brand"
            >
              많이 찾는 지원 보기
            </Link>
            <Link
              href="/region"
              className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium hover:border-brand hover:text-brand"
            >
              지역으로 찾기
            </Link>
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
          {shown.map((h) => (
            <li key={h.id}>
              <Link
                href={`/service/${h.id}`}
                className="block px-4 py-3 transition hover:bg-brand-soft/40"
              >
                <p className="font-medium text-ink">{h.name}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {[h.place, h.dept].filter(Boolean).join(" · ")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {hits.length > MAX && (
        <p className="text-center text-xs text-muted">
          결과가 너무 많습니다. 낱말을 하나 더 붙이면 좁혀집니다 — 예:
          &ldquo;서울 청년&rdquo;
        </p>
      )}
    </div>
  );
}
