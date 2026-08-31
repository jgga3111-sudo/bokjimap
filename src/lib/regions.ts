/**
 * 광역자치단체(시·도) 17개.
 *
 * 이 목록은 고정값이라 손으로 적어도 안전하다. 반면 **기초자치단체(시·군·구)는
 * 손으로 적지 않는다.** 226개를 기억에 의존해 쓰면 누락·오타가 섞이고, 그건 이
 * 프로젝트의 제1원칙("확인 못 하면 null")을 어기는 것이다. 시·군·구 목록은
 * 복지서비스 API 응답에 실제로 등장한 값에서 만들어 낸다(`buildSigunguIndex`).
 * 그래야 데이터와 화면이 어긋나지 않는다.
 *
 * `name`은 짧은 통칭(데이터 매칭·화면 표기용), `fullName`은 정식 명칭이다.
 */
export type Sido = {
  /** URL 슬러그 */
  slug: string;
  /** 짧은 통칭 — 예: "강원" */
  name: string;
  /** 정식 명칭 — 예: "강원특별자치도" */
  fullName: string;
};

export const SIDO_LIST: readonly Sido[] = [
  { slug: "seoul", name: "서울", fullName: "서울특별시" },
  { slug: "busan", name: "부산", fullName: "부산광역시" },
  { slug: "daegu", name: "대구", fullName: "대구광역시" },
  { slug: "incheon", name: "인천", fullName: "인천광역시" },
  { slug: "gwangju", name: "광주", fullName: "광주광역시" },
  { slug: "daejeon", name: "대전", fullName: "대전광역시" },
  { slug: "ulsan", name: "울산", fullName: "울산광역시" },
  { slug: "sejong", name: "세종", fullName: "세종특별자치시" },
  { slug: "gyeonggi", name: "경기", fullName: "경기도" },
  { slug: "gangwon", name: "강원", fullName: "강원특별자치도" },
  { slug: "chungbuk", name: "충북", fullName: "충청북도" },
  { slug: "chungnam", name: "충남", fullName: "충청남도" },
  { slug: "jeonbuk", name: "전북", fullName: "전북특별자치도" },
  { slug: "jeonnam", name: "전남", fullName: "전라남도" },
  { slug: "gyeongbuk", name: "경북", fullName: "경상북도" },
  { slug: "gyeongnam", name: "경남", fullName: "경상남도" },
  { slug: "jeju", name: "제주", fullName: "제주특별자치도" },
] as const;

const BY_SLUG = new Map(SIDO_LIST.map((s) => [s.slug, s]));
const BY_NAME = new Map(SIDO_LIST.map((s) => [s.name, s]));

export function sidoBySlug(slug: string): Sido | undefined {
  return BY_SLUG.get(slug);
}

/**
 * 데이터에 들어 있는 시·도 이름을 우리 목록에 맞춘다.
 *
 * API가 "강원특별자치도"로 줄지 "강원도"로 줄지 "강원"으로 줄지 아직 확인하지
 * 못했다(키 발급 후 실제 응답으로 확정). 그래서 정식명칭·통칭·접미사 제거를
 * 모두 시도한다. **못 맞추면 undefined를 돌려준다. 추측해서 아무 시도나 고르지
 * 않는다.**
 */
export function matchSido(raw: string | null | undefined): Sido | undefined {
  if (!raw) return undefined;
  const v = raw.trim();
  if (!v) return undefined;

  const exact = BY_NAME.get(v) ?? SIDO_LIST.find((s) => s.fullName === v);
  if (exact) return exact;

  // "강원도" → "강원", "서울시" → "서울" 처럼 접미사만 다른 경우
  const stripped = v.replace(/(특별자치도|특별자치시|특별시|광역시|도|시)$/, "");
  return BY_NAME.get(stripped);
}
