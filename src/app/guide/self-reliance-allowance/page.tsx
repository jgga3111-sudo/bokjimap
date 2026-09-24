import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import { won } from "@/lib/display";
import {
  SRA_BOOK,
  SRA_BOOK_URL,
  SRA_CHECKED,
  SRA_MANUAL,
  SRA_MANUAL1_URL,
  SRA_MANUAL2_URL,
  SRA_MONTHLY,
  SRA_SETTLE_BY_SIDO,
  SRA_SETTLE_ID,
  SRA_SHELTER_ID,
  SRA_SOURCE_ID,
} from "@/lib/selfRelianceAllowance";

const G = guideBySlug("self-reliance-allowance")!;
const S = services.find((s) => s.id === SRA_SOURCE_ID);
const SETTLE = services.find((s) => s.id === SRA_SETTLE_ID);
const SHELTER = services.find((s) => s.id === SRA_SHELTER_ID);

export const metadata: Metadata = {
  title: "자립준비청년 자립수당 월 50만원 — 매월 20일, 보호종료 30일 전부터 신청, 멈추는 경우",
  description:
    "아동복지시설·가정위탁에서 2년 이상 보호받고 보호가 끝난 청년에게 5년간 매월 50만원을 줍니다. 지급일은 매월 20일, 보호종료 30일 전부터 신청할 수 있고 자립교육 이수증이 필요합니다. 생계급여 소득으로 치지 않는다는 것과 지급이 멈추는 경우를 국가아동권리보장원 2026년 자료로 확인했습니다.",
  alternates: { canonical: "/guide/self-reliance-allowance" },
};

/*
  왜 이 글인가 (2026-09-24, 사용자 요청).

  조회수 28위(약 60만)인데 「따로 확인한 것」이 0이었고 원문에 첨부 지침도 없었다.
  근거는 `lib/selfRelianceAllowance.ts` 머리말.
*/

const DOCS = {
  book: { name: SRA_BOOK, url: SRA_BOOK_URL },
  m1: { name: `${SRA_MANUAL} Ⅰ`, url: SRA_MANUAL1_URL },
  m2: { name: `${SRA_MANUAL} Ⅱ`, url: SRA_MANUAL2_URL },
} as const;

