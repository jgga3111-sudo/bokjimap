import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import SelfSupportBonusCalc from "@/components/SelfSupportBonusCalc";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import {
  SSB_ALLOWED,
  SSB_CHECKED,
  SSB_CONFLICTS,
  SSB_DOC,
  SSB_JOB_ID,
  SSB_MIN_HOURS,
  SSB_MIN_INCOME,
  SSB_SOURCE_ID,
  SSB_STEPS,
  SSB_TOTAL,
} from "@/lib/selfSupportBonus";
import { won } from "@/lib/display";

const G = guideBySlug("self-support-bonus")!;
const S = services.find((s) => s.id === SSB_SOURCE_ID);
const JOB = services.find((s) => s.id === SSB_JOB_ID);
/** 복지로 원문에 붙은 지침 PDF. 첨부 목록에서 이름으로 찾는다. */
const GUIDE_PDF = S?.forms.find((f) => f.name.includes("지침"))?.url ?? null;

export const metadata: Metadata = {
  title: "자활성공지원금 150만원, 퇴사했어도 받습니다 — 주 22시간과 6개월을 세는 법",
  description:
    "자활근로를 하다 취업·창업해 생계급여에서 벗어나면 6개월에 50만원, 12개월에 100만원을 받습니다. 주 22시간, 프리랜서는 월 90만원, 회사를 한 번 옮겨도 인정, 이미 퇴사했어도 소급 신청 — 복지로 원문에 없는 기준을 보건복지부 지침으로 확인했습니다.",
  alternates: { canonical: "/guide/self-support-bonus" },
};

/*
  왜 이 글인가 (2026-09-23, 사용자 요청).

  조회수 30위(약 47만)인데 「따로 확인한 것」이 0이었고, 서치콘솔에서 「자활성공지원금」이
  몇 주째 노출만 되고 클릭이 0이었다(7일 노출 10 · 클릭 0). 검색해서 들어와도 답이 없었다는
  뜻이다. 원문은 요건 네 가지를 이름만 적고 재는 방법을 안 적는다.

  근거는 원문에 첨부된 지침 13쪽이 전부 갖고 있었다. 자세한 것은 `lib/selfSupportBonus.ts` 머리말.
*/

function Src({ pages }: { pages: string }) {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      {GUIDE_PDF ? (
        <a href={GUIDE_PDF} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
          {SSB_DOC}
        </a>
      ) : (
        <>{SSB_DOC}</>
      )}{" "}
      {pages} · {SSB_CHECKED} 확인
    </p>
  );
}

const th = "px-3 py-2 font-semibold";
const td = "px-3 py-2";

