import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";

const G = guideBySlug("grain-discount")!;
const CHECKED = "2026-09-30";
const LAW = "https://www.law.go.kr/법령/양곡관리법";
const DECREE = "https://www.law.go.kr/법령/양곡관리법시행령";
const GANGNAM = "https://bokji.gangnam.go.kr/board/BBS_SUPPORT/1498/view.do?mid=ID03_02&type=";

export const metadata: Metadata = {
  title: "양곡할인 2026 — 대상 5갈래와 매달 신청, 10kg 2,500원·10,000원",
  description:
    "정부양곡 할인(복지용 쌀)은 2026년 8월 27일부터 양곡관리법 제9조의5에 근거를 두었습니다. 대상이 수급권자·차상위·한부모·재난 피해자·무상급식 단체까지 다섯 갈래인 점, 신청일 현재 자격을 보는 점, 월 단위로 신청하는 점, 할인율과 1인당 물량은 농림축산식품부가 정한다는 점을 법과 시행령에서 옮겼습니다.",
  alternates: { canonical: "/guide/grain-discount" },
};

/*
  왜 이 글인가 (2026-09-30 아침 루틴).

  조회수 39위 「양곡할인」(28만) 원문은 대상 셋(수급자·법정 차상위·한부모)과 개인부담(생계·의료 10kg당 2,500원,
  주거·교육·차상위 10,000원)까지만 적고 「따로 확인한 것」이 없다. 원문 첨부 「2025년도 정부관리양곡 매출지침」은
  한 해 낡았고, 2026년 지침은 찾지 못했다(농식품부 자료실에는 수급계획 자료만 나온다).

  그런데 이 제도에는 올해 새로 생긴 법적 근거가 있다.
   · 양곡관리법 제9조의5(본조신설 2026.5.12., 시행 2026.8.27.) — 할인 제공 대상 다섯 갈래.
   · 시행령 제12조의2·제13조(본조신설 2026.8.25., 시행 2026.8.27.) — 신청일 현재 자격, 월 단위 신청, 할인율·1인당 물량은 장관이 정함.
  법제처 DRF API(target=law)로 두 법령 전문을 받아 옮겼다. 시행일자는 양쪽 모두 20260827.

  복지로 원문의 개인부담(2,500원·10,000원)은 강남구 복지플랫폼(수정일 2026-05-11)의 안내와 같다. 검색 결과 요약에
  1,960원·9,800원 같은 값이 보였으나 출처를 확인하지 못해 쓰지 않았다(3절 — 확인 못 하면 안 싣는다).
  양주시 안내의 「매월 1일~10일 신청」은 수정일이 2024-03-11·’23년산 기준이라 쓰지 않았다.
*/

const cell = "px-3 py-2";
const th = "px-3 py-2 font-semibold";
const head = "border-y border-line bg-sunken text-left";
const row = "border-b border-line align-top";

/* 양곡관리법 제9조의5제1항 각 호 */
const TARGETS: readonly (readonly [string, string, string])[] = [
  ["1호", "「국민기초생활 보장법」 제2조제1호의 수급권자 · 같은 조 제10호의 차상위계층", "적혀 있음(수급자 · 법정 차상위)"],
  ["2호", "「국민기초생활 보장법」 제32조의 보장시설", "원문에 없음"],
  ["3호", "「한부모가족지원법」 제5조·제5조의2의 지원대상자", "적혀 있음"],
  ["4호", "「재난 및 안전관리 기본법」 제3조제1호의 재난으로 피해를 입은 자", "원문에 없음"],
  ["5호", "생활이 어려운 자에게 무상으로 급식을 제공하는 단체로서 시장·군수·구청장이 인정하는 단체", "원문에 없음"],
];

