"use client";

import { useSyncExternalStore } from "react";
import { subscribe, getSnapshot, getServerSnapshot } from "@/lib/myIncome";

/**
 * 목록 카드에 붙는 "내 소득 기준 해당" 표시.
 *
 * ── 왜 만들었나 ────────────────────────────────────────────────
 * 자가진단 결과는 이미 브라우저에 저장돼 있는데, 그걸 쓰는 곳이 **상세
 * 페이지 하나뿐**이었다(`MyEligibility`). 그래서 자가진단을 마친 사람도
 * 목록에서는 아무 도움을 못 받고, 900건을 하나씩 열어 봐야 했다.
 *
 * 선정기준 원문에 "중위소득 N%"가 적힌 사업이 219건인데, 조회수 상위
 * 100건 중에는 39건이다(2026-09-06 집계). 목록에서 두세 장에 한 장꼴로
 * 붙는다는 뜻이라, 표시할 값어치가 있다.
 *
 * ── 왜 '해당'만 그리고 '초과'는 안 그리나 ──────────────────────
 * 소득은 자격 요건의 **하나**일 뿐이다. 재산·연령·거주지·가구 형태를
 * 보지 않았는데 "당신은 안 됩니다"를 목록에 뿌리면, 실제로는 받을 수
 * 있는 사람을 돌려세우게 된다. 그건 이 사이트가 하지 않기로 한
 * 자격 판정이다(CLAUDE.md 3절).
 *
 * 그래서 **맞는 것에만 표시를 붙이고, 나머지는 아무 말도 하지 않는다.**
 * 표시가 없다고 안 되는 게 아니다 — 소득 기준이 원문에 안 적혀 있을
 * 뿐인 사업이 900건 중 681건이다.
 *
 * ── 서버에서는 아무것도 안 그린다 ──────────────────────────────
 * `getServerSnapshot`이 null을 주므로 정적 HTML에는 이 딱지가 없다.
 * 자가진단을 안 한 사람의 화면도 지금과 똑같다.
 */
export default function IncomeMatch({ percent }: { percent: number | null }) {
  const mine = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (percent === null || !mine) return null;
  if (mine.percent > percent) return null;

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-800"
      title={`자가진단에 넣은 소득(중위 ${mine.percent}%)이 이 사업의 기준(중위 ${percent}% 이하) 안에 듭니다. 소득 하나만 본 결과이고 재산·연령·거주지 요건은 보지 않았습니다.`}
    >
      <span aria-hidden>✓</span>내 소득 기준 해당
    </span>
  );
}