export default function SelfSupportBonusGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="자활근로를 하다 일자리를 얻거나 가게를 열어 생계급여에서 벗어나면, 일을 얼마나 오래 이어 갔느냐에 따라 두 번에 걸쳐 모두 150만원을 받습니다. 복지로 원문은 조건의 이름만 적어 두어서, 실제로 갈리는 기준을 보건복지부 지침에서 옮겼습니다."
        updated={`최종 수정 ${G.updated} · 보건복지부 지침에서 ${SSB_CHECKED} 확인`}
      >
        <DocNote tone="brand" title="이미 그만뒀어도 신청할 수 있습니다">
          지원금은 <strong>신청할 때 다니고 있는지를 보지 않습니다.</strong> 6개월이나 12개월을 채운 사실만
          있으면 되고, 12개월을 채운 뒤 <strong>1회차와 2회차를 한 번에</strong> 신청해도 됩니다. 지침이 든 예도
          「퇴사 후 신청」한 경우에 150만원을 지급한다고 적고 있습니다.
          <Src pages="4·8쪽" />
        </DocNote>

        <DocSection title="두 번에 걸쳐 150만원">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[380px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className={th}>회차</th>
                  <th className={th}>얼마나 이어 갔나</th>
                  <th className={th}>받는 돈</th>
                </tr>
              </thead>
              <tbody>
                {SSB_STEPS.map((s) => (
                  <tr key={s.round} className="border-b border-line">
                    <td className={`${td} font-medium text-ink`}>{s.round}회차</td>
                    <td className={td}>{s.months}개월 근속</td>
                    <td className={`${td} tabular-nums`}>{won(s.amount)}</td>
                  </tr>
                ))}
                <tr className="border-b border-line bg-sunken">
                  <td className={`${td} font-medium text-ink`}>합계</td>
                  <td className={td}>12개월 근속</td>
                  <td className={`${td} font-semibold tabular-nums text-brand`}>{won(SSB_TOTAL)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            받으려면 네 가지가 모두 맞아야 합니다 — ① 자활근로사업에 참여한 이력 ② 민간시장 취업 또는 창업
            ③ 생계급여에서 벗어남 ④ 6개월·12개월이 지남. 원문에 적힌 것은 여기까지이고, 아래는 그 넷을 실제로
            어떻게 재는지입니다.
          </p>
          <Src pages="2쪽" />
        </DocSection>

        <DocSection title="언제까지 일해야 하나">
          <SelfSupportBonusCalc />
          <p className="mt-4">
            근속 기간은 달력으로 셉니다 — 일한 첫날부터 마지막 달의 <strong>그 날짜 전날</strong>까지입니다.
            지침이 든 예로, 2025년 6월 15일에 취업했다면 1회차는 2025년 12월 14일까지, 2회차는 2026년 6월
            14일까지 이어 가야 합니다. 창업은 취업일 대신 <strong>사업자등록일</strong>로 셉니다(등록일보다
            사업개시일이 늦으면 사업개시일).
          </p>
          <Src pages="8쪽" />
        </DocSection>

        <DocSection title="어떤 일자리가 인정되나">
          <h3 className="mt-2 font-semibold text-ink">월급을 받고 일하는 경우</h3>
          <p>
            <strong>주 {SSB_MIN_HOURS}시간 이상</strong> 일하고 <strong>고용보험 피보험자격을 얻는</strong> 자리여야
            합니다. 둘을 함께 갖춰야 합니다. 다만 고용보험이 적용되지 않는 사업장(상시근로자 4명 이하의 농림어업,
            공사금액 2천만원 미만인 공사 등)이라면 주 {SSB_MIN_HOURS}시간만 넘으면 인정합니다. 시간제처럼 여러
            형태의 고용도 시간만 맞으면 됩니다.
          </p>
          <DocNote title="인정되지 않는 일자리가 있습니다">
            예산으로 만드는 <strong>직접일자리 사업</strong>, 근로기준법상 근로관계로 보기 어려운 자리,{" "}
            <strong>부모·자녀·배우자가 대표인 곳</strong>, 고용보험 근로내용확인신고 대상인 <strong>일용근로자</strong>는
            주 {SSB_MIN_HOURS}시간을 넘어도 인정되지 않습니다.
          </DocNote>
          <h3 className="mt-2 font-semibold text-ink">노무제공자·프리랜서</h3>
          <p>
            시간이 아니라 소득으로 봅니다. <strong>월평균 {won(SSB_MIN_INCOME)} 이상</strong>이 이어지면 됩니다.
            근속 기간 동안의 평균이 기준이라, 어느 한 달이 {won(SSB_MIN_INCOME)}에 못 미쳐도 평균이 넘으면
            인정합니다. 기산점은 월 {won(SSB_MIN_INCOME)} 이상 소득이 생긴 날입니다.
          </p>
          <h3 className="mt-2 font-semibold text-ink">창업</h3>
          <DocList
            items={[
              <>
                사업자등록을 하고 <strong>6개월 이상 등록 상태를 유지</strong>해야 합니다. 그 사이에 폐업·휴업하거나
                매입·매출이 전혀 없으면 주지 않습니다.
              </>,
              <>
                <strong>사업만을 위한 공간</strong>이 있어야 합니다(임대차 계약서 등으로 확인). 독서실·고시원처럼
                사는 곳을 사업장으로 신고한 경우는 인정되지 않습니다.
              </>,
              <>
                <strong>무점포 창업은 인정되지 않습니다</strong> — 통신판매업 같은 인터넷 창업을 포함해서입니다. 다만
                창업진흥원의 <strong>1인창조기업 확인서</strong>를 받으면 점포가 없어도 됩니다.
              </>,
              <>법인은 새로 세운 경우만 해당합니다. 이미 있던 법인의 대표가 되는 것은 인정되지 않습니다.</>,
              <>유흥주점·무도장·안마시술소 등 선량한 풍속에 반하는 업종은 제외입니다.</>,
            ]}
          />
          <Src pages="3~6쪽" />
        </DocSection>

        <DocSection title="회사를 옮겨도 되나">
          <p>
            <strong>한 번은 됩니다.</strong> 옮긴 이유가 스스로든 아니든 상관없고, 고용보험 가입 기간이 끊기지
            않고 이어지면 같은 사업장에서 계속 일한 것으로 봅니다. 끊긴 날이 토요일·공휴일·근로자의 날이면
            끊긴 것으로 보지 않습니다. 아파트 경비처럼 위탁업체만 바뀌고 같은 자리에서 계속 일하는 경우는
            횟수에도 넣지 않습니다.
          </p>
          <p>
            반대로 <strong>중간에 비는 날이 생기면 그 뒤부터 다시 셉니다.</strong> 지침이 든 예로, 2개월 일하고
            그만둔 뒤 새 회사에서 12개월을 채운 사람은 새 회사 기준으로 150만원을 받습니다.
          </p>
          <DocNote title="일하지 못한 기간을 봐주는 경우">
            임신·출산, 부상·질병, 회사 사정으로 인한 휴업처럼 <strong>어쩔 수 없는 사유</strong>로 주{" "}
            {SSB_MIN_HOURS}시간을 채우지 못했더라도, 그 사업주와의 근로관계가 이어지고 있으면 그 기간도 인정합니다.
            증명할 서류를 신청서와 함께 냅니다. 인턴이 정규직으로 바뀌면서 잠깐 끊긴 경우도 인정합니다.
          </DocNote>
          <Src pages="4·10쪽" />
        </DocSection>

        <DocSection title="「생계급여에서 벗어남」은 좁게 봅니다">
          <p>
            지침은 탈수급을 <strong>「소득인정액이 급여 종류별 선정기준을 넘은 경우」</strong>로만 봅니다. 부양의무자가
            부양한 사실이 확인되거나, 본인이 급여를 거부했거나, 조건을 이행하지 않아서 보장이 중지된 경우는
            지급 대상이 아닙니다.
          </p>
          <p>
            취업이 먼저인지 탈수급이 먼저인지는 상관없고, <strong>둘 다 맞는 상태가 이어진 기간</strong>을 셉니다.
            중간에 소득이 줄어 생계급여를 다시 받게 되면 그 기간은 빼고 셉니다.
          </p>
          <p>
            자활근로 쪽 조건도 있습니다 — <strong>자활근로에 참여하는 중이거나, 참여가 끝난 뒤 6개월 안에</strong>{" "}
            취업·창업하고 탈수급해야 합니다. 자활근로는{" "}
            {JOB ? (
              <Link href={`/service/${JOB.id}`} className="text-brand underline">
                시장진입형·사회서비스형·인턴도우미형·근로유지형 등 모든 유형
              </Link>
            ) : (
              <>시장진입형·사회서비스형·인턴도우미형·근로유지형 등 모든 유형</>
            )}
            이 해당하고, 지역자활센터가 아니라 자활기업·사회적기업에 위탁해 일한 경우도 자활근로 참여자로
            확인되면 인정합니다.
          </p>
          <Src pages="3·7쪽" />
        </DocSection>

        <DocSection title="같이 받을 수 없는 지원금">
          <p>
            <strong>취업하고 오래 다니라고 주는 돈끼리는 겹쳐 받지 못합니다.</strong> 기간이 일부만 겹쳐도 그
            회차는 전액 주지 않습니다. 다만 다른 사업이 6개월치 한 번만 주는 것이라면, 자활성공지원금은 1회차만
            빼고 2회차는 받을 수 있습니다.
          </p>
          <DocList items={SSB_CONFLICTS.map((c) => <>{c}</>)} />
          <DocNote tone="brand" title="이것들은 같이 받아도 됩니다">
            <DocList items={SSB_ALLOWED.map((c) => <>{c}</>)} />
            <p className="mt-1">
              희망저축계좌와 청년내일저축계좌는 지침이 예외로 못 박았습니다. 두 통장은{" "}
              <Link href="/guide/hope-savings" className="text-brand underline">
                희망저축계좌 글
              </Link>
              과{" "}
              <Link href="/guide/youth-tomorrow-savings" className="text-brand underline">
                청년내일저축계좌 글
              </Link>
              에 따로 정리했습니다.
            </p>
          </DocNote>
          <p>
            희망사다리장학금이나 고교 취업연계 장려금처럼 기간이 겹치는 경우에는 <strong>어느 쪽을 받을지 본인이
            고를 수 있습니다.</strong> 신청서에 다른 지원금을 받았는지 적는 칸이 있고, 나중에 겹친 것이 확인되면
            돌려받아 갈 수 있습니다.
          </p>
          <Src pages="9~10쪽" />
        </DocSection>

        <DocSection title="신청과 서류">
          <p>
            주소지 <strong>읍·면·동 행정복지센터</strong>에 직접 가거나 <strong>복지로</strong>에서 신청합니다.
            지급신청서(서식1)에 더해 아래 증빙 중 하나 이상을 냅니다. 처리기간은 <strong>30일</strong>이고 연장되면
            60일입니다. 이사를 했다면 <strong>신청할 때의 주민등록지</strong>에서 신청하고 받습니다.
          </p>
          <DocList
            items={[
              <>
                <strong>월급을 받고 일한 경우</strong> — 근로계약서 등 취업·근속·임금·근로시간을 증명할 수 있는
                자료. 고용보험 가입 여부와 근속 기간은 담당자가 행복e음 연계자료로 확인합니다.
              </>,
              <>
                <strong>노무제공자·프리랜서</strong> — 소득금액증명원처럼 월 {won(SSB_MIN_INCOME)} 소득이 이어진
                것을 보여 주는 자료, 사업자등록증(있으면), 재직증명서·활동증명서 등.
              </>,
              <>
                <strong>창업</strong> — 사업자등록증(필수), 임대차 계약서 등 시설을 확인할 수 있는 서류, 세금계산서·
                매입매출 전표·부가가치세증명원 중 한 가지.
              </>,
            ]}
          />
          <DocNote title="한 번 받으면 다시는 받지 못합니다">
            지원금을 받은 뒤 다시 생계급여 수급자가 되었다가 또 자활근로를 하고 탈수급해도, 자활성공지원금은
            <strong> 다시 지급되지 않습니다.</strong> 평생 한 번입니다.
          </DocNote>
          <Src pages="8~9쪽" />
        </DocSection>

        <DocSection title="확인과 문의">
          <p>
            문의는 보건복지상담센터 <strong>129</strong>와 주소지 읍·면·동 행정복지센터입니다. 지급은 2025년
            11월부터 시작됐고, 첫해 대상자는 2024년 이후 자활근로에 참여한 이력이 있는 사람입니다.
          </p>
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문 →
              </Link>
            </p>
          )}
          <DocNote>
            이 글은 보건복지부 지침에 적힌 것을 옮긴 것이며, 누가 받을 수 있는지 판정하지 않습니다. 요건을
            갖췄는지는 시·군·구가 서류를 보고 정합니다.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="self-support-bonus" />
    </>
  );
}
