import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import ActivitySupportCalc from "@/components/ActivitySupportCalc";
import { guideBySlug } from "@/lib/guides";
import {
  AS_SOURCE_ID,
  AS_CHECKED,
  AS_BANDS,
  AS_INCOMES,
  AS_SPECIAL,
  AS_COPAY_CAP,
  copayOf,
} from "@/lib/activitySupport";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("disability-activity-support")!;
const S = services.find((s) => s.id === AS_SOURCE_ID);
const PDF_URL = "https://www.easylaw.go.kr/CSP/FlDownload.laf?flSeq=1782350562131";

export const metadata: Metadata = {
  title: "장애인활동지원 본인부담금 계산 — 15구간 월 한도액, 65세가 되면",
  description:
    "종합점수 42점 이상이면 15구간 중 하나로 월 104만~829만원의 바우처가 나옵니다. 소득별 본인부담금(면제·2만원·4~10%, 상한 21만 6,200원)을 계산하고, 신청 못 하는 경우, 바우처 이월·소멸, 65세 이후 보전급여, 갱신 기간을 2026년 사업안내에서 옮겼습니다.",
  alternates: { canonical: "/guide/disability-activity-support" },
};

/*
  왜 이 글인가 (2026-09-25).

  조회수 34위(33만)이고 검색량이 실업급여의 0.18배로 「따로 확인한 것」 없는 사업 중 가장 크다.
  복지로 원문은 "인정등급에 해당되는 만큼의 매월 일정액의 바우처"라고만 적어 얼마인지, 내가 얼마를
  내는지가 없다. 첨부 안내서는 2025년판이라 쓰지 않고, 보건복지부 「2026 장애인활동지원 사업안내」
  (489쪽, 인쇄 쪽 = PDF 파일 쪽 − 34)에서 옮겼다. 쪽수는 인쇄 쪽이다.

  종합점수·소득 구간은 공단과 시·군·구가 정한다 — 고르게 하고 판정하지 않는다(3절).
*/

const EXCLUDED: readonly [string, string][] = [
  [
    "노인장기요양보험의 장기요양급여를 받는 사람",
    "65세 이상이거나 치매·뇌혈관성 질환 등 노인성 질병이 있는 사람. 장기요양급여를 받으면서 활동지원이 더 필요하면 보전급여를 신청합니다(아래 65세 절).",
  ],
  [
    "기초생활보장 보장시설에 들어가 있는 사람",
    "장애인공동생활가정(그룹홈)과 장애인단기거주시설은 보장시설이 아니라 신청할 수 있습니다. 다만 시설 안에서는 못 쓰고, 시설 밖에서 쓴다는 시설장 확인서가 필요합니다(6개월 유효).",
  ],
  ["의료기관에 60일을 넘겨 입원 중인 사람", "퇴원을 2개월 안에 앞두고 있으면 미리 신청할 수 있습니다."],
  ["교정시설·치료감호시설에 수용 중인 사람", "집행유예 중이거나 가석방된 사람은 신청할 수 있습니다."],
  [
    "비슷한 다른 급여를 받거나 받을 자격이 있는 사람",
    "가사간병방문지원, 장애아가족양육지원, 노인맞춤돌봄서비스 등. 발달재활서비스는 비슷한 급여가 아닙니다.",
  ],
  [
    "장애 등록한 재외동포·외국인",
    "난민으로 인정받아 장애인으로 등록한 외국인은 신청할 수 있습니다.",
  ],
];

