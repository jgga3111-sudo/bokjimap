import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { nameWithAlias } from "@/lib/aliases";
import {
  placeLabel,
  cycleLabel,
  payType,
  visiblePayTypes,
  won,
  periodLabel,
} from "@/lib/display";
import { thresholdOf, BASE_YEAR } from "@/lib/midIncome";
import { statedApplyPeriod } from "@/lib/applyPeriod";
import { leadOf } from "@/lib/leadSentence";
import DeadlineBadge from "@/components/DeadlineBadge";

export const metadata: Metadata = {
  title: "지원금 두 가지 나란히 보기",
  description:
    "고른 지원금 두 가지의 지원 대상·금액·신청 방법·소득 기준선을 원문 그대로 좌우로 놓고 봅니다.",
  /* `/find`·`/search`와 같은 이유로 색인시키지 않는다 — 고르는 조합마다 URL이
     생기므로 그대로 두면 「발견됨 – 색인 안 됨」에 스스로 더 얹는다. follow는 남긴다. */
  robots: { index: false, follow: true },
  alternates: { canonical: "/compare" },
};

/*
  왜 만들었나 (2026-09-16).

  09-16 경쟁 조사에서 **온통청년에만** 「정책 비교하기」가 있었다(2건을 좌우로 대조,
  로그인 없이). 복지맵도 카드마다 「비교」 단추를 둔다. 우리는 ☆ 저장은 있는데
  "둘 중 어느 쪽이 나에게 맞나"를 견줄 자리가 없었다.

  ── 우리 방식 ──────────────────────────────────────────────────
  · **값은 원문 그대로** 놓고 비교만 시킨다. 어느 쪽이 유리한지 판정하지 않는다(3절).
  · 새 URL이 색인되지 않게 noindex. 서버에서 고르고 클라이언트 번들은 안 늘린다.
  · 두 사업을 고르는 일은 이미 있는 목록·검색·관심 지원에서 한다 — 여기서는
    주소로 받은 둘을 그릴 뿐이다(`/compare?a=WLF…&b=WLF…`).
*/

const one = (v: string | string[] | undefined) =>
  (Array.isArray(v) ? v[0] : (v ?? "")).trim();

const find = (id: string) => services.find((s) => s.id === id);

/** 비교 표의 한 줄. 값이 둘 다 없으면 줄을 그리지 않는다. */
function Row({
  label,
  a,
  b,
}: {
  label: string;
  a: React.ReactNode;
  b: React.ReactNode;
}) {
  if (!a && !b) return null;
  return (
    <tr className="border-b border-line align-top">
      <th className="w-28 px-3 py-2 text-left text-xs font-semibold text-muted">
        {label}
      </th>
      <td className="px-3 py-2 text-sm text-slate-700">{a || <span className="text-muted">원문에 없음</span>}</td>
      <td className="px-3 py-2 text-sm text-slate-700">{b || <span className="text-muted">원문에 없음</span>}</td>
    </tr>
  );
}

