import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import {
  EV_CHECKED,
  EV_SOURCE_ID,
  EV_GUIDE_PDF,
  EV_GOSI_URL,
  EV_GOSI_NO,
  EV_GOSI_EFFECTIVE,
  EV_SITE,
  EV_HOUSEHOLD,
  EV_AMOUNT,
  EV_SUMMER_ONLY,
  EV_DATES,
} from "@/lib/energyVoucher";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("energy-voucher")!;
const S = services.find((s) => s.id === EV_SOURCE_ID);

export const metadata: Metadata = {
  title: "에너지바우처 2026 금액과 사용 기한 — 여름에 남은 돈은 겨울에 쓸 수 있습니다",
  description:
    "에너지바우처는 세대원 수에 따라 1인 295,200원부터 4인 이상 701,300원까지 한 금액을 받고, 2026년 7월 1일부터 2027년 5월 31일까지 씁니다. 여름에 안 쓴 금액이 9월 30일에 없어지는지, 신청은 언제까지인지를 사업안내서와 고시로 확인했습니다.",
  alternates: { canonical: "/guide/energy-voucher" },
};

/*
  왜 이 글인가 (2026-09-18 아침 루틴).

  「에너지바우처」는 복지로 조회수 5위인데 우리 안내 글이 없었다. 네이버 데이터랩
  최근 3개월 월평균이 실업급여의 약 1.3배로, 문화누리카드·K패스와 같은 급이다.
  그런데 복지로 원문에는 금액이 한 줄도 없다 — "세대원수에 따라 4단계로 차등 지급".

  쓰면서 우리 쪽 오류를 하나 잡았다. `/guide/calendar`가 "여름 몫은 9월 30일에
  사라집니다 · 겨울로 이월되지 않습니다"라고 적고 있었는데 2026년 기준으로 틀렸다.
  자세한 근거는 `lib/energyVoucher.ts` 머리말.
*/

function SrcGuide({ page }: { page: string }) {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      <a href={EV_GUIDE_PDF} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
        「2026년도 에너지바우처 사업 안내서」
      </a>{" "}
      (기후에너지환경부·한국에너지공단) {page} · {EV_CHECKED} 확인
    </p>
  );
}

