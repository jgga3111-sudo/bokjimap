import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";

const G = guideBySlug("hope-savings")!;
const S = services.find((s) => s.id === "WLF00000100");
/** 원문에 첨부된 보건복지부 사업안내 PDF. 원문의 첨부 목록에서 이름으로 찾는다. */
const GUIDE_PDF = S?.forms.find((f) => f.name.includes("자산형성지원"))?.url ?? null;
const DOC = "2026년 자활사업안내(Ⅱ) 자산형성지원 통장사업 안내";
const CHECKED = "2026-09-22";

export const metadata: Metadata = {
  title: "희망저축계좌 Ⅰ·Ⅱ, 2026년 남은 모집 일정과 정부지원금을 잃는 경우",
  description:
    "희망저축계좌Ⅱ는 2026년 10월 1일~26일, Ⅰ은 11월 2일~16일에 새로 모집합니다. 매달 10만원을 넣으면 정부가 Ⅰ은 30만원, Ⅱ는 1~3년차 10·20·30만원을 더해 주지만, 3년 뒤 탈수급 못 하거나 교육·계획서를 빠뜨리면 정부지원금은 돌려받지 못합니다. 보건복지부 2026년 사업안내로 확인했습니다.",
  alternates: { canonical: "/guide/hope-savings" },
};

/*
  왜 이 글인가 (2026-09-22 아침 루틴).

  조회수 24위(약 82만)인데 「따로 확인한 것」이 0이던 사업이다. 데이터랩 6~8월 월평균은
  실업급여의 0.13배. 복지로 원문에 매칭 금액은 이미 있고, 없는 것은 **언제 모집하는지**와
  **정부지원금을 잃는 조건**이다. 둘 다 원문 첨부 PDF(보건복지부, 196쪽)에 있다.
  인쇄 쪽 = PDF 파일 쪽 − 22. 모집 일정은 인쇄 140~141쪽, Ⅰ은 35~46쪽, Ⅱ는 48~58쪽.
  청년내일저축계좌 글(`/guide/youth-tomorrow-savings`)과 같은 안내서다.
*/

function Src({ pages }: { pages: string }) {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      {GUIDE_PDF ? (
        <a href={GUIDE_PDF} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
          보건복지부 「{DOC}」
        </a>
      ) : (
        <>보건복지부 「{DOC}」</>
      )}{" "}
      {pages} · {CHECKED} 확인
    </p>
  );
}

const th = "px-3 py-2 font-semibold";
const td = "px-3 py-2";

