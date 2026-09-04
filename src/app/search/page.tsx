import type { Metadata } from "next";
import Link from "next/link";
import { searchFull } from "@/lib/searchFull";
import { services } from "@/data/services";
import SearchBox from "@/components/SearchBox";

export const metadata: Metadata = {
  title: "복지 서비스 검색",
  /*
    검색 결과 페이지는 **절대 색인시키지 않는다.**

    질의마다 URL이 하나씩 생기므로 그대로 두면 내용이 거의 같은 페이지가
    무한히 만들어진다. 구글이 명시적으로 색인하지 말라고 안내하는 유형이고,
    러닝온에서 겪은 "발견됨 – 색인 안 됨"을 스스로 만드는 짓이다.

    follow는 남긴다 — 결과에서 상세로 가는 링크는 따라가도 된다.
  */
  robots: { index: false, follow: true },
};

/**
 * 검색 결과 — **서버에서 그린다.**
 *
 * 예전에는 클라이언트 컴포넌트였다. 브라우저에 내려둔 색인으로 거르니
 * 서버를 안 거쳐도 됐지만, 그 색인에는 이름·지역·부처밖에 없어서
 * **본문에만 있는 낱말은 영영 못 찾았다.** "백신"을 치면 0건이 나오는데
 * 실제로는 5건이 있었다.
 *
 * 이 화면은 `robots: noindex`라 정적 생성으로 얻는 게 없다. 서버로 옮겨
 * 900건 본문을 그대로 뒤진다 — 대신 클라이언트 번들은 한 바이트도 안 늘었다.
 * 다시 치는 검색창(`SearchBox`)만 클라이언트로 남는다.
 */
export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : (raw ?? "")).trim();
  const hits = q ? searchFull(q) : [];

  /* 자르는 이유. "지원"처럼 흔한 낱말은 수백 건이 걸리는데, 그걸 다 깔아도
     읽는 사람은 위에서 열 몇 개만 본다. 자르되 **잘랐다고 적는다.** */
  const MAX = 120;
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
            {hits.length > MAX && ` 중 ${MAX}건 표시`} · 이름과 지원내용·
            지원대상을 함께 찾은 결과입니다
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
            수록된 {services.length.toLocaleString()}건의 이름과 본문에서
            찾습니다. 조회수가 높은 것부터 채우고 있어 아직 안 들어온 사업일 수
            있습니다.
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
                {/* 이름에 없는 낱말로 걸린 건 **왜 걸렸는지** 보여준다.
                    「백신」으로 찾았는데 이름이 「어르신 건강관리 지원」이면,
                    조각이 없을 때 잘못 걸린 것처럼 보인다. */}
                {h.snippet && (
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {h.snippet}
                  </p>
                )}
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
