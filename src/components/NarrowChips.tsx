import Link from "next/link";
import { services } from "@/data/services";
import { narrowRows, type FindQuery } from "@/lib/narrow";

/**
 * 허브 머리에 다는 「이 안에서 더 좁히기」 칩 한 줄(축마다 한 줄).
 *
 * `/life/youth`에서 「저소득 67」을 누르면 `/find?life=youth&target=low-income`
 * 으로 간다. 건수는 빌드 때 `narrow.ts`가 `/find`와 같은 규칙으로 센 값이라
 * 눌러서 나오는 수와 같다(그 파일 머리말).
 *
 * ── 서버 컴포넌트다 ────────────────────────────────────────────
 * `@/data/services`를 읽지만 클라이언트로는 링크 글자만 내려간다. 바로 밑
 * `HubList`의 필터 상자와 다른 점 — 저쪽은 **이 목록 안**을 브라우저에서
 * 거르고, 여기는 **다른 축과 겹친 결과 화면**으로 보낸다. 대상 축은 `HubList`
 * 필터에 없어서(생애주기 허브는 지역·혜택·주제만 건다) 이 줄이 유일한 길이다.
 *
 * ── 모양 ────────────────────────────────────────────────────────
 * `HubList` 필터 칩과 같은 치수(rounded-full · px-2.5 py-1 · text-xs · 건수는
 * slate-400)로 맞췄다. 같은 화면에 두 종류 칩이 다른 크기로 놓이면 어느 쪽이
 * 무엇인지 헷갈린다. 다른 점은 단추가 아니라 링크라는 것뿐이다.
 *
 * `prefetch={false}` — `/find`는 동적 페이지라 미리 가져와도 얻는 게 없고,
 * 허브 하나에 링크가 스물 남짓 깔린다.
 */
export default function NarrowChips({ base }: { base: FindQuery }) {
  const rows = narrowRows(services, base);
  if (rows.length === 0) return null;
  const hasRegion = rows.some((r) => r.key === "region");

  return (
    <nav
      aria-label="이 안에서 더 좁히기"
      className="rounded-xl border border-line bg-sunken/70 px-3.5 py-3"
    >
      <p className="text-sm font-medium text-slate-700">
        이 안에서 더 좁히기
        <span className="ml-1.5 text-xs font-normal text-muted">
          누르면 조건을 겹친 결과로 갑니다
          {/* 지역 건수는 `/find`처럼 전국 공통(중앙부처) 사업을 포함해 센다.
              안 적어 두면 「세종 98」이 세종 자체 사업 98건으로 읽힌다. */}
          {hasRegion && " · 지역은 전국 공통 사업을 포함해 셉니다"}
        </span>
      </p>
      <div className="mt-2 space-y-1.5">
        {rows.map((r) => (
          <div
            key={r.key}
            className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5"
          >
            <span className="w-14 shrink-0 text-xs font-bold text-slate-500">
              {r.label}
            </span>
            {r.chips.map((c) => (
              <Link
                key={c.slug}
                href={c.href}
                prefetch={false}
                className="rounded-full border border-line bg-white px-2.5 py-1 text-xs text-slate-600 transition hover:border-brand hover:text-brand"
              >
                {c.label}
                <span className="ml-1 text-slate-400">{c.count}</span>
              </Link>
            ))}
            {r.moreHref && (
              <Link
                href={r.moreHref}
                prefetch={false}
                aria-label={`나머지 ${r.label} 고르기 — 조건으로 찾기`}
                className="rounded-full border border-line bg-white px-2.5 py-1 text-xs text-slate-600 transition hover:border-brand hover:text-brand"
              >
                …
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

/**
 * `/find`에 없는 축(주제·혜택)의 허브에 다는 링크 한 줄.
 *
 * 칩을 안 다는 이유 — `/find`는 생애주기·대상·지역만 받는다. 「주거」 주제를
 * 물고 갈 수 없는데 「이 안에서 더 좁히기」라고 적으면 거짓말이다. 그래서
 * 건수 없이, **이 축의 조건은 이어지지 않는다**고 적은 채로 보낸다.
 */
export function FindLink({ axisLabel }: { axisLabel: string }) {
  return (
    <p className="text-sm text-muted">
      <Link href="/find" className="underline hover:text-brand">
        생애주기·대상·지역을 겹쳐서 찾기 →
      </Link>
      <span className="ml-2 text-xs">
        {axisLabel} 조건은 그 화면으로 이어지지 않습니다
      </span>
    </p>
  );
}
