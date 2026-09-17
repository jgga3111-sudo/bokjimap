import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import ChildcareCalc from "@/components/ChildcareCalc";
import { guideBySlug } from "@/lib/guides";
import { CS_CHECKED, CS_SITE, CS_SOURCE_ID, CS_FEE_30, CS_GOV_30 } from "@/lib/childcareService";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("childcare-service")!;
const S = services.find((s) => s.id === CS_SOURCE_ID);

export const metadata: Metadata = {
  title: "아이돌봄서비스 본인부담금 계산 — 2026 소득 유형별 정부지원금 표",
  description:
    "아이돌봄서비스 이용요금은 시간당 12,790원(기본형)이고, 정부가 가~라형 소득 유형과 아이 나이에 따라 일부를 냅니다. 성평등가족부 아이돌봄 누리집의 요금표로 한 달 본인부담금을 계산하고, 취소 수수료·중복 지원 제한을 정리했습니다.",
  alternates: { canonical: "/guide/childcare-service" },
};

/*
  왜 이 글인가 (2026-09-17 아침 루틴).

  「아이돌봄서비스」는 복지로 조회수 110만인데 우리 안내 글이 없었다. 네이버 데이터랩 최근
  3개월 주간 평균이 실업급여의 약 0.87배다. 복지로 원문에는 시간당 **정부지원금**만 있고
  이용요금·본인부담금·취소 수수료·중복 제한이 없다.

  원문 첨부 지침 PDF는 글자가 그림으로만 들어 있어 읽지 못했다. 같은 부처가 운영하는
  아이돌봄 누리집(idolbom.go.kr)의 요금표를 옮기고, 복지로 원문 금액과 대조했다
  (`lib/childcareService.ts` 머리말). 판정은 하지 않는다 — 유형은 주민센터가 정한다(3절).
*/

function Src({ what = "서비스 유형 소개" }: { what?: string }) {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      <a href={CS_SITE} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
        성평등가족부 아이돌봄서비스 누리집
      </a>{" "}
      「{what}」 · {CS_CHECKED} 확인
    </p>
  );
}

const TIERS = [
  ["가형", "ga", "75% 이하", 4_872_000],
  ["나형", "na", "120% 이하", 7_794_000],
  ["다형", "da", "150% 이하", 9_743_000],
  ["라형", "ra", "250% 이하", 16_237_000],
] as const;

