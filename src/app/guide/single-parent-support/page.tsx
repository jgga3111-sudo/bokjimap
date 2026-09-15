import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("single-parent-support")!;

export const metadata: Metadata = {
  title: "한부모가족 아동양육비 월 23만원 — 추가 10만원 받는 경우와 신청한 달부터 나오는 규칙",
  description:
    "한부모가족 아동양육비는 자녀 1인당 월 23만원이고, 조손가족·35세 이상 미혼 한부모(5세 이하 자녀)·25~34세 청년 한부모는 10만원이 더 붙습니다. 급여가 시작되는 날, 생계급여와 겹쳐 받는 것, 학용품비 7월 지급을 성평등가족부 2026년 지침으로 정리했습니다.",
  alternates: { canonical: "/guide/single-parent-support" },
};

/*
  왜 이 글인가 (2026-09-15).

  조회수 22위 「한부모가족 아동양육비 지원」(95만)은 상세에 우리가 따로 확인한 것이 없었다.
  원문에 붙은 성평등가족부 「2026년 한부모가족지원사업 안내」(PDF 566쪽)를 읽었다.
  복지로 원문에 없는 것 — 급여는 결정일이 아니라 **신청일이 속한 달**부터 전액 나온다,
  생계급여·긴급복지 생계지원을 받아도 아동양육비는 나온다, 학용품비는 7월에 한 번,
  나이 기준은 생일이 든 달의 **전 달까지**, 주소를 옮기면 15일을 기준으로 지급 기관이 갈린다.

  ⚠ 원문끼리 어긋나는 자리가 있다. 「청소년한부모 아동양육 및 자립지원」(WLF00001109) 원문은
  「0~1세 37만원 · 2세 이상 40만원」인데, 지침(156·167쪽)과 이 사업 원문은 「0~1세 40만원 ·
  2세 이상 37만원」이다. 지침을 따르고 어긋난 사실을 화면에 적는다(CLAUDE.md 3절).

  쪽수는 인쇄 쪽(머리글 숫자) — PDF 파일 쪽보다 8 작다. 자격 판정은 하지 않는다.
*/
const MAIN_ID = "WLF00001068";
const TEEN_ID = "WLF00001109";
const MAIN = services.find((s) => s.id === MAIN_ID);
const TEEN = services.find((s) => s.id === TEEN_ID);
const PDF = MAIN?.forms.find((f) => f.name.includes("한부모가족지원사업 안내 지침"))?.url ?? null;
const DOC = "2026년 한부모가족지원사업 안내";
const CHECKED = "2026-09-15";

function Src({ page }: { page: string }) {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      {PDF ? (
        <a href={PDF} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
          성평등가족부 「{DOC}」
        </a>
      ) : (
        <>성평등가족부 「{DOC}」</>
      )}{" "}
      {page} · {CHECKED} 확인
    </p>
  );
}

/** 2026년 소득인정액 기준(원/월) — 지침 3쪽 표 그대로. */
const LINES = [
  { size: "2인", median: 4_199_292, p65: 2_729_540, p72: 3_023_490 },
  { size: "3인", median: 5_359_036, p65: 3_483_373, p72: 3_858_506 },
  { size: "4인", median: 6_494_738, p65: 4_221_580, p72: 4_676_211 },
  { size: "5인", median: 7_556_719, p65: 4_911_867, p72: 5_440_838 },
  { size: "6인", median: 8_555_952, p65: 5_561_369, p72: 6_160_285 },
] as const;

/** 예시 — 원문 금액을 더한 값. 소득 기준을 충족했다고 가정한다. */
const EXAMPLES = [
  { who: "40세 이혼 한부모, 자녀 2명(10세·15세)", calc: "23만원 × 2", total: 460_000 },
  { who: "30세 한부모, 자녀 1명(3세)", calc: "23만원 + 청년 추가 10만원", total: 330_000 },
  { who: "37세 미혼 한부모, 자녀 1명(2세)", calc: "23만원 + 5세 이하 추가 10만원", total: 330_000 },
  { who: "조손가족, 손자녀 2명(4세·8세)", calc: "23만원 × 2 + 4세 추가 10만원", total: 560_000 },
  { who: "22세 청소년 한부모, 자녀 1명(1세)", calc: "0~1세 청소년한부모 아동양육비", total: 400_000 },
] as const;

