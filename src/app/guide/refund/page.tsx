import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";

const G = guideBySlug("refund")!;

export const metadata: Metadata = {
  title:
    "받은 지원금을 돌려달라고 할 때 — 근로장려금 환수·기초생활 반환명령을 법으로 확인했습니다",
  description:
    "근로장려금 반기신청은 다음 해 6월 30일까지 정산해 더 받은 만큼 환수합니다(조세특례제한법 제100조의8제8항). 기초생활보장은 과잉지급분에 반환명령, 부정수급에는 비용 징수가 따로 있습니다. 조문과 함께 정리했습니다.",
  alternates: { canonical: "/guide/refund" },
};

/*
  왜 이 글인가 (2026-09-16).

  09-16 질문 조사에서 「환수·탈락」 갈래가 7건 나왔는데 우리 안내 글은 0편이었다.
  질문이 전부 **이미 신청한 사람**의 것이다 — "근로장려금 하반기 환수 뜨는 이유?",
  "2026년 상반기 제외대상자라고 나오는데", "조건부수급자 직장 짤리면 자격박탈인가".

  ── 근거 ───────────────────────────────────────────────────────
  · 「조세특례제한법」(법령 API 전문) 제100조의8제4항·제5항·제8항 · 제100조의9 · 제100조의10
  · 「국민기초생활 보장법」 제46조(비용의 징수) · 제47조(반환명령) · 제49조(벌칙)
  조문은 인용하고, 우리가 요약해 다시 쓰지 않는다.

  ── 하지 않는 것 ───────────────────────────────────────────────
  "당신은 환수 대상입니다/아닙니다"를 말하지 않는다(3절). 얼마를 토해내야 하는지도
  계산하지 않는다 — 정산은 국세청·보장기관이 한다. 이 글은 **왜 그런 통지가 오는지**와
  **어디에 물어야 하는지**까지다.
*/

const law = (name: string) =>
  `https://www.law.go.kr/법령/${encodeURIComponent(name)}`;

const TC = services.find((s) => s.id === "WLF00001148");
const LIVELIHOOD = services.find((s) => s.id === "WLF00001132");

