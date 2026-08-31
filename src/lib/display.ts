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
 * 지급 형태를 사람 말로 풀어 준다.
 *
 * 원본 지원내용은 행정 문서 문장 그대로라 읽기 어렵다. 그렇다고 우리가 요약해
 * 쓰면 틀릴 위험이 있으니, **구조화된 값(지급형태·주기)만 가지고** 확실한 것만
 * 설명한다. 여기 문장들은 데이터에서 유도한 것이지 사업별 내용이 아니다.
 *
 * 가장 중요한 건 `현금대여(융자)`다. 30건이 여기 해당하는데, 배지에 "융자"라고
 * 만 적혀 있으면 **받는 돈으로 오해하기 쉽다.** 갚아야 하는 돈이라는 걸
 * 분명히 적는다. 이 한 줄이 이 표의 존재 이유다.
 */
const PAY_TYPE_HELP: Record<string, string> = {
  현금지급: "신청한 계좌로 돈이 들어옵니다.",
  "현금대여(융자)":
    "빌려주는 돈입니다. 나중에 갚아야 하므로 이자와 상환 조건을 꼭 확인하세요.",
  "전자바우처(바우처)":
    "카드에 포인트가 충전됩니다. 정해진 곳에서 정해진 용도로만 쓸 수 있고, 기간이 지나면 사라집니다.",
  실물바우처: "종이 이용권을 받습니다. 지정된 곳에서만 쓸 수 있습니다.",
  지역화폐: "그 지역 안에서만 쓸 수 있는 화폐로 받습니다.",
  감면: "돈을 받는 것이 아니라, 내야 할 요금이 깎입니다.",
  현물지급: "돈이 아니라 물건이나 서비스를 직접 받습니다.",
  현물대여: "물건을 빌려줍니다. 다 쓰고 나면 돌려줘야 합니다.",
  "프로그램/서비스(서비스)":
    "돈이 아니라 상담·교육·돌봄 같은 서비스를 받습니다.",
  시설입소: "시설에 들어가 지내면서 보호와 돌봄을 받습니다.",
  자원봉사: "자원봉사자가 찾아와 도와줍니다.",
};

export const payTypeHelp = (v: string): string | null =>
  PAY_TYPE_HELP[v] ?? null;

/**
 * 지원 주기 풀이.
 *
 * "1회성"과 "월"의 차이를 모르고 신청하는 사람이 많다. 한 번 받고 끝인지
 * 매달 나오는지는 생활 계획이 달라지는 문제다.
 */
const CYCLE_HELP: Record<string, string> = {
  월: "자격이 유지되는 동안 매달 나옵니다.",
  년: "한 해에 한 번 나옵니다.",
  주: "매주 나옵니다.",
  분기: "석 달에 한 번 나옵니다.",
  반기: "여섯 달에 한 번 나옵니다.",
  "1회성": "한 번만 받습니다. 매달 나오는 것이 아닙니다.",
  수시: "정해진 주기 없이, 필요할 때 신청합니다.",
  부정기: "지급 시기가 정해져 있지 않습니다.",
};

export const cycleHelp = (v: string | null): string | null =>
  v ? (CYCLE_HELP[v] ?? null) : null;

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

/**
 * 시행 기간 표기.
 *
 * 원본(enfcBgngYmd·enfcEndYmd)은 **사업의 시행 기간**이지 신청 접수 기간이
 * 아니다. 종료일이 정해지지 않은 사업에는 `9999-12-31`이 들어온다 —
 * 수록 900건 중 554건이 그렇다.
 *
 * 그걸 그대로 찍어서 실서버에 **"2021-03-29 ~ 9999-12-31"**이 554개 페이지에
 * 나가고 있었다. 날짜처럼 생겨서 코드에서는 오류로 보이지 않고, 읽는 사람은
 * 무슨 뜻인지 알 수 없다.
 *
 * 그래서 끝이 없는 사업은 시작 연도만 적는다. 2100년 이후를 전부 "없음"으로
 * 보는 이유는 9999 말고도 2099·2050 같은 값이 섞여 들어오기 때문이다 —
 * 어느 쪽이든 사람에게는 "정해진 종료일이 없다"는 같은 뜻이다.
 */
export function periodLabel(
  start: string | null,
  end: string | null,
): string | null {
  if (!start) return null;
  const year = start.slice(0, 4);
  const endYear = end ? Number(end.slice(0, 4)) : NaN;
  if (!Number.isFinite(endYear) || endYear >= 2100) {
    return `${year}년부터 (종료일 정해지지 않음)`;
  }
  return `${start} ~ ${end}`;
}

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
