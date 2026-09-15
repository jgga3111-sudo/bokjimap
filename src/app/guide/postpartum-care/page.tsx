import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import MomCareCalc from "@/components/MomCareCalc";
import { guideBySlug } from "@/lib/guides";
import {
  MC_CHECKED,
  MC_SOURCE_ID,
  MC_DOC,
  MC_DOC_URL,
  MC_INSURANCE_LINE,
  MC_TYPES,
} from "@/lib/momCare";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("postpartum-care")!;
const S = services.find((s) => s.id === MC_SOURCE_ID);

export const metadata: Metadata = {
  title: "산모·신생아 건강관리(산후도우미) 본인부담금 계산 — 2026 정부지원금 표",
  description:
    "산후도우미 바우처는 출산 예정일 40일 전부터 출산 후 60일까지 신청하고, 출산일로부터 90일 안에 써야 합니다. 보건복지부 2026년 사업안내의 서비스 가격·정부지원금 표로 유형·소득 구간·기간별 본인부담금을 계산합니다.",
  alternates: { canonical: "/guide/postpartum-care" },
};

/*
  왜 이 글인가 (2026-09-15).

  조회수 9위(190만) 「산모·신생아 건강관리 지원사업」은 복지로 원문에 지원 기간(10일·15일…)만 있고
  **얼마를 내는지가 없다.** 원문에 붙은 안내서는 2025년판이라 숫자에 쓸 수 없어, 보건복지부 누리집의
  2026년 사업안내(430쪽)를 받아 읽었다. 표를 두 곳에서 대조하고 1일 기준가격으로 한 번 더 검산했다
  (`lib/momCare.ts` 머리말).

  판정은 하지 않는다 — 소득 구간과 예외지원 해당 여부는 보건소·주민센터가 정한다(3절).
  쪽수는 인쇄 쪽(머리글 숫자)이다.
*/

function Src({ page }: { page: string }) {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      <a href={MC_DOC_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
        보건복지부 「{MC_DOC}」
      </a>{" "}
      {page} · {MC_CHECKED} 확인
    </p>
  );
}

const A1 = MC_TYPES[0];

