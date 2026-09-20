import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import DiaperCalc from "@/components/DiaperCalc";
import { guideBySlug } from "@/lib/guides";
import {
  DV_CHECKED,
  DV_SOURCE_ID,
  DV_GUIDE_PDF,
  DV_GUIDE_NAME,
  DV_MONTHLY,
  DV_INSURANCE_100,
  DV_STOP,
  DV_VOUCHER_SITE,
  DV_VOUCHER_TEL,
} from "@/lib/diaperVoucher";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("diaper-formula")!;
const S = services.find((s) => s.id === DV_SOURCE_ID);

export const metadata: Metadata = {
  title: "기저귀·조제분유 지원, 60일을 넘기면 두 달치가 사라집니다",
  description:
    "기저귀 월 9만원·조제분유 월 11만원을 최대 24개월 받습니다. 그런데 태어난 날부터 60일 안에 신청해야 24개월분을 전부 받고, 하루 늦으면 22개월분이 됩니다. 2026년 모자보건사업 안내의 지원금액 표로 확인했습니다.",
  alternates: { canonical: "/guide/diaper-formula" },
};

/*
  왜 이 글인가 (2026-09-21 아침 루틴).

  「저소득층 기저귀·조제분유 지원」은 복지로 조회수 20위(약 103만)인데 우리 안내
  글이 없었다. 원문은 금액을 한 줄로만 적고, **얼마나 오래 받는지가 신청일에
  달려 있다는 말을 한 글자도 하지 않는다.** 그 규칙은 지침의 표에 있었다.

  틀리는 방향이 늘 "받는다" 쪽이면 안 된다는 3절이 여기서는 반대로 걸린다 —
  원문만 읽으면 "언제 신청해도 월 9만원"으로 읽혀서, 늦게 신청해도 손해가
  없는 줄 알게 된다. 근거는 `lib/diaperVoucher.ts` 머리말.
*/

function Src({ page }: { page: string }) {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      <a href={DV_GUIDE_PDF} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
        {DV_GUIDE_NAME}
      </a>{" "}
      (보건복지부) {page} · {DV_CHECKED} 확인
    </p>
  );
}

