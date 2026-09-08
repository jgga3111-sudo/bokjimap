"use client";

import { useMemo, useState } from "react";
import {
  HOUSEHOLDS,
  ASSET_TIERS,
  calcTaxCredit,
  type AssetTier,
} from "@/lib/taxCredit";
import { won } from "@/lib/display";

/**
 * 근로장려금·자녀장려금 계산기.
 *
 * 산식은 전부 우리 수록 원문(조회수 23위 「근로·자녀장려금」)에서 온다.
 * `lib/taxCredit.ts` 머리말 참고.
 *
 * ── 하지 않는 것 ───────────────────────────────────────────────
 * **자격 판정을 하지 않는다.** 가구 유형과 재산 구간은 고르는 것이지 우리가
 * 맞히는 것이 아니다. "받을 수 있습니다"라고 쓰지 않는다(CLAUDE.md 3절).
 *
 * 넣은 값은 서버로 가지 않고 저장되지도 않는다.
 */

/** 만원 단위 입력. 음수·비수치·터무니없는 값은 null로 돌려 계산을 멈춘다. */
const num = (raw: string, max: number): number | null => {
  const t = raw.trim();
  if (t === "") return null;
  const v = Number(t);
  if (!Number.isFinite(v) || v < 0 || v > max) return null;
  return v;
};

export default function TaxCreditCalc() {
  const [grossRaw, setGrossRaw] = useState("1500");
  const [kidsRaw, setKidsRaw] = useState("0");
  const [hhId, setHhId] = useState(HOUSEHOLDS[1].id);
  const [asset, setAsset] = useState<AssetTier>("under17");

  const hh = HOUSEHOLDS.find((h) => h.id === hhId)!;

  /* 총급여액 등의 상한은 1억(=10,000만원)으로 잡는다. 자녀장려금이 7,000만원에서
     끝나므로 그 위는 전부 0이고, 자릿수 오타를 막는 구실도 한다 — 자가진단에서
     아홉 자리가 들어와 "중위소득 95471336%"가 나왔던 자리와 같다. */
  const gross = num(grossRaw, 10000);
  const kids = num(kidsRaw, 20);

  const result = useMemo(
    () =>
      gross === null || kids === null
        ? null
        : calcTaxCredit(gross, Math.floor(kids), hh, asset),
    [gross, kids, hh, asset],
  );

  const childNotApplicable = hh.child === null;

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-extrabold text-ink">내 장려금 계산해 보기</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        넣은 값은 이 브라우저 안에서만 계산되고 저장되지 않습니다.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">총급여액 등</span>
          <div className="mt-1 flex items-center gap-2">
            <input
              inputMode="decimal"
              value={grossRaw}
              onChange={(e) => setGrossRaw(e.target.value)}
              className="w-full rounded-lg border border-line px-3 py-2 text-sm"
              placeholder="예: 1500"
              aria-label="총급여액 등(만원)"
            />
            <span className="shrink-0 text-sm text-muted">만원</span>
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink">부양자녀 수</span>
          <div className="mt-1 flex items-center gap-2">
            <input
              inputMode="numeric"
              value={kidsRaw}
              onChange={(e) => setKidsRaw(e.target.value)}
              className="w-full rounded-lg border border-line px-3 py-2 text-sm"
              placeholder="0"
              aria-label="부양자녀 수"
            />
            <span className="shrink-0 text-sm text-muted">명</span>
          </div>
        </label>
      </div>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">가구 유형</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {HOUSEHOLDS.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => setHhId(h.id)}
              aria-pressed={h.id === hhId}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                h.id === hhId
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-slate-600 hover:border-brand"
              }`}
            >
              {h.label} 최대 {h.work.max}만원
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">
          가구원 재산 합계액
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {ASSET_TIERS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setAsset(t.id)}
              aria-pressed={t.id === asset}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                t.id === asset
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-slate-600 hover:border-brand"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      {result === null ? (
        <p className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          총급여액 등과 자녀 수를 넣으면 계산됩니다.
        </p>
      ) : asset === "over24" ? (
        /* 0원을 크게 띄우지 않는다. 금액이 0인 것과 신청 자체가 안 되는 것은
           다른 말이고, 원문도 "2.4억원 미만이면 신청할 수 있습니다"라고
           자격 쪽으로 적고 있다. */
        <p className="mt-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
          원문은 <strong>재산 합계액이 2.4억원 미만이면 신청할 수 있다</strong>고
          적고 있습니다. 2.4억원 이상일 때 어떻게 되는지는 원문에 없어 저희가
          계산하지 않습니다 — 국세청에 확인해 주세요.
        </p>
      ) : (
        <div className="mt-5 space-y-3">
          <div className="rounded-xl bg-brand-soft/50 px-4 py-3">
            <p className="text-sm text-slate-600">근로장려금 + 자녀장려금</p>
            <p className="mt-0.5 text-2xl font-extrabold text-brand">
              {won(result.total)}
            </p>
          </div>

          <dl className="overflow-hidden rounded-xl border border-line text-sm">
            <Row
              label="근로장려금"
              value={won(result.work)}
              hint={
                result.workZeroByIncome
                  ? `총급여액 등이 ${hh.work.end.toLocaleString("ko-KR")}만원을 넘어 ${hh.label} 가구는 0원입니다`
                  : `${hh.label} 가구 · 최대 ${hh.work.max}만원`
              }
            />
            <Row
              label="자녀장려금"
              value={childNotApplicable ? "해당 없음" : won(result.child)}
              hint={
                childNotApplicable
                  ? "원문의 자녀장려금은 홑벌이·맞벌이 가구만 적고 있습니다"
                  : `자녀 1인당 최대 100만원 · ${hh.child!.end.toLocaleString("ko-KR")}만원에서 소멸`
              }
              muted={childNotApplicable}
            />
            {result.assetRate === 0.5 && (
              <Row
                label="재산 감액"
                value={`${won(result.workRaw + result.childRaw)} → ${won(result.total)}`}
                hint="재산 1.7억 이상 ~ 2.4억 미만이면 50%만 지급됩니다"
              />
            )}
          </dl>

          <p className="text-xs leading-relaxed text-muted">
            <strong className="text-slate-600">
              이 금액은 원문의 산식에 넣어 저희가 계산한 값입니다.
            </strong>{" "}
            원 단위 아래는 반올림했습니다. &ldquo;총급여액 등&rdquo;에 무엇이
            들어가는지, 국세 체납액이 있으면 얼마가 충당되는지는 국세청이
            정합니다. 실제 수령액은 심사 뒤에 확정됩니다.
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