export default function PostpartumCareGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="산모·신생아 건강관리사(산후도우미)가 집으로 와서 산후관리를 돕는 바우처입니다. 신청 기한과 사용 기한이 따로 있고, 내는 돈은 출산 유형·소득 구간·이용 기간에 따라 달라집니다."
        updated={`최종 수정 ${G.updated} · 가격과 기한은 보건복지부 「${MC_DOC}」에서 ${MC_CHECKED} 확인`}
      >
        <DocSection title="먼저 기한 둘">
          <DocList
            items={[
              <>
                <strong>신청</strong> — 출산 예정일 40일 전부터 <strong>출산일로부터 60일까지</strong>. 임신 16주
                이후 유산·사산은 확인일로부터 30일 이내, 미숙아·선천성 이상아로 입원했다면 신생아 퇴원일로부터
                30일 이내입니다.
              </>,
              <>
                <strong>사용</strong> — 바우처는 <strong>출산일로부터 90일 이내</strong>에 써야 합니다(삼태아 이상
                &ldquo;연장&rdquo;은 100일). 남은 바우처가 있어도 기간이 지나면 사라집니다. 미숙아 등으로
                입원했다면 퇴원일로부터 90일이지만, 출산일로부터 2년이 지나면 소멸합니다.
              </>,
            ]}
          />
          <Src page="35·52쪽" />
        </DocSection>

        <DocSection title="누가 받나">
          <DocList
            items={[
              <>
                <strong>기본지원</strong> — 산모 또는 배우자가 생계·의료·주거·교육급여 수급자 또는 차상위계층인
                출산가정, 그리고 산모 및 배우자 등 가구의 <strong>건강보험료 본인부담금 합산액</strong>이 기준중위소득
                150% 이하인 출산가정. 임신 16주 이후 유산·사산도 포함됩니다.
              </>,
              <>
                <strong>예외지원</strong> — 150%를 넘더라도 광역 시·도가 별도 소득기준을 정해 승인한 가정(희귀·중증난치
                질환 산모, 장애인 산모·장애 신생아, 쌍생아 이상, 둘째아·셋째아 이상, 새터민·결혼이민·미혼모 산모,
                분만 취약지, 미숙아 출산 등). <strong>시·도마다 대상과 기준이 다릅니다.</strong>
              </>,
            ]}
          />
          <Src page="33~34쪽" />
          <p>
            150% 기준은 월급이 아니라 <strong>건강보험료</strong>로 봅니다. 사업안내의 판정 기준표입니다(장기요양보험료
            제외).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">가구원 수</th>
                  <th className="px-3 py-2 text-right font-semibold">소득기준</th>
                  <th className="px-3 py-2 text-right font-semibold">직장가입자</th>
                  <th className="px-3 py-2 text-right font-semibold">지역가입자</th>
                  <th className="px-3 py-2 text-right font-semibold">혼합</th>
                </tr>
              </thead>
              <tbody>
                {MC_INSURANCE_LINE.map(([k, line, work, local, mix]) => (
                  <tr key={k} className="border-b border-line tabular-nums">
                    <td className="px-3 py-2">{k}</td>
                    <td className="px-3 py-2 text-right">{won(line)}</td>
                    <td className="px-3 py-2 text-right">{won(work)}</td>
                    <td className="px-3 py-2 text-right">{won(local)}</td>
                    <td className="px-3 py-2 text-right">{won(mix)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Src page="44쪽 「건강보험료 본인부담금에 의한 소득 150% 판정기준」" />
          <DocNote title="표 밖의 계산은 보건소가 합니다">
            가구원 중 직장·지역가입자가 섞여 있으면 보험료를 합산하는 등 세부 산정 방법이 따로 있습니다. 위 표는
            기준선일 뿐이고, 해당 여부는 신청할 때 보건소·주민센터가 정합니다.
          </DocNote>
        </DocSection>

        <DocSection title="계산해 보기">
          <MomCareCalc />
        </DocSection>

        <DocSection title="가격은 이렇게 정해집니다">
          <DocList
            items={[
              <>
                <strong>1일 기준가격</strong>은 단태아 {won(146_400)}이고, 쌍태아는 건강관리사 1명 {won(183_200)}·2명{" "}
                {won(284_800)}입니다. 서비스 가격은 여기에 이용 일수를 곱한 값입니다(예: 단태아 첫째아 표준{" "}
                {A1.days[1]}일 {won(A1.price[1] * 1000)}).
              </>,
              <>
                <strong>본인부담금 = 서비스 가격 − 정부지원금</strong>이고 부가가치세는 면제입니다. 이용 전에
                제공기관에 먼저 냅니다.
              </>,
              <>
                제공기관은 기준가격의 <strong>+5% 범위</strong>에서 경력·자격이 있는 인력에 자율 가격 상품을 둘 수
                있지만, 기준가격 상품은 반드시 운영해야 합니다. 제공기관의 가격은 사회서비스 전자바우처
                누리집(www.socialservice.or.kr)에 공개됩니다.
              </>,
              <>
                단축·표준·연장은 이용자가 고릅니다. 중증 장애인 산모는 한 단계 위 유형(단태아→쌍태아 유형 등)을 쓰고,
                미숙아로 중환자실·신생아집중치료실에 입원했다면 한 단계 높은 서비스를 고를 수 있습니다.
              </>,
            ]}
          />
          <Src page="49~52쪽" />
        </DocSection>

        <DocSection title="신청은 어디서">
          <p>
            산모 본인, 친족, 법정대리인이 신청할 수 있습니다. 복지로 원문은 주소지 읍·면·동 주민센터, 보건소,
            복지로에서 신청한다고 적습니다. 결정되면 국민행복카드로 바우처를 받아 제공기관과 계약한 뒤 이용합니다.
          </p>
          <p>
            문의: 사회서비스 전자바우처 <strong>1566-3232</strong> · 보건복지상담센터 <strong>129</strong>
          </p>
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문 →
              </Link>
            </p>
          )}
          <DocNote>
            이 글은 보건복지부 사업안내와 복지로 원문을 옮기고 그 표로 계산한 것이며, 대상인지 판정하지 않습니다.
            사는 시·군·구가 본인부담금 일부를 따로 지원하는 경우도 있으니 관할 보건소에 함께 확인해 주세요.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="postpartum-care" />
    </>
  );
}
