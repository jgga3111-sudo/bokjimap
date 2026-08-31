import Link from "next/link";
import SearchBox from "./SearchBox";

/**
 * 헤더 — sticky + 로고 + 검색 + 이모지 아이콘 내비.
 *
 * 검색을 헤더에 둔 이유: 600건에서 이름으로 찾을 방법이 그 전까지 없었다.
 * 넓은 화면에서는 로고 옆에, 좁은 화면에서는 로고 아래 한 줄을 차지한다.
 */
type Nav = { href: string; label: string; icon: string; accent?: boolean };

const NAV: Nav[] = [
  { href: "/check", label: "자가진단", icon: "🧮", accent: true },
  { href: "/service", label: "인기순", icon: "🔥" },
  { href: "/region", label: "지역별", icon: "📍" },
  { href: "/target", label: "대상별", icon: "👥" },
  { href: "/life", label: "생애주기", icon: "🌱" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-14 items-center gap-4">
          <Link href="/" className="shrink-0 text-xl font-bold">
            복지<span className="text-brand">MAP</span>
          </Link>
          <div className="ml-auto hidden w-full max-w-xs sm:block">
            <SearchBox placeholder="지원금 이름으로 검색" />
          </div>
        </div>

        <div className="pb-2 sm:hidden">
          <SearchBox placeholder="지원금 이름으로 검색" />
        </div>

        {/* 좁은 화면에서 가로 스크롤되도록. 페이지 전체가 밀리지 않게 여기서만 넘긴다. */}
        <nav className="-mx-4 overflow-x-auto px-4 pb-2">
          <ul className="flex gap-2 whitespace-nowrap">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm transition ${
                    n.accent
                      ? "border-brand bg-brand-soft font-semibold text-brand"
                      : "border-line hover:border-brand hover:text-brand"
                  }`}
                >
                  <span aria-hidden>{n.icon}</span>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
