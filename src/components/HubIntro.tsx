import Link from "next/link";
import type { WelfareService } from "@/types/welfare";
import type { HubNote } from "@/lib/hubNotes";
import { guideBySlug } from "@/lib/guides";
import { topBenefits } from "@/lib/hubMeta";

/**
 * 허브 머리말 — **이 목록이 무엇인지**와 **읽는 법**을 먼저 말한다 (2026-09-16).
 *
 * 숫자 줄은 전부 그 허브의 실제 목록을 세어 만든다. 손으로 적은 수를 두지
 * 않는 이유는 guides.ts 머리말과 같다 — 수록이 바뀌면 조용히 틀려진다.
 * 문장(note)은 `lib/hubNotes.ts`에 허브마다 따로 적는다.
 *
 * "받을 수 있습니다"라고 쓰지 않는다. 여기서 세는 것은 **원문이 그 칸에
 * 무엇을 적어 두었나**이지 자격이 아니다(CLAUDE.md 3절).
 */
export default function HubIntro({
  axisLabel,
  fieldLabel,
  list,
  note,
}: {
  /** 「청년」처럼 그 칸에 적힌 값 */
  axisLabel: string;
  /** 「생애주기」·「지원 대상」 — 원문의 칸 이름 */
  fieldLabel: string;
  list: readonly WelfareService[];
  note: HubNote;
}) {
  const total = list.length;
  if (total === 0) return null;

  const central = list.filter((s) => s.provider === "central").length;
  const local = total - central;

  /* 지자체 사업이 어느 시·도에 몰려 있는지. 전국 공통(중앙)은 시·도가 없다. */
  const bySido = new Map<string, number>();
  for (const s of list) {
    if (s.provider === "central" || !s.sidoName) continue;
    bySido.set(s.sidoName, (bySido.get(s.sidoName) ?? 0) + 1);
  }
  const topSido = [...bySido.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, n]) => `${name} ${n}건`)
    .join(" · ");

  const benefits = topBenefits(list, 3);
  const withLine = list.filter((s) => s.medianPercent != null).length;
  const guides = note.guides
    .map((slug) => guideBySlug(slug))
    .filter((g): g is NonNullable<ReturnType<typeof guideBySlug>> => !!g);

  return (
    <section className="space-y-3 rounded-2xl border border-line bg-white px-4 py-4 text-sm leading-relaxed text-slate-700 sm:px-5">
      <h2 className="text-base font-bold text-ink">이 목록은 이렇게 모았습니다</h2>

      <p>
        복지로 원문의 <strong>{fieldLabel}</strong> 칸에 &ldquo;{axisLabel}
        &rdquo;이 적힌 사업 {total}건입니다. 중앙부처 사업 {central}건은 사는
        곳과 상관없이 전국에서 같고, 지자체 사업 {local}건은 그 지역에 주소가
        있어야 신청할 수 있습니다
        {topSido && <> — 수록분에서는 {topSido} 순으로 많습니다</>}.
      </p>

      <p>
        {benefits.length > 0 && (
          <>
            받는 형태는{" "}
            {benefits.map((b, i) => (
              <span key={b.label}>
                {i > 0 && ", "}
                {b.label} {b.count}건
              </span>
            ))}{" "}
            순입니다.{" "}
          </>
        )}
        소득 기준선이 원문에 <strong>한 가지로</strong> 적힌 사업은 {withLine}
        건이고, 나머지는 기준이 여럿이거나 문장으로만 적혀 있어 상세에서 직접
        읽어야 합니다.{" "}
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
