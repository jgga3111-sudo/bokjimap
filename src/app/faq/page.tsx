import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/Doc";
import { BASE_YEAR, medianIncome, thresholdOf } from "@/lib/midIncome";
import { won } from "@/lib/display";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description:
    "기준 중위소득이 무엇인지, 소득인정액과 어떻게 다른지, 건강보험료로 왜 소득을 가늠할 수 있는지 등 복지 신청 전에 헷갈리는 것들을 정리했습니다.",
  alternates: { canonical: "/faq" },
};

/**
 * 질문은 실제로 헷갈리는 것만 넣는다. "복지맵이란 무엇인가요" 같은 자문자답은
 * 넣지 않는다 — 그건 소개 페이지가 할 일이고, 여기 채우면 분량만 는다.
 *
 * 답변은 검색 결과에 스니펫으로 그대로 노출될 수 있으므로, 첫 문장에서 답이
 * 끝나게 쓴다.
 */
const FAQ: { q: string; a: React.ReactNode; plain: string }[] = [
  {
    q: "기준 중위소득이 무엇인가요?",
    a: (
      <>
        <p>
          우리나라 모든 가구를 소득 순으로 줄 세웠을 때 정확히 가운데 있는
          가구의 소득입니다. 평균이 아니라 중앙값이라, 소득이 아주 높은 일부에
          휘둘리지 않습니다.
        </p>
        <p>
          정부는 매년 7~8월 중앙생활보장위원회에서 다음 해 값을 정하고, 이걸
          기준으로 복지 사업의 자격선을 &ldquo;중위소득 몇 % 이하&rdquo; 식으로
          정합니다. {BASE_YEAR}년 1인 가구는 {won(medianIncome(1))}, 4인 가구는{" "}
          {won(medianIncome(4))}입니다.
        </p>
      </>
    ),
    plain: `우리나라 모든 가구를 소득 순으로 줄 세웠을 때 가운데 있는 가구의 소득입니다. 정부가 매년 고시하며, ${BASE_YEAR}년 1인 가구는 ${won(medianIncome(1))}, 4인 가구는 ${won(medianIncome(4))}입니다. 복지 사업의 자격선은 대부분 이 값의 몇 % 이하로 정해집니다.`,
  },
  {
    q: "소득인정액은 제 월급과 다른가요?",
    a: (
      <>
        <p>
          다릅니다. 소득인정액은 <strong>소득평가액 + 재산의 소득환산액</strong>
          입니다. 월급에서 근로소득공제를 뺀 금액에, 집·자동차·예금 같은 재산을
          정해진 비율로 소득처럼 환산해 더합니다.
        </p>
        <p>
          그래서 월급이 기준을 조금 넘어도 대상이 될 수 있고, 반대로 소득이
          적어도 재산 때문에 탈락할 수 있습니다. 이 사이트의 자가진단은 소득만
          보는 1차 가늠이라, 실제 판정은 주민센터에서 받으셔야 합니다.
        </p>
      </>
    ),
    plain:
      "다릅니다. 소득인정액은 소득평가액에 재산의 소득환산액을 더한 값입니다. 월급에서 근로소득공제를 빼고, 집·자동차·예금 같은 재산을 정해진 비율로 환산해 더합니다. 그래서 월급이 기준을 조금 넘어도 대상이 될 수 있고, 소득이 적어도 재산 때문에 탈락할 수 있습니다.",
  },
  {
    q: "건강보험료로 어떻게 소득을 알 수 있나요?",
    a: (
      <>
        <p>
          직장가입자의 건강보험료는 보수월액에 정해진 요율을 곱해서 나오기
          때문에, 거꾸로 계산하면 소득이 나옵니다. {BASE_YEAR}년 요율은 7.19%이고
          회사와 절반씩 부담하므로, 본인부담 보험료를 3.595%로 나누면 보수월액이
          됩니다.
        </p>
        <p>
          <strong>지역가입자는 이 방식이 통하지 않습니다.</strong> 지역가입자
          보험료에는 소득뿐 아니라 재산 점수가 함께 반영되기 때문입니다. 그래서
          자가진단의 건강보험료 입력은 직장가입자에게만 제공합니다.
        </p>
      </>
    ),
    plain: `직장가입자의 건강보험료는 보수월액에 요율을 곱해 나오므로 거꾸로 계산할 수 있습니다. ${BASE_YEAR}년 요율 7.19%를 회사와 절반씩 부담하므로, 본인부담 보험료를 3.595%로 나누면 보수월액이 됩니다. 지역가입자는 재산 점수가 함께 반영돼 이 방식으로 계산할 수 없습니다.`,
  },
  {
    q: "차상위계층은 무엇인가요?",
    a: (
      <>
        <p>
          기초생활수급자는 아니지만 소득인정액이{" "}
          <strong>기준 중위소득 50% 이하</strong>인 계층입니다. {BASE_YEAR}년
          기준 1인 가구 {won(thresholdOf(1, 50))}, 4인 가구{" "}
          {won(thresholdOf(4, 50))} 이하입니다.
        </p>
        <p>
          통신요금 감면, 문화누리카드, 자산형성지원 등 차상위계층을 대상으로 한
          사업이 따로 있어서, 수급자가 아니라고 포기하기 전에 확인해 볼 값어치가
          있습니다.
        </p>
      </>
    ),
    plain: `기초생활수급자는 아니지만 소득인정액이 기준 중위소득 50% 이하인 계층입니다. ${BASE_YEAR}년 1인 가구 ${won(thresholdOf(1, 50))}, 4인 가구 ${won(thresholdOf(4, 50))} 이하입니다.`,
  },
  {
    q: "생계·의료·주거·교육급여는 각각 기준이 다른가요?",
    a: (
      <>
        <p>
          네. 국민기초생활보장법이 급여마다 다른 기준선을 정해 두었습니다.
          생계급여는 기준 중위소득 32%, 의료급여 40%, 주거급여 48%, 교육급여
          50% 이하입니다.
        </p>
        <p>
          그래서 소득이 같아도 어떤 급여는 받고 어떤 급여는 못 받을 수 있습니다.
          네 가지를 한 번에 신청하면 해당하는 것만 결정됩니다. 가구원 수별 금액은{" "}
          <Link href="/check" className="text-brand underline">
            자가진단
          </Link>{" "}
          페이지의 표에 정리해 두었습니다.
        </p>
      </>
    ),
    plain:
      "네. 생계급여는 기준 중위소득 32%, 의료급여 40%, 주거급여 48%, 교육급여 50% 이하로 각각 다릅니다. 소득이 같아도 어떤 급여는 받고 어떤 급여는 못 받을 수 있습니다.",
  },
  {
    q: "여기서 바로 신청할 수 있나요?",
    a: (
      <>
        <p>
          아닙니다. 복지맵은 정보를 모아 보여주는 민간 사이트이고, 신청은 각
          사업의 공식 창구에서 하셔야 합니다.
        </p>
        <p>
          대부분은 주소지 읍·면·동 주민센터나{" "}
          <a
            href="https://www.bokjiro.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline"
          >
            복지로
          </a>
          에서 신청합니다. 각 서비스 상세 페이지 아래의 공식 안내 링크를
          따라가시면 됩니다.
        </p>
      </>
    ),
    plain:
      "아닙니다. 복지맵은 정보를 모아 보여주는 민간 사이트입니다. 신청은 주소지 읍·면·동 주민센터나 복지로 등 각 사업의 공식 창구에서 하셔야 합니다.",
  },
  {
    q: "우리 동네 사업이 안 보입니다.",
    a: (
      <>
        <p>
          두 가지 경우입니다. 첫째, 해당 지자체가 공공데이터포털에 그 사업을
          등록하지 않은 경우입니다. 사업이 없는 게 아니라 데이터에 없는
          것입니다.
        </p>
        <p>
          둘째, 아직 저희가 수록하지 않은 경우입니다. 전체 5,219건 중 조회수가
          높은 것부터 순서대로 채우고 있어서, 조회수가 낮은 사업은 나중에
          들어옵니다. 시청·군청·구청 홈페이지의 복지 안내도 함께 확인해 보세요.
        </p>
      </>
    ),
    plain:
      "해당 지자체가 공공데이터포털에 사업을 등록하지 않았거나, 아직 저희가 수록하지 않은 경우입니다. 전체 5,219건 중 조회수가 높은 것부터 순서대로 채우고 있습니다.",
  },
  {
    q: "정보가 실제와 다릅니다.",
    a: (
      <>
        <p>
          알려주시면 확인해서 고치겠습니다.{" "}
          <Link href="/contact" className="text-brand underline">
            문의하기
          </Link>
          에서 어느 페이지의 어느 부분인지 적어 주세요.
        </p>
        <p>
          다만 원본 데이터 자체가 갱신되지 않아 생긴 차이는 저희가 고칠 수
          없습니다. 그런 경우에도 알려주시면 해당 항목에 주의 표시를 하거나
          제공기관에 정정을 요청하겠습니다.
        </p>
      </>
    ),
    plain:
      "문의하기에서 어느 페이지의 어느 부분인지 알려주시면 확인해 고치겠습니다. 원본 데이터 자체가 갱신되지 않아 생긴 차이는 제공기관에 정정을 요청합니다.",
  },
  {
    q: "정보는 얼마나 자주 갱신되나요?",
    a: (
      <>
        <p>
          복지 서비스 목록은 공공데이터포털 API에서 주기적으로 다시 받아옵니다.
          기준 중위소득은 매년 7~8월 고시가 나오면 갱신합니다.
        </p>
        <p>
          각 서비스 상세 페이지 아래에 원본의 최종수정일을 적어 두었으니, 그
          날짜를 확인하시면 얼마나 최신인지 알 수 있습니다. 자세한 내용은{" "}
          <Link href="/source" className="text-brand underline">
            데이터 출처
          </Link>
          를 참고하세요.
        </p>
      </>
    ),
    plain:
      "복지 서비스 목록은 공공데이터포털 API에서 주기적으로 다시 받아오고, 기준 중위소득은 매년 7~8월 고시가 나오면 갱신합니다. 각 서비스 상세 페이지에 원본 최종수정일을 표시합니다.",
  },
];

