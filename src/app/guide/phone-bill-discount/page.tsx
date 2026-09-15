import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import PhoneDiscountCalc from "@/components/PhoneDiscountCalc";
import { guideBySlug } from "@/lib/guides";
import {
  PD_TYPES,
  PD_SOURCE_ID,
  PD_CHECKED,
  PD_NOTICE,
  PD_NOTICE_NO,
  PD_NOTICE_URL,
  PD_DECREE_URL,
} from "@/lib/phoneDiscount";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("phone-bill-discount")!;
const S = services.find((s) => s.id === PD_SOURCE_ID);

export const metadata: Metadata = {
  title: "휴대폰 요금감면 계산 — 월 최대 생계·의료 33,500원, 차상위 21,500원, 기초연금 11,000원",
  description:
    "통신요금 감면은 유형마다 계산식이 다릅니다. 과학기술정보통신부 고시의 감면 조문을 옮기고, 요금제 월정액과 통화료를 넣으면 감면액이 나오게 했습니다. 집 인터넷이 함께 감면되는 유형과 휴대폰만 되는 유형도 갈라 적었습니다.",
  alternates: { canonical: "/guide/phone-bill-discount" },
};

/*
  왜 이 글인가 (2026-09-13).

  조회수 7위 「이동통신요금감면」은 원문에 유형별 **월 최대 감면액**만 있고, 내
  요금에서 얼마가 깎이는지는 알 수 없다. 계산식은 원문의 근거 법령 칸에 이름만
  적힌 과기정통부 고시 제5조에 있었다(법제처 API로 전문을 받아 확인).

  고시 문장의 한도대로 셈하면 복지로 최대액 셋과 정확히 맞는다 —
  `lib/phoneDiscount.ts` 머리말. 누가 어느 유형인지는 전기통신사업법 시행령
  제2조제3항에서 옮겼다. 자격 판정은 하지 않는다(CLAUDE.md 3절).
*/

