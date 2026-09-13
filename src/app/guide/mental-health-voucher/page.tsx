import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import MentalVoucherCalc from "@/components/MentalVoucherCalc";
import { guideBySlug } from "@/lib/guides";
import { MV_SOURCE_ID, MV_CHECKED, MV_SESSIONS, MV_TIERS } from "@/lib/mentalVoucher";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("mental-health-voucher")!;
const S = services.find((s) => s.id === MV_SOURCE_ID);

export const metadata: Metadata = {
  title: "정신건강 심리상담 바우처 본인부담 계산 — 8회, 신청 서류 유효기간",
  description:
    "심리상담 8회(1회 50분 이상)를 120일 안에 이용하는 바우처입니다. 1급 8만원·2급 7만원 단가에 소득 구간별 본인부담률(0·10·30·50%)을 곱해 내 부담을 계산하고, 신청 자격 여섯 갈래와 증빙서류 유효기간을 정리했습니다.",
  alternates: { canonical: "/guide/mental-health-voucher" },
};

/*
  왜 이 글인가 (2026-09-13).

  조회수 12위(162만)인데 상세에 우리가 따로 확인한 것이 없었다. 원문에 단가·본인부담률이 다
  있는데 "그래서 나는 얼마 내나"는 곱해야 나오고, 자격 경로 여섯 갈래는 증빙서류 유효기간이
  제각각(3개월·1년·5년)이라 한 문단에 섞여 읽기 어렵다. 그 둘을 계산기와 표로 풀었다.

  숫자는 전부 2026년 원문. 첨부 안내서는 2025년판이라 숫자에 쓰지 않았다(3절).
  원문 문장이 끊긴 자리(수급자 등의 본인부담률)는 계산하지 않고 그대로 보여 준다.
  정신건강 주제라 위기 상담 전화를 맨 위에 둔다.
*/

type Route = { who: string; proof: string; valid: string };

/** 원문 선정 기준의 여섯 갈래. 증빙·기간 표현을 바꾸지 않는다. */
const ROUTES: readonly Route[] = [
  {
    who: "정신건강복지센터, 대학교상담센터, 청소년상담복지센터, Wee센터/Wee클래스 등에서 심리상담이 필요하다고 인정하는 자",
    proof: "기관에서 발급하는 의뢰서",
    valid: "신청일 기준 최근 3개월 이내",
  },
  {
    who: "정신의료기관 등에서 우울·불안 등으로 인하여 심리상담이 필요하다고 인정하는 자",
    proof: "정신건강의학과 의사, 한방신경정신과 한의사가 발급하는 진단서 또는 소견서",
    valid: "신청일 기준 최근 3개월 이내",
  },
  {
    who: "국가건강검진 중 정신건강검사(우울증 선별검사, PHQ-9) 결과에서 중간 정도 이상의 우울(10점 이상)이 확인된 자",
    proof: "국가 일반건강검진 결과서",
    valid: "신청일 기준 1년 이내에 실시",
  },
  {
    who: "자립준비청년 및 보호연장아동",
    proof: "보호종료확인서(자립준비청년), 시설재원증명서 또는 가정위탁보호확인서(보호연장아동)",
    valid: "원문에 기간 표기 없음",
  },
  {
    who: "「동네의원 마음건강돌봄 연계 시범사업」을 통해 의뢰된 자(’22~, 부산)",
    proof: "해당사업 지침의 별지 제4호 연계의뢰서",
    valid: "신청일 기준 최근 3개월 이내",
  },
  {
    who: "서비스 신청일로부터 5년 이내의 재난피해를 입은 본인 또는 재난피해로 사망한 자(실종자 포함)의 유가족(배우자(사실혼 포함), 직계존비속, 형제자매)",
    proof: "사회재난 피해사실확인서, 피해자 인정결정서",
    valid: "재난피해가 신청일로부터 5년 이내",
  },
];

const PDF = S?.forms.find((f) => f.name.includes("마음투자"));

