import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";

const G = guideBySlug("mistakes")!;

export const metadata: Metadata = {
  title: `${G.title} — 복지 신청 흔한 실수`,
  description:
    "융자를 받는 돈으로 알거나, 한 번 주는 것을 매달로 알거나, 요금감면을 안 물어봐서 놓치거나 — 수록 900건에서 실제로 잘 틀리는 지점만 골라 정리했습니다.",
  alternates: { canonical: "/guide/mistakes" },
};

/*
  "흔한 실수"는 쓰기 쉬운 만큼 지어내기도 쉬운 글이다. 그래서 항목마다
  **우리 데이터에서 몇 건이 걸리는지**를 붙였다. 숫자가 붙지 않는 항목은
  넣지 않았다 — 예컨대 "서류를 빠뜨린다" 같은 것은 맞는 말이지만 우리가
  근거를 댈 수 없다.

  다섯째·여섯째는 데이터가 아니라 지식iN 실조사(2026-08-31, docs 참고)에서
  나온 것이라 출처를 본문에 밝혀 둔다.
*/
const loan = services.filter((s) => s.payTypes.includes("현금대여(융자)"));
const voucher = services.filter((s) =>
  s.payTypes.some((p) => p.includes("바우처")),
);
const discount = services.filter((s) => s.payTypes.includes("감면"));
const cashOnce = services.filter(
  (s) => s.payTypes.includes("현금지급") && s.cycle === "1회성",
);
const cashMonthly = services.filter(
  (s) => s.payTypes.includes("현금지급") && s.cycle === "월",
);
const withPercent = services.filter((s) => s.medianPercent != null);

type Item = {
  n: number;
  title: string;
  count: string;
  body: React.ReactNode;
};

