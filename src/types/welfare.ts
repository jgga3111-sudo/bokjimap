/**
 * 복지 서비스 도메인 모델.
 *
 * ── 왜 API 응답 타입을 여기 두지 않는가 ──────────────────────────────
 * 복지로 API의 **응답 필드명을 아직 확인하지 못했다**(인증키가 있어야 실제
 * 응답을 볼 수 있고, 공개 문서에는 필드 목록이 없다). 필드명을 기억이나 추측으로
 * 적어 두면 나중에 실제 응답과 어긋나 조용히 틀린 데이터가 흘러든다.
 *
 * 그래서 이 파일에는 **우리가 화면에서 쓸 모델만** 둔다. 이건 API가 뭘 주든
 * 우리가 정하는 값이라 지금 확정해도 안전하다. API 응답 → 이 모델로 옮기는
 * 변환 계층은 실제 응답을 본 뒤에 `src/lib/fetchWelfare.ts`에 만든다.
 * ─────────────────────────────────────────────────────────────────
 */

/** 서비스를 제공하는 주체의 층위 */
export type Provider = "central" | "local";

export type WelfareService = {
  /** API가 주는 서비스 ID를 그대로 쓴다 */
  id: string;
  /** 서비스명 */
  name: string;
  /** 중앙부처 사업인지 지자체 사업인지 */
  provider: Provider;

  /**
   * 지역. 중앙부처 사업은 전국 대상이라 둘 다 null이다.
   * 지자체 사업이라도 응답에서 지역을 못 읽으면 null로 둔다 — 임의로 채우지 않는다.
   */
  sidoName: string | null;
  sigunguName: string | null;

  /** 소관 부처·조직 */
  department: string | null;

  /** 대상 축 슬러그. 분류에 실패하면 빈 배열 — "기타"로 몰아넣지 않는다. */
  targets: string[];

  /** 원문 표현 그대로 옮긴다. 반올림·요약 금지(CLAUDE.md 3절). */
  summary: string | null;
  supportContent: string | null;
  eligibility: string | null;
  applyMethod: string | null;

  /** 신청 기간. 상시 접수면 null. */
  applyStart: string | null;
  applyEnd: string | null;

  /** 공식 안내 링크 */
  officialUrl: string | null;
  contact: string | null;

  /** 기준연도 — 작년 공고를 올해로 착각하지 않기 위한 필수 값 */
  baseYear: string | null;

  /** 정보 확인일(YYYY-MM-DD). 항목마다 남긴다. */
  verifiedAt: string | null;
};

/**
 * 상세 페이지를 만들 만한 내용이 있는가.
 *
 * 러닝온에서 배운 것 — 얇은 페이지는 색인에서 빼도 애드센스 심사에는 그대로
 * 남는다. 아예 만들지 않거나 noindex로 내보낸다. 이름과 링크만 있고 본문이
 * 없는 항목은 여기서 걸러진다.
 */
export function isIndexable(s: WelfareService): boolean {
  const body = [s.summary, s.supportContent, s.eligibility, s.applyMethod]
    .filter(Boolean)
    .join("");
  return body.length >= 200;
}
