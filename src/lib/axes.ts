/**
 * 분류 축 — 지역과 함께 조합 랜딩페이지를 만드는 축들.
 *
 * ⚠ 처음엔 "청년·노인·소상공인·농어민…" 10종을 제가 지어서 넣었다가 버렸다.
 * 실제 API는 두 개의 축을 코드로 주고 있었고, 제가 만든 분류와 맞지 않았다.
 * **여기 있는 값은 전부 5,219건 응답에서 실제로 집계된 것이다**(2026-08-31).
 * 임의로 항목을 더하거나 이름을 바꾸지 않는다 — 데이터와 어긋나면 그 페이지는
 * 영원히 0건이 된다.
 *
 *  · 대상(trgterIndvdlNmArray) 6종 — 지자체 사업에만 붙는다
 *  · 생애주기(lifeNmArray) 7종 — 지자체 사업에만 붙는다
 *  · 관심주제(intrsThemaArray) 15종 — 중앙부처 사업에 붙는다
 */

export type Axis = {
  slug: string;
  /** API가 주는 원문 값. 매칭의 기준이다. */
  value: string;
  /** 화면 표기 */
  label: string;
  blurb: string;
};

/** 대상 — 지자체 사업 4,758건 중 2,019건에 값이 있다(2,739건은 값 없음). */
export const TARGETS: readonly Axis[] = [
  {
    slug: "low-income",
    value: "저소득",
    label: "저소득",
    blurb: "기초생활수급자·차상위계층 등 저소득 가구를 위한 지원 사업입니다.",
  },
  {
    slug: "disability",
    value: "장애인",
    label: "장애인",
    blurb: "장애인과 그 가족을 위한 지원 사업입니다.",
  },
  {
    slug: "veteran",
    value: "보훈대상자",
    label: "보훈대상자",
    blurb: "국가유공자 등 보훈대상자를 위한 예우·지원 사업입니다.",
  },
  {
    slug: "single-parent",
    value: "한부모·조손",
    label: "한부모·조손",
    blurb: "한부모 가정과 조손 가정을 위한 양육·생활 지원 사업입니다.",
  },
  {
    slug: "multi-child",
    value: "다자녀",
    label: "다자녀",
    blurb: "다자녀 가구를 위한 양육·요금 감면 등 지원 사업입니다.",
  },
  {
    slug: "multicultural",
    value: "다문화·탈북민",
    label: "다문화·탈북민",
    blurb: "다문화 가정과 북한이탈주민을 위한 정착·생활 지원 사업입니다.",
  },
] as const;

/** 생애주기 — 지자체 사업 4,758건 중 3,312건에 값이 있다. */
export const LIFE_STAGES: readonly Axis[] = [
  {
    slug: "pregnancy",
    value: "임신 · 출산",
    label: "임신·출산",
    blurb: "임신부터 출산까지의 검진·의료비·산후조리 지원입니다.",
  },
  {
    slug: "infant",
    value: "영유아",
    label: "영유아",
    blurb: "영유아 보육과 양육 가정을 위한 지원입니다.",
  },
  {
    slug: "child",
    value: "아동",
    label: "아동",
    blurb: "아동의 돌봄·교육·건강을 위한 지원입니다.",
  },
  {
    slug: "teen",
    value: "청소년",
    label: "청소년",
    blurb: "청소년의 학업·활동·보호를 위한 지원입니다.",
  },
  {
    slug: "youth",
    value: "청년",
    label: "청년",
    blurb: "청년의 주거·취업·자립을 위한 지원입니다.",
  },
  {
    slug: "middle-age",
    value: "중장년",
    label: "중장년",
    blurb: "중장년층의 재취업·건강·노후 준비를 위한 지원입니다.",
  },
  {
    slug: "senior",
    value: "노년",
    label: "노년",
    blurb: "어르신의 연금·돌봄·의료를 위한 지원입니다.",
  },
] as const;

const TARGET_BY_SLUG = new Map(TARGETS.map((t) => [t.slug, t]));
const TARGET_BY_VALUE = new Map(TARGETS.map((t) => [t.value, t]));
const LIFE_BY_SLUG = new Map(LIFE_STAGES.map((t) => [t.slug, t]));
const LIFE_BY_VALUE = new Map(LIFE_STAGES.map((t) => [t.value, t]));

export const targetBySlug = (s: string) => TARGET_BY_SLUG.get(s);
export const lifeStageBySlug = (s: string) => LIFE_BY_SLUG.get(s);

/**
 * `"청년, 중장년"` 같은 쉼표 목록을 슬러그 배열로 바꾼다.
 * 목록에 없는 값은 **버린다.** "기타"로 몰아넣으면 그 페이지가 잡동사니가 된다.
 */
function toSlugs(raw: string | null | undefined, map: Map<string, Axis>) {
  if (!raw) return [];
  return raw
    .split(",")
    .map((v) => v.trim())
    .map((v) => map.get(v)?.slug)
    .filter((v): v is string => Boolean(v));
}

export const parseTargets = (raw: string | null | undefined) =>
  toSlugs(raw, TARGET_BY_VALUE);
export const parseLifeStages = (raw: string | null | undefined) =>
  toSlugs(raw, LIFE_BY_VALUE);

/**
 * 조합 페이지를 만들 최소 서비스 수.
 * 러닝온 `MIN_RACES = 3`과 같은 취지 — "목록이 한두 줄뿐인 페이지를 수백 개
 * 찍어내면 저품질 페이지 양산으로 오히려 손해다."
 */
export const MIN_SERVICES = 3;
