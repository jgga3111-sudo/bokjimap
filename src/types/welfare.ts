/**
 * 복지 서비스 도메인 모델.
 *
 * 필드는 전부 실제 API 응답(2026-08-31 실측)에서 온 것이다. 목록 API와 상세
 * API의 필드명이 중앙부처/지자체별로 다르기 때문에(예: 지원대상이 중앙은
 * `tgtrDtlCn`, 지자체는 `sprtTrgtCn`) 여기서 하나의 모델로 통일한다.
 * 변환은 `scripts/build-data.mjs`가 한다.
 *
 * 원칙: **확인 못 한 값은 null.** 빈 문자열이나 "정보 없음"으로 채우지 않는다.
 */

export type Provider = "central" | "local";

/** 지급 형태 — API의 srvPvsnNm 원문 값(12종). */
export type PayType = string;

export type LinkItem = { name: string; url: string | null };

export type WelfareService = {
  /** API가 주는 서비스 ID(WLF00001234). 그대로 URL에 쓴다. */
  id: string;
  name: string;
  provider: Provider;

  /** 복지로 누적 조회수. 수요의 대리지표로 정렬에 쓴다. */
  views: number;

  sidoName: string | null;
  sigunguName: string | null;
  department: string | null;

  targets: string[];
  lifeStages: string[];
  /** 관심주제(중앙부처 사업에만 붙는다) */
  themes: string[];

  /** 지급 형태(현금지급·전자바우처·감면 …). 복수 가능. */
  payTypes: PayType[];
  /** 지원 주기(월·1회성·수시 …) */
  cycle: string | null;
  /** 신청 방법(방문·인터넷·전화 …) */
  applyMethods: string[];
  /** 온라인 신청 가능 여부. 중앙부처 사업에만 값이 있다. */
  onlineApply: boolean | null;

  /* ── 본문 (상세 API) ── 원문 표현 그대로. 반올림·요약 금지. */
  summary: string | null;
  /** 사업 개요(중앙부처 wlfareInfoOutlCn) */
  outline: string | null;
  /** 지원 대상 */
  eligibility: string | null;
  /** 선정 기준 */
  selectionCriteria: string | null;
  /** 지원 내용 */
  supportContent: string | null;
  /** 신청 방법 서술 */
  applyMethod: string | null;
  /** 신청 절차 단계 */
  applySteps: string[];

  /**
   * 선정기준 문장에서 읽어낸 "기준 중위소득 ○○%".
   * 자가진단 결과와 서비스를 잇는 유일한 연결고리다.
   * 문장에 명시가 없으면 null — 짐작해서 넣지 않는다.
   */
  medianPercent: number | null;

  applyStart: string | null;
  applyEnd: string | null;

  contacts: LinkItem[];
  homepages: LinkItem[];
  lawBasis: string[];
  forms: LinkItem[];

  /** 복지로 원문 링크 */
  officialUrl: string | null;
  /** 기준연도 — 작년 공고를 올해로 착각하지 않기 위한 값 */
  baseYear: string | null;
  /** 원본 최종수정일(YYYY-MM-DD) */
  updatedAt: string | null;
};

/** 상세 본문을 이루는 조각들. 길이 판정과 화면 렌더 양쪽에서 쓴다. */
export function bodyText(s: WelfareService): string {
  return [
    s.outline,
    s.summary,
    s.eligibility,
    s.selectionCriteria,
    s.supportContent,
    s.applyMethod,
  ]
    .filter(Boolean)
    .join("");
}

/**
 * 상세 페이지를 색인에 내보낼 만한 내용이 있는가.
 *
 * 러닝온 실측(docs/02): 얇은 페이지 665개 중 510개가 "발견됨 – 색인 안 됨"에
 * 빠졌다. 색인이 안 되는 데서 끝나지 않고, 애드센스 심사에는 그대로 남는다.
 * 그래서 기준 미달은 아예 사이트맵에서 빼고 noindex로 내보낸다.
 *
 * 200자는 잠정값이다. 상세 데이터를 다 받은 뒤 실제 분포를 보고 조정한다.
 */
export const MIN_BODY_LENGTH = 200;

export function isIndexable(s: WelfareService): boolean {
  return bodyText(s).length >= MIN_BODY_LENGTH;
}