export default async function ComparePage({
  searchParams,
}: PageProps<"/compare">) {
  const sp = await searchParams;
  const a = find(one(sp.a));
  const b = find(one(sp.b));

  /* a만 있을 때 — 상세에서 「나란히 보기」로 들어온 경우다. 같은 축에 든 사업을
     몇 개 권해서 한 번 더 고르게 한다. 권하는 기준은 조회수뿐이고 우열은 말하지 않는다. */
  if (a && !b) {
    const near = services
      .filter(
        (s) =>
          s.id !== a.id &&
          (s.lifeStages.some((v) => a.lifeStages.includes(v)) ||
            s.targets.some((v) => a.targets.includes(v)) ||
            s.department === a.department),
      )
      .slice(0, 8);
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <h1 className="text-2xl font-bold">무엇과 나란히 볼까요</h1>
        <p className="text-sm leading-relaxed text-slate-700">
          <Link href={`/service/${a.id}`} className="font-bold text-brand underline">
            {a.name}
          </Link>
          과(와) 견줄 지원을 하나 고르세요. 아래는 같은 대상·시기로 분류됐거나 담당이
          같은 사업을 조회수 순으로 여덟 개 뽑은 것입니다.
        </p>
        <ul className="space-y-1.5 text-sm">
          {near.map((s) => (
            <li key={s.id}>
              <Link
                href={`/compare?a=${a.id}&b=${s.id}`}
                className="text-brand underline hover:no-underline"
              >
                {s.name}
              </Link>
              <span className="text-muted"> · {placeLabel(s)}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted">
          여기 없는 사업과 견주려면{" "}
          <Link href="/search" className="underline hover:text-brand">
            검색
          </Link>
          이나{" "}
          <Link href="/saved" className="underline hover:text-brand">
            관심 지원
          </Link>
          에서 고른 뒤 그 상세에서 「나란히 보기」를 누르세요.
        </p>
      </div>
    );
  }

  if (!a || !b) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <h1 className="text-2xl font-bold">지원금 두 가지 나란히 보기</h1>
        <p className="text-sm leading-relaxed text-slate-700">
          비교할 지원금 두 가지를 고르면 지원 대상·금액·신청 방법을 좌우로 놓고
          볼 수 있습니다. 상세 페이지 아래쪽의 <strong>「다른 지원과 나란히 보기」</strong>
          에서 고르거나, 아래 목록에서 시작해 보세요.
        </p>
        <ul className="space-y-1 text-sm">
          <li>
            <Link href="/service" className="text-brand underline">
              전체 지원금 목록
            </Link>
          </li>
          <li>
            <Link href="/saved" className="text-brand underline">
              내가 저장한 관심 지원
            </Link>
          </li>
          <li>
            <Link href="/find" className="text-brand underline">
              조건으로 찾기
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  const periodA = statedApplyPeriod(a);
  const periodB = statedApplyPeriod(b);

  const line = (s: typeof a) => (
    <Link href={`/service/${s.id}`} className="font-bold text-brand underline">
      {nameWithAlias(s.id, s.name)}
    </Link>
  );
  /* 다른 목록과 같이 끝난 사업에는 「마감」을 붙인다 — 여기만 날짜만 보여 줬다(09-16 리뷰). */
  const head = (s: typeof a) => (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {line(s)}
      <DeadlineBadge id={s.id} />
    </span>
  );

  const income = (p: number | null) =>
    p === null ? null : (
      <>
        기준 중위소득 {p}% 이하
        <span className="mt-0.5 block text-xs text-muted">
          {BASE_YEAR}년 1인 {won(thresholdOf(1, p))} · 4인 {won(thresholdOf(4, p))}
        </span>
      </>
    );

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <nav aria-label="위치" className="text-xs text-muted">
        <Link href="/" className="hover:text-brand">
          홈
        </Link>
        {" › "}
        <span className="text-slate-600">나란히 보기</span>
      </nav>

      <header className="space-y-1">
        <h1 className="text-2xl font-bold">지원금 두 가지 나란히 보기</h1>
        <p className="text-sm leading-relaxed text-muted">
          아래 값은 <strong>복지로 원문 그대로</strong>입니다. 어느 쪽이 유리한지는
          저희가 정하지 않습니다 — 조건과 금액을 나란히 두고 직접 보세요.
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="border-y border-line bg-sunken text-left">
              <th className="w-28 px-3 py-2 text-xs font-semibold text-muted">항목</th>
              <th className="px-3 py-2 text-sm">{head(a)}</th>
              <th className="px-3 py-2 text-sm">{head(b)}</th>
            </tr>
          </thead>
          <tbody>
            {/* 지원 대상 첫 문장이다(leadOf가 eligibility를 읽는다). */}
            <Row label="지원 대상" a={leadOf(a)} b={leadOf(b)} />
            <Row label="지역" a={placeLabel(a)} b={placeLabel(b)} />
            <Row
              label="소득 기준선"
              a={income(a.medianPercent)}
              b={income(b.medianPercent)}
            />
            <Row
              label="지급 형태"
              a={visiblePayTypes(a.payTypes).map((v) => payType(v).label).join(" · ")}
              b={visiblePayTypes(b.payTypes).map((v) => payType(v).label).join(" · ")}
            />
            <Row label="주기" a={cycleLabel(a.cycle)} b={cycleLabel(b.cycle)} />
            <Row label="신청 기간" a={periodA?.text} b={periodB?.text} />
            <Row
              label="시행 기간"
              a={periodLabel(a.applyStart, a.applyEnd)}
              b={periodLabel(b.applyStart, b.applyEnd)}
            />
            <Row
              label="접수 방식"
              a={a.applyMethods.join(" · ")}
              b={b.applyMethods.join(" · ")}
            />
            <Row label="담당" a={a.department} b={b.department} />
            <Row
              label="문의"
              a={a.contacts[0]?.url}
              b={b.contacts[0]?.url}
            />
          </tbody>
        </table>
      </div>

      <p className="rounded-xl border border-line bg-white px-4 py-3 text-sm leading-relaxed text-slate-700">
        두 지원을 <strong>함께 받을 수 있는지</strong>는 이 표로 알 수 없습니다. 원문에
        중복 이야기가 적힌 사업이 많지 않기 때문입니다 —{" "}
        <Link href="/guide/combined-support" className="font-bold text-brand underline">
          두 가지를 같이 받을 수 있나
        </Link>
        에 법령·부처 지침으로 확인한 조합을 모아 두었습니다.
      </p>

      <p className="text-xs text-muted">
        전문은 각 상세에서 보세요 —{" "}
        <Link href={`/service/${a.id}`} className="underline hover:text-brand">
          {a.name}
        </Link>{" "}
        ·{" "}
        <Link href={`/service/${b.id}`} className="underline hover:text-brand">
          {b.name}
        </Link>
      </p>
    </div>
  );
}
