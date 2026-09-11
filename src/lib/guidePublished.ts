/**
 * 안내 글이 처음 올라간 날 — Article JSON-LD의 datePublished (2026-09-11).
 *
 * git에서 그 글의 page.tsx가 처음 커밋된 날을 뽑아 적었다
 * (git log --diff-filter=A --follow --format=%ad --date=short -- <파일>).
 * 짐작한 날짜를 넣지 않는다 — 여기 없는 글은 datePublished를 아예 내보내지 않는다.
 * 새 글을 내면 한 줄을 더한다. 고친 날(dateModified)은 guides.ts의 updated다.
 */
export const GUIDE_PUBLISHED: Readonly<Record<string, string>> = {
  "apply": "2026-09-01",
  "baby-money": "2026-09-04",
  "calendar": "2026-09-06",
  "documents": "2026-09-01",
  "emergency": "2026-09-01",
  "income-line": "2026-09-01",
  "k-pass": "2026-09-08",
  "life-stage": "2026-09-02",
  "livelihood": "2026-09-04",
  "mistakes": "2026-09-01",
  "online": "2026-09-01",
  "pay-dates": "2026-09-06",
  "popular": "2026-09-02",
  "region": "2026-09-01",
  "tax-credit": "2026-09-06",
  "tax-credit-amount": "2026-09-08",
  "terms": "2026-09-01",
  "unemployment": "2026-09-07",
  "youth-savings": "2026-09-08",
};
