"use client";

import { useState } from "react";
import { calcSelfSupportBonus, SSB_TOTAL } from "@/lib/selfSupportBonus";
import { won } from "@/lib/display";

/**
 * 자활성공지원금 회차별 날짜 계산기 (2026-09-23).
 *
 * 지침 8쪽의 「역에 의한 계산」을 그대로 센다 — 지침이 든 예(’25.6.15. 취업 →
 * 1회차 ’25.12.14., 2회차 ’26.6.14.)와 값이 같은 것을 확인했다. 지났는지는
 * 브라우저가 오늘로 판정하므로 배포 없이 날마다 움직인다.
 * 자격 판정은 하지 않는다 — 요건을 갖췄는지는 시·군·구가 정한다(CLAUDE.md 3절).
 */
const parse = (s: string): Date | null => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.getFullYear() === Number(m[1]) && d.getMonth() === Number(m[2]) - 1 ? d : null;
};

const pretty = (d: Date) => `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

export default function SelfSupportBonusCalc() {
  const [raw, setRaw] = useState("");
  const start = parse(raw);
  const rounds = start ? calcSelfSupportBonus(start, new Date()) : null;

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-extrabold text-ink">언제까지 일하면 회차가 차는지</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        넣은 값은 이 브라우저 안에서만 계산되고 저장되지 않습니다. 요건을 갖췄는지는 계산하지 않습니다.
      </p>

      <label className="mt-4 block sm:max-w-xs">
        <span className="text-sm font-medium text-ink">취업한 날 (창업이면 사업자등록일)</span>
        <input
          type="date"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-2 text-base tabular-nums outline-none focus:border-brand"
        />
      </label>

      <div className="mt-5 space-y-3">
        {!rounds && (
          <p className="rounded-xl bg-sunken px-4 py-3 text-sm text-slate-600">
            취업한 날을 넣으면 1회차·2회차 날짜를 지침의 계산 방식대로 세어 드립니다.
          </p>
        )}
        {rounds && (
          <>
            {rounds.map((r) => (
              <div
                key={r.round}
                className={`rounded-xl px-4 py-3 ${r.reached ? "bg-brand-soft/50" : "border border-line bg-sunken"}`}
              >
                <p className="text-sm text-slate-600">
                  {r.round}회차 · {r.months}개월 근속 · {won(r.amount)}
                </p>
                <p className={`mt-0.5 text-lg font-extrabold ${r.reached ? "text-brand" : "text-ink"}`}>
                  {pretty(r.until)}까지 근속
                </p>
                <p className="mt-0.5 text-sm text-slate-600">
                  {r.reached ? "이 날은 이미 지났습니다." : "아직 이 날이 오지 않았습니다."}
                </p>
              </div>
            ))}
            <p className="rounded-xl border border-line bg-sunken px-4 py-3 text-sm leading-relaxed text-slate-600">
              두 회차를 다 채우면 모두 {won(SSB_TOTAL)}입니다. 1회차를 받지 않고 있다가 2회차 때{" "}
              <strong>두 회차를 한 번에 신청</strong>해도 됩니다. 신청할 때 재직 중이 아니어도, 그 날까지 근속한
              사실만 있으면 됩니다.
            </p>
            <p className="text-xs leading-relaxed text-muted">
              지침 8쪽 「역에 의한 계산」(근무시작일부터 최후의 월에서 기산일의 전일까지)을 그대로 센 값입니다.
              실제 지급 여부는 시·군·구가 정하고, 처리기간은 30일(연장 시 60일)입니다.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
