import type { MetadataRoute } from "next";
import { SITE, today } from "@/lib/site";
import { SIDO_LIST } from "@/lib/regions";
import { TARGETS } from "@/lib/targets";
import { services, SERVICES_UPDATED } from "@/data/services";
import { isIndexable } from "@/types/welfare";

/*
  lastmod는 날짜만(YYYY-MM-DD) 쓴다. Date 객체를 넘기면 밀리초까지 붙은
  ISO(2026-08-31T04:07:48.361Z)가 나오는데, 네이버 사이트맵 파서가 이걸 못 읽어
  500 에러를 낸다. 날짜만 주면 구글·네이버 둘 다 정상 처리한다.
  기준은 KST(today()) — 배포 서버는 UTC라 그냥 new Date()를 쓰면 하루가 어긋난다.

  그리고 lastmod는 "그 페이지가 실제로 바뀐 날"이어야 한다. 모든 URL의 lastmod가
  똑같고 그게 매일 바뀌면 구글은 값을 신뢰할 수 없다고 보고 **통째로 무시한다.**
  그러면 자주 바뀌는 페이지를 먼저 크롤링하게 만들 수단이 사라진다. 그래서
    - 서비스 상세: 항목의 verifiedAt(실제 확인일)
    - 지역·대상 허브: 데이터 파일을 고친 날
    - 매일 실제로 내용이 바뀌는 화면(홈·마감임박)만 오늘 날짜
  로 나눠 쓴다.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const now = today();

  const staticPages: MetadataRoute.Sitemap = (
    [
      ["", "daily", 1, now],
      ["/service", "daily", 0.9, SERVICES_UPDATED],
      ["/region", "weekly", 0.8, SERVICES_UPDATED],
      ["/target", "weekly", 0.8, SERVICES_UPDATED],
      /*
        /about · /privacy · /terms · /contact는 아직 페이지가 없다.
        사이트맵에 404를 올리면 크롤러 신뢰를 잃는다. 페이지를 쓴 뒤 추가한다.
      */
    ] as const
  ).map(([path, changeFrequency, priority, lastModified]) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  /*
    본문이 얇은 항목은 상세 페이지에서 noindex로 나가므로 사이트맵에서도 뺀다.
    (러닝온 교훈 — 얇은 페이지를 수백 개 올리면 애드센스 심사에 그대로 걸린다.)
  */
  const servicePages: MetadataRoute.Sitemap = services
    .filter(isIndexable)
    .map((s) => ({
      url: `${SITE.url}/service/${s.id}`,
      lastModified: s.verifiedAt ?? SERVICES_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  /* 시·도 허브. 서비스가 하나도 없는 시·도는 빈 페이지가 되므로 뺀다. */
  const sidoPages: MetadataRoute.Sitemap = SIDO_LIST.filter((s) =>
    services.some((v) => v.sidoName === s.name),
  ).map((s) => ({
    url: `${SITE.url}/region/${s.slug}`,
    lastModified: SERVICES_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  /* 대상별 허브. 마찬가지로 비어 있으면 뺀다. */
  const targetPages: MetadataRoute.Sitemap = TARGETS.filter((t) =>
    services.some((v) => v.targets.includes(t.slug)),
  ).map((t) => ({
    url: `${SITE.url}/target/${t.slug}`,
    lastModified: SERVICES_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  /*
    시·군·구 허브와 "지역 × 대상" 조합 랜딩은 여기서 만들지 않는다.
    둘 다 실제 데이터가 있어야 목록을 뽑을 수 있고(시군구는 응답값에서 만들어
    낸다 — regions.ts 주석 참조), MIN_SERVICES 하한도 데이터가 있어야 걸린다.
    데이터가 들어온 뒤 이 자리에 추가한다.
  */

  return [...staticPages, ...servicePages, ...sidoPages, ...targetPages];
}
