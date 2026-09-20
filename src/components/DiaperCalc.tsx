"use client";

import { useState } from "react";
import { DV_KINDS, DV_MONTHLY, calcDiaper, type DvKind } from "@/lib/diaperVoucher";
import { won } from "@/lib/display";

/**
 * 기저귀·조제분유 지원 개월수 계산기 (2026-09-21).
 *
 * 지침의 표를 그대로 세는 것이지 자격을 판정하지 않는다 — 소득·유형은
 * 보건소가 정한다(CLAUDE.md 3절). 근거와 한계는 `lib/diaperVoucher.ts` 머리말.
 */
const ymd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const parse = (s: string): Date | null => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.getFullYear() === Number(m[1]) && d.getMonth() === Number(m[2]) - 1 ? d : null;
};

const pretty = (d: Date) => `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

export default function DiaperCalc() {
  const [bornRaw, setBornRaw] = useState("");
  const [applyRaw, setApplyRaw] = useState("");
  const [kind, setKind] = useState<DvKind>("diaper");

  const born = parse(bornRaw);
  /* 신청일을 비워 두면 오늘로 본다. 브라우저가 판정하므로 배포 없이 날마다 움직인다. */
  const apply = applyRaw ? parse(applyRaw) : new Date();
  const r = born && apply ? calcDiaper(born, apply, kind) : null;

  const chip = (on: boolean) =>
    `rounded-full border px-3 py-1.5 text-left text-sm transition ${
      on ? "border-brand bg-brand text-white" : "border-line bg-white text-slate-600 hover:border-brand"
    }`;
  const field =
    "mt-2 w-full rounded-xl border border-line bg-white px-3 py-2 text-base tabular-nums outline-none focus:border-brand";

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-extrabold text-ink">신청일을 넣으면 몇 달치인지</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        넣은 값은 이 브라우저 안에서만 계산되고 저장되지 않습니다. 대상인지 아닌지는 계산하지 않습니다.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">아기가 태어난 날</span>
          <input
            type="date"
            value={bornRaw}
            onChange={(e) => setBornRaw(e.target.value)}
            className={field}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">신청하는 날</span>
          <input
            type="date"
            value={applyRaw}
            onChange={(e) => setApplyRaw(e.target.value)}
            placeholder={apply ? ymd(apply) : ""}
            className={field}
          />
          <span className="mt-1 block text-xs text-muted">
            비워 두면 오늘({apply ? pretty(apply) : "—"})로 셉니다.
          </span>
        </label>
      </div>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">받는 것</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {DV_KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              aria-pressed={k.id === kind}
              onClick={() => setKind(k.id)}
              className={chip(k.id === kind)}
            >
              {k.label} · 월 {won(DV_MONTHLY[k.id])}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          {DV_KINDS.find((k) => k.id === kind)!.who}
        </p>
      </fieldset>

      <div className="mt-5 space-y-3">
        {!born && (
          <p className="rounded-xl bg-sunken px-4 py-3 text-sm text-slate-600">
            태어난 날을 넣으면 지원 개월수와 총액을 지침의 표대로 세어 보여 드립니다.
          </p>
        )}
        {born && !r && (
          <p className="rounded-xl bg-sunken px-4 py-3 text-sm text-slate-600">
            날짜를 다시 확인해 주세요.
          </p>
        )}
        {r && !r.ok && (
          <p className="rounded-xl bg-sunken px-4 py-3 text-sm text-slate-600">
            {r.reason === "before"
              ? "신청하는 날이 태어난 날보다 앞섭니다."
              : "만 2년이 되는 날의 전날까지만 신청할 수 있습니다. 이 날짜로는 신청 기간이 지났습니다."}
          </p>
        )}
        {r && r.ok && (
          <>
            <div className="rounded-xl bg-brand-soft/50 px-4 py-3">
              <p className="text-sm text-slate-600">
                지원 개월수 — 태어난 날부터 {r.dayNo}일째 신청
              </p>
              <p className="mt-0.5 text-2xl font-extrabold text-brand">
                {r.months}개월 · 모두 {won(r.total)}
              </p>
            </div>
            {r.lost > 0 ? (
              <p className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
                태어난 날부터 <strong>60일 안({pretty(r.deadline)}까지)</strong>에 신청했다면 24개월분{" "}
                {won(DV_MONTHLY[kind])} × 24 = {won(DV_MONTHLY[kind] * 24)}이었습니다. 지금 날짜로는{" "}
                {won(r.lost)}만큼 적습니다.
              </p>
            ) : (
              <p className="rounded-xl border border-line bg-sunken px-4 py-3 text-sm leading-relaxed text-slate-600">
                60일 안에 드는 날짜입니다. 이 경우에만 24개월분을 전부 받습니다({pretty(r.deadline)}까지).
              </p>
            )}
            <p className="text-xs leading-relaxed text-muted">
              지침의 「신청일에 따른 지원금액」 표를 그대로 센 값입니다. 실제 결정은 관할 보건소가 신청 접수일로부터
              14일 안에 합니다.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
