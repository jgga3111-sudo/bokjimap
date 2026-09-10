"use client";

import { useMemo, useState } from "react";
import {
  KPASS_TYPES,
  KPASS_REGIONS,
  MIN_RIDES,
  NORMAL_FARE_CAP,
  calcKpass,
} from "@/lib/kpass";
import { won } from "@/lib/display";

/**
 * K-패스 환급 계산기.
 *
 * ── 이 화면이 하지 않는 것 ─────────────────────────────────────
 * **자격 판정을 하지 않는다.** "당신은 청년입니다", "15회를 채웠으니
 * 받습니다" 같은 말은 쓰지 않는다. 넣은 값에 공단 표를 적용하면 얼마가
 * 되는지까지가 우리 몫이다(CLAUDE.md 3절). 유형은 고르는 것이지
 * 우리가 맞히는 것이 아니다.
 *
 * ── 3,000원 미만 이용분을 왜 따로 묻나 ─────────────────────────
 * 환급 유형이 셋인데 **일반형만 대상 금액이 다르다.** 공단 각주가
 * "일반형 : 3000원 미만 대중교통 이용내역 대상 / 플러스형 : 전체 이용내역
 * 대상"이라고 못 박고 있다. 시내버스·지하철만 타면 둘이 거의 같지만,
 * 광역버스가 섞이면 갈라진다.
 *
 * 그런데 이 값은 이용자가 대개 모른다. 그래서 **비워 둘 수 있게** 했고,
 * 비우면 일반형을 0으로 치지 않고 **"계산하지 않았다"고 적는다.** 0은
 * "없다"는 뜻이라 빈칸과 다르다 — 여기서 뭉개면 실제보다 적게 알려 준다.
 *
 * ── 입력은 브라우저 밖으로 나가지 않는다 ───────────────────────
 * 서버로 보내지 않고 저장도 하지 않는다. 새로고침하면 사라진다.
 */

/** 만원 단위로 받아 원으로 편다. 사람들은 "8만원"이라고 생각하지 8,0000이라 치지 않는다. */
const toWon = (manwon: string): number | null => {
  /* 쉼표·빈칸·「만원」을 걷는다 — TaxCreditCalc의 `num`과 같은 이유. */
  const t = manwon.replace(/[,\s]/g, "").replace(/만원?$/, "");
  if (t === "") return null;
  const v = Number(t);
  if (!Number.isFinite(v) || v < 0) return null;
  /* 세 자리(=1,000만원)를 넘는 교통비는 오타로 본다. 자가진단에서 아홉
     자리가 들어와 "중위소득 95471336%"가 나왔던 것과 같은 자리다. */
  if (v > 1000) return null;
  return Math.round(v * 10000);
};