export default function HopeSavingsGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="일하는 저소득 가구가 매달 10만원을 넣으면 정부가 돈을 더 얹어 3년 뒤 목돈으로 주는 통장입니다. 아무 때나 가입하는 통장이 아니라 정해진 달에만 모집하고, 3년을 다 채워도 조건 하나를 못 맞추면 정부가 얹은 돈은 받지 못합니다."
        updated={`최종 수정 ${G.updated} · 보건복지부 2026년 사업안내에서 ${CHECKED} 확인`}
      >
        <DocNote title="2026년에 남은 모집은 Ⅱ 10월, Ⅰ 11월입니다">
          <strong>희망저축계좌Ⅱ 10월 1일(목) ~ 10월 26일(월)</strong>,{" "}
          <strong>희망저축계좌Ⅰ 11월 2일(월) ~ 11월 16일(월)</strong>. 이 기간을 넘기면 그해에는 더 모집하지
          않습니다. 사업안내는 「신규 모집 일정은 제반 여건에 따라 변동될 수 있음」이라고 함께 적고 있으니, 주소지
          읍·면·동 행정복지센터에 한 번 더 확인하세요.
        </DocNote>

        <DocSection title="Ⅰ과 Ⅱ는 누가 가입하느냐로 갈립니다">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className={th}>구분</th>
                  <th className={th}>희망저축계좌Ⅰ</th>
                  <th className={th}>희망저축계좌Ⅱ</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["가입 대상", "일하는 생계·의료급여 수급 가구", "일하는 주거·교육급여 수급 가구와 기타 차상위 가구"],
                  ["소득 기준", "소득인정액 기준 중위소득 40% 이하", "소득인정액 기준 중위소득 50% 이하"],
                  ["일한 소득", "가구 근로·사업소득이 기준 중위소득 40%의 60% 이상", "근로·사업소득이 있을 것(소액이라도)"],
                  ["본인 저축", "월 10만원 이상(최대 50만원)", "월 10만원 이상(최대 50만원)"],
                  ["정부지원금(매달)", "30만원", "1년차 10만원 · 2년차 20만원 · 3년차 30만원(’25년 가입자부터)"],
                  ["3년 적립액(10만원 저축 시)", "1,440만원 + 이자", "1,080만원 + 이자"],
                  ["받는 조건", "3년 안에(만기 뒤 6개월까지) 생계·의료급여에서 벗어나기", "자립역량교육 10시간 이수 + 자금사용계획서 제출"],
                ].map(([k, a, b]) => (
                  <tr key={k} className="border-b border-line align-top">
                    <td className={`${td} font-medium text-ink`}>{k}</td>
                    <td className={td}>{a}</td>
                    <td className={td}>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Src pages="인쇄 3·35·39·48~49·52쪽" />
          <p>
            3년 적립액은 사업안내의 표에 적힌 값이고 본인 저축 360만원이 들어 있습니다. 복지로 원문에도 매칭 금액은
            나오지만, <strong>무엇을 해야 그 돈을 받는지</strong>는 원문에 한 줄뿐이라 아래에 풀어 적습니다.
          </p>
          <DocList
            items={[
              <>
                <strong>가구당 한 명만</strong> 가입합니다. 다만 같은 가구의 청년은 청년내일저축계좌에 따로 가입할 수
                있습니다(인쇄 6쪽).
              </>,
              <>
                통장마다 <strong>한 번만</strong> 받을 수 있어서, 정부지원금을 일부라도 받았다면 같은 통장에는 다시
                가입하지 못합니다(인쇄 3쪽).
              </>,
              <>
                나라나 지자체가 인건비 전액을 주는 일자리(공공근로, 노인·장애인 일자리 등)로 버는 소득만 있으면 가입
                대상에서 빠집니다. 자활근로 소득은 인정됩니다(인쇄 11쪽).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="2026년 모집 일정">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className={th}>통장</th>
                  <th className={th}>차수</th>
                  <th className={th}>신규 모집</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Ⅰ", "1차", "3.3(화) ~ 3.13(금)", true],
                  ["Ⅰ", "2차", "6.1(월) ~ 6.15(월)", true],
                  ["Ⅰ", "3차", "9.1(화) ~ 9.14(월)", true],
                  ["Ⅰ", "4차", "11.2(월) ~ 11.16(월)", false],
                  ["Ⅱ", "1차", "2.2(월) ~ 2.24(화)", true],
                  ["Ⅱ", "2차", "7.1(수) ~ 7.27(월)", true],
                  ["Ⅱ", "3차", "10.1(목) ~ 10.26(월)", false],
                ].map(([a, b, c, past]) => (
                  <tr key={`${a}${b}`} className={`border-b border-line ${past ? "text-muted" : ""}`}>
                    <td className={`${td} font-medium`}>{a}</td>
                    <td className={td}>{b}</td>
                    <td className={`${td} tabular-nums`}>
                      {c}
                      {past ? " · 지남" : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Src pages="인쇄 140~141쪽" />
          <DocList
            items={[
              <>
                결과가 나오는 데 걸리는 시간이 다릅니다. Ⅰ은 <strong>20일 이내</strong>, Ⅱ는 소득·재산 조사를 거쳐{" "}
                <strong>70일 이내</strong>에 알려 줍니다(인쇄 37·50쪽). 10월에 신청한 Ⅱ는 사업안내 일정상 12월에 통장을
                엽니다.
              </>,
              <>
                Ⅱ는 신청한다고 모두 뽑히지 않습니다. 가구 특성, 저축을 이어 갈 수 있는지, 자립 가능성 등을 심사해
                고릅니다(인쇄 50쪽).
              </>,
              <>
                신청은 주소지 읍·면·동 행정복지센터에서 합니다. 복지로 원문은 복지로 온라인 신청도 절차에 적고
                있습니다.
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="매달 22일이 마감입니다">
          <p>
            한 달 치 저축은 <strong>전월 23일부터 당월 22일까지</strong> 넣은 돈으로 셉니다(휴일이면 다음 영업일). 22일이
            지나 넣으면 다음 달 저축으로 처리되고, <strong>그달 정부지원금은 쌓이지 않습니다</strong>(인쇄 39·52쪽).
            그래서 사업안내는 매달 1일~20일 자동이체를 원칙으로 적습니다.
          </p>
          <DocList
            items={[
              <>만기 전에 본인 적금을 <strong>한 번</strong> 꺼내 쓸 수 있습니다(최소 10만원은 남겨야 함).</>,
              <>
                실직·질병·사고 같은 사정이 있으면 미리 신청해 3년 중 <strong>최대 12개월</strong> 저축을 쉴 수
                있습니다. 쉬는 동안은 정부지원금도 없고, 신청은 쉬려는 날보다 최소 7일 전에 해야 합니다. 12개월은
                2026년 1월 31일 이후 신청분부터입니다(인쇄 15쪽).
              </>,
              <>
                적립중지를 신청하지 않고 <strong>12개월을 못 넣으면</strong> 정부지원금을 돌려받지 못하는 환수 사유가
                됩니다(아래).
              </>,
            ]}
          />
          <Src pages="인쇄 15·39·52쪽" />
        </DocSection>

        <DocSection title="정부지원금을 잃는 경우">
          <p>
            환수가 되면 <strong>내가 넣은 돈과 이자만</strong> 돌려받고, 정부가 얹은 근로소득장려금과 추가지원금은
            받지 못합니다.
          </p>
          <h3 className="mt-2 font-semibold text-ink">희망저축계좌Ⅰ</h3>
          <DocList
            items={[
              <>3년 만기 뒤 6개월 안에 생계·의료급여에서 벗어나지 못함 — 다만 아래 「만기성공금」이 있습니다.</>,
              <>가구 근로·사업소득이 <strong>6개월 연속</strong> 월 10만원에 못 미침.</>,
              <>본인 저축을 모두 합쳐 <strong>12개월</strong> 안 넣음.</>,
              <>압류·가압류, 본인이 해지를 요청함, 본인 사망 뒤 가구원이 환수를 요청함.</>,
              <>
                받으려고 일부러 수급을 포기하는 것은 벗어난 것으로 인정되지 않습니다(인쇄 43쪽).
              </>,
            ]}
          />
          <DocNote tone="brand" title="Ⅰ은 3년을 채우면 조금은 받습니다">
            만기까지 유지했지만 6개월 안에 수급에서 벗어나지 못했다면, 한 번에 한해 본인 적립금과 이자에 더해{" "}
            <strong>쌓인 근로소득장려금의 5%</strong>를 「만기성공금」으로 줍니다(인쇄 44쪽). 매달 30만원이 3년 쌓였다면
            1,080만원의 5%인 54만원입니다 — 이 곱셈은 저희가 계산한 값입니다.
          </DocNote>
          <h3 className="mt-2 font-semibold text-ink">희망저축계좌Ⅱ</h3>
          <DocList
            items={[
              <>
                확인조사에서 <strong>가구원 누구도 일하고 있지 않음</strong>. 통보받은 날부터 1개월 안에 그 기간의 절반
                이상 일했다고 소명하면 구제될 수 있습니다.
              </>,
              <>
                <strong>자립역량교육 10시간</strong>을 채우지 못함 · <strong>자금사용계획서</strong>를 내지 않음 — 3년을 다
                채워도 환수입니다.
              </>,
              <>적립중지 신청 없이 본인 저축을 모두 합쳐 12개월 안 넣음.</>,
              <>압류·가압류, 만기 전 본인이 해지를 요청함, 본인 사망 뒤 가구원이 환수를 요청함.</>,
            ]}
          />
          <Src pages="인쇄 43~45·55~57쪽" />
          <p>
            반대로 소득이 늘어서 나가는 경우는 잃지 않습니다. 근로·사업소득이 기준 중위소득 100%(1~3인 가구는 3인 가구
            기준, 월 5,359,036원)를 넘으면 <strong>그 전달까지 쌓인 돈을 모두 받고</strong> 끝납니다(중도지급, 인쇄
            36·44·55쪽). Ⅰ은 생계·의료급여에서 벗어난 뒤 최근 3개월 평균이 넘을 때이고, 벗어나지 않았다면 통장을 계속
            유지할 수 있습니다. Ⅱ는 이때도 교육 이수와 계획서가 필요합니다.
          </p>
        </DocSection>

        <DocSection title="받은 돈은 어디에 쓰나">
          <p>
            Ⅱ의 자금사용계획서에는 주택 구입·임대, 본인·자녀의 고등교육·기술훈련, 창업·운영자금, 그 밖의 자활·자립
            용도를 적습니다(국민기초생활 보장법 시행령 제21조의2, 인쇄 56쪽). 적립하는 3년 동안 통장에 든 돈은 기초생활
            수급 심사에서 재산으로 치지 않지만, 사업 기간이 끝나면 재산에 들어갑니다(인쇄 36·49쪽).
          </p>
          <Src pages="인쇄 36·49·56쪽" />
        </DocSection>

        <DocSection title="확인과 문의">
          <p>
            가입·적립 내역은 자산형성포털(hope.welfareinfo.or.kr)에서 봅니다. 문의는 자산형성지원 콜센터{" "}
            <strong>1522-3690</strong>, 보건복지상담센터 <strong>129</strong>입니다(복지로 원문).
          </p>
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문 →
              </Link>
            </p>
          )}
          <p>
            같은 사업안내에 있는 청년 통장은{" "}
            <Link href="/guide/youth-tomorrow-savings" className="text-brand underline">
              청년내일저축계좌 글
            </Link>
            에 따로 정리했습니다.
          </p>
          <DocNote>
            이 글은 보건복지부 사업안내에 적힌 것을 옮긴 것이며, 누가 가입할 수 있는지 판정하지 않습니다. 모집 일정은
            바뀔 수 있으니 신청 전에 행정복지센터에 확인하세요.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="hope-savings" />
    </>
  );
}
