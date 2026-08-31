/**
 * 화면 표기 규칙.
 *
 * 배지 목록은 전부 5,219건 응답에서 **실제로 집계된 값**이다(2026-08-31).
 * 목록에 없는 값이 오면 회색 기본 배지로 떨어뜨린다 — 화면이 깨지지 않게.
 */

export type Tone = "blue" | "emerald" | "amber" | "violet" | "rose" | "slate";

const TONE_CLASS: Record<Tone, string> = {
  blue: "bg-blue-50 text-blue-700 ring-blue-600/15",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  amber: "bg-amber-50 text-amber-800 ring-amber-600/15",
  violet: "bg-violet-50 text-violet-700 ring-violet-600/15",
  rose: "bg-rose-50 text-rose-700 ring-rose-600/15",
  slate: "bg-slate-100 text-slate-600 ring-slate-500/15",
};

export const toneClass = (t: Tone) => TONE_CLASS[t];

/**
 * 지급 형태(srvPvsnNm) 12종. 괄호 안 표기는 화면에서 걷어낸다
 * — "전자바우처(바우처)" → "바우처".
 */
const PAY_TYPE: Record<string, { label: string; tone: Tone; icon: string }> = {
  현금지급: { label: "현금", tone: "blue", icon: "💰" },
  "현금대여(융자)": { label: "융자", tone: "blue", icon: "🏦" },
  "전자바우처(바우처)": { label: "바우처", tone: "violet", icon: "🎫" },
  실물바우처: { label: "실물바우처", tone: "violet", icon: "🎫" },
  지역화폐: { label: "지역화폐", tone: "violet", icon: "🎫" },
  감면: { label: "요금감면", tone: "emerald", icon: "✂️" },
  현물지급: { label: "현물", tone: "amber", icon: "📦" },
  현물대여: { label: "현물대여", tone: "amber", icon: "📦" },
  "프로그램/서비스(서비스)": { label: "서비스", tone: "slate", icon: "🤝" },
  시설입소: { label: "시설입소", tone: "slate", icon: "🏠" },
  자원봉사: { label: "자원봉사", tone: "slate", icon: "🙋" },
  기타: { label: "기타", tone: "slate", icon: "•" },
};

export const payType = (v: string) =>
  PAY_TYPE[v] ?? { label: v, tone: "slate" as Tone, icon: "•" };

/**
 * 지원 주기. "월"처럼 한 글자로 오는 값을 사람이 읽는 말로 편다
 * — 카드에 "월"만 떠 있으면 무슨 뜻인지 알 수 없다.
 */
const CYCLE: Record<string, string> = {
  월: "매월 지급",
  년: "매년 지급",
  주: "매주 지급",
  분기: "분기마다",
  반기: "반년마다",
  "1회성": "1회 지급",
  수시: "수시 접수",
  부정기: "부정기",
  기타: "기타",
  "기타(월)": "매월(기타)",
};

export const cycleLabel = (v: string | null) => (v ? (CYCLE[v] ?? v) : null);

/** 조회수는 자릿수를 줄여 보여준다. 1,234,567 → 123만 */
export function views(n: number): string {
  if (n >= 10_000) return `${Math.floor(n / 10_000).toLocaleString()}만`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}천`;
  return n.toLocaleString();
}

export const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

/** 중앙부처 사업은 전국 공통이라 지역을 "전국"으로 적는다. */
export function placeLabel(s: {
  provider: string;
  sidoName: string | null;
  sigunguName: string | null;
}): string {
  if (s.provider === "central") return "전국";
  return [s.sidoName, s.sigunguName].filter(Boolean).join(" ") || "지역";
}

/**
 * 화면에 띄울 지급형태.
 *
 * "현금지급,기타"처럼 `기타`가 덧붙는 경우가 805건 있다. 다른 값이 함께
 * 있으면 `기타`는 정보를 더하지 않고 배지만 늘리므로 뺀다. 혼자 있을 때만 남긴다.
 */
export function visiblePayTypes(types: readonly string[]): string[] {
  const meaningful = types.filter((t) => t !== "기타");
  return meaningful.length > 0 ? meaningful : [...types];
}