function Cite({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted">{children}</p>;
}

const noticeLink = (
  <a href={PD_NOTICE_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
    과학기술정보통신부 고시 「{PD_NOTICE}」
  </a>
);

export default function PhoneBillDiscountGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="같은 요금감면이라도 누구냐에 따라 계산식이 전혀 다릅니다. 기초연금 수급자는 절반을 깎아 주지만 한도가 작고, 장애인은 35%지만 고시에 한도 문구가 없습니다."
        updated={`최종 수정 ${G.updated} · 감면 조문은 ${PD_NOTICE_NO} 기준, ${PD_CHECKED} 확인`}
      >
        <DocSection title="한 장으로 보면">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">유형</th>
                  <th className="px-3 py-2 font-semibold">깎는 방식(요약)</th>
                  <th className="px-3 py-2 text-right font-semibold">월 최대</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className="px-3 py-2">생계·의료급여 수급자</td>
                  <td className="px-3 py-2">월정액 26,000원까지 면제 + 음성·데이터 50%</td>
                  <td className="px-3 py-2 text-right font-bold tabular-nums">{won(33_500)}</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2">주거·교육급여 수급자 · 차상위계층</td>
                  <td className="px-3 py-2">11,000원까지 면제 + 넘는 부분 35%</td>
                  <td className="px-3 py-2 text-right font-bold tabular-nums">{won(21_500)}</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2">기초연금 수급자</td>
                  <td className="px-3 py-2">요금의 50%(요금 22,000원까지만)</td>
                  <td className="px-3 py-2 text-right font-bold tabular-nums">{won(11_000)}</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2">장애인 · 국가유공자(일부) · 5·18부상자</td>
                  <td className="px-3 py-2">월정액·음성·데이터 각각 35%</td>
                  <td className="px-3 py-2 text-right text-muted">한도 문구 없음</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Cite>
            월 최대는 복지로 원문 금액, 깎는 방식은 {noticeLink} 제5조를 줄여 적은 것입니다.
            조문 전문은 아래 계산기와 「유형별 조문」에 그대로 옮겼습니다.
          </Cite>
        </DocSection>

        <DocSection title="계산해 보기">
          <PhoneDiscountCalc />
        </DocSection>

        <DocSection title="최대 금액은 이렇게 나옵니다">
          <p>
            복지로 원문의 최대액은 고시가 정한 한도를 따라가면 그대로 나옵니다. 두 출처가 같은
            수를 가리키므로, 위 계산기가 고시 문장을 옳게 옮겼는지 확인하는 기준이 됩니다.
          </p>
          <DocList
            items={[
              <>
                <strong>생계·의료급여</strong> — 26,000원 면제 + (한도 41,000원 − 26,000원) × 50%
                = <strong>{won(33_500)}</strong>
              </>,
              <>
                <strong>주거·교육급여·차상위</strong> — 11,000원 면제 + 한도 30,000원 × 35% ={" "}
                <strong>{won(21_500)}</strong>
              </>,
              <>
                <strong>기초연금</strong> — 한도 22,000원 × 50% = <strong>{won(11_000)}</strong>
              </>,
            ]}
          />
          <p>
            <strong>월정액과 통화료는 다르게 깎입니다.</strong> 생계·의료급여와 차상위는 요금제 월정액만 한도까지
            면제되고, 요금제 밖에서 따로 청구된 음성·데이터 통화료는 50%·35%만 깎입니다. 그래서 계산기는 두 값을
            나눠 받습니다.
          </p>
          <p>
            그리고 <strong>요금이 싸면 유형 사이 차이가 줄어듭니다.</strong> 월 11,000원 요금제라면
            차상위는 전액(11,000원)이 면제되고, 기초연금은 절반(5,500원)이 깎입니다. 반대로
            요금이 비쌀수록 한도가 없는 35% 감면(장애인 등)이 커집니다.
          </p>
          <Cite>위 곱셈과 예시는 고시 문장대로 저희가 계산한 값입니다.</Cite>
        </DocSection>

        <DocSection title="유형별 조문">
          <div className="space-y-3">
            {PD_TYPES.map((t) => (
              <div key={t.kind} className="overflow-hidden rounded-xl border border-line bg-white">
                <p className="border-b border-line bg-sunken px-4 py-2.5 text-sm font-extrabold text-ink">
                  {t.label}
                </p>
                <dl className="divide-y divide-line text-sm">
                  <div className="flex gap-3 px-4 py-2.5">
                    <dt className="w-14 shrink-0 text-muted">누가</dt>
                    <dd className="min-w-0 text-slate-700">{t.who}</dd>
                  </div>
                  <div className="flex gap-3 px-4 py-2.5">
                    <dt className="w-14 shrink-0 text-muted">감면</dt>
                    <dd className="min-w-0 text-slate-700">
                      &ldquo;{t.rule}&rdquo;
                      <span className="mt-0.5 block text-xs text-muted">{t.ruleRef}</span>
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <Cite>
            누가: <a href={PD_DECREE_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">전기통신사업법 시행령</a>{" "}
            제2조제3항 · 감면: {noticeLink} 제5조 · {PD_CHECKED} 확인
          </Cite>
        </DocSection>

        <DocSection title="알아 둘 것 넷">
          <DocList
            items={[
              <>
                <strong>한 사람에 한 회선입니다.</strong> 고시는 제공회선 수를 &ldquo;자연인인
                경우에는 1회선, 단체인 경우에는 2회선&rdquo;으로 한정합니다(제5조제5항).
              </>,
              <>
                <strong>차상위·주거·교육급여는 가구당 4명까지입니다.</strong> 만 6세 이하
                아동은 이 4명에서 제외됩니다(제5조제6항).
              </>,
              <>
                <strong>기초연금·차상위·주거·교육급여는 휴대폰만 감면됩니다.</strong> 시행령은
                이 유형(제8~10호)의 감면을 이동전화 서비스로 한정합니다. 생계·의료급여
                수급자와 장애인·국가유공자(일부)는 집전화·114·초고속인터넷(월 이용요금의 30%)
                감면도 있고, 이 경우 감면 대상이 그 사람이 속한 세대·가구입니다.
              </>,
              <>
                <strong>두 유형에 모두 해당할 때</strong> 어느 계산식이 적용되는지는 고시에
                순서가 적혀 있지 않습니다. 신청할 때 통신사에 확인하세요.
              </>,
            ]}
          />
          <Cite>{noticeLink} 제5조제1항·제2항·제5항·제6항 · 전기통신사업법 시행령 제2조제3항 단서</Cite>
        </DocSection>

        <DocSection title="어디서 신청하나">
          <p>
            복지로 원문은 신청 창구로 <strong>주민센터, 통신사, 정부24, 복지로</strong>를 적고
            있습니다. 자격이 확인되면 통신사가 요금에서 깎아 줍니다. 신청서 양식은 고시의 별지
            제1호서식(통신요금 감면 신청서)입니다.
          </p>
          <p>
            문의: 통신사 전용 ARS <strong>1523</strong>(휴대폰에서 국번 없이) · 과학기술정보통신부
            민원상담센터 <strong>1335</strong>
          </p>
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문 →
              </Link>
            </p>
          )}
          <DocNote>
            이 글은 고시와 시행령을 옮기고 그 문장대로 계산한 것이며, 감면 대상인지 판정하지
            않습니다. 고시는 개정될 수 있으니 실제 감면액은 청구서와 통신사 안내로 확인해 주세요.
            수급 여부가 궁금하면{" "}
            <Link href="/guide/income-line" className="text-brand underline">
              소득 기준선 안내
            </Link>
            부터 보세요.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="phone-bill-discount" />
    </>
  );
}
