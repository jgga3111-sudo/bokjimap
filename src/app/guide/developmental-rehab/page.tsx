import { serviceLink } from "@/lib/serviceLink";
import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";

const G = guideBySlug("developmental-rehab")!;

export const metadata: Metadata = {
  title: "발달재활서비스 2026 — 월 18~26만원 바우처, 소득 기준·지원 기간·중복 불가 서비스",
  description:
    "발달재활서비스는 소득에 따라 월 18~26만원 바우처를 줍니다. 2026년 보건복지부 사업안내로 소득 기준 표, 18세·20세까지 지원 기간, 9세 미만 의뢰서, 대기자 순서, 월말 소멸되는 바우처 규칙을 정리했습니다.",
  alternates: { canonical: "/guide/developmental-rehab" },
};

/*
  왜 이 글인가 (2026-10-04).

  조회수 「발달재활서비스」(WLF00003195, 약 14.7만) 원문은 5등급 지원금(월 26·24·22·20·18만원)과
  본인부담금까지는 적는다. 없는 것은 사람들이 실제로 막히는 곳이다.
   · 소득을 **무엇으로 재나** — 가구원 수별 월 소득 기준과 건강보험료 판정(170쪽).
   · **언제까지 받나** — 선정된 달의 다음 달부터 18세가 되는 달까지, 재학 중이면 20세(169쪽).
   · **예산이 떨어지면** — 대기자 명단으로 관리하고 서비스가 중단될 수 있다(169쪽).
   · **겹치면 안 되는 서비스**(171쪽)와 **월말에 사라지는 바우처**(193~194쪽).

  ⚠ 원문 첨부는 「2024년 장애아동가족지원 사업안내」라 두 해 낡았다. 2026년판은 보건복지부 누리집
  「훈령/예규/고시/지침」 게시판(2026-04-01 등록, 543쪽)에서 받았다. 인쇄 쪽 = PDF 파일 쪽 − 4.
  금액·표는 지침에 적힌 값만 옮기고, 곱한 값에는 「저희가 계산한 값」을 붙인다. 원문과 지침이 어긋나는
  곳은 합치지 않고 둘 다 적는다(3절).
*/
const SVC_ID = "WLF00003195";
const SVC = services.find((s) => s.id === SVC_ID);
const DOC = "2026년 장애아동가족지원 사업안내";
const DOC_URL = "https://www.mohw.go.kr/board.es?mid=a10409020000&bid=0026&act=view&list_no=1489958";
const CHECKED = "2026-10-04";

function Source({ page }: { page: string }) {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      <a href={DOC_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
        보건복지부 「{DOC}」
      </a>{" "}
      {page} · {CHECKED} 확인
    </p>
  );
}

/** 지침 162쪽 — 소득 등급별 바우처와 본인부담. 복지로 원문의 금액과 같다(10-04 대조). */
const TIERS = [
  ["다형", "기초생활수급자", "26만원", "면제"],
  ["가형", "차상위계층", "24만원", "2만원"],
  ["나형", "차상위 초과 ~ 기준 중위소득 65% 이하", "22만원", "4만원"],
  ["라형", "중위소득 65% 초과 ~ 120% 이하", "20만원", "6만원"],
  ["마형", "중위소득 120% 초과 ~ 180% 이하", "18만원", "8만원"],
] as const;

/** 지침 170쪽 「가구 규모별 소득 기준」(천원). 2026년 기준 중위소득의 65·120·180%를 천원 단위로 올린 값과 같다(10-04 대조). */
const INCOME = [
  ["65%", "-", "2,730", "3,484", "4,222", "4,912"],
  ["120%", "-", "5,040", "6,431", "7,794", "9,069"],
  ["180%", "4,616", "7,559", "9,647", "11,691", "13,603"],
] as const;

