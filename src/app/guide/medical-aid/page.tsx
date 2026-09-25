import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import { thresholdOf, BASE_YEAR } from "@/lib/midIncome";
import { won } from "@/lib/display";

const G = guideBySlug("medical-aid")!;
const CHECKED = "2026-09-26";
const LAW = "https://www.law.go.kr/법령/의료급여법시행령";
const RULE = "https://www.law.go.kr/법령/의료급여법시행규칙";
const BRIEFING = "https://www.korea.kr/news/policyNewsView.do?newsId=148956615";
const svc = (id: string) => services.find((s) => s.id === id);

export const metadata: Metadata = {
  title: "의료급여 1종·2종 본인부담금 — 외래 1,000원부터 한 달 상한까지",
  description:
    "의료급여 수급자가 병원·약국에서 내는 돈을 의료급여법 시행령 별표 1에서 옮겼습니다. 1종은 외래 1,000~2,000원·입원 0원, 2종은 의원 1,000원·병원 15%·입원 10%. 한 달 본인부담이 넘으면 돌려받는 상한(2026년 1월 개정), 본인부담이 없는 사람, 의뢰서 순서, 연 400일 급여일수까지.",
  alternates: { canonical: "/guide/medical-aid" },
};

/*
  왜 이 글인가 (2026-09-26 아침 루틴).

  조회수 49위 「의료급여」(22만) 원문은 "국민건강보험 요양급여 기준에 의한 급여대상 항목에 대한
  의료비를 지원합니다" 한 줄이라 병원에서 얼마를 내는지가 없다. 48위 「본인부담면제」·33위
  「임신·출산 진료비」도 같은 제도라 한 글로 세 상세에 「따로 확인한 것」이 붙는다.

  원문 첨부 「2026 의료급여사업 안내」 PDF는 복지로가 내려받기를 막아(EFWSV00001) 못 읽었다.
  대신 금액·비율은 전부 법제처 API로 받은 **의료급여법 시행령**(시행 2026-01-01, 별표 1은
  2025-12-23 개정)과 **시행규칙**(시행 2026-07-10) 조문에서 옮겼다. 사업안내가 더 자세히 정한
  것(건강생활유지비 금액 등)은 조문에 없어 싣지 않는다.
*/

type Row = readonly [string, string, string];

/* 별표 1 제1호가목 — 1종 */
const TYPE1: readonly Row[] = [
  ["의원·보건의료원 (1차)", "1회 방문 1,000원", "없음 (0원)"],
  ["병원·종합병원 (2차)", "1회 방문 1,500원", "없음 (0원)"],
  ["상급종합병원 (3차)", "1회 방문 2,000원", "없음 (0원)"],
  ["보건소·보건지소·보건진료소", "없음 (0원)", "없음 (0원)"],
  ["약국 (의료기관 처방전)", "처방전 1매 500원", "—"],
];
/* 별표 1 제2호가목 — 2종 */
const TYPE2: readonly Row[] = [
  ["의원·보건의료원 (1차)", "1회 방문 1,000원", "10%"],
  ["병원·종합병원 (2차)", "15% (고시한 만성질환은 1회 1,000원)", "10%"],
  ["상급종합병원 (3차)", "15%", "10%"],
  ["보건소·보건지소·보건진료소", "없음 (0원)", "없음 (0원)"],
  ["약국 (의료기관 처방전)", "처방전 1매 500원", "—"],
];

