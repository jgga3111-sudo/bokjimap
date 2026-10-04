import { NO_PAGE } from "@/data/noPage";

/**
 * 사업으로 가는 링크 (2026-10-02).
 *
 * 상세 페이지는 색인 대상인 사업에만 둔다(`lib/indexable.ts`). 나머지는 목록·검색에
 * 카드로 남고, 누르면 **복지로 원문**으로 간다 — 원문을 옮긴 것 말고 우리가 더한 것이
 * 없는 페이지를 수백 쪽 두지 않기 위해서다(`scripts/build-no-page.mjs` 머리말).
 *
 * 브라우저에서도 쓰므로 `@/data/services`(2.9MB)를 물지 않는다. 작은 표만 본다.
 */
export function hasPage(id: string): boolean {
  return !Object.hasOwn(NO_PAGE, id);
}

/** 복지로 원문 주소. `services.ts`의 officialUrl과 같은 형태다(생성 스크립트가 대조한다). */
function officialUrl(id: string): string {
  return `https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=${id}&wlfareInfoReldBztpCd=0${NO_PAGE[id]}`;
}

export function serviceHref(id: string): string {
  return hasPage(id) ? `/service/${id}` : officialUrl(id);
}

/** `<Link {...serviceLink(id)}>`로 편다. 바깥으로 나가는 것은 새 창으로 연다. */
export function serviceLink(id: string) {
  return hasPage(id)
    ? { href: `/service/${id}` }
    : { href: officialUrl(id), target: "_blank", rel: "noopener noreferrer" };
}
