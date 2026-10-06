import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { won } from "@/lib/display";

const G = guideBySlug("daily-care")!;
const CHECKED = "2026-09-27";
const PDF =
  "https://bokjiro.go.kr/ssis-tbu/CmmFileUtil/getDownload.do?atcflId=20260403UUWBM0857110183565334&atcflSn=1";

export const metadata: Metadata = {
  title: "일상돌봄 서비스 2026 — 13~64세 대상, A·B·C·D형 월 금액과 소득별 본인부담",
  description:
    "질병·부상·고립으로 돌봄이 필요한 13~64세와 가족돌봄청년이 받는 일상돌봄 서비스. 소득 제한은 없고 본인부담이 0·10·25·100%로 갈립니다. A형 월 684,000원 등 유형별 금액과 이용 규칙을 2026 사업안내에서 옮겼습니다.",
  alternates: { canonical: "/guide/daily-care" },
};

/*
  왜 이 글인가 (2026-09-27, 사용자 요청 — 이날 두 번째 글).

  조회수 37위 「일상돌봄 서비스 사업」(29만) 원문은 대상 조건과 유형별 월 금액까지는 적는다.
  없는 것은 ① 소득별 본인부담 비율과 그 판정표(건강보험료) ② A~D형을 고르는 법과 특화서비스 개수
  ③ 1년·3년·65세·2개월 미사용 같은 이용 기간 규칙 ④ 아직 시행하지 않는 시·군·구다.

  1차 출처는 원문 첨부 「2026년 일상돌봄 서비스 사업안내」(보건복지부, 318쪽 PDF — 인쇄 쪽 = 파일 쪽 − 8).
  교차 확인 둘:
  · 시간당 수가 × 시간 = 월 금액 — A형 19,000원 × 36 = 684,000, C형 × 72 = 1,368,000,
    B형 18,500원 × 24 = 444,000(60쪽 대 11·80쪽). 복지로 원문 금액과도 같다.
  · 건강보험료 판정표(248쪽)의 월 소득 칸이 2026 기준 중위소득 × 120%·160%를 천 원 단위로 올린 값과
    같다(1인 2,564,238 × 1.2 = 3,077,086 → 3,078,000).

  복지로 원문은 가족돌봄청년을 「9~39세」로 적고 안내서는 「39세 이하」와 「9세 미만은 원칙적으로 아동보호
  체계로 연계, 지자체 판단으로 지원 가능」(27쪽)이라 적는다. 서로 어긋나지 않아 안내서 문장을 그대로 옮긴다.
*/

type Plan = readonly [string, string, string, number, string];

/* 사업안내 11·18·19쪽 */
const PLANS: readonly Plan[] = [
  ["A형", "돌봄 + 가사", "월 36시간 (3시간 × 주 3회)", 684_000, "1개"],
  ["B형", "가사만", "월 24시간 (3시간 × 주 2회)", 444_000, "2개"],
  ["C형", "돌봄 + 가사 (추가돌봄)", "월 72시간 (3시간 × 주 6회)", 1_368_000, "이용 불가"],
  ["D형", "특화서비스만", "—", 0, "2개"],
];

/* 사업안내 80쪽 「(요약) 일상돌봄 서비스의 가격 및 본인부담 금액」 — 기본서비스 본인부담금 */
type Pay = readonly [string, number, number, number, number];
const PAYS: readonly Pay[] = [
  ["A형 (36시간)", 0, 68_400, 171_000, 684_000],
  ["B형 (24시간)", 0, 44_400, 111_000, 444_000],
  ["C형 (72시간)", 0, 136_800, 342_000, 1_368_000],
];

