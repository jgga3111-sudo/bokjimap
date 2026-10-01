import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("childcare-extended")!;

export const metadata: Metadata = {
  title: "야간연장·24시간·휴일 어린이집 보육료 — 시간 계산과 신청",
  description:
    "저녁 7시 반 이후나 일요일·공휴일에 어린이집을 쓸 때의 보육료. 야간연장은 시간당 4,000원(장애아 5,000원), 하원 시각을 1시간 단위로 셉니다. 야간연장·야간 12시간·24시간·휴일을 구분하고 신청서 순서를 교육부 2026년도 보육사업안내로 정리했습니다.",
  alternates: { canonical: "/guide/childcare-extended" },
};

/*
  왜 이 글인가 (2026-10-01).

  조회수 51위 「그 밖의 연장형 보육료 등 지원」(약 20만)은 복지로 원문에 단가와 기준 시간이
  다 적혀 있어서 금액 때문에 쓰는 글은 아니다. 원문이 안 적은 것이 세 가지다.
   · 이용하려면 **어린이집에 야간연장보육신청서를 먼저 내야** 한다(보육사업안내 316쪽) —
     원문의 신청 절차는 「읍면동에서 서비스 신청」뿐이라 어린이집 쪽 신청이 안 보인다.
   · 새벽 05:30~07:30 이용도 야간연장으로 친다(315쪽).
   · 야간12시간·24시간은 단가를 「보육료 단가표 참조」라고만 적는다. 대상 요건(부모의 야간
     경제활동, 한부모·조손)과 보호자 준수사항(주 3회 연락·주 1회 귀가)이 안내서 364쪽에 있다.

  출처는 이 사업 원문에 첨부된 교육부 「2026년도 보육사업안내」 본문이다. 인쇄 쪽 = PDF 파일
  쪽 − 8. 어긋나는 곳(시간 경계 1분, 원장 자녀 범위, 휴일 예시)은 합치지 않고 둘 다 적는다(3절).
  금액은 원문·안내서에 적힌 값만 옮기고, 곱한 값에는 「저희가 계산한 값」을 붙인다.
*/
const EXT = services.find((s) => s.id === "WLF00001147");
const CARE = services.find((s) => s.id === "WLF00003250");
const PDF = EXT?.forms.find((f) => f.name.includes("보육사업안내"))?.url ?? null;
const DOC = "2026년도 보육사업안내";
const CHECKED = "2026-10-01";

