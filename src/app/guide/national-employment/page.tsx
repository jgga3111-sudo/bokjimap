import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocList, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import { thresholdOf, BASE_YEAR } from "@/lib/midIncome";
import { won } from "@/lib/display";

const G = guideBySlug("national-employment")!;
const S = services.find((s) => s.id === "WLF00003245");

export const metadata: Metadata = {
  title: "국민취업지원제도 구직촉진수당 — 줄거나 끊기는 경우와 실업급여와의 관계",
  description:
    "구직촉진수당은 월 60만원(부양가족 1인당 10만원 추가)을 최대 6개월 받지만, 실업급여를 받은 지 6개월이 안 됐거나 일해서 번 돈이 일정액을 넘으면 줄거나 안 나옵니다. 법·시행령·시행규칙과 고용노동부 고시 원문으로 확인했습니다.",
  alternates: { canonical: "/guide/national-employment" },
};

/*
  왜 이 글인가 (2026-09-19 아침 루틴).

  복지로 조회수 43위(258,002)인데 「복지클릭이 따로 확인한 것」이 없던 사업이다.
  네이버 데이터랩 6~8월 월평균이 실업급여의 약 0.95배라 검색량도 크다.

  복지로 원문은 두 유형과 금액(월 60만원 + 부양가족 1인당 10만원, 최대 6개월)을
  이미 적고 있다. 없는 것은 **언제 줄고 언제 끊기는지**다. 그건 조문에 있다.

  ── 출처 (전부 법제처 DRF API로 전문을 받아 대조, 2026-09-19) ──────────
  · 「구직자 취업촉진 및 생활안정지원에 관한 법률」 시행 2024-02-09(공포 2023-08-08)
  · 같은 법 시행령 시행 2024-02-09 · 시행규칙 시행 2024-02-13
  · 고용노동부 고시 「국민취업지원제도 운영규정」 제2026-35호(2026-05-28 시행)

  ── 옮기며 걸린 것 ──────────────────────────────────────────────
  · 나이가 법 제6조는 「15세 이상 64세 이하」, 복지로 원문은 「15~69세」다. 어긋난 게
    아니라 고시 제2조가 **별표1에 든 취업취약계층에게만** 69세까지 연다. 둘 다 적었다.
  · 금액은 법에 없다. 제19조가 고용정책심의회 심의로 정한다고만 적는다. 그래서 금액은
    복지로 원문을 따르고, 법령에서는 규칙만 옮겼다.
  · 취업성공수당의 조건·금액도 심의회가 정한다(제17조제2항). 원문의 「최대 150만원」만 옮긴다.
*/

const LAW = "https://www.law.go.kr/법령/구직자취업촉진및생활안정지원에관한법률";
const DEC = "https://www.law.go.kr/법령/구직자취업촉진및생활안정지원에관한법률시행령";
const RULE = "https://www.law.go.kr/법령/구직자취업촉진및생활안정지원에관한법률시행규칙";
const GOSI = "https://www.law.go.kr/행정규칙/국민취업지원제도운영규정";
const CHECKED = "2026-09-19";

/** 조문 원문 상자. 요약하지 않는다(실업급여 글과 같은 규칙). */
function Quote({ children, cite }: { children: string; cite: string }) {
  return (
    <figure className="rounded-xl border border-line bg-sunken px-4 py-3">
      <blockquote className="text-xs leading-relaxed text-slate-600">“{children}”</blockquote>
      <figcaption className="mt-1.5 text-xs text-muted">{cite}</figcaption>
    </figure>
  );
}

/**
 * 시행령 제9조의2 — 신고소득이 월지급액을 넘을 때.
 * 기준금액 = max(월지급액 × 2, 1인 가구 기준 중위소득 60%).
 * 신고소득 ≤ 기준금액이면 (기준금액 − 신고소득)을 월지급액 안에서, 넘으면 정지.
 */
function paid(monthly: number, income: number): number | null {
  if (income <= monthly) return monthly; // 법 제21조제4항: 월지급액을 넘을 때만 감액·정지
  const base = Math.max(monthly * 2, thresholdOf(1, 60));
  if (income > base) return null;
  return Math.min(monthly, base - income);
}