export default function KpassCalc() {
  const [spendRaw, setSpendRaw] = useState("8");
  const [underRaw, setUnderRaw] = useState("");
  const [typeId, setTypeId] = useState(KPASS_TYPES[0].id);
  const [regionId, setRegionId] = useState(KPASS_REGIONS[0].id);

  const type = KPASS_TYPES.find((t) => t.id === typeId)!;
  const region = KPASS_REGIONS.find((r) => r.id === regionId)!;

  const spend = toWon(spendRaw);
  const under = toWon(underRaw);

  const result = useMemo(
    () => (spend === null ? null : calcKpass(spend, under, type, region)),
    [spend, under, type, region],
  );

  /* 3,000원 미만 이용분이 전체보다 클 수는 없다. 넣은 값이 어긋나면
     계산을 멈추고 그 사실만 알린다 — 조용히 고쳐서 계산하지 않는다. */
  const inconsistent = spend !== null && under !== null && under > spend;

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-extrabold text-ink">내 환급액 계산해 보기</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        넣은 값은 이 브라우저 안에서만 계산되고 저장되지 않습니다.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">
            월 대중교통 이용금액
          </span>
          <div className="mt-1 flex items-center gap-2">
            <input
              inputMode="decimal"
              value={spendRaw}
              onChange={(e) => setSpendRaw(e.target.value)}
              className="w-full rounded-lg border border-line px-3 py-2 text-sm"
              placeholder="예: 8"
              aria-label="월 대중교통 이용금액(만원)"
            />
            <span className="shrink-0 text-sm text-muted">만원</span>
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink">
            그중 1회 {NORMAL_FARE_CAP.toLocaleString("ko-KR")}원 미만 이용분
          </span>
          <div className="mt-1 flex items-center gap-2">
            <input
              inputMode="decimal"
              value={underRaw}
              onChange={(e) => setUnderRaw(e.target.value)}
              className="w-full rounded-lg border border-line px-3 py-2 text-sm"
              placeholder="모르면 비워 두세요"
              aria-label="3,000원 미만 이용분(만원)"
            />
            <span className="shrink-0 text-sm text-muted">만원</span>
          </div>
        </label>
      </div>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">유형</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {KPASS_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTypeId(t.id)}
              aria-pressed={t.id === typeId}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                t.id === typeId
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-slate-600 hover:border-brand"
              }`}
            >
              {t.label} {Math.round(t.rate * 100)}%
            </button>
          ))}
        </div>
        {type.note && (
          <p className="mt-2 text-xs leading-relaxed text-muted">{type.note}</p>
        )}
      </fieldset>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">사는 지역 구분</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {KPASS_REGIONS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRegionId(r.id)}
              aria-pressed={r.id === regionId}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                r.id === regionId
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-slate-600 hover:border-brand"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          우대·특별지원지역이 어디인지는 지자체마다 다릅니다. 내 지역이 어디에
          드는지는 아래 공식 안내에서 확인해 주세요.
        </p>
      </fieldset>

      {inconsistent ? (
        <p className="mt-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          3,000원 미만 이용분이 전체 이용금액보다 큽니다. 둘 중 하나를 다시
          확인해 주세요.
        </p>
      ) : result === null ? (
        <p className="mt-5 rounded-xl bg-sunken px-4 py-3 text-sm text-slate-600">
          월 이용금액을 넣으면 계산됩니다.
        </p>
      ) : (
        <div className="mt-5 space-y-3">
          <div className="rounded-xl bg-brand-soft/50 px-4 py-3">
            <p className="text-sm text-slate-600">
              가장 큰 환급 — <strong className="text-ink">{result.bestLabel}</strong>
            </p>
            <p className="mt-0.5 text-2xl font-extrabold text-brand">
              {won(result.best)}
            </p>
          </div>

          <dl className="overflow-hidden rounded-xl border border-line text-sm">
            <Row
              label={`기본형 (${Math.round(type.rate * 100)}%)`}
              value={won(result.basic)}
              hint={`${won(spend!)} × ${Math.round(type.rate * 100)}%`}
            />
            <Row
              label="플러스형"
              value={won(result.plus)}
              hint={`전체 이용분 − 기준금액 ${won(result.usedThreshold.plus)}`}
            />
            <Row
              label="일반형"
              value={result.normal === null ? "계산 안 함" : won(result.normal)}
              hint={
                result.normal === null
                  ? `3,000원 미만 이용분을 넣으면 계산됩니다 (기준금액 ${won(result.usedThreshold.normal)})`
                  : `3,000원 미만 이용분 − 기준금액 ${won(result.usedThreshold.normal)}`
              }
              muted={result.normal === null}
            />
          </dl>

          {/*
            숫자를 크게 띄운 바로 밑에 단서를 단다. 실업급여 글에서
            "6만 8,100원은 조문에 없는 숫자입니다"라고 밝힌 것과 같은 자리다.
          */}
          <p className="text-xs leading-relaxed text-muted">
            <strong className="text-slate-600">
              이 금액은 공단 표에 넣어 저희가 계산한 값입니다.
            </strong>{" "}
            원 단위 아래는 반올림했습니다. 실제 환급은 월 {MIN_RIDES}회 이상
            이용해야 하고, 세 유형 중 가장 유리한 것으로 자동 적용되어 다음 달에
            지급됩니다. 정확한 금액은 K-패스에서 확인해 주세요.
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
        <dd
          className={`text-sm font-bold ${muted ? "text-muted" : "text-ink"}`}
        >
          {value}
        </dd>
      </div>
      <p className="mt-0.5 text-xs text-muted">{hint}</p>
    </div>
  );
}