export default function FaqPage() {
  /* FAQPage 구조화 데이터. 검색 결과에서 질문이 펼쳐질 수 있다. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.plain },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DocPage
        title="자주 묻는 질문"
        lead="복지 신청 전에 가장 많이 헷갈리는 것들을 정리했습니다. 여기에 없는 것은 문의로 알려주세요."
      >
        <div className="space-y-8">
          {FAQ.map((f, i) => (
            <section key={f.q}>
              <h2 className="flex gap-2 text-base font-bold text-ink sm:text-lg">
                <span aria-hidden className="shrink-0 text-brand">
                  Q{i + 1}.
                </span>
                <span className="min-w-0">{f.q}</span>
              </h2>
              <div className="mt-2 space-y-3 border-l-2 border-line pl-4 text-sm leading-relaxed text-slate-700">
                {f.a}
              </div>
            </section>
          ))}
        </div>

        <div className="rounded-xl border border-line bg-slate-50 px-4 py-4 text-sm leading-relaxed text-slate-600">
          <p className="font-bold text-ink">더 정확한 상담이 필요하시면</p>
          <p className="mt-1">
            보건복지상담센터 <strong>129</strong>(국번없이) 또는 주소지 읍·면·동
            주민센터로 문의하세요. {SITE.name}은 개별 자격 상담을 제공하지
            않습니다.
          </p>
        </div>
      </DocPage>
    </>
  );
}
