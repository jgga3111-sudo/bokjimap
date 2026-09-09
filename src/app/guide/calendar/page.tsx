import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { CALENDAR, MONTHS, PROGRAM_COUNT, entriesOfMonth } from "@/lib/calendar";
import { services } from "@/data/services";

const G = guideBySlug("calendar")!;

export const metadata: Metadata = {
  /* G.title이 이미 "— 신청 달력"으로 끝나 그대로 이으면 줄표가 둘이 된다.
     탭과 검색결과에 들어가는 글자라 여기서만 따로 적는다. */
  title: "달마다 챙길 것 — 근로장려금·에너지바우처·문화누리카드 신청 시기",
  description:
    "근로장려금은 3·5·9월, 청년월세는 3~5월, 에너지바우처는 6월부터입니다. 한 해에 며칠뿐인 신청 창구를 국세청·에너지공단 등 공식 공고에서 확인해 달별로 모았습니다.",
  alternates: { canonical: "/guide/calendar" },
};

/*
  왜 이 글이 필요했나. 목록 900건은 전부 "당신이 누구인가"로만 갈린다 —
  청년·저소득·노년·장애인. 그런데 실제로 사람을 움직이는 건 **마감일**이다.

  2026년 5월에 청년 관련 검색이 1년 최고치를 찍었는데, 그 달은 청년월세
  접수가 5월 29일 16시에 끝난 달이었다. 우리 사이트를 그 달에 열었어도
  "5월 29일"은 어디에도 없었다.

  숫자를 손으로 적지 않는다. 아래 두 값은 렌더 시점에 센다.
*/
const LINKED = new Set(CALENDAR.map((e) => e.id));
const NAME_OF = new Map(
  services.filter((s) => LINKED.has(s.id)).map((s) => [s.id, s.name]),
);

/** 원문 사업명을 못 찾으면 링크를 걸지 않는다 — 죽은 링크를 만들지 않는다. */
function ProgramLink({ id, label }: { id: string; label: string }) {
  if (!NAME_OF.has(id)) return <span className="font-bold text-ink">{label}</span>;
  return (
    <Link href={`/service/${id}`} className="font-bold text-brand hover:underline">
      {label}
    </Link>
  );
}