export default function DevelopmentalRehabGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="소득에 따라 월 18~26만원이 바우처로 나오고 본인부담금은 면제에서 8만원까지입니다. 그런데 소득을 무엇으로 재는지, 몇 살까지 받는지, 예산이 모자라면 어떻게 되는지는 복지로 원문에 없습니다."
        updated={`최종 수정 ${G.updated} · 보건복지부 2026년 사업안내에서 ${CHECKED} 확인`}
        quick={[
          { label: "얼마", value: "월 18~26만원 바우처(본인부담 면제~8만원)" },
          { label: "누가", value: "18세 미만 등록장애아동, 중위소득 180% 이하" },
          { label: "어디서", value: "아동 주소지 읍·면·동에 연중 신청" },
        ]}
      >
        <DocNote title="복지로 원문에 붙은 사업안내는 2024년판입니다">
          복지로 원문의 첨부 목록에는 「2024년 장애아동가족지원 사업안내」가 있습니다. 이 글은 보건복지부 누리집에
          2026-04-01 올라온 <strong>2026년판</strong>으로 확인했고, 지원액과 본인부담금은 복지로 원문과 같았습니다. 2025년판과 비교해 바뀐 것은
          서비스 단가(30,000원 → 32,500원)와 지원액(다형 25만원 → 26만원 등)이며(지침의 주요 변경 비교표, 인쇄 150~151쪽), 아래는 모두 2026년 값입니다.
        </DocNote>

        <DocSection title="누가 받나">
          <DocList
            items={[
              <>
                <strong>18세 미만 장애아동</strong> 가운데 시각·청각·언어·지적·자폐성·뇌병변 장애가 있는 아이입니다. 장애가
                겹쳐도 인정합니다. 나이는 <strong>신청일 기준</strong>으로 봅니다(인쇄 161·169쪽).
              </>,
              <>
                <strong>장애인복지법상 등록장애아동</strong>이어야 합니다. 등록이 안 됐으면 읍·면·동에서 등록을 안내합니다(인쇄
                161쪽).
              </>,
              <>
                <strong>9세 미만이면 등록 전에도 가능합니다.</strong> 장애가 예견되어 발달재활서비스가 필요하다고 인정한{" "}
                <strong>발달재활서비스 의뢰서[서식 4-1호]와 검사자료</strong>로 대신합니다. 둘 다{" "}
                <strong>신청일 기준 최근 6개월 안에 발급</strong>한 것만 인정하고, 의사가 눈으로만 보고 쓴 의뢰서는 인정하지
                않습니다. 영유아 건강검진 결과서는 검사자료가 아니고, 다만 발달평가(K-DST)에서 「심화평가권고」를 받아 정밀검사를
                했다면 그 정밀검사 자료는 인정됩니다(인쇄 170쪽).
              </>,
              <>
                <strong>고위험 이른둥이</strong>(임신 32주 미만 또는 출생 때 체중 1.5kg 미만)는 의뢰서와 출생증명서만 내면
                됩니다(인쇄 161·170쪽).
              </>,
              <>
                장애인복지법 제32조의2(재외동포·외국의 장애인 등록)로 장애등록한 외국인은 신청 대상이 아닙니다. 다만 난민
                인정자로서 장애인으로 등록했다면 신청할 수 있다고 적혀 있습니다(인쇄 171쪽).
              </>,
            ]}
          />
          <Source page="인쇄 161·169~171쪽" />
        </DocSection>

        <DocSection title="얼마를 받고 얼마를 내나">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <caption className="sr-only">{"얼마를 받고 얼마를 내나"}</caption>
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th scope="col" className="px-3 py-2 font-semibold">등급</th>
                  <th scope="col" className="px-3 py-2 font-semibold">소득 구분</th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold">월 바우처</th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold">본인부담</th>
                </tr>
              </thead>
              <tbody>
                {TIERS.map(([k, who, v, pay]) => (
                  <tr key={k} className="border-b border-line">
                    <td className="px-3 py-2 font-medium text-ink">{k}</td>
                    <td className="px-3 py-2">{who}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{v}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{pay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Source page="인쇄 162쪽" />
          <p>
            지침의 서비스 단가는 <strong>회당 32,500원, 월 8회(주 2회)</strong>를 기준으로 합니다. 32,500원 × 8회는 26만원으로,
            다형 바우처와 같습니다(저희가 곱한 값). 시·군·구가 제공기관을 지정할 때 지역 시장가격을 고려해 단가를 조정하므로
            <strong> 실제 단가와 횟수는 지역·기관마다 다를 수 있습니다</strong>(인쇄 162쪽). 결제 예시도 지침에 있습니다 — 회당 단가가 32,500원일 때 가형(차상위)은
            본인부담 2,500원을 뺀 30,000원, 나형은 5,000원을 뺀 27,500원이 바우처로 결제됩니다(지침 예시, 인쇄 195쪽).
          </p>
          <DocNote>
            서비스 내용은 언어·청능·미술심리·음악·행동발달·놀이심리·재활심리·감각발달·운동발달·심리운동재활 등이고,{" "}
            <strong>병원에서 하는 물리치료·작업치료 같은 의료행위는 지원하지 않습니다</strong>(인쇄 162쪽).
          </DocNote>
        </DocSection>

        <DocSection title="소득은 무엇으로 재나">
          <p>
            등급은 소득 기준에 따라 다섯으로 나뉩니다. 기초생활수급자·차상위계층은 다른 복지급여를 받고 있는지로 판단하고(사회보장
            정보시스템·증명서), <strong>차상위를 넘는 가구는 건강보험료 본인부담금</strong>을 바탕으로 판정합니다(인쇄 162쪽).
            아래 표는 지침이 가구 규모별로 적은 소득 기준입니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] border-collapse text-sm">
              <caption className="sr-only">{"소득은 무엇으로 재나"}</caption>
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th scope="col" className="px-3 py-2 font-semibold">기준 중위소득</th>
                  {["1인", "2인", "3인", "4인", "5인"].map((h) => (
                    <th scope="col" key={h} className="px-3 py-2 text-right font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INCOME.map(([pct, ...vals]) => (
                  <tr key={pct} className="border-b border-line">
                    <td className="px-3 py-2 font-medium text-ink">{pct}</td>
                    {vals.map((v, i) => (
                      <td key={i} className="px-3 py-2 text-right tabular-nums">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">단위: 천원(월). 지침 표 그대로입니다. 6~10인 가구는 지침 붙임 「소득수준별 건강보험료 조견표」에 있습니다.</p>
          <Source page="인쇄 170쪽" />
          <p>
            이 표의 값은 <Link href="/guide/income-line" className="text-brand underline">2026년 기준 중위소득</Link>의 65·120·180%를 천원
            단위로 올린 값과 정확히 같습니다(저희가 대조). 다만 실제 판정은 월 소득이 아니라 <strong>건강보험료</strong>로 하고,
            어느 등급이 되는지는 시·군·구가 조사해 정하므로 이 표로 스스로 판정하지 않습니다.{" "}
            <Link href="/check" className="text-brand underline">내 소득이 기준선의 몇 %인지 계산해 볼 수는 있습니다</Link>.
          </p>
          <DocNote tone="brand">
            <strong>180%를 넘어도 받을 수 있는 경우가 있습니다.</strong> 장애아동이 2명 이상인 가구, 또는 부모 중 1명 이상이
            중증장애인(1급·2급 및 3급 중복장애)인 가구로서 시·군·구청장이 지원이 필요하다고 인정하면, 예산 범위 안에서 마형(본인부담
            8만원)을 지원할 수 있습니다(인쇄 169쪽).
          </DocNote>
        </DocSection>

        <DocSection title="언제까지 받나">
          <DocList
            items={[
              <>
                지원은 <strong>선정된 달의 다음 달부터 18세가 되는 달까지</strong>입니다. 지침 예시 — 생일이 2008.5.15.이면 2026.5.15.에
                18세가 되므로 <strong>2026.5.31.까지 지원하고 6.1.부터 자격이 없어집니다</strong>(인쇄 169쪽).
              </>,
              <>
                초·중등교육법상 학교(특수학교 전공과정 포함)에 <strong>재학 중이면 20세가 되는 달까지</strong> 연장되고, 18세가 넘어도
                신청할 수 있습니다. 20세 전에 졸업하면 졸업하는 달까지입니다. 휴학생은 제외이고 재학증명서를 냅니다(인쇄 169쪽).
              </>,
              <>
                등록 전 <strong>9세 미만</strong>으로 선정됐다면 9세가 되는 달까지 지원합니다. 지침은 담당자가 미리 장애등록을 안내하고,
                미등록이면 중지 처리한다고 적고 있습니다(인쇄 170·200쪽).
              </>,
              <>
                사업기간은 해마다 1월 1일~12월 31일이고, 선정되면 중지 사유가 없는 한 그해 12월 31일까지 매월 바우처가 나옵니다. 신청은{" "}
                <strong>연중</strong> 받습니다(인쇄 162·194쪽).
              </>,
            ]}
          />
          <Source page="인쇄 162·169~170·194·200쪽" />
        </DocSection>

        <DocSection title="예산이 모자라면 — 대기자와 순서">
          <p>
            시·군·구는 <strong>예산 범위를 넘는 신청자를 대기자 명단으로 관리</strong>하고, 예산이 초과되면{" "}
            <strong>서비스가 중단될 수 있다</strong>고 지침이 미리 적고 있습니다(인쇄 169쪽). 신청했다고 바로 바우처가 생기는 것이 아니라는
            뜻입니다.
          </p>
          <DocList
            items={[
              <>
                대기자 가운데 새로 지급할 사람은 <strong>① 등록장애인, ② 대기 신청순</strong>으로 정합니다. 등록장애인이 아니어도
                전문의 소견서로 이용이 시급함을 확인할 수 있거나 <strong>6개월 이상 장기 대기자</strong>이면 먼저 선정할 수 있습니다(인쇄
                171쪽).
              </>,
              <>
                이 순서는 <strong>신규 대상자에게만</strong> 적용하고, 이미 이용 중인 사람은 서비스가 끊기지 않도록 순서와 상관없이
                이어집니다(인쇄 171쪽).
              </>,
              <>같은 집에 서비스 대상 아동이 둘 이상이면 아이마다 바우처가 나옵니다(인쇄 171쪽).</>,
            ]}
          />
          <Source page="인쇄 169·171쪽" />
        </DocSection>

        <DocSection title="같이 받으면 안 되는 서비스">
          <DocList
            items={[
              <>
                <strong>아동·청소년 심리지원서비스, 영유아발달지원서비스, 우리아이 심리지원 서비스</strong>와는 중복으로 받을 수
                없습니다. 발달재활서비스 대상자로 선정되면 <strong>기존 재활 관련 서비스는 해지</strong>합니다(인쇄 171쪽).
              </>,
              <>
                교육부 치료지원서비스와는 <strong>같은 분야</strong>이면 지원이 안 됩니다. 분야가 다르면 가능합니다 — 예컨대 교육부
                지원으로 언어재활을 받는다면 발달재활서비스로 미술재활은 이용할 수 있고, 이때 교육청 재활지원서비스 영수증 사본을
                냅니다(인쇄 171쪽).
              </>,
            ]}
          />
          <Source page="인쇄 171쪽" />
        </DocSection>

        <DocSection title="바우처는 이렇게 쓰고, 이렇게 사라집니다">
          <DocList
            items={[
              <>
                <strong>국민행복카드</strong>(한국사회보장정보원 발급)로 결제합니다. 바우처는 <strong>매월 말일</strong>에 생성되고,
                본인부담금을 냈는지와 상관없이 만들어집니다. 다만 본인부담금은 <strong>제공기관에 먼저 내야 하고</strong>, 안 내면 낼
                때까지 서비스가 중단됩니다(인쇄 163·193쪽).
              </>,
              <>
                <strong>그 달에 생긴 바우처는 그 달 말일까지만 결제할 수 있습니다.</strong> 다음 달로 넘어가지 않습니다(인쇄 194쪽). 월
                8회를 못 채운 만큼 쌓아 두었다 쓸 수 없다는 뜻입니다.
              </>,
              <>
                이용을 중단했거나 기관이 서비스를 못 한 경우, 요청하면 <strong>안 쓴 횟수만큼 본인부담금을 돌려받습니다</strong>.
                다만 사전에 알리지 않은 무단결석은 회당 본인부담금을 환급하지 않을 수 있고, 무단결석도 서비스를 못 한 것이라 정부 바우처
                결제는 안 됩니다(인쇄 194쪽).
              </>,
              <>
                자격이 끝나면 남은 바우처가 사라집니다. 18세 도래 같은 <strong>자격 종료는 그 달 말일 24시까지</strong>, 본인 포기나
                사망·행방불명은 <strong>중지 처리된 당일 24시까지</strong>만 결제됩니다(인쇄 194쪽).
              </>,
              <>
                이사하면 대상자 정보가 자동으로 넘어갑니다. 다만 신청하고 선정되기 전에 다른 시·군·구로 옮겼다면 신청은 부적합으로
                끝나고, 계속 받고 싶으면 <strong>옮긴 곳에서 다시 신청</strong>해야 합니다(인쇄 199쪽).
              </>,
            ]}
          />
          <Source page="인쇄 163·193~194·199쪽" />
        </DocSection>

        <DocSection title="복지로 원문과 다르거나, 이 글에 없는 것">
          <DocList
            items={[
              <>
                복지로 원문은 「시각 장애아동(중복 장애 제외)의 경우 발달재활서비스가 필요한 대상인지 여부를 별도로 판단」이라고
                적습니다. 2026년 지침의 대상자 쪽(인쇄 161·169쪽)에는 이 문구가 없고 「장애유형: 시각·청각·언어·지적·자폐성·뇌병변,
                중복 장애 인정」이라고만 되어 있습니다. <strong>어느 쪽이 창구 기준인지 저희는 판정하지 않았습니다</strong> — 시각
                장애아동이라면 신청 전에 읍·면·동이나 보건복지상담센터(129)에 확인해 주세요.
              </>,
              <>
                제공기관별 서비스 단가와 월 이용 횟수, 지역별 대기 현황은 지침에 없고 시·군·구가 정합니다. 6~10인 가구의 소득 기준은 지침
                붙임 조견표에 있어 옮기지 않았습니다.
              </>,
              <>
                이 글은 신청 방법을 안내할 뿐 받을 수 있는지 판정하지 않습니다. 등급은 시·군·구의 소득조사로 정해집니다.
              </>,
            ]}
          />
          {SVC && (
            <p>
              <Link {...serviceLink(SVC_ID)} className="text-brand underline">
                복지로 원문으로 보기 — {SVC.name} →
              </Link>
            </p>
          )}
          <p className="text-xs text-muted">
            문의 — 사회서비스전자바우처 1566-3232 · 보건복지상담센터 129(복지로 원문 기재).
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/guide/childcare-service" className="text-brand underline">
                아이돌봄서비스 — 시간당 요금과 정부 지원 →
              </Link>
            </li>
            <li>
              <Link href="/guide/disability-activity-support" className="text-brand underline">
                장애인활동지원 — 15구간 월 한도액과 본인부담금 →
              </Link>
            </li>
            <li>
              <Link href="/guide/mental-health-voucher" className="text-brand underline">
                정신건강 심리상담 바우처 →
              </Link>
            </li>
          </ul>
          <DocNote>
            금액·소득 기준·지원 기간은 해마다 바뀝니다. 이 글은 위에 적힌 확인일 기준이니 신청 직전에 그해 사업안내를 다시
            확인해 주세요.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="developmental-rehab" />
    </>
  );
}
