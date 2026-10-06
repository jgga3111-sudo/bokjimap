import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { serviceLink } from "@/lib/serviceLink";

const G = guideBySlug("gumi-youth-rent")!;
const CHECKED = "2026-10-06";
const NOTICE = "https://www.gumi.go.kr/reservation/www/anm/master/view.do?idx=39001&key=132";
const EXTEND = "https://www.gumi.go.kr/reservation/www/anm/master/view.do?idx=41003&key=132";

export const metadata: Metadata = {
  title: "구미 청년월세 지원 2026 하반기 — 10월 2일부터 접수, 월 10만원 24개월",
  description:
    "구미형 청년월세 지원사업 2026년 하반기 신청이 10월 2일 09:00에 시작됐고 예산이 떨어지면 마감합니다. 대상(1986~2007년생), 제출 서류, 15일 보완 규칙을 구미시 공고에서 옮겼습니다.",
  alternates: { canonical: "/guide/gumi-youth-rent" },
};

/*
  왜 이 글인가 (2026-10-06 두 번째 루틴).

  조회수 60위 「청년월세 지원사업」(구미시, WLF00005691) 원문은 지원 내용이 한 줄, 신청 방법이 「행정복지센터 방문신청」
  한 줄이다. 서치콘솔에서 「구미 청년월세지원」 변형 검색어가 주에 약 120번 노출되는데 클릭이 거의 없었다 —
  사람들이 찾는 답(지금 신청을 받나, 무엇을 내나)이 우리 페이지에 없었다는 뜻이다.

  1차 출처: 구미시 통합예약 누리집의 「구미형 청년월세 지원사업 신규 모집 (예산소진시 마감)」 접수 화면과 그 안에 실린
  「2026년 하반기 구미형 청년월세 지원사업 신청자 모집 공고」(view.do?idx=39001, 2026-10-06 직접 열어 확인).
  기숙사 연장·중지는 같은 누리집의 「청년월세 연장 및 중지 신청 온라인 접수」(idx=41003).

  싣지 않은 것
   · 2026년 상반기 모집 일정 — 구미시 누리집에서 찾지 못했다(민간 사이트 요약에만 보인다).
   · 접수 인원 — 볼 때마다 바뀌는 수라 확인한 날을 붙여 한 번만 적었다.
   · 국토부 청년월세와 함께 받을 수 있는지 — 복지로 원문의 제외대상 문구만 그대로 옮기고 풀이하지 않는다.
*/

const cell = "px-3 py-2";
const th = "px-3 py-2 font-semibold";
const head = "border-y border-line bg-sunken text-left";
const row = "border-b border-line align-top";

const PAPERS: readonly (readonly [string, string])[] = [
  ["청년 본인 명의 통장 사본", "압류방지 통장이나 다른 사람 통장으로는 지원받을 수 없다고 적혀 있습니다."],
  ["확정일자가 날인된 임대차 계약서 사본", "확정일자는 주소지 동 행정복지센터에서 받습니다. 기숙사에 살면 아래 「기숙사」 서류로 대신합니다."],
  [
    "3개월간 월세를 낸 것을 확인할 수 있는 서류",
    "이체 확인증·송금 확인증. 보내는 사람, 받는 사람, 금액, 날짜가 적혀 있어야 합니다(2촌 이내 혈족까지 인정). 이체 내역이 3개월이 안 되면 월세·보증금 이체 확인서를 냅니다. 월세를 부모님이 내주면 부모님 통장 사본을 붙입니다.",
  ],
  ["가족관계증명서(상세, 전체공개)", "본인·부·모 기준으로 각각 1통씩. 기숙사에 살면 본인 기준 1통만."],
  ["혼인관계증명서(상세, 전체공개)", "본인 기준. 미혼이어도 냅니다."],
  ["그 밖의 서류", "계약이 묵시적으로 연장됐으면 수정된 계약서나 부동산 등기부 등본. 담당자가 증빙을 더 요청할 수 있습니다."],
];

const DORMS: readonly (readonly [string, string])[] = [
  ["금오공대", "거주사실확인서, 생활관비납부영수증"],
  ["폴리텍", "입실확인서(생활관 거주확인서), 수납내역영수증"],
  ["경운대", "거주사실확인서, 생활관비수납확인서"],
  ["구미대", "생활관비납입확인서, 생활관거주사실확인서"],
];

