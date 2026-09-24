"use client";

import { useState } from "react";
import { AS_BANDS, AS_INCOMES, copayOf } from "@/lib/activitySupport";
import { won } from "@/lib/display";

/**
 * 장애인활동지원 본인부담금 계산기 (2026-09-25).
 * 고르는 값뿐이라 입력 검증이 없다. 근거와 한계는 `lib/activitySupport.ts` 머리말.
 */
export default function ActivitySupportCalc() {
  const [band, setBand] = useState(12);
  const [incId, setIncId] = useState("m120");
  const b = AS_BANDS.find((x) => x.band === band)!;
  const inc = AS_INCOMES.find((x) => x.id === incId)!;
  const copay = copayOf(b.limit, inc);

  const chip = (on: boolean) =>
    `rounded-full border px-3 py-1.5 text-left text-sm transition ${
      on ? "border-brand bg-brand text-white" : "border-line bg-white text-slate-600 hover:border-brand"
    }`;

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-extrabold text-ink">내 구간이면 매달 얼마를 내나</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        고른 값은 이 브라우저 안에서만 계산되고 저장되지 않습니다.
      </p>

      <label className="mt-4 block text-sm font-medium text-ink" htmlFor="as-band">
        활동지원급여 구간 <span className="font-normal text-muted">(결정통지서에 적혀 있습니다)</span>
      </label>
      <select
        id="as-band"
        value={band}
        onChange={(e) => setBand(Number(e.target.value))}
        className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm"
      >
        {AS_BANDS.map((x) => (
          <option key={x.band} value={x.band}>
            {x.band}구간 — 종합점수 {x.min}점 이상{x.max ? ` ${x.max}점 미만` : ""}
          </option>
        ))}
      </select>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">소득 구분</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {AS_INCOMES.map((x) => (
            <button key={x.id} type="button" aria-pressed={x.id === incId} onClick={() => setIncId(x.id)} className={chip(x.id === incId)}>
              {x.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          중위소득 구간은 본인과 배우자의 건강보험료(신청일이 속한 달의 전달)와 가구원 수로 시·군·구가
          정합니다.
        </p>
      </fieldset>

      <div className="mt-5 space-y-3">
        <div className="rounded-xl bg-brand-soft/50 px-4 py-3">
          <p className="text-sm text-slate-600">매달 내는 본인부담금</p>
          <p className="mt-0.5 text-2xl font-extrabold text-brand">{copay === 0 ? "면제" : won(copay)}</p>
          <p className="mt-1 text-xs text-muted">
            {inc.rate === null
              ? inc.flat
                ? "정액"
                : "생계·의료급여 수급자는 본인부담금이 없습니다"
              : `월 한도액 × ${Math.round(inc.rate * 100)}%, 100원 미만 버림${copay === 216_200 ? " · 상한 216,200원에 걸림" : ""}`}
          </p>
        </div>
        <dl className="overflow-hidden rounded-xl border border-line text-sm">
          {[
            ["월 한도액(바우처)", won(b.limit)],
            ["정부지원금", won(b.limit - copay)],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-2.5 last:border-0">
              <dt className="text-slate-600">{k}</dt>
              <dd className="font-bold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="text-xs leading-relaxed text-muted">
          <strong className="text-slate-600">이 금액은 저희가 지침의 월 한도액과 본인부담률로 계산한 값입니다.</strong>{" "}
          지침 78쪽 조견표와 모든 칸이 같게 나오는 것을 확인했습니다. 가족인 활동지원사를 쓰는 경우(월
          한도액 50% 감산)와 발달장애인 주간활동 확장형 이용자는 금액이 달라 계산하지 않았습니다.
        </p>
      </div>
    </section>
  );
}
