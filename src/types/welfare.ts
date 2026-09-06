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

/**
 * 「선정 기준」칸이 사실상 비어 있는가.
 *
 * 원본 API가 선정기준 자리에 **"지원대상의 내용을 참고해주시기 바랍니다."**만
 * 넣어 보내는 사업이 149건 있다(2026-09-06 실측). 표현이 조금씩 달라
 * "지원대상을 참고해주시기 바랍니다" · "자세한 내용은 지원대상의 내용을…" ·
 * "지원대상, 신청방법의 내용을…" 같은 변형이 섞여 있다.
 *
 * 이 149건이 가져가는 복지로 조회수가 **전체의 30.8%**다. 사람들이 가장 많이
 * 여는 페이지의 한 칸이, 아무 말도 하지 않는 문장 하나로 채워져 있었다.
 * 게다가 149장에 글자까지 같은 문장이 실리면 구글에는 중복 신호가 된다 —
 * 제목·설명 중복을 막으려고 `audit-indexability`까지 두고 있으면서
 * 본문에서 같은 일을 하고 있었던 셈이다.
 *
 * 판정은 **짧고 + 지원대상을 가리키고 + 참고하라고 끝나는 것**으로 한정한다.
 * 길이 상한(40자)이 핵심이다. 한부모가족 사업처럼
 * "…참고해주시기 바라며 소득인정액은 소득평가액과…"로 이어져 **실제 내용이
 * 붙어 있는 108자짜리**가 있는데, 그건 지우면 안 되는 본문이다.
 */
export function isCriteriaBoilerplate(text: string | null): boolean {
  if (!text) return false;
  const t = text.replace(/\s+/g, "");
  return (
    t.length <= 40 &&
    t.includes("지원대상") &&
    t.includes("참고") &&
    /바랍니다\.?$/.test(t)
  );
}

/**
 * 상세 본문을 이루는 조각들. 길이 판정과 화면 렌더 양쪽에서 쓴다.
 *
 * 상투 문구 선정기준은 **길이에서 뺀다.** 화면에 그리지 않기로 한 글자를
 * "본문이 이만큼 있다"고 세면, 색인 기준선(`MIN_BODY_LENGTH`)이 실제보다
 * 후해진다. 빼고 다시 세면 색인 대상이 713건에서 707건이 된다 — 6건이
 * 빠지고, 그 6건이 가져가던 조회수는 전체의 0.13%다.
 */
export function bodyText(s: WelfareService): string {
  return [
    s.outline,
    s.summary,
    s.eligibility,
    isCriteriaBoilerplate(s.selectionCriteria) ? null : s.selectionCriteria,
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
 * 2026-09-01, 200 → 300으로 올렸다. 애드센스 신청을 앞두고 실제 분포를 봤다
 * (수록 900건, 상세 본문 670건 확보 시점).
 *
 *   기준선   색인 대상
 *    200자     607건
 *    300자     503건   ← 여기
 *    400자     405건
 *
 * 200~299자 구간에 104건이 있는데, 이 구간이 가져가는 복지로 조회수는
 * **전체의 2%**다. 사람들이 찾지 않는 페이지들이라는 뜻이다. 색인이 될 리도
 * 없고, 심사에서 표본으로 뽑히면 "내용 없는 페이지"로 읽힌다. 잃는 것이
 * 거의 없으니 뺀다.
 *
 * 400자까지 올리지 않은 이유 — 거기서부터는 조회수 상위 사업이 걸리기
 * 시작한다. 사람들이 실제로 찾는 것을 우리가 스스로 감추는 꼴이 된다.
 *
 * 뺀 페이지도 사이트에서는 그대로 볼 수 있다. 색인과 사이트맵에서만 빠진다.
 *
 * ⚠ 남은 중앙부처 361건을 다 받으면 분포가 달라진다. 그때 이 표를 다시 뽑아
 *   기준선을 재확인할 것.
 */
export const MIN_BODY_LENGTH = 300;

export function isIndexable(s: WelfareService): boolean {
  return bodyText(s).length >= MIN_BODY_LENGTH;
}
