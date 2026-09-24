import Link from "next/link";
import type { ReactNode } from "react";
import type { WelfareService } from "@/types/welfare";
import type { HubNote } from "@/lib/hubNotes";
import { guideBySlug } from "@/lib/guides";
import { topBenefits } from "@/lib/hubMeta";
import { cycleLabel } from "@/lib/display";

/**
 * 허브 머리말 — **이 목록이 무엇인지**와 **읽는 법**을 먼저 말한다 (2026-09-16).
 *
 * 숫자 줄은 전부 그 허브의 실제 목록을 세어 만든다. 손으로 적은 수를 두지
 * 않는 이유는 guides.ts 머리말과 같다 — 수록이 바뀌면 조용히 틀려진다.
 * 문장(note)은 `lib/hubNotes.ts`에 허브마다 따로 적는다.
 *
 * "받을 수 있습니다"라고 쓰지 않는다. 여기서 세는 것은 **원문이 그 칸에
 * 무엇을 적어 두었나**이지 자격이 아니다(CLAUDE.md 3절).
 *
 * 09-17 주제·혜택·지역·소득 허브로 넓혔다. 주제 허브는 전부 중앙부처,
 * 지역 허브는 전부 지자체라 "중앙 0건은…" 같은 빈 문장이 나오지 않게
 * 구성에 따라 문장을 가른다. 소득 허브는 목록 전체가 기준선 한 가지라
 * 그 줄을 뺀다(`incomeLine={false}`).
 */
