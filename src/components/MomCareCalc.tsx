"use client";

import { useState } from "react";
import {
  MC_TYPES,
  MC_INCOMES,
  MC_TERMS,
  calcMomCare,
  type McIncome,
  type McTerm,
} from "@/lib/momCare";
import { won } from "@/lib/display";

/**
 * 산모·신생아 건강관리 본인부담 계산기 (2026-09-15).
 * 고르는 값뿐이라 입력 검증이 없다. 근거와 한계는 `lib/momCare.ts` 머리말.
 */
export default function MomCareCalc() {
  const [typeId, setTypeId] = useState(MC_TYPES[0].id);
  const [income, setIncome] = useState<McIncome>("tong");
  const [term, setTerm] = useState<McTerm>("std");
  const type = MC_TYPES.find((t) => t.id === typeId)!;
  const r = calcMomCare(type, income, term);

  const chip = (on: boolean) =>
    `rounded-full border px-3 py-1.5 text-left text-sm transition ${
      on ? "border-brand bg-brand text-white" : "border-line bg-white text-slate-600 hover:border-brand"
    }`;

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-extrabold text-ink">내가 내는 돈은 얼마인가</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        고른 값은 이 브라우저 안에서만 계산되고 저장되지 않습니다.
      </p>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">출산 유형</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {MC_TYPES.map((t) => (
            <button key={t.id} type="button" aria-pressed={t.id === typeId} onClick={() => setTypeId(t.id)} className={chip(t.id === typeId)}>
              {t.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          중증 장애인 산모는 단태아면 쌍태아 유형, 쌍태아면 삼태아 유형, 삼태아 이상이면 사태아 유형을 씁니다.
        </p>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">소득 구간</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {MC_INCOMES.map((x) => (
            <button key={x.id} type="button" aria-pressed={x.id === income} onClick={() => setIncome(x.id)} className={chip(x.id === income)}>
              {x.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">{MC_INCOMES.find((x) => x.id === income)!.who}</p>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">이용 기간</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {MC_TERMS.map((x, i) => (
            <button key={x.id} type="button" aria-pressed={x.id === term} onClick={() => setTerm(x.id)} className={chip(x.id === term)}>
              {x.label} {type.days[i]}일
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 space-y-3">
        <div className="rounded-xl bg-brand-soft/50 px-4 py-3">
          <p className="text-sm text-slate-600">
            본인부담금 — {type.label} · {r.days}일
          </p>
          <p className="mt-0.5 text-2xl font-extrabold text-brand">{won(r.mine)}</p>
        </div>
        <dl className="overflow-hidden rounded-xl border border-line text-sm">
          {[
            ["서비스 가격(기준가격)", won(r.price)],
            ["정부지원금", won(r.gov)],
            ["자율 가격 상품이면 더 낼 수 있는 최대", `${won(r.autonomousExtraMax)}까지`],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-2.5 last:border-0">
              <dt className="text-slate-600">{k}</dt>
              <dd className="font-bold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="text-xs leading-relaxed text-muted">
          <strong className="text-slate-600">가격과 정부지원금은 보건복지부 2026년 사업안내 표 그대로이고, 본인부담금은 그 차액을 저희가 계산한 값입니다.</strong>{" "}
          제공기관이 기준가격의 +5% 범위에서 자율 가격 상품을 운영하면 그만큼 더 낼 수 있어, 그 최대치를 따로 적었습니다.
          {income === "ra" && " 150% 초과 예외지원은 사는 시·도가 그 기준을 정해 승인한 경우에만 받습니다."}
        </p>
      </div>
    </section>
  );
}
