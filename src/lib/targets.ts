/**
 * 대상(target) 축 — 지역 축과 함께 조합 랜딩페이지를 만드는 두 번째 축.
 *
 * 러닝온이 "지역 × 시기 × 종목"으로 115개 랜딩을 폈던 자리에, 복지맵은
 * "지역 × 대상"을 쓴다. 사람들이 실제로 검색하는 말이 "복지서비스"가 아니라
 * "청년 지원금", "화성시 출산지원금"이기 때문이다.
 *
 * 이 목록은 우리가 정하는 값이라 지금 확정해도 안전하다. 다만 각 서비스를 어느
 * 대상으로 분류할지는 실제 응답의 분류 코드를 본 뒤에 정한다(`keywords`는 코드가
 * 없을 때 쓰는 보조 수단일 뿐, 1차 근거가 아니다).
 */
export type Target = {
  slug: string;
  /** 화면·제목에 쓰는 말 */
  label: string;
  /** 목록 상단 한 줄 설명 */
  blurb: string;
  /** 분류 코드가 없을 때만 쓰는 보조 키워드 */
  keywords: readonly string[];
};

export const TARGETS: readonly Target[] = [
  {
    slug: "youth",
    label: "청년",
    blurb: "청년을 대상으로 하는 지원금·주거·취업 지원 사업입니다.",
    keywords: ["청년", "대학생", "취업준비"],
  },
  {
    slug: "birth",
    label: "임신·출산",
    blurb: "임신·출산 가정을 위한 지원금과 의료비 지원 사업입니다.",
    keywords: ["임신", "출산", "산모", "난임"],
  },
  {
    slug: "child",
    label: "영유아·아동",
    blurb: "영유아·아동 양육 가정을 위한 보육·돌봄·수당 사업입니다.",
    keywords: ["아동", "영유아", "보육", "어린이집", "양육"],
  },
  {
    slug: "senior",
    label: "노인",
    blurb: "어르신을 위한 연금·돌봄·의료 지원 사업입니다.",
    keywords: ["노인", "어르신", "고령", "경로"],
  },
  {
    slug: "disability",
    label: "장애인",
    blurb: "장애인과 가족을 위한 지원 사업입니다.",
    keywords: ["장애"],
  },
  {
    slug: "single-parent",
    label: "한부모·조손",
    blurb: "한부모·조손 가정을 위한 양육비와 생활 지원 사업입니다.",
    keywords: ["한부모", "조손", "미혼모", "미혼부"],
  },
  {
    slug: "low-income",
    label: "저소득",
    blurb: "기초생활수급자·차상위계층을 위한 생계·주거·의료 지원입니다.",
    keywords: ["기초생활", "수급자", "차상위", "저소득"],
  },
  {
    slug: "job",
    label: "구직·실업",
    blurb: "구직자와 실직자를 위한 급여·훈련·알선 사업입니다.",
    keywords: ["실업급여", "구직", "취업", "직업훈련"],
  },
  {
    slug: "business",
    label: "소상공인·자영업",
    blurb: "소상공인과 자영업자를 위한 자금·경영 지원 사업입니다.",
    keywords: ["소상공인", "자영업", "창업"],
  },
  {
    slug: "farmer",
    label: "농어민",
    blurb: "농업인·어업인을 위한 지원 사업입니다.",
    keywords: ["농업", "어업", "농어촌", "귀농"],
  },
] as const;

const BY_SLUG = new Map(TARGETS.map((t) => [t.slug, t]));

export function targetBySlug(slug: string): Target | undefined {
  return BY_SLUG.get(slug);
}

/**
 * 조합 페이지를 만들 최소 서비스 수.
 *
 * 러닝온 `MIN_RACES = 3`과 같은 취지다. 원문 주석: "목록이 한두 줄뿐인 페이지를
 * 수백 개 찍어내면 저품질 페이지 양산으로 오히려 손해다."
 *
 * 지역 17개(또는 시군구 226개) × 대상 10개면 조합이 수천 개가 나오는데,
 * 그중 알맹이 있는 것만 남긴다.
 */
export const MIN_SERVICES = 3;
