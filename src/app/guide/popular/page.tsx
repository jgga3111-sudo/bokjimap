import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import ServiceList from "@/components/ServiceList";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";

const G = guideBySlug("popular")!;

/*
  이 글의 재료는 `views` 하나다 — 복지로 누적 조회수.

  docs/03 §4에서 "복지로에 없는 것"으로 조회수 순위를 꼽아 놓고 정작 글은
  없었다. 축(`/service`)으로는 쓰고 있지만, 순위를 **읽어 주는** 글이 없으면
  그냥 정렬된 목록일 뿐이다.

  숫자는 전부 여기서 센다. 본문에 상수를 적으면 수집이 늘 때 조용히 틀린
  말이 된다(2026-09-02에 실제로 겪었다 — guides.ts 머리 주석).
*/
const total = services.reduce((sum, s) => sum + s.views, 0);
const share = (n: number) => Math.round((n / total) * 100);
const sumOf = (list: typeof services) =>
  list.reduce((sum, s) => sum + s.views, 0);

const TOP = 10;
const top = services.slice(0, TOP);
const topShare = share(sumOf(top));
const top50Share = share(sumOf(services.slice(0, 50)));

const central = services.filter((s) => s.provider === "central");
const local = services.filter((s) => s.provider === "local");
const centralShare = share(sumOf(central));

/** 평균을 나란히 놓아야 "한 건당" 격차가 보인다. */
const avg = (list: typeof services) =>
  Math.round(sumOf(list) / list.length).toLocaleString();

export const metadata: Metadata = {
  title: `${G.title} — 조회수 상위 ${TOP}건이 전체의 ${topShare}%`,
  description: `복지로 누적 조회수를 수록 ${services.length.toLocaleString()}건에 대해 그대로 세어 봤습니다. 상위 ${TOP}건이 전체 조회의 ${topShare}%를 가져가고, 중앙부처 ${central.length}건이 ${centralShare}%를 차지합니다.`,
  alternates: { canonical: "/guide/popular" },
};

export default function PopularGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="어떤 지원이 있는지 몰라서 못 받는다는 말을 자주 합니다. 그게 사실인지, 사람들이 실제로 무엇을 찾아보는지 숫자로 확인해 봤습니다."
        updated={`최종 수정 ${G.updated} · 수록 ${services.length.toLocaleString()}건 집계 기준`}
      >
        <DocSection title="여기서 말하는 '많이 찾는다'는 무슨 뜻인가">
          <p>
            이 사이트의 순서는 <strong>복지로의 누적 조회수</strong>입니다.
            정부가 운영하는 복지로에서 그 사업의 안내 화면이 몇 번 열렸는지를
            그대로 가져온 값입니다. 신청 건수도, 수급자 수도 아닙니다.
          </p>
          <p>
            그래도 쓸모가 있는 이유는, <strong>사람들이 무엇을 궁금해했는지</strong>{" "}
            보여주는 값이기 때문입니다. 복지로는 이 순서를 화면에 내주지 않아서
            어떤 지원이 많이 검색되는지 밖에서는 보기 어렵습니다.
          </p>
        </DocSection>

        <DocSection title={`상위 ${TOP}건이 전체 조회의 ${topShare}%입니다`}>
          <p>
            수록한 {services.length.toLocaleString()}건의 조회수를 모두 더하면{" "}
            {total.toLocaleString()}회입니다. 그 가운데{" "}
            <strong>맨 위 {TOP}건이 {topShare}%</strong>를 가져갑니다. 상위
            50건까지 넓히면 {top50Share}%입니다.
          </p>
          <p>
            관심이 고르게 퍼져 있지 않습니다. 몇 개의 큰 제도가 거의 모든
            검색을 흡수하고, 나머지 수백 건은 존재가 거의 알려지지 않은
            상태입니다.
          </p>
          <div className="pt-1">
            <ServiceList services={top} ranked />
          </div>
        </DocSection>

        <DocSection
          title={`중앙부처 ${central.length}건이 조회의 ${centralShare}%를 차지합니다`}
        >
          <p>
            수록분은 중앙부처 {central.length}건, 지자체 {local.length}건으로
            지자체 쪽이 더 많습니다. 그런데 조회수로 보면 뒤집힙니다 —
            중앙부처가 {centralShare}%, 지자체가 {100 - centralShare}%입니다.
          </p>
          <p>
            한 건당 평균으로 보면 격차가 더 분명합니다. 중앙부처 사업은 평균{" "}
            <strong>{avg(central)}회</strong>, 지자체 사업은 평균{" "}
            <strong>{avg(local)}회</strong> 조회됐습니다.
          </p>
          <p>
            당연한 결과이기도 합니다. 중앙부처 사업은 전국 어디서나 신청할
            수 있지만, 지자체 사업은 그 시·군·구에 사는 사람만 신청할 수
            있습니다. 찾아볼 사람의 수가 처음부터 다릅니다.
          </p>
        </DocSection>

        <DocSection title="조회수가 낮다고 나쁜 지원은 아닙니다">
          <p>
            이 점은 분명히 해 두는 편이 좋겠습니다. 조회수는{" "}
            <strong>얼마나 알려졌는지</strong>를 보여줄 뿐, 금액이 큰지 받기
            쉬운지와는 아무 상관이 없습니다.
          </p>
          <p>
            오히려 목록 아래쪽에 있는 지자체 사업이 내게는 더 맞을 수
            있습니다. 대상이 좁게 정해져 있어서 조회수가 낮은 것이지, 조건이
            맞는 사람에게는 금액이 작지 않은 경우도 있습니다. 사는 곳에 따라
            무엇이 있는지는{" "}
            <Link href="/region" className="text-brand underline">
              지역별 목록
            </Link>
            에서 확인할 수 있습니다.
          </p>
          <DocNote>
            순위는 <strong>인기지 자격이 아닙니다.</strong> 1위 사업이라도
            조건이 맞지 않으면 신청할 수 없고, 맨 아래 사업이라도 조건이 맞으면
            받을 수 있습니다. 자격은 각 사업의 선정기준을 봐야 합니다 —{" "}
            <Link href="/guide/income-line" className="text-brand underline">
              소득 기준선 안내
            </Link>
            가 출발점입니다.
          </DocNote>
        </DocSection>

        <DocSection title="그래서 어디부터 보면 되나">
          <p>
            처음이라면 위의 {TOP}건부터 훑어보는 편이 빠릅니다. 대부분이
            전국 공통이라 어디에 살든 조건만 맞으면 신청할 수 있고, 금액이 큰
            제도가 여기 몰려 있습니다.
          </p>
          <p>
            그다음에 내 상황에 맞는 축으로 좁히면 됩니다. 소득이 어느 구간인지
            모르겠다면{" "}
            <Link href="/check" className="font-bold text-brand underline">
              1분 자가진단
            </Link>
            이, 나이대로 보고 싶다면{" "}
            <Link href="/guide/life-stage" className="text-brand underline">
              생애주기 안내
            </Link>
            가 있습니다. 전체 순위는{" "}
            <Link href="/service" className="text-brand underline">
              많이 찾는 복지·지원금
            </Link>
            에서 이어서 볼 수 있습니다.
          </p>
        </DocSection>
      </DocPage>

      <div className="mx-auto max-w-3xl">
        <GuideNav current="popular" />
      </div>
    </>
  );
}