export default function EnergyVoucherGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="전기·가스·등유·연탄·LPG 값을 대신 결제해 주는 바우처입니다. 금액은 세대원 수로만 갈리고, 한 번 받은 금액을 여름과 겨울에 나눠 쓰는 것이 아니라 한 주머니에서 씁니다."
        updated={`최종 수정 ${G.updated} · 사업안내서와 고시에서 ${EV_CHECKED} 확인`}
      >
        <DocSection title="세대원 수로 갈리는 네 단계">
          <p>
            복지로 원문은 「세대원수에 따라 4단계로 차등 지급」이라고만 적습니다. 네 단계가 각각 얼마인지는 원문에 붙은
            사업안내서에 있습니다. 아래 금액을 <strong>{EV_DATES.useAll}</strong> 사이에 씁니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">구분</th>
                  {EV_HOUSEHOLD.map((h) => (
                    <th key={h} className="px-3 py-2 text-right font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line tabular-nums">
                  <td className="px-3 py-2">지원금액</td>
                  {EV_AMOUNT.map((n, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {won(n)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <SrcGuide page="인쇄 19쪽" />
          <DocList
            items={[
              <>
                세대원 수는 <strong>주민등록표 등본에 들어 있는 세대원</strong>으로 셉니다.
              </>,
              <>
                안내서는 이 금액이 <strong>수급자의 소득을 따질 때 소득으로 잡히지 않는다</strong>고 적습니다(19쪽).
                생계급여를 함께 받고 있어도 그만큼 깎이지 않는다는 뜻입니다.
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="여름에 안 쓴 돈은 없어지지 않습니다">
          <p>
            에너지바우처는 여름 몫과 겨울 몫이 따로 있는 제도가 아닙니다. 안내서 19쪽은 위 금액을{" "}
            <strong>계절 구분 없이 전체 사용 기간 동안</strong> 쓸 수 있다고 적고, 고시도 같은 말을 조문으로 적어
            두었습니다.
          </p>
          <blockquote className="border-l-2 border-line pl-4 text-sm text-slate-600">
            제4조의2(에너지이용권의 사용) 에너지이용권을 발급받은 자는 냉방용 금액의 전부 또는 일부를 난방용으로 이월하여
            사용할 수 있다.
            <span className="mt-1 block text-xs text-muted">
              {EV_GOSI_NO} 「에너지이용권 사업운영에 관한 규정」 · {EV_GOSI_EFFECTIVE} 시행 ·{" "}
              <a href={EV_GOSI_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
                국가법령정보센터
              </a>
            </span>
          </blockquote>
          <DocNote title="10월 1일에 없어지는 경우는 따로 있습니다">
            <strong>겨울에는 다른 이용권을 받기로 하고 여름 몫만 신청한 세대</strong>는 이야기가 다릅니다. 긴급복지
            연료비 지원이나 한국광해광업공단 연탄쿠폰 같은 다른 동절기 이용권을 받으려면 에너지바우처는 여름
            기간({EV_DATES.summer})분만 나오고, 안내서는 <strong>2026년 10월 1일 이후 남은 잔액은 모두 없어진다</strong>고
            적습니다. 이 경우의 금액은 아래와 같습니다.
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-sm">
                <thead>
                  <tr className="border-y border-amber-200 text-left">
                    <th className="px-3 py-2 font-semibold">구분</th>
                    {EV_HOUSEHOLD.map((h) => (
                      <th key={h} className="px-3 py-2 text-right font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="tabular-nums">
                    <td className="px-3 py-2">하절기만 신청</td>
                    {EV_SUMMER_ONLY.map((n, i) => (
                      <td key={i} className="px-3 py-2 text-right">
                        {won(n)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </DocNote>
          <p className="text-sm text-slate-600">
            반대로 <strong>여름에는 한 푼도 쓰지 않고 겨울에만 쓰고 싶은 경우</strong>에는 「하절기 요금미차감」으로
            신청해 두면 됩니다. 안내서는 이것을 지원금액(또는 잔액) 전액을 동절기에만 쓰도록 하는 제도라고 적습니다(4쪽).
          </p>
        </DocSection>

        <DocSection title="언제 신청하고 언제 쓰나">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">무엇</th>
                  <th className="px-3 py-2 font-semibold">기간</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className="px-3 py-2">신규 신청</td>
                  <td className="px-3 py-2">{EV_DATES.applyNew}</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2">재신청(주소·연락처 등 변경)</td>
                  <td className="px-3 py-2">{EV_DATES.applyAgain}</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2">여름 사용 — 가상카드(전기요금 차감)</td>
                  <td className="px-3 py-2">{EV_DATES.summer}</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2">겨울 사용 — 가상카드(요금 차감)</td>
                  <td className="px-3 py-2">{EV_DATES.winterVirtual}</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2">겨울 사용 — 실물카드(국민행복카드)</td>
                  <td className="px-3 py-2">{EV_DATES.winterCard}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <SrcGuide page="인쇄 20~21쪽" />
          <DocList
            items={[
              <>
                <strong>여름에는 전기요금에서만 차감됩니다.</strong> 그 기간에 발행된 전기 고지서에 붙는 방식이라 도시가스나
                등유에는 쓸 수 없습니다.
              </>,
              <>
                <strong>겨울에는 둘 중 하나만 고릅니다.</strong> 가상카드(요금 차감)를 고르면 전기·도시가스·지역난방 가운데
                하나에만 붙고, 실물카드(국민행복카드)를 고르면 전기·도시가스·연탄·등유·LPG를 직접 결제합니다. 지역난방은
                실물카드로 결제할 수 없습니다.
              </>,
              <>
                안내서는 행복이음 시스템이 잠깐 멈추는 날을 따로 적어 둡니다 — 2026년 10월 1~2일과 12월 말 2~3일입니다.
                이때는 신청 처리가 밀릴 수 있습니다.
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="2026년에 달라진 것 둘">
          <DocList
            items={[
              <>
                <strong>다자녀 기준이 넓어졌습니다.</strong> 고시 개정이유는 「2인 이상의 19세 미만인 자녀를 양육하는 모든
                다자녀 세대」가 수급자격에 들도록 기준을 고쳤다고 적습니다(제2조제1항제1호라목). 같은 등본에 올라 있는
                가정위탁보호 아동도 자녀로 봅니다.
              </>,
              <>
                <strong>연탄전환 에너지바우처가 새로 생겼습니다.</strong> 가정난방용 연탄보일러를 등유·LPG 등 다른 보일러로
                바꾼 세대에 주는 바우처입니다. 신청은 {EV_DATES.coalApply}, 사용은 {EV_DATES.coalUse}이고 실물카드로만
                씁니다. 금액은 안내서가 「산업통상부 연탄쿠폰 지원 금액과 동일」이라고만 적어 두어 이 글에 숫자를 적지
                않습니다.
              </>,
            ]}
          />
          <p className="text-xs text-muted">
            출처 {EV_GOSI_NO} 제개정이유 · 사업 안내서 인쇄 19~21쪽 · {EV_CHECKED} 확인
          </p>
          <DocNote title="겨울 바우처와 연탄전환 바우처는 함께 받지 못합니다">
            안내서는 동절기 에너지바우처를 받으면 연탄전환 에너지바우처를 신청할 수 없고,{" "}
            <strong>2026년 6월 27일부터는 둘 사이를 바꾸는 것도 안 된다</strong>고 적습니다. 연탄전환 바우처가 결정되면
            기존 연탄쿠폰 지원은 중단되지만, 그전까지 쓴 연탄쿠폰을 돌려낼 필요는 없습니다.
          </DocNote>
        </DocSection>

        <DocSection title="집에서 바우처를 못 쓰는 경우">
          <p>
            쪽방·고시원처럼 요금 고지서가 따로 나오지 않는 곳에 살면 바우처를 쓸 방법이 없습니다. 고시는 이런 경우에
            현금으로 주는 <strong>예외지급</strong>을 두고 있고, 2026년 개정으로 사용 기간이 끝나기 전에 먼저 주는{" "}
            <strong>사전 예외지급</strong>(11~12월 중)이 생겼습니다. 전세사기 피해와 산불 같은 재난으로 등본 주소와 사는
            곳이 달라진 경우도 예외지급 대상에 들어갔습니다.
          </p>
          <p className="text-xs text-muted">
            출처 {EV_GOSI_NO} 제4조제8항·제6조 및 제개정이유 · {EV_CHECKED} 확인
          </p>
        </DocSection>

        <DocSection title="신청은 어디서">
          <p>
            주민등록상 주소지 읍·면·동 행정복지센터에서 신청하고, 복지로에서도 됩니다. 처리 기한은 접수일부터 14일입니다.
            생계·의료·주거·교육급여를 신청하면서 함께 신청할 수도 있습니다.
          </p>
          <p>
            문의: 에너지바우처 통합상담센터 <strong>1600-3190</strong> ·{" "}
            <a href={EV_SITE} target="_blank" rel="noopener noreferrer" className="text-brand underline">
              에너지바우처 누리집
            </a>
          </p>
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문 →
              </Link>
            </p>
          )}
          <DocNote>
            이 글은 사업안내서와 고시의 내용을 옮긴 것이며, 누가 대상인지 판정하지 않습니다. 대상 여부는 행정복지센터가
            정합니다. 수록 원문에 첨부된 고시는 <strong>제2025-30호</strong>인데, 지금 시행 중인 것은{" "}
            {EV_GOSI_NO}({EV_GOSI_EFFECTIVE} 시행)라 이 글은 새 고시를 따랐습니다.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="energy-voucher" />
    </>
  );
}
