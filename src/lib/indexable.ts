import { services } from "@/data/services";
import { bodyText, hasEnoughBody, type WelfareService } from "@/types/welfare";
import { hasExtras } from "@/lib/serviceExtras";

/**
 * 상세 페이지를 색인·사이트맵·광고에 내보낼 것인가 (2026-09-13 좁힘).
 *
 * ── 전: 본문 300자 이상이면 전부 (715건) ─────────────────────────
 * 애드센스가 「가치가 별로 없는 콘텐츠」로 거절했다. 사이트맵 817개 중 715개가
 * 상세였고, 그 본문 절반 이상이 복지로 원문 그대로다. 서치콘솔에서도 상세만
 * 절반가량이 「발견됨 – 색인 안 됨」이었다 — 조회수 7·8·10위를 두 번 요청해도
 * 안 붙었다. 안내 글·허브·소개 페이지는 요청 없이도 전부 색인돼 있었다.
 * 구글도 애드센스도 **원문을 옮긴 페이지가 사이트의 대부분**인 것을 본 것이다.
 *
 * ── 후: 본문 300자 이상 **이고** 둘 중 하나 ──────────────────────
 * ① 복지로 조회수 **상위 300위** 안 — 사람들이 실제로 찾는 사업이다.
 *    300위가 전체 조회수의 약 92%를 가져간다(09-13 실측, 300위 18,540회).
 * ② 우리가 **따로 확인한 것**이 붙는 사업 — 지급일 조문·신청 일정·그 사업을
 *    다룬 안내 글(`lib/serviceExtras.ts`). 순위와 무관하게 원문에 없는 값이 있다.
 *
 * 결과 상세 272건(09-13). 사이트맵 817 → 약 374. 사용자 결정(2026-09-13,
 * 「보강 + 하위 noindex」).
 *
 * **빠진 페이지도 사이트에서는 그대로 열린다.** 목록·검색에서 링크도 그대로다.
 * 색인·사이트맵·광고 코드에서만 빠진다(3절 — 숨기지 않는다).
 *
 * ⚠ `scripts/audit-sitemap.mjs`가 같은 규칙을 데이터로 다시 계산한다.
 *   `INDEX_TOP_N`을 바꾸면 그쪽은 이 파일에서 숫자를 읽어 간다.
 */
export const INDEX_TOP_N = 300;

/** 조회수 순위(1부터). 같은 조회수는 수록 순서를 따른다. */
const RANK = new Map(
  [...services]
    .map((s, i) => ({ s, i }))
    .sort((a, b) => b.s.views - a.s.views || a.i - b.i)
    .map(({ s }, i) => [s.id, i + 1] as const),
);

export function viewRank(s: WelfareService): number {
  return RANK.get(s.id) ?? Number.POSITIVE_INFINITY;
}

export function isIndexable(s: WelfareService): boolean {
  if (!hasEnoughBody(s)) return false;
  return viewRank(s) <= INDEX_TOP_N || hasExtras(s);
}

/**
 * 광고 코드를 실을 상세인가 (2026-09-13 재점검).
 *
 * 색인 대상 272쪽을 다시 재 보니 **본문 874~996자짜리 상세에도 광고 코드가 붙어** 있었다 —
 * 소개 페이지보다 짧다. 검색에는 내보내되(조회수 상위라 찾는 사람이 있다) 광고는
 * 원문 본문이 `AD_MIN_BODY`자 이상이거나 우리가 따로 확인한 정보가 붙은 사업에만 싣는다.
 * 09-13 기준 272쪽 중 67쪽이 빠진다(광고 코드가 붙는 상세 205쪽).
 */
export const AD_MIN_BODY = 500;

export function showAds(s: WelfareService): boolean {
  if (!isIndexable(s)) return false;
  return bodyText(s).length >= AD_MIN_BODY || hasExtras(s);
}
