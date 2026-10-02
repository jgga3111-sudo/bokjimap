import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { won } from "@/lib/display";

const G = guideBySlug("emergency-care")!;
const CHECKED = "2026-09-28";
const PDF =
  "https://bokjiro.go.kr/ssis-tbu/CmmFileUtil/getDownload.do?atcflId=20260311UUWBM1459540179927642&atcflSn=1";

export const metadata: Metadata = {
  title: "긴급돌봄 지원사업 2026 — 72시간·30일, 지역별 본인부담률과 바우처 90일",
  description:
    "갑자기 아프거나 다치거나 돌봐 주던 사람이 입원·사망해 당장 돌봄이 필요할 때 받는 긴급돌봄. 소득 제한 없이 최대 72시간, 시간당 19,000원이고 본인부담률은 시·도마다 다릅니다. 2026 사업안내에서 옮겼습니다.",
  alternates: { canonical: "/guide/emergency-care" },
};

/*
  왜 이 글인가 (2026-09-28, 사용자 요청 — 이날 두 번째 글).

  조회수 44위 「긴급돌봄 지원사업」(24만) 원문은 요건·시간·단가 규칙까지 적는다. 없는 것은 ① 시·도마다 다른
  본인부담률(원문은 「소득에 따라 본인부담 차등화」까지만) ② 바우처를 90일 안에 다 써야 한다는 것
  ③ 이의신청 기한 ④ 어느 시·도가 하는지다. 전날 쓴 일상돌봄 글과 짝이다(그 글 「이 글에 없는 것」에서 이어짐).

  1차 출처는 원문 첨부 「2026년 긴급돌봄 지원사업 안내」(보건복지부, 267쪽 — 인쇄 쪽 = 파일 쪽).
  교차 확인: 바우처 총액 A형 1,368,000원 = 72시간 × 19,000원, C형 1,720,000원 = 1,368,000 + 방문목욕 4회 × 88,000원
  (212쪽 표 대 14쪽 단가). 지역별 본인부담률은 211쪽 「참고 3」 그대로다.

  211쪽 표에 서울·경기가 없다. "서울·경기는 안 한다"고 단정하지 않고, 표에 없다는 사실만 적는다.
*/

/* 사업안내 211쪽 「참고 3」 — 시·도별 소득 구간과 본인부담률 (원문 그대로) */
type RegionRate = readonly [string, readonly string[]];
const REGION_RATES: readonly RegionRate[] = [
  ["부산 · 세종", ["120% 이하(수급자·차상위 포함) 면제", "120% 초과~160% 이하 10%", "160% 초과 100%"]],
  ["대구 · 강원 · 전북 · 전남", ["120% 이하(수급자·차상위 포함) 면제", "120% 초과~140% 이하 10%", "140% 초과~160% 이하 20%", "160% 초과 100%"]],
  ["인천 · 충북", ["수급자·차상위 면제", "120% 이하 10%", "120% 초과~160% 이하 25%", "160% 초과 100%"]],
  ["광주", ["120% 이하(수급자·차상위 포함) 면제", "120% 초과~140% 이하 30%", "140% 초과~160% 이하 60%", "160% 초과 100%"]],
  ["대전", ["120% 이하(수급자·차상위 포함) 면제", "120% 초과~160% 이하 50%", "160% 초과 100%"]],
  ["울산", ["수급자·차상위 또는 50% 이하 면제", "50% 초과~100% 이하 5%", "100% 초과~120% 이하 10%", "120% 초과~160% 이하 20%", "160% 초과 100%"]],
  ["충남 · 경북(13개 시·군) · 경남", ["120% 이하(수급자·차상위 포함) 면제", "120% 초과~160% 이하 20%", "160% 초과 100%"]],
  ["제주", ["120% 이하(수급자·차상위 포함) 면제", "120% 초과~150% 이하 — 표에 「면제」와 「10%」가 나란히 적혀 있고 어느 경우에 어느 쪽인지는 적혀 있지 않습니다", "150% 초과~160% 이하 20%", "160% 초과 100%"]],
];