const EXAMPLES = [
  { monthly: 600_000, label: "월 60만원(부양가족 없음)" },
  { monthly: 800_000, label: "월 80만원(부양가족 2명)" },
] as const;
const INCOMES = [500_000, 1_000_000, 1_400_000, 1_700_000] as const;

export default function NationalEmploymentGuide() {
  const line60 = thresholdOf(1, 60);

  return (
    <>
      <DocPage
        title={G.title}
        lead="구직촉진수당은 신청만 하면 여섯 달 내내 나오는 돈이 아닙니다. 달마다 할 일을 해야 나오고, 일해서 번 돈이나 다른 수당에 따라 줄거나 멈춥니다. 그 규칙이 법령에 적혀 있습니다."
        updated={`최종 수정 ${G.updated} · 법·시행령·시행규칙과 고용노동부 고시를 ${CHECKED}에 대조`}
      >
        <DocSection title="두 유형 — 수당이 나오는 쪽은 Ⅰ유형입니다">
          <p>
            복지로 원문은 참여자를 소득과 재산으로 두 유형으로 나눕니다. 둘 다 취업지원서비스(상담·직업훈련·일경험 등)는
            받지만, <strong>매달 현금으로 나오는 구직촉진수당은 Ⅰ유형만</strong> 받습니다.
          </p>
          <DocList
            items={[
              <>
                <strong>Ⅰ유형 — 구직촉진수당:</strong> 원문은 월 60만원에 부양가족(18세 이하·70세 이상·중증장애인)
                1인당 10만원씩 더해 월 60~100만원, 최대 6개월이라고 적습니다.
              </>,
              <>
                <strong>Ⅱ유형 — 취업활동비용:</strong> 원문은 「취업활동계획수립 참여수당 15~25만원 등」이라고 적습니다.
              </>,
              <>
                <strong>공통 — 취업성공수당:</strong> 원문은 「최대 150만원(중위소득 60% 이하 및 특정계층)」이라고 적습니다.
                지급 조건과 금액은 법이 아니라 고용정책심의회가 정합니다(법 제17조제2항).
              </>,
            ]}
          />
          <p className="text-xs text-muted">
            금액은 법에 적혀 있지 않습니다. 법 제19조는 고용노동부장관이 고용정책심의회 심의를 거쳐 정한다고만 적어서,
            금액은 복지로 원문({BASE_YEAR}년 기준)을 옮겼습니다.
          </p>
        </DocSection>

        <DocSection title="Ⅰ유형의 요건 넷">
          <p>법 제7조제1항이 네 가지를 모두 갖추라고 적고, 구체적인 수치는 시행령과 고시가 정합니다.</p>
          <DocList
            items={[
              <>
                취업지원서비스 요건을 갖출 것 — 근로능력과 구직의사가 있는데 취업하지 못했고, 신청 당시{" "}
                <strong>15세 이상 64세 이하</strong>(법 제6조).
              </>,
              <>
                가구 월평균 총소득이 <strong>기준 중위소득 60% 이하</strong>(시행령 제3조제1항).
              </>,
              <>
                가구원 재산 합계가 <strong>4억원 이하</strong>, 15~34세 청년은 <strong>5억원 이하</strong>(시행령 제3조제3항 ·
                고시 제5조의2).
              </>,
              <>
                신청일 전 2년 안에 <strong>일한 기간이 합해서 100일 또는 800시간 이상</strong>(시행령 제3조제4항).
              </>,
            ]}
          />
          <DocNote title="복지로의 「15~69세」는 어디서 왔나">
            법은 64세까지인데 복지로 원문은 15~69세라고 적습니다. 어긋난 것이 아니라 고시가 넓혀 둔 것입니다 — 고시
            제2조는 <strong>별표1에 든 사람</strong>(기초연금 수급자, 한부모, 북한이탈주민, 건설일용직, 영세 자영업자 등
            27갈래)에게 69세까지 취업지원서비스 수급자격을 인정할 수 있다고 적습니다. 65세 이상이면 이 목록에 드는지부터
            확인해야 합니다.
          </DocNote>
          <p>
            <strong>일한 기간(넷째 요건)이 모자라도 길이 하나 있습니다.</strong> 앞의 세 요건을 갖췄다면 예산 범위에서
            점수로 뽑아 수당을 줄 수 있습니다(법 제7조제2항, 「선발형」). 점수는 소득·재산·미취업 기간·미취학 자녀로
            매기고(고시 별표3), <strong>기준 점수는 예산에 따라 바뀝니다</strong>(고시 제6조제2항). 그래서 몇 점이면
            된다고 적을 수 없습니다.
          </p>
        </DocSection>

        <DocSection title="요건을 갖춰도 수당이 인정되지 않을 수 있는 경우">
          <p>
            법 제7조제3항은 아래에 해당하면 구직촉진수당 수급자격을 <strong>「인정하지 아니할 수 있다」</strong>고
            적습니다. 반드시 안 된다는 뜻은 아니지만, 해당하면 신청 전에 고용센터에 먼저 물어보는 편이 좋습니다.
          </p>
          <DocList
            items={[
              <>
                <strong>실업급여(구직급여)를 받고 있거나, 마지막으로 받은 다음 날부터 6개월이 안 된 사람</strong>
              </>,
              <>생계급여 수급자</>,
              <>학교에 다니거나 학원에서 수강 중인 사람(진학·자격증 준비), 군복무 중인 사람(2개월 안에 전역 예정이면 제외)</>,
              <>
                직접일자리 사업에 참여 중이거나 끝난 지 6개월이 안 된 사람
              </>,
              <>
                나라·지자체의 구직 수당을 받는 중이거나 끝난 지 6개월이 안 된 사람 — 고시는{" "}
                <strong>월평균 50만원 이상이거나 합계 300만원 이상</strong>인 수당으로 정합니다(고시 제9조).
              </>,
              <>
                신청인 <strong>본인</strong>의 월평균 총소득이 1인 가구 기준 중위소득 60% 이상인 사람(시행령 제5조제4항)
              </>,
            ]}
          />
          <p className="text-xs text-muted">출처 법 제7조제3항 · 시행령 제5조 · 고시 제8조·제9조 · {CHECKED} 대조</p>
        </DocSection>

        <DocSection title="실업급여와의 관계 — 한쪽이 시작되면 다른 쪽이 끝납니다">
          <p>
            실업급여(고용보험 구직급여)와 구직촉진수당은 <strong>같이 받는 제도가 아닙니다.</strong> 법령이 양쪽에서
            막아 둡니다.
          </p>
          <DocList
            items={[
              <>
                <strong>실업급여를 먼저 받았다면</strong> — 마지막으로 받은 다음 날부터 6개월 동안은 수당이 인정되지 않을
                수 있습니다(위 첫째 항목).
              </>,
              <>
                <strong>수당을 받다가 실업급여 수급자격이 인정되면</strong> — 그날로 취업지원이 끝납니다.
              </>,
            ]}
          />
          <Quote cite="시행규칙 제20조(취업지원 종료일 등) 제2항제7호">
            「고용보험법」에 따른 구직급여를 받게 된 경우: 구직급여 수급자격의 인정을 받은 날
          </Quote>
          <p>
            <Link href="/guide/unemployment" className="text-brand underline">
              실업급여는 이직일 다음 날부터 12개월 안에 다 받아야 합니다 →
            </Link>
          </p>
        </DocSection>

        <DocSection title="매달 받으려면 — 지정일에 이행 내용을 내야 합니다">
          <p>
            수당은 한 번에 나오지 않고 <strong>1개월 단위</strong>로 나옵니다(법 제20조제4항). 매달 고용센터와 정한
            날(지정일)에 그달 할 일을 한 내용을 내고 신청해야 그달 몫이 나옵니다.
          </p>
          <Quote cite="법 제20조(지급기간 및 지급절차) 제5항 본문">
            {
              '수급자는 취업활동계획 수립이 완료되거나 취업지원ㆍ구직활동지원 프로그램을 이행한 경우 수립된 취업활동계획 또는 취업지원ㆍ구직활동지원 프로그램의 이행 내용을 첨부하여 지급주기 중 고용노동부장관과 수급자가 협의하여 정한 날(이하 "지정일"이라 한다)에 직업안정기관에 직접 또는 「민원 처리에 관한 법률」에 따른 전자적 민원처리를 이용하여 지급주기별로 구직촉진수당을 신청하여야 한다.'
            }
          </Quote>
          <DocList
            items={[
              <>
                <strong>지정일은 7일 안에서 미룰 수 있습니다</strong> — 구인 업체 면접, 직계가족의 사고·질병 간호 등. 미룬
                만큼 지급기간도 늘어납니다(같은 항 단서).
              </>,
              <>
                <strong>6개월은 수급자격 인정 통지를 받은 날부터</strong> 셉니다(법 제20조제1항). 따로 신청하면 최대 1년에
                걸쳐 나눠 받을 수 있지만 <strong>총액은 늘지 않습니다</strong>(같은 조 제2항).
              </>,
              <>
                신청하면 <strong>1개월 안에</strong>(필요하면 7일 더) 결과를 서면으로 알려 줍니다(법 제10조).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="일해서 돈을 벌면 — 줄거나 멈춥니다">
          <p>
            수당을 받는 동안 일하거나 창업하거나 다른 지원금을 받으면 <strong>매달 신청할 때 신고해야</strong> 합니다(법
            제21조제1항). 신고한 소득이 <strong>월 수당액을 넘을 때</strong> 시행령 제9조의2의 셈법으로 줄이거나 멈춥니다.
          </p>
          <DocList
            items={[
              <>
                먼저 <strong>기준금액</strong>을 정합니다 — 「월 수당액 × 2」와 「1인 가구 기준 중위소득 60%」 가운데 큰 쪽.{" "}
                {BASE_YEAR}년 1인 가구 기준 중위소득 60%는 <strong>{won(line60)}</strong>입니다.
              </>,
              <>
                신고소득이 기준금액 이하이면 <strong>「기준금액 − 신고소득」</strong>을 월 수당액 안에서 줍니다.
              </>,
              <>신고소득이 기준금액을 넘으면 그달은 <strong>지급 정지</strong>입니다.</>,
            ]}
          />
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[34rem] border-collapse text-xs">
              <caption className="sr-only">신고소득에 따라 그달 받는 구직촉진수당 — 시행령 제9조의2로 계산한 값</caption>
              <thead>
                <tr className="bg-sunken text-left">
                  <th scope="col" className="px-3 py-2 font-bold text-ink">
                    그달 신고소득
                  </th>
                  {EXAMPLES.map((e) => (
                    <th key={e.monthly} scope="col" className="px-3 py-2 text-right font-bold whitespace-nowrap text-ink">
                      {e.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {INCOMES.map((inc) => (
                  <tr key={inc}>
                    <th scope="row" className="px-3 py-2 text-left font-semibold whitespace-nowrap text-slate-700">
                      {won(inc)}
                    </th>
                    {EXAMPLES.map((e) => {
                      const p = paid(e.monthly, inc);
                      return (
                        <td key={e.monthly} className="px-3 py-2 text-right tabular-nums whitespace-nowrap text-slate-700">
                          {p === null ? "지급 정지" : won(p)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DocNote tone="brand" title="이 표는 저희가 계산한 값입니다">
            시행령 제9조의2의 셈법에 {BASE_YEAR}년 기준 중위소득을 넣어 저희가 계산했습니다. 조문에 적힌 금액이
            아닙니다. 프로그램에 참여해서 번 소득(시행령 제9조제2호)은 따로 다루고, 어떤 돈이 신고소득에 드는지는
            고용센터가 확인합니다.
          </DocNote>
          <DocList
            items={[
              <>
                <strong>줄거나 멈춘 달도 여섯 달 가운데 한 달로 셉니다</strong>(법 제21조제4항 후단). 멈춘 달만큼 뒤로 미뤄
                주지 않습니다.
              </>,
              <>
                소득 때문에 <strong>세 번 멈추면</strong> 수급자격이 철회되고 취업지원이 끝납니다(법 제21조제5항).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="취업하거나 계획을 안 따르면">
          <DocList
            items={[
              <>
                <strong>주 30시간 이상 일자리에 취업하면</strong> 그날로 취업지원이 끝납니다. 일용근로는 여기에 들지
                않습니다(시행규칙 제20조제1항). 이때 취업성공수당은 근로계약서 사본 같은 취업 증명서를 붙여 따로 신청합니다
                (시행규칙 제13조제2항).
              </>,
              <>
                <strong>정당한 사유 없이 취업활동계획을 따르지 않으면</strong> 그달 수당이 중단되거나 일부만 나오고(법
                제26조제1항), <strong>세 번 중단되면 남은 수당을 받을 권리가 없어집니다</strong>(시행령 제11조제4항).
                정당한 사유로 인정되는 것은 본인 질병·부상, 천재지변, 제안받은 일자리 임금이 같은 지역 같은 일의 80%에
                못 미치는 경우 등입니다(시행령 제11조제1항 · 고시 제10조).
              </>,
              <>
                거짓으로 받으면 받은 날 이후 수당이 끊기고 돌려내야 하며, <strong>5년 동안 다시 신청할 수 없습니다</strong>
                (법 제27조·제28조 · 시행령 제12조).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="다시 참여하려면 기다려야 하는 기간">
          <p>
            취업지원이 끝나면 원칙적으로 <strong>3년</strong>이 지나야 다시 신청할 수 있습니다(시행령 제13조제1항). 다만
            <strong> 취업해서 끝난 경우</strong>에는 고시가 취업해 일한 기간에 따라 줄여 둡니다.
          </p>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[26rem] border-collapse text-xs">
              <caption className="sr-only">취업해서 취업지원이 끝난 경우의 재신청 제한기간 — 고시 별표4</caption>
              <thead>
                <tr className="bg-sunken text-left">
                  <th scope="col" className="px-3 py-2 font-bold text-ink">
                    취업지원 종료 뒤 취·창업한 기간
                  </th>
                  <th scope="col" className="px-3 py-2 font-bold text-ink">
                    다시 신청할 수 없는 기간
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {[
                  ["6개월 미만", "2년"],
                  ["6개월 이상 1년 미만", "1년 6개월"],
                  ["1년 이상", "1년"],
                ].map(([a, b]) => (
                  <tr key={a}>
                    <td className="px-3 py-2 whitespace-nowrap text-slate-700">{a}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-slate-700">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            출처 고용노동부 고시 제2026-35호 「국민취업지원제도 운영규정」 별표4(법 제29조제1항제2호·제3호로 끝난 경우) ·{" "}
            {CHECKED} 대조
          </p>
        </DocSection>

        <DocSection title="신청은 어디서">
          <p>
            거주지 관할 고용센터나 읍·면·동 주민센터에서 신청하고, 고용24(work24.go.kr)에서도 됩니다. 문의는 고용노동부
            고객상담센터 <strong>국번 없이 1350</strong>입니다.
          </p>
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문 →
              </Link>
            </p>
          )}
          <DocNote>
            이 글은 법령과 고시를 옮긴 것이며, 누가 대상인지 판정하지 않습니다. 수급자격은 고용센터가 소득·재산·취업
            이력을 조회해 결정합니다. 법령은 {CHECKED}에 국가법령정보센터 현행본(법·시행령 2024-02-09, 시행규칙 2024-02-13
            시행)과 고시 제2026-35호(2026-05-28 시행)로 대조했습니다.
          </DocNote>
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <a href={LAW} target="_blank" rel="noopener noreferrer" className="text-brand underline">
              법 원문 →
            </a>
            <a href={DEC} target="_blank" rel="noopener noreferrer" className="text-brand underline">
              시행령 원문 →
            </a>
            <a href={RULE} target="_blank" rel="noopener noreferrer" className="text-brand underline">
              시행규칙 원문 →
            </a>
            <a href={GOSI} target="_blank" rel="noopener noreferrer" className="text-brand underline">
              운영규정(고시) 원문 →
            </a>
          </p>
        </DocSection>
      </DocPage>
      <GuideNav current="national-employment" />
    </>
  );
}