export default function HubIntro({
  axisLabel,
  fieldLabel,
  lead,
  list,
  note,
  incomeLine = true,
}: {
  /** 「청년」처럼 그 칸에 적힌 값 */
  axisLabel?: string;
  /** 「생애주기」·「지원 대상」 — 원문의 칸 이름 */
  fieldLabel?: string;
  /** 첫 문장을 바꿀 때. 없으면 「원문의 ○○ 칸 값이 …인 사업 N건」 */
  lead?: ReactNode;
  list: readonly WelfareService[];
  note: HubNote;
  /** 「소득 기준선이 한 가지로 적힌 사업은 N건」 줄 */
  incomeLine?: boolean;
}) {
  const total = list.length;
  if (total === 0) return null;

  const central = list.filter((s) => s.provider === "central").length;
  const local = total - central;

  const rankBy = (keys: (string | null)[], n = 3) => {
    const m = new Map<string, number>();
    for (const k of keys) if (k) m.set(k, (m.get(k) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
  };

  /* 지자체 사업이 어느 시·도에 몰려 있는지. 전국 공통(중앙)은 시·도가 없다. */
  /* 1건짜리끼리 늘어놓으면 "순으로 많다"가 거짓말이 된다(소득 허브에서 실제로 나왔다). */
  const sidoRank = rankBy(list.map((s) => (s.provider === "central" ? null : s.sidoName)));
  const topSido =
    sidoRank.length >= 2 && sidoRank[0][1] >= 2
      ? sidoRank.map(([name, n]) => `${name} ${n}건`).join(" · ")
      : "";

  /* 지역 허브(전부 한 시·도)에서는 시·군·구로 한 단계 더 내려 센다.
     교육청은 시·군·구 칸에 들어와 있지만 시·군·구가 아니라 따로 센다. */
  const oneSido = local === total && new Set(list.map((s) => s.sidoName)).size === 1;
  const isEdu = (s: WelfareService) => !!s.sigunguName?.endsWith("교육청");
  const edu = list.filter(isEdu).length;
  const sggList = list.filter((s) => s.sigunguName && !isEdu(s));
  const sggRank = rankBy(sggList.map((s) => s.sigunguName));
  const topSgg =
    sggRank.length >= 2
      ? sggRank.map(([name, n]) => `${name} ${n}건`).join(" · ")
      : "";

  const benefits = topBenefits(list, 3);
  const cycles = rankBy(list.map((s) => cycleLabel(s.cycle)), 2);
  const withLine = list.filter((s) => s.medianPercent != null).length;
  /* "받는 형태는 현금 486건, … 순이고, 지급 주기는 매월 지급 182건, … 순입니다."
     값이 하나뿐이고 전부 그것이면 "모두 …"로 쓴다 — "현금 10건 순"은 말이 안 된다. */
  const joinPairs = (p: [string, number][]) => p.map(([l, n]) => `${l} ${n}건`).join(", ");
  const benefitPairs = benefits.map((b): [string, number] => [b.label, b.count]);
  const allOne = (p: [string, number][]) => p.length === 1 && p[0][1] === total;
  const benefitText = allOne(benefitPairs)
    ? `받는 형태는 모두 ${benefitPairs[0][0]}`
    : `받는 형태는 ${joinPairs(benefitPairs)} 순`;
  const cycleText = allOne(cycles)
    ? `지급 주기는 모두 ${cycles[0][0]}`
    : cycles.length > 1
      ? `지급 주기는 ${joinPairs(cycles)} 순`
      : null;
  const formText =
    benefits.length === 0
      ? null
      : cycleText
        ? `${benefitText}이고, ${cycleText}입니다.`
        : `${benefitText}입니다.`;
  const guides = note.guides
    .map((slug) => guideBySlug(slug))
    .filter((g): g is NonNullable<ReturnType<typeof guideBySlug>> => !!g);

  return (
    <section className="card space-y-3 px-5 py-5 text-sm leading-relaxed text-slate-700 sm:px-7 sm:py-6">
      <h2 className="text-lg font-extrabold text-ink">이 목록은 이렇게 모았습니다</h2>

      <p>
        {lead ?? (
          <>
            복지로 원문의 <strong>{fieldLabel}</strong> 칸 값이 &ldquo;{axisLabel}
            &rdquo;인 사업 {total}건입니다.
          </>
        )}{" "}
        {local === 0 ? (
          <>전부 중앙부처 사업이라 사는 곳과 상관없이 전국에서 같은 기준으로 신청합니다.</>
        ) : oneSido && sggList.length === 0 ? (
          <>
            원문에 시·군·구가 적힌 사업은 없습니다.
            {edu > 0 && <> 교육청 사업은 {edu}건입니다.</>}
          </>
        ) : oneSido ? (
          <>
            원문에 시·군·구가 적힌 사업이 {sggList.length}건
            {topSgg && <>({topSgg} 순)</>}
            {edu > 0 && <>, 교육청 사업이 {edu}건</>}이고, 나머지{" "}
            {total - sggList.length - edu}건은 시·군·구 칸이 비어 있습니다.
            시·군·구 사업은 그곳에 주소가 있어야 신청할 수 있어, 같은 지역
            안에서도 사는 곳에 따라 해당하는 목록이 달라집니다.
          </>
        ) : central === 0 ? (
          <>
            전부 지자체 사업이라 그 지역에 주소가 있어야 신청할 수 있습니다
            {topSido && <> — 수록분에서는 {topSido} 순으로 많습니다</>}.
          </>
        ) : (
          <>
            중앙부처 사업 {central}건은 사는 곳과 상관없이 전국에서 같고,
            지자체 사업 {local}건은 그 지역에 주소가 있어야 신청할 수 있습니다
            {topSido && <> — 수록분에서는 {topSido} 순으로 많습니다</>}.
          </>
        )}
      </p>

      <p>
        {formText && <>{formText} </>}
        {incomeLine && (
          <>
            소득 기준선이 원문에 <strong>한 가지로</strong> 적힌 사업은{" "}
            {withLine}건이고, 나머지는 기준이 여럿이거나 문장으로만 적혀 있어
            상세에서 직접 읽어야 합니다.{" "}
          </>
        )}
        <Link href="/check" className="text-brand underline">
          1분 자가진단
        </Link>
        으로 내 소득이 기준선 어디쯤인지 먼저 계산해 볼 수 있습니다.
      </p>

      <p>{note.body}</p>

      {guides.length > 0 && (
        <p className="text-sm">
          <span className="font-semibold text-ink">함께 보면 좋은 글</span>{" "}
          {guides.map((g, i) => (
            <span key={g.slug}>
              {i > 0 && " · "}
              <Link
                href={`/guide/${g.slug}`}
                className="text-brand underline hover:no-underline"
              >
                {g.title}
              </Link>
            </span>
          ))}
        </p>
      )}
    </section>
  );
}
