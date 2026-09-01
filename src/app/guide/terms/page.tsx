import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { payTypeHelp, cycleHelp } from "@/lib/display";
import { BASE_YEAR } from "@/lib/midIncome";

const G = guideBySlug("terms")!;

export const metadata: Metadata = {
  title: `${G.title} — 복지 용어 풀이`,
  description:
    "소득인정액·차상위계층·부양의무자·바우처·융자·1회성 지원 — 복지 공고문에 설명 없이 등장해 넘어가기 쉬운 말들을 뜻과 함께 정리했습니다.",
  alternates: { canonical: "/guide/terms" },
};

/**
 * 용어 풀이.
 *
 * 지급형태·주기 설명은 `display.ts`의 것을 그대로 가져다 쓴다. 여기서 새로
 * 쓰면 같은 말을 사이트 두 곳에서 다르게 설명하게 된다 — 상세 페이지에서는
 * "갚아야 하는 돈"이라고 하고 여기서는 다르게 적히는 식으로.
 */
type Term = {
  id: string;
  word: string;
  /** 한 줄 정의. 여기서 답이 끝나게 쓴다. */
  short: string;
  body: React.ReactNode;
};

const TERMS: Term[] = [
  {
    id: "median",
    word: "기준 중위소득",
    short:
      "우리나라 모든 가구를 소득 순으로 줄 세웠을 때 가운데 있는 가구의 소득입니다.",
    body: (
      <p>
        평균이 아니라 중앙값이라 소득이 아주 높은 일부에 휘둘리지 않습니다.
        정부가 매년 고시하고, 복지 사업의 자격선은 대부분 이 값의
        &ldquo;몇 % 이하&rdquo;로 정해집니다. {BASE_YEAR}년 가구원 수별 금액은{" "}
        <Link href="/check#median-table" className="text-brand underline">
          기준 중위소득 표
        </Link>
        에 있습니다.
      </p>
    ),
  },
  {
    id: "recognized-income",
    word: "소득인정액",
    short: "심사에 실제로 쓰이는 금액입니다. 내 월급과 다릅니다.",
    body: (
      <p>
        <strong>소득평가액 + 재산의 소득환산액</strong>으로 계산합니다. 월급에서
        근로소득공제를 뺀 금액에, 집·자동차·예금 같은 재산을 정해진 비율로
        소득처럼 환산해 더합니다. 그래서 월급이 기준을 조금 넘어도 대상이 될 수
        있고, 반대로 소득이 적어도 재산 때문에 탈락할 수 있습니다.{" "}
        <strong>
          공고문의 &ldquo;소득&rdquo;은 거의 항상 이 소득인정액을 뜻합니다.
        </strong>
      </p>
    ),
  },
  {
    id: "near-poor",
    word: "차상위계층",
    short: "기초생활수급자는 아니지만 소득이 기준 중위소득 50% 이하인 가구입니다.",
    body: (
      <p>
        수급자 바로 위 구간이라는 뜻입니다. 별도로 신청해 확인서를 받아 두면
        여러 사업에서 자격 증명으로 쓸 수 있습니다. 공고문에
        &ldquo;수급자 및 차상위&rdquo;라고만 적힌 사업이 많은데, 확인서가
        없으면 해당 여부를 그 자리에서 증명하지 못합니다.
      </p>
    ),
  },
  {
    id: "supporter",
    word: "부양의무자",
    short: "신청인을 부양할 의무가 있다고 법이 정한 가족입니다.",
    body: (
      <p>
        1촌의 직계혈족(부모·자녀)과 그 배우자를 말합니다. 과거에는 이들의
        소득·재산 때문에 본인이 탈락하는 일이 많았으나 기준이 단계적으로
        완화·폐지돼 왔습니다. <strong>급여 종류마다 적용 여부가 다르므로</strong>{" "}
        &ldquo;부양의무자 때문에 안 될 것&rdquo;이라고 지레 포기하지 말고 해당
        사업의 선정기준을 확인하세요.
      </p>
    ),
  },
  {
    id: "social-benefit",
    word: "사회보장급여",
    short: "국가·지자체가 제공하는 복지 급여를 통틀어 부르는 법률 용어입니다.",
    body: (
      <p>
        신청 서식 이름에 자주 붙습니다 — &ldquo;사회보장급여
        신청(변경)서&rdquo;가 그것입니다. 사업이 달라도 이 기본 서식은 공통으로
        쓰이므로 한 번 써 보면 다음이 빠릅니다.{" "}
        <Link href="/guide/documents" className="text-brand underline">
          신청 서류 안내
        </Link>
        에 정리했습니다.
      </p>
    ),
  },
  {
    id: "criteria",
    word: "지원대상 · 선정기준",
    short:
      "지원대상은 누구를 위한 사업인지, 선정기준은 실제로 무엇을 보고 자르는지입니다.",
    body: (
      <p>
        나란히 적혀 있어 같은 말처럼 보이지만 다릅니다. 지원대상에
        &ldquo;청년&rdquo;이라고만 적혀 있어도 선정기준에는 &ldquo;중위소득
        150% 이하&rdquo;처럼 실제 잣대가 들어갑니다.{" "}
        <strong>탈락 여부를 가르는 것은 선정기준 쪽입니다.</strong> 이
        사이트는 두 항목을 원문 그대로 나눠 싣습니다.
      </p>
    ),
  },
  {
    id: "base-year",
    word: "기준연도",
    short: "그 공고 내용이 어느 해 것인지를 나타냅니다.",
    body: (
      <p>
        지원금은 해마다 금액과 요건이 바뀝니다. 검색으로 걸린 글이 작년
        공고인 줄 모르고 그 금액을 기대했다가 달라지는 일이 흔합니다. 이
        사이트는 각 사업의 기준연도를 표시하고, 확인되지 않으면 채우지 않고
        비워 둡니다.
      </p>
    ),
  },
  {
    id: "voucher",
    word: "바우처",
    short: payTypeHelp("전자바우처(바우처)")!,
    body: (
      <p>
        현금과 가장 헷갈리는 형태입니다. 국민행복카드처럼 기존 카드에 포인트가
        얹히는 방식이 많아 통장에는 아무것도 찍히지 않습니다.{" "}
        <strong>유효기간이 지나면 잔액이 사라집니다.</strong>{" "}
        <Link href="/benefit/voucher" className="text-brand underline">
          바우처로 받는 지원 보기
        </Link>
      </p>
    ),
  },
  {
    id: "loan",
    word: "융자 (현금대여)",
    short: payTypeHelp("현금대여(융자)")!,
    body: (
      <p>
        복지 사업 목록에 섞여 있어 받는 돈으로 오해하기 쉽습니다.{" "}
        <strong>빌리는 돈입니다.</strong> 시중 금리보다 낮고 상환 조건이
        너그러운 경우가 많지만, 갚아야 한다는 사실은 같습니다. 금리·상환
        기간·중도상환 조건을 먼저 보세요.{" "}
        <Link href="/benefit/loan" className="text-brand underline">
          융자 사업 보기
        </Link>
      </p>
    ),
  },
  {
    id: "discount",
    word: "감면",
    short: payTypeHelp("감면")!,
    body: (
      <p>
        통신비·전기요금·수도요금 등에 적용됩니다. 돈이 들어오지 않으니 받고
        있는지 모르고 지나치기 쉽고, 대부분 소급되지 않아 신청이 늦으면 그
        기간만큼 손해입니다.{" "}
        <Link href="/benefit/discount" className="text-brand underline">
          요금감면 사업 보기
        </Link>
      </p>
    ),
  },
  {
    id: "in-kind",
    word: "현물 · 현물대여",
    short: payTypeHelp("현물지급")!,
    body: (
      <p>
        급식·연료·보조기기·교복처럼 물건으로 받습니다. 대여는{" "}
        {payTypeHelp("현물대여")} 반납 조건과 파손 시 부담을 미리 확인하세요.
      </p>
    ),
  },
  {
    id: "one-time",
    word: "1회성 · 수시 · 부정기",
    short: cycleHelp("1회성")!,
    body: (
      <p>
        &ldquo;수시&rdquo;는 {cycleHelp("수시")} &ldquo;부정기&rdquo;는{" "}
        {cycleHelp("부정기")} 매달 나오는 것으로 알고 생활 계획을 세웠다가
        어긋나는 경우가 많으니, 금액보다 먼저 주기를 보세요.
      </p>
    ),
  },
];

