import Link from "next/link";
import { GUIDES } from "@/lib/guides";

/**
 * 글 끝에 붙는 다른 글 목록.
 *
 * 지금 보고 있는 글은 뺀다 — 자기 자신으로 가는 링크는 클릭할 이유가 없고,
 * 넷 중 하나가 죽은 링크처럼 보인다.
 */
export default function GuideNav({ current }: { current: string }) {
  const rest = GUIDES.filter((g) => g.slug !== current);
  return (
    <nav className="mt-14 border-t border-line pt-8">
      <h2 className="text-sm font-bold text-ink">다른 안내 글</h2>
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
