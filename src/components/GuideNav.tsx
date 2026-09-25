import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { GUIDE_PUBLISHED } from "@/lib/guidePublished";
import { SITE } from "@/lib/site";
import { jsonLd } from "@/lib/safe";
import AdSenseScript from "@/components/AdSenseScript";
import ShareButton from "@/components/ShareButton";

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
    /* 09-24 공유 이미지를 Article에도 싣는다(43편 전부 opengraph-image가 있다). */
    image: `${SITE.url}/guide/${g.slug}/opengraph-image`,
    author: { "@type": "Person", name: SITE.operator, url: `${SITE.url}/about` },
    publisher: { "@type": "Person", name: SITE.operator, url: `${SITE.url}/about` },
  };
  /* 검색 결과에 「복지클릭 › 복지 신청 안내 › 글」 경로가 보이게(상세와 같은 모양). */
  const crumbs = g && {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "복지 신청 안내", item: `${SITE.url}/guide` },
      { "@type": "ListItem", position: 3, name: g.title },
    ],
  };

  return (
    <nav className="mt-14 border-t border-line pt-8">
      {/* 보내기(09-17) — 글을 다 읽은 자리가 건네기 좋은 자리다. */}
      {g && (
        <p className="mb-6 flex items-center justify-between gap-3 text-sm text-muted">
          도움이 됐다면 필요한 분께 보내 주세요.
          <ShareButton title={g.title} path={`/guide/${g.slug}`} />
        </p>
      )}
      {/* 이 글을 누가 어떻게 썼나 (2026-09-13). 애드센스 「가치가 별로 없는 콘텐츠」 재점검에서
          안내 글 22편 어디에도 쓴 사람·확인 방법이 화면에 없었다 — Article JSON-LD에만 있었다.
          모든 글 끝에 이미 붙는 이 부품에 한 번 넣어 빠뜨릴 수 없게 한다. */}
      <aside className="mb-8 rounded-xl border border-line bg-white px-4 py-3.5 text-sm leading-relaxed text-slate-700">
        <p className="font-bold text-ink">이 글은 이렇게 썼습니다</p>
        {/* 쓴 사람·날짜(2026-09-25) — 애드센스 점검에서 「운영자 익명」 지적. JSON-LD에만 있던 것을 화면에 둔다. */}
        {g && (
          <p className="mt-1 text-xs text-muted">
            쓴 사람{" "}
            <Link href="/about" className="underline hover:text-brand">
              {SITE.operator}
            </Link>
            {published && <> · 처음 올린 날 {published}</>} · 마지막으로 고친 날 {g.updated}
          </p>
        )}
        <p className="mt-1">
          공공데이터와 법령·고시·정부 사업안내서를 근거로, AI 도구의 도움을 받아 썼습니다. 금액과
          조건은 원문 표현을 그대로 옮기고 출처의 조항·쪽수를 달았으며, 저희가 계산한 값에는 따로
          표시했습니다. 내용의 책임은 복지클릭 운영자에게 있습니다. 받을 수 있는지는 판정하지
          않습니다.
        </p>
        <p className="mt-1.5 text-xs text-muted">
          <Link href="/standards" className="underline hover:text-brand">
            정보 수집·검수 기준
          </Link>{" "}
          ·{" "}
          <Link href="/about" className="underline hover:text-brand">
            사이트 소개
          </Link>{" "}
          · 틀린 곳을 찾으셨다면{" "}
          <Link href="/contact" className="underline hover:text-brand">
            알려 주세요
          </Link>
        </p>
      </aside>
      <AdSenseScript />
      {article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(article) }}
        />
      )}
      {crumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(crumbs) }}
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
