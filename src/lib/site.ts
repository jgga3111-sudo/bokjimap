/** 사이트 전역 상수. 도메인이 바뀌면 여기만 고친다. */
export const SITE = {
  name: "복지맵",
  url: "https://bokjimap.co.kr",
  description:
    "전국 시·군·구 복지 서비스와 지원금을 지역별·대상별로 찾아보는 곳",

  /** 이용약관·개인정보처리방침에 쓰는 운영 주체 표기 */
  operator: "복지맵 운영자 (개인)",

  /**
   * 문의·오류 신고 주소. 화면에는 `MailLink`로 조합해 띄운다
   * (본문에 평문으로 박아 두면 수집 대상이 된다).
   */
  contactUser: "jgga1234567",
  contactHost: "gmail.com",

  /** 약관·방침의 시행일. 내용을 고치면 이 날짜도 같이 올린다. */
  policyEffectiveDate: "2026-08-31",
} as const;

export const CONTACT_EMAIL = `${SITE.contactUser}@${SITE.contactHost}`;

/**
 * KST 기준 오늘 날짜(YYYY-MM-DD).
 *
 * 배포 서버는 UTC로 돌아간다. 그냥 `new Date()`를 쓰면 국내 이용자와 하루가
 * 어긋나 마감일 계산이 틀린다. 날짜를 다루는 모든 곳에서 이 함수를 쓴다.
 */
export function today(): string {
  return new Date(Date.now() + 9 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
}