export default function TermsGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="공고문은 이미 아는 사람을 상대로 쓰여 있습니다. 설명 없이 지나가는 말들을 모아 뜻을 붙였습니다."
        updated={`최종 수정 ${G.updated}`}
      >
        {/* 목차 — 열두 개면 스크롤해서 찾는 것보다 눌러 가는 게 빠르다. */}
        <nav aria-label="용어 목록">
          <ul className="flex flex-wrap gap-1.5">
            {TERMS.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className="inline-block rounded-full border border-line px-3 py-1.5 text-sm text-slate-600 transition hover:border-brand hover:text-brand"
                >
                  {t.word}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <dl className="space-y-8">
          {TERMS.map((t) => (
            <div key={t.id} id={t.id} className="scroll-mt-24">
              <dt className="text-lg font-bold text-ink">{t.word}</dt>
              <dd className="mt-2 space-y-3 text-sm leading-relaxed text-slate-700">
                <p className="font-medium text-slate-800">{t.short}</p>
                {t.body}
              </dd>
            </div>
          ))}
        </dl>

        <DocNote>
          여기 적은 것은 공고문을 읽는 데 필요한 만큼의 설명입니다. 법령 해석이
          아니며, 개별 사안의 자격 판정에 그대로 적용할 수 없습니다. 내
          경우에 해당하는지는 보건복지상담센터(국번 없이 129)나 주소지
          행정복지센터에서 확인하세요.
        </DocNote>
      </DocPage>

      <div className="mx-auto max-w-3xl">
        <GuideNav current="terms" />
      </div>
    </>
  );
}
