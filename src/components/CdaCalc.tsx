"use client";

import { useState } from "react";
import {
  CDA_MATCH_BASE,
  CDA_MAX_SAVE,
  calcCda,
  monthsToEighteen,
} from "@/lib/cda";
import { won } from "@/lib/display";

/**
 * 디딤씨앗통장 만기 수령액 계산기 (2026-09-23).
 *
 * 이자를 뺀 원금만 센다. 운영기관이 공개한 만기 수령액 표 15칸과 전부 맞는
 * 것을 확인했다(`lib/cda.ts` 머리말). 자격 판정은 하지 않는다 — 대상인지는
 * 시·군·구가 정한다(CLAUDE.md 3절).
 */
const parse = (s: string): Date | null => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.getFullYear() === Number(m[1]) && d.getMonth() === Number(m[2]) - 1 ? d : null;
};

const AMOUNTS = [30_000, 50_000, 100_000, 200_000] as const;

export default function CdaCalc() {
  const [bornRaw, setBornRaw] = useState("");
  const [monthly, setMonthly] = useState<number>(50_000);

  const born = parse(bornRaw);
  const months = born ? monthsToEighteen(born, new Date()) : null;
  const r = months !== null ? calcCda(monthly, months) : null;

  const chip = (on: boolean) =>
    `rounded-full border px-3 py-1.5 text-sm transition ${
      on ? "border-brand bg-brand text-white" : "border-line bg-white text-slate-600 hover:border-brand"
    }`;

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-extrabold text-ink">태어난 날을 넣으면 얼마가 쌓이는지</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        넣은 값은 이 브라우저 안에서만 계산되고 저장되지 않습니다. 대상인지 아닌지는 계산하지 않습니다.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">아이가 태어난 날</span>
          <input
            type="date"
            value={bornRaw}
            onChange={(e) => setBornRaw(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-2 text-base tabular-nums outline-none focus:border-brand"
          />
        </label>
        <fieldset>
          <legend className="text-sm font-medium text-ink">매달 넣는 돈</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                aria-pressed={a === monthly}
                onClick={() => setMonthly(a)}
                className={chip(a === monthly)}
              >
                {won(a)}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            한 달에 {won(CDA_MAX_SAVE)}까지 넣을 수 있지만, 정부가 1:2로 얹어 주는 것은 {won(CDA_MATCH_BASE)}까지입니다.
          </p>
        </fieldset>
      </div>

      <div className="mt-5 space-y-3">
        {!born && (
          <p className="rounded-xl bg-sunken px-4 py-3 text-sm text-slate-600">
            태어난 날을 넣으면 18세가 되는 달까지 남은 개월수로 원금 합계를 세어 드립니다.
          </p>
        )}
        {born && r && r.months === 0 && (
          <p className="rounded-xl bg-sunken px-4 py-3 text-sm text-slate-600">
            이 날짜로는 이미 18세입니다. 정부 매칭은 18세가 되는 달까지입니다.
          </p>
        )}
        {born && r && r.months > 0 && (
          <>
            <div className="rounded-xl bg-brand-soft/50 px-4 py-3">
              <p className="text-sm text-slate-600">
                이번 달부터 18세가 되는 달까지 {r.months}개월 · 이자 제외
              </p>
              <p className="mt-0.5 text-2xl font-extrabold text-brand">모두 {won(r.total)}</p>
              <p className="mt-1 text-sm text-slate-600 tabular-nums">
                내가 넣는 돈 {won(r.child)} + 정부(지자체) {won(r.match)}
              </p>
            </div>
            <p className="rounded-xl border border-line bg-sunken px-4 py-3 text-sm leading-relaxed text-slate-600">
              정부 매칭금은 한 달에 {won(r.matchMonthly)}입니다.{" "}
              {monthly > CDA_MATCH_BASE && (
                <>
                  {won(CDA_MATCH_BASE)}을 넘게 넣은 몫({won(monthly - CDA_MATCH_BASE)})에는 매칭이 붙지 않습니다.{" "}
                </>
              )}
              곱셈은 저희가 계산한 값이고, 이자와 투자신탁 수익은 넣지 않았습니다.
            </p>
            <p className="text-xs leading-relaxed text-muted">
              정부 지원은 아이의 생일이 아니라 <strong>적립계좌 만기일이 속한 달</strong>까지입니다. 만기일은 통장마다
              달라서 여기서는 18세가 되는 달로 셌습니다. 정확한 달은 통장이나 관할 시·군·구청에서 확인하세요.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
