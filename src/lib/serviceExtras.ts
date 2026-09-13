import type { WelfareService } from "@/types/welfare";
import { PAY_DATES, type PayDate } from "@/lib/payDates";
import { CALENDAR, type CalendarEntry } from "@/lib/calendar";
import { guideBySlug, type Guide } from "@/lib/guides";

/**
 * 상세 페이지에 붙는 **우리가 따로 확인한 것** (2026-09-13).
 *
 * ── 왜 만들었나 ────────────────────────────────────────────────
 * 애드센스가 「가치가 별로 없는 콘텐츠」로 거절했다. 상세 페이지를 재 보니
 * 본문의 절반 이상이 복지로에도 똑같이 있는 원문이고, 우리가 붙인 글은
 * 전 페이지에 같은 틀 문구뿐이었다 — 표본 11쪽 중 **그 사업만을 위해 쓴
 * 문장이 0개**였다.
 *
 * 그런데 우리는 원문에 없는 것을 이미 확인해 두고 있었다. 법령 조문에서 찾은
 * 지급일(`payDates.ts`), 공식 공고로 확인한 신청 일정(`calendar.ts`), 수록
 * 원문과 보도자료로 쓴 안내 글·계산기. **전부 `/guide`에만 있고 정작 그 사업의
 * 상세에서는 한 줄도 안 이어져 있었다.** 이 파일은 그걸 사업별로 모은다.
 *
 * ── 규칙 ────────────────────────────────────────────────────────
 * · 새 값을 만들지 않는다. 이미 확인해 출처가 달린 것만 사업에 잇는다.
 * · 안내 글은 **그 사업을 실제로 다루는 글**만 적는다. "관련 있어 보이는"
 *   글을 늘어놓으면 그게 곧 틀 문구가 된다.
 * · 이 사업 목록은 색인 기준(`lib/indexable.ts`)에도 쓰인다 — 여기 걸리면
 *   조회수 순위와 무관하게 색인 대상이다. `scripts/audit-sitemap.mjs`가 이
 *   파일의 `WLF` 번호를 글자로 읽어 같은 계산을 하므로, **번호는 문자열
 *   그대로 적는다**(상수를 import해 쓰면 그 스크립트가 못 읽는다).
 */

/** 안내 글 → 그 글이 본문에서 직접 다루는 사업. */
const GUIDE_SERVICES: Record<string, readonly string[]> = {
  /* taxCredit.ts의 TC_SOURCE_ID와 같은 값이다. */
  "tax-credit": ["WLF00001148"],
  "tax-credit-amount": ["WLF00001148"],
  /* youthSavings.ts의 YS_SOURCE_ID와 같은 값이다. */
  "youth-savings": ["WLF00006266"],
  "k-pass": ["WLF00005440"],
  "baby-money": ["WLF00001171", "WLF00004415", "WLF00004656", "WLF00004657"],
  livelihood: ["WLF00001132", "WLF00003180"],
  emergency: ["WLF00003180"],
  /* 2026-09-13 애드센스 거절 뒤 새로 쓴 사업별 글. */
  "youth-tomorrow-savings": ["WLF00000060"],
  "phone-bill-discount": ["WLF00003257"],
  "childcare-choice": ["WLF00003250", "WLF00000969", "WLF00003253", "WLF00004657"],
};

/** 긴급복지 여덟 갈래는 글이 이름으로 모은다(`guide/emergency` 머리말). */
const isEmergency = (s: WelfareService) => !!s.name?.startsWith("긴급복지");

export type ServiceExtras = {
  payDate: PayDate | null;
  calendar: readonly CalendarEntry[];
  guides: readonly Guide[];
};

export function extrasOf(s: WelfareService): ServiceExtras {
  const slugs = new Set<string>();
  for (const [slug, ids] of Object.entries(GUIDE_SERVICES)) {
    if (ids.includes(s.id)) slugs.add(slug);
  }
  if (isEmergency(s)) slugs.add("emergency");

  const payDate = PAY_DATES.find((p) => p.id === s.id) ?? null;
  const calendar = CALENDAR.filter((e) => e.id === s.id);
  if (payDate) slugs.add("pay-dates");
  if (calendar.length > 0) slugs.add("calendar");

  const guides = [...slugs]
    .map((slug) => guideBySlug(slug))
    .filter((g): g is Guide => !!g);

  return { payDate, calendar, guides };
}

export function hasExtras(s: WelfareService): boolean {
  const x = extrasOf(s);
  return !!x.payDate || x.calendar.length > 0 || x.guides.length > 0;
}
