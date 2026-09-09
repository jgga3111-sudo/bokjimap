import Link from "next/link";

/**
 * 말로 물어보는 상자.
 *
 * ── 자바스크립트를 쓰지 않는다 ─────────────────────────────────
 * 평범한 `<form method="get">`이다. 눌리면 `/ask?q=…`로 간다. 상태를 들고
 * 있을 일이 없어서 클라이언트 컴포넌트로 만들 이유가 없고, 그래서 **번들이
 * 한 바이트도 안 는다**(`AxisFinder`는 칩을 껐다 켜야 해서 어쩔 수 없었다).
 *
 * ── 헤더 검색창과 모양을 다르게 둔다 ───────────────────────────
 * 첫 화면에 둥근 검색 상자가 둘 나란히 보이는 것을 한 번 걷어냈다
 * (`app/page.tsx` 히어로 주석). 그래서 이것은 검색창처럼 생기지 않게 한다 —
 * 제목이 붙은 상자 안에 있고, 아래에 예시 문장이 깔린다. 하는 일도 다르다.
 * 헤더는 **이름을 아는 사람**이 쓰고, 여기는 이름을 모르는 사람이 쓴다.
 *
 * ── AI라고 쓰지 않는다 ─────────────────────────────────────────
 * 모델을 부르지 않는다. 질문의 낱말을 표와 맞출 뿐이라(`lib/askParse.ts`),
 * "AI가 답해 드립니다"라고 적으면 못 하는 것을 약속하는 셈이 된다.
 * 하는 일을 그대로 적는다 — 조건으로 바꿔 수록분에서 찾아 준다.
 */

/** 예시는 **실제로 결과가 나오는 문장**만 둔다(2026-09-09 실측). */
export const ASK_EXAMPLES = [
  "서울 사는 30대인데 월세 지원 있나요",
  "혼자 아이 키우는데 받을 수 있는 게 있을까요",
  "67세인데 병원비가 부담됩니다",
  "기초생활수급자 전기요금 감면",
] as const;

export default function AskBox({
  defaultValue = "",
  autoFocus = false,
}: {
  defaultValue?: string;
  autoFocus?: boolean;
}) {
  return (
    <div>
      <form action="/ask" method="get" className="flex flex-col gap-2 sm:flex-row">
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          maxLength={120}
          placeholder="예) 서울 사는 30대인데 월세 지원 있나요"
          aria-label="받고 싶은 지원을 문장으로 적어 주세요"
          className="min-w-0 flex-1 rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none placeholder:text-slate-400 focus:border-brand"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-brand px-5 py-3 font-bold text-white transition hover:brightness-110"
        >
          찾아보기
        </button>
      </form>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {ASK_EXAMPLES.map((e) => (
          <li key={e}>
            <Link
              href={`/ask?q=${encodeURIComponent(e)}`}
              className="inline-block rounded-full border border-line bg-white px-3 py-1.5 text-xs text-slate-600 transition hover:border-brand hover:text-brand"
            >
              {e}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
