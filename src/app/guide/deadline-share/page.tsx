import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services, SERVICES_UPDATED } from "@/data/services";
import { CLOSING } from "@/data/closing";
import { CALENDAR } from "@/lib/calendar";
import { LAST_CHECKED } from "@/lib/sourceTotals";

const G = guideBySlug("deadline-share")!;

/*
  왜 이 글인가 (2026-09-16).

  「언제까지 신청하나」는 사람들이 많이 묻는 말인데(09-16 질문 조사 109건 중 기간·마감 7건),
  우리 데이터에는 마감일이 거의 없다. 그 사실 자체가 알려 줄 값어치가 있는 정보다 —
  "마감일이 안 보이는 것은 우리가 빠뜨린 게 아니라 원문에 없는 것"이라고 화면에 적는다.

  숫자는 전부 렌더 시점 집계다. 손으로 적은 수는 없다.

  ── 하지 않는 것 ───────────────────────────────────────────────
  "지금 신청하면 된다"고 말하지 않는다. 마감 표시는 **원문에 적힌 기간이 지났다**는
  사실까지만 말한다(09-13 마감 처리와 같은 선).
*/

const total = services.length;
const REAL_END = services.filter(
  (s) => s.applyEnd && !s.applyEnd.startsWith("9999"),
);
const NINE = services.filter((s) => s.applyEnd?.startsWith("9999"));
const NO_FIELD = services.filter((s) => !s.applyEnd);

