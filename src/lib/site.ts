/** 사이트 전역 상수. 도메인이 바뀌면 여기만 고친다. */
export const SITE = {
  name: "복지맵",
  url: "https://bokjimap.co.kr",
  description:
    "전국 시·군·구 복지 서비스와 지원금을 지역별·대상별로 찾아보는 곳",
} as const;

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