function CopayTable({ rows }: { rows: readonly Row[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[440px] border-collapse text-sm">
        <thead>
          <tr className="border-y border-line bg-sunken text-left">
            <th className="px-3 py-2 font-semibold">어디서</th>
            <th className="px-3 py-2 font-semibold">외래</th>
            <th className="px-3 py-2 font-semibold">입원</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([w, o, i]) => (
            <tr key={w} className="border-b border-line align-top">
              <td className="px-3 py-2">{w}</td>
              <td className="px-3 py-2 tabular-nums">{o}</td>
              <td className="px-3 py-2 tabular-nums">{i}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* 제13조제5항 예시 — 저희가 계산한 값 */
const EXAMPLES: readonly [string, number, number][] = [
  ["1종 · 한 달 본인부담 3만원", 30_000, (30_000 - 20_000) * 0.5],
  ["1종 · 한 달 본인부담 8만원", 80_000, 30_000 * 0.5 + (80_000 - 50_000)],
  ["2종 · 한 달 본인부담 30만원", 300_000, (300_000 - 200_000) * 0.5],
];

export default function MedicalAidGuide() {
  const ids = ["WLF00000102", "WLF00003171", "WLF00000061", "WLF00001169"] as const;
  return (
    <>
      <DocPage
        title={G.title}
        lead="의료급여 수급자는 건강보험 대신 의료급여로 병원비를 냅니다. 원문에는 '의료비를 지원합니다'라고만 있어서, 실제로 창구에서 얼마를 내는지, 한 달에 많이 나오면 어떻게 되는지를 법령 조문에서 옮겼습니다."
        updated={`최종 수정 ${G.updated} · 금액과 비율은 의료급여법 시행령(2026-01-01 시행)·시행규칙(2026-07-10 시행)에서 ${CHECKED} 확인`}
      >
        <DocSection title="한 장으로 보면">
          <DocList
            items={[
              <>
                <strong>1종</strong>은 외래 1회 <strong>1,000~2,000원</strong>, 입원은 <strong>0원</strong>입니다.{" "}
                <strong>2종</strong>은 의원 외래 1,000원, 병원 외래 <strong>15%</strong>, 입원 <strong>10%</strong>
                입니다(시행령 별표 1).
              </>,
              <>
                한 달 본인부담이 1종 <strong>2만원</strong>, 2종 <strong>20만원</strong>을 넘으면 넘은 돈의 일부나
                전부를 시·군·구가 <strong>돌려줍니다</strong>(시행령 제13조제5항, 2026년 1월 1일 개정 시행).
              </>,
              <>
                1종 중 <strong>18세 미만·임산부·노숙인·고시된 결핵·희귀난치·중증질환자</strong> 등은 외래
                본인부담도 없습니다(별표 1 제1호다목).
              </>,
              <>
                병원은 <strong>의원(1차)부터</strong> 갑니다. 큰 병원은 의뢰서를 받아 7일 안에 냅니다(시행규칙 제3조).
              </>,
              <>
                2026년부터 <strong>부양비가 폐지</strong>됐습니다. 부양의무자가 실제로 돕지 않아도 도운 것으로 보고
                소득에 넣던 가상의 부양비(10%)가 없어졌습니다(정책브리핑).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="1종과 2종은 어떻게 갈리나">
          <p>
            기초생활보장 의료급여 수급자는 <strong>세대 구성원이 모두 근로가 어려운 사람</strong>이면
            1종, 아니면 2종입니다(시행령 제3조). 근로가 어려운 사람으로 조문에 적힌 것은 18세 미만, 65세 이상,
            중증장애인, 질병·부상으로 치료가 필요해 근로능력평가에서 근로능력이 없다고 판정된 사람, 세대원을 양육·간병하는 사람 등,
            임신 중이거나 분만 후 6개월 미만인 사람, 병역 이행 중인 사람입니다.
          </p>
          <p>
            세대 구성과 상관없이 1종인 사람도 있습니다 — 보장시설에서 급여를 받는 사람, 고시된 결핵·희귀난치·
            중증질환자, 이재민·노숙인 등으로 수급권자가 된 사람(시행령 제3조제2항).
          </p>
          <p className="text-sm text-slate-600">
            소득 기준은 소득인정액이 기준 중위소득 <strong>40% 이하</strong>입니다({BASE_YEAR}년 기준 중위소득
            고시). 가구원 수별 선은 아래와 같습니다 — 재산을 소득으로 바꾼 금액까지 더한 값과 비교하므로
            월급만으로 판단할 수 없습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[360px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">가구원 수</th>
                  <th className="px-3 py-2 text-right font-semibold">월 소득인정액 선 (40%)</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <tr key={n} className="border-b border-line">
                    <td className="px-3 py-2">{n}인</td>
                    <td className="px-3 py-2 text-right tabular-nums">{won(thresholdOf(n, 40))} 이하</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            내 소득이 기준선의 어디쯤인지는{" "}
            <Link href="/check" className="text-brand underline">
              소득 자가진단
            </Link>
            에서 계산할 수 있습니다. 수급 여부는 주민센터 조사로 정해집니다.
          </p>
        </DocSection>

        <DocSection title="1종 — 병원·약국에서 내는 돈">
          <CopayTable rows={TYPE1} />
          <p className="text-xs text-muted">
            시행령 별표 1 제1호가목. 의사가 약을 직접 조제하면 1,500·2,000·2,500원(처방전을 함께 내면 표의 금액),
            CT·MRI·PET 등 고시한 진료는 5%, 약사가 처방전 없이 직접 조제하면 900원입니다. 진료비 총액이 이
            금액보다 적으면 총액만 냅니다(같은 호 나목).
          </p>
        </DocSection>

        <DocSection title="2종 — 병원·약국에서 내는 돈">
          <CopayTable rows={TYPE2} />
          <p className="text-xs text-muted">
            시행령 별표 1 제2호가목. CT·MRI·PET 등 고시한 진료는 외래 15%, 약제는 구입금액의 외래 15%·입원
            10%입니다.
          </p>
          <DocList
            items={[
              <>자연분만·제왕절개 분만과 고시된 6세 미만 아동 입원은 본인부담이 없습니다(제2호다목).</>,
              <>1세 미만 외래는 의원에서 0원, 그 밖에서는 5%입니다(제2호머목·버목).</>,
              <>6~15세 입원은 3%, 임신부의 병원·상급종합병원 외래(유산·사산 포함)와 고위험 임신부 입원은 5%입니다(제2호거목·자목·사목).</>,
              <>고시된 중증질환자는 본인부담이 없고, 고시된 치매는 5%입니다(제2호라목·하목).</>,
            ]}
          />
        </DocSection>

        <DocSection title="한 달에 많이 나오면 — 돌려받는 상한">
          <p>
            약·진료비의 본인부담금(비급여·틀니·임플란트·2~3인실 입원료 등은 빼고)이 한 달에 아래 선을 넘으면,
            넘은 만큼을 의료급여기금이 부담하고 <strong>시·군·구가 수급자에게 돌려줍니다</strong>. 돌려줄
            돈이 2천원 미만이면 돌려주지 않습니다(시행령 제13조제5항).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">구분</th>
                  <th className="px-3 py-2 font-semibold">한 달 본인부담금</th>
                  <th className="px-3 py-2 font-semibold">돌려받는 몫</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1종", "2만원 초과 5만원 이하", "2만원 넘은 금액의 50%"],
                  ["1종", "5만원 초과", "5만원 넘은 금액 전부 (+ 위 구간 50%)"],
                  ["2종", "20만원 초과", "20만원 넘은 금액의 50%"],
                  ["2종", "연간 80만원 초과 (위에서 돌려받은 돈을 뺀 뒤)", "80만원 넘은 금액 전부"],
                ].map(([a, b, c]) => (
                  <tr key={a + b} className="border-b border-line align-top">
                    <td className="px-3 py-2">{a}</td>
                    <td className="px-3 py-2">{b}</td>
                    <td className="px-3 py-2">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            2종 연간 선은 요양병원에 한 해 240일을 넘겨 입원하면 120만원입니다. 이 조항은 2025년 9월 30일
            개정돼 <strong>2026년 1월 1일부터</strong> 시행됐습니다(부칙).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">예시</th>
                  <th className="px-3 py-2 text-right font-semibold">돌려받는 돈</th>
                  <th className="px-3 py-2 text-right font-semibold">결국 내는 돈</th>
                </tr>
              </thead>
              <tbody>
                {EXAMPLES.map(([k, paid, back]) => (
                  <tr key={k} className="border-b border-line">
                    <td className="px-3 py-2">{k}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{won(back)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{won(paid - back)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            <strong className="text-slate-600">예시 금액은 저희가 조문의 구간대로 계산한 값입니다.</strong> 2종의
            연간 80만원 선은 한 해를 모아 봐야 해서 예시에 넣지 않았습니다.
          </p>
        </DocSection>

        <DocSection title="1종인데 본인부담이 없는 사람">
          <p>아래에 해당하면 1종 외래 본인부담(1,000~2,000원, 약국 500원)도 내지 않습니다.</p>
          <DocList
            items={[
              <>18세 미만인 사람</>,
              <>임산부</>,
              <>무연고자로 확인된 사람, 노숙인 등</>,
              <>고시된 결핵질환·희귀난치성질환·중증질환을 가진 사람</>,
              <>가정간호를 받고 있는 사람 (시행규칙 제19조의4)</>,
              <>
                선택의료급여기관을 이용하는 사람이 그 기관에서 외래진료를 받거나 그 기관 처방전으로 약을 받을 때
                (시행규칙 제19조의4)
              </>,
              <>잠복결핵 치료를 받는 사람 (제1호자목)</>,
            ]}
          />
          <p className="text-xs text-muted">
            시행령 별표 1 제1호다목. 복지로 「의료급여본인부담면제」 원문은 여기에 더해 <strong>20세 미만
            중·고등학교 재학생</strong>도 신청하면 면제된다고 적고, 임산부·재학생·가정간호 대상자는 [서식 16]
            면제신청서를 내야 적용된다고 합니다. 재학생 항목은 저희가 확인한 시행령·시행규칙 조문에는 없어,
            해당되면 주민센터에 물어보세요.
          </p>
        </DocSection>

        <DocSection title="병원은 의원부터 — 의뢰서 순서">
          <p>
            의료급여는 <strong>1차 의료급여기관(의원·보건소 등)</strong>에 먼저 신청합니다. 1차에서 다른 병원 진료가
            필요하다고 보면 <strong>의료급여의뢰서</strong>를 주고, 받은 날부터 <strong>7일(공휴일 제외) 안에</strong>{" "}
            2차·3차 병원에 내야 합니다. 7일 안에 예약하면 예약일을 제출일로 봅니다(시행규칙 제3조).
          </p>
          <p className="text-sm">바로 2차·3차 병원으로 갈 수 있는 경우 (같은 조 제1항)</p>
          <DocList
            items={[
              <>응급환자, 분만, 고시된 결핵·희귀난치·중증질환자 → 2차·3차 모두</>,
              <>등록장애인의 보조기기 지급, 장애인구강진료센터 진료 → 2차·3차 모두</>,
              <>등록장애인, 15세 이하 아동, 한센병 환자, 재활의학과 재활치료 등 → 2차까지</>,
            ]}
          />
        </DocSection>

        <DocSection title="한 해에 받을 수 있는 날수 — 급여일수">
          <p>
            입원일수·투약일수 등을 합친 <strong>급여일수</strong>는 모든 질환을 합쳐 <strong>연 400일</strong>
            까지입니다. 고시된 결핵·희귀난치·중증질환은 질환마다 연 365일, 정신·행동장애 등 고시된 질환은
            질환마다 연 380일입니다(시행규칙 제8조의3).
          </p>
          <DocList
            items={[
              <>
                넘겨야 하면 시·군·구청장의 <strong>승인</strong>을 받습니다. 승인 없이 넘기면 기금은 외래 70%·입원
                80%만 부담합니다(시행령 별표 1 제3호다목).
              </>,
              <>급여일수가 180일 이상이 되면 공단이 6월 30일까지, 300일 이상이면 매달 알려 줍니다(시행규칙 제8조의5).</>,
              <>같은 병으로 여러 병원에서 같은 성분 약을 받는 날수는 6개월에 215일 미만입니다(제8조의7).</>,
            ]}
          />
        </DocSection>

        <DocSection title="65세 이상 틀니·임플란트">
          <p>
            고시한 기준에 따라 65세 이상에게 틀니는 1종 <strong>5%</strong>·2종 <strong>15%</strong>, 치과임플란트는
            1종 <strong>10%</strong>·2종 <strong>20%</strong>를 본인이 냅니다(별표 1 제1호라·마목, 제2호마·바목의
            기금 부담률 95·90·85·80%에서). 이 금액은 위 한 달 상한에 들어가지 않습니다.
          </p>
        </DocSection>

        <DocNote tone="amber" title="이 글에 없는 것">
          건강생활유지비(1종 외래 본인부담에 쓰는 돈) 금액, 선택의료급여기관 신청 절차, 요양비는 보건복지부
          「의료급여사업 안내」가 정하는데, 원문 첨부 파일을 내려받지 못해 확인하지 못했습니다. 확인하지 못한
          값은 싣지 않습니다.
        </DocNote>

        <DocSection title="출처">
          <DocList
            items={[
              <>
                <a href={LAW} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                  의료급여법 시행령
                </a>{" "}
                제3조·제13조·별표 1 (2026-01-01 시행, 별표 1은 2025-12-23 개정)
              </>,
              <>
                <a href={RULE} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                  의료급여법 시행규칙
                </a>{" "}
                제3조·제8조의3·제8조의5·제8조의7·제19조의4 (2026-07-10 시행)
              </>,
              <>
                대한민국 정책브리핑 「
                <a href={BRIEFING} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                  2026년 보건·복지 정책 이렇게 달라집니다
                </a>
                」 — 의료급여 부양비 폐지
              </>,
            ]}
          />
          <p className="text-sm">
            문의: 보건복지상담센터 <strong>129</strong>
          </p>
          <ul className="space-y-1">
            {ids.map((id) => {
              const s = svc(id);
              return s ? (
                <li key={id}>
                  <Link href={`/service/${s.id}`} className="text-brand underline">
                    {s.name} 상세 보기 — 복지로 원문 →
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
          <DocNote>
            이 글은 조문을 옮기고 그 구간대로 예시를 계산한 것이며, 1종·2종이나 면제 대상인지 판정하지 않습니다.
            금액은 법령이 바뀌면 달라지니 진료 전 의료급여기관이나 주민센터에서 확인해 주세요.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="medical-aid" />
    </>
  );
}
