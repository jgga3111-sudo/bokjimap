import { services } from "@/data/services";
import type { WelfareService } from "@/types/welfare";
import { LIFE_STAGES, TARGETS, THEMES } from "@/lib/axes";
import { INCOME_BANDS } from "@/lib/income";
import { BENEFITS, hasBenefit } from "@/lib/benefits";
import { SIDO_LIST } from "@/lib/regions";

/**
 * 「우리 수록에서 어디쯤인가」 — 상세에 붙이는 **집계 줄** (2026-09-16).
 *
 * ── 왜 ─────────────────────────────────────────────────────────
 * 09-13 실측에서 상세 본문의 46~76%가 복지로 원문과 같은 글이었다(애드센스
 * 「가치가 별로 없는 콘텐츠」의 근거). 09-16 경쟁 조사에서 해피나눔이 상세마다
 * "같은 대상 수록 1,740건 / 같은 소관기관 69건"처럼 **자기 데이터를 센 줄**을
 * 붙여 두는 것을 봤다. 값이 페이지마다 다르므로 틀 문구가 아니고, 원문을
 * 한 글자도 베끼지 않으면서 본문에서 원문이 차지하는 비중을 낮춘다.
 *
 * ── 규칙 ───────────────────────────────────────────────────────
 * · 여기서 세는 것은 **우리 수록분**뿐이다. "전국에 N건이 있다"가 아니라
 *   "우리가 실은 910건 중 N건"이라고 화면에 적는다(CLAUDE.md 3절 — 세는
 *   범위를 문장에 그대로 적는다. `/ask`의 「어디에도 없다」 사고와 같은 자리).
 * · 자격·우열을 말하지 않는다. "가장 많이 찾는다" 같은 판정도 하지 않는다.
 *   조회수는 복지로가 매긴 값이고 우리는 **순위만** 옮긴다.
 * · 링크는 이미 색인되는 축 페이지로만 건다(새 URL을 만들지 않는다).
 */

export type AmongRow = {
  label: string;
  /** 화면에 쓸 문장 조각 — 「310건」 */
  count: number;
  /** 있으면 그 축 허브로 링크 */
  href?: string;
};

const SIDO_SLUG = new Map(SIDO_LIST.map((x) => [x.fullName, x.slug]));

/** 조회수 순위. 수록 목록은 조회수 내림차순이므로 자리 = 순위다. */
export function rankOf(s: WelfareService): number {
  return services.findIndex((x) => x.id === s.id) + 1;
}

export function amongListed(s: WelfareService): AmongRow[] {
  const rows: AmongRow[] = [];

  /* 지역 — 전국 공통(중앙부처)인지, 그 시·도 사업인지. */
  if (s.provider === "central") {
    rows.push({
      label: "전국 어디서나 신청하는 사업",
      count: services.filter((x) => x.provider === "central").length,
    });
  } else if (s.sidoName) {
    const slug = SIDO_SLUG.get(s.sidoName);
    rows.push({
      label: `${s.sidoName} 사업`,
      count: services.filter((x) => x.sidoName === s.sidoName).length,
      href: slug ? `/region/${slug}` : undefined,
    });
  }

  /* 생애주기·대상은 값이 여럿일 수 있다. 가장 좁은(건수가 적은) 하나만 쓴다 —
     세 줄을 다 쓰면 이 상자가 목록처럼 길어진다. */
  const life: AmongRow[] = [];
  for (const slug of s.lifeStages) {
    const axis = LIFE_STAGES.find((l) => l.slug === slug);
    if (!axis) continue;
    life.push({
      label: `${axis.label} 시기로 분류된 사업`,
      count: services.filter((x) => x.lifeStages.includes(slug)).length,
      href: `/life/${slug}`,
    });
  }
  life.sort((a, b) => a.count - b.count);
  if (life[0]) rows.push(life[0]);

  const target: AmongRow[] = [];
  for (const slug of s.targets) {
    const axis = TARGETS.find((t) => t.slug === slug);
    if (!axis) continue;
    target.push({
      label: `${axis.label} 대상으로 적힌 사업`,
      count: services.filter((x) => x.targets.includes(slug)).length,
      href: `/target/${slug}`,
    });
  }
  target.sort((a, b) => a.count - b.count);
  if (target[0]) rows.push(target[0]);

  /* 지급 형태 — 원본이 매긴 값이라 거르는 데는 안 쓰지만(09-09 /ask 기록),
     세는 데는 쓴다. 세는 것은 "원본이 이렇게 분류했다"는 사실뿐이다. */
  /* 조사(으로/로)를 붙이면 「바우처으로」가 나온다. 이름을 따옴표로 감싸
     조사를 아예 안 쓰는 쪽이 안전하다. */
  const benefit: AmongRow[] = BENEFITS.filter((b) => hasBenefit(s, b)).map((b) => ({
    label: `지급 형태가 「${b.label}」인 사업`,
    count: services.filter((x) => hasBenefit(x, b)).length,
    href: `/benefit/${b.slug}`,
  }));
  benefit.sort((a, b) => a.count - b.count);
  if (benefit[0]) rows.push(benefit[0]);

  /* 09-24 주제·소득 기준선 줄. 두 허브(/theme/*·/income/*)는 들어오는 링크가
     목록 쪽 하나뿐이었다. 주제는 중앙부처에만 붙는다(5절). 소득은 기준선이
     하나로 적힌 사업만, 그 기준선 페이지가 있을 때만 잇는다. */
  const theme: AmongRow[] = [];
  for (const slug of s.themes) {
    const axis = THEMES.find((t) => t.slug === slug);
    if (!axis) continue;
    theme.push({
      label: `「${axis.label}」 주제로 분류된 사업`,
      count: services.filter((x) => x.themes.includes(slug)).length,
      href: `/theme/${slug}`,
    });
  }
  theme.sort((a, b) => a.count - b.count);
  if (theme[0]) rows.push(theme[0]);

  const band = INCOME_BANDS.find((b) => b.percent === s.medianPercent);
  if (band) {
    rows.push({
      label: `선정기준에 「기준 중위소득 ${band.percent}%」가 적힌 사업`,
      count: band.count,
      href: `/income/${band.percent}`,
    });
  }

  return rows.slice(0, 6);
}