export default function DisabilityActivitySupportGuide() {
  const lo = AS_BANDS.at(-1)!;
  const hi = AS_BANDS[0];
  return (
    <>
      <DocPage
        title={G.title}
        lead="혼자 일상생활을 하기 어려운 장애인에게 활동지원사가 오는 서비스입니다. 방문조사 점수로 15개 구간 중 하나가 정해지고, 그 구간의 월 한도액만큼 바우처가 나옵니다. 소득에 따라 매달 본인부담금을 먼저 넣어야 바우처가 생깁니다."
        updated={`최종 수정 ${G.updated} · 금액과 규칙은 보건복지부 「2026 장애인활동지원 사업안내」에서 ${AS_CHECKED} 확인`}
      >
        <DocSection title="한 장으로 보면">
          <DocList
            items={[
              <>
                <strong>6세 이상 65세 미만 등록장애인</strong>이 신청합니다. <strong>소득과 상관없이</strong>{" "}
                신청할 수 있습니다(3쪽).
              </>,
              <>
                국민연금공단이 집을 방문해 조사한 <strong>종합점수가 42점 이상</strong>이면 수급자가 됩니다(32쪽).
              </>,
              <>
                점수에 따라 15구간 — 한 달 바우처가 {won(lo.limit)}({lo.band}구간)부터 {won(hi.limit)}(
                {hi.band}구간)까지입니다(71쪽).
              </>,
              <>
                본인부담금은 생계·의료급여 수급자 면제, 차상위 2만원, 그 밖에는 소득에 따라 월 한도액의
                4~10%이고 <strong>한 달 {won(AS_COPAY_CAP)}을 넘지 않습니다</strong>(77~78쪽).
              </>,
              <>
                결정은 신청일부터 <strong>30일 안</strong>(30일 연장 가능), 수급자격은 <strong>3년</strong>{" "}
                유효합니다(32~33쪽).
              </>,
            ]}
          />
          <p className="text-xs text-muted">
            복지로 원문은 금액 없이 &ldquo;인정등급에 해당되는 만큼의 매월 일정액의 바우처&rdquo;라고만
            적습니다. 이 글의 금액과 쪽수는 전부 2026년 사업안내입니다.
          </p>
        </DocSection>

        <DocSection title="신청할 수 없는 경우">
          <div className="space-y-3">
            {EXCLUDED.map(([who, note]) => (
              <div key={who} className="overflow-hidden rounded-xl border border-line bg-white text-sm">
                <p className="border-b border-line bg-sunken px-4 py-2.5 font-bold text-ink">{who}</p>
                <p className="px-4 py-2.5 leading-relaxed text-slate-700">{note}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted">
            사업안내 4~6쪽. 국가유공자 중 상이등급 3~7급 판정을 받은 사람은 2024년 9월 1일부터 지원할 수
            있다고 적혀 있습니다(6쪽).
          </p>
        </DocSection>

        <DocSection title="신청은 어디서, 무엇을 내나">
          <DocList
            items={[
              <>
                주민등록상 주소지 <strong>읍·면·동 주민센터</strong>. 우편·팩스도 되고,{" "}
                <strong>복지로 온라인 신청</strong>도 됩니다 — 온라인에서 추가 서류를 못 붙이면 주민센터에 따로
                냅니다(8쪽).
              </>,
              <>
                <strong>6세 생일이 든 달의 전달</strong>부터 신청할 수 있고, 급여는 생일이 든 달의 다음 달
                1일부터 생깁니다(3쪽).
              </>,
              <>
                내는 것: 사회보장급여(사회서비스이용권) 신청서, 바우처카드 발급 신청서(있는 카드는 그대로
                씀), 건강보험증 사본(주민등록표와 가구원이 같으면 생략 가능), 본인부담금을 돌려받을{" "}
                <strong>본인 명의 통장 사본</strong>(8쪽).
              </>,
              <>
                직장·학교에 다니거나 가족 사정이 있으면 그 증빙(4대보험 가입내역, 재학증명서, 가족관계증명서
                등)을 더 냅니다 — 점수에 들어가는 항목입니다(9쪽).
              </>,
              <>
                본인이 못 하면 가족·후견인·사실상 보호하는 사람 등이 대신 신청할 수 있습니다(7쪽).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="계산해 보기">
          <ActivitySupportCalc />
        </DocSection>

        <DocSection title="구간별 월 한도액 (2026)">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">구간</th>
                  <th className="px-3 py-2 font-semibold">종합점수</th>
                  <th className="px-3 py-2 text-right font-semibold">월 한도액</th>
                  <th className="px-3 py-2 text-right font-semibold">중위 70% 이하 부담</th>
                </tr>
              </thead>
              <tbody>
                {AS_BANDS.map((b) => (
                  <tr key={b.band} className="border-b border-line">
                    <td className="px-3 py-2">{b.band}구간</td>
                    <td className="px-3 py-2 tabular-nums">
                      {b.min}점 이상{b.max ? ` ~ ${b.max}점 미만` : ""}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">{won(b.limit)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {won(copayOf(b.limit, AS_INCOMES[2]))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            구간·점수·월 한도액은 71쪽, 오른쪽 칸은 78쪽 조견표와 같은 값입니다. 소득 구분별 비율은{" "}
            {AS_INCOMES.filter((i) => i.rate !== null)
              .map((i) => `${i.label} ${Math.round(i.rate! * 100)}%`)
              .join(" · ")}
            입니다.
          </p>
          <DocNote title="월 한도액이 줄어드는 경우">
            수급자의 <strong>가족이 활동지원사</strong>로 일하면 월 한도액이 50% 줄고, 발달장애인
            주간활동서비스 <strong>확장형</strong>을 함께 쓰면 활동보조 약 22시간만큼 줄어듭니다(기본형은 줄지
            않음, 72·74쪽).
          </DocNote>
        </DocSection>

        <DocSection title="한도액에 더해지는 특별지원급여">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">사유</th>
                  <th className="px-3 py-2 font-semibold">기간</th>
                  <th className="px-3 py-2 text-right font-semibold">월 금액</th>
                </tr>
              </thead>
              <tbody>
                {AS_SPECIAL.map((x) => (
                  <tr key={x.what} className="border-b border-line align-top">
                    <td className="px-3 py-2">{x.what}</td>
                    <td className="px-3 py-2 text-slate-600">{x.period}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{won(x.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            71쪽. 수급자나 배우자가 출산한 경우, 시설에서 나와 자립을 준비하는 경우, 보호자가 잠시 없는
            경우에 붙습니다. 특별지원급여에는 본인부담금이 없고(77쪽), 사유가 겹치면 같이 받습니다(74쪽).
          </p>
        </DocSection>

        <DocSection title="바우처 — 먼저 넣고, 남으면 넘어가고, 12월 31일에 사라집니다">
          <DocList
            items={[
              <>
                본인부담금을 한국사회보장정보원 전용 계좌에 넣어야 나머지 정부지원금이 더해져 바우처가
                생깁니다. 활동지원기관에 내는 돈이 아닙니다(77쪽).
              </>,
              <>
                월 한도액은 매월 1일~말일 단위이고, 처음 시작하는 달은 며칠에 시작해도 한 달치가 나옵니다(74쪽).
              </>,
              <>
                안 쓴 바우처는 다음 달로 넘어가지만 <strong>그해 12월 31일이 지나면 사라집니다</strong>(110쪽).
              </>,
              <>
                남은 잔량이 <strong>한 달치를 넘으면 다음 달 바우처가 생기지 않습니다</strong> — 쌓아 둘 수 있는
                양에 한계가 있습니다(109쪽).
              </>,
              <>
                잔량은 전자바우처 포털(socialservice.or.kr)과 ARS <strong>1644-9911</strong>에서 볼 수 있습니다(109쪽).
              </>,
              <>
                본인부담금은 <strong>의료비 세액공제</strong> 대상입니다(2024년 과세기간부터, 81쪽). 쓰지 않고
                남은 본인부담금은 정산해 돌려받거나 다음 해로 넘어갑니다.
              </>,
            ]}
          />
          <DocNote title="본인부담금은 매년 5월에 다시 정합니다">
            시·군·구가 5월에 모든 수급자의 본인부담금을 새로 산정해 그해 6월부터 다음 해 5월까지 적용합니다.
            그 사이 수급자가 되거나 가구원 수·건강보험료가 바뀌면 변경 신청을 할 수 있고, 바뀐 금액은 결정된
            달의 다음 달부터 적용됩니다(80쪽).
          </DocNote>
        </DocSection>

        <DocSection title="65세가 되면">
          <p>
            수급 중에 65세가 되면 유효기간이 남아 있어도 <strong>65세 생일이 든 달의 다음 달 말일</strong>까지만
            인정됩니다. 그 안에 노인장기요양 판정을 받아야 하고, 결과에 따라 갈립니다(32·34쪽).
          </p>
          <DocList
            items={[
              <>
                <strong>등급외</strong> — 남은 유효기간 동안 활동지원을 그대로 받습니다. 다시 조사하지 않습니다.
              </>,
              <>
                <strong>장기요양등급</strong> — 장기요양급여를 받고, 활동지원은 <strong>보전급여</strong>로
                신청합니다. 종합점수에서 등급별 점수(1등급 108 · 2등급 96 · 3등급 78 · 4등급 72 · 5등급 63 ·
                인지지원등급 36점)를 뺀 점수가 42점 이상이어야 합니다(53~55쪽).
              </>,
              <>
                <strong>기각·각하</strong> — 활동지원을 신청할 수 없습니다. 장기요양급여를 다시 신청해 등급이
                정해진 뒤에 신청합니다.
              </>,
            ]}
          />
          <DocNote tone="amber" title="장기요양 신청은 미리">
            등급외 판정 이력은 <strong>65세 생일 60일 전 이후에 신청한 것</strong>부터 인정됩니다(4·32쪽).
            생일이 가까워지면 장기요양 신청 시기를 주민센터와 먼저 맞춰 두세요.
          </DocNote>
          <p className="text-xs text-muted">
            지침 예시(56쪽): 종합점수 161점(12구간)인 사람이 장기요양 1등급을 받으면 161 − 108 = 53점이라 보전급여는
            15구간입니다.
          </p>
        </DocSection>

        <DocSection title="갱신 · 긴급활동지원 · 이의신청">
          <DocList
            items={[
              <>
                <strong>갱신</strong>: 유효기간 끝나기 <strong>90일 전부터 30일 전까지</strong> 신청합니다.
                시·군·구가 120일 전까지 문자 등으로 알려 줍니다. 부득이한 사정이 있으면 인정받아 끝나는 날까지
                낼 수 있습니다(38쪽).
              </>,
              <>
                <strong>긴급활동지원</strong>: 돌볼 가족이 갑자기 없어졌거나(사망·입원 등) 재난, 보장시설에서
                갑자기 나온 경우. 신규 신청과 함께 내면 곧바로 결정해 13구간 {won(AS_BANDS[12].limit)}을{" "}
                <strong>본인부담 없이 60일</strong>(늦어지면 최대 90일) 씁니다(35~36쪽).
              </>,
              <>
                <strong>이의신청</strong>: 결정 통지를 받은 날부터 <strong>90일 안</strong>에 냅니다(45쪽).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="가족이 활동지원사가 될 수 있나">
          <p>
            원칙적으로 안 됩니다. 배우자·부모·자녀·형제자매·며느리·사위·시부모·장인장모 등은 그 수급자에게
            급여를 제공할 수 없습니다(92쪽). 섬·벽지나 활동지원사가 부족한 농어촌, 감염병, 천재지변 같은 경우에만
            예외로 허용되고, 그때 월 한도액이 50% 줄어듭니다.
          </p>
          <DocNote tone="amber" title="최중증 발달장애인·희귀질환자 특례는 기간이 적혀 있습니다">
            지침은 이 두 무리의 가족 급여 제공 기간을 &ldquo;2024년 11월 1일부터 2026년 10월 31일까지로
            한정&rdquo;한다고 적고, 가까운 제공기관 여러 곳에 연계를 요청하고도 60일 넘게 연결이 안 된 경우 등
            요건을 모두 갖춰야 합니다(94~95쪽). 11월 이후 어떻게 되는지는 이 지침에 없습니다 — 해당된다면
            시·군·구에 확인해 주세요.
          </DocNote>
        </DocSection>

        <DocSection title="출처">
          <p className="text-sm">
            보건복지부 「
            <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="text-brand underline">
              2026 장애인활동지원 사업안내
            </a>
            」(법제처 찾기쉬운 생활법령정보 게시본). 복지로 원문에 첨부된 안내서는 2025년판이라 이 글에 쓰지
            않았습니다.
          </p>
          <p className="text-sm">
            문의: 보건복지상담센터 <strong>129</strong>
          </p>
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문 →
              </Link>
            </p>
          )}
          <DocNote>
            이 글은 지침을 옮기고 그 값으로 계산한 것이며, 대상인지·몇 구간인지 판정하지 않습니다. 금액은 해마다
            바뀌니 신청할 때 그해 사업안내를 다시 확인해 주세요.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="disability-activity-support" />
    </>
  );
}
