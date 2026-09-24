import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import { won } from "@/lib/display";
import { PAD_CHECKED, PAD_DOC, PAD_MONTHLY, PAD_RE_APPLY, PAD_SOURCE_ID, PAD_YEARLY } from "@/lib/padVoucher";

const G = guideBySlug("period-product-voucher")!;
const S = services.find((s) => s.id === PAD_SOURCE_ID);
/** 복지로 원문에 붙은 지침 PDF. 첨부 목록에서 이름으로 찾는다. */
const GUIDE_PDF = S?.forms.find((f) => f.name.includes("청소년사업 안내"))?.url ?? null;

export const metadata: Metadata = {
  title: "생리용품 바우처, 1년치가 한 번에 들어오고 12월 31일에 사라집니다 — 신청 시기와 결제 규칙",
  description:
    "9~24세 수급자·차상위·한부모가족 여성청소년에게 월 14,000원씩 1년치를 국민행복카드로 줍니다. 언제 신청해도 신청한 달에 1년치가 생기고 쓰지 않은 돈은 다음 해 1월 1일에 사라집니다. 탐폰·생리컵도 되는지, 기저귀 바우처와 함께 결제하면 어떻게 되는지까지 성평등가족부 2026년 지침으로 확인했습니다.",
  alternates: { canonical: "/guide/period-product-voucher" },
};

/*
  왜 이 글인가 (2026-09-24, 사용자 요청).

  조회수 29위(약 59만)인데 「따로 확인한 것」이 0이었고, 데이터랩 검색량이 실업급여의
  0.049배로 청소년 사업 중에서는 가장 컸다. 근거는 `lib/padVoucher.ts` 머리말.
*/

function Src({ pages }: { pages: string }) {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      {GUIDE_PDF ? (
        <a href={GUIDE_PDF} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
          {PAD_DOC}
        </a>
      ) : (
        <>{PAD_DOC}</>
      )}{" "}
      {pages} · {PAD_CHECKED} 확인
    </p>
  );
}

const th = "px-3 py-2 font-semibold";
const td = "px-3 py-2";

