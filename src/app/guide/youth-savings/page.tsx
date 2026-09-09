import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import YouthSavingsCalc from "@/components/YouthSavingsCalc";
import { guideBySlug } from "@/lib/guides";
import {
  YS_SOURCE_ID,
  YS_CHECKED,
  YS_FSC_URL,
  MONTHS,
  MONTHLY_CAP,
} from "@/lib/youthSavings";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("youth-savings")!;
const SOURCE = services.find((s) => s.id === YS_SOURCE_ID);

export const metadata: Metadata = {
  title: "청년미래적금, 3년 뒤 얼마가 되나 — 정부기여금 6%·12%",
  description:
    "매월 최대 50만원을 3년간 넣으면 납입금의 6%(일반형) 또는 12%(우대형)를 정부가 얹어 줍니다. 복지로 안내에는 '일정비율'이라고만 적혀 있어 금융위원회 보도자료에서 비율을 확인해 옮겼습니다.",
  alternates: { canonical: "/guide/youth-savings" },
};

/*
  왜 이 글인가. 원문이 "납입액의 **일정비율**"이라고만 적고 비율을 안 준다 —
  K-패스가 "20%~53.3%"라고만 했던 것과 같은 구멍이다. 토스 미니앱 인기
  100선에도 "3년 뒤 얼마 받는지 계산"이 82위로 올라 있다.

  다만 이 글에는 **다른 글에 없는 것**이 하나 있다. 두 공식 출처가 어긋나서,
  어긋난다는 사실 자체를 본문에 적었다(아래 「두 문서가 다릅니다」).
*/

export default function YouthSavingsGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="원문은 “납입액의 일정비율로 정부기여금 지원”이라고만 적혀 있습니다. 그 비율이 6%인지 12%인지에 따라 3년 뒤 금액이 크게 갈립니다."
        updated={`최종 수정 ${G.updated} · 기여금 비율은 ${YS_CHECKED} 확인`}
      >
        <DocSection title="원문에 비율이 없습니다">
          <p>
            저희가 수록한{" "}
            {SOURCE ? (
              <Link
                href={`/service/${YS_SOURCE_ID}`}
                className="font-bold text-brand underline"
              >
                청년미래적금
              </Link>
            ) : (
              <strong>청년미래적금</strong>
            )}{" "}
            의 지원 내용은 한 문장입니다.
          </p>
          <blockquote className="rounded-xl bg-sunken px-4 py-3 text-sm leading-relaxed text-slate-700">
            은행이자에 더해 납입액의 <strong>일정비율</strong>로 정부기여금 지원
            및 이자소득 비과세 혜택 제공
          </blockquote>
          <p>
            비율은{" "}
            <a
              href={YS_FSC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand"
            >
              금융위원회 보도자료
            </a>
            에 있었습니다 — <strong>일반형 6%, 우대형 12%</strong>입니다. 월
            납입 한도 {won(MONTHLY_CAP)}, {MONTHS}개월 만기 자유적립식이라는 것도
            같은 자료에 있습니다.
          </p>
        </DocSection>

        <DocSection title="계산해 보기">
          <YouthSavingsCalc />
        </DocSection>

        <DocSection title="두 문서가 다릅니다">
          <p>
            우대형 기준(총급여 3,600만원)은 두 출처가 같습니다. 그런데{" "}
            <strong>일반형이 다릅니다.</strong>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[26rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-sunken">
                  <th className="px-3 py-2 text-left font-bold text-ink">출처</th>
                  <th className="px-3 py-2 text-left font-bold text-ink">
                    일반형 소득기준
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 text-slate-700">
                    복지로 원문 (가입 요건)
                  </td>
                  <td className="px-3 py-2 tabular-nums text-slate-700">
                    개인소득 7,500만원 이하
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-slate-700">
                    금융위 보도자료 (기여금)
                  </td>
                  <td className="px-3 py-2 tabular-nums text-slate-700">
                    총급여 6,000만원 이하
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>6,000만~7,500만원 구간이 어떻게 되는지</strong>는 이 두
            문서만으로 단정할 수 없습니다. 가입 상한과 기여금 상한이 다른 것으로
            읽히지만, 그건 저희 해석이지 어느 문서에도 그렇게 적혀 있지
            않습니다. 그래서 <strong>계산기에서 빼고 이 사실만 적어 둡니다.</strong>{" "}
            해당되신다면 서민금융진흥원에 확인해 주세요.
          </p>
        </DocSection>

        <DocSection title="저희가 하지 않는 것">
          <p>
            <strong>이자를 계산하지 않습니다.</strong> 원문이 &ldquo;은행이자에
            더해&rdquo;라고만 하고, 금리는 취급 은행마다 다릅니다. 모르는 값을
            그럴듯한 수로 채우지 않습니다. 계산기가 내놓는 것은{" "}
            <strong>납입 원금 + 정부기여금</strong>까지이고, 실제 수령액은 그보다
            큽니다.
          </p>
          <p>
            <strong>자격을 판정하지 않습니다.</strong> 나이·소득·가구 중위소득
            요건에 해당하는지는 가입 때 심사로 정해집니다.
          </p>
          <DocNote>
            이 상품은 2026년에 새로 나왔습니다. 요건과 비율이 아직 바뀔 수
            있으니, 실제 가입 전에는 서민금융진흥원과 취급 은행에서 확인해
            주세요.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="youth-savings" />
    </>
  );
}
