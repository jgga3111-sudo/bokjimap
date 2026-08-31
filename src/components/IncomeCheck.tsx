"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BASE_YEAR,
  CUTOFFS,
  medianIncome,
  percentOfMedian,
  thresholdOf,
  incomeFromHealthPremium,
  healthPremiumFromIncome,
  HEALTH_INSURANCE,
} from "@/lib/midIncome";
import { won } from "@/lib/display";

type Mode = "monthly" | "annual" | "premium";

const MODES: { id: Mode; label: string; hint: string; unit: string }[] = [
  { id: "monthly", label: "월 소득", hint: "세전 월 소득", unit: "만원" },
  { id: "annual", label: "연봉", hint: "세전 연봉", unit: "만원" },
  {
    id: "premium",
    label: "건강보험료",
    hint: "직장가입자 본인부담 월 보험료",
    unit: "원",
  },
];

const TONE_BG: Record<string, string> = {
  rose: "bg-rose-500",
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
  sky: "bg-sky-500",
  slate: "bg-slate-400",
};

/**
 * 소득 자가진단.
 *
 * 우리나라 복지사업의 자격 기준은 대부분 "기준 중위소득 OO% 이하"다. 그래서
 * 가구원 수와 소득만 넣으면 내가 어느 구간인지가 바로 나온다.
 *
 * 한계를 화면에 그대로 적는다. 법정 기준은 소득이 아니라 소득인정액
 * (소득평가액 + 재산의 소득환산액)이다. 재산·부채·근로소득공제를 반영하지
 * 않은 이 계산은 1차 가늠일 뿐이다. "대상입니다"라고 단정하지 않는다.
 */
/** 기준선(퍼센트) → 그 기준을 쓴다고 원문에 적힌 서비스들. 서버에서 넘어온다. */
export type ServicesByPercent = Record<
  number,
  { id: string; name: string }[] | undefined
>;