export default function MentalHealthVoucherGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="우울·불안으로 상담이 필요할 때 전문 심리상담을 8회 받을 수 있는 바우처입니다. 소득에 따라 본인부담이 0원부터 1회 4만원까지 달라지고, 신청할 때는 자격을 증명하는 서류가 한 가지 필요합니다."
        updated={`최종 수정 ${G.updated} · 금액과 자격은 복지로 원문(기준연도 2026)에서 ${MV_CHECKED} 확인`}
      >
        <DocNote tone="amber" title="지금 많이 힘드시다면 먼저 전화하세요">
          바우처는 신청·심사에 시간이 걸립니다. 지금 위기라면 자살예방 상담전화{" "}
          <a href="tel:109" className="font-bold underline">109</a>, 정신건강 위기상담전화{" "}
          <a href="tel:15770199" className="font-bold underline">1577-0199</a>에서 바로 상담을
          받을 수 있습니다. 출처:{" "}
          <a href="https://www.129.go.kr/109" target="_blank" rel="noopener noreferrer" className="underline">보건복지상담센터 안내</a>
        </DocNote>

        <DocSection title="한 장으로 보면">
          <DocList
            items={[
              <>
                <strong>상담 {MV_SESSIONS}회</strong>(1회당 최소 50분 이상)를 이용할 수 있는 바우처
              </>,
              <>
                바우처 생성일부터 <strong>120일</strong> 안에 써야 하고 <strong>연장이 안 됩니다.</strong>
              </>,
              <>
                그해 사업은 <strong>1회만</strong> 신청할 수 있습니다(재신청 불가).
              </>,
              <>
                1회 단가 1급 유형 {won(MV_TIERS[0].price)} · 2급 유형 {won(MV_TIERS[1].price)} — 이
                중 정부지원금을 뺀 차액을 본인이 냅니다.
              </>,
            ]}
          />
          <p className="text-xs text-muted">
            복지로 원문 「지원 내용」 · {MV_CHECKED} 확인. 120일과 1회 제한 때문에, 바우처가 나오면
            상담기관을 먼저 정해 두고 시작하는 편이 좋습니다.
          </p>
        </DocSection>

        <DocSection title="신청 자격 — 여섯 갈래 중 하나, 서류마다 유효기간이 다릅니다">
          <p>
            &ldquo;우울·불안 등 정서적 어려움으로 심리상담이 필요한 자로, 아래 기준 중 하나에
            해당&rdquo;해야 합니다. 갈래마다 내는 서류와 그 서류가 유효한 기간이 다릅니다.
          </p>
          <div className="space-y-3">
            {ROUTES.map((r, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-line bg-white text-sm">
                <p className="border-b border-line bg-sunken px-4 py-2.5 font-bold text-ink">{r.who}</p>
                <dl className="divide-y divide-line">
                  <div className="flex gap-3 px-4 py-2">
                    <dt className="w-16 shrink-0 text-muted">증빙</dt>
                    <dd className="min-w-0 text-slate-700">{r.proof}</dd>
                  </div>
                  <div className="flex gap-3 px-4 py-2">
                    <dt className="w-16 shrink-0 text-muted">기간</dt>
                    <dd className="min-w-0 font-medium text-ink">{r.valid}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted">복지로 원문 「선정 기준」 · {MV_CHECKED} 확인</p>
          <DocNote title="가장 흔히 걸리는 자리">
            진단서·소견서·의뢰서는 <strong>신청일 기준 3개월</strong>이 지나면 쓸 수 없습니다. 병원에서
            받아 두고 신청이 늦어지면 다시 발급받아야 합니다. 건강검진 결과서는 1년 안에 받은
            검진이어야 합니다.
          </DocNote>
        </DocSection>

        <DocSection title="계산해 보기">
          <MentalVoucherCalc />
        </DocSection>

        <DocSection title="소득 구간별 본인부담률 (원문)">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">구간</th>
                  <th className="px-3 py-2 text-right font-semibold">본인부담률</th>
                  <th className="px-3 py-2 text-right font-semibold">1급 1회</th>
                  <th className="px-3 py-2 text-right font-semibold">2급 1회</th>
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["기준 중위소득 70% 이하", 0],
                    ["70% 초과~120% 이하", 0.1],
                    ["120% 초과~180% 이하", 0.3],
                    ["180% 초과", 0.5],
                  ] as const
                ).map(([k, rate]) => (
                  <tr key={k} className="border-b border-line">
                    <td className="px-3 py-2">{k}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{Math.round(rate * 100)}%</td>
                    <td className="px-3 py-2 text-right tabular-nums">{won(Math.round(MV_TIERS[0].price * rate))}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{won(Math.round(MV_TIERS[1].price * rate))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            본인부담률은 원문 값, 1회 금액은 단가 × 본인부담률로 저희가 계산한 값입니다. 구간은
            &ldquo;신청일 기준 전월 건강보험료 부과액 기준으로 산정&rdquo;됩니다. 내 소득이 중위소득의
            몇 %쯤인지는{" "}
            <Link href="/check" className="text-brand underline">
              자가진단
            </Link>
            에서 가늠해 볼 수 있습니다.
          </p>
          <DocNote tone="amber" title="원문 문장이 끊겨 있는 자리">
            원문은 &ldquo;기초생활수급자, 차상위계층, 자립준비청년 및 보호연장아동, 법정한부모가족은
            본인부담률, 재난피해자는 본인부담률 0%&rdquo;라고 적습니다. 앞 무리의 비율 숫자가 빠져 있어
            저희는 계산하지 않았습니다. 해당된다면 신청할 때 확인해 주세요.
          </DocNote>
        </DocSection>

        <DocSection title="상담사 유형">
          <div className="space-y-2">
            {MV_TIERS.map((t) => (
              <p key={t.id} className="text-sm leading-relaxed">
                <strong className="text-ink">
                  {t.label} (1회 {won(t.price)})
                </strong>{" "}
                — {t.who}
              </p>
            ))}
          </div>
          <p className="text-xs text-muted">복지로 원문 「서비스 유형」 · {MV_CHECKED} 확인</p>
        </DocSection>

        <DocSection title="신청은 어디서">
          <p>
            주민등록상 거주지 읍면동 주민센터(행정복지센터)나 복지로에서 신청합니다. 읍면동과 관할
            보건소 사업담당과가 조사·심사하고, 보건소 사업담당과가 결정합니다. 결정에 이의가 있으면 같은 곳에 이의 신청을 냅니다.
          </p>
          <p>
            문의: 사회서비스 전자바우처 <strong>1566-3232</strong> · 보건복지상담센터 <strong>129</strong>
          </p>
          {PDF && (
            <p className="text-xs text-muted">
              참고: 복지로 원문에 첨부된 안내서 파일 이름은 「{PDF.name.replace(/^★/, "").replace(/\.pdf$/, "")}」입니다.
              2025년판이라 이 글의 숫자에는 쓰지 않았습니다.
            </p>
          )}
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문 →
              </Link>
            </p>
          )}
          <DocNote>
            이 글은 복지로 원문을 옮기고 그 값으로 계산한 것이며, 대상인지 판정하지 않습니다. 단가와
            본인부담률은 해마다 바뀔 수 있으니 신청할 때 그해 기준을 다시 확인해 주세요.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="mental-health-voucher" />
    </>
  );
}
