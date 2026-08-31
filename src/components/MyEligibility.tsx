"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  forget,
} from "@/lib/myIncome";

/**
 * "이 사업, 나는 해당되나?" — 자가진단 결과와 이 사업의 기준을 맞대어 본다.
 *
 * **둘 중 하나만 그린다.**
 *   · 자가진단을 아직 안 했으면 → 하러 가는 버튼
 *   · 이미 했으면 → 비교 결과 (버튼은 안 그린다)
 * 처음엔 버튼을 상세 페이지 쪽에 두고 이 상자만 얹었더니, 결과가 있는 사람에게
 * 비교 결과와 "내 소득이 해당되는지 계산하기" 버튼이 나란히 떴다. 이미 답을
 * 보여 준 뒤에 같은 걸 또 하라고 권하는 꼴이다.
 *
 * 문구에 조심할 것 — 소득 한 가지만 본 결과다. 재산·연령·거주지 요건은 보지
 * 않았다. "대상입니다"라고 단정하면 신청했다가 떨어진 사람에게 우리가
 * 거짓말을 한 게 된다. **"소득 기준만"이라는 단서를 반드시 붙인다.**
 */
export default function MyEligibility({ percent }: { percent: number }) {
  const mine = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!mine) {
    return (
      <Link
        href="/check"
        className="mt-3 inline-block rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white hover:brightness-110"
      >
        내 소득이 해당되는지 계산하기 →
      </Link>
    );
  }

  const ok = mine.percent <= percent;

  return (
    <div
      className={`mt-3 rounded-lg border px-3.5 py-3 text-sm ${
        ok
          ? "border-emerald-200 bg-emerald-50 text-emerald-900"
          : "border-slate-200 bg-white text-slate-700"
      }`}
    >
      <p className="font-bold">
        {ok ? "✓ 소득 기준은 충족합니다" : "소득 기준을 넘습니다"}
      </p>
      <p className="mt-1 leading-relaxed">
        자가진단에서 {mine.household}인 가구 <strong>중위소득 {mine.percent}%</strong>
        로 나왔고, 이 사업 기준은 <strong>{percent}% 이하</strong>입니다.
      </p>
      <p className="mt-1.5 text-xs leading-relaxed opacity-80">
        {ok
          ? "소득 한 가지만 본 결과입니다. 재산·연령·거주지 요건은 각 사업의 공식 안내로 확인하세요."
          : "소득인정액은 월급과 다르고 공제 항목이 있어, 실제로는 해당될 수 있습니다. 애매하면 주민센터에 문의하세요."}
      </p>
      <p className="mt-2 text-xs">
        <Link href="/check" className="underline">
          다시 계산
        </Link>
        {" · "}
        <button type="button" onClick={forget} className="underline">
          내 결과 지우기
        </button>
        <span className="ml-1.5 opacity-70">({mine.savedOn} 저장)</span>
      </p>
    </div>
  );
}
