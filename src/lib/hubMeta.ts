import type { WelfareService } from "@/types/welfare";
import { LIFE_STAGES, THEMES } from "@/lib/axes";
import { BENEFITS, hasBenefit } from "@/lib/benefits";

/**
 * 허브 페이지 `<title>`·description에 넣을 **데이터에서 뽑은** 곁말.
 *
 * ── 왜 ─────────────────────────────────────────────────────────
 * 허브 제목이 「청년 시기 복지·지원금」처럼 12~19자였다(09-11 실측). 검색
 * 결과 한 줄은 30~45자쯤 보여주는데 그 자리를 반이나 비워 두고 있었고,
 * description도 45자 안팎이라 두 줄 중 한 줄만 썼다. 건수와 "무엇이 많은가"를
 * 덧붙이면 제목만 보고도 이 페이지가 무엇을 주는지 안다.
 *
 * ── 곁말은 지어 쓰지 않는다 ────────────────────────────────────
 * "월세·자산형성·일자리"처럼 **그럴듯한 낱말을 손으로 적지 않는다.** 수록이
 * 바뀌면 조용히 틀려지고, 데이터랑 안 맞는 제목은 3절(정확성)에 걸린다.
 * 여기서 주는 것은 전부 그 허브에 실제로 든 사업을 세어 상위 몇 개를 고른
 * 것이다 — 혜택(지급형태)·주제·생애주기. 0건인 항목은 절대 안 나온다.
 *
 * 혜택을 첫손에 꼽는 이유: 대상·생애주기·지역·주제 어느 허브에나 지급형태는
 * 다 있다(중앙 330건 전부, 지자체도 대부분). 주제는 중앙부처에만 붙어
 * (`axes.ts`) 지자체 허브에서는 0건이라 쓸 수 없다 — 5절 「중앙과 지자체는
 * 주는 필드가 다르다」.
 */

export type Ranked = { label: string; count: number };

function rank<T>(
  list: readonly WelfareService[],
  items: readonly T[],
  has: (s: WelfareService, item: T) => boolean,
  label: (item: T) => string,
  n: number,
): Ranked[] {
  return items
    .map((item) => ({
      label: label(item),
      count: list.filter((s) => has(s, item)).length,
    }))
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

/** 이 목록에서 많은 혜택 종류 순. `BENEFITS`의 묶음 기준을 그대로 쓴다. */
export const topBenefits = (list: readonly WelfareService[], n = 3) =>
  rank(list, BENEFITS, hasBenefit, (b) => b.label, n);

/** 많은 관심주제 순. 중앙부처 사업에만 값이 있어 지자체 허브에선 빈다. */
export const topThemes = (list: readonly WelfareService[], n = 3) =>
  rank(list, THEMES, (s, t) => s.themes.includes(t.value), (t) => t.label, n);

/** 많은 생애주기 순. */
export const topLifeStages = (list: readonly WelfareService[], n = 3) =>
  rank(
    list,
    LIFE_STAGES,
    (s, l) => s.lifeStages.includes(l.slug),
    (l) => l.label,
    n,
  );

/**
 * 「현금, 바우처, 요금감면」 — 제목용. 비면 빈 문자열.
 *
 * 가운뎃점(·)이 아니라 쉼표로 잇는다(2026-09-11). 혜택 이름에 「서비스·돌봄」처럼
 * 가운뎃점이 든 것이 있어서, 가운뎃점으로 이으면 「현금·바우처·서비스·돌봄」이
 * 네 가지로 읽혔다(빌드 HTML로 확인).
 */
export const joinLabels = (r: readonly Ranked[]) =>
  r.map((x) => x.label).join(", ");

/** 「현금 74건, 바우처 31건, 요금감면 12건」 — description용. 비면 빈 문자열. */
export const joinCounts = (r: readonly Ranked[]) =>
  r.map((x) => `${x.label} ${x.count}건`).join(", ");

/**
 * 제목 뒤에 " — 현금, 바우처, 요금감면"을 붙인다. 뽑힌 게 없으면 아무것도
 * 안 붙인다 — "— " 뒤가 빈 제목을 내보내지 않으려는 것이다.
 */
export const withTail = (title: string, r: readonly Ranked[]) =>
  r.length > 0 ? `${title} — ${joinLabels(r)}` : title;