export default function RefundGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="받을 때보다 돌려줄 때가 더 놀랍습니다. 「환수」라는 말이 늘 잘못했다는 뜻은 아닙니다 — 미리 준 돈을 나중에 정산하는 것과, 부정하게 받은 돈을 걷는 것은 법에서 아예 다른 조문입니다. 두 가지를 갈라서 정리했습니다."
        updated={`최종 수정 ${G.updated} · 법령 전문에서 2026-09-16 확인`}
      >
        <DocSection title="먼저 — 세 가지는 서로 다릅니다">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">무엇</th>
                  <th className="px-3 py-2 font-semibold">왜 생기나</th>
                  <th className="px-3 py-2 font-semibold">잘못한 것인가</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">정산 환수</td>
                  <td className="px-3 py-2">
                    먼저 준 돈이 나중에 계산한 금액보다 많았을 때
                  </td>
                  <td className="px-3 py-2">아닙니다. 제도가 그렇게 설계돼 있습니다</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">반환명령</td>
                  <td className="px-3 py-2">
                    자격·소득이 바뀌어 급여가 줄거나 멈췄는데 이미 지급된 몫이 있을 때
                  </td>
                  <td className="px-3 py-2">아닙니다. 사정에 따라 면제도 있습니다</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">부정수급 징수</td>
                  <td className="px-3 py-2">속임수로 받았을 때</td>
                  <td className="px-3 py-2">이 경우에만 벌칙이 따로 붙습니다</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocSection title="근로장려금 — 반기신청은 원래 정산합니다">
          <p>
            &ldquo;하반기에 환수가 떴다&rdquo;는 말이 가장 많은 자리입니다. 반기신청은{" "}
            <strong>상반기 소득으로 먼저 받고, 한 해가 끝난 뒤 다시 계산</strong>합니다.
            법은 이렇게 적습니다.
          </p>
          <blockquote className="border-l-4 border-line pl-4 text-sm leading-relaxed text-slate-700">
            &ldquo;납세지 관할 세무서장은 반기 신청한 거주자에 대하여 해당 과세연도의
            다음 연도 <strong>6월 30일까지</strong> 이미 환급받은 근로장려금과 (…) 환급하여야
            할 해당 과세연도 근로장려금을 비교하여 그 차액을 <strong>환급하거나 환수</strong>
            하여야 한다.&rdquo;
          </blockquote>
          <p className="text-xs text-muted">
            출처{" "}
            <a
              href={law("조세특례제한법")}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand"
            >
              「조세특례제한법」 제100조의8제8항
            </a>{" "}
            · 2026-09-16 확인
          </p>
          <p>
            그래서 소득이 하반기에 늘었거나 가구 사정이 바뀌면, 먼저 받은 금액이 결과보다
            많아져 차액을 돌려주게 됩니다. <strong>잘못 신청해서가 아니라 순서가 그렇기
            때문입니다.</strong>
          </p>
          <p>
            반대로 법은 <strong>환수가 예상되면 아예 미리 주지 않는 길</strong>도 두고
            있습니다 — 상반기분이 대통령령으로 정하는 금액 미만이거나 정산 때 환수가
            예상되는 경우에는 반기분을 환급하지 않고 정산 때 처리합니다(제100조의8제5항).
            &ldquo;신청했는데 상반기에 안 들어왔다&rdquo;가 이 경우일 수 있습니다.
          </p>
          <DocNote>
            국세를 체납한 상태라면 <strong>환급할 근로장려금의 30%를 한도로</strong> 그
            체납액에 충당합니다(제100조의8제4항). 전액이 안 들어오는 이유가 여기일 수도
            있습니다.
          </DocNote>
        </DocSection>

        <DocSection title="근로장려금 — 잘못 신청하면 몇 해 동안 못 받습니다">
          <p>
            신청 자격이나 총급여액을 <strong>고의 또는 중대한 과실로</strong> 사실과 다르게
            적어 신청한 것이 확인되면, 그 사실이 확인된 날이 속하는 해(그해에 이미
            환급받았으면 그다음 해)부터 <strong>2년간</strong> 근로장려금을 환급하지
            않습니다. 사기나 그 밖의 부정한 행위였다면 <strong>5년간</strong>입니다.
          </p>
          <p className="text-xs text-muted">
            출처{" "}
            <a
              href={law("조세특례제한법")}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand"
            >
              「조세특례제한법」 제100조의9제1항
            </a>{" "}
            · 2026-09-16 확인
          </p>
          <p>
            또 결정한 뒤 탈루·오류가 발견되면 세무서장이 금액을 다시 정합니다(경정,
            제100조의10제1항). 그 결과 이미 받은 돈이 많았던 것으로 드러나면 초과분에
            <strong> 가산세</strong>가 붙습니다(같은 조 제3항). 다만 신청자에게 잘못이 없는
            경우는 대통령령으로 정하는 바에 따라 제외됩니다.
          </p>
          {TC && (
            <p className="text-sm">
              사업 원문은{" "}
              <Link href={`/service/${TC.id}`} className="text-brand underline">
                {TC.name}
              </Link>
              , 신청 시기와 지급일은{" "}
              <Link href="/guide/tax-credit" className="text-brand underline">
                근로장려금 지급일과 신청 기간
              </Link>
              에 정리해 두었습니다.
            </p>
          )}
        </DocSection>

        <DocSection title="기초생활보장 — 반환명령과 비용 징수는 다른 조문입니다">
          <p>
            급여가 바뀌거나 멈춰서 <strong>이미 준 돈에 과잉지급분이 생겼을 때</strong>는
            보장기관이 반환을 명합니다. 다만 법에 면제 조항이 함께 있습니다.
          </p>
          <blockquote className="border-l-4 border-line pl-4 text-sm leading-relaxed text-slate-700">
            &ldquo;보장기관은 급여의 변경 또는 급여의 정지·중지에 따라 수급자에게 이미
            지급한 수급품 중 과잉지급분이 발생한 경우에는 즉시 수급자에 대하여 그 전부
            또는 일부의 반환을 명하여야 한다. <strong>다만, 이미 이를 소비하였거나 그 밖에
            수급자에게 부득이한 사유가 있을 때에는 그 반환을 면제할 수 있다.</strong>&rdquo;
          </blockquote>
          <p className="text-xs text-muted">
            출처{" "}
            <a
              href={law("국민기초생활 보장법")}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand"
            >
              「국민기초생활 보장법」 제47조제1항
            </a>{" "}
            · 2026-09-16 확인
          </p>
          <p>
            이와 달리 <strong>속임수나 그 밖의 부정한 방법</strong>으로 받은 경우는 제46조
            제2항의 &ldquo;비용의 징수&rdquo;입니다. 응하지 않으면 국세·지방세 체납처분의
            예에 따라 걷고(제46조제3항), 거짓이나 부정한 방법으로 급여를 받은 자에게는
            1년 이하의 징역 등 벌칙이 따로 있습니다(제49조제1호).
          </p>
          {LIVELIHOOD && (
            <p className="text-sm">
              사업 원문은{" "}
              <Link href={`/service/${LIVELIHOOD.id}`} className="text-brand underline">
                {LIVELIHOOD.name}
              </Link>
              , 소득이 바뀌면 급여가 어떻게 달라지는지는{" "}
              <Link href="/guide/livelihood" className="text-brand underline">
                생계급여 안내
              </Link>
              에 있습니다.
            </p>
          )}
        </DocSection>

        <DocSection title="통지를 받았다면">
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
            <li>
              <strong>무슨 조문으로 온 통지인지부터 봅니다.</strong> 정산인지(반기신청),
              반환명령인지, 부정수급 징수인지에 따라 다툴 수 있는 것이 다릅니다.
            </li>
            <li>
              근로장려금은 <strong>국세청 126</strong>, 기초생활보장·복지급여는{" "}
              <strong>주민센터</strong> 또는 <strong>보건복지상담센터 129</strong>가 창구입니다.
            </li>
            <li>
              복지급여 결정에 이의가 있으면 <strong>시·군·구를 거쳐 시·도지사에게</strong>{" "}
              이의를 신청할 수 있습니다(「국민기초생활 보장법」 제38조). 기한이 있으니
              통지서에 적힌 날짜를 먼저 확인하세요.
            </li>
            <li>
              소득·재산이 바뀌면 <strong>먼저 알리는 편</strong>이 낫습니다. 나중에 확인되어
              과잉지급분이 쌓이면 돌려줄 금액이 커집니다.
            </li>
          </ul>
          <DocNote>
            저희는 개별 사건의 환수 여부나 금액을 판단하지 않습니다. 이 글은 어떤 법
            조문이 그런 통지를 만드는지까지만 정리한 것입니다.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="refund" />
    </>
  );
}
