import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocList, DocNote } from "@/components/Doc";
import { SERVICES_UPDATED } from "@/data/services";
import { BASE_YEAR, HEALTH_INSURANCE } from "@/lib/midIncome";

export const metadata: Metadata = {
  title: "데이터 출처",
  description:
    "복지클릭이 쓰는 데이터의 출처와 이용 조건, 갱신 주기, 그리고 한계를 밝힙니다. 복지서비스 정보는 공공데이터포털, 기준 중위소득은 보건복지부 고시를 씁니다.",
  alternates: { canonical: "/source" },
};

type Source = {
  what: string;
  from: string;
  org: string;
  url: string;
  license: string;
  cycle: string;
};

/** 실제로 호출하거나 인용한 것만 적는다. 쓰지 않는 출처를 나열하지 않는다. */
const SOURCES: Source[] = [
  {
    what: "중앙부처 복지 서비스",
    from: "공공데이터포털 — 중앙부처복지서비스 조회 서비스",
    org: "한국사회보장정보원",
    url: "https://www.data.go.kr/data/15090532/openapi.do",
    license: "이용허락범위 제한 없음",
    cycle: "수시",
  },
  {
    what: "지자체 복지 서비스",
    from: "공공데이터포털 — 지자체복지서비스 조회 서비스",
    org: "한국사회보장정보원",
    url: "https://www.data.go.kr/data/15108347/openapi.do",
    license: "이용허락범위 제한 없음",
    cycle: "수시",
  },
  {
    what: `${BASE_YEAR}년 기준 중위소득·급여별 선정기준`,
    from: "제77차 중앙생활보장위원회 의결 보도자료 (2025-07-31)",
    org: "보건복지부",
    url: "https://www.mohw.go.kr/board.es?mid=a10503010100&bid=0027&act=view&list_no=1487098",
    license: "공공누리 제1유형",
    cycle: "연 1회(매년 7~8월 고시)",
  },
  {
    what: `${BASE_YEAR}년 건강보험료율 ${(HEALTH_INSURANCE.rate * 100).toFixed(2)}%`,
    from: "보험료율 인상 안내",
    org: "국민건강보험공단",
    url: "https://www.nhis.or.kr",
    license: "공공누리 제1유형",
    cycle: "연 1회",
  },
];

export default function SourcePage() {
  return (
    <DocPage
      title="데이터 출처"
      lead="복지클릭의 모든 수치는 정부가 공개한 자료에서 왔습니다. 어디서 무엇을 가져왔는지, 그 데이터가 무엇을 못 하는지까지 적습니다."
      updated={`복지 서비스 데이터 최종 수집일 ${SERVICES_UPDATED}`}
    >
      <DocSection title="출처 목록">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-y border-line bg-slate-50 text-left">
                <th className="px-3 py-2 font-semibold">항목</th>
                <th className="px-3 py-2 font-semibold">출처</th>
                <th className="px-3 py-2 font-semibold">제공기관</th>
                <th className="px-3 py-2 font-semibold">이용조건</th>
                <th className="px-3 py-2 font-semibold">갱신</th>
              </tr>
            </thead>
            <tbody>
              {SOURCES.map((s) => (
                <tr key={s.what} className="border-b border-line align-top">
                  <th scope="row" className="px-3 py-2.5 text-left font-medium">
                    {s.what}
                  </th>
                  <td className="px-3 py-2.5 text-slate-600">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand underline"
                    >
                      {s.from}
                    </a>
                  </td>
                  <td className="px-3 py-2.5 text-slate-600">{s.org}</td>
                  <td className="px-3 py-2.5 text-slate-600">{s.license}</td>
                  <td className="px-3 py-2.5 text-slate-600">{s.cycle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="어떻게 가져오나">
        <DocList
          items={[
            <>
              공공데이터포털 오픈API를 호출해 <strong>응답 원문(XML)을 그대로
              저장</strong>한 뒤, 그것을 화면용 형태로 옮깁니다. 원문을 남겨
              두는 이유는 옮기는 과정에서 실수가 있어도 되짚을 수 있게 하기
              위해서입니다.
            </>,
            <>
              지원 대상·선정 기준·지원 내용·신청 방법은{" "}
              <strong>정부가 쓴 문장을 손대지 않고</strong> 옮깁니다. 줄바꿈도
              원문 그대로 둡니다.
            </>,
            <>
              선정 기준 문장에 &ldquo;기준 중위소득 ○○%&rdquo;가 적혀 있으면 그
              숫자만 뽑아 자가진단과 연결합니다. 원문에 없으면{" "}
              <strong>비워 둡니다.</strong> 저희가 추정해서 넣지 않습니다.
            </>,
            <>
              분류 항목(대상 6종·생애주기 7종·지급형태 12종)은 저희가 만든 게
              아니라 <strong>API 응답에 실제로 들어 있는 값</strong>을 집계한
              것입니다.
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="이 데이터가 못 하는 것">
        <DocNote tone="amber" title="반드시 공식 안내로 최종 확인하세요">
          아래 이유로 이 사이트의 내용이 실제와 다를 수 있습니다. 신청 전에는
          각 서비스 페이지의 복지로 원문 링크나 담당 기관을 확인해 주세요.
        </DocNote>
        <DocList
          items={[
            <>
              <strong>시차가 있습니다.</strong> 지자체가 사업을 바꾸면 그것이
              공공데이터포털에 반영되기까지 시간이 걸리고, 저희가 다시 받아오는
              데 또 시간이 걸립니다.
            </>,
            <>
              <strong>모든 사업이 등록돼 있지는 않습니다.</strong> 예를 들어
              세종특별자치시는 이 데이터에 자체 사업이 한 건도 없습니다. 시가
              사업을 안 하는 게 아니라 등록되지 않은 것입니다.
            </>,
            <>
              <strong>예산 소진·모집 마감을 알 수 없습니다.</strong> 데이터에
              실시간 접수 현황이 들어 있지 않습니다.
            </>,
            <>
              <strong>자가진단은 소득만 봅니다.</strong> 실제 심사 기준인
              소득인정액은 재산의 소득환산액을 더하고 근로소득공제를 뺀
              금액이라 결과가 다를 수 있습니다.
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="저작권">
        <p>
          공공데이터포털과 각 부처가 제공한 원자료의 저작권은 해당 기관에
          있습니다. 두 복지서비스 데이터셋은 이용허락범위에 제한이 없어 상업적
          이용이 가능합니다.
        </p>
        <p>
          그 자료를 모으고 분류하고 배치한 결과물, 그리고 이 사이트의 문장과
          디자인은 복지클릭에 있습니다. 자세한 내용은{" "}
          <Link href="/terms" className="text-brand underline">
            이용약관
          </Link>
          을 참고하세요.
        </p>
      </DocSection>
    </DocPage>
  );
}
