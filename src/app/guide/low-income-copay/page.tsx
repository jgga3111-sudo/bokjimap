import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";

const G = guideBySlug("low-income-copay")!;

export const metadata: Metadata = {
  title: "차상위 본인부담경감 2026 — 병원비 14%·외래 1,000원, 자격 유지 방법",
  description:
    "차상위 본인부담경감 대상이 되면 병원에서 얼마를 내는지, 그리고 6개월마다 진단서를 내야 자격이 이어지는 이유를 보건복지부 2026년 사업 안내로 정리했습니다. 입원 14%·외래 1,000원, 소득 기준 중위소득 50%, 부양의무자 기준, 신청 뒤 적용 시기와 자격 종료일까지 담았습니다.",
  alternates: { canonical: "/guide/low-income-copay" },
};

/*
  왜 이 글인가 (2026-10-02).

  조회수 59위 「차상위본인부담경감대상자지원」(약 16만) 원문은 병원비 본인부담(14%·면제)과 소득
  50% 기준까지는 적는데, 사람들이 실제로 막히는 세 곳이 없다.
   · **언제까지 인정되나** — 만성질환자는 6개월마다 진단서를 다시 내야 하고, 희귀·중증질환자는
     산정특례를 재등록해야 한다. 안 내면 자격이 끊긴다(안내서 58·62~65쪽).
   · **언제부터 적용되나** — 경감인정 결정을 한 날부터다. 신청일로 소급되지 않는다(59쪽).
   · **진단서에 무엇을 써야 하나** — 2026-04-01 접수분부터 「6개월 이상 · 치료가 필요한 · 만성질환」을
     적어야 한다(53쪽).

  출처는 이 사업 원문에 첨부된 보건복지부 「2026년 차상위 본인부담경감대상자 지원사업 안내」
  (발간등록번호 11-1352000-100480-10, 135쪽)다. 인쇄 쪽 = PDF 파일 쪽 − 12.
  금액·비율은 안내서에 적힌 값만 옮기고 곱한 값에는 「저희가 계산한 값」을 붙인다. 원문과 안내서가
  어긋나면 합치지 않고 둘 다 적는다(3절).
*/
const SVC = services.find((s) => s.id === "WLF00001119");
const PDF = SVC?.forms.find((f) => f.name.includes("차상위 본인부담 경감대상자 지원사업 안내"))?.url ?? null;
const DOC = "2026년 차상위 본인부담경감대상자 지원사업 안내";
const CHECKED = "2026-10-02";

