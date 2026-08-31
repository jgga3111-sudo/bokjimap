import type { MetadataRoute } from "next";
import { SITE, today } from "@/lib/site";
import { SIDO_LIST } from "@/lib/regions";
import { TARGETS, LIFE_STAGES, MIN_SERVICES } from "@/lib/axes";
import { services, SERVICES_UPDATED } from "@/data/services";
import { isIndexable } from "@/types/welfare";

/*
  lastmod는 날짜만(YYYY-MM-DD) 쓴다. Date 객체를 넘기면 밀리초까지 붙은 ISO가
  나오는데 네이버 사이트맵 파서가 못 읽어 500 에러를 낸다. 기준은 KST(today()) —
  배포 서버는 UTC라 그냥 new Date()를 쓰면 하루가 어긋난다.

  그리고 lastmod는 "그 페이지가 실제로 바뀐 날"이어야 한다. 모든 URL이 같은
  날짜이고 그게 매일 바뀌면 구글은 값을 통째로 무시한다.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const now = today();

  const staticPages: MetadataRoute.Sitemap = (
    [
      ["", "daily", 1, now],
      ["/check", "monthly", 0.9, SERVICES_UPDATED],
      ["/service", "daily", 0.9, SERVICES_UPDATED],
      ["/region", "weekly", 0.8, SERVICES_UPDATED],
      ["/target", "weekly", 0.8, SERVICES_UPDATED],
      ["/life", "weekly", 0.8, SERVICES_UPDATED],
      ["/faq", "monthly", 0.7, SITE.policyEffectiveDate],
      ["/about", "monthly", 0.6, SITE.policyEffectiveDate],
      ["/source", "monthly", 0.6, SERVICES_UPDATED],
      ["/contact", "yearly", 0.4, SITE.policyEffectiveDate],
      ["/terms", "yearly", 0.3, SITE.policyEffectiveDate],
      ["/privacy", "yearly", 0.3, SITE.policyEffectiveDate],
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
    ...hub("/target", TARGETS, (t) =>
      atLeast(services.filter((v) => v.targets.includes(t.slug))),
    ),
    ...hub("/life", LIFE_STAGES, (t) =>
      atLeast(services.filter((v) => v.lifeStages.includes(t.slug))),
    ),
  ];
}