function Source({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted">{children}</p>;
}
const docLink = (page: string) => (
  <>
    {PDF ? (
      <a href={PDF} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
        교육부 「{DOC}」
      </a>
    ) : (
      <>교육부 「{DOC}」</>
    )}{" "}
    {page}
  </>
);

/** 야간연장 보육료 단가 — 원문과 안내서(315쪽)가 같다. 연령과 관계없이 같다. */
const NIGHT_GENERAL = 4_000;
const NIGHT_DISABLED = 5_000;

/** 안내서 316쪽이 예로 든 두 줄. 뒤의 시간대가 같은 식으로 이어지는지는 안내서가 적지 않았다. */
const HOUR_ROWS = [
  { out: "19:30 ~ 20:29", hours: 1 },
  { out: "20:30 ~ 21:29", hours: 2 },
] as const;

export default function ChildcareExtendedGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="저녁 7시 반이 넘거나 일요일·공휴일에 어린이집을 쓰면 보육료가 따로 지원됩니다. 이름은 하나지만 야간연장, 야간 12시간, 24시간, 휴일 넷으로 갈리고, 어느 것인지에 따라 신청서도 어린이집도 다릅니다."
        updated={`최종 수정 ${G.updated} · 금액·시간은 복지로 원문, 신청 절차·대상은 교육부 「${DOC}」에서 ${CHECKED} 확인`}
      >
        <DocSection title="한 장으로 보면">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">종류</th>
                  <th className="px-3 py-2 font-semibold">시간</th>
                  <th className="px-3 py-2 font-semibold">지원 단가</th>
                  <th className="px-3 py-2 font-semibold">쓸 수 있는 어린이집</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2 font-semibold">야간연장</td>
                  <td className="px-3 py-2">
                    평일 19:30~24:00
                    <br />
                    토요일 15:30~24:00
                    <br />
                    <span className="text-muted">(05:30~07:30도 야간연장으로 봄)</span>
                  </td>
                  <td className="px-3 py-2">
                    시간당 일반 {won(NIGHT_GENERAL)}
                    <br />
                    장애아 {won(NIGHT_DISABLED)}
                  </td>
                  <td className="px-3 py-2">야간연장 어린이집</td>
                </tr>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2 font-semibold">야간 12시간</td>
                  <td className="px-3 py-2">19:30 ~ 다음 날 07:30</td>
                  <td className="px-3 py-2">「0~5세반 보육료 단가표」 참조</td>
                  <td className="px-3 py-2">24시간 지정 어린이집</td>
                </tr>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2 font-semibold">24시간</td>
                  <td className="px-3 py-2">07:30 ~ 다음 날 07:30</td>
                  <td className="px-3 py-2">「0~5세반 보육료 단가표」 참조</td>
                  <td className="px-3 py-2">24시간 지정 어린이집</td>
                </tr>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2 font-semibold">휴일</td>
                  <td className="px-3 py-2">일요일·공휴일 07:30~19:30</td>
                  <td className="px-3 py-2">월 보육료 × 이용일 ÷ 그달 보육 가능일 (아래 계산)</td>
                  <td className="px-3 py-2">휴일 어린이집 지정 여부에 따라 비율이 다름</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Source>
            복지로 「그 밖의 연장형 보육료 등 지원」 원문 · {docLink("315~317쪽")} · {CHECKED} 확인
          </Source>
        </DocSection>

        <DocSection title="먼저 가르기 — 낮에 어린이집·유치원에 다니나요?">
          <DocList
            items={[
              <>
                <strong>낮에 어린이집이나 유치원에 다닌다</strong> — 저녁 시간을 늘리는 것이므로
                <strong> 야간연장</strong>입니다. 안내서는 &ldquo;어린이집 또는 유치원을 이용하지
                않고 야간연장 보육서비스만 이용하는 아동은 정부 지원 불가&rdquo;라고 적습니다(316쪽).
              </>,
              <>
                <strong>낮에는 어린이집을 안 쓰고 밤에만 맡긴다</strong> — <strong>야간 12시간</strong>
                입니다. 주간에 어린이집을 이용하지 않는 아동만 받을 수 있고 취학 아동은 안 됩니다.
              </>,
              <>
                <strong>낮에도 밤에도 맡긴다</strong> — <strong>24시간</strong>입니다. 주간 보육과 야간
                12시간 보육을 같이 이용하는 경우입니다.
              </>,
              <>
                <strong>일요일·공휴일에 맡긴다</strong> — <strong>휴일</strong>입니다. 토요일은 휴일
                보육이 아니라 정규 운영일이라 야간연장 시간(15:30부터)으로 셉니다.
              </>,
            ]}
          />
          <Source>{docLink("79·315~317쪽")} · {CHECKED} 확인</Source>
        </DocSection>

        <DocSection title="누가 받나 — 보육료를 받는 아이가 먼저입니다">
          <p>
            이 지원은 <strong>기본 보육료 지원을 받는 아이</strong>에게 얹히는 것입니다. 안내서가
            적은 지원 대상은 이렇습니다.
          </p>
          <DocList
            items={[
              <>0~2세반 연장보육료 지원 아동 — 기본보육시간 보육료만 지원받는 아동은 <strong>휴일보육료만</strong> 받을 수 있습니다.</>,
              <>3~5세반 누리과정 보육료, 다문화 보육료, 장애아 보육료(취학 전) 지원 아동.</>,
              <>
                12세 이하 <strong>취학 아동</strong> 중 법정 저소득층과 장애아동(복지카드 소지자)은{" "}
                <strong>야간연장 보육료에 한해</strong> 지원됩니다. 복지카드가 없는 취학 장애아동은
                특수교육대상자 진단·평가 통지서를 내면 8세까지 지원합니다.
              </>,
              <>
                어린이집 <strong>원장·대표자의 자녀(손자·외손자 포함)</strong>는 지원하지 않습니다.
              </>,
            ]}
          />
          <Source>{docLink("315쪽")} · {CHECKED} 확인</Source>
          <DocNote>
            어린이집을 다니는 것 자체의 보육료 신청과, 어린이집·유치원·집을 오갈 때 신청일이 15일
            앞인지 뒤인지에 따라 갈리는 규칙은{" "}
            <Link href="/guide/childcare-choice" className="text-brand underline">
              보육료·유아학비·양육수당 글
            </Link>
            에 따로 적었습니다.
          </DocNote>
        </DocSection>

        <DocSection title="야간연장 — 하원 시각을 1시간 단위로 셉니다">
          <DocList
            items={[
              <>
                시간은 <strong>전자출결시스템에 기록된 등·하원 시각</strong>을 시·분 단위로 보고,{" "}
                <strong>매일 1시간 단위</strong>로 셉니다. 안내서가 든 예는 두 줄입니다.
              </>,
              <>
                <strong>2026년 3월 이용분부터 월 60시간 한도가 없어졌습니다.</strong> 2월 이용분까지는
                월 60시간이 상한이었습니다.
              </>,
              <>
                유치원에 다니는 아이가 야간연장 어린이집으로 19:30 전에 먼저 가면, 19:30까지는
                <strong> 전액 부모 부담</strong>(금액은 부모와 상의해 정함)이고 19:30 이후만
                지원됩니다.
              </>,
              <>아침·저녁 급식비는 기타 필요경비 지침에 따라 따로 받을 수 있습니다.</>,
            ]}
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">하원 시각</th>
                  <th className="px-3 py-2 font-semibold">이용 시간</th>
                  <th className="px-3 py-2 font-semibold">하루 지원(일반)</th>
                  <th className="px-3 py-2 font-semibold">하루 지원(장애아)</th>
                </tr>
              </thead>
              <tbody>
                {HOUR_ROWS.map((r) => (
                  <tr key={r.out} className="border-b border-line align-top">
                    <td className="px-3 py-2">{r.out}</td>
                    <td className="px-3 py-2">{r.hours}시간</td>
                    <td className="px-3 py-2">{won(NIGHT_GENERAL * r.hours)}</td>
                    <td className="px-3 py-2">{won(NIGHT_DISABLED * r.hours)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Source>
            시간대 두 줄은 {docLink("316쪽")}에 적힌 예이고, 하루 지원액은 그 시간 × 시간당 단가로
            <strong> 저희가 계산한 값</strong>입니다. 이후 시간대가 같은 방식으로 이어지는지는
            안내서가 적지 않았습니다.
          </Source>
          <DocNote title="한 달에 얼마 나오나 — 예시">
            하원이 20:30~21:29인 날(2시간)이 20일이면 일반 아동은 {won(NIGHT_GENERAL)} × 2시간 × 20일 ={" "}
            <strong>{won(NIGHT_GENERAL * 2 * 20)}</strong>, 장애아는 {won(NIGHT_DISABLED)} × 2시간 × 20일 ={" "}
            <strong>{won(NIGHT_DISABLED * 2 * 20)}</strong>입니다. 저희가 곱한 어림값이고, 실제 지원 시간은
            어린이집이 전자출결 기록으로 청구하는 대로 정해집니다.
          </DocNote>
        </DocSection>

        <DocSection title="신청은 어린이집에 먼저 냅니다">
          <p>
            복지로 원문의 신청 절차는 &ldquo;읍면동에서 서비스 신청&rdquo;으로 시작하지만, 안내서의
            야간연장 이용 절차는 어린이집 쪽에서 시작합니다.
          </p>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700">
            <li>
              보호자가 <strong>야간연장보육 최초 이용 전까지</strong> 「야간연장보육신청서」(서식
              Ⅸ-5-1)를 해당 어린이집에 냅니다. 이 신청서가 있어야 이용도 보육료 지원도 됩니다.
            </li>
            <li>
              원장이 보육통합정보시스템에 신청 내용을 입력합니다(<strong>휴대폰 인증 필수</strong>).
              신청서는 최초 이용일부터 5년간 어린이집이 보관합니다.
            </li>
            <li>
              어린이집이 시·군·구에 보육료를 청구할 때 「아동별 월 야간연장보육 실적확인서」(서식
              Ⅸ-5-2)를 냅니다. 출석부시스템을 쓰는 곳에서는 이 확인서를 <strong>보호자 확인용</strong>
              으로 씁니다.
            </li>
            <li>
              <strong>어린이집을 바꾸거나 그만둘 때</strong>는 기존 어린이집에 야간연장반 탈반·퇴소를
              요청하고, 옮기는 어린이집에는 신청서를 새로 냅니다.
            </li>
          </ol>
          <Source>{docLink("316쪽")} · {CHECKED} 확인</Source>
          <DocNote tone="amber" title="야간연장을 하는 어린이집은 시·군·구가 지정합니다">
            안내서는 시·군·구청장이 <strong>야간연장 어린이집으로 지정한 시설</strong>을 지원
            대상으로 적고(361쪽), 국공립·정부지원 비영리법인 시설은 부모의 취업 등으로 1명 이상이
            보육 시간 연장을 필요로 하면 야간연장을 <strong>의무적으로</strong> 해야 한다고
            적습니다(357쪽). 우리 동네에 어디가 지정돼 있는지는 이 글에 없습니다 — 시·군·구
            보육 담당 부서나 아이사랑 헬프데스크(1566-3232)에 확인하세요.
          </DocNote>
        </DocSection>

        <DocSection title="야간 12시간·24시간은 요건이 따로 있습니다">
          <DocList
            items={[
              <>
                <strong>대상</strong> — 부모가 야간에 경제활동에 종사하는 가정, 한부모·조손가정 등의
                미취학 영유아로 야간 12시간 보육이 <strong>불가피하다고 판단되는</strong> 아이입니다.
                시·군·구청장이 반기마다 대상 아동이 적정한지 점검합니다(364쪽).
              </>,
              <>
                <strong>어린이집</strong> — 2010년 3월부터 <strong>24시간 지정 어린이집</strong>에서만
                할 수 있고, 지정은 시·도지사가 &ldquo;극히 제한적으로&rdquo; 합니다(365쪽).
              </>,
              <>
                <strong>신청</strong> — 24시간 보육료를 받는 보호자는 별도 신청서(안내서 317쪽에는
                서식 Ⅸ-5, 365쪽에는 이용신청서 서식 Ⅸ-5-3으로 적힘)를 냅니다. 어린이집 원장은
                보호자 의무와 보육 여건을 설명한 뒤 신청서를 받아 두고, 시·군·구 승인 아래 24시간
                보육을 합니다.
              </>,
              <>
                <strong>보호자 준수사항</strong> — 24시간 보육 아동의 보호자는 최소한 <strong>주 3회
                이상</strong> 전화나 방문으로 아이와 접촉하고, <strong>주 1회 이상</strong> 아이를
                집에 데려가 돌보며, 어린이집과 늘 연락이 되게 해야 합니다. 1개월 이상 정당한 사유
                없이 방치하거나 연락이 안 되면 시·군·구청장이 아동복지법상 보호조치를 할 수 있다고
                안내서가 적습니다(364쪽).
              </>,
              <>
                <strong>부모에게 더 받는 돈</strong> — 24시간 보육 아동은 보육료의 200% 한도 안에서
                추가 비용을 부모에게서 받을 수 있고, 보육료 지원 대상자는 <strong>정부 지원 단가의
                150%까지 지원받고 그 이상은 부모에게 추가 수납</strong>할 수 있다고 적습니다.
                24시간 보육 아동에게는 휴일 보육료를 받을 수 없습니다(364쪽).
              </>,
            ]}
          />
          <Source>{docLink("317·364·365쪽")} · {CHECKED} 확인</Source>
          <DocNote>
            야간 12시간·24시간의 지원 단가는 원문도 안내서도 금액을 직접 적지 않고 &ldquo;0세반~5세반
            보육료 단가표 및 장애아보육료 단가표 참조&rdquo;라고만 적습니다. 그 표(2026년 월 기준
            부모보육료 0세 {won(584_000)} · 1세 {won(515_000)} · 2세 {won(426_000)} · 3~5세{" "}
            {won(280_000)} · 장애아 {won(634_000)}, 275쪽)에서 어느 칸을 쓰는지와 어린이집 유형별로
            실제 받는 금액은 안내서에 풀이가 없어 <strong>저희가 계산하지 않았습니다.</strong> 어린이집과
            시·군·구에서 총액을 확인하세요.
          </DocNote>
        </DocSection>

        <DocSection title="휴일(일요일·공휴일) 보육료">
          <p>
            안내서의 식은 <strong>(0~5세 부모보육료 × 휴일 보육일수 ÷ 그달 보육 가능일수)</strong>입니다.
            보육 가능일수가 26일인 달에 3세아가 휴일에 2일 이용하면 {won(280_000)} × 2 ÷ 26 ={" "}
            <strong>{won(21_530)}</strong>(원 단위 절삭)이라고 예를 듭니다. <strong>휴일 어린이집으로
            지정되지 않은 곳이면 이 금액의 150%</strong>를 지원한다고 적습니다(317쪽).
          </p>
          <Source>
            {docLink("317쪽")} · 어린이집이 부모에게 받을 수 있는 한도는 같은 안내서 90쪽에 &ldquo;일
            보육료 ×150%(휴일 어린이집으로 지정된 경우 ×100%)&rdquo;로 적혀 있습니다 · {CHECKED} 확인
          </Source>
        </DocSection>

        <DocSection title="복지로 원문과 안내서가 어긋나는 곳">
          <DocList
            items={[
              <>
                <strong>시간 경계</strong> — 복지로 원문은 &ldquo;19:30~20:30 사이에 하원 시 1시간,
                20:30~21:30 사이에 하원 시 2시간&rdquo;이라 20:30이 두 줄에 모두 걸립니다. 안내서는
                &ldquo;19:30~20:29 사이 1시간, 20:30~21:29 사이 2시간&rdquo;으로 20:30을 둘째 줄에
                넣습니다. 안내서가 더 구체적이라 이 글의 표는 안내서를 따랐습니다.
              </>,
              <>
                <strong>제외되는 자녀</strong> — 원문은 &ldquo;원장 겸 교사의 자녀&rdquo;, 안내서는
                &ldquo;원장, 대표자의 자녀(또는 손자, 외손자)&rdquo;입니다. 안내서 쪽이 넓습니다.
              </>,
              <>
                <strong>휴일 보육료 예시</strong> — 원문은 같은 3세아 2일 이용을 150%를 적용해{" "}
                {won(32_310)}으로, 안내서는 150% 적용 전의 {won(21_530)}으로 적습니다. 비율 규칙은 같고
                (지정 100% · 미지정 150%) 예시가 보여 주는 단계만 다릅니다. 150% 적용값은 원문에 적힌
                값이고 저희가 다시 계산하지 않았습니다.
              </>,
            ]}
          />
          <Source>복지로 「그 밖의 연장형 보육료 등 지원」 원문과 {docLink("315~317쪽")} 대조 · {CHECKED} 확인</Source>
        </DocSection>

        <DocSection title="이 글에 없는 것">
          <DocList
            items={[
              <>우리 동네 야간연장·24시간·휴일 어린이집이 어디인지 — 시·군·구가 지정합니다.</>,
              <>시·도마다 정하는 보육료 수납 한도와 24시간 보육의 실제 총액.</>,
              <>
                16:00~19:30 연장보육은 이 사업이 아닙니다. 보육료 단가표 주석에 시간당 연장보육료가
                따로 적혀 있으나(275쪽) 누구에게 지급되는지 풀이가 없어 옮기지 않았습니다.
              </>,
              <>받을 수 있는지 여부 — 대상 판정은 어린이집·시·군·구가 합니다.</>,
            ]}
          />
        </DocSection>

        <DocSection title="신청과 문의">
          <p>
            보육료 지원 자격은 복지로 또는 읍면동에서 신청하고, 야간연장 이용은 어린이집에 신청서를
            냅니다. 문의는 교육부 02-6222-6060, 아이사랑 헬프데스크 1566-3232(단축번호 1번)입니다.
          </p>
          <ul className="space-y-1 text-sm">
            {[EXT, CARE].filter(Boolean).map((s) => (
              <li key={s!.id}>
                <Link href={`/service/${s!.id}`} className="text-brand underline">
                  {s!.name} — 복지로 원문 →
                </Link>
              </li>
            ))}
          </ul>
          <DocNote>
            이 글은 복지로 원문과 교육부 보육사업안내를 옮긴 것이며, 받을 수 있는지 판정하지 않습니다.
            단가와 규칙은 해마다 바뀌니 신청 직전에 그해 기준을 다시 확인해 주세요.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="childcare-extended" />
    </>
  );
}