/* 사업안내 212쪽 「참고 4」 — A형(기본돌봄 72시간, 1,368,000원) 본인부담금 */
const A_TYPE: readonly (readonly [string, number])[] = [
  ["5%", 68_400],
  ["10%", 136_800],
  ["20%", 273_600],
  ["25%", 342_000],
  ["30%", 410_400],
  ["50%", 684_000],
  ["60%", 820_800],
  ["100%", 1_368_000],
];

const cell = "px-3 py-2";
const th = "px-3 py-2 font-semibold";
const head = "border-y border-line bg-sunken text-left";
const row = "border-b border-line align-top";

export default function EmergencyCareGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="긴급돌봄 지원사업은 갑자기 아프거나 다치거나, 돌봐 주던 가족이 입원·사망해 당장 돌봄이 끊겼을 때 요양보호사 등이 집으로 와서 짧게 집중해서 돌봐 주는 이용권(바우처)입니다. 복지로 원문에 요건과 시간은 있지만, 내가 사는 시·도에서 얼마를 내는지와 언제까지 써야 하는지는 없어서 2026년 사업안내에서 옮겼습니다."
        updated={`최종 수정 ${G.updated} · 2026년 긴급돌봄 지원사업 안내(보건복지부)에서 ${CHECKED} 확인`}
      >
        <DocSection title="한 장으로 보면">
          <DocList
            items={[
              <>
                <strong>소득 제한이 없습니다.</strong> 수급자·차상위는 본인부담 면제, 기준 중위소득 160% 초과는 전액 본인
                부담이고, 그 사이는 <strong>시·도마다 비율이 다릅니다</strong>(사업안내 13·211쪽).
              </>,
              <>
                최대 <strong>72시간</strong>, 하루 8시간까지, 가급적 <strong>30일 안에</strong> 씁니다. 한 번 방문은 최소
                2시간이 원칙입니다(13쪽).
              </>,
              <>
                값은 <strong>시간당 19,000원</strong>, 방문목욕(일부 시·도)은 <strong>회당 88,000원</strong>입니다(14쪽). 72시간을
                다 쓰면 1,368,000원입니다.
              </>,
              <>
                이용권은 생긴 날부터 <strong>90일 안에</strong> 다 써야 합니다. 추가 지원을 받아도 첫 생성일부터 90일입니다
                (13쪽).
              </>,
              <>
                신청은 주소지 <strong>읍·면·동 행정복지센터</strong> 또는 <strong>복지로</strong>. 집에 와서 필요도를 평가하고
                결과를 그 자리에서 알려 줍니다(33·40쪽).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="누가 받을 수 있나">
          <p>아래 세 가지를 모두 갖춰야 합니다(복지로 원문·사업안내 13쪽).</p>
          <DocList
            items={[
              <>
                <strong>긴급성</strong> — 예기치 못한 질병·수술·사고, 돌봐 주던 사람의 사망·입원·감염·장기 부재, 재난 피해처럼
                갑자기 생긴 위기이고, 짧게 도우면 해결되는 경우.
              </>,
              <>
                <strong>돌봄 필요성</strong> — 혼자 일상생활을 할 수 없고 돌봐 줄 가족 등이 없는 경우.
              </>,
              <>
                <strong>보충성</strong> — 장기요양·일상돌봄 같은 다른 공적 돌봄을 지금 받고 있지 않은 경우. 다른 서비스를{" "}
                <strong>신청하고 대기 중이면 받을 수 있습니다</strong> — 장기요양·장애인활동지원 결과를 기다리는 동안이 대표적인
                예입니다.
              </>,
            ]}
          />
          <DocList
            items={[
              <>나이는 13세 이상이 주 대상이고, 긴급돌봄위원회가 인정하면 나이와 관계없이 받습니다(13쪽).</>,
              <>
                <strong>빠지는 경우</strong> — 일반적인 아이 양육, 즉시 개입이 필요한 사고·질병, 자살 시도, 학대 사례, 거주지 불명
                등으로 집에서 돌봄이 아예 안 되는 경우(13쪽).
              </>,
              <>
                선정은 집에 찾아와 하는 요구도 평가로 정합니다. 원문 기준으로 14점 이상 「상」이면 선정, 6점 이상 14점 미만 「중」은 위원회
                심의, 6점 미만 「하」는 지원 불필요입니다.
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="내가 사는 곳에서 내는 돈">
          <p>
            소득 구간은 <strong>건강보험료</strong>로 판단하고, 비율은 시·도가 미리 정해 복지부에 낸 값입니다(50쪽). 아래는
            사업안내 211쪽 「지역별 건강보험료 납부액 기준 소득분위 판단표(2026년)」를 그대로 옮긴 것입니다(퍼센트는 기준 중위소득).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className={head}>
                  <th className={th}>시·도</th>
                  <th className={th}>소득 구간과 본인부담률</th>
                </tr>
              </thead>
              <tbody>
                {REGION_RATES.map(([r, rates]) => (
                  <tr key={r} className={row}>
                    <td className={`${cell} font-semibold`}>{r}</td>
                    <td className={cell}>
                      <ul className="space-y-0.5">
                        {rates.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600">
            경북은 포항·경주·안동·구미·영주·영천·상주·경산·의성·영덕·고령·성주·울진 13개 시·군만 표에 있습니다. 이 표에{" "}
            <strong>서울·경기는 없습니다</strong> — 사는 곳에서 하는지는 읍·면·동이나 시·군·구에 먼저 물어보세요(복지로 원문도
            「지역별 사업 추진여부가 상이」하다고 적습니다).
          </p>
          <p className="mt-4">72시간 기본돌봄(A형, 1,368,000원)을 다 쓸 때 내는 돈(212쪽 표 그대로):</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] border-collapse text-sm">
              <thead>
                <tr className={head}>
                  <th className={th}>본인부담률</th>
                  <th className={th}>본인부담금</th>
                  <th className={th}>정부지원금</th>
                </tr>
              </thead>
              <tbody>
                <tr className={row}>
                  <td className={cell}>면제</td>
                  <td className={`${cell} tabular-nums`}>0원</td>
                  <td className={`${cell} tabular-nums`}>{won(1_368_000)}</td>
                </tr>
                {A_TYPE.map(([rate, pay]) => (
                  <tr key={rate} className={row}>
                    <td className={cell}>{rate}</td>
                    <td className={`${cell} tabular-nums`}>{won(pay)}</td>
                    <td className={`${cell} tabular-nums`}>{won(1_368_000 - pay)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DocList
            items={[
              <>
                방문목욕까지 쓰면(C형) 총액이 <strong>1,720,000원</strong>(72시간 + 목욕 4회)이고 같은 비율을 곱합니다(212쪽).
              </>,
              <>
                본인부담금은 <strong>서비스 시작 전에 제공기관에 한꺼번에</strong> 냅니다. 급한 경우만 이용이 끝나기 전까지 낼 수
                있습니다. 미리 협의해 쓰지 않은 시간은 돌려받지만, <strong>당일 일방적 취소</strong>는 돌려받지 못합니다(47·51쪽).
              </>,
              <>
                평일 밤 10시~아침 6시와 일요일·유급휴일에는 지자체 기준에 따라 30분당 1,500원을 넘는 가산금을 본인이 낼 수
                있습니다(50쪽).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="72시간으로 모자라면">
          <DocList
            items={[
              <>
                시·군·구의 <strong>긴급돌봄위원회</strong>가 인정하면 <strong>한 번에 한해</strong> 기본돌봄 72시간·방문목욕 4회를
                더 받습니다(합쳐 144시간). 본인부담률은 처음과 같고, 처음 받은 이용권을 다 쓴 뒤에 씁니다(13·51쪽).
              </>,
              <>
                위원회 대상이 아니어도 <strong>전액 본인부담</strong>으로 더 쓸 수 있습니다(제공기관과 따로 계약, 51쪽).
              </>,
              <>
                추가를 받아도 쓸 수 있는 기한은 <strong>첫 이용권 생성일부터 90일</strong> 그대로입니다(13쪽). 오래 돌봄이
                필요하면 장기요양·
                <Link href="/guide/daily-care" className="text-brand underline">
                  일상돌봄
                </Link>
                ·장애인활동지원 같은 긴 서비스로 넘어가야 합니다.
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="신청할 때">
          <DocList
            items={[
              <>
                <strong>어디서</strong> — 주민등록상 주소지 읍·면·동 행정복지센터, 또는 복지로 온라인. 부득이하면 전화·우편·팩스도
                됩니다(33쪽).
              </>,
              <>
                <strong>누가</strong> — 본인이 원칙이고, 어려우면 친족(배우자, 8촌 이내 혈족, 4촌 이내 인척)·법정대리인·이웃(이·통장)
                등이 위임장을 들고 대신 냅니다. <strong>복지로 대리 신청은 친족만</strong> 됩니다(33쪽).
              </>,
              <>
                <strong>가져갈 것</strong> — 사회보장급여(사회서비스이용권) 신청서, 이용자 준수사항 동의서, 국민행복카드 발급
                신청서, 신분증, 진단서 등 요건 확인 서류(33쪽).
              </>,
              <>
                병원·복지관·희망복지지원단 등 협약 기관이 이미 긴급하다고 확인해 <strong>추천서</strong>를 낸 경우에는 현장 방문과
                서류 없이 바로 선정될 수 있습니다(38쪽).
              </>,
              <>
                <strong>이의신청</strong> — 결과를 통지받은 날부터 <strong>20일 안에</strong> 이의신청서를 읍·면·동에 냅니다.
                시·군·구는 15일 안에 결정합니다(58쪽). 일상돌봄(60일)·노인맞춤돌봄(90일)보다 훨씬 짧습니다.
              </>,
            ]}
          />
        </DocSection>

        <DocNote tone="amber" title="이 글에 없는 것">
          시·도별 소득 구간의 건강보험료 금액표는 싣지 않았습니다(시·도마다 구간이 달라 표가 여럿입니다 — 주민센터가 건강보험료로
          판정합니다). 방문목욕을 어느 시·도가 하는지는 사업안내에 「일부 시·도」라고만 적혀 있습니다. 이 글은 받을 수 있는지
          판정하지 않습니다.
        </DocNote>

        <DocSection title="출처">
          <DocList
            items={[
              <>
                보건복지부 「
                <a href={PDF} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                  2026년 긴급돌봄 지원사업 안내
                </a>
                」 — 13·14·33·38·40·47~51·58·211·212쪽 (복지로 원문 첨부)
              </>,
              <>사회서비스 이용 및 이용권 관리에 관한 법률 제12조(이의신청)</>,
            ]}
          />
          <p className="text-sm">
            문의: 주소지 읍·면·동 행정복지센터 · 보건복지상담센터 <strong>129</strong>
          </p>
          <p>
            <Link href="/service/WLF00005442" className="text-brand underline">
              긴급돌봄 지원사업 상세 보기 — 복지로 원문 →
            </Link>
          </p>
          <DocNote>
            이 글은 사업안내의 표와 규칙을 옮긴 것이며, 대상인지 판정하지 않습니다. 시·도는 해가 바뀔 때 본인부담 비율을 바꿀 수
            있습니다(50쪽).
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="emergency-care" />
    </>
  );
}
