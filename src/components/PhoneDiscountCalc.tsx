"use client";

import { useMemo, useState } from "react";
import { PD_TYPES, calcPhoneDiscount, type PdKind } from "@/lib/phoneDiscount";
import { won } from "@/lib/display";

/**
 * 휴대폰 요금감면 계산기 (2026-09-13).
 *
 * 넣은 값은 서버로 가지 않고 저장되지도 않는다. 계산식과 한계는
 * `lib/phoneDiscount.ts` 머리말 — 특히 생계·의료급여의 26,000원 초과 구간은
 * 고시 문장으로 한 수를 못 정해 **범위**로 보여준다는 것.
 */

/** 한 달 휴대폰 요금으로 넣을 수 있는 상한. 오타(0 하나 더)를 걸러 내는 선이다. */
const BILL_MAX = 500_000;

export default function PhoneDiscountCalc() {
  const [raw, setRaw] = useState("55000");
  const [kind, setKind] = useState<PdKind>("livelihood");
  const type = PD_TYPES.find((t) => t.kind === kind)!;

  const bill = useMemo(() => {
    /* 쉼표·빈칸·「원」을 걷는다 — 다른 계산기와 같은 규칙. */
    const t = raw.replace(/[,\s]/g, "").replace(/원$/, "");
    if (t === "" || !/^\d+$/.test(t)) return null;
    return Number(t);
  }, [raw]);

  const over = bill !== null && bill > BILL_MAX;
  const result = bill === null || over ? null : calcPhoneDiscount(kind, bill);

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-extrabold text-ink">내 요금이면 얼마가 깎이나</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        넣은 값은 이 브라우저 안에서만 계산되고 저장되지 않습니다.
      </p>

      <label className="mt-4 block">
        <span className="text-sm font-medium text-ink">한 달 요금</span>
        <span className="block text-xs text-muted">
          요금제 월정액(기본료)과 음성·데이터 통화료의 합. 단말기 할부금·부가서비스·소액결제는
          빼고 넣으세요.
        </span>
        <div className="mt-1 flex items-center gap-2 sm:max-w-xs">
          <input
            inputMode="numeric"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            className="w-full rounded-lg border border-line px-3 py-2 text-sm"
            placeholder="예: 55000"
            aria-label="한 달 요금(원)"
          />
          <span className="shrink-0 text-sm text-muted">원</span>
        </div>
      </label>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">감면 유형</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PD_TYPES.map((t) => (
            <button
              key={t.kind}
              type="button"
              onClick={() => setKind(t.kind)}
              aria-pressed={t.kind === kind}
              className={`rounded-full border px-3 py-1.5 text-left text-sm transition ${
                t.kind === kind
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-slate-600 hover:border-brand"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      {over ? (
        <p className="mt-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          한 달 요금으로 {won(BILL_MAX)}보다 큰 금액은 계산하지 않았습니다. 숫자를 다시
          확인해 주세요.
        </p>
      ) : result === null ? (
        <p className="mt-5 rounded-xl bg-sunken px-4 py-3 text-sm text-slate-600">
          한 달 요금을 숫자로 넣으면 계산됩니다.
        </p>
      ) : (
        <div className="mt-5 space-y-3">
          <div className="rounded-xl bg-brand-soft/50 px-4 py-3">
            <p className="text-sm text-slate-600">한 달 감면액</p>
            {"exact" in result ? (
              <p className="mt-0.5 text-2xl font-extrabold text-brand">{won(result.exact)}</p>
            ) : (
              <p className="mt-0.5 text-2xl font-extrabold text-brand">
                {won(result.low)} ~ {won(result.high)}
              </p>
            )}
            {type.max !== null && (
              <p className="mt-1 text-xs text-muted">복지로 원문의 월 최대 감면액 {won(type.max)}</p>
            )}
          </div>
          {"low" in result && (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
              고시는 이 유형에 「월정액 26,000원 한도 면제, 음성·데이터 통화료 50% 감면」이라고만
              적습니다. 26,000원을 넘는 월정액에도 50%가 적용되는지는 문장에 없어 한 수로
              정하지 않았습니다. 정확한 금액은 통신사(휴대폰으로 국번 없이 1523)에 확인하세요.
            </p>
          )}
          <p className="text-xs leading-relaxed text-muted">
            <strong className="text-slate-600">이 금액은 저희가 고시 문장대로 계산한 값입니다.</strong>{" "}
            {type.ruleRef}: &ldquo;{type.rule}&rdquo;
          </p>
        </div>
      )}
    </section>
  );
}
