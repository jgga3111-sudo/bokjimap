/** 사이트 전역 상수. 도메인이 바뀌면 여기만 고친다. */
export const SITE = {
  name: "복지클릭",
  url: "https://bokjiclick.co.kr",
  description:
    "전국 시·군·구 복지 서비스와 지원금을 지역별·대상별로 찾아보는 곳",

  /** 이용약관·개인정보처리방침에 쓰는 운영 주체 표기 */
  operator: "복지클릭 운영자 (개인)",

  /**
   * 운영자가 가진 국가자격 (2026-09-25 사용자 확인). 소개·글 끝·푸터·JSON-LD에 붙인다.
   * 약관·방침의 운영 주체 표기(operator)는 그대로 둔다 — 자격은 주체가 아니라 설명이다.
   */
  credentials: ["사회복지사 2급", "재활상담사 2급"],

  /**
   * 문의·오류 신고 주소. 화면에는 `MailLink`로 조합해 띄운다
   * (본문에 평문으로 박아 두면 수집 대상이 된다).
   */
  contactUser: "jgga1234567",
  contactHost: "gmail.com",

  /** 저작권 표시에 쓰는 개설 연도. */
  foundedYear: 2026,

  /** 약관·방침의 시행일. 내용을 고치면 이 날짜도 같이 올린다. */
  policyEffectiveDate: "2026-09-13",
} as const;

export const CONTACT_EMAIL = `${SITE.contactUser}@${SITE.contactHost}`;

/** 화면용 한 줄 — 「사회복지사 2급 · 재활상담사 2급」 */
export const OPERATOR_CREDENTIALS = SITE.credentials.join(" · ");

/** JSON-LD의 운영자 Person (layout WebSite·안내 글 Article이 같이 쓴다). */
export const OPERATOR_PERSON = {
  "@type": "Person",
  name: SITE.operator,
  url: `${SITE.url}/about`,
  hasCredential: SITE.credentials.map((name) => ({
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "국가자격",
    name,
  })),
};

/**
 * 색인되는 페이지의 robots 값 (2026-09-11).
 *
 * `generateMetadata`에서 `robots: 조건 ? {index:false} : undefined`로 쓰면 Next가
 * `undefined`도 "이 페이지가 robots를 정했다"로 보고 layout의 값을 **안 물려준다** —
 * 그래서 상세·허브에서 `max-image-preview:large`가 빠졌다(빌드 HTML로 확인).
 * undefined 대신 이 값을 넘긴다. layout.tsx의 robots와 같은 내용이어야 한다.
 */
export const ROBOTS_INDEX = { googleBot: { "max-image-preview": "large" as const } };

/**
 * KST 기준 오늘 날짜(YYYY-MM-DD).
 *
 * 배포 서버는 UTC로 돌아간다. 그냥 `new Date()`를 쓰면 국내 이용자와 하루가
 * 어긋나 마감일 계산이 틀린다. 날짜를 다루는 모든 곳에서 이 함수를 쓴다.
 */
export function today(): string {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}
