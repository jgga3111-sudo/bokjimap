import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services, SERVICES_UPDATED } from "@/data/services";
import { OFFICIAL_DOCS, docsByYear } from "@/lib/officialDocs";
import { LAST_CHECKED } from "@/lib/sourceTotals";

const G = guideBySlug("official-docs")!;

export const metadata: Metadata = {
  title:
    "정부 사업안내 지침은 어디서 보나 — 지원금 원문에 붙은 안내서 모음",
  description:
    "「2026년 국민기초생활보장 사업안내」처럼 실제 기준이 적힌 지침 파일은 복지로 사업 원문에 첨부로 붙어 있습니다. 수록 사업에 붙은 안내·지침 파일을 조회수 순으로 모으고, 몇 년판인지 함께 적었습니다.",
  alternates: { canonical: "/guide/official-docs" },
};

/*
  왜 이 글인가 (2026-09-16).

  서치콘솔에 「"★2026년 국민기초생활보장 사업안내.pdf"」 같은 **파일 이름 검색**이
  여러 건 노출되고 있었다(28일 노출 10 외 7건). 사람들이 지침 원문을 찾는다는 뜻인데
  우리는 그것을 상세 맨 아래 「서식·안내 자료」에만 두고 모아 놓지 않았다.

  ── 이 글이 하는 일 ────────────────────────────────────────────
  · 지침이 무엇인지, 왜 복지로 요약보다 지침을 봐야 하는지 설명한다.
  · 우리 수록분에 붙은 안내·지침 파일을 조회수 순으로 보여주고 **그 사업 상세로** 보낸다.
  · 파일 이름에 적힌 **연도를 그대로 보여준다** — 첨부가 작년판인 사업이 실제로 있다.

  ── 하지 않는 것 ───────────────────────────────────────────────
  파일을 우리 서버에 올리지 않는다. 내려받기는 복지로 원문 링크로만 간다.
  연도는 파일 이름에서 읽은 것이고, "이 지침이 최신이다"라고 판정하지 않는다(3절).
*/

const TOP = OFFICIAL_DOCS.slice(0, 40);
const YEARS = docsByYear();
const OLD = OFFICIAL_DOCS.filter((d) => d.year !== null && d.year <= 2025).length;
const SERVICE_COUNT = new Set(OFFICIAL_DOCS.map((d) => d.serviceId)).size;

export default function OfficialDocsGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="복지로 화면의 설명은 요약입니다. 금액·자격·예외가 실제로 적힌 것은 부처가 매년 내는 「사업안내」 지침이고, 그 파일이 사업 원문에 첨부로 붙어 있습니다. 어디에 무엇이 붙어 있는지 모아 두었습니다."
        updated={`최종 수정 ${G.updated} · 수록 ${services.length}건의 첨부를 ${SERVICES_UPDATED}에 받아 ${LAST_CHECKED}에 다시 대조했습니다`}
      >
        <DocSection title="지침을 봐야 하는 이유">
          <p>
            같은 사업이라도 복지로 요약에는 &ldquo;소득 기준을 충족하는 가구&rdquo;처럼
            한 줄로 적히는데, 지침에는 <strong>가구원 수별 금액표·공제 항목·예외·신청
            기한</strong>이 다 들어 있습니다. 저희가 안내 글을 쓸 때 근거로 삼는 것도
            대부분 이 지침입니다 — 예를 들어 교육급여 바우처를 결정 뒤에 한국장학재단에서
            따로 신청해야 한다는 사실은 복지로 원문에는 없고 교육부 지침에 있습니다.
          </p>
          <p>
            수록 {services.length}건 가운데 <strong>{SERVICE_COUNT}건</strong>에 안내·지침
            파일이 붙어 있고, 파일은 모두 <strong>{OFFICIAL_DOCS.length}개</strong>입니다.
          </p>
        </DocSection>

        <DocSection title="⚠ 몇 년판인지 꼭 보세요">
          <p>
            첨부가 항상 올해 것은 아닙니다. 파일 이름에 적힌 연도로 세면 이렇습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">파일 이름의 연도</th>
                  <th className="px-3 py-2 text-right font-semibold">개수</th>
                </tr>
              </thead>
              <tbody>
                {YEARS.map(([label, n]) => (
                  <tr key={label} className="border-b border-line">
                    <td className="px-3 py-2">{label}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{n}개</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DocNote>
            2025년 이하로 적힌 파일이 <strong>{OLD}개</strong>입니다. 오래된 지침이
            붙어 있다고 그 사업이 없어진 것은 아니고, 원문에 아직 새 파일이 안 올라온
            것입니다. 금액·기준이 해마다 바뀌므로 <strong>연도가 지난 지침의 숫자는
            그대로 믿지 말고</strong> 보건복지상담센터(129)나 소관 부처 누리집에서 올해
            값을 확인하세요.
          </DocNote>
        </DocSection>

        <DocSection title="많이 찾는 사업의 지침">
          <p>
            복지로 조회수가 높은 순서로 마흔 개입니다. 파일은 각 사업 상세의
            &ldquo;서식·안내 자료&rdquo; 칸에서 복지로 원문으로 바로 내려받을 수 있습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">사업</th>
                  <th className="px-3 py-2 font-semibold">붙어 있는 안내·지침 파일</th>
                  <th className="px-3 py-2 font-semibold">연도</th>
                </tr>
              </thead>
              <tbody className="align-top">
                {TOP.map((d) => (
                  <tr key={`${d.serviceId}-${d.name}`} className="border-b border-line">
                    <td className="px-3 py-2">
                      <Link
                        href={`/service/${d.serviceId}`}
                        className="font-medium text-brand underline hover:no-underline"
                      >
                        {d.serviceName}
                      </Link>
                      <span className="block text-xs text-muted">{d.department}</span>
                    </td>
                    <td className="px-3 py-2 break-all text-slate-700">{d.name}</td>
                    <td className="px-3 py-2 whitespace-nowrap tabular-nums">
                      {d.year ? `${d.year}년` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            파일 이름은 원문에 적힌 그대로입니다(별표·괄호 포함). 이름만 보고 내용을
            짐작하지 마시고, 필요한 쪽수는 지침을 열어 확인하세요.
          </p>
        </DocSection>

        <DocSection title="지침을 읽을 때">
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
            <li>
              <strong>쪽수는 인쇄 쪽(머리글 숫자)</strong>으로 적혀 있습니다. PDF 파일의
              쪽 번호와 몇 쪽씩 어긋나는 경우가 많습니다.
            </li>
            <li>
              표가 여러 쪽에 걸쳐 나뉘어 있으면 <strong>다음 쪽까지</strong> 봐야 합니다.
              금액표는 대개 「주요 변경사항」 앞쪽에 한 번 더 실려 있어 대조하기 좋습니다.
            </li>
            <li>
              지침과 복지로 원문이 어긋나는 경우가 실제로 있습니다. 저희는 그럴 때
              어느 쪽이 맞다고 정하지 않고 <strong>어긋난 사실을 화면에 적습니다</strong>.
            </li>
          </ul>
          <p className="text-sm">
            지침을 읽어 쓴 글은{" "}
            <Link href="/guide" className="text-brand underline">
              안내 글 목록
            </Link>
            에 모여 있습니다.
          </p>
        </DocSection>
      </DocPage>
      <GuideNav current="official-docs" />
    </>
  );
}
