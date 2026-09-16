import type { WelfareService } from "@/types/welfare";

/**
 * 원문 지원 대상의 **첫 문장(들)**을 120자 안에서 끊는다. (2026-09-11)
 *
 * 「신청 전 체크」의 자격 조건 줄에 쓴다. 우리가 요약해 다시 쓰지 않는다
 * (CLAUDE.md 3절) — 원문을 앞에서부터 문장 단위로 잘라 붙이고, 끊겼으면
 * "…"과 함께 전문(#target)으로 보낸다.
 *
 * 문장 경계는 **줄바꿈**과 **「…다.」「…음.」 같은 한국어 종결 뒤 마침표**만
 * 본다. 마침표 하나로 자르면 "2026. 1. 1. 이후 출생"(영유아보육료)의 날짜가
 * 세 토막 난다. lookbehind는 tsconfig target(ES2017)에서 못 쓰므로 종결
 * 뒤에 줄바꿈을 끼워 넣고 줄로 가른다.
 *
 * `※`로 시작하는 토막은 조건이 아니라 조건에 붙는 단서다(K-패스: "※ 외국인
 * 등록번호가 있는 외국인에 한해…"). 첫 문장을 이미 잡았으면 거기서 멈춘다.
 * 원문이 `※`로 **시작**하면(청년월세 지원사업) 그건 첫 줄이므로 그대로 싣는다.
 *
 * 첫 토막부터 120자를 넘는 원문이 있다 — 홍천군 운전면허 학원비처럼 줄바꿈
 * 없이 「- 」로 항목을 잇는 것. 그때는 마지막 띄어쓰기에서 자른다. 낱말
 * 가운데를 자르면 "18세 이상 20세 이"처럼 뜻이 바뀌어 보인다.
 */
const LEAD_MAX = 120;

export function leadSentence(text: string): { lead: string; cut: boolean } {
  const parts = text
    .replace(/([다음됨함임요])\.\s+/g, "$1.\n")
    .split(/\n+/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  let lead = "";
  let used = 0;
  for (const p of parts) {
    if (lead && /^[※*]/.test(p)) break;
    const next = lead ? `${lead} ${p}` : p;
    if (next.length > LEAD_MAX) break;
    lead = next;
    used += 1;
  }

  if (lead) return { lead, cut: used < parts.length };

  const head = parts[0] ?? "";
  const space = head.lastIndexOf(" ", LEAD_MAX);
  const at = space > LEAD_MAX / 2 ? space : LEAD_MAX;
  return { lead: head.slice(0, at).trim(), cut: true };
}

/** 비교 표처럼 한 줄만 필요한 곳 — 자격 조건 원문의 첫 문장. */
export function leadOf(s: WelfareService): string | null {
  if (!s.eligibility) return null;
  const { lead, cut } = leadSentence(s.eligibility);
  if (!lead) return null;
  return cut && !/[.。]$/.test(lead) ? `${lead}…` : lead;
}