export default function GrainDiscountGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="정부양곡 할인은 오래된 제도인데, 2026년 8월 27일부터 양곡관리법에 근거 조문이 생겼습니다. 복지로 원문은 대상을 셋만 적고 있어서, 법과 시행령이 정한 대상과 신청 방식을 옮겨 적고 원문과 어긋나는 곳을 표시했습니다."
        updated={`최종 수정 ${G.updated} · 양곡관리법·시행령(2026-08-27 시행)에서 ${CHECKED} 확인`}
      >
        <DocSection title="올해 새로 생긴 것 — 법에 근거가 들어갔다">
          <DocList
            items={[
              <>
                <strong>양곡관리법 제9조의5</strong>(정부관리양곡의 할인 제공) — 2026년 5월 12일 신설, <strong>8월 27일 시행</strong>입니다.
                농림축산식품부장관이 생활이 어려운 자의 생활안정을 위해 정부관리양곡을 <strong>할인하여 제공할 수 있다</strong>고 적습니다.
              </>,
              <>
                <strong>시행령 제12조의2·제13조</strong> — 2026년 8월 25일 신설, 같은 날 8월 27일 시행입니다. 대상의 요건과 신청 방식을 정합니다.
              </>,
              <>
                법 제9조의5제3항은 매 회계연도의 제공 내역을 <strong>다음 연도 5월 31일까지 국회 소관 상임위원회에 보고</strong>하도록 합니다.
              </>,
            ]}
          />
          <p className="text-sm text-slate-600">
            법 조문에는 「할인하여 제공할 수 있다」로 적혀 있어 제공이 의무로 정해진 것은 아닙니다. 어떤 할인이 실제로 나가는지는 아래 「이 글에 없는 것」을 함께 보세요.
          </p>
        </DocSection>

        <DocSection title="법이 정한 대상 다섯 갈래">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className={head}>
                  <th className={th}>제9조의5제1항</th>
                  <th className={th}>대상</th>
                  <th className={th}>복지로 원문</th>
                </tr>
              </thead>
              <tbody>
                {TARGETS.map(([n, who, orig]) => (
                  <tr key={n} className={row}>
                    <td className={`${cell} font-semibold whitespace-nowrap`}>{n}</td>
                    <td className={cell}>{who}</td>
                    <td className={cell}>{orig}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600">
            복지로 원문의 「지원 대상」은 기초생활수급자(생계·의료·주거·교육), 법정 차상위계층, 한부모가족지원법 지원 대상자 가구 셋입니다.
            법 조문에는 여기에 <strong>보장시설·재난 피해자·무상급식 단체</strong>가 더 들어 있습니다. 두 문서가 어긋나는 것이 아니라 원문이
            개인 가구만 적었을 가능성이 있으나, 이 셋에 실제로 어떻게 나가는지는 지침을 찾지 못해 <strong>판정하지 않습니다</strong>.
          </p>
        </DocSection>

        <DocSection title="신청 — 신청일 현재 자격, 그리고 월 단위">
          <DocList
            items={[
              <>
                <strong>월 단위로 신청</strong>합니다(시행령 제13조제1항). 한 번 신청해 두는 방식이 아니라 「월단위로 신청해야 한다」고 적혀 있습니다.
                신청받은 농림축산식품부장관이 요건을 갖췄는지 확인합니다(제13조제2항).
              </>,
              <>
                수급권자·차상위·한부모·재난 피해자(1~4호)는 <strong>신청일 현재</strong> 해당 자격을 갖추고 있어야 합니다(시행령 제12조의2제1항제1호).
              </>,
              <>
                무상급식 단체(5호)는 신청일 현재 <strong>① 3개월 이상 계속해 주 2회 이상</strong> 생활이 어려운 사람에게 무상으로 급식을 제공하고,{" "}
                <strong>② 국가·지방자치단체에서 양곡 구입 비용을 지원받지 않아야</strong> 합니다(같은 항 제2호).
              </>,
              <>
                실제 신청 창구는 복지로 원문에 「읍·면·동 주민센터」로 적혀 있고, 강남구 복지플랫폼도 주소지 관할 동주민센터에 정부양곡 신청서를
                내도록 안내합니다(수정일 2026-05-11).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="얼마를 내나 — 원문 값, 그리고 정해지는 곳">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className={head}>
                  <th className={th}>구분</th>
                  <th className={th}>10kg 1포당 개인부담</th>
                </tr>
              </thead>
              <tbody>
                <tr className={row}>
                  <td className={cell}>생계급여·의료급여 수급자</td>
                  <td className={cell}>2,500원</td>
                </tr>
                <tr className={row}>
                  <td className={cell}>주거급여·교육급여 수급자 · 차상위계층</td>
                  <td className={cell}>10,000원</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600">
            복지로 원문 「지원 내용」 그대로입니다. 강남구 복지플랫폼(수정일 2026-05-11)도 같은 금액을 적습니다(
            <a href={GANGNAM} target="_blank" rel="noopener noreferrer" className="text-brand underline">
              해당 안내
            </a>
            ).
          </p>
          <DocNote tone="amber" title="할인율과 물량은 법에 없습니다">
            시행령 제12조의2제2항은 <strong>할인율과 1인당 공급물량 등 세부 기준</strong>을 농림축산식품부장관이 지원 대상자의 소득 수준·지원 목적·
            정부관리양곡의 수급 상황 등을 고려해 정한다고 합니다. 그래서 위 금액은 그때그때 지침에 따라 달라질 수 있습니다. 복지로 원문에 붙은
            지침 파일은 「2025년도 정부관리양곡 매출지침」이고, 2026년도 지침은 이 글을 쓴 날 찾지 못했습니다.
          </DocNote>
          <p className="text-sm">
            원문은 「수급자가 의무적으로 구입하는 것이 아님」이라고 적습니다. 할인을 받는 것은 신청한 가구에 한하며, 신청하지 않으면 나오지 않습니다.
          </p>
        </DocSection>

        <DocNote tone="amber" title="이 글에 없는 것">
          1인당 월 몇 kg까지 사는지, 신곡·구곡에 따라 값이 달라지는지, 배송 방식, 예산이 떨어지면 어떻게 되는지는 시행령이 「장관이 정한다」로 넘긴
          부분이라 지침에 있습니다. 2026년도 지침을 확인하지 못해 싣지 않았고, 지자체 누리집의 수정일이 오래된 안내(예: ’23년산 기준)도 옮기지 않았습니다.
          보장시설·재난 피해자·무상급식 단체가 어떻게 신청하는지도 같은 이유로 적지 않았습니다. 받을 수 있는지는 주민센터가 정하므로 이 글은 판정하지 않습니다.
          함께 받을 수 있는 다른 지원은{" "}
          <Link href="/guide/combined-support" className="text-brand underline">
            함께 받기 글
          </Link>
          을 참고하세요.
        </DocNote>

        <DocSection title="출처">
          <DocList
            items={[
              <>
                <a href={LAW} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                  양곡관리법
                </a>{" "}
                제9조의5(2026-05-12 신설, 2026-08-27 시행)
              </>,
              <>
                <a href={DECREE} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                  양곡관리법 시행령
                </a>{" "}
                제12조의2·제13조(2026-08-25 신설, 2026-08-27 시행)
              </>,
              <>복지로 「양곡할인」 원문(개인부담 금액·신청 창구) · 서울 강남구 복지플랫폼 정부양곡 할인지원(수정일 2026-05-11)</>,
            ]}
          />
          <p className="text-sm">
            문의: 읍·면·동 행정복지센터 · 보건복지상담센터 <strong>129</strong>
          </p>
          <p className="flex flex-col gap-1">
            <Link href="/service/WLF00000074" className="text-brand underline">
              양곡할인 상세 보기 — 복지로 원문 →
            </Link>
          </p>
          <DocNote>
            이 글은 법령의 조문과 복지로 원문을 옮긴 것이며, 받을 수 있는지 판정하지 않습니다.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="grain-discount" />
    </>
  );
}
