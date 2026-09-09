"use client";

import { useState } from "react";
import Link from "next/link";
import { TARGETS, LIFE_STAGES } from "@/lib/axes";
import { SIDO_LIST } from "@/lib/regions";
import AxisIcon from "@/components/AxisIcon";

/**
 * 조건을 겹쳐서 좁히는 찾기 상자.
 *
 * ── 왜 필요했나 ────────────────────────────────────────────────
 * 우리는 축이 경쟁 사이트보다 많다(주제 15·대상 6·생애주기 7·혜택 7·지역 15).
 * 그런데 **축마다 페이지가 따로 있을 뿐 겹쳐서 좁힐 수가 없었다.** "청년이면서
 * 저소득"을 찾으려면 `/life/youth`에 들어가 눈으로 골라야 했다.
 * 해피나눔은 홈에서 생애주기·대상·지역을 한 번에 고르게 한다(docs/03).
 *
 * ── 겹쳐도 되는지 먼저 재 봤다 ─────────────────────────────────
 * 조합이 대부분 비면 필터가 고장난 것처럼 보인다. 생애주기 7 × 대상 6 =
 * 42개 조합을 세어 보니 **39개가 3건 이상**이고 0건은 2개뿐이었다
 * (2026-09-09). 그래서 만들 값어치가 있다.
 *
 * ── 이 컴포넌트는 데이터를 모른다 ──────────────────────────────
 * 축 목록(`axes.ts`·`regions.ts`)만 읽는다. 둘 다 아무것도 import하지 않는
 * 순수 데이터라 클라이언트 번들에 안전하다. **`@/data/services`(2.9MB)는
 * 절대 여기로 들어오면 안 된다** — 거르는 일은 서버(`/find`)가 한다.
 *
 * 그래서 이 상자는 건수를 미리 못 보여준다. 고르는 동안 "0건입니다"를
 * 알려 주려면 900건을 브라우저로 내려야 하는데, 그 대가가 너무 크다.
 */

/** 축 하나를 고르는 칩 줄. 고르지 않으면 그 축은 전체로 본다. */
function Row({
  title,
  items,
  value,
  onPick,
  withIcon = false,
}: {
  title: string;
  items: readonly { slug: string; label?: string; name?: string }[];
  value: string;
  onPick: (v: string) => void;
  withIcon?: boolean;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-ink">{title}</legend>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Chip on={value === ""} onClick={() => onPick("")}>
          전체
        </Chip>
        {items.map((a) => (
          <Chip
            key={a.slug}
            on={value === a.slug}
            onClick={() => onPick(value === a.slug ? "" : a.slug)}
          >
            {withIcon && (
              <AxisIcon slug={a.slug} className="h-4 w-4 shrink-0" />
            )}
            {a.label ?? a.name}
          </Chip>
        ))}
      </div>
    </fieldset>
  );
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ${
        on
          ? "border-brand bg-brand text-white"
          : "border-line bg-white text-slate-700 hover:border-brand"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * `/find`에서는 **지금 걸린 조건을 물고 시작해야 한다.** 안 그러면 청년·저소득
 * 결과를 보다가 지역만 더하려는데 앞서 고른 둘이 풀려 버린다(09-09에 실제로
 * 그랬다 — 결과는 67건인데 상자는 전부 "전체"였고 단추는 "전체 목록 보기"였다).
 * 첫 화면에서는 아무 값도 안 넘기므로 예전처럼 빈 상태로 시작한다.
 */
export default function AxisFinder({
  initialLife = "",
  initialTarget = "",
  initialRegion = "",
}: {
  initialLife?: string;
  initialTarget?: string;
  initialRegion?: string;
} = {}) {
  const [life, setLife] = useState(initialLife);
  const [target, setTarget] = useState(initialTarget);
  const [region, setRegion] = useState(initialRegion);

  const params = new URLSearchParams();
  if (life) params.set("life", life);
  if (target) params.set("target", target);
  if (region) params.set("region", region);

  const q = params.toString();
  const picked = [life, target, region].filter(Boolean).length;

  return (
    <div className="space-y-4">
      <Row
        title="생애주기"
        items={LIFE_STAGES}
        value={life}
        onPick={setLife}
        withIcon
      />
      {/* 대상에서 생애주기와 겹치는 일곱은 뺀다. `TARGETS`에는 생애주기가
          함께 들어 있어서(13개), 그대로 펴면 같은 칩이 두 줄에 나온다. */}
      <Row
        title="대상·상황"
        items={TARGETS.filter(
          (t) => !LIFE_STAGES.some((l) => l.slug === t.slug),
        )}
        value={target}
        onPick={setTarget}
        withIcon
      />
      <Row title="지역" items={SIDO_LIST} value={region} onPick={setRegion} />

      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
        <Link
          href={q ? `/find?${q}` : "/service"}
          className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
        >
          {picked > 0 ? `조건 ${picked}개로 찾기 →` : "전체 목록 보기 →"}
        </Link>
        {picked > 0 && (
          <button
            type="button"
            onClick={() => {
              setLife("");
              setTarget("");
              setRegion("");
            }}
            className="text-sm text-muted underline hover:text-brand"
          >
            고른 것 지우기
          </button>
        )}
      </div>

      <p className="text-xs leading-relaxed text-muted">
        고르지 않은 항목은 전체로 봅니다. 지역을 고르면 그 지역 사업과 전국
        공통 사업이 함께 나옵니다.
      </p>
    </div>
  );
}