export default function DiaperFormulaGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="기저귀와 조제분유 값을 국민행복카드에 포인트로 넣어 주는 바우처입니다. 금액은 원문에 적혀 있지만, 그 금액을 몇 달치 받는지는 신청한 날짜가 정합니다."
        updated={`최종 수정 ${G.updated} · 2026년 사업안내 지침에서 ${DV_CHECKED} 확인`}
      >
        <DocSection title="60일이 갈림길입니다">
          <p>
            복지로 원문은 「기저귀(월 9만원)·조제분유(월 11만원) 구매비용을 국민행복카드에 바우처 포인트로
            지원합니다」라고만 적습니다. 지침을 보면 그 뒤에 규칙이 하나 더 있습니다.
          </p>
          <DocNote title="태어난 날부터 60일 안에 신청해야 24개월분을 전부 받습니다">
            지침은 「영아 출생 후 만 2년이 되는 날의 전날까지 신청 시, <strong>신청일 기준으로</strong> 지원」하되,
            「<strong>출생일로부터 60일 이내(출생일 포함)에 신청하는 경우 24개월 모두 지원</strong>」한다고 적습니다.
            60일째와 61일째 사이에 <strong>두 달치</strong>가 갈립니다.
          </DocNote>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">신청한 날</th>
                  <th className="px-3 py-2 text-right font-semibold">지원 개월수</th>
                  <th className="px-3 py-2 text-right font-semibold">기저귀만</th>
                  <th className="px-3 py-2 text-right font-semibold">기저귀+조제분유</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {[
                  ["태어난 날 ~ 60일째 날", 24],
                  ["61일째 날 ~ 3개월째 날의 전날", 22],
                  ["3개월째 날 ~ 4개월째 날의 전날", 21],
                  ["6개월째 날 ~ 7개월째 날의 전날", 18],
                  ["12개월째 날 ~ 13개월째 날의 전날", 12],
                  ["23개월째 날 ~ 24개월째 날의 전날", 1],
                ].map(([label, m]) => (
                  <tr key={label as string} className="border-b border-line">
                    <td className="px-3 py-2">{label}</td>
                    <td className="px-3 py-2 text-right">{m}개월</td>
                    <td className="px-3 py-2 text-right">{won(DV_MONTHLY.diaper * (m as number))}</td>
                    <td className="px-3 py-2 text-right">{won(DV_MONTHLY.both * (m as number))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            지침의 표는 24줄이고 위는 그중 여섯 줄만 옮긴 것입니다. 가운데 줄은 한 달이 지날 때마다 한 달치씩 줄어듭니다.
          </p>
          <Src page="인쇄 348쪽·363~366쪽" />
          <DocList
            items={[
              <>
                만 2년이 되는 날의 전날 또는 60일이 되는 날이 <strong>토·일요일이나 공휴일이면 다음 날까지</strong>{" "}
                인정합니다.
              </>,
              <>
                신청일 기준으로 지원 요건을 갖추고 있어야 하고, <strong>아기 주민등록번호가 이미 나와 있어야</strong>{" "}
                합니다. 등본 발급이 늦어진 사정은 따로 봐주지 않는다고 지침이 적습니다.
              </>,
              <>
                쌍둥이·삼둥이는 <strong>아이마다 따로</strong> 지원합니다.
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="내 날짜로 세어 보기">
          <DiaperCalc />
        </DocSection>

        <DocSection title="누가 받나">
          <p>
            기초생활보장(생계·의료·주거·교육급여), 차상위계층(본인부담경감·자활·장애인·계층확인), 한부모가족(청소년한부모
            포함) 가구의 만 2세 미만 영아가 기본 대상입니다. 이 가구들은 <strong>소득을 따로 재지 않고</strong> 자격
            보유 여부로 판정합니다.
          </p>
          <p>
            여기에 더해 <strong>장애인 가구</strong>(아빠·엄마 또는 아기가 일반장애인으로 등록)와{" "}
            <strong>다자녀(2인 이상) 가구</strong>는 소득 기준을 봅니다.
          </p>
          <DocNote title="지침 본문과 각주의 숫자가 다릅니다">
            지침 본문은 이 두 가구의 기준을 「기준중위소득 <strong>80%</strong> 이하」로 적고, 바로 아래 각주에
            「80% → <strong>100%</strong>, ’26.7월~」이라고 적습니다. 지금은 7월이 지났으므로 <strong>100%</strong>가
            맞고, 복지로 원문도 100%로 적고 있습니다. 본문 숫자만 보고 「우리는 안 되겠네」 하고 넘기면 받을 수 있는데
            놓치게 됩니다.
          </DocNote>
          <p>
            소득은 소득인정액이 아니라 <strong>건강보험료 본인부담금</strong>으로 봅니다. 지침에 실린 2026년 100% 판정
            기준은 아래와 같습니다(노인장기요양보험료는 뺀 금액).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">가구원 수</th>
                  <th className="px-3 py-2 text-right font-semibold">소득 기준</th>
                  <th className="px-3 py-2 text-right font-semibold">직장</th>
                  <th className="px-3 py-2 text-right font-semibold">지역</th>
                  <th className="px-3 py-2 text-right font-semibold">혼합</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {DV_INSURANCE_100.map((r) => (
                  <tr key={r.size} className="border-b border-line">
                    <td className="px-3 py-2">{r.size}</td>
                    <td className="px-3 py-2 text-right">{won(r.income)}</td>
                    <td className="px-3 py-2 text-right">{won(r.work)}</td>
                    <td className="px-3 py-2 text-right">{won(r.local)}</td>
                    <td className="px-3 py-2 text-right">{won(r.mixed)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Src page="인쇄 358쪽" />
          <DocList
            items={[
              <>
                가구원 수에는 <strong>아기와 부모, 건강보험료를 따로 내지 않는 형제·자매</strong>가 듭니다. 같은 주소에
                살면서 같은 건강보험에 얹혀 있는 조부모도 셉니다.
              </>,
              <>
                맞벌이는 <strong>보험료가 낮은 쪽의 50%만</strong> 더합니다.
              </>,
              <>
                무급 휴직 중이면 「소득 없음」으로 봅니다(1개월 이상, 휴직증명서 제출). 육아휴직 급여는 보수월액에 들어가지
                않습니다.
              </>,
              <>
                기본 기준을 넘더라도 <strong>시·도가 자체 기준을 정해 더 지원</strong>할 수 있습니다(예외 지원). 다만
                이 경우 그 시·군·구에서 이사 나가면 자격이 자동으로 중지됩니다.
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="조제분유는 따로 조건이 있습니다">
          <p>
            조제분유는 기저귀 대상자 중에서 아래에 드는 경우에만 더해집니다. 기저귀 없이 조제분유만 받을 수는 없습니다.
          </p>
          <DocList
            items={[
              <>
                아동복지시설·공동생활가정·가정위탁보호·입양대상 아동, 한부모(부자·조손) 및 영아 입양 가정의 아동
              </>,
              <>
                산모의 사망, 또는 지침이 <strong>질병코드까지 적어 둔 질병</strong>(에이즈, HTLV감염, 악성신생물의
                항암화학요법 중, 방사선 치료, 항암제 치료, 뇌하수체 기능저하증 등)으로 모유수유가 불가능한 경우
              </>,
              <>
                산모의 의식불명·상반신 마비, 4주 이상 입원치료, 유방절제술·유방확대술 등으로 인한 유선 손상, 3개월 이상
                약물 복용 등으로 모유수유를 권하지 않는다고 <strong>의사가 판단한 경우</strong>
              </>,
            ]}
          />
          <Src page="인쇄 347쪽" />
          <DocNote>
            <strong>영양플러스 사업·선천성대사이상 환아관리 사업</strong>에서 조제분유를 받고 있으면 이 지원과 함께 받을
            수 없습니다. 나머지 조합은 원문과 지침에 적힌 것만 정리한{" "}
            <Link href="/guide/combined-support" className="text-brand underline">
              두 가지를 같이 받을 수 있나
            </Link>
            를 보세요.
          </DocNote>
          <p>
            이미 기저귀를 받고 있다가 나중에 조제분유를 더하는 경우, 추가분은 <strong>남은 개월수만큼</strong>입니다.
            먼저 받은 바우처를 소급해 주지도, 이미 쓴 것을 돌려받지도 않습니다.
          </p>
        </DocSection>

        <DocSection title="받은 다음 — 3개월씩 들어오고, 남은 돈은 이월됩니다">
          <DocList
            items={[
              <>
                지원 대상으로 <strong>결정 통보된 날의 다음 날부터</strong> 쓸 수 있고, 바우처는{" "}
                <strong>3개월 단위</strong>로 들어옵니다(월 지원액 × 3개월분).
              </>,
              <>
                다음 3개월분이 들어오기 전에 남은 금액은 <strong>지원 기간이 끝나는 날까지 이월</strong>됩니다. 매달
                털리지 않습니다.
              </>,
              <>
                지원 기간 종료일의 <strong>다음 날부터 소멸</strong>합니다. 바우처가 생성될 때마다, 그리고 종료 1~2개월
                전에 잔액을 문자로 알려 줍니다.
              </>,
              <>
                기저귀와 조제분유를 둘 다 받으면 <strong>둘을 구분하지 않고</strong> 총액 안에서 씁니다. 지침의 예시는
                월 20만원인 경우 「기저귀 7만원 + 조제분유 13만원」도 된다고 적습니다.
              </>,
              <>
                지원금액을 넘겨 결제한 몫은 <strong>본인이 냅니다</strong>.
              </>,
            ]}
          />
          <Src page="인쇄 367~368쪽" />
          <p>
            잔액과 사용처는 사회서비스 전자바우처 <strong>{DV_VOUCHER_TEL}</strong> 또는{" "}
            <a href={DV_VOUCHER_SITE} target="_blank" rel="noopener noreferrer" className="text-brand underline">
              누리집
            </a>
            에서 확인합니다.
          </p>
        </DocSection>

        <DocSection title="중지되면 남은 돈도 못 씁니다">
          <p>
            지침의 중지 사유는 아래와 같고, <strong>전부 잔액 결제가 막힙니다</strong>. 특히 해외 체류는 아이 기준으로
            셉니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">중지 사유</th>
                  <th className="px-3 py-2 font-semibold">언제부터</th>
                </tr>
              </thead>
              <tbody>
                {DV_STOP.map((r) => (
                  <tr key={r.why} className="border-b border-line">
                    <td className="px-3 py-2">{r.why}</td>
                    <td className="px-3 py-2 text-slate-600">{r.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Src page="인쇄 362쪽" />
          <DocNote title="이사는 중지가 아닙니다">
            기본 지원대상자가 다른 시·군·구로 이사하면 자료가 자동으로 넘어갑니다. 이미 받은 3개월분은 나간 시·군·구가,
            남은 기간분은 들어온 시·군·구가 부담합니다. 지침은 담당자에게{" "}
            <strong>「전출 시 서비스 중지처리하지 않도록 주의(중지하면 바우처가 소멸됨)」</strong>라고 못 박아 두었습니다.
          </DocNote>
        </DocSection>

        <DocSection title="신청은 어디서, 결과는 언제">
          <p>
            아기의 주민등록 주소지 시·군·구 보건소나 읍·면·동 주민센터, 또는 온라인(복지로·정부24 행복출산 원스톱
            서비스)에서 신청합니다. 원칙적으로 부모가 신청인이 되고, 부모가 어려우면 주로 키우는 사람이 신청해 카드를
            받아 쓸 수 있습니다.
          </p>
          <DocList
            items={[
              <>
                결과는 <strong>접수일부터 14일 안에</strong> 보건소가 결정해 알려 줍니다(서류로 바로 확인되면 당일도
                가능).
              </>,
              <>
                결과에 이의가 있으면 통보받은 날부터 <strong>20일 안에</strong> 관할 보건소에 이의신청서를 냅니다. 처리
                결과는 15일 안에 옵니다.
              </>,
              <>
                국민행복카드를 이미 갖고 있으면 <strong>새로 만들지 않고</strong> 쓰던 카드를 그대로 씁니다.
              </>,
              <>
                부모 중 한 쪽이 한국 국적이면 외국인 등록 아동도 받을 수 있습니다. 부모가 모두 외국 국적이면 대상이
                아니지만, 난민·특별기여자·북한이탈주민·영주귀국 사할린 한인은 요건을 갖추면 됩니다.
              </>,
            ]}
          />
          <Src page="인쇄 349~350쪽·360~361쪽" />
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문 →
              </Link>
            </p>
          )}
          <DocNote>
            이 글은 지침에 적힌 것을 옮긴 것이며, 누가 대상인지 판정하지 않습니다. 대상 여부는 관할 보건소가 정합니다.
            문의는 보건복지상담센터 <strong>129</strong>입니다. 수록 원문에 첨부된 사업안내는{" "}
            <strong>2022년판</strong>이라, 이 글은 2026년판을 따로 받아 썼습니다.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="diaper-formula" />
    </>
  );
}
