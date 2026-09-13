"use client";

import { useState } from "react";
import {
  MV_TIERS,
  MV_BANDS,
  MV_SESSIONS,
  calcMentalVoucher,
} from "@/lib/mentalVoucher";
import { won } from "@/lib/display";

/**
 * 정신건강 심리상담 바우처 본인부담 계산기 (2026-09-13).
 * 고르는 값뿐이라 입력 검증이 없다. 근거와 한계는 `lib/mentalVoucher.ts` 머리말.
 */
export default function MentalVoucherCalc() {
  const [tierId, setTierId] = useState(MV_TIERS[0].id);
  const [bandId, setBandId] = useState(MV_BANDS[1].id);
  const tier = MV_TIERS.find((t) => t.id === tierId)!;
  const band = MV_BANDS.find((b) => b.id === bandId)!;
  const r = calcMentalVoucher(tier, band);

  const chip = (on: boolean) =>
    `rounded-full border px-3 py-1.5 text-left text-sm transition ${
      on ? "border-brand bg-brand text-white" : "border-line bg-white text-slate-600 hover:border-brand"
    }`;

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-extrabold text-ink">상담 {MV_SESSIONS}회, 내 부담은 얼마인가</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        고른 값은 이 브라우저 안에서만 계산되고 저장되지 않습니다.
      </p>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">상담사 유형</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {MV_TIERS.map((t) => (
            <button key={t.id} type="button" aria-pressed={t.id === tierId} onClick={() => setTierId(t.id)} className={chip(t.id === tierId)}>
              {t.label} · 1회 {won(t.price)}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">소득 구간</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {MV_BANDS.map((b) => (
            <button key={b.id} type="button" aria-pressed={b.id === bandId} onClick={() => setBandId(b.id)} className={chip(b.id === bandId)}>
              {b.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          구간은 신청일 기준 전월 건강보험료 부과액으로 산정한다고 원문에 적혀 있습니다. 어느 구간인지는
          주민센터·보건소가 정합니다.
        </p>
      </fieldset>

      {r === null ? (
        <p className="mt-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
          {band.note} 신청할 주민센터나 보건소, 사회서비스 전자바우처(1566-3232)에 확인해 주세요.
        </p>
      ) : (
        <div className="mt-5 space-y-3">
          <div className="rounded-xl bg-brand-soft/50 px-4 py-3">
            <p className="text-sm text-slate-600">{MV_SESSIONS}회 모두 이용했을 때 내가 내는 돈</p>
            <p className="mt-0.5 text-2xl font-extrabold text-brand">{won(r.mineTotal)}</p>
            <p className="mt-1 text-xs text-muted">1회 {won(r.perSession)} × {MV_SESSIONS}회</p>
          </div>
          <dl className="overflow-hidden rounded-xl border border-line text-sm">
            {[
              ["정부 지원", won(r.govTotal)],
              ["서비스 단가 합계", won(r.total)],
              ["본인부담률", `${Math.round((band.rate ?? 0) * 100)}%`],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-2.5 last:border-0">
                <dt className="text-slate-600">{k}</dt>
                <dd className="font-bold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="text-xs leading-relaxed text-muted">
            <strong className="text-slate-600">이 금액은 저희가 원문 단가와 본인부담률로 계산한 값입니다.</strong>{" "}
            {MV_SESSIONS}회를 모두 같은 유형으로 이용했다고 가정했습니다.
          </p>
        </div>
      )}
    </section>
  );
}
