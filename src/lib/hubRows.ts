import type { WelfareService, Provider } from "@/types/welfare";
import type { CardService } from "@/components/ServiceCard";
import { TARGETS, LIFE_STAGES, THEMES } from "@/lib/axes";
import { BENEFITS, hasBenefit } from "@/lib/benefits";
import { SIDO_LIST } from "@/lib/regions";

/**
 * 허브 목록을 브라우저로 넘기기 위한 준비.
 *
 * ── 왜 필요한가 ────────────────────────────────────────────────
 * 축이 여섯인데 **서로 교차가 안 됐다.** `/target/low-income`은 262건인데
 * 거기서 "우리 지역만" "현금만"으로 좁힐 길이 없었다. 축마다 독립된 페이지라
 * 조합하려면 URL을 새로 파야 하고, 그러면 얇은 페이지를 수백 개 찍게 된다
 * (CLAUDE.md 4절에서 하지 말라고 못 박아 둔 것).
 *
 * 그래서 교차는 **브라우저에서** 한다. 항목을 압축해 내려보내고 거기서 고른다.
 *
 * ── 왜 배열(튜플)로 보내나 ──────────────────────────────────────
 * 객체로 보내면 `"summary":` 같은 열쇠 글자가 481번 반복된다. 한 건에
 * 120바이트씩, 목록 하나에 57KB가 열쇠 이름으로만 나간다. 튜플은 그게 없다.
 *
 * ── 무게 ────────────────────────────────────────────────────────
 * 재 보고 정한 것이다(2026-09-04). `/life/youth`는 305장을 서버에서 다 그려
 * **HTML이 828KB**였고, `/benefit/cash`는 481장이라 전부 그리면 1.3MB가 됐다
 * (그래서 예전엔 60건에서 잘랐고, 나머지 421건은 갈 길이 없었다).
 * 압축 행으로 내려보내면 한 건이 260바이트 안팎이라 481건이 125KB다.
 * ────────────────────────────────────────────────────────────────
 */

/** 카드 요약문을 자르는 길이. 카드는 두 줄까지만 보여주므로 그 이상은 버린다. */
const SUMMARY_MAX = 140;

/**
 * 압축 행. 순서가 곧 규약이다 — `toCard`와 짝을 이룬다.
 *
 * [0] id · [1] 이름 · [2] 요약 · [3] 담당부처 · [4] provider
 * [5] 시도 · [6] 시군구 · [7] 주기 · [8] 지급형태 · [9] 온라인신청
 * [10] 조회수 · [11] 대상 · [12] 생애주기 · [13] 필터값
 */
export type HubRow = [
  string, // id
  string, // name
  string, // summary
  string, // department
  Provider, // provider
  string, // sidoName
  string, // sigunguName
  string, // cycle
  string, // payTypes, 쉼표로 이음
  0 | 1, // onlineApply
  number, // views
  string, // targets, 쉼표로 이음
  string, // lifeStages, 쉼표로 이음
  string, // 필터값 — "group:value" 를 쉼표로 이음
];

const cut = (t: string | null) =>
  !t ? "" : t.length > SUMMARY_MAX ? t.slice(0, SUMMARY_MAX) + "…" : t;

const SIDO_SLUG = new Map(SIDO_LIST.map((s) => [s.fullName, s.slug]));
const THEME_SLUG = new Map(THEMES.map((t) => [t.value, t.slug]));

/** 한 서비스가 걸리는 모든 필터값. `"region:seoul"` 꼴이다. */
function facetsOf(s: WelfareService): string[] {
  const out: string[] = [];
  out.push(
    s.provider === "central"
      ? "region:nationwide"
      : `region:${SIDO_SLUG.get(s.sidoName ?? "") ?? "etc"}`,
  );
  for (const t of s.targets) out.push(`target:${t}`);
  for (const l of s.lifeStages) out.push(`life:${l}`);
  for (const t of s.themes) {
    const slug = THEME_SLUG.get(t);
    if (slug) out.push(`theme:${slug}`);
  }
  for (const b of BENEFITS) if (hasBenefit(s, b)) out.push(`benefit:${b.slug}`);
  return out;
}

export const toRow = (s: WelfareService): HubRow => [
  s.id,
  s.name,
  cut(s.summary),
  s.department ?? "",
  s.provider,
  s.sidoName ?? "",
  s.sigunguName ?? "",
  s.cycle ?? "",
  s.payTypes.join(","),
  s.onlineApply ? 1 : 0,
  s.views,
  s.targets.join(","),
  s.lifeStages.join(","),
  facetsOf(s).join(","),
];

/** 압축 행을 카드가 읽는 형태로 되돌린다. 브라우저에서 부른다. */
export const toCard = (r: HubRow): CardService => ({
  id: r[0],
  name: r[1],
  summary: r[2] || null,
  department: r[3] || null,
  provider: r[4],
  sidoName: r[5] || null,
  sigunguName: r[6] || null,
  cycle: r[7] || null,
  payTypes: r[8] ? r[8].split(",") : [],
  onlineApply: r[9] === 1,
  views: r[10],
  targets: r[11] ? r[11].split(",") : [],
  lifeStages: r[12] ? r[12].split(",") : [],
});

export type FacetOption = { value: string; label: string; count: number };
export type FacetGroup = { key: string; label: string; options: FacetOption[] };

/** 필터로 쓸 수 있는 축들. 라벨은 화면에 그대로 나간다. */
const GROUPS = {
  region: {
    label: "지역",
    items: [
      { value: "nationwide", label: "전국" },
      ...SIDO_LIST.map((s) => ({ value: s.slug, label: s.name })),
    ],
  },
  benefit: {
    label: "혜택",
    items: BENEFITS.map((b) => ({ value: b.slug, label: b.label })),
  },
  target: {
    label: "대상",
    items: TARGETS.map((t) => ({ value: t.slug, label: t.label })),
  },
  life: {
    label: "생애주기",
    items: LIFE_STAGES.map((t) => ({ value: t.slug, label: t.label })),
  },
  theme: {
    label: "주제",
    items: THEMES.map((t) => ({ value: t.slug, label: t.label })),
  },
} as const;

export type GroupKey = keyof typeof GROUPS;

/**
 * 이 목록에서 실제로 쓸 수 있는 필터만 추린다.
 *
 * 규칙 둘. **0건짜리 칸은 만들지 않는다** — 눌러도 빈 화면이 나오는 단추다.
 * 그리고 **고를 게 하나뿐인 축은 통째로 뺀다** — `/region/seoul`에서 지역
 * 필터를 다시 보여줄 이유가 없고, 그런 줄은 화면만 차지한다.
 */
export function facetsFor(rows: readonly HubRow[], keys: readonly GroupKey[]) {
  const seen = new Map<string, number>();
  for (const r of rows) {
    for (const f of r[13].split(",")) seen.set(f, (seen.get(f) ?? 0) + 1);
  }
  const groups: FacetGroup[] = [];
  for (const key of keys) {
    const options = GROUPS[key].items
      .map((i) => ({
        value: i.value,
        label: i.label,
        count: seen.get(`${key}:${i.value}`) ?? 0,
      }))
      .filter((o) => o.count > 0);
    if (options.length > 1) {
      groups.push({ key, label: GROUPS[key].label, options });
    }
  }
  return groups;
}