export default function SingleParentSupportGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="한부모가족 아동양육비는 자녀 1인당 월 23만원이 기본이고, 부모 나이와 가족 형태에 따라 10만원이 더 붙거나 청소년 한부모 금액으로 바뀝니다. 결정이 늦어져도 신청한 달부터 계산되니, 자격이 될 것 같으면 먼저 신청하는 쪽이 손해가 없습니다."
        updated={`최종 수정 ${G.updated} · 성평등가족부 2026년 지침과 복지로 원문에서 ${CHECKED} 확인`}
      >
        <DocSection title="한 장으로 보면">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">급여</th>
                  <th className="px-3 py-2 font-semibold">누구에게</th>
                  <th className="px-3 py-2 text-right font-semibold">금액</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">아동양육비</td>
                  <td className="px-3 py-2">18세 미만 자녀(고등학교 재학 중이면 고3 12월까지, 22세 미만)</td>
                  <td className="px-3 py-2 text-right tabular-nums">1인당 월 {won(230_000)}</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">추가 아동양육비</td>
                  <td className="px-3 py-2">
                    조손가족과 35세 이상 미혼 한부모의 5세 이하 자녀 / 25세 이상 34세 이하 청년 한부모의 18세 미만 자녀
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">1인당 월 {won(100_000)}</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">아동교육지원비(학용품비)</td>
                  <td className="px-3 py-2">초등·중·고등학생 자녀</td>
                  <td className="px-3 py-2 text-right tabular-nums">1인당 연 {won(100_000)}</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">생활보조금</td>
                  <td className="px-3 py-2">한부모가족복지시설에 입소한 가구</td>
                  <td className="px-3 py-2 text-right tabular-nums">가구당 월 {won(100_000)}</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">청소년 한부모 아동양육비</td>
                  <td className="px-3 py-2">부 또는 모가 24세 이하인 한부모가족의 자녀</td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    0~1세 월 {won(400_000)}
                    <br />
                    2세 이상 월 {won(370_000)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            모두 소득인정액이 <strong>기준 중위소득 65% 이하</strong>인 가구가 대상입니다(2025년 63%에서 올랐습니다).
            추가 아동양육비·학용품비·생활보조금 금액도 2026년에 올랐습니다 — 추가 아동양육비 월 5~10만원 → 10만원,
            학용품비 연 9.3만원 → 10만원, 생활보조금 월 5만원 → 10만원.
          </p>
          <Src page="3~4·156·170~171쪽" />
        </DocSection>

        <DocSection title="우리 집이면 한 달에 얼마인가 (예시)">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">가족</th>
                  <th className="px-3 py-2 font-semibold">더한 것</th>
                  <th className="px-3 py-2 text-right font-semibold">월 합계</th>
                </tr>
              </thead>
              <tbody>
                {EXAMPLES.map((e) => (
                  <tr key={e.who} className="border-b border-line">
                    <td className="px-3 py-2">{e.who}</td>
                    <td className="px-3 py-2 text-slate-600">{e.calc}</td>
                    <td className="px-3 py-2 text-right font-bold tabular-nums">{won(e.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            <strong className="text-slate-600">위 합계는 저희가 원문 금액을 더한 값입니다.</strong> 소득 기준을
            충족했다고 가정했고, 학용품비(7월에 한 번)는 넣지 않았습니다. 청소년 한부모는 한부모가족 급여에서
            23만원을 먼저 주고 차액(0~1세 17만원, 2세 이상 14만원)을 청소년한부모 급여에서 줍니다(지침 167·171쪽).
          </p>
          <DocNote title="원문 두 곳이 청소년 한부모 금액을 반대로 적고 있습니다">
            복지로 「청소년한부모 아동양육 및 자립지원」 원문은 「0~1세 영아 37만원, 2세 이상 40만원」이라고 적고,
            「한부모가족 아동양육비 지원」 원문과 2026년 지침(156·167쪽)은 <strong>0~1세 40만원, 2세 이상
            37만원</strong>이라고 적습니다. 이 글은 지침을 따랐습니다. 실제 금액은 주민센터 결정 통지로 확인해 주세요.
          </DocNote>
        </DocSection>

        <DocSection title="언제부터, 언제까지 나오나">
          <DocList
            items={[
              <>
                <strong>신청한 달부터 전액</strong> — 지원대상자로 결정된 날이 아니라 <strong>급여 신청일</strong>이
                급여 개시일이고, 신청일이 든 달의 급여를 전액 줍니다. 결정 통지는 신청일로부터 30일 안(조사에 시간이
                걸리는 사유가 있으면 60일 안)에 옵니다.
              </>,
              <>
                <strong>나이 기준은 생일이 든 달의 전 달까지</strong> — 아동양육비는 18세가 되는 생일이 든 달의 전
                달까지, 추가 아동양육비(5세 이하)는 6세가 되는 생일이 든 달의 전 달까지 나옵니다. 고등학생이면 고3
                12월까지입니다.
              </>,
              <>
                <strong>지급일</strong> — 매월 정기지급일에 계좌로 들어오고, 그날이 토요일·공휴일이면 그 전날
                지급합니다.
              </>,
              <>
                <strong>학용품비는 7월에 한 번</strong> — 7월 급여지급일 현재 대상자인 가족의 초·중·고등학생 자녀에게
                10만원을 한꺼번에 줍니다. 7월 이후에 선정돼도 그해 몫 10만원은 받습니다. 기초생활보장 교육급여를 받는
                가구는 학용품비 대상이 아닙니다.
              </>,
              <>
                <strong>중지되면</strong> — 소득이 기준을 넘는 등 사유가 생긴 달에 중지가 결정되면 그달 급여는 전액
                나오고 다음 달부터 끊깁니다. 결정이 그보다 늦으면 결정된 달의 급여는 나오지 않고, 사유가 생긴 다음 달
                이후 받은 급여는 환수 대상입니다. 이사·취업·혼인 같은 변동은 바로 신고하는 쪽이 안전합니다.
              </>,
            ]}
          />
          <Src page="158·163·172~173·175·177쪽" />
        </DocSection>

        <DocSection title="다른 지원과 겹쳐 받을 수 있나">
          <DocList
            items={[
              <>
                <strong>생계급여를 받아도 아동양육비는 나옵니다.</strong> 지침은 &ldquo;생계급여 수급 한부모가족의
                아동에 대해서도 동일하게 지원&rdquo;한다고 적고, 긴급복지 생계지원을 받는 경우도 2022년 8월부터
                지원합니다.
              </>,
              <>
                <strong>가정위탁 양육보조금</strong>(아동복지법)을 받으면 아동양육비·추가 아동양육비가 나오지 않습니다.
              </>,
              <>
                <strong>생활보조금</strong>은 생계급여·긴급복지 생계지원·가정위탁 양육보조금과 겹쳐 받지 않습니다.
              </>,
              <>
                <strong>학용품비</strong>는 교육급여·장애인복지법 교육비·긴급복지 교육지원과 겹쳐 받지 않고, 둘 다
                자격이 되면 금액이 큰 교육급여가 먼저입니다(
                <Link href="/guide/school-support" className="text-brand underline">
                  교육급여 바우처 안내
                </Link>
                ).
              </>,
            ]}
          />
          <Src page="168·172~173·176·178쪽" />
        </DocSection>

        <DocSection title="소득 기준 — 소득인정액으로 봅니다">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">가구원 수</th>
                  <th className="px-3 py-2 text-right font-semibold">기준 중위소득</th>
                  <th className="px-3 py-2 text-right font-semibold">65%(복지급여)</th>
                  <th className="px-3 py-2 text-right font-semibold">72%(청소년 한부모 증명서)</th>
                </tr>
              </thead>
              <tbody>
                {LINES.map((l) => (
                  <tr key={l.size} className="border-b border-line">
                    <td className="px-3 py-2">{l.size}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{won(l.median)}</td>
                    <td className="px-3 py-2 text-right font-bold tabular-nums">{won(l.p65)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{won(l.p72)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            비교하는 값은 월급이 아니라 <strong>소득인정액</strong>(소득에서 공제를 뺀 값에 재산을 소득으로 환산해
            더한 값)입니다. 근로·사업소득은 30% 공제가 기본이고, <strong>34세 이하 수급(권)자</strong>와 대학생은
            &ldquo;60만원을 공제하고, 나머지 금액에 대해 30% 추가공제&rdquo;를 적용합니다(2026년에 40만원에서 60만원,
            29세 이하에서 34세 이하로 넓어졌습니다). 정부가 먼저 주는 양육비 선지급금은 소득을 계산할 때
            사적이전소득으로 반영합니다.
          </p>
          <Src page="3~4·88~90·100쪽" />
          <p>
            내 소득이 기준선의 어디쯤인지는{" "}
            <Link href="/check" className="text-brand underline">
              소득 자가진단
            </Link>
            으로 가늠해 볼 수 있습니다. 재산 환산까지는 하지 않으니 참고로만 봐 주세요.
          </p>
        </DocSection>

        <DocSection title="누가 한부모가족인가">
          <p>
            배우자와 사별·이혼했거나 배우자에게 유기된 사람, 정신·신체장애로 6개월 이상 근로능력을 잃은 배우자를 둔
            사람, 미혼모·미혼부가 18세 미만(취학 중이면 22세 미만) 자녀를 키우는 가족입니다. 부모에게 사실상 부양을
            받지 못하는 손자녀를 조부모가 키우면 조손가족으로 지원합니다.
          </p>
          <DocNote title="사실혼이면 미혼 한부모로 보지 않습니다">
            혼인신고만 안 했을 뿐 함께 사는 사실혼 관계라면 지원대상이 아닙니다. 사실혼 여부는 같은 주소지, 양가
            행사 참여 기록, 경제공동체를 보여 주는 통장 등을 종합해 판단합니다. 반대로 추가 아동양육비의 「미혼」은
            가족관계등록부에 법률상 혼인 기록이 없는 경우라, 이혼 뒤 사실혼 관계에서 낳은 자녀를 키우는 경우는 미혼
            한부모로 보지 않습니다.
          </DocNote>
          <Src page="21·45·174쪽" />
        </DocSection>

        <DocSection title="신청과 문의">
          <p>
            주민등록상 주소지나 <strong>실제로 사는 곳</strong>의 읍·면·동 주민센터, 또는 복지로에서{" "}
            <strong>연중</strong> 신청합니다. 실거주지에서 신청해도 급여를 주는 곳은 주민등록상 주소지 시·군·구입니다.
            부 또는 모가 24세 이하면 신청서의 청소년한부모 칸을 꼭 체크합니다. 가족 전체가 이사하면 전입일이
            15일 이전이면 새 주소지가, 16일 이후면 옛 주소지가 그달 급여를 줍니다.
          </p>
          <p>
            아동양육비를 신청할 때 <strong>양육비이행관리원</strong>의 양육비 이행 지원(상담·소송·선지급)도 함께
            안내하게 돼 있습니다. 양육비를 받지 못하고 있다면 같이 물어보세요.
          </p>
          <Src page="22·33·174쪽, 앞 안내면" />
          <p>
            문의: 가족상담전화 <strong>1577-4206</strong> · 양육비이행관리원 <strong>1644-6621</strong> ·
            보건복지상담센터 <strong>129</strong>
          </p>
          <ul className="space-y-1 text-sm">
            {[MAIN, TEEN].filter(Boolean).map((s) => (
              <li key={s!.id}>
                <Link href={`/service/${s!.id}`} className="text-brand underline">
                  {s!.name} — 복지로 원문 →
                </Link>
              </li>
            ))}
          </ul>
          <DocNote>
            이 글은 성평등가족부 지침과 복지로 원문을 옮기고 금액을 더해 본 것이며, 받을 수 있는지 판정하지 않습니다.
            소득인정액은 재산·부채·공제에 따라 달라지니 실제 대상 여부와 금액은 주민센터 조사 결과로 확인해 주세요.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="single-parent-support" />
    </>
  );
}
