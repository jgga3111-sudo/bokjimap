"use client";

import Link from "next/link";
import { CLOSING } from "@/data/closing";
import { useLocalToday } from "@/lib/useLocalToday";
import { isClosed } from "./DeadlineBadge";

/**
 * 「기간이 지난 지원」 모음 — 마감된 것을 **따로** 한곳에 모은다.
 *
 * 2026-09-13 사용자 요청. 목록 카드에는 「마감」 딱지만 붙이고 순서는 조회수
 * 그대로 둔다(끝났다고 목록에서 빼면 3절 — 숨기지 말고 마감으로 표기 — 에
 * 어긋난다). 대신 무엇이 끝났는지 한눈에 볼 자리를 여기 둔다. 내년 공고를
 * 기다리는 사람이 찾아오는 자리이기도 하다.
 *
 * 브라우저에서만 그린다(`useLocalToday`). 빌드한 날로 고르면 배포를 안 하는
 * 동안 새로 끝난 것이 안 들어온다. 하나도 없으면 상자를 그리지 않는다.
 *
 * 끝난 날이 **최근인 것부터** 놓는다. 오래전에 끝난 2024년 공고보다 지난달에
 * 끝난 것이 다시 열릴 가능성을 확인할 값어치가 크다.
 */
export default function ClosedList() {
  const today = useLocalToday();
  if (!today) return null;

  /* 원문이 마감이라고 적은 것(날짜 없음)은 맨 앞 — 지금 이 순간 확실히
     끝난 것이다. 그다음은 끝난 날이 최근인 순서. */
  const rows = Object.entries(CLOSING)
    .filter(([id]) => isClosed(id, today))
    .sort((a, b) => (b[1].end ?? "9999").localeCompare(a[1].end ?? "9999"));
  if (rows.length === 0) return null;

  return (
    <section
      id="closed"
      className="scroll-mt-24 overflow-hidden rounded-xl border border-amber-300/70 bg-amber-50/60"
    >
      <div className="px-4 pt-4">
        <h2 className="text-base font-extrabold text-amber-900">
          기간이 지난 지원 {rows.length}건
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-600">
          원문에 적힌 신청 기간이나 사업 기간이 지났거나, 원문이 마감이라고 적어
          둔 것입니다. 해마다 다시
          공고가 나거나 기간이 연장되는 사업도 있으니, 올해 일정은 각 상세의
          공식 안내에서 확인하세요.
        </p>
      </div>
      <ul className="mt-3 divide-y divide-amber-200/70 border-t border-amber-200/70 bg-white/70">
        {rows.map(([id, c]) => (
          <li key={id}>
            <Link
              href={`/service/${id}`}
              className="group flex items-baseline justify-between gap-3 px-4 py-2.5 hover:bg-white"
            >
              <span className="min-w-0">
                <span className="font-semibold text-ink group-hover:text-brand">
                  {c.name}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  {c.kind === "stated"
                    ? `원문 표기 「${c.text}」`
                    : `${c.kind === "period" ? "신청 기간" : "사업 기간"} ${c.text}`}
                </span>
              </span>
              <span className="shrink-0 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-900">
                마감
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
