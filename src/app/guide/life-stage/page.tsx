import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import ServiceList from "@/components/ServiceList";
import { guideBySlug } from "@/lib/guides";
import { LIFE_STAGES } from "@/lib/axes";
import { services } from "@/data/services";

const G = guideBySlug("life-stage")!;

/*
  생애주기 축은 `/life/[slug]` 페이지로 이미 있다. 그런데 필터 페이지는
  "청년 305건"을 보여줄 뿐, 단계가 어떻게 이어지는지는 말해 주지 않는다.
  나이가 바뀔 때 무엇이 열리고 무엇이 닫히는지는 사람이 실제로 궁금해하는
  것이고, 그건 목록이 아니라 글이 할 일이다.

  숫자는 렌더 시점에 센다. 단계별 대표 사업도 고정하지 않는다 — services는
  조회수 순이므로 각 단계의 첫 항목이 그 단계에서 가장 많이 찾는 사업이다.
*/
const byStage = LIFE_STAGES.map((stage) => {
  const list = services.filter((s) => s.lifeStages.includes(stage.slug));
  return { stage, list, top: list[0] };
});

/** 한 사업이 여러 단계에 걸리는 일이 흔하다. 그 사실 자체가 이 글의 요지다. */
const spanning = services.filter((s) => s.lifeStages.length > 1);
const none = services.filter((s) => s.lifeStages.length === 0);

const ranked = [...byStage].sort((a, b) => b.list.length - a.list.length);
const biggest = ranked[0];
const second = ranked[1];

export const metadata: Metadata = {
  title: `${G.title} — 생애주기 ${LIFE_STAGES.length}단계 집계`,
  description: `임신·출산부터 노년까지 ${LIFE_STAGES.length}단계에 각각 몇 건의 지원이 걸려 있는지 수록 ${services.length.toLocaleString()}건으로 세어 봤습니다. 가장 많은 단계는 ${biggest.stage.label}(${biggest.list.length}건)이고, ${spanning.length}건은 여러 단계에 함께 걸립니다.`,
  alternates: { canonical: "/guide/life-stage" },
};

