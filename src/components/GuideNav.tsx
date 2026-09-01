import Link from "next/link";
import { GUIDES } from "@/lib/guides";

/**
 * 글 끝에 붙는 다른 글 목록.
 *
 * 지금 보고 있는 글은 뺀다 — 자기 자신으로 가는 링크는 클릭할 이유가 없고,
 * 목록 중 하나가 죽은 링크처럼 보인다.
 *
 * 전부 걸지 않고 **세 편만** 건다. 글이 여덟 편이 되면서 글 끝에 카드가
 * 일곱 장 깔렸는데, 다 읽고 내려온 사람에게 그건 선택지가 아니라 벽이다.
 * 나머지는 `/guide`로 보낸다(헤더·푸터에도 있다).
 *
 * 고르는 방법은 **목록에서 내 다음 것부터 순서대로**다. 무작위로 뽑으면
 * 빌드마다 결과가 달라져 정적 페이지가 매번 바뀌고, 앞의 셋만 고정하면
 * 뒤쪽 글은 어디서도 링크되지 않는다. 이 방식이면 여덟 편이 서로를 고르게
 * 가리킨다.
 */
const SHOWN = 3;

export default function GuideNav({ current }: { current: string }) {
  const i = GUIDES.findIndex((g) => g.slug === current);
  const ordered = i < 0 ? GUIDES : [...GUIDES.slice(i + 1), ...GUIDES.slice(0, i)];
  const rest = ordered.slice(0, SHOWN);
  return (
    <nav className="mt-14 border-t border-line pt-8">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-bold text-ink">다른 안내 글</h2>
        <Link href="/guide" className="shrink-0 text-xs text-muted hover:text-brand">
          전체 {GUIDES.length}편 →
        </Link>
      </div>
      <ul className="mt-3 space-y-2.5">
        {rest.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guide/${g.slug}`}
              className="group block rounded-lg border border-line bg-white px-4 py-3 transition hover:border-brand"
            >
              <p className="text-sm font-semibold text-ink group-hover:text-brand">
                {g.title}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">
                {g.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
