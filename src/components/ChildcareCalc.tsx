"use client";

import { useState } from "react";
import {
  CS_SERVICES,
  CS_TIERS,
  calcChildcare,
  type CsAge,
  type CsService,
  type CsTier,
  type CsTime,
} from "@/lib/childcareService";
import { won } from "@/lib/display";

/**
 * 아이돌봄서비스 본인부담 계산기 (2026-09-17). 근거와 한계는 `lib/childcareService.ts` 머리말.
 * 시간은 30분 단위라, 0.5의 배수가 아니면 계산하지 않고 그렇게 말한다.
 */
export default function ChildcareCalc() {
  const [service, setService] = useState<CsService>("basic");
  const [tier, setTier] = useState<CsTier>("na");
  const [age, setAge] = useState<CsAge>("A");
  const [time, setTime] = useState<CsTime>("day");
  const [hoursText, setHoursText] = useState("40");

  const raw = hoursText.replace(/[,\s]|시간/g, "");
  const hours = Number(raw);
  const hoursOk = raw !== "" && Number.isFinite(hours) && hours > 0 && hours <= 744 && Number.isInteger(hours * 2);
  const r = hoursOk ? calcChildcare(service, tier, age, time, hours) : null;

  const chip = (on: boolean) =>
    `rounded-full border px-3 py-1.5 text-left text-sm transition ${
      on ? "border-brand bg-brand text-white" : "border-line bg-white text-slate-600 hover:border-brand"
    }`;

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-extrabold text-ink">한 달에 내는 돈은 얼마인가</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        아이 한 명을 돌볼 때 기준입니다. 고른 값은 이 브라우저 안에서만 계산되고 저장되지 않습니다.
      </p>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">서비스</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {CS_SERVICES.map((x) => (
            <button key={x.id} type="button" aria-pressed={x.id === service} onClick={() => setService(x.id)} className={chip(x.id === service)}>
              {x.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">{CS_SERVICES.find((x) => x.id === service)!.note}</p>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">정부지원 유형</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {CS_TIERS.map((x) => (
            <button key={x.id} type="button" aria-pressed={x.id === tier} onClick={() => setTier(x.id)} className={chip(x.id === tier)}>
              {x.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">{CS_TIERS.find((x) => x.id === tier)!.who}</p>
      </fieldset>

      {service !== "infant" && (
        <fieldset className="mt-4">
          <legend className="text-sm font-medium text-ink">아이 나이 (그해 1월 1일 기준)</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" aria-pressed={age === "A"} onClick={() => setAge("A")} className={chip(age === "A")}>
              만 7세 미만 (A형)
            </button>
            <button type="button" aria-pressed={age === "B"} onClick={() => setAge("B")} className={chip(age === "B")}>
              만 7세 이상 (B형)
            </button>
          </div>
        </fieldset>
      )}

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">이용 시간대</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          <button type="button" aria-pressed={time === "day"} onClick={() => setTime("day")} className={chip(time === "day")}>
            평일 주간
          </button>
          <button type="button" aria-pressed={time === "night"} onClick={() => setTime("night")} className={chip(time === "night")}>
            밤 10시~아침 6시 또는 일요일·공휴일
          </button>
        </div>
      </fieldset>

      <label className="mt-4 block">
        <span className="text-sm font-medium text-ink">한 달 이용 시간</span>
        <span className="mt-2 flex items-center gap-2">
          <input
            inputMode="decimal"
            value={hoursText}
            onChange={(e) => setHoursText(e.target.value)}
            className="w-28 rounded-lg border border-line px-3 py-2 text-right tabular-nums"
          />
          <span className="text-sm text-slate-600">시간</span>
        </span>
      </label>

      <div className="mt-5 space-y-3">
        {r ? (
          <>
            <div className="rounded-xl bg-brand-soft/50 px-4 py-3">
              <p className="text-sm text-slate-600">본인부담금 — {hours}시간</p>
              <p className="mt-0.5 text-2xl font-extrabold text-brand">{won(r.mine)}</p>
            </div>
            <dl className="overflow-hidden rounded-xl border border-line text-sm">
              {[
                ["이용요금", won(r.fee)],
                ["정부지원금", won(r.gov)],
                ["1시간당 본인부담", won(r.perHourMine)],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-2.5 last:border-0">
                  <dt className="text-slate-600">{k}</dt>
                  <dd className="font-bold text-ink tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
            {r.overCap > 0 && (
              <p className="text-xs leading-relaxed text-slate-600">
                영아종일제 정부지원은 한 달 200시간까지라, 넘는 {r.overCap}시간은 요금 전액을 본인부담으로 셈했습니다.
              </p>
            )}
          </>
        ) : (
          <p className="rounded-xl bg-sunken px-4 py-3 text-sm text-slate-600">
            시간은 30분 단위 숫자로 넣어 주세요(예: 40 또는 12.5). 한 달 744시간까지 계산합니다.
          </p>
        )}
        <p className="text-xs leading-relaxed text-muted">
          <strong className="text-slate-600">30분당 요금과 정부지원금은 아이돌봄 누리집 이용요금표 그대로이고, 시간을 곱한 값은 저희가 계산한 값입니다.</strong>{" "}
          다자녀·인구감소지역 추가 할인, 한부모 등 가정의 가형 추가 지원, 아이 둘 이상을 함께 맡길 때의 할인은 넣지 않았습니다.
          정부지원은 한 해 960시간까지이고, 넘는 시간은 전액 본인부담입니다.
        </p>
      </div>
    </section>
  );
}
