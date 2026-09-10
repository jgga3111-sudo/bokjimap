"use client";

import { useMemo, useState } from "react";
import {
  YS_TIERS,
  MONTHS,
  MONTHLY_CAP,
  calcYouthSavings,
} from "@/lib/youthSavings";
import { won } from "@/lib/display";

/**
 * 청년미래적금 계산기.
 *
 * 넣은 값은 서버로 가지 않고 저장되지도 않는다.
 * 근거와 한계는 `lib/youthSavings.ts` 머리말 참고 — 특히 **이자를 넣지
 * 않는다**는 것과 6,000만~7,500만 구간을 단정하지 않는다는 것.
 */
export default function YouthSavingsCalc() {
  const [manwonRaw, setManwonRaw] = useState("50");
  const [tierId, setTierId] = useState(YS_TIERS[0].id);

  const tier = YS_TIERS.find((t) => t.id === tierId)!;

  const monthly = useMemo(() => {
    /* 쉼표·빈칸·「만원」을 걷는다 — TaxCreditCalc의 `num`과 같은 이유. */
    const t = manwonRaw.replace(/[,\s]/g, "").replace(/만원?$/, "");
    if (t === "") return null;
    const v = Number(t);
    if (!Number.isFinite(v) || v <= 0) return null;
    /* 한도를 넘으면 조용히 깎지 않는다 — 넘었다는 사실을 알려야 한다. */
    return Math.round(v * 10000);
  }, [manwonRaw]);

  const overCap = monthly !== null && monthly > MONTHLY_CAP;
  const result = useMemo(
    () =>
      monthly === null || overCap ? null : calcYouthSavings(monthly, tier),
    [monthly, overCap, tier],
  );

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-extrabold text-ink">3년 뒤 얼마가 되나</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        넣은 값은 이 브라우저 안에서만 계산되고 저장되지 않습니다.
      </p>

      <label className="mt-4 block">
        <span className="text-sm font-medium text-ink">매월 납입액</span>
        <div className="mt-1 flex items-center gap-2 sm:max-w-xs">
          <input
            inputMode="decimal"
            value={manwonRaw}
            onChange={(e) => setManwonRaw(e.target.value)}
            className="w-full rounded-lg border border-line px-3 py-2 text-sm"
            placeholder="예: 50"
            aria-label="매월 납입액(만원)"
          />
          <span className="shrink-0 text-sm text-muted">만원</span>
        </div>
      </label>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">유형</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {YS_TIERS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTierId(t.id)}
              aria-pressed={t.id === tierId}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                t.id === tierId
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-slate-600 hover:border-brand"
              }`}
            >
              {t.label} {Math.round(t.rate * 100)}%
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">{tier.income}</p>
      </fieldset>

      {overCap ? (
        <p className="mt-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          원문은 <strong>매월 {won(MONTHLY_CAP)} 한도</strong>라고 적고 있습니다.
          그보다 큰 금액은 계산하지 않았습니다.
        </p>
      ) : result === null ? (
        <p className="mt-5 rounded-xl bg-sunken px-4 py-3 text-sm text-slate-600">
          매월 납입액을 넣으면 계산됩니다.
        </p>
      ) : (
        <div className="mt-5 space-y-3">
          <div className="rounded-xl bg-brand-soft/50 px-4 py-3">
            <p className="text-sm text-slate-600">
              {MONTHS}개월 뒤 — 원금 + 정부기여금
            </p>
            <p className="mt-0.5 text-2xl font-extrabold text-brand">
              {won(result.total)}
            </p>
          </div>

          <dl className="overflow-hidden rounded-xl border border-line text-sm">
            <Row
              label="내가 낸 돈"
              value={won(result.paid)}
              hint={`${won(Math.round(result.paid / MONTHS))} × ${MONTHS}개월`}
            />
            <Row
              label="정부기여금"
              value={won(result.bonus)}
              hint={
                tier.rate === 0
                  ? "이 유형은 기여금 없이 이자소득 비과세만 적용됩니다"
                  : `매월 납입금의 ${Math.round(tier.rate * 100)}%`
              }
              muted={tier.rate === 0}
            />
            <Row
              label="은행 이자"
              value="계산 안 함"
              hint="금리가 취급 은행마다 달라 넣지 않았습니다. 실제 수령액은 여기에 이자가 더해집니다"
              muted
            />
          </dl>

          <p className="text-xs leading-relaxed text-muted">
            <strong className="text-slate-600">
              이 금액은 저희가 계산한 값입니다.
            </strong>{" "}
            매월 같은 금액을 {MONTHS}개월 동안 빠짐없이 넣었다고 가정했습니다.
            자유적립식이라 실제로는 달마다 달라질 수 있고, 이자와 비과세 효과는
            빠져 있습니다.
          </p>
        </div>
      )}
    </section>
  );
}

function Row({
  label,
  value,
  hint,
  muted,
}: {
  label: string;
  value: string;
  hint: string;
  muted?: boolean;
}) {
  return (
    <div className="border-b border-line px-4 py-2.5 last:border-0">
      <div className="flex items-baseline justify-between gap-3">
        <dt className="text-sm text-slate-600">{label}</dt>
        <dd className={`text-sm font-bold ${muted ? "text-muted" : "text-ink"}`}>
          {value}
        </dd>
      </div>
      <p className="mt-0.5 text-xs text-muted">{hint}</p>
    </div>
  );
}
