import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocList, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";

const G = guideBySlug("unemployment")!;

export const metadata: Metadata = {
  title: "실업급여 신청 — 이직일 다음 날부터 12개월, 그 안에 다 받아야 합니다",
  description:
    "실업급여는 구직급여와 취업촉진 수당 넷을 합친 말입니다. 받을 수 있는 날수(120~270일)와 별개로 이직일 다음 날부터 12개월이라는 기한이 따로 걸립니다. 고용보험법 조문을 그대로 옮겼습니다.",
  alternates: { canonical: "/guide/unemployment" },
};

/*
  ── 이 글은 다른 열다섯 편과 성격이 다르다 ──────────────────────────

  나머지는 전부 **수록한 데이터를 집계해서** 쓴 글이다. 이 글에는 집계
  숫자가 하나도 없다. 실업급여가 우리 목록에 아예 없기 때문이다.

  그래서 근거를 전부 법령과 정부 안내로만 세웠다. 조문은 법제처
  국가법령정보센터에서 전문을 받아 대조했다(2026-09-07 확인, 「고용보험법」
  시행 2026-08-20 / 「고용보험법 시행령」 시행 2026-07-01).

  ── 하지 않는 것 ────────────────────────────────────────────────
  · **수급 자격 판정을 하지 않는다.** 제40조의 요건을 옮기기만 하고
    "당신은 됩니다/안 됩니다"라고 말하지 않는다(CLAUDE.md 3절).
  · **자진 퇴사·권고사직 같은 이직 사유를 해석하지 않는다.** 제58조는
    아예 펼치지 않았다. 그건 고용센터가 하는 판단이다.
  · **금액을 우리가 계산해 주지 않는다.** 조문의 비율과 상한만 옮기고,
    곱한 값은 곱한 값이라고 밝힌다.
*/

/** 「고용보험법」 별표 1 — 구직급여의 소정급여일수(제50조제1항 관련). */
const DAYS_HEAD = [
  "1년 미만",
  "1년 이상 3년 미만",
  "3년 이상 5년 미만",
  "5년 이상 10년 미만",
  "10년 이상",
] as const;

const DAYS_ROWS = [
  { age: "50세 미만", days: ["120일", "150일", "180일", "210일", "240일"] },
  { age: "50세 이상", days: ["120일", "180일", "210일", "240일", "270일"] },
] as const;

const LAW = "https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EA%B3%A0%EC%9A%A9%EB%B3%B4%ED%97%98%EB%B2%95";
const LAW_ENF =
  "https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EA%B3%A0%EC%9A%A9%EB%B3%B4%ED%97%98%EB%B2%95%20%EC%8B%9C%ED%96%89%EB%A0%B9";

/** 조문 원문 상자. 요약하지 않는다 — 지급일 글과 같은 규칙이다. */
function Quote({ children, cite }: { children: string; cite: string }) {
  return (
    <figure className="rounded-xl border border-line bg-sunken px-4 py-3">
      <blockquote className="text-xs leading-relaxed text-slate-600">
        “{children}”
      </blockquote>
      <figcaption className="mt-1.5 text-xs text-muted">{cite}</figcaption>
    </figure>
  );
}

