import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("school-support")!;

export const metadata: Metadata = {
  title: "교육급여 바우처 신청과 초중고 교육비 지원 차이 — 2027년 2월 28일까지",
  description:
    "교육급여 교육활동지원비(초 50만 2천·중 69만 9천·고 86만원)는 수급자로 결정돼도 바우처를 따로 신청해야 받습니다. 초중고 교육비 지원(고교학비·급식비·방과후 자유수강권·교육정보화)과 무엇이 다른지 교육부 2026년 지침으로 정리했습니다.",
  alternates: { canonical: "/guide/school-support" },
};

/*
  왜 이 글인가 (2026-09-15).

  조회수 15위 초중고 교육비 지원(133만) · 17위 교육급여(126만) · 27위 교육정보화(64만)는 이름이
  비슷하고 신청 창구도 같은데(주민센터·복지로) 복지로에는 세 페이지로 따로 있다. 셋 다 상세에
  우리가 따로 확인한 것이 없었다.

  원문에 붙은 교육부 2026년 지침 두 권을 읽었다.
  · 「2026 초·중·고 학생 교육비 지원 안내」(124쪽) — 교육비·교육정보화
  · 「2026 국민기초생활보장사업 교육급여 운영 방안 안내」(158쪽) — 교육급여
  복지로 원문에 없는 가장 큰 사실은 **교육활동지원비가 바우처라 따로 신청해야 한다**는 것이다.
  수급자 결정 통지만 받고 기다리면 안 나온다.

  시·도교육청별 지원 기준표(교육비 안내 23쪽)는 PDF에서 열이 뭉개져 옮기면 틀릴 수 있어
  싣지 않고 원문으로 보낸다(3절). 쪽수는 인쇄 쪽(머리글 숫자)이다.
*/
const IDS = { cost: "WLF00001103", benefit: "WLF00001089", it: "WLF00003227" };
const find = (id: string) => services.find((s) => s.id === id);
const COST = find(IDS.cost);
const BENEFIT = find(IDS.benefit);
const IT = find(IDS.it);

const COST_PDF = COST?.forms.find((f) => f.name.includes("교육비 지원 안내"))?.url ?? null;
const BENEFIT_PDF = BENEFIT?.forms.find((f) => f.name.includes("교육급여 운영"))?.url ?? null;
const CHECKED = "2026-09-15";

function Src({ pdf, name, page }: { pdf: string | null; name: string; page: string }) {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      {pdf ? (
        <a href={pdf} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
          교육부 「{name}」
        </a>
      ) : (
        <>교육부 「{name}」</>
      )}{" "}
      {page} · {CHECKED} 확인
    </p>
  );
}
const COST_DOC = "2026 초·중·고 학생 교육비 지원 안내";
const BENEFIT_DOC = "2026 국민기초생활보장사업 교육급여 운영 방안 안내";

