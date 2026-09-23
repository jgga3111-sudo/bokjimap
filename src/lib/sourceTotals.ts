import { services, SERVICES_UPDATED } from "@/data/services";

/**
 * 공공데이터포털에 올라와 있는 복지 서비스 **전체 건수** — 우리가 수록한 수가 아니다.
 *
 * 수록 건수(`services.length`)는 데이터에서 세지만, 전체 건수는 목록 API를 새로 받아야만
 * 알 수 있어 여기 적는다. 소개·FAQ·지역 글이 「전체 5,219건」을 **각자 손으로** 적고 있었는데,
 * 09-13 재점검에서 지자체가 4,758 → 4,818건으로 늘어 세 곳이 조용히 틀린 말이 되어 있었다
 * (애드센스 재점검 중 발견). 이제 이 한 곳만 고친다.
 *
 * 값은 `data-research/check/<날짜>/report.json`의 `totals.*.after`. 다음 점검 때 같이 올린다.
 */
export const SOURCE_TOTALS = {
  central: 461,
  local: 4_818,
  checkedAt: "2026-09-24",
} as const;

export const SOURCE_TOTAL = SOURCE_TOTALS.central + SOURCE_TOTALS.local;

/**
 * 수록 사업을 **마지막으로 다시 받아 대조한 날** — 항목별 `checkedAt` 중 가장 늦은 것.
 * `SERVICES_UPDATED`는 처음 받은 날이라 소개·검수 기준·첫 화면이 그것만 적으면 상세 상단의
 * 「09-15 확인」과 어긋났다(09-15 애드센스 점검). 서버 페이지에서만 import한다(데이터를 읽는다).
 */
export const LAST_CHECKED = services.reduce(
  (max, s) => (s.checkedAt && s.checkedAt > max ? s.checkedAt : max),
  SERVICES_UPDATED,
);