export default function LifeStageGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="같은 사람이라도 나이대가 바뀌면 신청할 수 있는 것이 달라집니다. 어느 시기에 무엇이 열리는지 단계별로 세어 봤습니다."
        updated={`최종 수정 ${G.updated} · 수록 ${services.length.toLocaleString()}건 집계 기준`}
      >
        <DocSection title={`${LIFE_STAGES.length}단계에 각각 몇 건이 걸려 있나`}>
          <p>
            복지 사업은 대상을 나이로 나눠 두는 경우가 많습니다. 수록한{" "}
            {services.length.toLocaleString()}건을 단계별로 세면 이렇습니다.
            같은 사업이 여러 단계에 걸리기도 하므로 합계는{" "}
            {services.length.toLocaleString()}건보다 큽니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[30rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left text-muted">
                  <th className="py-2 pr-3 font-medium">단계</th>
                  <th className="py-2 pr-3 font-medium">건수</th>
                  <th className="py-2 font-medium">가장 많이 찾는 사업</th>
                </tr>
              </thead>
              <tbody>
                {byStage.map(({ stage, list, top }) => (
                  <tr key={stage.slug} className="border-b border-line/70">
                    <td className="py-2.5 pr-3 font-bold whitespace-nowrap">
                      <Link
                        href={`/life/${stage.slug}`}
                        className="text-brand underline"
                      >
                        {stage.label}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-3 tabular-nums whitespace-nowrap">
                      {list.length}건
                    </td>
                    <td className="py-2.5 text-slate-600">{top?.name ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/*
            여기에 "청년 사업이 최근 늘어난 영향"이라고 썼다가 지웠다.
            그럴듯하지만 우리 데이터로 확인한 사실이 아니다. 시행일은 지자체
            사업 570건에만 있어서 중앙부처를 포함한 증감을 말할 수 없다.
            셀 수 있는 것만 말한다.
          */}
          <p>
            가장 두꺼운 구간은 <strong>{biggest.stage.label}</strong>으로{" "}
            {biggest.list.length}건, 그다음이 {second.stage.label}{" "}
            {second.list.length}건입니다.
          </p>
        </DocSection>

        <DocSection title="나이로 딱 끊기지는 않습니다">
          <p>
            수록분 가운데 <strong>{spanning.length}건</strong>은 두 단계 이상에
            걸쳐 있습니다. 예를 들어 아동과 청소년에 함께 걸리는 교육 지원,
            중장년과 노년에 함께 걸리는 돌봄 사업이 그렇습니다.
          </p>
          <p>
            그래서 &ldquo;나는 몇 살이니까 여기만 보면 된다&rdquo;는 식으로
            좁히면 놓치는 것이 생깁니다. 경계에 있다면{" "}
            <strong>앞뒤 단계를 같이 보는 편</strong>이 낫습니다.
          </p>
        </DocSection>

        <DocSection title={`나이와 상관없는 지원이 ${none.length}건 있습니다`}>
          <p>
            반대로 어느 단계에도 걸리지 않는 사업이 {none.length}건입니다.
            나이가 아니라 <strong>소득이나 상황</strong>으로 대상을 정하기
            때문입니다. 기초생활보장, 긴급복지, 요금 감면 같은 것들이 여기
            들어갑니다.
          </p>
          <p>
            이 사업들은 생애주기로 찾으면 아예 보이지 않습니다. 소득으로
            찾는 쪽이 맞습니다 —{" "}
            <Link href="/check" className="font-bold text-brand underline">
              1분 자가진단
            </Link>
            으로 내 구간을 먼저 확인하거나,{" "}
            <Link href="/guide/income-line" className="text-brand underline">
              소득 기준선 안내
            </Link>
            를 보세요. 갑작스러운 사정이라면{" "}
            <Link href="/guide/emergency" className="text-brand underline">
              긴급복지 안내
            </Link>
            가 따로 있습니다.
          </p>
        </DocSection>

        <DocSection title={`${biggest.stage.label} 구간에서 많이 찾는 지원`}>
          <p>
            가장 두꺼운 구간을 예로 조회수 상위 여섯 건만 보입니다. 나머지는{" "}
            <Link
              href={`/life/${biggest.stage.slug}`}
              className="text-brand underline"
            >
              {biggest.stage.label} 목록
            </Link>
            에서 이어서 볼 수 있습니다.
          </p>
          <div className="pt-1">
            <ServiceList services={biggest.list.slice(0, 6)} />
          </div>
        </DocSection>

        <DocSection title="단계가 바뀌기 전에 확인할 것">
          <p>
            나이 기준은 <strong>신청 시점</strong>으로 봅니다. 생일이 지나면
            대상에서 빠지는 사업이 있고, 반대로 생일이 지나야 대상이 되는
            사업도 있습니다. 만 나이인지 연 나이인지도 사업마다 다릅니다.
          </p>
          <p>
            공고문에 &ldquo;만 19세 이상 34세 이하&rdquo;처럼 적혀 있으면 그
            표현을 그대로 읽어야 합니다. 이 사이트는 각 사업의 원문 표현을
            그대로 싣고 해석하지 않습니다. 헷갈리는 표현은{" "}
            <Link href="/guide/terms" className="text-brand underline">
              용어 안내
            </Link>
            에 모아 두었습니다.
          </p>
          <DocNote>
            나이 조건이 맞아도 소득·재산 조건이 따로 붙는 경우가 대부분입니다.
            둘 다 맞아야 신청할 수 있습니다. 최종 판단은 주민센터나 담당 부서에
            확인하세요.
          </DocNote>
        </DocSection>
      </DocPage>

      <div className="mx-auto max-w-3xl">
        <GuideNav current="life-stage" />
      </div>
    </>
  );
}
