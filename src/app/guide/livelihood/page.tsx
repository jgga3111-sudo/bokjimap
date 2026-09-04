import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";

const G = guideBySlug("livelihood")!;

export const metadata: Metadata = {
  title: `${G.title} — 생계급여와 긴급복지 생계지원`,
  description:
    "둘 다 생계비를 현금으로 줍니다. 하나는 평소 소득이 낮은 사람에게 계속, 하나는 갑자기 무너진 사람에게 일시적으로 줍니다. 원문 기준으로 나란히 놓았습니다.",
  alternates: { canonical: "/guide/livelihood" },
};

/*
  왜 이 둘인가. 조회수로 긴급복지 생계지원 129만, 생계급여 71만이다(복지로
  누적). 둘 다 상위 스무 건 안이고, 이름에 '생계'가 들어가며, 지급형태도
  현금·주기도 월로 같다. **데이터상 구분되는 지점은 선정기준과 금액 산정
  방식**이라 목록만 봐서는 갈라지지 않는다.

  이 글은 어느 쪽에 해당하는지 **판정하지 않는다**(CLAUDE.md 3절).
  원문에 적힌 기준을 옮겨 놓고, 확인은 129와 주민센터로 보낸다.
*/
const ID = {
  basic: "WLF00001132", // 생계급여(맞춤형 급여)
  urgent: "WLF00003180", // 긴급복지 생계지원
} as const;

const find = (id: string) => services.find((s) => s.id === id);
const basic = find(ID.basic);
const urgent = find(ID.urgent);

/** 두 사업이 데이터에서 같은 값을 갖는 항목 — 그래서 헷갈린다. */
const SAME = [
  ["지급형태", "현금"],
  ["지급주기", "월"],
  ["소관", "보건복지부"],
  ["온라인 신청", "둘 다 안 됨"],
] as const;

const DIFF = [
  {
    label: "언제 쓰나",
    basic: "평소 소득이 기준선 아래로 낮은 상태가 이어질 때",
    urgent: "사망·실직·질병·화재 등으로 갑자기 소득이 끊겼을 때",
  },
  {
    label: "무엇을 보나",
    basic: "소득인정액 기준 + 부양의무자 기준을 동시에",
    urgent: "원문에 열거된 위기사유에 해당하는지",
  },
  {
    label: "금액을 정하는 법",
    basic: "선정기준액에서 우리 집 소득인정액을 뺀 나머지 — 가구마다 다름",
    urgent: "가구원 수에 따른 정액 — 소득과 무관하게 같은 금액",
  },
  {
    label: "얼마나 이어지나",
    basic: "자격이 유지되는 동안 계속",
    urgent: "일시적 — 위기에서 벗어나게 하는 것이 목적",
  },
] as const;