function Src({ doc, pages }: { doc: keyof typeof DOCS; pages: string }) {
  const d = DOCS[doc];
  return (
    <p className="text-xs text-muted">
      출처{" "}
      <a href={d.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
        {d.name}
      </a>{" "}
      {pages} · {SRA_CHECKED} 확인
    </p>
  );
}

const th = "px-3 py-2 font-semibold";
const td = "px-3 py-2";

export default function SelfRelianceAllowanceGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="아동양육시설·공동생활가정·가정위탁 등에서 보호를 받다가 보호가 끝난 청년에게 매달 주는 돈입니다. 복지로 원문은 대상과 금액만 적어 두어서, 지급일·신청 준비물·멈추는 경우를 국가아동권리보장원 2026년 자료에서 옮겼습니다."
        updated={`최종 수정 ${G.updated} · 국가아동권리보장원 자료에서 ${SRA_CHECKED} 확인`}
      >
        <DocNote tone="brand" title="매월 20일, 본인 계좌로 50만원">
          자립수당은 <strong>자립준비청년 본인 명의 계좌</strong>로 매달 <strong>{won(SRA_MONTHLY)}</strong>이 들어오고,{" "}
          <strong>지급일은 매월 20일</strong>입니다(주말·공휴일이면 그 전날). 이 돈은{" "}
          <strong>기초생활보장 생계급여의 소득으로 치지 않습니다.</strong>
          <Src doc="book" pages="28쪽" />
        </DocNote>

        <DocSection title="누가 받나">
          <p>
            아동복지시설(아동양육시설·아동일시보호시설·아동보호치료시설·공동생활가정)이나 가정위탁에서{" "}
            <strong>보호가 끝난 날을 기준으로 그 전 2년 이상 이어서</strong> 보호받은 사람 중 아래 둘 중 하나에 해당해야
            합니다. 2년은 보호 시작일과 종료일이 속한 <strong>달</strong>로 셉니다.
          </p>
          <DocList
            items={[
              <>
                <strong>18세 이후</strong> 만기·연장 보호가 끝났거나 재보호가 끝난 사람으로서 보호종료 5년 이내(2018년 8월
                이후 보호가 끝난 사람)
              </>,
              <>
                <strong>15세 이후 보호가 일찍 끝난</strong> 사람으로서 18세가 된 때부터 5년 이내(아동복지법 시행일인
                2024년 2월 9일 이후 18세가 된 사람부터)
              </>,
            ]}
          />
          <DocNote title="받을 수 없는 경우">
            18세 전에 <strong>원래 가정으로 돌아가</strong> 보호가 끝난 경우, 그리고 신청할 때{" "}
            <strong>다른 법에 따라 자립지원수당 등을 받고 있는</strong> 경우입니다.
            {SHELTER && (
              <>
                {" "}
                청소년쉼터·청소년자립지원관 퇴소자에게 주는{" "}
                <Link href={`/service/${SHELTER.id}`} className="text-brand underline">
                  {SHELTER.name}
                </Link>
                (성평등가족부)은 이름이 비슷한 다른 사업입니다. 어느 쪽 대상인지는 129나 행정복지센터에 확인하세요.
              </>
            )}
          </DocNote>
          <p className="text-sm text-muted">
            자립정보북 요약표는 지급 기간이 「3년 → 5년(2021년 8월~) → 60회(2025년 1월~)」로 바뀌어 왔다고 적습니다.
            「60회」가 계산 방식을 어떻게 바꿨는지는 자료에 설명이 없어 옮겨 적기만 합니다.
          </p>
          <Src doc="m1" pages="49~50쪽" />
        </DocSection>

        <DocSection title="신청은 보호가 끝나기 30일 전부터">
          <p>
            <strong>보호종료 30일 전부터</strong> 미리 신청할 수 있습니다. 아동복지시설에서 나올 예정이면 시설 종사자가
            시설 관할 행정복지센터에 대신 신청합니다. 처리기한은 <strong>30일</strong>(특별한 사유가 있으면 60일)입니다.
          </p>
          <DocList
            items={[
              <>
                <strong>행정복지센터 방문</strong> — 본인이나 대리인이 주민등록상 주소지 읍·면·동에 냅니다.
              </>,
              <>
                <strong>복지로 온라인</strong> — 본인만 할 수 있습니다(대리 신청 불가). 계좌 확인이 5번 넘게 실패하면 통장
                사본을 붙입니다.
              </>,
              <>
                <strong>우편·팩스</strong> — 해외 유학·군 입대·입원처럼 방문이 어려운 사유가 있을 때만, 그 사유를 증명하는
                서류(재학증명서·입영 사실 확인서·입원 확인서 등)를 붙여서 냅니다.
              </>,
            ]}
          />
          <DocNote tone="brand" title="먼저 자립교육 이수증을 받아 두세요">
            신청서·신분증과 함께 아래 넷 중 <strong>하나</strong>를 꼭 내야 합니다.
            <DocList
              items={[
                <>국민연금공단 희망출발 재무상담 확인서(전국 40개 지사, 대면·영상 상담)</>,
                <>국가아동권리보장원 아동복지통합서비스 사이버교육센터 「보호종료(예정)아동 온라인 자립교육」 이수증</>,
                <>서민금융진흥원 금융교육포털 「보호종료아동 자립교육」 이수증</>,
                <>금융감독원 e-금융교육센터 「보호종료아동(예비자립준비청년) 온라인 자립교육」 수료증(2026년 6월 도입)</>,
              ]}
            />
          </DocNote>
          <p>
            계좌는 <strong>본인 명의만</strong> 됩니다. 압류방지통장이면 통장 사본을 붙이고, 시스템에서 보호종료가 확인되지
            않으면 「보호종료 확인서」를 냅니다 — 2020년 10월 이후 보호가 끝났으면 행정복지센터에서, 그 전이면 시설이나
            가정위탁지원센터에서 받습니다.
          </p>
          <Src doc="book" pages="28~29쪽" />
          <Src doc="m2" pages="9~12쪽" />
        </DocSection>

        <DocSection title="지급이 멈추는 경우">
          <DocList
            items={[
              <>
                <strong>해외에 90일 이상 계속 머무는 동안</strong> — 다만 <strong>유학·취업 인턴</strong>으로 나가 있는 기간은
                빼 줍니다. 그 사유를 증명해 신고해야 합니다.
              </>,
              <>교정시설에 들어간 기간, 주민등록이 말소되거나 거주불명으로 등록된 기간, 행방불명·실종 기간</>,
              <>
                <strong>재보호조치</strong>로 다시 보호를 받는 동안 — 재보호가 끝나면 끝난 날이 속한 달부터 다시 줍니다
              </>,
              <>자립지원전담기관의 사후관리 참여 같은 수급자 의무를 다하지 않은 경우(중지될 수 있음)</>,
            ]}
          />
          <p>
            이런 일이 생기면 행정복지센터에 알려야 합니다. 거짓이나 부정한 방법으로 받은 돈은 전부 또는 일부를 돌려받아
            갑니다.
          </p>
          <Src doc="m2" pages="11~12쪽" />
          <Src doc="m1" pages="49~50·59~60쪽" />
        </DocSection>

        <DocSection title="함께 알아 둘 것 — 자립정착금과 기초생활보장">
          <p>
            자립수당과 별도로 보호가 끝날 때 <strong>한 번</strong> 주는{" "}
            {SETTLE ? (
              <Link href={`/service/${SETTLE.id}`} className="text-brand underline">
                자립정착금
              </Link>
            ) : (
              <>자립정착금</>
            )}
            이 있습니다. 지자체가 주는 돈이라 시·도마다 금액이 다르고, 원칙적으로 보호가 끝난 해에 시설 등을 관할하는 지자체가 지급합니다. 자립정보북이 실은 2026년 1월 조사 기준 금액입니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className={th}>시·도</th>
                  <th className={th}>1인당 지급 기준</th>
                </tr>
              </thead>
              <tbody>
                {SRA_SETTLE_BY_SIDO.map(([sido, man]) => (
                  <tr key={sido} className="border-b border-line">
                    <td className={`${td} font-medium text-ink`}>{sido}</td>
                    <td className={`${td} tabular-nums`}>{man.toLocaleString("ko-KR")}만원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            자립정착금은 사용계획서를 써서 시설이나 가정위탁지원센터를 통해 신청하고, 나눠서 받는 것을 권합니다. 보증금·
            학자금처럼 한 번에 목돈이 필요하면 한꺼번에 받을 수도 있습니다. 재보호조치 뒤에 다시 받을 수는 없습니다.
          </p>
          <p>
            기초생활보장을 신청하면 <strong>보호가 끝난 뒤 5년 동안</strong> 근로·사업소득에서 <strong>60만원을 먼저 빼고
            나머지의 30%를 더 빼 주는</strong> 공제가 있습니다(자립정보북 요약). 자립수당은 앞서 적은 대로 생계급여 소득에
            넣지 않습니다.
          </p>
          <Src doc="book" pages="10·30~31쪽" />
        </DocSection>

        <DocSection title="확인과 문의">
          <p>
            문의는 보건복지상담센터 <strong>129</strong>와 주소지 읍·면·동 행정복지센터입니다. 자립준비청년 전용 상담은
            국가아동권리보장원 <strong>1855-2455</strong>이고, 지원 정보는 자립정보ON(jaripon.ncrc.or.kr)에 모여 있습니다.
          </p>
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문 →
              </Link>
            </p>
          )}
          <DocNote>
            이 글은 국가아동권리보장원 자료와 아동복지법에 적힌 것을 옮긴 것이며, 누가 받을 수 있는지 판정하지 않습니다.
            보호 이력과 기간은 시·군·구가 확인해 정합니다.
          </DocNote>
          <Src doc="m1" pages="7~8쪽" />
        </DocSection>
      </DocPage>
      <GuideNav current="self-reliance-allowance" />
    </>
  );
}