const ITEMS: Item[] = [
  {
    n: 1,
    title: "융자를 받는 돈으로 안다",
    count: `수록 ${loan.length}건`,
    body: (
      <>
        <p>
          복지 목록에 섞여 있어 지원금처럼 보이지만{" "}
          <strong>빌리는 돈입니다. 갚아야 합니다.</strong> 시중보다 금리가 낮고
          상환 조건이 너그러운 경우가 많지만, 빚이라는 사실은 달라지지
          않습니다.
        </p>
        <p>
          목록에서 <strong>융자</strong> 배지가 현금과 같은 색으로 보이는 것은
          돈이 오간다는 점이 같아서일 뿐입니다. 신청 전에 금리·상환 기간·중도
          상환 조건을 확인하세요.{" "}
          <Link href="/benefit/loan" className="text-brand underline">
            융자 사업 보기
          </Link>
        </p>
      </>
    ),
  },
  {
    n: 2,
    title: "바우처를 받아 놓고 기간을 넘긴다",
    count: `수록 ${voucher.length}건`,
    body: (
      <>
        <p>
          바우처는 카드에 포인트가 얹히는 방식이 많아{" "}
          <strong>통장에는 아무것도 찍히지 않습니다.</strong> 받은 줄 모르고
          두다가 유효기간이 지나면 잔액이 그냥 사라집니다. 남은 금액을
          돌려주지 않습니다.
        </p>
        <p>
          쓸 수 있는 곳과 용도도 정해져 있습니다. 결정 통지를 받으면{" "}
          <strong>유효기간과 사용처를 먼저 확인</strong>하고 달력에 적어
          두세요.{" "}
          <Link href="/benefit/voucher" className="text-brand underline">
            바우처 사업 보기
          </Link>
        </p>
      </>
    ),
  },
  {
    n: 3,
    title: "한 번 주는 것을 매달 나오는 것으로 안다",
    count: `현금 지원 중 1회성 ${cashOnce.length}건 · 매월 ${cashMonthly.length}건`,
    body: (
      <>
        <p>
          같은 &lsquo;현금 지원&rsquo;인데 한 번 받고 끝나는 것과 자격이
          유지되는 동안 매달 나오는 것이 거의 반반입니다. 금액만 보고{" "}
          <strong>매달 그만큼 들어올 것으로 생활 계획을 세웠다가</strong>{" "}
          어긋나는 경우가 많습니다.
        </p>
        <p>
          이 사이트는 카드와 상세 페이지에 &ldquo;1회 지급&rdquo;,
          &ldquo;매월 지급&rdquo;을 항상 적습니다. 금액보다 주기를 먼저
          보세요.
        </p>
      </>
    ),
  },
  {
    n: 4,
    title: "요금감면은 안 물어보면 안 해 준다",
    count: `수록 ${discount.length}건`,
    body: (
      <>
        <p>
          통신비·전기요금·수도요금 감면은 돈이 들어오지 않으니{" "}
          <strong>받고 있는지조차 모르고 지나칩니다.</strong> 대상이 되면서도
          신청하지 않아 몇 년째 제값을 내는 경우가 흔한 영역입니다.
        </p>
        <p>
          더 중요한 것은 <strong>대부분 소급되지 않는다</strong>는 점입니다.
          지난 몇 년치를 나중에 돌려받을 수 없습니다. 해당될 것 같으면 오늘
          신청하는 편이 낫습니다.{" "}
          <Link href="/benefit/discount" className="text-brand underline">
            요금감면 사업 보기
          </Link>
        </p>
      </>
    ),
  },
  {
    n: 5,
    title: "소득만 보고 재산을 안 본다",
    count: `선정기준에 중위소득 비율이 적힌 ${withPercent.length}건`,
    body: (
      <>
        <p>
          공고문의 &ldquo;중위소득 ○○% 이하&rdquo;에서 비교하는 값은 월급이
          아니라 <strong>소득인정액</strong>입니다. 월급에서 근로소득공제를 뺀
          금액에, 집·자동차·예금을 정해진 비율로 소득처럼 환산해 더한
          금액입니다.
        </p>
        <p>
          그래서 두 방향의 착각이 다 생깁니다. 월급이 기준을 조금 넘어서
          포기했는데 실제로는 대상이거나, 소득이 적어서 될 줄 알았는데 자동차
          때문에 탈락하는 식입니다.{" "}
          <Link
            href="/guide/terms#recognized-income"
            className="text-brand underline"
          >
            소득인정액이 무엇인지 보기
          </Link>
        </p>
      </>
    ),
  },
  {
    n: 6,
    title: "맞벌이인데 본인 건강보험료만 넣는다",
    count: "지식iN 실조사에서 가장 많던 오류",
    body: (
      <>
        <p>
          소득을 건강보험료로 가늠할 때 가장 흔한 실수입니다.{" "}
          <strong>맞벌이라면 부부의 보험료를 합쳐서</strong> 보고 가구원 수를
          2인으로 두어야 합니다. 본인 것만 넣어 &ldquo;기준 이하&rdquo;로
          보였다가 신청 후 탈락하는 경우가 가장 많습니다.
        </p>
        <p>
          반대 방향의 실수도 있습니다.{" "}
          <strong>장기요양보험료는 빼고 건강보험료만</strong> 넣어야 합니다.
          명세서에 나란히 찍혀 있어 함께 더하기 쉬운데, 그러면 소득이 실제보다
          높게 나와 스스로 대상에서 지웁니다.{" "}
          <Link href="/faq#income" className="text-brand underline">
            건강보험료로 소득 확인하는 법
          </Link>
        </p>
      </>
    ),
  },
];

export default function MistakesGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="자격이 없어서 못 받는 것보다, 있는데 몰라서 못 받거나 잘못 알고 포기하는 쪽이 훨씬 많습니다."
        updated={`최종 수정 ${G.updated} · 수록 ${services.length.toLocaleString()}건 집계 기준`}
      >
        {ITEMS.map((it) => (
          <DocSection key={it.n} title={`${it.n}. ${it.title}`}>
            <p className="text-xs text-muted">{it.count}</p>
            {it.body}
          </DocSection>
        ))}

        <DocSection title="공통으로 통하는 것 하나">
          <p>
            여섯 가지를 관통하는 것은{" "}
            <strong>&ldquo;확인하지 않고 짐작한다&rdquo;</strong>는 점입니다.
            돈인 줄, 매달인 줄, 안 될 줄 알았다가 어긋납니다.
          </p>
          <p>
            공고문에서 딱 네 가지만 먼저 보면 대부분 걸러집니다 —{" "}
            <strong>무엇으로 주는지, 몇 번 주는지, 기준연도가 언제인지,
            선정기준이 무엇인지.</strong> 이 사이트는 이 넷을 상세 페이지 위쪽에
            모아 두었습니다.
          </p>
          <DocNote>
            그래도 애매하면 물어보는 편이 빠릅니다.{" "}
            <strong>보건복지상담센터 국번 없이 129</strong>, 또는 주소지
            행정복지센터의 복지 담당 창구입니다. 이 사이트는 자격을 판정하지
            않습니다.
          </DocNote>
        </DocSection>
      </DocPage>

      <div className="mx-auto max-w-3xl">
        <GuideNav current="mistakes" />
      </div>
    </>
  );
}