export default function PeriodProductVoucherGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="기초생활수급·차상위·한부모가족 가구의 9~24세 여성청소년에게 생리용품을 살 수 있는 바우처를 국민행복카드로 줍니다. 복지로 원문은 금액과 가맹점을 적어 두었고, 돈이 언제 생기고 언제 사라지는지는 성평등가족부 2026년 지침에서 옮겼습니다."
        updated={`최종 수정 ${G.updated} · 성평등가족부 지침에서 ${PAD_CHECKED} 확인`}
      >
        <DocNote tone="brand" title="늦게 신청할수록 짧은 기간에 다 써야 합니다">
          신청한 시기와 상관없이 <strong>신청한 달에 1년치({won(PAD_YEARLY)})가 한꺼번에</strong> 생기고, 쓰지 않은 돈은{" "}
          <strong>다음 해 1월 1일에 사라집니다.</strong> 10월에 신청하면 석 달 안에 1년치를 써야 한다는 뜻입니다. 자격이
          그대로면 다음 해에는 다시 신청하지 않아도 <strong>1월에 12개월분이 저절로</strong> 생깁니다.
          <Src pages="860쪽" />
        </DocNote>

        <DocSection title="누가, 얼마를">
          <p>
            아래 셋 중 하나에 해당하는 가구의 <strong>9~24세 여성청소년</strong>입니다. 나이는 9세가 되는 해 1월 1일부터
            24세가 끝나는 해 12월 31일까지이고, 지침은 2026년 기준으로 <strong>2001년 1월 1일~2017년 12월 31일에 태어난</strong>{" "}
            청소년이라고 적습니다.
          </p>
          <DocList
            items={[
              <>기초생활보장 생계·의료·주거·교육급여 수급자</>,
              <>차상위계층(차상위자활, 차상위 본인부담경감 대상자, 차상위장애인, 차상위계층 확인서 발급자)</>,
              <>한부모가족지원법 제5조·제5조의2에 따른 지원대상자</>,
            ]}
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] border-collapse text-sm">
              <tbody>
                <tr className="border-y border-line">
                  <th className={`${th} bg-sunken text-left`}>한 달 금액</th>
                  <td className={`${td} tabular-nums`}>{won(PAD_MONTHLY)}</td>
                </tr>
                <tr className="border-b border-line">
                  <th className={`${th} bg-sunken text-left`}>1년에 한 번 생기는 금액(12개월분)</th>
                  <td className={`${td} tabular-nums font-semibold text-brand`}>{won(PAD_YEARLY)}</td>
                </tr>
                <tr className="border-b border-line">
                  <th className={`${th} bg-sunken text-left`}>쓸 수 있는 기간</th>
                  <td className={td}>생긴 다음 날부터 그해 12월 31일까지</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted">
            1년 금액은 한 달 금액에 12를 곱한 값이며, 지침이 「연간 지원금(12개월분)」이라고 적은 금액입니다.
          </p>
          <Src pages="849·860쪽" />
        </DocSection>

        <DocSection title="신청은 1월부터 12월까지, 연말은 서둘러야">
          <p>
            청소년의 주민등록 주소지 <strong>읍·면·동 행정복지센터</strong>나 <strong>복지로</strong>에서 신청합니다.
            주소와 실제로 사는 곳이 다르면 사는 곳에서도 신청할 수 있습니다. 시·군·구는 접수한 날부터{" "}
            <strong>14일 안에</strong> 결과를 알려 줍니다.
          </p>
          <DocNote title="12월에는 늦으면 올해 몫이 생기지 않습니다">
            지침은 결정 통보와 바우처 전송을 <strong>12월 넷째 주 금요일까지</strong> 끝내라고 하고, 그 뒤에 접수·전송된 건은
            바우처를 만들 수 없다고 적습니다. 연말에 신청할 생각이면 12월 초까지는 내는 편이 안전합니다.
          </DocNote>
          <p>
            신청은 청소년 본인이나 부모가 원칙입니다. 부모가 어렵거나 부모가 아닌 사람이 키우고 있으면 함께 사는 가족,
            8촌 이내 혈족·4촌 이내 인척, 후견인, 시설장·위탁모 등이 신청할 수 있습니다. 14세 미만이 직접 신청하면
            개인정보 동의서에 법정대리인이 서명해야 합니다. 서류는 사회보장급여 신청서, 개인정보 수집·이용 동의서,
            신청인 신분증 사본이고 대리인이면 관계를 보여 주는 서류(가족관계증명서 등)를 더 냅니다.
          </p>
          <Src pages="849~853쪽" />
        </DocSection>

        <DocSection title="국민행복카드가 있어야 씁니다">
          <p>
            바우처는 <strong>국민행복카드</strong>로만 씁니다. 이미 갖고 있으면 그 카드를 쓰면 되고, 결정 뒤 바우처가 전송된 다음 날부터
            결제할 수 있습니다. 신청서에 「카드 상담전화 개인정보 제공 동의」를 함께 내면 카드사가 전화로 발급을 도와줍니다.
          </p>
          <DocList
            items={[
              <>
                <strong>14세 미만</strong> — 신청인(부모 등 주 양육자) 명의 카드
              </>,
              <>
                <strong>14~24세</strong> — 본인 명의 카드, 또는 신청인 명의 카드. 18세 미만은 카드사마다 법정대리인
                동의가 필요한지 확인합니다
              </>,
              <>
                카드 명의자를 바꾸려면(예: 엄마 카드 → 아빠 카드) 행정복지센터에서 신청인을 바꾸고 새 명의의 카드를
                받습니다
              </>,
              <>
                카드사는 BC·삼성·롯데·신한·KB국민이고, <strong>현대카드는 2026년 7월 1일부터</strong> 신청·발급됩니다.{" "}
                <strong>카드사마다 쓸 수 있는 가게가 다릅니다</strong> — 가게 목록은 복지로 원문에 카드사별로 있습니다
              </>,
            ]}
          />
          <Src pages="848·851~852·857쪽" />
        </DocSection>

        <DocSection title="무엇을 살 수 있고, 결제는 어떻게 되나">
          <p>
            살 수 있는 것은 <strong>생리대·탐폰·생리컵</strong>입니다. 가맹점 계산대에 바코드로 등록된 상품만 되고, 가게마다
            품목과 가격이 다릅니다. 가게에서 살 때는 생리용품을 담을 <strong>일회용 봉투 1장</strong>까지 바우처로 낼 수
            있습니다(2025년 6월부터).
          </p>
          <DocList
            items={[
              <>
                <strong>체크카드</strong> — 바우처 잔액 안에서 사면 계좌에 돈이 없어도 됩니다. 잔액보다 비싼 것을 사면
                모자란 만큼이 계좌에서 빠지는데, 계좌에도 모자라면 <strong>결제 자체가 거절</strong>됩니다. 생리용품이 아닌
                물건을 같이 계산해도 그 몫은 계좌에서 나갑니다.
              </>,
              <>
                <strong>신용카드</strong> — 바우처를 넘는 금액은 카드 대금으로 청구됩니다.
              </>,
              <>
                <strong>배송비는 바우처로 못 냅니다.</strong> 국민행복몰은 모든 상품이 무료배송이고, G마켓은 무료배송 상품만
                살 수 있습니다.
              </>,
              <>
                결제를 취소하고 바로 다시 결제하면 바우처가 돌아오는 데 약 3분이 걸려 내 돈이 나갈 수 있습니다.{" "}
                <strong>3분쯤 기다렸다 다시 결제</strong>합니다. 해를 넘겨 취소하면 돌아온 바우처는 그대로 사라집니다.
              </>,
              <>한 카드에 대상자가 둘 이상이면 나이가 많은 사람의 바우처부터 차감됩니다.</>,
            ]}
          />
          <DocNote title="기저귀·조제분유 바우처와는 따로 결제합니다">
            생리용품과{" "}
            <Link href="/guide/diaper-formula" className="text-brand underline">
              기저귀·조제분유
            </Link>
            를 한 번에 계산하면 <strong>생리용품 값이 내 카드 대금으로 청구됩니다.</strong> 두 번에 나눠 결제해야 합니다.
            이미 한 번에 결제했다면 가게에서는 취소 뒤 다시 결제하고, 인터넷에서는 부분 취소가 안 되어 전체를 취소한 뒤
            바우처로 다시 결제합니다.
          </DocNote>
          <Src pages="848·860~863쪽" />
        </DocSection>

        <DocSection title="자격이 바뀌면">
          <p>
            수급 자격이 없어지거나, 외국에 <strong>90일 이상</strong> 머물거나, 본인이 그만두겠다고 하면 그 정보가 시스템에
            들어간 <strong>다음 날부터 결제가 막히고 남은 바우처는 회수</strong>됩니다. 이미 쓴 돈은 돌려받아 가지 않습니다.
          </p>
          <p>다시 자격이 생기면 재신청할 수 있는데, 1년치가 새로 생기는 것이 아니라 그해에 안 쓴 만큼만 생깁니다.</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className={th}>1월 1일에 12개월분이 생긴 뒤, 2월 20일 자격 중지 전에</th>
                  <th className={th}>4월 1일에 다시 신청하면</th>
                </tr>
              </thead>
              <tbody>
                {PAD_RE_APPLY.map((r) => (
                  <tr key={r.used} className="border-b border-line align-top">
                    <td className={td}>{r.used}</td>
                    <td className={td}>{r.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            바우처나 바우처로 산 생리용품을 되팔면 <strong>자격이 취소되고 남은 기간에도 다시 신청할 수 없으며</strong>, 쓴
            금액을 돌려받아 갑니다.
          </p>
          <Src pages="854~856·864쪽" />
        </DocSection>

        <DocSection title="결과가 이상하면, 문의는">
          <p>
            선정 결과나 중지 통보에 이의가 있으면 통보를 받은 날부터 <strong>90일 안에</strong> 시·군·구에 이의신청서를
            냅니다. 시·군·구는 <strong>20일 안에</strong> 결과를 서면으로 알려 줍니다.
          </p>
          <p>
            바우처 사용 문의는 사회서비스 고객상담센터 <strong>1566-3232</strong>, 카드 발급은 각 카드사로 합니다.
          </p>
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문(카드사별 가맹점) →
              </Link>
            </p>
          )}
          <DocNote>
            이 글은 성평등가족부 지침에 적힌 것을 옮긴 것이며, 누가 받을 수 있는지 판정하지 않습니다. 자격은 시·군·구가
            확인해 정합니다. 서울 성동구처럼 일부 지자체는 소득과 상관없이 나이로 주는 사업을 따로 운영하기도 하니 사는 곳의
            행정복지센터에 함께 물어보세요.
          </DocNote>
          <Src pages="853쪽" />
        </DocSection>
      </DocPage>
      <GuideNav current="period-product-voucher" />
    </>
  );
}