/** 주기 값 분포 — 원본이 매긴 값 그대로. */
const CYCLE = (() => {
  const m = new Map<string, number>();
  for (const s of services) m.set(s.cycle || "없음", (m.get(s.cycle || "없음") ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
})();

/** 예산 소진·선착순 이야기가 원문에 적힌 사업. */
const BUDGET_RE = /예산\s*(소진|범위|한도)|소진\s*시|선착순/;
const BUDGET = services.filter((s) =>
  BUDGET_RE.test(
    `${s.supportContent ?? ""} ${s.eligibility ?? ""} ${s.selectionCriteria ?? ""} ${s.applyMethod ?? ""}`,
  ),
);

/* 보조금24 신청기한에서 온 것은 따로 센다(2026-09-17) — 「문장을 읽어 냈다」는 말은 복지로 몫에만 맞다. */
const GOV24_COUNT = Object.values(CLOSING).filter((c) => c.kind === "gov24").length;
const CLOSING_COUNT = Object.keys(CLOSING).length - GOV24_COUNT;

/* 이 칸은 신청 마감일이 아니라 **사업 기간의 끝날**이다 — 2050·2099년 같은 값이
   섞여 있다. 「마감일」이라고 부르지 않는다(09-16 리뷰). */
const LATEST_END = REAL_END.map((s) => s.applyEnd!).sort().at(-1)?.slice(0, 4);
const PER_100 = Math.round((REAL_END.length / total) * 100);

/* 제목·설명의 숫자도 집계값이다 — 손으로 적으면 수록이 바뀔 때 여기만 옛 수로 남는다. */
export const metadata: Metadata = {
  title: `끝나는 날짜가 적힌 지원금은 100건에 ${PER_100}건 — 그럼 언제까지 신청하나`,
  description: `수록 ${total}건 가운데 원문에 사업 기간의 끝날이 적힌 사업은 ${REAL_END.length}건입니다. 나머지는 날짜 칸이 9999-12-31이거나 칸 자체가 없습니다. 끝날이 없다고 언제까지나 받는 것은 아니어서, 예산이 떨어지면 끝나는 사업이 따로 있습니다.`,
  alternates: { canonical: "/guide/deadline-share" },
};

export default function DeadlineShareGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="지원금 화면에 마감일이 안 보이면 우리가 빠뜨린 것으로 보이기 쉽습니다. 세어 보면 그렇지 않습니다 — 원문에 끝나는 날짜가 적힌 사업 자체가 드뭅니다. 대신 알아 두면 좋은 것이 따로 있습니다."
        updated={`최종 수정 ${G.updated} · 수록 ${total}건을 ${SERVICES_UPDATED}에 받아 ${LAST_CHECKED}에 다시 대조한 값을 셌습니다`}
      >
        <DocSection title="끝나는 날이 적힌 사업은 몇 건인가">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">원문의 사업 기간 끝날 칸</th>
                  <th className="px-3 py-2 text-right font-semibold">건수</th>
                  <th className="px-3 py-2 font-semibold">화면에서 어떻게 보이나</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">실제 날짜가 적힘</td>
                  <td className="px-3 py-2 text-right tabular-nums">{REAL_END.length}건</td>
                  <td className="px-3 py-2">
                    열흘 안으로 들어오면 D-10부터 날짜가 줄어듭니다. 신청
                    마감일이 아니라 사업이 끝나는 날이라, {LATEST_END}년처럼 먼 날짜도
                    섞여 있습니다
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">9999-12-31</td>
                  <td className="px-3 py-2 text-right tabular-nums">{NINE.length}건</td>
                  <td className="px-3 py-2">
                    끝날을 안 정했다는 뜻입니다. 기간을 표시하지 않습니다
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">칸이 아예 없음</td>
                  <td className="px-3 py-2 text-right tabular-nums">{NO_FIELD.length}건</td>
                  <td className="px-3 py-2">
                    중앙부처 사업. 그 칸을 안 보내 줍니다
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            그래서 &ldquo;마감 임박&rdquo;을 화면 가득 채우는 사이트를 보면 부러울 수는
            있어도, 우리 데이터로는 만들 수가 없습니다. 지어내면 그 순간 틀린 날짜가{" "}
            {total}쪽에 퍼집니다.
          </p>
        </DocSection>

        <DocSection title="그래도 기간이 적힌 곳이 있습니다 — 본문 문장">
          <p>
            날짜 칸은 비어 있어도 <strong>요약문·지원 내용 문장 안에</strong> 기간을 적어
            둔 사업이 있습니다. 예를 들면 &ldquo;2026년 모집기간: &rsquo;26.5.4.~
            &rsquo;26.5.20.&rdquo; 같은 문장입니다. 저희는 그런 문장을 따로 읽어
            내 <strong>{CLOSING_COUNT}건</strong>, 행정안전부 보조금24의 신청기한 칸에서{" "}
            <strong>{GOV24_COUNT}건</strong>을 더 읽어 마감 표로 들고 있고, 지났는지는 보는
            사람의 브라우저가 그날 날짜로 판정합니다.
          </p>
          <p>
            공식 공고로 날짜를 확인한 신청 일정 <strong>{CALENDAR.length}건</strong>은{" "}
            <Link href="/guide/calendar" className="text-brand underline">
              올해 신청 달력
            </Link>
            에 모아 두었습니다. 캘린더에 담아 두면 3일 전에 알림이 옵니다.
          </p>
        </DocSection>

        <DocSection title="마감이 없다고 언제까지나 받는 것은 아닙니다">
          <p>
            끝날이 없는 사업이라도 <strong>예산이 떨어지면 그해 접수가 끝납니다.</strong>{" "}
            원문에 그런 이야기가 적힌 사업이 수록 {total}건 중{" "}
            <strong>{BUDGET.length}건</strong>입니다. 원문 표현은 「예산 소진 시까지」,
            「예산 범위 내에서」, 「선착순」처럼 제각각입니다.
          </p>
          <ul className="space-y-1 text-sm">
            {BUDGET.slice(0, 6).map((s) => (
              <li key={s.id}>
                <Link
                  href={`/service/${s.id}`}
                  className="text-brand underline hover:no-underline"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
          <DocNote>
            그래서 &ldquo;마감일이 없으니 천천히 해도 된다&rdquo;가 아니라,{" "}
            <strong>연초·상반기에 미리 확인하는 쪽</strong>이 안전합니다. 저희가 D-day
            띠에 &ldquo;예산이 떨어지면 그 전에 끝날 수 있다&rdquo;를 함께 적는 이유도
            같습니다.
          </DocNote>
        </DocSection>

        <DocSection title="대신 알아 둘 것 — 돈이 나오는 주기">
          <p>
            마감일보다 실제로 더 자주 쓰이는 정보는 <strong>지급 주기</strong>입니다.
            원문이 매긴 값을 그대로 세면 이렇습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">주기</th>
                  <th className="px-3 py-2 text-right font-semibold">건수</th>
                </tr>
              </thead>
              <tbody>
                {CYCLE.map(([name, n]) => (
                  <tr key={name} className="border-b border-line">
                    <td className="px-3 py-2">{name}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{n}건</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm">
            매달 나오는 돈이 실제로 며칠에 들어오는지는 법령에 적혀 있습니다 —{" "}
            <Link href="/guide/pay-dates" className="text-brand underline">
              지원금은 며칠에 들어오나
            </Link>
            에 조문과 함께 정리해 두었습니다.
          </p>
        </DocSection>
      </DocPage>
      <GuideNav current="deadline-share" />
    </>
  );
}