export default function IncomeCheck({
  servicesByPercent = {},
}: {
  servicesByPercent?: ServicesByPercent;
}) {
  const [household, setHousehold] = useState(1);
  const [mode, setMode] = useState<Mode>("monthly");
  const [raw, setRaw] = useState("");

  const monthly = useMemo(() => {
    const n = Number(raw.replaceAll(",", ""));
    if (!raw.trim() || !Number.isFinite(n) || n <= 0) return null;
    if (mode === "monthly") return Math.round(n * 10_000);
    if (mode === "annual") return Math.round((n * 10_000) / 12);
    return incomeFromHealthPremium(n);
  }, [raw, mode]);

  const median = medianIncome(household);
  const pct = monthly === null ? null : percentOfMedian(household, monthly);

  /* 게이지는 200%까지만 그린다. 그 위는 어차피 대부분의 사업 밖이다. */
  const gaugePct = pct === null ? 0 : Math.min(pct, 200);
  const matched = CUTOFFS.filter((c) => pct !== null && pct <= c.percent);
  const current = MODES.find((m) => m.id === mode)!;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-line bg-white p-5">
        <label className="block text-sm font-bold text-ink">
          가구원 수
          <span className="ml-1.5 font-normal text-muted">
            (주민등록등본상 함께 사는 가족)
          </span>
        </label>
        {/*
          8인 이상을 "7+" 한 칸으로 뭉뚱그리면 안 된다. 8인 가구를 7인으로
          계산하면 기준 중위소득이 99만원 낮게 잡히고, 그만큼 내 비율이 높게
          나와 **대상인데 아니라고 판정된다.** medianIncome()은 고시 규칙으로
          8인 이상을 정확히 계산하므로, 8인부터는 증감 버튼으로 그대로 넘긴다.
        */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setHousehold(n)}
              aria-pressed={household === n}
              className={`h-10 w-12 rounded-lg border text-sm font-medium transition ${
                household === n
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-slate-600 hover:border-brand hover:text-brand"
              }`}
            >
              {n}인
            </button>
          ))}
          <button
            type="button"
            onClick={() => setHousehold((h) => Math.max(8, h + 1))}
            aria-pressed={household >= 8}
            className={`h-10 rounded-lg border px-3 text-sm font-medium transition ${
              household >= 8
                ? "border-brand bg-brand text-white"
                : "border-line bg-white text-slate-600 hover:border-brand hover:text-brand"
            }`}
          >
            8인 이상
          </button>
        </div>

        {household >= 8 && (
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setHousehold((h) => Math.max(1, h - 1))}
              aria-label="가구원 수 줄이기"
              className="h-9 w-9 rounded-lg border border-line text-lg leading-none text-slate-600 hover:border-brand hover:text-brand"
            >
              −
            </button>
            <span className="min-w-14 text-center text-sm font-bold">
              {household}인
            </span>
            <button
              type="button"
              onClick={() => setHousehold((h) => Math.min(20, h + 1))}
              aria-label="가구원 수 늘리기"
              className="h-9 w-9 rounded-lg border border-line text-lg leading-none text-slate-600 hover:border-brand hover:text-brand"
            >
              +
            </button>
          </div>
        )}

        <p className="mt-3 rounded-lg bg-brand-soft px-3 py-2 text-sm text-slate-700">
          {household}인 가구 {BASE_YEAR}년 기준 중위소득{" "}
          <strong className="text-brand">{won(median)}</strong>
        </p>

        <label className="mt-5 block text-sm font-bold text-ink">소득 입력</label>
        <div className="mt-2 flex gap-1.5">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setMode(m.id);
                setRaw("");
              }}
              aria-pressed={mode === m.id}
              className={`flex-1 rounded-lg border px-2 py-2 text-sm font-medium transition ${
                mode === m.id
                  ? "border-brand bg-brand-soft text-brand"
                  : "border-line bg-white text-slate-600 hover:border-brand"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg border border-line px-3 focus-within:border-brand">
          <input
            type="text"
            inputMode="numeric"
            value={raw}
            onChange={(e) => setRaw(e.target.value.replace(/[^\d,]/g, ""))}
            placeholder={
              mode === "premium"
                ? "예: 120000"
                : mode === "annual"
                  ? "예: 3600"
                  : "예: 250"
            }
            className="h-12 w-full bg-transparent text-lg outline-none"
            aria-label={current.hint}
          />
          <span className="shrink-0 text-sm text-muted">{current.unit}</span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-muted">
          {mode === "premium"
            ? `직장가입자 본인부담 건강보험료로 보수월액을 되짚습니다(${BASE_YEAR}년 요율 ${(
                HEALTH_INSURANCE.rate * 100
              ).toFixed(
                2,
              )}%의 절반). 지역가입자는 재산이 함께 반영돼 이 방식으로 계산할 수 없습니다.`
            : `${current.hint}을 만원 단위로 넣으세요.`}
        </p>
      </div>

      {monthly === null ? (
        <p className="rounded-xl border border-dashed border-line px-4 py-8 text-center text-sm text-muted">
          소득을 입력하면 기준 중위소득 대비 비율이 바로 계산됩니다.
        </p>
      ) : (
        <>
          <div className="rounded-2xl border border-line bg-white p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm text-muted">
                월 소득 {won(monthly)}
                {mode === "premium" && " (추정)"}
              </p>
              <p className="text-2xl font-extrabold text-brand">
                중위소득 {pct}%
              </p>
            </div>

            <div className="relative mt-6 mb-8 h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-brand transition-[width]"
                style={{ width: `${(gaugePct / 200) * 100}%` }}
              />
              {/* 눈금은 넉넉히 떨어진 것만. 32%와 50%를 같이 찍으면 좁은
                  화면에서 라벨이 겹쳐 읽히지 않는다. */}
              {[50, 100, 150].map((p) => (
                <span
                  key={p}
                  className="absolute top-4 -translate-x-1/2 text-[11px] text-slate-400"
                  style={{ left: `${(p / 200) * 100}%` }}
                >
                  <span className="absolute -top-4 left-1/2 h-3 w-px -translate-x-1/2 bg-slate-300" />
                  {p}%
                </span>
              ))}
            </div>

            {mode !== "premium" && (
              <p className="text-xs leading-relaxed text-muted">
                이 소득이면 직장가입자 건강보험료는 월{" "}
                {won(healthPremiumFromIncome(monthly))} 선입니다(본인부담,
                장기요양보험료 제외).
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-line bg-white p-5">
            <h2 className="font-bold text-ink">
              소득 기준으로는 여기까지 해당됩니다
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {household}인 가구 기준. 아래는 소득 요건만 본 결과이고, 각 사업은
              연령·재산·거주지 요건이 따로 있습니다.
            </p>

            <ul className="mt-4 space-y-2">
              {CUTOFFS.map((c) => {
                const limit = thresholdOf(household, c.percent);
                const hit = pct !== null && pct <= c.percent;
                const matches = servicesByPercent[c.percent] ?? [];
                return (
                  <li
                    key={c.percent}
                    className={`flex items-start gap-3 rounded-lg border px-3 py-2.5 ${
                      hit
                        ? "border-emerald-200 bg-emerald-50/60"
                        : "border-line bg-white opacity-55"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                        hit ? TONE_BG[c.tone] : "bg-slate-300"
                      }`}
                      aria-hidden
                    >
                      {hit ? "✓" : "·"}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink">
                        중위 {c.percent}%{c.label && ` · ${c.label}`}
                        <span className="ml-1.5 font-normal text-muted">
                          {won(limit)} 이하
                        </span>
                      </p>
                      {c.note && (
                        <p className="mt-0.5 text-xs text-muted">{c.note}</p>
                      )}
                      {/* 사업명은 우리가 붙이지 않는다. 각 사업의 선정기준
                          원문에 "중위소득 N%"가 적혀 있는 것만 링크한다. */}
                      {matches.length > 0 && (
                        <ul className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1">
                          {matches.slice(0, 4).map((m) => (
                            <li key={m.id}>
                              <Link
                                href={`/service/${m.id}`}
                                className="text-xs text-brand hover:underline"
                              >
                                {m.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {matched.length === 0 && (
              <p className="mt-4 rounded-lg bg-slate-50 px-3 py-3 text-sm leading-relaxed text-slate-600">
                소득 기준으로는 위 구간에 해당하지 않습니다. 다만 소득과 무관한
                지원(장애·보훈·다자녀·출산 등)이 많으니{" "}
                <Link href="/target" className="font-medium text-brand underline">
                  대상별 찾기
                </Link>
                를 확인해 보세요.
              </p>
            )}
          </div>
        </>
      )}

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
        <p className="font-bold">이 계산은 참고용입니다</p>
        <p className="mt-1">
          실제 심사는 소득이 아니라 <strong>소득인정액</strong>(소득평가액 +
          재산의 소득환산액)으로 합니다. 재산·부채·근로소득공제·부양의무자 기준이
          반영되지 않았으므로 결과가 실제 판정과 다를 수 있습니다. 정확한 판정은
          주민센터 또는 복지로 모의계산에서 받으세요.
        </p>
      </div>
    </div>
  );
}
