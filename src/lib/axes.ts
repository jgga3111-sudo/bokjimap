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

/**
 * 관심주제 — **중앙부처 사업에 붙는 축.**
 *
 * 이 축을 뒤늦게 살린 이유가 있다. 대상·생애주기는 지자체 사업에만 달려
 * 있어서, 조회수 상위를 거의 다 차지하는 **중앙부처 사업 330건이 "인기순"과
 * 지역 페이지의 전국 칸 말고는 들어갈 길이 없었다.** 데이터에는 관심주제가
 * 처음부터 있었는데 화면에서 한 번도 쓰지 않았다.
 *
 * 값은 수집한 900건에서 실제로 집계된 15종 그대로다(2026-09-01).
 * 임의로 더하거나 이름을 바꾸지 않는다 — 데이터와 어긋나면 그 페이지는
 * 영원히 0건이 된다.
 */
export const THEMES: readonly Axis[] = [
  {
    slug: "living",
    value: "생활지원",
    label: "생활지원",
    blurb: "생계비·양육비·각종 수당 등 생활을 떠받치는 지원입니다.",
  },
  {
    slug: "physical-health",
    value: "신체건강",
    label: "신체건강",
    blurb: "의료비·검진·재활 등 몸 건강을 위한 지원입니다.",
  },
  {
    slug: "education",
    value: "교육",
    label: "교육",
    blurb: "학비·장학금·학습 지원 등 배움을 위한 지원입니다.",
  },
  {
    slug: "finance",
    value: "서민금융",
    label: "서민금융",
    blurb: "저리 대출·채무조정·자산형성 등 돈 문제를 다루는 지원입니다.",
  },
  {
    slug: "mental-health",
    value: "정신건강",
    label: "정신건강",
    blurb: "상담·치료·중독 회복 등 마음 건강을 위한 지원입니다.",
  },
  {
    slug: "care",
    value: "보호·돌봄",
    label: "보호·돌봄",
    blurb: "돌봄 서비스·시설 보호 등 곁에서 돌보는 지원입니다.",
  },
  {
    slug: "job",
    value: "일자리",
    label: "일자리",
    blurb: "취업 훈련·구직 수당·고용 유지 등 일자리 지원입니다.",
  },
  {
    slug: "housing",
    value: "주거",
    label: "주거",
    blurb: "월세·전세자금·주택 개보수 등 사는 곳에 대한 지원입니다.",
  },
  {
    slug: "safety",
    value: "안전·위기",
    label: "안전·위기",
    blurb: "갑작스러운 위기 상황에 긴급하게 받을 수 있는 지원입니다.",
  },
  {
    slug: "childcare",
    value: "보육",
    label: "보육",
    blurb: "어린이집·아이돌봄 등 아이를 맡기고 키우는 데 대한 지원입니다.",
  },
  {
    slug: "pregnancy-birth",
    value: "임신·출산",
    label: "임신·출산",
    blurb: "임신 검진부터 출산·산후조리까지의 지원입니다.",
  },
  {
    slug: "culture",
    value: "문화·여가",
    label: "문화·여가",
    blurb: "공연·여행·체육 등 문화생활을 위한 지원입니다.",
  },
  {
    slug: "adoption",
    value: "입양·위탁",
    label: "입양·위탁",
    blurb: "입양 가정과 가정위탁을 위한 지원입니다.",
  },
  {
    slug: "legal",
    value: "법률",
    label: "법률",
    blurb: "무료 법률 상담·소송 구조 등 법적 도움을 주는 지원입니다.",
  },
  {
    slug: "energy",
    value: "에너지",
    label: "에너지",
    blurb: "전기·가스·난방비 등 에너지 비용에 대한 지원입니다.",
  },
] as const;

const THEME_BY_SLUG = new Map(THEMES.map((t) => [t.slug, t]));
export const themeBySlug = (s: string) => THEME_BY_SLUG.get(s);
