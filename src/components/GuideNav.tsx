import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { GUIDE_PUBLISHED } from "@/lib/guidePublished";
import { SITE } from "@/lib/site";
import { jsonLd } from "@/lib/safe";

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

  /*
    Article 구조화 데이터 (2026-09-11). 안내 글에는 사이트 공통 WebSite밖에
    없어서 구글이 글의 작성일·수정일·쓴 사람을 못 읽었다. 글마다 붙이는 대신
    모든 글 끝에 이미 있는 이 부품에서 내보낸다 — 새 글을 내도 빠뜨릴 수가
    없다. 작성자·발행자는 layout의 WebSite와 같은 Person이다(정부 기관처럼
    보이지 않게). 날짜는 guides.ts의 updated와 git 첫 커밋일만 쓴다.
    jsonLd()가 부등호·앰퍼샌드를 이스케이프한다(safe.ts).
  */
  const g = i < 0 ? null : GUIDES[i];
  const published = g ? GUIDE_PUBLISHED[g.slug] : undefined;
  const article = g && {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.summary,
    inLanguage: "ko",
    ...(published ? { datePublished: published } : {}),
    dateModified: g.updated,
    mainEntityOfPage: `${SITE.url}/guide/${g.slug}`,
    author: { "@type": "Person", name: SITE.operator },
    publisher: { "@type": "Person", name: SITE.operator },
  };

  return (
    <nav className="mt-14 border-t border-line pt-8">
      {article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(article) }}
        />
      )}
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
