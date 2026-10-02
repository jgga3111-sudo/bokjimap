/**
 * 안내 글 끝에 붙는 「근거와 원문」 링크 (2026-10-02).
 *
 * 본문에 외부 출처 링크가 한 줄도 없던 글 11편에 공식 출처를 단다. 모두 글이 실제로 다루는
 * 제도의 근거 법령이거나, 글의 숫자를 집계한 원문이 있는 공식 창구다. 링크를 늘리려고 관련 없는 것을
 * 붙이지 않는다 — 여기 없는 글은 본문이 이미 출처를 달고 있다.
 * 주소는 2026-10-02에 열리는 것을 확인했다(법령은 국가법령정보센터 법령명 주소).
 */
export type GuideRef = { label: string; url: string };

const LAW = (name: string) => `https://www.law.go.kr/법령/${encodeURIComponent(name)}`;
const BOKJIRO: GuideRef = { label: "복지로 — 복지서비스 원문과 온라인 신청", url: "https://www.bokjiro.go.kr" };
const GOV24: GuideRef = { label: "정부24 — 서류 발급·온라인 민원", url: "https://www.gov.kr" };

export const GUIDE_REFS: Readonly<Record<string, readonly GuideRef[]>> = {
  apply: [BOKJIRO, GOV24],
  documents: [GOV24, BOKJIRO],
  region: [BOKJIRO],
  mistakes: [BOKJIRO],
  terms: [
    { label: "국민기초생활 보장법 — 소득인정액·차상위계층·부양의무자의 근거", url: LAW("국민기초생활보장법") },
    BOKJIRO,
  ],
  popular: [BOKJIRO],
  "life-stage": [BOKJIRO],
  livelihood: [
    { label: "국민기초생활 보장법 — 생계급여", url: LAW("국민기초생활보장법") },
    { label: "긴급복지지원법 — 긴급지원 생계지원", url: LAW("긴급복지지원법") },
    BOKJIRO,
  ],
  "tax-credit-amount": [
    { label: "조세특례제한법 — 근로장려금·자녀장려금", url: LAW("조세특례제한법") },
    {
      label: "국세청 — 근로·자녀장려금 심사 및 지급",
      url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2453&cntntsId=7784",
    },
  ],
  "online-share": [BOKJIRO, GOV24],
  "official-docs": [BOKJIRO],
};