export default function LivelihoodGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="이름도 비슷하고, 둘 다 현금을 매달 줍니다. 데이터로는 거의 같아 보이는데 실제로는 전혀 다른 문입니다."
        updated={`최종 수정 ${G.updated} · 수록 ${services.length.toLocaleString()}건 중 두 사업의 원문 기준`}
      >
        <DocSection title="왜 헷갈리나 — 데이터가 같아 보입니다">
          <p>
            목록에서 이 둘은 <strong>거의 구분되지 않습니다.</strong> 카드에
            찍히는 값이 같기 때문입니다.
          </p>
          <ul className="space-y-1.5">
            {SAME.map(([k, v]) => (
              <li key={k} className="flex gap-3">
                <span className="w-24 shrink-0 text-muted">{k}</span>
                <span className="font-medium text-ink">{v}</span>
              </li>
            ))}
          </ul>
          <p>
            갈라지는 곳은 <strong>선정기준과 금액을 정하는 방식</strong>인데, 둘
            다 상세 안쪽에 있습니다. 그래서 목록만 훑으면 하나로 보입니다.
          </p>
        </DocSection>

        <DocSection title="갈라지는 네 지점">
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left">
                  <th className="py-2 pr-3 font-semibold text-muted"> </th>
                  <th className="py-2 pr-3 font-bold text-ink">생계급여</th>
                  <th className="py-2 pr-3 font-bold text-ink">
                    긴급복지 생계지원
                  </th>
                </tr>
              </thead>
              <tbody className="align-top">
                {DIFF.map((d) => (
                  <tr key={d.label} className="border-b border-line/70">
                    <th className="py-2.5 pr-3 text-left font-semibold whitespace-nowrap text-muted">
                      {d.label}
                    </th>
                    <td className="py-2.5 pr-3 text-slate-700">{d.basic}</td>
                    <td className="py-2.5 pr-3 text-slate-700">{d.urgent}</td>
                  </tr>
                ))}
                <tr>
                  <th className="py-2.5 pr-3 text-left font-semibold text-muted">
                    상세
                  </th>
                  <td className="py-2.5 pr-3">
                    <Link
                      href={`/service/${ID.basic}`}
                      className="text-brand underline"
                    >
                      보기
                    </Link>
                  </td>
                  <td className="py-2.5 pr-3">
                    <Link
                      href={`/service/${ID.urgent}`}
                      className="text-brand underline"
                    >
                      보기
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocSection title="금액이 정해지는 방식이 정반대입니다">
          <p>
            여기가 가장 중요한 차이입니다.{" "}
            <strong>생계급여는 빼기, 긴급복지는 정액</strong>
            입니다.
          </p>
          {basic && (
            <>
              <p className="text-xs font-semibold text-muted">
                생계급여 — 지원내용 원문
              </p>
              <blockquote className="rounded-lg border-l-4 border-line bg-slate-50 py-3 pr-3 pl-4 text-sm leading-relaxed whitespace-pre-line text-slate-700">
                {(basic.supportContent ?? "").trim()}
              </blockquote>
            </>
          )}
          <p>
            그래서 생계급여는{" "}
            <strong>&ldquo;얼마 받는가&rdquo;를 미리 말할 수 없습니다.</strong>{" "}
            소득인정액이 얼마인지에 따라 집집마다 다르고, 소득이 늘면 받는
            금액이 줄어듭니다.
          </p>
          {urgent && (
            <>
              <p className="text-xs font-semibold text-muted">
                긴급복지 생계지원 — 지원내용 원문
              </p>
              <blockquote className="rounded-lg border-l-4 border-line bg-slate-50 py-3 pr-3 pl-4 text-sm leading-relaxed whitespace-pre-line text-slate-700">
                {(urgent.supportContent ?? "").trim()}
              </blockquote>
            </>
          )}
          <p>
            이쪽은 <strong>가구원 수만 정해지면 금액이 정해집니다.</strong>{" "}
            소득에 따라 깎이지 않습니다. 대신 위기사유에 해당해야 하고, 계속
            받는 것이 아닙니다.
          </p>
        </DocSection>

        <DocSection title="위기사유는 원문에 열거되어 있습니다">
          <p>
            긴급복지는 &ldquo;형편이 어렵다&rdquo;가 아니라{" "}
            <strong>정해진 사건이 있었는가</strong>를 봅니다. 선정기준 원문이
            사유를 번호로 열거하고 있어 그대로 옮깁니다.
          </p>
          {urgent && (
            <blockquote className="rounded-lg border-l-4 border-line bg-slate-50 py-3 pr-3 pl-4 text-sm leading-relaxed whitespace-pre-line text-slate-700">
              {(urgent.selectionCriteria ?? "").trim()}
            </blockquote>
          )}
          <p>
            목록이 원문에서 잘려 있으면{" "}
            <Link
              href={`/service/${ID.urgent}`}
              className="text-brand underline"
            >
              상세 페이지
            </Link>
            에서 전체를 볼 수 있습니다. 긴급복지는 생계지원 말고도 의료·주거·
            교육 등 여덟 갈래가 있는데, 대부분 생계지원 하나만 알고 나머지를
            놓칩니다 —{" "}
            <Link href="/guide/emergency" className="text-brand underline">
              갑자기 생계가 막혔을 때
            </Link>
            에서 따로 다뤘습니다.
          </p>
        </DocSection>

        <DocSection title="신청 창구는 원문이 다르게 적고 있습니다">
          <p>
            둘 다 <strong>온라인 신청이 되지 않습니다</strong>(데이터의
            온라인신청 값이 둘 다 &lsquo;아니오&rsquo;). 그런데{" "}
            <strong>어디서 접수하는지</strong>는 두 사업의 원문이 다르게 적고
            있어, 짐작해서 채우지 않고 있는 그대로 옮깁니다.
          </p>
          <ul className="space-y-2.5">
            <li>
              <span className="font-semibold text-ink">생계급여</span> — 신청
              절차의 첫 단계가{" "}
              <strong>
                &ldquo;거주지 읍/면/동 주민센터에서 서비스 신청&rdquo;
              </strong>
              으로 적혀 있습니다.
            </li>
            <li>
              <span className="font-semibold text-ink">긴급복지 생계지원</span>{" "}
              — 절차가 <strong>조사·심사부터 시작합니다.</strong> 신청을 어디서
              받는지는 원문에 없고, 문의처로 <strong>129</strong>만 적혀
              있습니다.
            </li>
          </ul>
          <p className="text-xs text-muted">
            없는 것을 지어내지 않으려고 이렇게 둡니다. 긴급복지 접수처를
            &ldquo;주민센터&rdquo;라고 적어 두면 그럴듯하지만, 그건 우리가
            확인한 내용이 아닙니다.
          </p>
          <DocNote>
            <strong>이 사이트는 수급 자격을 판정하지 않습니다.</strong> 위에
            옮긴 것은 공고 원문이고, 실제 판단은 소득인정액 산정과 위기사유
            확인을 거쳐 담당 기관이 합니다. 두 사업 모두 문의처로{" "}
            <strong>보건복지상담센터 국번 없이 129</strong>가 적혀 있습니다.
            어느 쪽에 해당하는지 헷갈리면 그리로 물어보는 편이 가장 빠릅니다.
          </DocNote>
        </DocSection>

        <DocSection title="같이 보면 좋은 것">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <Link href="/guide/income-line" className="text-brand underline">
                자격선은 생각보다 높습니다
              </Link>{" "}
              — 선정기준에 적힌 중위소득 비율을 전부 세어 봤습니다
            </li>
            <li>
              <Link href="/check" className="text-brand underline">
                1분 자가진단
              </Link>{" "}
              — 내 소득이 어느 구간인지부터 확인합니다
            </li>
            <li>
              <Link href="/theme/safety" className="text-brand underline">
                주제 &lsquo;안전·위기&rsquo;
              </Link>{" "}
              — 갑작스러운 상황에 걸리는 지원을 모았습니다
            </li>
          </ul>
        </DocSection>
      </DocPage>

      <div className="mx-auto max-w-3xl">
        <GuideNav current="livelihood" />
      </div>
    </>
  );
}