export default function CalendarGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="복지는 아무 때나 신청되지 않습니다. 근로장려금은 한 해에 신청할 수 있는 날이 며칠뿐이고, 노인일자리는 해가 바뀌기 전에 모집이 끝납니다."
        updated={`최종 수정 ${G.updated} · 제도 ${PROGRAM_COUNT}개 · 항목 ${CALENDAR.length}개를 공식 공고에서 확인`}
      >
        <DocSection title="왜 시기가 중요한가">
          <p>
            검색량을 재 보면 사람들이 복지를 찾는 시점은 고르지 않습니다. 지난 1년
            네이버 검색량을 월별로 보면 이렇습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[26rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs text-muted">
                  <th className="py-2 pr-3 font-bold">검색어 무리</th>
                  <th className="py-2 pr-3 font-bold">가장 많은 달</th>
                  <th className="py-2 pr-3 font-bold">가장 적은 달</th>
                  <th className="py-2 font-bold">차이</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {[
                  ["근로장려금·자녀장려금", "5월", "7월", "5.5배"],
                  ["청년 지원금·청년월세", "5월", "7월", "8배"],
                  ["문화누리카드", "2월", "8월", "3.5배"],
                  ["에너지바우처·난방비", "7월", "4월", "3배"],
                ].map((r) => (
                  <tr key={r[0]} className="border-b border-line/60">
                    <td className="py-2 pr-3 font-medium text-ink">{r[0]}</td>
                    <td className="py-2 pr-3">{r[1]}</td>
                    <td className="py-2 pr-3">{r[2]}</td>
                    <td className="py-2 font-bold text-brand">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            네이버 데이터랩 검색어 트렌드, 2025년 9월~2026년 9월 월 단위. 각
            무리는 관련 검색어 세 개를 묶은 값입니다.
          </p>
          <p>
            청년 검색이 5월에 1년 최고치를 찍은 이유는 표를 만들고 나서
            분명해졌습니다. <strong>2026년 청년월세 접수가 5월 29일 16시에
            끝났습니다.</strong> 관심은 제도가 아니라 마감일에 붙습니다.
          </p>
        </DocSection>

        <DocSection title="달력">
          <p>
            아래는 <strong>공식 공고에서 하나씩 확인한 것만</strong> 실은
            것입니다. 달을 골고루 채우려고 짐작해 넣지 않았습니다.
          </p>

          <div className="space-y-4">
            {MONTHS.map((m) => {
              const rows = entriesOfMonth(m);
              if (rows.length === 0) return null;
              return (
                <section
                  key={m}
                  id={`m${m}`}
                  className="scroll-mt-24 overflow-hidden rounded-xl border border-line bg-white"
                >
                  <h3 className="border-b border-line bg-sunken px-4 py-2.5 text-sm font-extrabold text-ink">
                    {m}월
                    <span className="ml-2 text-xs font-normal text-muted">
                      {rows.length}건
                    </span>
                  </h3>
                  <ul className="divide-y divide-line">
                    {rows.map((e, i) => (
                      <li key={`${e.id}-${i}`} className="px-4 py-3">
                        <p className="text-sm">
                          <ProgramLink id={e.id} label={e.label} />
                          <span className="text-slate-600"> — {e.what}</span>
                        </p>
                        <p className="mt-1 text-sm font-bold text-ink">
                          {e.period}
                        </p>
                        {e.note && (
                          <p className="mt-1 text-xs leading-relaxed text-slate-500">
                            {e.note}
                          </p>
                        )}
                        <p className="mt-1.5 text-xs text-muted">
                          출처{" "}
                          <a
                            href={e.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-brand"
                          >
                            {e.source}
                          </a>{" "}
                          · {e.checkedAt} 확인
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </DocSection>

        <DocSection title="놓치기 가장 쉬운 셋">
          <ul className="space-y-3">
            <li>
              <strong className="text-ink">노인일자리는 작년에 모집이 끝났습니다.</strong>{" "}
              2026년에 일하려면 2025년 11월 28일부터 12월 26일 사이에 신청했어야
              했습니다. 해가 바뀐 뒤에 알아보면 이미 늦습니다.
            </li>
            <li>
              <strong className="text-ink">
                에너지바우처 여름 몫은 9월 30일에 사라집니다.
              </strong>{" "}
              신청은 한 번인데 쓰는 기간이 여름·겨울로 갈립니다. 여름 몫을 안 쓰고
              넘기면 겨울로 이월되지 않습니다.
            </li>
            <li>
              <strong className="text-ink">
                근로장려금을 5월에 놓쳐도 받을 수는 있습니다.
              </strong>{" "}
              다만 기한 후 신청(6월 2일~12월 1일)은 95%만 나옵니다. 5%가 줄어듭니다.
            </li>
          </ul>
        </DocSection>

        <DocSection title="이 달력이 다루지 않는 것">
          <p>
            수록한 {services.length.toLocaleString()}건 대부분은{" "}
            <strong>연중 아무 때나 신청</strong>합니다. 기초연금·생계급여·아동수당
            처럼 자격이 되면 언제든 접수하는 제도에는 마감일이 없습니다.
          </p>
          <p>
            그래서 이 달력에 없다고 &ldquo;지금은 안 되는구나&rdquo;로 읽으시면
            안 됩니다. 여기 실린 것은{" "}
            <strong>기간이 정해져 있어서 놓치면 못 받는 것들</strong>뿐입니다.
          </p>
          <DocNote>
            공고 날짜는 해마다 바뀝니다. 이 표의 날짜는 위에 적힌 확인일 기준이고,
            신청 직전에는 출처 링크에서 그해 공고를 다시 확인해 주세요. 저희는
            안내와 링크까지 하고, 자격 판정은 하지 않습니다.
          </DocNote>
          <p>
            <Link href="/service" className="text-brand underline">
              상시 신청하는 지원 전체 보기 →
            </Link>
          </p>
        </DocSection>
      </DocPage>
      <GuideNav current="calendar" />
    </>
  );
}
