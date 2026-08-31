import Link from "next/link";

/**
 * 헤더 — 러닝온과 같은 구조(sticky + 로고 + 이모지 아이콘 내비).
 * 러닝온 헤더 클래스: "sticky top-0 z-30 border-b bg-background/90 backdrop-blur"
 */
const NAV = [
  { href: "/region", label: "지역별", icon: "📍" },
  { href: "/target", label: "대상별", icon: "👥" },
  { href: "/life", label: "생애주기", icon: "🌱" },
  { href: "/service", label: "전체보기", icon: "📋" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[--color-line] bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-14 items-center">
          <Link href="/" className="text-xl font-bold">
            복지<span className="text-[--color-brand]">MAP</span>
          </Link>
        </div>
        {/* 좁은 화면에서 가로 스크롤되도록. 페이지 전체가 밀리지 않게 여기서만 넘긴다. */}
        <nav className="-mx-4 overflow-x-auto px-4 pb-2">
          <ul className="flex gap-2 whitespace-nowrap">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="inline-flex items-center gap-1 rounded-full border border-[--color-line] px-3 py-1.5 text-sm hover:border-[--color-brand] hover:text-[--color-brand]"
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
