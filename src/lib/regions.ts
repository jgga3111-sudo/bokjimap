/**
 * 광역자치단체(시·도).
 *
 * ⚠ 처음엔 17개로 손수 적었다가 실제 데이터와 어긋났다. 복지서비스 API가 주는
 * `ctpvNm` 고유값을 세어 보니 **광주광역시와 전라남도가 "전남광주통합특별시"로
 * 통합**돼 있었다(2026-08-31 사용자 확인). "시·도는 고정값이라 손으로 적어도
 * 안전하다"는 판단이 틀렸던 것이다.
 *
 * 그래서 아래 목록은 **API 응답에 실제로 등장한 값**을 기준으로 한다. 세종은
 * 지자체 복지사업이 0건이라 응답에 안 나오지만, 중앙부처 사업의 대상 지역이고
 * 행정구역으로 존재하므로 남겨 둔다.
 *
 * 기초자치단체(시·군·구)는 여전히 손으로 적지 않는다. 225개가 응답의 `sggNm`에
 * 들어 있으므로 거기서 만들어 낸다(`buildSigunguIndex`). 데이터와 화면이
 * 어긋나지 않게 하려는 것이고, 위에서 실제로 어긋났던 경험이 그 근거다.
 */
export type Sido = {
  /** URL 슬러그 */
  slug: string;
  /** 짧은 통칭 — 화면 표기용 */
  name: string;
  /** 정식 명칭 — API의 ctpvNm 값과 일치해야 한다 */
  fullName: string;
};

export const SIDO_LIST: readonly Sido[] = [
  { slug: "seoul", name: "서울", fullName: "서울특별시" },
  { slug: "busan", name: "부산", fullName: "부산광역시" },
  { slug: "daegu", name: "대구", fullName: "대구광역시" },
  { slug: "incheon", name: "인천", fullName: "인천광역시" },
  { slug: "daejeon", name: "대전", fullName: "대전광역시" },
  { slug: "ulsan", name: "울산", fullName: "울산광역시" },
  { slug: "sejong", name: "세종", fullName: "세종특별자치시" },
  { slug: "gyeonggi", name: "경기", fullName: "경기도" },
  { slug: "gangwon", name: "강원", fullName: "강원특별자치도" },
  { slug: "chungbuk", name: "충북", fullName: "충청북도" },
  { slug: "chungnam", name: "충남", fullName: "충청남도" },
  { slug: "jeonbuk", name: "전북", fullName: "전북특별자치도" },
  {
    slug: "jeonnam-gwangju",
    name: "전남·광주",
    fullName: "전남광주통합특별시",
  },
  { slug: "gyeongbuk", name: "경북", fullName: "경상북도" },
  { slug: "gyeongnam", name: "경남", fullName: "경상남도" },
  { slug: "jeju", name: "제주", fullName: "제주특별자치도" },
] as const;

const BY_SLUG = new Map(SIDO_LIST.map((s) => [s.slug, s]));
const BY_NAME = new Map(SIDO_LIST.map((s) => [s.name, s]));
const BY_FULL = new Map(SIDO_LIST.map((s) => [s.fullName, s]));

export function sidoBySlug(slug: string): Sido | undefined {
  return BY_SLUG.get(slug);
}

/**
 * 데이터의 시·도 이름을 우리 목록에 맞춘다.
 * **못 맞추면 undefined.** 비슷한 걸 골라 주지 않는다 — 틀린 지역에 사업을
 * 붙이면 사람을 엉뚱한 지자체로 보내게 된다.
 */
export function matchSido(raw: string | null | undefined): Sido | undefined {
  if (!raw) return undefined;
  const v = raw.trim();
  if (!v) return undefined;

  const exact = BY_FULL.get(v) ?? BY_NAME.get(v);
  if (exact) return exact;

  // "강원도" → "강원" 처럼 접미사만 다른 경우까지만 봐준다.
  const stripped = v.replace(/(통합특별시|특별자치도|특별자치시|특별시|광역시|도|시)$/, "");
  return BY_NAME.get(stripped);
}

/** 시·군·구 슬러그. 한글은 URL에서 인코딩되므로 시·도 슬러그와 조합해 쓴다. */
export function sigunguSlug(name: string): string {
  return encodeURIComponent(name.trim());
}