export default function ChildcareServiceGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="아이돌봄사가 집으로 와서 만 12세 이하 아이를 돌봐 주는 서비스입니다. 요금은 누구나 같고, 정부가 그중 얼마를 내 주는지가 소득 유형과 아이 나이에 따라 달라집니다."
        updated={`최종 수정 ${G.updated} · 요금과 지원금은 아이돌봄 누리집에서 ${CS_CHECKED} 확인`}
      >
        <DocSection title="요금은 같고, 정부지원이 다릅니다">
          <DocList
            items={[
              <>
                <strong>이용요금</strong> — 시간제 기본형·영아종일제 시간당 <strong>12,790원</strong>, 아이와 관련된
                세탁·청소·조리까지 하는 시간제 종합형 <strong>16,620원</strong>. 밤 10시~아침 6시와 일요일·공휴일은
                기본요금의 50%가 더 붙습니다(둘이 겹쳐도 50%만).
              </>,
              <>
                <strong>정부지원 시간</strong> — 시간제는 한 해 <strong>960시간</strong>, 영아종일제는 월 80~200시간.
                넘는 시간과 정부지원 대상이 아닌 가정은 전액 본인부담으로 이용할 수 있습니다.
              </>,
              <>
                <strong>본인부담금 = 이용요금 − 정부지원금</strong>. 정부지원금은 종합형도 기본형과 같아서, 종합형을
                고르면 늘어난 요금만큼 본인부담이 늘어납니다.
              </>,
            ]}
          />
          <Src />
        </DocSection>

        <DocSection title="정부지원을 받으려면">
          <p>누리집은 아래 셋을 모두 갖춰야 하고, 넷째(가구 소득)에 따라 지원 범위가 달라진다고 적습니다.</p>
          <DocList
            items={[
              <>
                <strong>아이 나이</strong> — 시간제는 생후 3개월~만 12세, 영아종일제는 생후 3개월~만 36개월.
              </>,
              <>
                <strong>양육 공백</strong> — 맞벌이, 한부모(조손 포함), 장애부모, 다자녀, 다문화, 아동학대 피해위기,
                기타 양육부담 가정. 부모 모두 취업하지 않아 집에서 돌볼 수 있으면 대상이 아닙니다.
              </>,
              <>
                <strong>다른 양육 지원과 겹치지 않을 것</strong> — 아래 「놓치기 쉬운 것」 참고.
              </>,
            ]}
          />
          <p>
            소득 유형은 <strong>건강보험료 본인부담금</strong>으로 월평균 가구소득을 따져 정합니다(맞벌이는 합산소득의
            25%를 줄여 봅니다). 복지로 원문이 적은 2026년 4인 가구 기준입니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">유형</th>
                  <th className="px-3 py-2 font-semibold">기준 중위소득</th>
                  <th className="px-3 py-2 text-right font-semibold">4인 가구 월소득</th>
                </tr>
              </thead>
              <tbody>
                {TIERS.map(([label, , line, amount]) => (
                  <tr key={label} className="border-b border-line tabular-nums">
                    <td className="px-3 py-2">{label}</td>
                    <td className="px-3 py-2">{line}</td>
                    <td className="px-3 py-2 text-right">{won(amount)}</td>
                  </tr>
                ))}
                <tr className="border-b border-line">
                  <td className="px-3 py-2">마형</td>
                  <td className="px-3 py-2" colSpan={2}>
                    250% 초과 — 정부지원 없음
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Src what="정부지원 신청안내" />
        </DocSection>

        <DocSection title="계산해 보기">
          <ChildcareCalc />
        </DocSection>

        <DocSection title="30분당 정부지원금 표 (아이 1명)">
          <p>
            누리집 요금표의 값 그대로입니다. 30분 요금은 평일 주간 {won(CS_FEE_30.basic.day)}, 야간·휴일{" "}
            {won(CS_FEE_30.basic.night)}(기본형·영아종일제 기준)입니다. <strong>A형</strong>은 그해 1월 1일 기준 만 7세
            미만, <strong>B형</strong>은 만 7세 이상 아이입니다. 영아종일제는 A형 값을 씁니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">유형</th>
                  <th className="px-3 py-2 text-right font-semibold">주간 A형</th>
                  <th className="px-3 py-2 text-right font-semibold">주간 B형</th>
                  <th className="px-3 py-2 text-right font-semibold">야간·휴일 A형</th>
                  <th className="px-3 py-2 text-right font-semibold">야간·휴일 B형</th>
                </tr>
              </thead>
              <tbody>
                {TIERS.map(([label, id]) => (
                  <tr key={label} className="border-b border-line tabular-nums">
                    <td className="px-3 py-2">{label}</td>
                    <td className="px-3 py-2 text-right">{won(CS_GOV_30.day[id][0])}</td>
                    <td className="px-3 py-2 text-right">{won(CS_GOV_30.day[id][1])}</td>
                    <td className="px-3 py-2 text-right">{won(CS_GOV_30.night[id][0])}</td>
                    <td className="px-3 py-2 text-right">{won(CS_GOV_30.night[id][1])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Src what="이용요금표" />
          <p className="text-sm text-slate-600">
            이 값의 두 배가 복지로 원문의 시간당 정부지원금(가형 A형 10,872원 … 라형 B형 1,280원)과 모든 칸에서 같습니다.
          </p>
        </DocSection>

        <DocSection title="더 지원받는 경우">
          <DocList
            items={[
              <>
                <strong>다자녀</strong> — 가~라형 가정이 만 12세 이하 아이 둘 이상을 키우면 본인부담금의 10%를 더
                지원합니다.
              </>,
              <>
                <strong>인구감소지역</strong> — 본인부담금의 5%를 더 지원합니다(행정안전부 고시로 지역이 바뀔 수 있음).
              </>,
              <>
                <strong>아이 둘 이상을 한 돌봄사가 함께</strong> — 둘이면 25%, 셋이면 33.3%, 넷이면 37.5%, 다섯이면 40%
                할인됩니다.
              </>,
              <>
                <strong>청소년 부모</strong> — 누리집은 가~라형 중 만 1세 이하를 키우는 만 24세 이하 부모에게 이용요금의
                90%를 지원한다고 적습니다. 복지로 원문은 「청소년(한)부모, 0~1세 자녀 양육 가정」에 시간당 11,512원을
                지원한다고 적습니다.
              </>,
              <>
                <strong>한부모·조손·장애부모·청소년부모 가정</strong> — 정부지원 시간이 120시간 늘어 한 해{" "}
                <strong>1,080시간</strong>입니다(가~라형).
              </>,
            ]}
          />
          <Src />
          <DocNote title="두 곳이 다르게 적은 것이 있습니다">
            한부모·장애부모·장애아동·청소년부모 가정은 <strong>가형</strong>에서 정부지원이 5%포인트 더 붙습니다. 미취학
            아이는 두 곳 모두 90%(복지로 원문 시간당 11,512원)로 같습니다. 그런데 <strong>취학 아이(B형)</strong>는 누리집
            안내문이 「75% → 80%」라고 적고, 복지로 원문은 시간당 10,872원(이용요금의 85%)이라고 적습니다. 누리집의 일반
            가정 요금표도 B형 가형을 이미 80%로 싣고 있어 어느 쪽이 맞는지 저희가 정할 수 없습니다. 그래서 계산기에 넣지
            않았습니다. 이 경우에 해당하면 아이돌봄 콜센터(1577-8136)에 확인해 주세요.
          </DocNote>
        </DocSection>

        <DocSection title="놓치기 쉬운 것">
          <DocList
            items={[
              <>
                <strong>어린이집·유치원 시간에는 정부지원이 없습니다.</strong> 보육료·유아학비를 받는 아이는 보육시설 평일
                09:00~16:00, 유치원 평일 09:00~13:00에 전액 본인부담입니다. 방학·휴원·진료 등은 서류를 내면 예외가
                됩니다.
              </>,
              <>
                <strong>영아종일제가 결정되면 부모급여·양육수당이 자동으로 끝납니다.</strong> 영아종일제는 보육료·유아학비·
                부모급여·양육수당·시간제 정부지원과 겹쳐 받을 수 없습니다. 누리집은 먼저 제공기관에 연계가 되는지 확인하고
                신청하라고 안내합니다.
              </>,
              <>
                같은 아이가 시간제와 영아종일제를 함께 지원받을 수 없고, 둘 사이를 바꾸면 시간제 80시간을 영아종일제
                1개월로 쳐서 서로 뺍니다. 바꾼 유형은 다음 달 1일부터 적용됩니다.
              </>,
              <>
                <strong>취소 수수료</strong> — 시작 24시간 전~1시간 전 취소는 건당 12,790원, 1시간 전부터는 12,790원 × 연계
                시간 × 50%(최소 12,790원), 시작 뒤에는 이용요금 전액입니다. 시작 72시간 안 취소가 한 달 3건 이상이면 1개월
                이용이 제한됩니다.
              </>,
              <>
                <strong>결제는 국민행복카드로만</strong> 합니다. 이용일 2일 전에 자동 결제되고, 아이사랑카드·아이행복카드
                같은 다른 카드는 쓸 수 없습니다. 정부지원 신청자·누리집 가입자·카드 명의자가 같아야 합니다.
              </>,
            ]}
          />
          <Src what="서비스 제한안내 · 정부지원 신청안내" />
        </DocSection>

        <DocSection title="신청은 어디서">
          <p>
            정부지원은 주소지 읍·면·동 주민센터나 복지로에서 신청하고, 처리 기한은 14일입니다. 누리집은 부부 모두 직장
            건강보험 가입자인 맞벌이와, 직장 건강보험에 가입한 등록 한부모 가구가 아니면 주민센터 방문 신청만 된다고
            적습니다. 결정되면 아이돌봄 누리집(idolbom.go.kr)이나 앱에서 서비스를 신청합니다.
          </p>
          <p>
            문의: 아이돌봄서비스 <strong>1577-8136</strong> · 보건복지상담센터 <strong>129</strong>
          </p>
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문 →
              </Link>
            </p>
          )}
          <DocNote>
            이 글은 아이돌봄 누리집과 복지로 원문을 옮기고 그 요금표로 계산한 것이며, 어느 유형에 해당하는지 판정하지
            않습니다. 누리집은 아이돌봄서비스가 예산 사업이라 지원 대상·시간·금액이 바뀔 수 있다고 적습니다.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="childcare-service" />
    </>
  );
}
