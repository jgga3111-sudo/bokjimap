import type { MetadataRoute } from "next";
import { SITE, today } from "@/lib/site";
import { SIDO_LIST } from "@/lib/regions";
import { TARGETS, LIFE_STAGES, THEMES, MIN_SERVICES } from "@/lib/axes";
import { services, SERVICES_UPDATED } from "@/data/services";
import { isIndexable } from "@/types/welfare";

/*
  사이트맵에는 **색인되기를 바라는 페이지만** 넣는다.

  사이트맵은 "이 사이트에 있는 모든 주소"의 목록이 아니라 "이걸 색인해 달라"는
  제출이다. 서치콘솔은 제출한 URL 대비 색인된 URL을 비율로 보여주는데, 여기에
  애초에 색인될 리 없는 페이지를 섞어 넣으면 그 비율이 나빠진다. 러닝온에서
  얇은 페이지 510개가 "발견됨 – 색인 안 됨"으로 쌓인 것을 이미 겪었다(docs/02).

  그래서 두 종류를 뺀다.
   · 본문이 얇은 서비스 상세(isIndexable) — 상세에서도 noindex로 나간다
   · 약관·방침·문의 — 어느 사이트에나 있는 정형 문서라 색인 가치가 없다.
     푸터에 링크가 있으니 크롤러도 이용자도 찾아갈 수 있고, 애드센스 심사에도
     그대로 보인다. **색인을 막는 게 아니라 제출만 하지 않는 것이다.**

  lastmod는 날짜만(YYYY-MM-DD) 쓴다. Date 객체를 넘기면 밀리초까지 붙은 ISO가
  나오는데 네이버 사이트맵 파서가 못 읽어 500 에러를 낸다. 기준은 KST(today()) —
  배포 서버는 UTC라 그냥 new Date()를 쓰면 하루가 어긋난다.

  그리고 lastmod는 "그 페이지가 실제로 바뀐 날"이어야 한다. 모든 URL이 같은
  날짜이고 그게 매일 바뀌면 구글은 값을 통째로 무시한다.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const now = today();

  /* 검색으로 사람을 데려올 수 있는 페이지들. */
  const staticPages: MetadataRoute.Sitemap = (
    [
      ["", "daily", 1, now],
      ["/check", "monthly", 0.9, SERVICES_UPDATED],
      ["/service", "daily", 0.9, SERVICES_UPDATED],
      ["/faq", "monthly", 0.8, SITE.policyEffectiveDate],
      ["/theme", "weekly", 0.8, SERVICES_UPDATED],
      ["/region", "weekly", 0.8, SERVICES_UPDATED],
      ["/target", "weekly", 0.8, SERVICES_UPDATED],
      ["/life", "weekly", 0.8, SERVICES_UPDATED],
      ["/about", "monthly", 0.5, SITE.policyEffectiveDate],
      ["/source", "monthly", 0.5, SERVICES_UPDATED],
    ] as const
  ).map(([path, changeFrequency, priority, lastModified]) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  /* 본문이 얇은 항목은 상세에서 noindex로 나가므로 사이트맵에서도 뺀다. */
  const servicePages: MetadataRoute.Sitemap = services
    .filter(isIndexable)
    .map((s) => ({
      url: `${SITE.url}/service/${s.id}`,
      lastModified: s.updatedAt ?? SERVICES_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  /* 허브는 항목이 MIN_SERVICES개 이상인 것만 올린다. 한두 줄짜리 목록
     페이지를 수백 개 찍어내면 저품질 페이지 양산이 된다(docs/02). */
  const hub = <T extends { slug: string }>(
    base: string,
    items: readonly T[],
    has: (t: T) => boolean,
  ): MetadataRoute.Sitemap =>
    items.filter(has).map((t) => ({
      url: `${SITE.url}${base}/${t.slug}`,
      lastModified: SERVICES_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const atLeast = (list: unknown[]) => list.length >= MIN_SERVICES;

  return [
    ...staticPages,
    ...servicePages,
    ...hub("/region", SIDO_LIST, (s) =>
      atLeast(services.filter((v) => v.sidoName === s.fullName)),
    ),
    ...hub("/theme", THEMES, (t) =>
      atLeast(services.filter((v) => v.themes.includes(t.value))),
    ),
    ...hub("/target", TARGETS, (t) =>
      atLeast(services.filter((v) => v.targets.includes(t.slug))),
    ),
    ...hub("/life", LIFE_STAGES, (t) =>
      atLeast(services.filter((v) => v.lifeStages.includes(t.slug))),
    ),
  ];
}
