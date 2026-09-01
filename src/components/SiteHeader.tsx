import Link from "next/link";
import SearchBox from "./SearchBox";

/**
 * 헤더 — 두 줄. 위는 로고와 검색, 아래는 분류.
 *
 * 처음엔 좁은 화면에서 세 줄이었다(로고 / 검색 / 분류). sticky 헤더라 그
 * 세 줄이 스크롤 내내 화면 위를 차지했고, 본문이 보이는 높이가 그만큼 줄었다.
 * 로고를 줄이고 검색을 같은 줄로 올려 한 줄을 없앴다.
 *
 * 분류 칩의 이모지도 뺐다. 다섯 개가 나란히 있으면 각각을 구분해 주는 게
 * 아니라 그냥 알록달록해 보인다. 강조가 필요한 건 자가진단 하나뿐이고,
 * 그건 색으로 충분히 구별된다.
 */
type Nav = { href: string; label: string; accent?: boolean };

const NAV: Nav[] = [
  { href: "/check", label: "자가진단", accent: true },
  { href: "/service", label: "인기순" },
  { href: "/theme", label: "주제별" },
  { href: "/region", label: "지역별" },
  { href: "/target", label: "대상별" },
  { href: "/life", label: "생애주기" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-14 items-center gap-3">
          <Link
            href="/"
            className="shrink-0 text-lg font-bold sm:text-xl"
            aria-label="복지맵 홈"
          >
            복지<span className="text-brand">MAP</span>
          </Link>
          {/* 넓은 화면에서는 오른쪽 끝으로 밀고 폭을 제한한다. 좁은 화면에서는
              남는 폭을 그대로 다 쓴다 — 검색어가 잘리면 쓸모가 없다. */}
          <div className="min-w-0 flex-1 sm:ml-auto sm:max-w-xs sm:flex-none">
            <SearchBox placeholder="지원금 이름 검색" />
          </div>
        </div>

        {/* 좁은 화면에서 가로 스크롤되도록. 페이지 전체가 밀리지 않게 여기서만 넘긴다.

            오른쪽 끝을 흰색으로 흐린다. 칩 여섯 개가 375px에서 넘치는데
            마지막 것이 화면 경계에 딱 잘려 있으면 잘린 건지 거기까지인 건지
            알 수 없다. 흐림이 "옆으로 더 있다"를 말해 준다.
            pointer-events-none이라 칩을 가리지 않는다. */}
        <div className="relative">
          <nav className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="flex gap-1.5 whitespace-nowrap">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className={`inline-block rounded-full border px-3 py-1.5 text-sm transition ${
                      n.accent
                        ? "border-brand bg-brand-soft font-semibold text-brand"
                        : "border-line text-slate-600 hover:border-brand hover:text-brand"
                    }`}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent"
          />
        </div>
      </div>
    </header>
  );
}
