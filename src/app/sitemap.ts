import type { MetadataRoute } from "next";
import { SITE, today } from "@/lib/site";
import { SIDO_LIST } from "@/lib/regions";
import { TARGETS, LIFE_STAGES } from "@/lib/axes";
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
      ["/service", "daily", 0.9, SERVICES_UPDATED],
      ["/region", "weekly", 0.8, SERVICES_UPDATED],
      ["/target", "weekly", 0.8, SERVICES_UPDATED],
      ["/life", "weekly", 0.8, SERVICES_UPDATED],
      /* /about·/privacy·/terms·/faq 등은 아직 페이지가 없다. 사이트맵에 404를
         올리면 크롤러 신뢰를 잃는다. 만든 뒤 추가한다(푸터도 같은 기준). */
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
      lastModified: s.verifiedAt ?? SERVICES_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  /* 허브는 실제로 항목이 있는 것만 올린다. 빈 페이지는 저품질 신호다. */
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

  return [
    ...staticPages,
    ...servicePages,
    ...hub("/region", SIDO_LIST, (s) =>
      services.some((v) => v.sidoName === s.fullName),
    ),
    ...hub("/target", TARGETS, (t) =>
      services.some((v) => v.targets.includes(t.slug)),
    ),
    ...hub("/life", LIFE_STAGES, (t) =>
      services.some((v) => v.lifeStages.includes(t.slug)),
    ),
  ];
}
