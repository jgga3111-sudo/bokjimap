/**
 * 첨부 파일 이름을 화면에 적을 때 쓰는 세 조각 — 2026-09-16.
 *
 * 원문 파일 이름이 길다. 실측 평균 29자, 30자 넘는 것이 1,178개 중 445개다.
 * 375px에서는 링크 하나가 세 줄을 차지해, 파일 넷이 붙은 상세는 화면 절반이
 * 파일 이름이 된다.
 *
 *   [별지 1의2] 소득·재산 신고서(신규, 변경)(사회보장급여 관련 공통서식에 관한 고시).hwp
 *
 * 이 한 줄에 실제로 서로 다른 세 가지가 섞여 있다 — **서식 번호**(별지 1의2),
 * **문서 이름**(소득·재산 신고서), **어느 고시에 딸린 것인가**(출처). 셋을
 * 갈라 놓으면 이름만 21자로 줄고 나머지는 작은 글씨 한 줄로 내려간다.
 *
 * ── 지키는 것 ─────────────────────────────────────────────────
 * · **글자를 고치거나 요약하지 않는다.** 자리를 옮길 뿐이라 합치면 원문이다.
 * · 잘라 낸 것을 **버리지 않는다** — note로 화면에 그대로 남고, 링크의 title에는
 *   원래 파일 이름이 통째로 들어간다.
 * · 출처로 **확실히 읽히는 괄호만** 뗀다. 「(신규, 변경)」이나 「(사회복지시설의
 *   대표자가 신청할 경우)」처럼 문서 이름의 일부인 괄호는 그대로 둔다.
 */

/** 같은 이름이 둘일 때 파일 이름 끝에 붙는 (2). 화면에 옮길 값이 아니라 뗀다. */
const isCopyMark = (t: string) => /^\d{1,2}$/.test(t);

/** 이 괄호 안은 문서 이름이 아니라 출처·판번호·날짜인가. */
const isProvenance = (t: string) =>
  isCopyMark(t) ||
  /^\d{6,8}$/.test(t) /* 20200228 */ ||
  /^제.*호$/.test(t) /* 제2694호 */ ||
  /(고시|시행규칙|시행령|조례|훈령|예규|지침|규정|법률)/.test(t);

export type FormName = {
  /** 화면에 크게 적을 문서 이름. */
  label: string;
  /** 그 밑에 작게 적을 서식 번호·출처. 없으면 빈 문자열. */
  note: string;
  /** 확장자(HWP·PDF…). 없으면 null. */
  ext: string | null;
};

export function formName(raw: string): FormName {
  let name = (raw ?? "").trim();
  let ext: string | null = null;

  const dot = name.match(/\.([A-Za-z0-9]{1,5})$/);
  if (dot) {
    ext = dot[1].toUpperCase();
    name = name.slice(0, -dot[0].length).trim();
  }

  /* 앞머리 [별지 …] — 서식 번호다. 이름 앞에 두면 제목 줄이 그만큼 밀린다. */
  let lead = "";
  const bracket = name.match(/^\[([^\]]{1,30})\]\s*/);
  if (bracket) {
    lead = bracket[1].trim();
    name = name.slice(bracket[0].length);
  }

  /* 끝의 괄호를 뒤에서부터, 출처로 읽히는 동안만 뗀다. */
  const tail: string[] = [];
  for (;;) {
    const paren = name.match(/\s*\(([^()]{1,60})\)\s*$/);
    if (!paren || !isProvenance(paren[1].trim())) break;
    if (!isCopyMark(paren[1].trim())) tail.unshift(paren[1].trim());
    name = name.slice(0, -paren[0].length);
  }

  const label = name.trim();
  return {
    /* 통째로 출처처럼 생긴 이름이면 아무것도 떼지 않는다 — 빈 제목보다 낫다. */
    label: label || raw.trim(),
    note: label ? [lead, ...tail].filter(Boolean).join(" · ") : "",
    ext,
  };
}
