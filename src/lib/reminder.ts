import type { Closing } from "@/data/closing";

/**
 * 「내년에 다시 확인하기」 날짜 (2026-09-17).
 *
 * 조회수 1·2위(청년내일저축계좌·청년월세)가 둘 다 신청 기간이 지났다. 늦게 찾아온
 * 사람에게 "공식 안내에서 확인하세요"만 주면 그대로 떠나고, 내년 이맘때 또 늦는다.
 * 그래서 **확인할 날짜 하나**를 캘린더에 담게 한다.
 *
 * ⚠ 이 날짜는 **내년 공고일이 아니다.** 우리는 내년 일정을 모른다(3절 — 작년
 * 일정을 올해로 옮기지 않는다). 지난번 신청 기간이 **시작된 날의 2주 전**을
 * 「공고가 났는지 확인해 볼 날」로 우리가 정한 것이고, 화면과 일정 설명에
 * 그렇게 적는다.
 *
 * 신청 기간(본문 `period`·보조금24 `gov24`)만 본다. 사업 시행 기간(`program`)은
 * 해마다 다시 모집하는 일정이 아니고, 원문이 마감이라고만 적은 것(`stated`)은
 * 날짜가 없다. 시작일을 못 읽으면 null — 단추를 안 그린다.
 */

const LEAD_DAYS = 14;

const iso = (d: Date) => d.toISOString().slice(0, 10);

/** 원문 조각의 **시작일**(월·일)을 끝날 기준 연도로 편다. 못 읽으면 null. */
export function periodStart(c: Closing): string | null {
  if ((c.kind !== "period" && c.kind !== "gov24") || !c.end) return null;
  const tilde = c.text.search(/[~～]/);
  if (tilde <= 0) return null;
  /* 연도(2026. · '26. · 2026년 · 2026-)를 먼저 걷어야 「2026-04-06」의 「26-04」를 월·일로 안 읽는다. */
  const head = c.text.slice(0, tilde).replace(/(?:\d{4}|['’]\d{2})\s*[.\-년]\s*/g, " ");
  const m = head.match(/(\d{1,2})\s*[.\-월]\s*(\d{1,2})/);
  if (!m) return null;
  const month = Number(m[1]);
  const day = Number(m[2]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const endYear = Number(c.end.slice(0, 4));
  let start = new Date(Date.UTC(endYear, month - 1, day));
  if (start.getUTCMonth() !== month - 1) return null; // 2.30 같은 날
  /* 「'25.12.22.~'26.12.11.」처럼 해를 넘기는 기간 */
  if (iso(start) > c.end) start = new Date(Date.UTC(endYear - 1, month - 1, day));
  return iso(start);
}

/** 오늘 뒤로 오는 첫 「확인할 날」. 끝날이 아직 안 지났거나 시작일을 못 읽으면 null. */
export function nextCheckDate(c: Closing, today: string): string | null {
  if (!c.end || c.end >= today) return null;
  const start = periodStart(c);
  if (!start) return null;
  const [y, mo, d] = start.split("-").map(Number);
  for (let k = 1; k < 10; k++) {
    const at = new Date(Date.UTC(y + k, mo - 1, d - LEAD_DAYS));
    if (iso(at) > today) return iso(at);
  }
  return null;
}

/** 한국 시각 오늘 — 서버(.ics 파일)용. 브라우저는 `useLocalToday`를 쓴다. */
export const kstToday = () => iso(new Date(Date.now() + 9 * 3600 * 1000));

