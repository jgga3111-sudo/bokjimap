import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import TaxCreditCalc from "@/components/TaxCreditCalc";
import { guideBySlug } from "@/lib/guides";
import { HOUSEHOLDS, TC_SOURCE_ID, TC_SOURCE_NAME } from "@/lib/taxCredit";
import { services } from "@/data/services";

const G = guideBySlug("tax-credit-amount")!;

const SOURCE = services.find((s) => s.id === TC_SOURCE_ID);

export const metadata: Metadata = {
  title: "근로장려금·자녀장려금 얼마 받나 — 가구 유형별 계산",
  description:
    "단독 최대 165만원, 홑벌이 285만원, 맞벌이 330만원입니다. 총급여액 등과 자녀 수를 넣으면 구간별 산식으로 바로 계산됩니다. 재산 1.7억 이상이면 절반만 나오는 것까지 반영했습니다.",
  alternates: { canonical: "/guide/tax-credit-amount" },
};

/*
  왜 이 글인가. `/guide/tax-credit`은 **언제**를 다룬다(정기·반기 신청 창구와
  지급일). 이 글은 **얼마**를 다룬다. 사람들이 치는 말도 갈린다 —
  "근로장려금 지급일"과 "근로장려금 계산기"는 다른 질문이다.

  토스 미니앱 인기 100선에서 단일 주제로 가장 많은 것이 근로장려금이었다
  (10·22·26·30·55·74위 — 여섯 개). 그런데 우리는 같은 산식을 이미 원문으로
  갖고 있으면서 산문으로만 보여주고 있었다.

  `/guide/k-pass`와 결정적으로 다른 점: 저 글은 공단 표를 밖에서 찾아왔지만,
  여기는 **밖에서 가져온 숫자가 하나도 없다.**
*/

export default function TaxCreditAmountGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="근로장려금은 소득이 오를수록 늘다가, 한동안 그대로였다가, 다시 줄어 0이 됩니다. 그 꺾이는 지점이 가구 유형마다 다릅니다."
        updated={`최종 수정 ${G.updated} · 산식은 수록 원문에서 옮겼습니다`}
      >
        <DocSection title="산식이 원문에 그대로 있습니다">
          <p>
            이 글의 숫자는 <strong>밖에서 가져온 것이 하나도 없습니다.</strong>{" "}
            저희가 수록한{" "}
            {SOURCE ? (
              <Link
                href={`/service/${TC_SOURCE_ID}`}
                className="font-bold text-brand underline"
              >
                {TC_SOURCE_NAME}
              </Link>
            ) : (
              <strong>{TC_SOURCE_NAME}</strong>
            )}{" "}
            의 지원 내용에 가구 유형 셋의 전 구간 산식이 그대로 적혀 있습니다.
          </p>
          <blockquote className="rounded-xl bg-sunken px-4 py-3 text-sm leading-relaxed text-slate-700">
            단독가구
            <br />- (총급여액 등 400만원 미만) 총급여액 등 x 400분의 165
            <br />- (400만원~900만원 미만) 165만원 정액
            <br />- (900만원~2,200만원 미만) 165만원 - (총급여액 등 - 900만원) x
            1,300분의 165
          </blockquote>
          <p>
            아래 계산기는 이 문장을 그대로 옮긴 것입니다. 홑벌이·맞벌이도 같은
            모양이고 숫자만 다릅니다.
          </p>
        </DocSection>

        <DocSection title="계산해 보기">
          <TaxCreditCalc />
        </DocSection>

        <DocSection title="꺾이는 지점">
          <p>
            근로장려금은 <strong>사다리꼴</strong>입니다. 소득이 없으면 0이고,
            오를수록 늘다가, 한동안 최대액으로 평평하다가, 다시 줄어 0이 됩니다.
            &ldquo;많이 벌수록 많이 받는다&rdquo;도 &ldquo;적게 벌수록 많이
            받는다&rdquo;도 아닙니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[30rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-sunken">
                  <th className="px-3 py-2 text-left font-bold text-ink">가구</th>
                  <th className="px-3 py-2 text-right font-bold text-ink">
                    최대액
                  </th>
                  <th className="px-3 py-2 text-right font-bold text-ink">
                    최대가 되는 구간
                  </th>
                  <th className="px-3 py-2 text-right font-bold text-ink">
                    0이 되는 지점
                  </th>
                </tr>
              </thead>
              <tbody>
                {HOUSEHOLDS.map((h) => (
                  <tr key={h.id} className="border-b border-line last:border-0">
                    <td className="px-3 py-2 text-slate-700">{h.label}</td>
                    <td className="px-3 py-2 text-right font-bold tabular-nums text-ink">
                      {h.work.max}만원
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-slate-700">
                      {h.work.rise.toLocaleString("ko-KR")}~
                      {h.work.flat.toLocaleString("ko-KR")}만원
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-slate-700">
                      {h.work.end.toLocaleString("ko-KR")}만원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            <strong>자녀장려금은 반대 모양입니다.</strong> 자녀 1인당 100만원에서
            시작해 소득이 오를수록 줄고, 홑벌이·맞벌이 모두 7,000만원에서
            없어집니다. 단독가구는 원문의 자녀장려금 항목에 나오지 않습니다.
          </p>
        </DocSection>

        <DocSection title="재산이 넘으면 절반이 됩니다">
          <p>
            소득만 보는 게 아닙니다. 원문은 재산 쪽을 이렇게 적고 있습니다.
          </p>
          <blockquote className="rounded-xl bg-sunken px-4 py-3 text-sm leading-relaxed text-slate-700">
            전년도 6월 1일 현재 가구원 모두가 소유하고 있는 재산 합계액이 2.4억원
            미만이면 신청할 수 있습니다.
            <br />
            재산합계액 1.7억 미만 : 해당장려금의 100% 지급
            <br />
            재산합계액 1.7억 이상 ~ 2.4억 미만 : 해당장려금의 50% 지급
          </blockquote>
          <p>
            <strong>1.7억원에서 금액이 절반으로 꺾입니다.</strong> 소득 계산만
            해 보고 그 금액을 기대하면 어긋날 수 있는 자리라, 계산기에도 재산
            구간을 함께 두었습니다.
          </p>
        </DocSection>

        <DocSection title="저희가 하지 않는 것">
          <p>
            <strong>&ldquo;총급여액 등&rdquo;을 저희가 정의하지 않습니다.</strong>{" "}
            그 말은 원문이 쓰는 표현 그대로이고, 무엇이 거기 들어가는지는
            국세청이 정합니다. 근로소득만인지 사업소득까지인지 짐작해서 적지
            않습니다.
          </p>
          <p>
            <strong>자격을 판정하지 않습니다.</strong> 가구 유형과 재산 구간은
            고르는 것이지 저희가 맞히는 것이 아닙니다. 국세 체납액이 있으면
            장려금의 30% 한도에서 충당된다는 것도 원문에 있지만, 얼마가 충당될지는
            계산하지 않습니다.
          </p>
          <DocNote>
            산식과 금액은 개정됩니다. 이 글은 위에 적힌 수정일 기준이고, 실제
            수령액은 국세청 심사 뒤에 확정됩니다.
          </DocNote>
          <p>
            <Link href="/guide/tax-credit" className="text-brand underline">
              언제 신청하고 언제 들어오는지 보기 →
            </Link>
          </p>
        </DocSection>
      </DocPage>
      <GuideNav current="tax-credit-amount" />
    </>
  );
}
