import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { PAY_DATES, IRREGULAR, byDay } from "@/lib/payDates";
import { services } from "@/data/services";

const G = guideBySlug("pay-dates")!;

export const metadata: Metadata = {
  title: "지원금 지급일 — 기초연금·아동수당·생계급여는 매월 며칠에 들어오나",
  description:
    "생계급여·주거급여·장애인연금은 매월 20일, 기초연금·아동수당은 매월 25일에 들어옵니다. 토요일이나 공휴일이면 그 전날입니다. 시행령·시행규칙 조문을 그대로 옮겼습니다.",
  alternates: { canonical: "/guide/pay-dates" },
};

/*
  왜 이 글인가. 앞의 열넷은 전부 "언제 신청하나"까지만 말한다. 그런데
  사람들이 실제로 치는 말은 **"언제 들어오나"**다.

  숫자를 손으로 적지 않는다. 아래 두 값은 렌더 시점에 센다.
*/
const LINKED = new Set(PAY_DATES.map((p) => p.id));
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

function Card({ p }: { p: (typeof PAY_DATES)[number] }) {
  return (
    <li className="px-4 py-3">
      <p className="text-sm">
        <ProgramLink id={p.id} label={p.label} />
        <span className="text-slate-600"> — {p.when}</span>
      </p>
      {/* 근거는 요약하지 않고 조문을 그대로 싣는다. 금액·기준·날짜를 우리
          말로 바꾸지 않는 것이 이 사이트의 규칙이다(CLAUDE.md 3절). */}
      <p className="mt-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600">
        “{p.quote}”
      </p>
      {p.note && (
        <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{p.note}</p>
      )}
      <p className="mt-1.5 text-xs text-muted">
        근거{" "}
        <a
          href={p.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-brand"
        >
          {p.source}
        </a>{" "}
        · {p.checkedAt} 확인
      </p>
    </li>
  );
}

export default function PayDatesGuide() {
  const groups = byDay();

  return (
    <>
      <DocPage
        title={G.title}
        lead="신청을 마치고 나면 궁금한 것은 하나입니다 — 언제 들어오나. 그런데 이 답은 복지로에도, 정부가 주는 공공데이터에도 적혀 있지 않습니다."
        updated={`최종 수정 ${G.updated} · ${PAY_DATES.length}개 제도를 법령·국세청 안내에서 확인`}
      >
        <DocSection title="왜 어디에도 안 적혀 있나">
          <p>
            복지로에서 기초연금 상세 화면을 열어 봤습니다(2026-09-06). 지원 대상,
            선정 기준, 소득인정액 계산식까지 빼곡한데{" "}
            <strong>지급일 칸은 없습니다.</strong>
          </p>
          <p>
            저희가 받는 공공데이터도 마찬가지입니다. 수록한{" "}
            {services.length.toLocaleString()}건 중 조회수 상위 120건의 본문을
            전부 뒤져 &ldquo;매월 ○일&rdquo;이 적힌 것은{" "}
            <strong>2건</strong>뿐이었습니다.
          </p>
          <p>
            빠뜨린 게 아닙니다. 지급일은 사업 안내문이 아니라{" "}
            <strong>시행령·시행규칙에 못 박혀 있습니다.</strong> 그래서 이 글은
            데이터를 집계한 것이 아니라 법령을 한 조씩 찾아 옮긴 것입니다.
          </p>
        </DocSection>

        <DocSection title="달마다 같은 날 들어오는 것">
          {groups.map((g) => (
            <section
              key={g.day}
              className="overflow-hidden rounded-xl border border-line bg-white"
            >
              <h3 className="border-b border-line bg-slate-50 px-4 py-2.5 text-sm font-extrabold text-ink">
                매월 {g.day}일
                <span className="ml-2 text-xs font-normal text-muted">
                  {g.items.length}개
                </span>
              </h3>
              <ul className="divide-y divide-line">
                {g.items.map((p) => (
                  <Card key={p.id} p={p} />
                ))}
              </ul>
            </section>
          ))}
        </DocSection>

        <DocSection title="그날이 토요일이거나 공휴일이면">
          {/* "다섯"이라고 손으로 적었다가 고쳤다. 제도가 하나 늘면 조용히
              틀린 말이 된다 — 숫자는 렌더 시점에 센다(guides.ts 머리말). */}
          <p>
            <strong>그 전날에 들어옵니다.</strong> 위에 실은{" "}
            {PAY_DATES.length - IRREGULAR.length}개 조문이 전부 같은 괄호를 달고
            있습니다 — &ldquo;토요일이거나 공휴일인 경우에는 그 전날로
            한다&rdquo;.
          </p>
          {/*
            처음에는 "20일이 일요일이면 토요일도 앞당김 대상이라 금요일에
            들어온다"고 적었다. 지웠다 — 그건 조문에 없는 말을 우리가 이어
            붙인 **법령 해석**이다(CLAUDE.md 3절). 실제로 그렇게 운영되더라도,
            판정은 이 사이트가 하는 일이 아니다. 조문에 적힌 것까지만 말하고
            나머지는 문의처로 보낸다.
          */}
          <p>
            <strong>늦춰진다는 규정은 어디에도 없습니다.</strong> 다만 그달에
            실제로 며칠이 되는지는 그해 달력과 공휴일에 따라 달라집니다.
            정확한 날짜가 필요하면 각 제도의 문의처에서 확인해 주세요.
          </p>
        </DocSection>

        <DocSection title="매달 같은 날이 아닌 것">
          <ul className="space-y-4">
            {IRREGULAR.map((p) => (
              <li key={p.id}>
                <p className="text-sm">
                  <ProgramLink id={p.id} label={p.label} />
                  <span className="text-slate-600"> — {p.when}</span>
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                  {p.quote}
                </p>
                {p.note && (
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {p.note}
                  </p>
                )}
                <p className="mt-1.5 text-xs text-muted">
                  근거{" "}
                  <a
                    href={p.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-brand"
                  >
                    {p.source}
                  </a>{" "}
                  · {p.checkedAt} 확인 ·{" "}
                  <Link href="/guide/tax-credit" className="underline hover:text-brand">
                    네 개의 문을 자세히 →
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </DocSection>

        <DocSection title="여기 없는 것">
          <p>
            <strong>부모급여는 뺐습니다.</strong> 수록분에서 조회수 11위로 큰
            제도인데, 「아동수당법」에도 「영유아보육법」에도 지급일을 정한
            조문이 없었습니다. 흔히 25일이라고들 하지만{" "}
            <strong>저희가 확인하지 못한 것은 싣지 않습니다.</strong>
          </p>
          <p>
            수록한 {services.length.toLocaleString()}건 대부분도 지급일 규정이
            없습니다. 한 번 주고 끝나는 지원, 바우처 카드로 주는 지원, 요금을
            깎아 주는 지원에는 &ldquo;들어오는 날&rdquo;이라는 것이 아예
            없습니다. 여기 실린 것은{" "}
            <strong>달마다 현금이 계좌로 들어오는 제도</strong>뿐입니다.
          </p>
          <DocNote>
            법령은 개정됩니다. 이 글의 날짜는 위에 적힌 확인일 기준이고, 실제
            입금이 늦어진다면 지급일 규정보다 자격 심사·계좌 문제인 경우가
            많습니다. 그 판단은 저희가 하지 않습니다 — 각 제도의 문의처로
            물어보셔야 합니다.
          </DocNote>
          <p>
            <Link href="/guide/calendar" className="text-brand underline">
              언제 신청하는지 보는 신청 달력 →
            </Link>
          </p>
        </DocSection>
      </DocPage>
      <GuideNav current="pay-dates" />
    </>
  );
}