export default function GumiYouthRentGuide() {
  const svc = serviceLink("WLF00005691");
  return (
    <>
      <DocPage
        title={G.title}
        lead="복지로 원문은 이 사업을 「월 최대 10만원 최대 24개월」, 「행정복지센터 방문신청」 두 줄로만 적습니다. 지금 신청을 받는지, 무엇을 내야 하는지는 구미시 공고에 있어서 그대로 옮겼습니다. 대상이 되는지는 구미시가 소득·재산을 조사해 정합니다."
        updated={`최종 수정 ${G.updated} · 구미시 통합예약 누리집의 2026년 하반기 모집 공고에서 ${CHECKED} 확인`}
        quick={[
          { label: "언제", value: "2026년 10월 2일(금) 09:00부터 · 예산이 떨어지면 마감" },
          { label: "얼마", value: "월 최대 10만원씩 최대 24개월(최대 240만원)" },
          { label: "어디서", value: "구미시 통합예약 누리집(온라인) 또는 주소지 읍·면·동 행정복지센터" },
        ]}
      >
        <DocSection title="지금 신청을 받고 있나">
          <DocList
            items={[
              <>
                공고의 신청기간은 <strong>「2026. 10. 2.(금) 09:00 ~ 예산 소진 시 마감」</strong>입니다. 마감하면 공지사항으로 알린다고
                적혀 있습니다.
              </>,
              <>
                구미시 통합예약 누리집의 접수 화면에는 접수기간이 <strong>2026.10.02 ~ 2026.11.30</strong>, 모집인원이{" "}
                <strong>정원 1,000명 · 대기 100명</strong>으로 나옵니다. {CHECKED}에 열었을 때 접수 현황은 291명이었습니다. 이 수는 볼 때마다
                바뀌니 신청 전에 <a href={NOTICE} target="_blank" rel="noopener noreferrer" className="text-brand underline">접수 화면</a>에서
                다시 확인하세요.
              </>,
              <>
                두 날짜 중 먼저 오는 쪽에서 끝난다고 보는 것이 안전합니다. 11월 30일 전이라도 <strong>예산이 떨어지면 닫힙니다.</strong>
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="누가 신청할 수 있나 — 공고에 적힌 대상">
          <DocList
            items={[
              <>
                <strong>19~39세 이하</strong>, 부모님과 따로 사는 <strong>무주택 미혼 청년</strong>. 공고는 출생일을{" "}
                <strong>주민등록상 1986. 1. 1. ~ 2007. 12. 31.</strong>로 적습니다.
              </>,
              <>
                <strong>기준 중위소득 120% 이하</strong>이면서 <strong>재산 1억 2천 2백만원 이하</strong>. 복지로 원문은 소득 기준 옆에{" "}
                <strong>「3,077,086원」</strong>을 적어 두었는데, 2026년 1인 가구 기준 중위소득(2,564,238원)의 120%와 같은 값입니다. 가구원이
                여럿일 때 어떻게 세는지는 공고에 없습니다.
              </>,
              <>
                이미 이 사업으로 지원받고 있으면 <strong>신규 신청 대상이 아닙니다.</strong> 공고는 변경 사항을 신규 접수 화면에 올리면
                신규로 처리돼 지급이 늦어질 수 있다고 적습니다.
              </>,
            ]}
          />
          <DocNote>
            복지로 원문 「선정 기준」에는 <strong>제외대상</strong>이 따로 적혀 있습니다 — 「기초생활수급자(생계, 의료, 주거, 교육), 2촌 이내
            주택 임차자, 1실방 다수거주 방식 전대차, 국토부 청년월세한시특별지원사업 대상자(지급완료자는 가능), 공공임대 거주자(국민임대,
            영구임대, LH매입, 행복주택, 공무원임대주택 등)」. 2026년 하반기 공고 본문에는 이 목록이 없으니, 여기에 해당하면 신청 전에
            구미시 인구청년과(054-480-2524, 2525)에 물어보세요.
          </DocNote>
        </DocSection>

        <DocSection title="얼마를, 어떻게 주나">
          <DocList
            items={[
              <>
                <strong>월 최대 10만원씩 최대 24개월</strong>(최대 240만원).
              </>,
              <>
                <strong>실제로 낸 월세 금액만</strong> 지원하고 <strong>관리비는 뺍니다.</strong> 복지로 원문은 임차보증금도 제외라고 적습니다.
              </>,
              <>
                <strong>청년 본인 계좌로 현금 지급</strong>합니다. 압류방지 통장과 다른 사람 통장은 안 됩니다.
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="내야 하는 서류">
          <p className="text-sm text-slate-600">
            공고는 서류를 「열람용 불가 / 제출용 / 전체공개 및 상세로 제출」하라고 적습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <caption className="sr-only">구미형 청년월세 지원사업 제출 서류</caption>
              <thead>
                <tr className={head}>
                  <th scope="col" className={th}>서류</th>
                  <th scope="col" className={th}>공고에 적힌 조건</th>
                </tr>
              </thead>
              <tbody>
                {PAPERS.map(([name, note]) => (
                  <tr key={name} className={row}>
                    <th scope="row" className={`${cell} text-left font-semibold`}>{name}</th>
                    <td className={cell}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocSection title="기숙사에 산다면">
          <p>
            임대차 계약서 대신 학교가 떼어 주는 서류를 냅니다. 방학에도 기숙사에 살면 거주사실확인서 등에 <strong>방학 기간이 포함</strong>돼
            있어야 합니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <caption className="sr-only">학교별 기숙사 거주 서류</caption>
              <thead>
                <tr className={head}>
                  <th scope="col" className={th}>학교</th>
                  <th scope="col" className={th}>내는 서류</th>
                </tr>
              </thead>
              <tbody>
                {DORMS.map(([school, papers]) => (
                  <tr key={school} className={row}>
                    <th scope="row" className={`${cell} text-left font-semibold whitespace-nowrap`}>{school}</th>
                    <td className={cell}>{papers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600">
            기숙사 거주자가 지원을 이어 받으려면 <strong>학기마다 연장 서류</strong>를 내야 하고, 안 내면 지원금이 중단될 수 있다고 적혀
            있습니다. 연장과 중지(본가 전입, 다른 시·군·구로 전출, 군 복무, 전세·공공임대주택으로 이사 등)는{" "}
            <a href={EXTEND} target="_blank" rel="noopener noreferrer" className="text-brand underline">
              연장·중지 신청 화면
            </a>
            에서 따로 받습니다.
          </p>
        </DocSection>

        <DocSection title="신청한 뒤 — 놓치기 쉬운 것">
          <DocList
            items={[
              <>
                순서는 <strong>온라인·방문 신청 → 주소지 읍·면·동 담당자 접수 → 인구청년과의 소득·재산 조사, 결과 책정, 통보</strong>입니다.
                소득·재산 조사에 <strong>1~3개월</strong>이 걸릴 수 있다고 적혀 있습니다.
              </>,
              <>
                보완 서류를 <strong>15일 안에 내지 않으면 직권으로 신청이 취소</strong>됩니다. 그리고{" "}
                <strong>추가 서류를 다 낸 날이 신청일</strong>이 됩니다. 예산이 떨어지면 닫히는 사업이라 서류를 한 번에 갖춰 내는 쪽이 유리합니다.
              </>,
              <>
                온라인으로 신청했으면 <strong>주소지 관할 담당자에게 접수가 제대로 됐는지 먼저 확인</strong>하고, 그다음에 구미시청에 문의하라고
                적혀 있습니다.
              </>,
              <>
                거짓이나 부정한 방법으로 지원받으면 부당이득을 <strong>전액 환수</strong>하고 1년 이하의 징역 또는 1천만원 이하의 벌금에
                처한다는 문구가 공고에 있습니다.
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="복지로 원문과 다른 곳">
          <DocList
            items={[
              <>
                <strong>신청 방법</strong> — 복지로 원문은 「주소지 관할 읍면동 행정복지센터 방문신청」만 적습니다. 구미시 공고는{" "}
                <strong>온라인(통합예약 누리집)과 방문</strong> 둘 다 받습니다.
              </>,
              <>
                <strong>신청 기간</strong> — 복지로 원문에는 기간이 없습니다. 이 사업은 늘 받는 것이 아니라 <strong>공고가 날 때</strong>{" "}
                예산 범위에서 받습니다(2025년 2차 모집은 목표 인원에 닿아 5월 2일에 일찍 마감했다고 같은 누리집에 적혀 있습니다).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="이 글에 없는 것">
          <DocList
            items={[
              <>가구원이 여럿일 때의 소득·재산 계산 방식 — 공고에 없습니다. 구미시가 조사해 정합니다.</>,
              <>
                국토교통부 「청년월세 지원사업」과의 관계 — 복지로 원문의 제외대상 문구(위)만 옮겼고 풀이하지 않았습니다. 전국 사업은{" "}
                <Link href="/search?q=청년월세" className="text-brand underline">
                  청년월세 검색 결과
                </Link>
                에서 따로 보세요.
              </>,
              <>2026년 상반기 모집 일정과 다음 모집 시기 — 구미시 누리집에서 확인하지 못했습니다.</>,
            ]}
          />
          <p className="text-sm text-slate-600">
            문의: 구미시청 인구청년과 청년지원팀 054-480-2524, 2525 또는 주소지 읍·면·동 행정복지센터. 수록 사업 정보는{" "}
            <Link {...svc} className="text-brand underline">
              청년월세 지원사업(구미시)
            </Link>
            에 있습니다.
          </p>
        </DocSection>
      </DocPage>
      <GuideNav current="gumi-youth-rent" />
    </>
  );
}