export default function UnemploymentGuide() {
  /* "0건"을 손으로 적지 않는다. 수집이 늘어 실업급여가 들어오는 날이 오면
     이 숫자가 스스로 바뀌어야 한다(guides.ts 머리말의 191건 사고). */
  const inList = services.filter((s) => s.name.includes("실업")).length;

  return (
    <>
      <DocPage
        title={G.title}
        lead="실업급여에서 사람들이 가장 많이 놓치는 것은 자격이 아니라 기한입니다. 받을 수 있는 날수를 다 못 쓰고 끝나는 일이 생깁니다."
        updated="최종 수정 2026-09-07 · 「고용보험법」(시행 2026-08-20)과 같은 법 시행령(시행 2026-07-01) 조문을 대조"
      >
        <DocSection title="먼저, 이건 저희 목록에 없는 제도입니다">
          <p>
            이 사이트는 복지로 공공데이터를 받아 {services.length.toLocaleString()}
            건을 싣고 있습니다. 그 안에 이름이 &ldquo;실업&rdquo;으로 걸리는
            사업은 <strong>{inList}건</strong>입니다.
          </p>
          <p>
            빠뜨린 게 아닙니다. 실업급여는 <strong>고용보험</strong>이고 소관이
            고용노동부라, 복지 사업을 모으는 창구에 애초에 들어오지 않습니다.
            그래서 이 글에는 저희가 센 숫자가 한 줄도 없습니다.{" "}
            <strong>전부 법령과 정부 안내에서 옮겼습니다.</strong>
          </p>
          <p>
            그런데도 쓴 이유는 사람들이 이 말을 아주 많이 찾기 때문입니다.
            저희가 다루는 어떤 복지 제도보다도 많이 찾습니다. 데이터에 없다고
            없는 척하는 것보다, 어디로 가야 하는지를 정확히 알려 드리는 편이
            낫다고 봤습니다.
          </p>
        </DocSection>

        <DocSection title="실업급여는 하나가 아니라 다섯입니다">
          <p>
            &ldquo;실업급여&rdquo;는 낱개 제도의 이름이 아니라{" "}
            <strong>묶음의 이름</strong>입니다. 흔히 실업급여라고 부르는 것은
            그중 <strong>구직급여</strong> 하나입니다.
          </p>
          <Quote cite="「고용보험법」 제37조(실업급여의 종류)">
            ①실업급여는 구직급여와 취업촉진 수당으로 구분한다. ②취업촉진
            수당의 종류는 다음 각 호와 같다. 1. 조기(早期)재취업 수당 2.
            직업능력개발 수당 3. 광역 구직활동비 4. 이주비
          </Quote>
          <p>
            나머지 넷은 <strong>구직급여를 받는 동안</strong> 조건이 맞으면
            따로 신청하는 것들입니다. 일찍 재취업했을 때, 훈련을 받을 때, 먼
            곳으로 면접을 보러 갈 때, 취업 때문에 이사할 때 — 각각 다른 문이
            열립니다. 구직급여만 알고 끝내면 나머지 넷은 신청할 기회가 없습니다.
          </p>
        </DocSection>

        <DocSection title="날수와 기한은 별개입니다 — 여기서 가장 많이 잃습니다">
          <p>
            받을 수 있는 <strong>날수</strong>가 정해져 있고, 그와 <strong>별도로</strong>{" "}
            언제까지 받을 수 있는지 <strong>기한</strong>이 또 걸립니다. 둘 중
            먼저 끝나는 쪽에서 멈춥니다.
          </p>
          <Quote cite="「고용보험법」 제48조(수급기간 및 수급일수) 제1항">
            구직급여는 이 법에 따로 규정이 있는 경우 외에는 그 구직급여의
            수급자격과 관련된 이직일의 다음 날부터 계산하기 시작하여 12개월
            내에 제50조제1항에 따른 소정급여일수를 한도로 하여 지급한다.
          </Quote>
          <p>고용노동부는 이 조문을 이렇게 풀어 안내합니다.</p>
          <Quote cite="고용노동부 자주 하는 질문 — 실업급여 신청방법">
            실업급여는 이직일의 다음날부터 12개월을 초과하면 소정급여일수가
            남아있더라도 지급을 받을 수 없음
          </Quote>
          <DocNote title="그래서 미루면 그만큼 없어집니다">
            퇴사하고 몇 달 쉬다가 신청하면, 12개월이라는 창은 퇴사한 다음 날부터
            이미 줄고 있습니다. 법은 &ldquo;이직 후 지체없이&rdquo; 신고하라고만
            적어 두고 신청 마감일을 따로 두지 않았는데, 그 대신 이 12개월이
            사실상의 마감 구실을 합니다.
          </DocNote>
          <p className="text-xs text-muted">
            임신·출산·육아나 질병처럼 취업할 수 없는 사유를 수급기간 안에
            신고하면 그 기간만큼 12개월에 더해 줍니다(최대 4년). 같은 조 제2항·제3항에
            적혀 있습니다. 해당하는지는 고용센터에서 확인해 주세요.
          </p>
        </DocSection>

        <DocSection title="며칠분을 받나 — 나이와 가입기간으로 갈립니다">
          <p>
            날수는 <strong>이직일 현재 나이</strong>와{" "}
            <strong>고용보험 피보험기간</strong> 두 가지로 정해집니다. 법이
            표로 못 박아 두었습니다.
          </p>
          {/* 표는 375px에서 넘친다. 페이지 본문이 아니라 이 상자만 옆으로
              밀리게 한다(CLAUDE.md 검증 루틴 5번). */}
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[34rem] border-collapse text-xs">
              <caption className="sr-only">
                구직급여의 소정급여일수 — 고용보험법 별표 1
              </caption>
              <thead>
                <tr className="bg-sunken text-left">
                  <th scope="col" className="px-3 py-2 font-bold text-ink">
                    이직일 현재 연령
                  </th>
                  {DAYS_HEAD.map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-3 py-2 font-bold whitespace-nowrap text-ink"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {DAYS_ROWS.map((r) => (
                  <tr key={r.age}>
                    <th
                      scope="row"
                      className="px-3 py-2 text-left font-semibold whitespace-nowrap text-slate-700"
                    >
                      {r.age}
                    </th>
                    {r.days.map((d, i) => (
                      <td
                        key={DAYS_HEAD[i]}
                        className="px-3 py-2 tabular-nums whitespace-nowrap text-slate-700"
                      >
                        {d}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            「고용보험법」 별표 1 — 구직급여의 소정급여일수(제50조제1항 관련),
            개정 2019. 8. 27.
          </p>
          <Quote cite="「고용보험법」 별표 1 비고">
            「장애인고용촉진 및 직업재활법」 제2조제1호에 따른 장애인은 50세
            이상인 것으로 보아 위 표를 적용한다.
          </Quote>
        </DocSection>

        <DocSection title="처음 7일은 나오지 않습니다">
          <Quote cite="「고용보험법」 제49조(대기기간) 제1항">
            제44조에도 불구하고 제42조에 따른 실업의 신고일부터 계산하기
            시작하여 7일간은 대기기간으로 보아 구직급여를 지급하지 아니한다.
            다만, 최종 이직 당시 건설일용근로자였던 사람에 대해서는 제42조에
            따른 실업의 신고일부터 계산하여 구직급여를 지급한다.
          </Quote>
          <p>
            기준이 <strong>퇴사한 날이 아니라 신고한 날</strong>이라는 점이
            중요합니다. 신고가 늦으면 대기기간 7일도 그만큼 뒤로 밀립니다.
          </p>
        </DocSection>

        <DocSection title="얼마를 받나 — 비율과 상한만 법에 있습니다">
          <Quote cite="「고용보험법」 제46조(구직급여일액) 제1항제1호">
            제45조제1항부터 제3항까지 및 제5항의 경우에는 그 수급자격자의
            기초일액에 100분의 60을 곱한 금액
          </Quote>
          <p>
            여기서 <strong>기초일액</strong>은 마지막 이직 당시의 평균임금입니다
            (제45조제1항). 그런데 그 평균임금이 아무리 높아도 위로 뚜껑이
            있습니다.
          </p>
          <Quote cite="「고용보험법 시행령」 제68조(급여기초 임금일액의 상한액) 제1항">
            법 제45조제5항에 따라 구직급여의 산정 기초가 되는 임금일액이
            11만3500원을 초과하는 경우에는 11만3500원을 해당 임금일액으로 한다.
          </Quote>
          <DocNote tone="brand" title="6만 8,100원은 조문에 없는 숫자입니다">
            위 두 조문을 곱하면 하루 <strong>6만 8,100원</strong>이 나옵니다
            (11만 3,500원 × 100분의 60). 다만 이 값은 <strong>조문에 적힌
            금액이 아니라 저희가 곱한 값</strong>입니다. 저희는 원문에 있는
            숫자만 그대로 옮기고, 계산한 것은 계산했다고 밝힙니다.
          </DocNote>
          <p>
            <strong>아래쪽 뚜껑은 사람마다 다릅니다.</strong> 하한은 &ldquo;이직
            전 1일 소정근로시간 × 이직일 당시 최저임금&rdquo;의 100분의 80으로
            정해지는데(제45조제4항·제46조제1항제2호), 앞의 소정근로시간이
            사람마다 달라 하나의 금액으로 적을 수가 없습니다.{" "}
            <strong>확인하지 못한 것은 적지 않습니다.</strong> 본인 금액은
            고용보험 모의계산이나 고용센터에서 확인해 주세요.
          </p>
        </DocSection>

        <DocSection title="어디로 가나">
          <p>
            법은 <strong>출석해서 신고하라</strong>고 정합니다. 온라인만으로는
            끝나지 않습니다.
          </p>
          <Quote cite="「고용보험법」 제42조(실업의 신고) 제1항·제2항">
            ①구직급여를 지급받으려는 사람은 이직 후 지체없이 직업안정기관에
            출석하여 실업을 신고하여야 한다. … ②제1항에 따른 실업의 신고에는
            구직 신청과 제43조에 따른 수급자격의 인정신청을 포함하여야 한다.
          </Quote>
          <p>고용노동부가 안내하는 순서는 이렇습니다.</p>
          <DocList
            items={[
              <>
                <strong>고용24에서 구직 신청</strong> — 온라인으로 먼저
                등록합니다.
              </>,
              <>
                <strong>수급자격 신청자 온라인 교육</strong> — 고용센터에 가기
                전에 미리 받아 둡니다.
              </>,
              <>
                <strong>거주지 관할 고용센터 방문</strong> — 신분증을 가지고
                취업지원 설명회에 참석합니다.
              </>,
              <>
                <strong>수급자격 인정신청서·재취업활동계획서 제출</strong>
              </>,
              <>
                <strong>접수 후 14일 이내 인정 여부 결정</strong> — 인정되면
                이후 1~4주마다 실업인정을 받습니다.
              </>,
            ]}
          />
          <p>
            <a
              href="https://www.work24.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline"
            >
              고용24 (work24.go.kr) 바로가기 →
            </a>
            <span className="text-muted"> · 고용노동부 상담 국번 없이 1350</span>
          </p>
          <p className="text-xs text-muted">
            이직확인서는 회사가 냅니다. 필요하면 이직 전 사업주에게 발급을
            요청할 수 있고, 요청받은 사업주는 발급해 주어야 합니다(제42조제3항).
            급여는 본인 명의의 실업급여수급계좌로 들어옵니다(제37조의2제1항).
          </p>
        </DocSection>

        <DocSection title="저희가 하지 않는 것">
          <p>
            <strong>자격이 되는지 저희는 판정하지 않습니다.</strong> 피보험
            단위기간이 180일을 넘는지(제40조제1항제1호), 이직 사유가 수급자격
            제한에 걸리는지(제58조) 같은 것은 고용센터가 확인해 결정합니다.
            이 사이트는 어디에 무엇이 적혀 있는지까지만 알려 드립니다.
          </p>
          <DocNote>
            법령은 개정됩니다. 이 글의 조문은{" "}
            <strong>2026년 9월 7일에 국가법령정보센터에서 대조한 것</strong>이고,
            금액과 요건은 그 뒤에 바뀌었을 수 있습니다. 실제 신청 전에는 위
            법령 링크나 고용24에서 한 번 더 확인해 주세요.
          </DocNote>
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <a
              href={LAW}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline"
            >
              고용보험법 원문 →
            </a>
            <a
              href={LAW_ENF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline"
            >
              고용보험법 시행령 원문 →
            </a>
          </p>
          <p>
            <Link href="/guide/pay-dates" className="text-brand underline">
              복지 지원금은 매월 며칠에 들어오나 →
            </Link>
          </p>
        </DocSection>
      </DocPage>
      <GuideNav current="unemployment" />
    </>
  );
}