/* 사업안내 20쪽 특화서비스 표준모델 — 월 단가와 횟수. 지역마다 고르는 서비스가 다르다. */
type Extra = readonly [string, string, string, string];
const EXTRAS: readonly Extra[] = [
  ["식사관리", "청·중장년, 가족돌봄청년", "228,000원", "월 8회"],
  ["영양관리", "청·중장년, 가족돌봄청년", "260,000원", "월 8회 + 수시"],
  ["병원 동행", "청·중장년, 가족돌봄청년", "272,000원 (시간당 17,000원)", "최대 16시간"],
  ["심리 지원", "청·중장년, 가족돌봄청년", "240,000원", "월 4회"],
  ["휴식 지원 (돌봄 대상 가족 단기 시설보호)", "청·중장년, 가족돌봄청년", "하루 7만원", "최대 3일"],
  ["소셜 다이닝", "청·중장년, 가족돌봄청년", "200,000원", "월 4회"],
  ["교류증진 지원", "중장년", "200,000원", "월 4회"],
  ["건강생활 지원", "중장년", "200,000원", "월 8회"],
  ["신체건강 증진", "청년", "240,000원", "주 2~3회"],
  ["간병 교육", "청년", "6개월간 150,000원", "6개월간 5회"],
  ["독립생활 지원", "청년", "120,000원", "월 3회"],
];

/* 사업안내 248쪽 「건강보험료 소득판정기준표(2026)」 — 월 보험료 본인부담금, 원. 혼합은 직장+지역이 섞인 가구. */
type Premium = readonly [string, number, number, number | null];
const P120: readonly Premium[] = [
  ["1인", 110_969, 32_899, null],
  ["2인", 183_365, 123_644, 185_675],
  ["3인", 232_890, 168_649, 236_378],
  ["4인", 284_951, 233_292, 290_169],
  ["5인", 327_091, 284_606, 337_647],
  ["6인", 374_300, 338_641, 390_974],
];
const P160: readonly Premium[] = [
  ["1인", 148_138, 79_647, null],
  ["2인", 243_833, 181_659, 247_763],
  ["3인", 309_777, 264_935, 318_043],
  ["4인", 374_300, 338_641, 390_974],
  ["5인", 457_613, 435_046, 490_306],
  ["6인", 535_512, 525_833, 584_741],
];

const cell = "px-3 py-2";
const th = "px-3 py-2 font-semibold";
const head = "border-y border-line bg-sunken text-left";
const row = "border-b border-line align-top";