export default function SchoolSupportGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="초중고 학생에게 나오는 지원은 크게 셋입니다 — 교육급여, 교육비 지원, 교육정보화. 한 번에 신청하지만 받는 방법은 제각각이고, 교육급여의 현금성 지원은 결정 뒤에 한 번 더 신청해야 합니다."
        updated={`최종 수정 ${G.updated} · 교육부 2026년 지침 두 권과 복지로 원문에서 ${CHECKED} 확인`}
      >
        <DocSection title="한 장으로 보면">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">제도</th>
                  <th className="px-3 py-2 font-semibold">누가</th>
                  <th className="px-3 py-2 font-semibold">무엇을</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">교육급여</td>
                  <td className="px-3 py-2">소득인정액이 기준중위소득 50% 이하 가구의 초·중·고등학생(부양의무자 기준 미적용)</td>
                  <td className="px-3 py-2">
                    교육활동지원비 연 1회 — 초 {won(502_000)} · 중 {won(699_000)} · 고 {won(860_000)}(바우처).
                    고등학생은 교과서·입학금·수업료(학교로 지급)
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">초중고 교육비 지원</td>
                  <td className="px-3 py-2">저소득층 수급 자격(기초·한부모·법정 차상위) 또는 시·도교육감이 정한 소득인정액 기준, 학교장 추천</td>
                  <td className="px-3 py-2">고교학비(입학금·수업료·학교운영지원비), 급식비, 방과후학교 자유수강권(통상 연 60만원 내외), 교육정보화</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">교육정보화 지원</td>
                  <td className="px-3 py-2">생계·의료·주거·교육급여 수급자, 한부모가족, 차상위계층 등 저소득층 가구의 초·중·고등학생</td>
                  <td className="px-3 py-2">가구당 컴퓨터 1대, 인터넷 통신비 월 17,600원, 유해차단 서비스 월 1,650원(시·도별 기준에 따라)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            누가·무엇을은 세 사업의 복지로 원문, 자유수강권 금액과 교육정보화 내용은 교육비 지원 안내 25~26쪽 · {CHECKED} 확인.
            교육비 지원과 교육정보화의 소득 기준·항목은 <strong>시·도교육청마다 다릅니다</strong>(교육비 지원 안내 23쪽 표).
          </p>
        </DocSection>

        <DocSection title="교육급여 — 결정 통지를 받아도 바우처는 따로 신청합니다">
          <DocNote tone="amber" title="가장 많이 놓치는 자리">
            교육활동지원비는 <strong>카드 포인트 같은 바우처</strong>로 지급되고, 한국장학재단에서{" "}
            <strong>별도의 신청 절차</strong>를 거쳐야 개별 학생에게 지급됩니다. 2026학년도 신청 기간은{" "}
            <strong>2026. 4. 1. ~ 2027. 2. 28.</strong>, 사용 기간은 배정일부터{" "}
            <strong>2027. 3. 31.</strong>까지입니다.
          </DocNote>
          <DocList
            items={[
              <>
                <strong>신청하는 곳</strong> — 바우처 전용 홈페이지(e-voucher.kosaf.go.kr), 농협앱, 페이코앱
              </>,
              <>
                <strong>누가</strong> — 학생 본인(만 14세 이상) 또는 보호자(교육급여 신청인, 수급 학생의 세대주
                또는 성인 세대원)
              </>,
              <>
                <strong>받는 수단</strong> — 이미 가진 신용·체크카드 포인트, 간편결제(페이코) 포인트, 전용카드
                포인트 중 고릅니다. 카드 발급이 어려우면 선불카드를 등기로 받습니다.
              </>,
              <>
                <strong>작년에 받았다면</strong> — 2025학년도 바우처 지급을 마친 학생이 2026학년도 자격을
                유지하면 별도 신청 없이 자동 지급됩니다.
              </>,
              <>
                <strong>언제부터 신청되나</strong> — 교육청이 매월 16일에 급여 자료를 만들고, 그 대상자의
                바우처 신청은 <strong>다음 달 1일부터</strong> 가능합니다(알림톡·문자 안내 예정).
              </>,
            ]}
          />
          <p>
            <strong>쓸 수 없는 곳</strong>도 정해져 있습니다. 유흥·사행업종, 청소년 출입불가 업종,
            상품권·성인용품 등만 막고 나머지는 원칙적으로 허용합니다. 표에 적힌 제한 업종에는 노래방·PC방·당구장,
            복권방·오락실, 피부미용실·네일아트, 부동산 관련업·예식장·산후조리원 등이 있습니다.
          </p>
          <Src pdf={BENEFIT_PDF} name={BENEFIT_DOC} page="30·35~36·76쪽" />
          <p>
            <strong>교과서·입학금·수업료</strong>는 고등학생에게만 있고 학교로 직접 지급됩니다. 이미 학교에
            냈다면 학교가 수급자에게 돌려줍니다. 교육급여 신청은 <strong>연중 상시</strong>입니다.
          </p>
          <Src pdf={BENEFIT_PDF} name={BENEFIT_DOC} page="29~31쪽" />
          <DocNote title="한부모가족 학용품비와는 겹쳐 받지 않습니다">
            소득인정액 기준중위소득 65% 이하 한부모가족의 초·중·고 자녀에게는 시·군·구가 연 100,000원 학용품비를
            줍니다. 교육급여 수급자가 학용품비를 먼저 받았으면 교육활동지원비에서 그 금액을 뺀 차액을 받고,
            교육활동지원비를 먼저 받았으면 학용품비는 나오지 않습니다(교육급여 안내 33쪽).
          </DocNote>
        </DocSection>

        <DocSection title="초중고 교육비 지원 — 신청한 달부터, 신청해야 받습니다">
          <DocList
            items={[
              <>
                <strong>언제 신청</strong> — 집중신청기간은 2026. 3. 3. ~ 3. 20.이지만 그 밖에도{" "}
                <strong>연중 상시</strong> 신청할 수 있습니다.
              </>,
              <>
                <strong>언제부터 받나</strong> — 선정되면 <strong>신청일이 속하는 달부터</strong> 그 학년도 말까지
                지원합니다. 늦게 신청할수록 받는 달이 줄어듭니다.
              </>,
              <>
                <strong>자격이 있어도 신청해야</strong> — 지침은 &ldquo;기초, 한부모, 법정차상위 대상자라도 교육비
                미신청시 미지원&rdquo;이라고 적습니다.
              </>,
              <>
                <strong>작년에 받았다면</strong> — 2025년 교육비 지원자(확인조사 대상자)는 2026년에 다시 신청하지
                않아도 됩니다. 가구원이 바뀌었으면 변경 신청을 합니다.
              </>,
              <>
                <strong>고1 입학금</strong> — 고등학교 1학년 1분기에 신청한 경우에만 지급됩니다.
              </>,
              <>
                <strong>방과후학교 자유수강권</strong> — 선정된 뒤 방과후학교 프로그램을 실제로 신청·수강한 만큼만
                지원합니다.
              </>,
              <>
                <strong>교육급여를 받는 고등학생</strong> — 입학금·수업료는 교육급여로 받으므로 겹치지 않고,
                교육급여에 없는 학교운영지원비만 이 사업에서 받습니다.
              </>,
            ]}
          />
          <Src pdf={COST_PDF} name={COST_DOC} page="14·18·24~25쪽" />
          <p>
            <strong>온라인 신청</strong>(교육비 원클릭 신청시스템·복지로)은 학생의 부모만 할 수 있고, 가구원 중
            외국인이 있거나 보호자가 부모가 아니면 주민센터에서 신청합니다. 처리는 시·군·구 조사 30일(특별한 사유가
            있으면 60일), 교육청·학교 통보 30일이고 결과는 학교가 문자 등으로 알립니다.
          </p>
          <Src pdf={COST_PDF} name={COST_DOC} page="14~16쪽" />
          <DocNote title="조사에서 떨어져도 길이 하나 더 있습니다">
            소득·재산 조사에서 탈락했지만 증빙하기 어려운 사정(갑작스러운 실직, 부모의 이혼·가계파산, 간병하는 학생
            등)이 있으면, 학교에서 <strong>학교장 추천</strong>으로 교육비를 지원받을 수 있습니다. 담임교사가 보호자
            동의를 받아 추천서를 쓰고 교내 학생복지심사위원회가 정합니다. 지원 항목은 시·도교육청마다 다릅니다
            (교육비 지원 안내 26~29쪽).
          </DocNote>
        </DocSection>

        <DocSection title="교육정보화 — 통신비는 통신사로 바로 갑니다">
          <p>
            인터넷 통신비는 시·도교육청이 통신사로 직접 지급하고, 컴퓨터는 학생 가구를 방문해 설치합니다.
            복지로 원문은 <strong>1세대 1자녀 지원</strong>이라 형제자매 사이 중복 지원을 하지 않고, 이미 컴퓨터를
            받은 가구원이 있으면 컴퓨터는 지원하지 않는다고 적습니다. 다른 법령으로 PC·인터넷 통신비를 받는 경우도
            중복 지원이 제한됩니다.
          </p>
          <Src pdf={COST_PDF} name={COST_DOC} page="26쪽" />
        </DocSection>

        <DocSection title="신청과 문의">
          <p>
            세 가지 모두 주소지 읍·면·동 주민센터나 복지로에서 신청합니다. 교육비·교육정보화는{" "}
            <strong>교육비 원클릭 신청시스템</strong>(oneclick.neis.go.kr)에서도 됩니다. 교육비 지원을 신청할 때
            교육급여를 함께 신청하도록 안내하게 돼 있습니다.
          </p>
          <p>
            문의: 교육비 원클릭 상담센터 <strong>1544-9654</strong> · 한국장학재단(교육급여 바우처){" "}
            <strong>1599-2000</strong> · 보건복지상담센터 <strong>129</strong>
          </p>
          <ul className="space-y-1 text-sm">
            {[BENEFIT, COST, IT].filter(Boolean).map((s) => (
              <li key={s!.id}>
                <Link href={`/service/${s!.id}`} className="text-brand underline">
                  {s!.name} — 복지로 원문 →
                </Link>
              </li>
            ))}
          </ul>
          <DocNote>
            이 글은 교육부 지침과 복지로 원문을 옮긴 것이며, 받을 수 있는지 판정하지 않습니다. 시·도교육청마다
            기준이 달라 같은 소득이어도 사는 곳에 따라 결과가 다를 수 있으니, 관할 교육청 기준을 함께 확인해 주세요.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="school-support" />
    </>
  );
}