function Source({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted">{children}</p>;
}
const docLink = (page: string) => (
  <>
    {PDF ? (
      <a href={PDF} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
        보건복지부 「{DOC}」
      </a>
    ) : (
      <>보건복지부 「{DOC}」</>
    )}{" "}
    {page}
  </>
);

/** 안내서 i쪽 — 2026년 기준 중위소득의 50%(원/월). 8인 이상은 안내서가 따로 정한 식이라 옮기지 않았다. */
const LIMIT_50 = [
  [1, 1_282_119],
  [2, 2_099_646],
  [3, 2_679_518],
  [4, 3_247_369],
  [5, 3_778_360],
  [6, 4_277_976],
  [7, 4_757_575],
] as const;

/** 안내서 i쪽 — 부양능력 판정기준표(원/월). 부양의무자가 부양할 차상위 대상자가 1·2·3명일 때, 부양의무자 세대원 1~4인. */
const OBLIGOR_ROWS = [
  { n: "1명", pct: "120%", v: [3_077_086, 5_039_150, 6_430_843, 7_793_686] },
  { n: "2명", pct: "130%", v: [3_333_509, 5_459_080, 6_966_747, 8_443_159] },
  { n: "3명", pct: "140%", v: [3_589_933, 5_879_009, 7_502_650, 9_092_633] },
] as const;

export default function LowIncomeCopayGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="차상위 본인부담경감 대상이 되면 병원비가 의료급여와 비슷한 수준으로 줄어듭니다. 그런데 한 번 받았다고 계속 받는 것이 아니라, 종류에 따라 6개월마다 진단서를 내거나 산정특례를 다시 등록해야 자격이 이어집니다."
        updated={`최종 수정 ${G.updated} · 금액·규칙은 보건복지부 「${DOC}」에서 ${CHECKED} 확인`}
      >
        <DocSection title="병원에서 얼마를 내나">
          <p>
            대상은 세 갈래이고, 갈래마다 내는 돈이 다릅니다. 안내서(5쪽)가 일반 건강보험 가입자와
            견주어 적은 표를 옮겼습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">구분</th>
                  <th className="px-3 py-2 font-semibold">일반 건강보험 가입자</th>
                  <th className="px-3 py-2 font-semibold">차상위 본인부담경감 대상자</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2 font-semibold">희귀질환·중증난치질환·중증질환자</td>
                  <td className="px-3 py-2">입원·외래 요양급여비용의 5%(중증)·10%(희귀), 식대 50%</td>
                  <td className="px-3 py-2">
                    <strong>요양급여비용 면제</strong>, 입원 기본식대의 20%
                  </td>
                </tr>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2 font-semibold">만성질환자·18세 미만</td>
                  <td className="px-3 py-2">
                    입원 20%, 식대 50%
                    <br />
                    외래 30~60%
                  </td>
                  <td className="px-3 py-2">
                    입원 <strong>14%</strong>, 기본식대 20%
                    <br />
                    외래 <strong>14%</strong>(정액 1,000원·1,500원)
                    <br />
                    <span className="text-muted">1세 미만 영유아는 5% 또는 면제</span>
                  </td>
                </tr>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2 font-semibold">65세 이상 노인 틀니</td>
                  <td className="px-3 py-2">30%</td>
                  <td className="px-3 py-2">희귀·중증 5% · 만성·18세 미만 15%</td>
                </tr>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2 font-semibold">65세 이상 치과 임플란트</td>
                  <td className="px-3 py-2">30%</td>
                  <td className="px-3 py-2">희귀·중증 10% · 만성·18세 미만 20%</td>
                </tr>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2 font-semibold">추나요법</td>
                  <td className="px-3 py-2">50%</td>
                  <td className="px-3 py-2">희귀·중증 30% · 만성·18세 미만 40%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Source>{docLink("5쪽")} · 복지로 원문에는 틀니·임플란트·추나요법 비율이 없습니다 · {CHECKED} 확인</Source>
          <p>
            창구에서 내는 돈은 병원 종류에 따라 다시 갈립니다. 안내서 86쪽 「본인부담기준」에는 만성질환자·18세
            미만(E) 기준으로 이렇게 적혀 있습니다.
          </p>
          <DocList
            items={[
              <>
                <strong>의원·치과의원·한의원·보건의료원 외래</strong> — 1,000원(의원이 약을 직접 조제하면
                1,500원). CT·MRI·PET은 총액의 14%.
              </>,
              <>
                <strong>종합병원·병원 등 외래</strong> — 요양급여비용 총액의 14%. 치매·임신부·조산아 등은 5%,
                희귀질환자는 10%.
              </>,
              <>
                <strong>약국</strong> — 처방조제 500원(경증질환으로 종합병원급 이상을 다녀온 뒤 조제하면 3%,
                급여비용이 500원 미만이면 500원).
              </>,
              <>
                <strong>보건소·보건지소·보건진료소</strong> — 본인부담 없음.
              </>,
              <>
                <strong>입원</strong> — 14%에 기본식대 20%(6~15세 아동 3%, 치매·중증환자·고위험임신부 5%,
                희귀질환자·정신과 입원진료 10%). 자연분만 산모·6세 미만 아동은 기본식대 20%만 냅니다.
              </>,
            ]}
          />
          <Source>{docLink("86쪽")} · {CHECKED} 확인</Source>
          <DocNote>
            예를 들어 만성질환자가 요양급여비용 100만원짜리 입원을 하면 일반 가입자는 20만원, 경감 대상자는
            14만원입니다(비급여·식대·가산 제외, 저희가 계산한 값). 안내서도 입원 20% → 14%로 예를 들고 그
            6%p를 국고가 메운다고 적습니다(78쪽).
          </DocNote>
        </DocSection>

        <DocSection title="누가 대상인가 — 세 갈래와 두 가지 기준">
          <DocList
            items={[
              <>
                <strong>희귀질환·중증난치질환·중증질환자</strong> — 건강보험 <strong>산정특례에 등록</strong>된
                사람(암·중증화상·결핵·잠복결핵 포함). 산정특례 종료일이 3개월 이내면 이 갈래로는 신청할 수
                없고, 만성질환 요건에 맞으면 만성질환자로 신청할 수 있습니다(52쪽).
              </>,
              <>
                <strong>만성질환자</strong> — 위 질환 밖의 병으로 6개월 이상 치료를 받고 있거나 받아야 하는
                사람(4쪽).
              </>,
              <>
                <strong>18세 미만</strong> — 18세가 되는 날이 속한 해 12월 31일까지. 18세 이상 20세 미만
                중·고등학생은 이미 책정돼 있던 경우에 한해 20세가 되는 달(졸업하면 졸업하는 달)까지입니다.
                18세가 되는 해의 12월 31일을 넘겨 재학만으로 새로 신청할 수는 없습니다(4쪽).
              </>,
            ]}
          />
          <p>
            그리고 아래 <strong>두 기준을 모두</strong> 갖춰야 합니다(9쪽).
          </p>
          <DocList
            items={[
              <>
                <strong>소득인정액</strong> — 기준세대의 소득인정액이 기준 중위소득의 <strong>50% 이하</strong>.
                소득인정액은 소득평가액에 재산의 소득환산액을 더한 값입니다.
              </>,
              <>
                <strong>부양요건</strong> — 부양의무자(1촌 직계혈족과 그 배우자)가 없거나, 있어도 부양능력이
                없거나 부양을 받을 수 없을 것. 배우자는 기준세대에 들어가 소득인정액에 이미 반영되므로
                따로 판정하지 않습니다(9쪽).
              </>,
            ]}
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <caption className="pb-2 text-left text-xs text-muted">
                2026년 기준 중위소득의 50%(원/월) — 안내서 i쪽
              </caption>
              <thead>
                <tr className="border-y border-line bg-sunken text-right">
                  <th className="px-3 py-2 text-left font-semibold">가구 규모</th>
                  {LIMIT_50.map(([n]) => (
                    <th key={n} className="px-3 py-2 font-semibold">
                      {n}인
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line text-right tabular-nums">
                  <td className="px-3 py-2 text-left font-semibold">소득인정액 기준선</td>
                  {LIMIT_50.map(([n, v]) => (
                    <td key={n} className="px-3 py-2">
                      {v.toLocaleString("ko-KR")}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <Source>{docLink("i쪽")} · 기준 중위소득은 보건복지부 고시 제2025-135호 · {CHECKED} 확인</Source>
          <p>
            기준세대는 세대별 주민등록표에 적힌 사람(동거인 제외)에, 주민등록표에는 없어도 배우자와 30세 미만
            미혼자녀 중 <strong>취업하고 있지 않은 사람</strong>을 더합니다(9쪽). 재산은 기본재산액(서울·경기·광역시
            등 13,500만원, 기타 8,500만원)을 뺀 뒤 주거용 월 1.04%·일반 월 4.17%·금융 월 6.26%로 소득에
            환산하고, 자동차는 종류에 따라 일반 재산과 같이 보거나 월 100%로 봅니다(35쪽). 자세한 공제 항목은
            이 글에서 다루지 않습니다.
          </p>

          <p>
            부양의무자의 <strong>실제소득</strong>이 아래 금액 <strong>미만</strong>이면 부양능력이 없는 것으로
            봅니다(재산은 소득으로 환산하지 않고 소득만 봅니다, 36~37쪽). 한 부양의무자가 부양할 차상위
            대상자가 둘 이상이면 1명을 넘는 인원마다 기준 중위소득의 10%를 더합니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <caption className="pb-2 text-left text-xs text-muted">
                부양의무자의 부양능력 판정기준(원/월) — 안내서 i쪽
              </caption>
              <thead>
                <tr className="border-y border-line bg-sunken text-right">
                  <th className="px-3 py-2 text-left font-semibold">부양할 대상자 수</th>
                  <th className="px-3 py-2 font-semibold">의무자 1인 세대</th>
                  <th className="px-3 py-2 font-semibold">2인</th>
                  <th className="px-3 py-2 font-semibold">3인</th>
                  <th className="px-3 py-2 font-semibold">4인</th>
                </tr>
              </thead>
              <tbody>
                {OBLIGOR_ROWS.map((r) => (
                  <tr key={r.n} className="border-b border-line text-right tabular-nums">
                    <td className="px-3 py-2 text-left font-semibold">
                      {r.n} ({r.pct})
                    </td>
                    {r.v.map((x, i) => (
                      <td key={i} className="px-3 py-2">
                        {x.toLocaleString("ko-KR")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Source>{docLink("i·36~37쪽")} · {CHECKED} 확인</Source>
          <p>
            부양을 받을 수 없는 경우로 안내서가 적은 것은 징집·소집, 해외이주, 소득인정액 산정 기준세대에서 제외되는
            사람(37쪽)입니다. 군복무·수용·행방불명 등은 확인서나 조사자의 사실조사 복명서로 증빙합니다(38쪽).
          </p>
          <DocNote>
            대상에서 빠지는 사람도 있습니다. 의료급여 수급자, 국가유공자 등 의료보호를 받는 사람, 주민등록이
            말소됐거나 재외국민(영주권자 포함)·외국인은 지원하지 않습니다(4쪽). 위 표는 안내서의 숫자를 옮긴
            것이고, 받을 수 있는지는 시·군·구와 국민건강보험공단이 조사해 결정합니다.
          </DocNote>
        </DocSection>

        <DocSection title="진단서에 무엇을 써야 하나 — 2026년 4월부터 달라진 점">
          <DocList
            items={[
              <>
                <strong>만성질환자</strong>는 진단서 1부가 필요합니다. 지자체 접수일 기준 <strong>최근 3개월 안에
                발급</strong>한 것이어야 합니다(53쪽).
              </>,
              <>
                <strong>2026년 4월 1일 접수분부터</strong> 진단서에 ① 6개월 이상 ② 치료가 필요한 ③
                만성질환임을 적어야 합니다. 최종 진단과 임상적 추정에 의한 진단은 둘 다 인정하고, 6개월
                이상임을 추정할 수 있으면 인정하며, 성형·미용 목적 치료나 급성기 질환은 인정하지 않습니다(53쪽).
              </>,
              <>
                의료급여가 정한 <strong>11개 고시질환</strong>(갑상선의 장애, 당뇨병, 정신장애·행동장애, 신경계질환,
                고혈압, 심장질환, 뇌혈관질환, 만성간질환, 기타 만성폐쇄성폐질환, 두개내손상, 뇌전증)은 「만성질환임」
                문구가 없어도 되지만 ① 6개월 이상 ② 치료가 필요함은 적혀 있어야 합니다(53쪽).
              </>,
              <>
                <strong>소견서·확인서는 진단서를 대신하지 못합니다.</strong> 근로능력평가용 진단서는 기초생활
                수급을 신청했다가 생계·의료급여에서 탈락한 뒤 처음 차상위 만성질환으로 신청할 때만 인정됩니다(54쪽).
              </>,
              <>
                희귀·중증질환자는 산정특례 등록이 요건이라 진단서가 필요 없습니다. 다만 인체면역결핍바이러스병
                (B20~B24)은 산정특례 등록 대상이 아니라서 진단서를 냅니다(53쪽). 18세 미만도 진단서
                제출 대상이 아닙니다(54쪽).
              </>,
            ]}
          />
          <Source>{docLink("ii·vi·53~54쪽")} · {CHECKED} 확인</Source>
        </DocSection>

        <DocSection title="신청하고 언제부터 적용되나">
          <DocList
            items={[
              <>
                <strong>어디에</strong> — 거주지 관할 읍·면·동에 본인이나 대리인(가족·친족·이해관계인·사회복지
                담당 공무원)이 신청서와 구비서류를 냅니다. 필수 서류를 모두 낸 날이 신청일입니다(52·56쪽).
              </>,
              <>
                <strong>서류</strong> — 사회보장급여 신청서, 진단서(위), 세대별 주민등록표만으로 부양의무자와의
                관계를 알 수 없을 때의 가족관계등록부, 주택을 임대·임차하는 경우의 임대차계약서. 전산으로 확인되면
                생략됩니다(51·53~55쪽).
              </>,
              <>
                <strong>함께 신청</strong> — 금융재산 조회 권한이 있는 사업(차상위계층 확인, 기초생활보장 등)과
                더불어 신청하도록 하고, 조회된 자료를 반영해 선정합니다(55쪽).
              </>,
              <>
                <strong>조사·결정</strong> — 시·군·구가 소득·재산을 조사해 <strong>신청일부터 30일 안에</strong>
                공단에 통보하고(부양의무자 조사 등 특별한 사유가 있으면 30일 연장), 공단이 받은 날부터
                <strong> 7일 안에</strong> 결정해 신청인에게 알립니다(57·59쪽).
              </>,
              <>
                <strong>적용 시기</strong> — 경감인정 결정을 <strong>한 날부터</strong>입니다(국민건강보험법 시행규칙
                제17조, 59쪽). 신청한 날로 거슬러 올라가지 않습니다. 예외로 의료급여 수급자격을 잃은 날부터 90일
                안에 신청하면 소급 적용될 수 있습니다(61쪽).
              </>,
              <>
                <strong>지역가입자</strong>는 신청하면 세대 분리가 되고, 경감 대상자로 결정된 날로 소급
                처리됩니다. 지역가입자의 보험료는 전액 국고로 지원됩니다(6·52쪽).
              </>,
              <>
                건강보험증은 <strong>신청하는 경우에만</strong> 발급됩니다. 창구에서는 증의 생년월일 앞 구분자
                C(희귀·중증)·E(만성·18세 미만)와 자격조회시스템으로 대상자임을 확인합니다(83~84쪽).
              </>,
            ]}
          />
          <Source>{docLink("6·51~59·61·83~84쪽")} · {CHECKED} 확인</Source>
        </DocSection>

        <DocSection title="자격은 언제 끝나나 — 이 글에서 가장 놓치기 쉬운 부분">
          <p>
            복지로 원문에는 자격 기간이 없습니다. 안내서에는 갈래마다 해제일이 정해져 있습니다(58쪽).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">갈래</th>
                  <th className="px-3 py-2 font-semibold">차상위 해제일</th>
                  <th className="px-3 py-2 font-semibold">계속 받으려면</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2 font-semibold">희귀·중증난치·중증질환</td>
                  <td className="px-3 py-2">
                    산정특례 종료일이 속한 달의 <strong>다다음 달 1일</strong>
                    <br />
                    <span className="text-muted">(예: 종료일 2026.1.20. → 해제일 2026.3.1.)</span>
                  </td>
                  <td className="px-3 py-2">자격 종료일(해제일 전날) 전까지 건강보험 산정특례 재등록</td>
                </tr>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2 font-semibold">만성질환</td>
                  <td className="px-3 py-2">
                    결정일로부터 6개월이 속하는 달의 <strong>다음 달 1일</strong>
                  </td>
                  <td className="px-3 py-2">6개월이 되는 달의 말일까지 진단서를 공단에 제출</td>
                </tr>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2 font-semibold">18세 미만</td>
                  <td className="px-3 py-2">18세가 되는 해의 다음 해 1월 1일</td>
                  <td className="px-3 py-2">연 1회 자격 확인(재학생 예외는 위)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Source>{docLink("58·63~65쪽")} · {CHECKED} 확인</Source>
          <DocList
            items={[
              <>
                <strong>만성질환 진단서 제출 시기 예</strong> — 자격이 2026.4.1.~2026.9.30.이면 공단이 2026.8.10.까지
                확인조사 안내문을 보내고, 계속 받으려면 2026.9.30.까지 진단서를 냅니다. 말일이 공휴일이면 다음
                날까지입니다(64쪽).
              </>,
              <>
                <strong>진단서를 안 내도 이어지는 경우</strong> — 공단 시스템으로 진료내역이 확인되는 13개 상병코드
                (호흡기결핵, 악성 신생물, 갑상선, 당뇨병, 정신·행동장애, 신경계, 고혈압, 심장질환, 뇌혈관질환,
                만성폐쇄성폐질환, 만성간질환, 관절염, 두개내손상) 중 <strong>같은 상병으로 만기 전 6개월 동안 달을
                달리해 2회 이상 진료</strong>한 내역이 있으면 공단이 직권으로 만기를 연장할 수 있습니다(64쪽).
              </>,
              <>
                <strong>산정특례를 재등록하지 않은 희귀·중증질환자</strong> — 자격 종료 직전 6개월 안에 같은 상병으로
                달을 달리해 2회 이상 진료한 내역이 있으면 만성질환자로(18세 미만이면 18세 미만으로) 직권
                종별변경하고, 아니면 자격을 중지합니다(63쪽).
              </>,
              <>
                <strong>중지된 뒤</strong> — 희귀·중증 확인조사로 자격이 중지된 뒤 6개월 안에 만성질환 요건에 맞으면
                종별변경 신청서를 낸 날을 결정일로 만성질환자로 이어 갈 수 있고(65쪽), 장기입원·시설입소 같은 불가피한 사유가 있으면 6개월 안에 재등록하거나
                진단서를 내면 중지일로 소급해 인정합니다. <strong>6개월이 지나면</strong> 진단서 제출이나 재등록으로
                연장할 수 없고 읍·면·동에 <strong>처음부터 다시 신청</strong>해야 합니다(65쪽).
              </>,
              <>
                <strong>소득·재산 변동</strong>은 시·군·구가 확인조사를 합니다. 기준에 맞지 않게 되면 공단이 적용제외
                결정을 한 날부터 자격을 잃고, 그날까지 발생한 본인부담액은 기존 기준을 적용합니다(65·68쪽).
                부정수급이 적발되면 사유가 생긴 날로 소급해 자격을 없앨 수 있습니다(65쪽).
              </>,
            ]}
          />
          <Source>{docLink("63~65·68쪽")} · {CHECKED} 확인</Source>
        </DocSection>

        <DocSection title="종류가 바뀔 때와 불복할 때">
          <DocList
            items={[
              <>
                <strong>종별변경</strong> — 만성·18세 미만 ⇔ 희귀·중증, 18세 미만 ⇔ 만성으로 바꿀 수 있습니다.
                국민건강보험공단 관할 지사에 변경신청서(서식 4호)를 내면 접수일부터 적용되고, 건강보험 산정특례
                등록일부터 <strong>90일 안에</strong> 신청하면 그 등록일로 소급됩니다. 본인부담 차액이 생기면 공단이
                환급합니다(60~61쪽).
              </>,
              <>
                <strong>이의신청</strong> — 공단의 적용 여부 결정을 안 날부터 <strong>90일 안에</strong> 관할 공단 지사에
                냅니다(국민건강보험법 제87조). 그 결정에도 불복하면 건강보험 분쟁조정위원회에 심판청구를 할 수
                있습니다(제88조, 69쪽).
              </>,
              <>
                자격에서 빠지고 싶으면 적용제외 신청서(서식 5호)를 공단 지사에 내면 상실 처리됩니다(69쪽).
              </>,
            ]}
          />
          <Source>{docLink("60~61·69쪽")} · {CHECKED} 확인</Source>
        </DocSection>

        <DocSection title="소득이 기준을 넘어도 이어지는 두 가지 특례">
          <DocList
            items={[
              <>
                <strong>구직촉진수당</strong> — 대상자나 가구원이 받은 구직촉진수당 때문에 소득인정액이 기준 중위소득
                50%를 넘으면, 넘은 달의 <strong>다음 달 1일부터</strong> 수당을 받는 기간 동안 특례로 인정합니다.
                수당 말고 다른 소득만으로 50%를 넘으면 즉시 특례가 중지됩니다(73쪽).
              </>,
              <>
                <strong>특별재난지역</strong> — 2025년 1월 1일 이후 선포된 특별재난지역에서 그 재난 피해를 이유로 받은
                정부지원금·후원금품·민간보험금은 소득·재산으로 치지 않으며, 선포일부터 3년(종료일이 속한 달의
                말일까지) 적용합니다(74쪽).
              </>,
            ]}
          />
          <Source>{docLink("73~74쪽")} · {CHECKED} 확인</Source>
        </DocSection>

        <DocSection title="복지로 원문과 안내서가 다른 곳">
          <DocList
            items={[
              <>
                <strong>기준세대의 범위</strong> — 복지로 원문은 「배우자와 미혼자녀 중 30세 미만인 자는 기준세대에
                포함」이라고만 적습니다. 안내서는 주민등록표에 안 적힌 경우에 배우자와 30세 미만 미혼자녀
                <strong> 중 취업하고 있지 않은 사람</strong>이라고 조건을 둡니다(9쪽). 안내서가 더 구체적이라 위
                설명은 안내서를 따랐습니다.
              </>,
              <>
                <strong>자격 기간</strong> — 복지로 원문에는 6개월 확인조사·산정특례 재등록·해제일 규칙이 없고,
                안내서에만 있습니다(58·63~65쪽).
              </>,
            ]}
          />
          <Source>복지로 「차상위본인부담경감대상자지원」 원문과 {docLink("9·58쪽")} 대조 · {CHECKED} 확인</Source>
        </DocSection>

        <DocSection title="이 글에 없는 것">
          <DocList
            items={[
              <>소득평가액의 공제 항목, 자동차·부채 반영 기준 같은 세부 산정 방법(안내서 12~34쪽).</>,
              <>
                내가 대상인지 — 소득·재산·질환 여부는 읍·면·동 접수와 시·군·구 조사, 공단 결정으로 정해집니다.
              </>,
              <>
                장애인 의료비 지원(만성·18세 미만 등록장애인의 본인부담 추가 지원, 79쪽)의 금액별 세부 규칙.
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="신청과 문의">
          <p>
            읍·면·동 주민센터에서 신청하고, 자격·본인부담 문의는 국민건강보험공단 1577-1000입니다. 의료급여나
            큰 병원비 지원과 견줄 때는 아래 글도 같이 보세요.
          </p>
          <ul className="space-y-1 text-sm">
            {SVC && (
              <li>
                <Link href={`/service/${SVC.id}`} className="text-brand underline">
                  {SVC.name} — 복지로 원문 →
                </Link>
              </li>
            )}
            <li>
              <Link href="/guide/medical-aid" className="text-brand underline">
                의료급여 1종·2종, 병원에서 얼마 내나 →
              </Link>
            </li>
            <li>
              <Link href="/guide/catastrophic-medical" className="text-brand underline">
                재난적의료비 지원 — 건강보험료 구간별 기준표 →
              </Link>
            </li>
            <li>
              <Link href="/guide/cancer-screening" className="text-brand underline">
                국가암검진 — 본인부담 10%와 지원 대상 →
              </Link>
            </li>
          </ul>
          <DocNote>
            이 글은 복지로 원문과 보건복지부 사업 안내를 옮긴 것이며, 받을 수 있는지 판정하지 않습니다. 기준 중위소득과
            본인부담 비율은 해마다 바뀌니 신청 직전에 그해 기준을 다시 확인해 주세요.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="low-income-copay" />
    </>
  );
}