function PremiumTable({ title, rows }: { title: string; rows: readonly Premium[] }) {
  return (
    <div className="overflow-x-auto">
      <p className="mb-1 text-sm font-semibold">{title}</p>
      <table className="w-full min-w-[420px] border-collapse text-sm">
        <caption className="sr-only">{title}</caption>
        <thead>
          <tr className={head}>
            <th scope="col" className={th}>가구원</th>
            <th scope="col" className={th}>직장가입자</th>
            <th scope="col" className={th}>지역가입자</th>
            <th scope="col" className={th}>혼합</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([n, a, b, c]) => (
            <tr key={n} className={row}>
              <td className={cell}>{n}</td>
              <td className={`${cell} tabular-nums`}>{won(a)}</td>
              <td className={`${cell} tabular-nums`}>{won(b)}</td>
              <td className={`${cell} tabular-nums`}>{c === null ? "—" : won(c)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DailyCareGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="일상돌봄 서비스는 아프거나 다쳐서, 또는 고립돼서 혼자 생활하기 어려운 청·중장년과 가족을 돌보는 청년에게 사람이 집으로 와서 돌봄·가사를 해 주는 이용권(바우처)입니다. 복지로 원문에 대상과 월 금액은 있지만, 소득에 따라 얼마를 내는지와 이용 기간 규칙은 없어서 2026년 사업안내에서 옮겼습니다."
        updated={`최종 수정 ${G.updated} · 2026년 일상돌봄 서비스 사업안내(보건복지부)에서 ${CHECKED} 확인`}
      >
        <DocSection title="한 장으로 보면">
          <DocList
            items={[
              <>
                <strong>소득 제한이 없습니다.</strong> 누구나 신청할 수 있고, 소득에 따라 내는 몫만 0·10·25·100%로
                갈립니다(사업안내 6·11쪽).
              </>,
              <>
                대상은 둘 — 질병·부상·고립으로 돌봄이 필요한 <strong>13~64세</strong>, 그리고 아픈 가족을 돌보거나 그
                때문에 생계를 책임지는 <strong>39세 이하 가족돌봄청년</strong>(청소년 포함). 나이는 만 나이입니다
                (15쪽).
              </>,
              <>
                기본서비스는 <strong>A형 월 36시간(684,000원)</strong>·B형 가사만 24시간(444,000원)·C형 72시간
                (1,368,000원) 중 하나, 여기에 특화서비스를 0~2개 붙입니다(11쪽).
              </>,
              <>
                한 번 선정되면 <strong>1년</strong> 쓰고, 다시 신청(재판정)해 최대 <strong>3년</strong>까지 씁니다
                (48쪽).
              </>,
              <>
                신청은 사는 곳 <strong>읍·면·동 주민센터</strong>(전화·우편·팩스·복지로도 가능). 결정은 신청한 날부터{" "}
                <strong>14일 안에</strong>(사유가 있으면 30일까지) 합니다(24·45쪽).
              </>,
            ]}
          />
          <DocNote tone="amber" title="우리 동네에서 하는지 먼저 확인하세요">
            2026년 사업안내(8쪽) 기준 부산·대구·인천·광주·대전·울산·세종·강원·충남·전북·전남·경남·제주는 모든
            시·군·구가 합니다. <strong>서울</strong>은 용산·성동·광진·동대문·중랑·성북·강북·서대문·양천·강서·구로·
            금천·영등포·동작·서초·강동·노원·마포구(종로·도봉·관악구는 시행 예정), <strong>충북</strong>은 청주·충주·
            제천·옥천·증평·진천·괴산·음성·보은(영동·단양은 예정), <strong>경기</strong>는 가평·과천·양평·연천을 뺀 전체,{" "}
            <strong>경북</strong>은 울릉을 뺀 전체입니다. 목록에 없는 곳은 시행 여부를 주민센터에 물어보세요 —
            안내서도 「일부 시·군·구는 시행 여부 및 시기 변동 가능」이라고 적습니다.
          </DocNote>
        </DocSection>

        <DocSection title="누가 받을 수 있나">
          <p>
            소득 조건은 없고, 아래 조건을 <strong>모두</strong> 갖춰야 합니다. 국적은 대한민국입니다(15~16쪽).
          </p>
          <DocList
            items={[
              <>
                <strong>돌봄이 필요한 청·중장년(13~64세)</strong> — ① 질병·부상·고립 등으로 혼자 일상생활을 하기
                어렵고(진단서·소견서, 공공·민간기관 추천서, 자립준비청년 보호종료확인서 등 하나) ② 돌봐 줄 가족이
                없어야 합니다 — 주민등록상 <strong>1인 가구</strong>이거나, 함께 사는 가족이 일·학업·장기 부재 등으로
                돌볼 수 없다는 증빙이 있으면 됩니다.
              </>,
              <>
                <strong>가족돌봄청년(39세 이하)</strong> — ① 돌보는 가족이 질병·부상·고립으로 혼자 생활하기 어렵고 ②
                청년 말고 돌볼 사람이 없으며(주민등록상 2인 가구 등) ③ 그 가족과 함께 살며 직접 돌보거나, 병원비·생활비
                마련을 위해 일하고 있어야 합니다. 여기서 가족은 부모·조부모·배우자·형제자매·친척이고,{" "}
                <strong>자녀를 돌보는 경우는 빠집니다</strong>(15쪽).
              </>,
              <>
                중증질환·희귀난치성질환이면 진단서에 「일상생활에 상당한 제한」이 적혀 있지 않아도 증빙으로 인정할 수
                있고, 장기요양인정서·근로능력판정결과서·장애의 정도가 심한 장애인 등록증도 됩니다(25쪽).
              </>,
              <>
                증빙서류는 원칙적으로 <strong>신청일 기준 3개월 안</strong>에 뗀 것이어야 합니다. 건강보험·주민등록·
                수급자 여부처럼 전산으로 확인되는 것은 따로 내지 않습니다(29쪽).
              </>,
              <>
                <strong>장기요양·가사간병 등 다른 공적 돌봄을 받고 있으면</strong> 기본서비스는 안 되고 특화서비스만
                됩니다(D형, 16·19쪽).
              </>,
              <>
                위 기준에 딱 맞지 않아도 읍·면·동장과 시·군·구청장이 필요하다고 보면 심의를 거쳐 선정할 수 있습니다
                (16쪽).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="A·B·C·D형 — 무엇을 고르나">
          <p>
            기본서비스는 요양보호사·가사관리사 같은 제공인력이 집에 와서 돌봄(목욕·옷 갈아입기·식사 도움 등)과
            가사(청소·설거지·식사 준비), 장보기·은행 같은 가까운 외출 동행을 합니다. B형은 가사만 합니다(57쪽).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <caption className="sr-only">{"A·B·C·D형 — 무엇을 고르나"}</caption>
              <thead>
                <tr className={head}>
                  <th scope="col" className={th}>유형</th>
                  <th scope="col" className={th}>내용</th>
                  <th scope="col" className={th}>시간 (표준)</th>
                  <th scope="col" className={th}>월 금액</th>
                  <th scope="col" className={th}>특화서비스</th>
                </tr>
              </thead>
              <tbody>
                {PLANS.map(([t, what, hours, price, extra]) => (
                  <tr key={t} className={row}>
                    <td className={`${cell} font-semibold`}>{t}</td>
                    <td className={cell}>{what}</td>
                    <td className={cell}>{hours}</td>
                    <td className={`${cell} tabular-nums`}>{price ? won(price) : "—"}</td>
                    <td className={cell}>{extra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DocList
            items={[
              <>
                시간당 가격은 A·C형 <strong>19,000원</strong>, B형 <strong>18,500원</strong>입니다. 한 번 방문은 최소 2시간이
                원칙이고, 하루 최대 A·C형 8시간·B형 3시간까지 셉니다(60쪽).
              </>,
              <>
                <strong>C형</strong>은 혼자 생활이 불가능하거나 현저히 어려운 경우로, 주민센터가 집에 와서 하는{" "}
                <strong>선정조사가 반드시</strong> 있습니다(14·19쪽).
              </>,
              <>
                평일 오전 9시~오후 6시 밖(야간·휴일)이나 와상환자처럼 어려운 돌봄은 지자체 기준에 따라 30분당 1,500원
                안팎이 더 붙고, <strong>이 돈은 이용자가 냅니다</strong>(60쪽).
              </>,
              <>유형은 「최대」 한도라 특화서비스를 적게 고르는 것도 됩니다(18쪽).</>,
            ]}
          />
        </DocSection>

        <DocSection title="소득별로 내는 돈">
          <p>
            본인부담 비율은 기준 중위소득으로 갈립니다(11쪽). 괄호 안은 청년미래센터 등이 사례관리 대상자로 정했거나
            시·군·구가 심의로 인정한 <strong>「본인부담경감필요 가족돌봄청년」</strong>의 비율로, 2026년 3월부터
            5%p 낮춥니다(43·81쪽).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] border-collapse text-sm">
              <caption className="sr-only">{"소득별로 내는 돈"}</caption>
              <thead>
                <tr className={head}>
                  <th scope="col" className={th}>소득</th>
                  <th scope="col" className={th}>기본서비스</th>
                  <th scope="col" className={th}>특화서비스</th>
                </tr>
              </thead>
              <tbody>
                <tr className={row}>
                  <td className={cell}>기초생활수급자, 차상위</td>
                  <td className={cell}>면제</td>
                  <td className={cell}>5% (면제)</td>
                </tr>
                <tr className={row}>
                  <td className={cell}>중위소득 120% 이하</td>
                  <td className={cell}>10% (5%)</td>
                  <td className={cell}>15% (10%)</td>
                </tr>
                <tr className={row}>
                  <td className={cell}>120% 초과 ~ 160% 이하</td>
                  <td className={cell}>25% (20%)</td>
                  <td className={cell}>30% (25%)</td>
                </tr>
                <tr className={row}>
                  <td className={cell}>160% 초과</td>
                  <td className={cell}>100% (95%)</td>
                  <td className={cell}>100% (95%)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">기본서비스를 한 달 다 쓸 때 내는 돈(사업안내 80쪽 표 그대로):</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <caption className="sr-only">{"소득별로 내는 돈"}</caption>
              <thead>
                <tr className={head}>
                  <th scope="col" className={th}>유형</th>
                  <th scope="col" className={th}>수급자·차상위</th>
                  <th scope="col" className={th}>120% 이하</th>
                  <th scope="col" className={th}>120~160%</th>
                  <th scope="col" className={th}>160% 초과</th>
                </tr>
              </thead>
              <tbody>
                {PAYS.map(([t, a, b, c, d]) => (
                  <tr key={t} className={row}>
                    <td className={`${cell} font-semibold`}>{t}</td>
                    <td className={`${cell} tabular-nums`}>{a === 0 ? "0원" : won(a)}</td>
                    <td className={`${cell} tabular-nums`}>{won(b)}</td>
                    <td className={`${cell} tabular-nums`}>{won(c)}</td>
                    <td className={`${cell} tabular-nums`}>{won(d)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DocList
            items={[
              <>
                <strong>160% 초과면 전액을 냅니다.</strong> 선정되면 서면 이용권을 함께 받습니다(45쪽). 유형별 시간을 다
                쓴 뒤에도 전액 본인부담으로 더 쓸 수 있는데, 이때도 단가보다 비싸게 받을 수 없습니다(81쪽).
              </>,
              <>
                본인부담금은 <strong>서비스를 받기 전 달에</strong> 제공기관에 한 달치를 내고, 쓸 때마다 차감되며, 못 쓴
                만큼은 돌려받습니다(59쪽).
              </>,
              <>
                소득은 <strong>신청일 전달 건강보험료</strong>로 봅니다. 맞벌이는 둘 중 낮은 보험료를 절반만 더하고, 3개월
                넘게 휴직한 사람의 소득은 0으로 봅니다. 수급자·차상위는 소득조사를 하지 않습니다(47쪽).
              </>,
            ]}
          />
          <p className="mt-4">
            건강보험료(본인부담분)가 아래 금액 <strong>이하</strong>면 그 구간입니다(사업안내 248쪽 「건강보험료
            소득판정기준표(2026)」, 7인 이상은 같은 쪽 참조). 표의 금액은{" "}
            <strong>노인장기요양보험료를 뺀 건강보험료</strong>입니다 — 고지서 합계와 견주면 실제보다 높은 구간으로
            읽힙니다.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <PremiumTable title="중위소득 120% (본인부담 10%까지)" rows={P120} />
            <PremiumTable title="중위소득 160% (본인부담 25%까지)" rows={P160} />
          </div>
        </DocSection>

        <DocSection title="특화서비스">
          <p>
            아래는 복지부 표준모델이고, 지역이 이 중 일부를 고르거나 따로 만들어 제공합니다(20쪽). 우리 시·군·구가
            무엇을 하는지는 주민센터에 비치된 목록으로 확인합니다(21쪽). 본인부담은 위 표의 특화서비스 비율입니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <caption className="sr-only">{"특화서비스"}</caption>
              <thead>
                <tr className={head}>
                  <th scope="col" className={th}>서비스</th>
                  <th scope="col" className={th}>대상</th>
                  <th scope="col" className={th}>월 단가</th>
                  <th scope="col" className={th}>횟수</th>
                </tr>
              </thead>
              <tbody>
                {EXTRAS.map(([n, who, price, times]) => (
                  <tr key={n} className={row}>
                    <td className={cell}>{n}</td>
                    <td className={cell}>{who}</td>
                    <td className={`${cell} tabular-nums`}>{price}</td>
                    <td className={cell}>{times}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocSection title="언제부터 쓰고, 언제 끝나나">
          <DocList
            items={[
              <>
                시·군·구가 매달 <strong>27일 오후 6시</strong>까지 결정을 보내면 <strong>다음 달 1일</strong>부터 씁니다.
                급하면 그달 10일까지 보낸 결정은 다음 날부터 바로 쓸 수 있습니다(45쪽).
              </>,
              <>
                이용권은 <strong>다음 달까지만 이월</strong>되고 그 뒤에는 사라집니다. <strong>12월 31일</strong>에는
                남은 양이 전부 사라지고 1월 몫이 새로 생깁니다(98~99쪽).
              </>,
              <>
                지원 기간은 서비스를 시작한 달부터 <strong>1년</strong>(간병 교육은 6개월)이고, 안 써도 기간은 흐릅니다.
                끝나기 2개월 전에 시·군·구가 재신청을 안내하고, 다시 선정되면 <strong>합쳐서 3년</strong>까지 씁니다.
                재판정은 5번이 한도입니다(48~49쪽).
              </>,
              <>
                <strong>정당한 사유 없이 2개월 연속 쓰지 않으면</strong> 자격이 없어집니다. 입원·감염병·제공기관 등록
                지연 등은 정당한 사유입니다(50쪽).
              </>,
              <>
                <strong>만 65세가 되면</strong> 자격이 끝납니다. 2026년은 바뀐 첫해라 2025년에 선정된 사람은 남은 기간을
                그대로 쓰고, 2026년에 선정된 사람도 시·군·구 결정으로 최대 6개월 더 받을 수 있습니다(50쪽).
              </>,
              <>
                <strong>다른 시·군·구로 이사</strong>하면 자격이 없어지고 새 주소지에서 다시 선정받아야 합니다. 옛
                이용권은 전입 신고한 달까지만 씁니다(50쪽).
              </>,
              <>본인부담금을 안 내 제공기관이 중지를 요청하거나, 제공인력에게 폭력 등을 하면 자격이 없어집니다(50쪽).</>,
            ]}
          />
        </DocSection>

        <DocSection title="신청할 때 가져갈 것">
          <DocList
            items={[
              <>사회보장급여(사회서비스이용권) 신청(변경)서, 사회서비스 이용자 준수사항 안내확인 동의서, 신분증(24쪽)</>,
              <>
                신청서에 원하는 서비스 이름을 적습니다 — 예: 「일상돌봄 기본서비스 B형(24시간)」 + 「일상돌봄 심리 지원
                서비스」. C형을 고르면 특화서비스 이름은 적지 않습니다(21~23쪽).
              </>,
              <>위 「누가 받을 수 있나」의 증빙서류(돌봄 필요성·돌봄자 부재·가족돌봄 여부)</>,
              <>
                가족·이웃(이·통장)이 대신 신청할 수 있고, 거동이 불편하면 전화·우편·팩스로도 됩니다. 대신 내면 위임장과
                대리인 신분증, 14세 미만은 법정대리인 동의서가 더 필요합니다(24쪽).
              </>,
              <>
                결정에 이의가 있으면 통지받은 날부터 <strong>60일 안에</strong> 시·군·구에 이의신청하고, 시·군·구는
                15일 안에 답합니다(51쪽).
              </>,
            ]}
          />
        </DocSection>

        <DocNote tone="amber" title="이 글에 없는 것">
          시·도가 따로 만든 특화서비스(경기 세탁 서비스 등, 23쪽)의 가격은 싣지 않았습니다. 수술·사고로 갑자기 며칠
          돌봄이 필요한 경우는 기간과 조건이 다른{" "}
          <Link href="/guide/emergency-care" className="text-brand underline">
            긴급돌봄 지원사업
          </Link>
          이 따로 있습니다. 대상이 되는지는 주민센터가 정합니다 — 이 글은 판정하지 않습니다.
        </DocNote>

        <DocSection title="출처">
          <DocList
            items={[
              <>
                보건복지부 「
                <a href={PDF} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                  2026년 일상돌봄 서비스 사업안내
                </a>
                」 — 6·8·11·14~29·43~51·56~60·80~81·98~99·248쪽 (복지로 원문 첨부)
              </>,
              <>사회서비스 이용 및 이용권 관리에 관한 법률 제4조(추진 근거)·제12조(이의신청)</>,
            ]}
          />
          <p className="text-sm">
            문의: 사는 곳 읍·면·동 주민센터 · 보건복지상담센터 <strong>129</strong>
          </p>
          <p>
            <Link href="/service/WLF00005411" className="text-brand underline">
              일상돌봄 서비스 사업 상세 보기 — 복지로 원문 →
            </Link>
          </p>
          <DocNote>
            이 글은 사업안내의 표와 규칙을 옮긴 것이며, 이용 대상인지 판정하지 않습니다. 지침은 「지역별로 일부
            기준 변경 가능」하다고 적고 있어(3쪽) 시·군·구마다 조금씩 다를 수 있습니다.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="daily-care" />
    </>
  );
}
