import Link from "next/link";
import SearchBox from "./SearchBox";
import { POPULAR } from "@/lib/popular";

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

/**
 * 칩을 여덟에서 넷으로 줄였다 (2026-09-05).
 *
 * 여덟이던 것: 자가진단 · 인기순 · 주제별 · 혜택별 · 지역별 · 대상별 ·
 * 생애주기 · 신청 안내. 375px 화면에서 다섯 번째부터 잘려 나갔고, 무엇보다
 * **여섯 개(주제·혜택·지역·대상·생애주기·소득)가 전부 같은 900건을 다르게
 * 자르는 자**였다. 처음 온 사람은 목록을 보기도 전에 "어느 자로 자를까"를
 * 먼저 골라야 했다.
 *
 * 당근은 상단에 메뉴 칩이 아예 없다 — 로고와 햄버거뿐이고, 큰 갈래는 아이콘
 * 넷으로 본문에 둔다. 해피나눔은 우리보다 7배 많은 6,793건을 다루면서 첫
 * 화면에서 고르게 하는 건 셀렉트 셋뿐이다(2026-09-05 실측).
 *
 * 뺀 넷(주제·혜택·대상·생애주기)은 **지우지 않았다.** 첫 화면의 「전체 분류
 * 보기」 안과 푸터에 그대로 있다. 링크가 살아 있어야 색인도 유지된다.
 *
 * 남긴 기준은 "다른 데서 대신할 수 없는가"다.
 *   자가진단 — 이 사이트에만 있는 것
 *   인기순   — 아무 조건 없이 그냥 보고 싶을 때
 *   지역별   — 축 여섯 중 유일하게 "나는 어디 산다"로 바로 답이 되는 것
 *   신청 안내 — 목록이 아니라 읽을거리라 성격이 다르다
 */
const NAV: Nav[] = [
  { href: "/check", label: "자가진단", accent: true },
  { href: "/service", label: "인기순" },
  { href: "/region", label: "지역별" },
  { href: "/guide", label: "신청 안내" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-14 items-center gap-3">
          <Link
            href="/"
            className="shrink-0 text-lg font-bold sm:text-xl"
            aria-label="복지클릭 홈"
          >
            복지<span className="text-brand">클릭</span>
          </Link>
          {/* 넓은 화면에서는 오른쪽 끝으로 밀고 폭을 제한한다. 좁은 화면에서는
              남는 폭을 그대로 다 쓴다 — 검색어가 잘리면 쓸모가 없다. */}
          <div className="min-w-0 flex-1 sm:ml-auto sm:max-w-xs sm:flex-none">
            <SearchBox placeholder="지원금 이름 검색" popular={POPULAR} />
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
