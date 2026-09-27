import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { won } from "@/lib/display";

const G = guideBySlug("cancer-screening")!;
const CHECKED = "2026-09-27";
const PDF =
  "https://bokjiro.go.kr/ssis-tbu/CmmFileUtil/getDownload.do?atcflId=20260508UUWBM1644500190267122&atcflSn=1";
const LAW = "https://www.law.go.kr/법령/암관리법시행령";
const RULE = "https://www.law.go.kr/행정규칙/암검진실시기준";

export const metadata: Metadata = {
  title: "국가암검진 2026 — 나이별 대상·주기와 본인부담 10%가 드는 경우",
  description:
    "위암·대장암·유방암·자궁경부암·간암·폐암 국가암검진의 나이·주기를 암관리법 시행령 별표 1에서, 본인부담과 지원 기준(직장 월 보험료 127,500원·지역 60,000원 이하)을 2026 국가암검진사업 안내에서 옮겼습니다. 올해 안에 받아야 하는 이유, 수면내시경처럼 따로 내는 돈, 검사를 받은 것으로 보는 경우까지.",
  alternates: { canonical: "/guide/cancer-screening" },
};

/*
  왜 이 글인가 (2026-09-27 아침 루틴).

  조회수 50위 「암검진사업」(22만) 원문은 대상 암과 주기, 본인부담 지원 대상까지는 적는다.
  없는 것은 ① 올해 안에 받아야 한다는 것(해가 넘어가면 그해 몫이 사라진다 — 9월에 가장 필요한 말)
  ② 실제로 돈이 드는 자리(10%, 수면내시경, 추가검사) ③ 받은 것으로 보는 경우다.

  1차 출처는 원문 첨부 「2026 국가암검진사업 안내」(보건복지부·국립암센터, 119쪽 PDF — 복지로에서
  이번에는 내려받아졌다. 인쇄 쪽 = PDF 파일 쪽 − 4)와 그 부록의 고시 「암검진 실시기준」(제2025-220호),
  법제처 API로 받은 암관리법 시행령(2026-01-02 시행) 별표 1.

  ⚠ 복지로 원문과 안내서가 어긋난다 — 지역가입자 지원 기준이 원문 「월 57,000원 이하」, 안내서
  「월 60,000원 이하」(20쪽, 「주요 변경사항」 2쪽에 「기준 변경」으로 적힘). 안내서를 따르고 화면에
  두 값을 적는다. 원문대로 읽으면 57,001~60,000원인 가구가 지원 대상이 아니라고 알게 된다.

  2년 주기 암의 "올해 대상"을 출생 연도로 가르는 규칙은 이 안내서·고시에 적혀 있지 않아 싣지 않는다.
  대상 여부는 공단이 정해 알리는 값이라 조회 방법만 적는다.
*/

type Row = readonly [string, string, string, string];

/* 암관리법 시행령 별표 1 + 사업안내 22~28쪽(기본검사) */
const CANCERS: readonly Row[] = [
  ["위암", "40세 이상 남녀", "2년", "위내시경 (어려우면 위장조영검사)"],
  ["대장암", "50세 이상 남녀", "1년", "분변잠혈검사 → 양성이면 대장내시경"],
  ["유방암", "40세 이상 여성", "2년", "유방촬영"],
  ["자궁경부암", "20세 이상 여성", "2년", "자궁경부세포검사"],
  ["간암", "40세 이상 남녀 중 간암 발생 고위험군", "6개월", "간초음파 + 혈청알파태아단백검사"],
  ["폐암", "54~74세 남녀 중 폐암 발생 고위험군", "2년", "저선량 흉부 CT"],
];

/* 사업안내 30~32쪽 표 5 「국가암검진사업 검진 비용(2026.1.1. 기준)」의 비용 총액.
   공단 전액 부담인 대장암·자궁경부암은 10% 칸을 비운다. */
type Cost = readonly [string, number, number, boolean];
const COSTS: readonly Cost[] = [
  ["위내시경", 86_910, 89_830, true],
  ["위장조영검사", 57_930, 63_170, true],
  ["유방촬영 (양쪽 4매)", 44_780, 48_300, true],
  ["간초음파 + 혈청알파태아단백", 117_930, 126_840, true],
  ["저선량 흉부 CT", 107_940, 107_940, true],
  ["분변잠혈검사 (대장암)", 4_850, 6_760, false],
  ["자궁경부세포검사", 12_990, 12_990, false],
];

const range = (a: number, b: number) => (a === b ? won(a) : `${won(a)} ~ ${won(b)}`);
const tenth = (n: number) => Math.round(n / 10);

export default function CancerScreeningGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="국가암검진은 나라가 정한 나이·주기에 맞는 사람에게 여섯 가지 암 검사를 해 주는 제도입니다. 복지로 원문에 대상과 주기는 있지만, 올해 안에 받아야 한다는 것과 실제로 돈이 드는 자리는 없어서 2026년 사업안내와 고시에서 옮겼습니다."
        updated={`최종 수정 ${G.updated} · 2026 국가암검진사업 안내·암검진 실시기준(고시 제2025-220호)·암관리법 시행령에서 ${CHECKED} 확인`}
      >
        <DocSection title="한 장으로 보면">
          <DocList
            items={[
              <>
                검진은 <strong>대상이 된 그해 안에</strong> 받습니다. 위·대장 내시경 같은 2단계 검사만 다음 해{" "}
                <strong>1월 말까지</strong> 이어서 받을 수 있습니다(암검진 실시기준 제6조).
              </>,
              <>
                본인부담은 검진비의 <strong>10%</strong>입니다. <strong>대장암·자궁경부암</strong>은 공단이 전액
                부담해 0원입니다(실시기준 제11조제3항).
              </>,
              <>
                <strong>의료급여 수급권자</strong>와 건강보험료가{" "}
                <strong>직장 월 127,500원·지역 월 60,000원 이하</strong>(2025년 11월 부과 기준)인 사람은 10%도
                내지 않습니다(사업안내 20쪽).
              </>,
              <>
                <strong>수면내시경·헬리코박터 검사·용종 제거</strong>에 더 드는 돈은 본인이 냅니다(사업안내 22·24쪽).
              </>,
              <>
                대상인지는 공단이 정해 <strong>2~4월에 건강검진표</strong>로 알립니다. 잃어버렸거나 못 받았어도
                검진기관이 신분증으로 조회합니다(사업안내 38~39쪽).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="나이와 주기">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">암</th>
                  <th className="px-3 py-2 font-semibold">대상</th>
                  <th className="px-3 py-2 font-semibold">주기</th>
                  <th className="px-3 py-2 font-semibold">기본 검사</th>
                </tr>
              </thead>
              <tbody>
                {CANCERS.map(([c, who, cycle, test]) => (
                  <tr key={c} className="border-b border-line align-top">
                    <td className="px-3 py-2 font-semibold">{c}</td>
                    <td className="px-3 py-2">{who}</td>
                    <td className="px-3 py-2 tabular-nums">{cycle}</td>
                    <td className="px-3 py-2">{test}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DocList
            items={[
              <>
                <strong>간암 고위험군</strong> — 간경변증, B형간염 항원 양성, C형간염 항체 양성, B형·C형 간염
                바이러스에 의한 만성 간질환 환자(시행령 별표 1 비고). 실제로는 해당 연도 전 2년 동안 그 병으로
                진료받은 기록으로 고릅니다(사업안내 19쪽).
              </>,
              <>
                <strong>폐암 고위험군</strong> — 30갑년(하루 평균 갑 수 × 흡연 햇수) 이상인 현재 흡연자.
                해당 연도 전 2년 안의 일반건강검진 문진표나 금연치료 문진표로 흡연력을 확인합니다. 폐암검진을 한
                번 받은 뒤 담배를 끊어도 <strong>금연 15년 이내·74세 전까지</strong>는 대상에 남습니다(사업안내 20쪽).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="올해 안에 받아야 합니다">
          <p>
            고시는 암검진을 나이와 주기로 정해진 <strong>해당 수검 연도에 실시한다</strong>고 적습니다(실시기준
            제6조). 올해 대상인데 12월 31일을 넘기면 그해 검진은 받지 못한 것이 됩니다. 예외는 하나 — 위암·
            대장암처럼 단계별로 하는 검진의 <strong>2단계 이상</strong>(분변잠혈 양성 뒤 대장내시경 등)은 다음 해
            1월 말까지 받을 수 있습니다.
          </p>
          <p>
            놓쳤다면 다음 해에 공단에 추가 등록을 신청할 수 있습니다. 안내서가 추가 등록을 받는 경우로 적은 것은
            셋입니다(사업안내 37쪽).
          </p>
          <DocList
            items={[
              <>보험료 기준을 넘었거나 보험료 정보가 없어 빠졌는데, 소급해 다시 매긴 보험료가 당시 지원 기준에 맞는 경우</>,
              <>개인 사정으로 검진을 못 받아 <strong>전년도에 받지 않은 암종</strong>이 있는 경우</>,
              <>아래 「받은 것으로 보는 경우」에 해당하지만 본인이 검진을 원하는 경우</>,
            ]}
          />
          <p className="text-sm text-slate-600">
            신청은 국민건강보험공단(<strong>1577-1000</strong>)이나 지사로 합니다. 보건소에 가면 공단 지사로
            안내합니다.
          </p>
        </DocSection>

        <DocSection title="돈이 드는 자리">
          <p>
            검진비는 공단이 90%, 본인이 10%를 냅니다. 대장암·자궁경부암은 공단이 전부 냅니다(실시기준 제11조).
            아래 비용 총액은 사업안내 표 5(2026.1.1. 기준)에 적힌 값이고, 10%는 <strong>저희가 계산한 값</strong>
            입니다. 공통 상담·행정비용(8,020원, 토요일·공휴일 가산 있음)과 병원별 촬영 방식에 따라 창구 금액은
            달라질 수 있습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">검사</th>
                  <th className="px-3 py-2 font-semibold">비용 총액</th>
                  <th className="px-3 py-2 font-semibold">10%면 (저희 계산)</th>
                </tr>
              </thead>
              <tbody>
                {COSTS.map(([t, a, b, pay]) => (
                  <tr key={t} className="border-b border-line align-top">
                    <td className="px-3 py-2">{t}</td>
                    <td className="px-3 py-2 tabular-nums">{range(a, b)}</td>
                    <td className="px-3 py-2 tabular-nums">
                      {pay ? `약 ${range(tenth(a), tenth(b))}` : "0원 (공단 전액)"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DocList
            items={[
              <>
                <strong>10%를 내지 않는 사람</strong> — 의료급여 수급권자, 그리고 월 보험료가 하위 50% 선 이하인
                건강보험 가입자와 피부양자(실시기준 제10조). 2026년 선은 직장가입자 월 127,500원(소득월액보험료
                포함), 지역가입자 월 60,000원입니다(2025년 11월 부과 기준, 사업안내 20쪽).
              </>,
              <>
                <strong>본인이 따로 내는 것</strong> — 위내시경을 수면으로 하거나 헬리코박터 검사를 더 하면 늘어난
                비용, 대장내시경의 수면·용종 제거 비용(사업안내 22·24쪽).
              </>,
              <>
                <strong>추가검사 지원</strong> — 위암은 위장조영에서 이상이 보여 하는 위내시경과 조직검사를 전부 또는
                일부, 대장암은 분변잠혈 양성 뒤 대장내시경과 조직검사를 전부 지원합니다. 간암·유방암·자궁경부암·
                폐암의 추가검사는 <strong>비용 지원이 없습니다</strong>(사업안내 22~28쪽).
              </>,
            ]}
          />
          <DocNote tone="amber" title="복지로 원문과 기준 금액이 다릅니다">
            복지로 원문은 지역가입자 기준을 <strong>월 57,000원 이하</strong>로, 2026 사업안내는{" "}
            <strong>월 60,000원 이하</strong>로 적습니다. 사업안내 첫머리 「2026년 주요 변경사항」에 「암검진지원
            대상자 기준 변경」으로 적혀 있어 이 글은 60,000원을 따랐습니다. 월 보험료가 그 사이라면 공단(
            1577-1000)에 확인해 주세요.
          </DocNote>
        </DocSection>

        <DocSection title="받은 것으로 보는 경우">
          <p>다음에 해당하면 그 기간 동안 그 암의 검진을 받은 것으로 보고 대상에서 빠집니다(실시기준 제4조제3항).</p>
          <DocList
            items={[
              <>
                그 암으로 진단받아 건강보험 <strong>산정특례</strong>를 받고 있는 사람 — 산정특례가 끝나는 해의
                전년도까지.
              </>,
              <>
                국가 대장암검진이나 진료로 <strong>대장내시경</strong>을 받은 사람 — 그 검사일로부터 5년이 되는 해의
                전년도까지 대장암검진(분변잠혈검사)에서 빠집니다. 본인이 원하면 대상으로 등록할 수 있습니다
                (사업안내 19쪽).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="받으러 갈 때와 받은 뒤">
          <DocList
            items={[
              <>
                <strong>신분증</strong>을 가져갑니다. 건강검진표가 없어도 검진기관이 공단 시스템으로 대상 여부와 검사
                항목을 확인합니다(실시기준 제7조).
              </>,
              <>
                스스로 조회하려면 국민건강보험공단 누리집 → 건강모아 → 나의 건강관리 → 건강검진정보 →
                검진대상조회(공동인증서 또는 간편인증서). 의료급여 수급권자도 같은 곳에서 조회·검진확인서 출력이
                됩니다(사업안내 38쪽).
              </>,
              <>
                올해 대상으로 뽑힌 뒤 보험 자격이 바뀌어도 <strong>그해 대상 자격은 유지</strong>됩니다. 반대로 올해
                중에 새로 의료급여 수급권자가 돼도 그해 대상에는 들어가지 않습니다(사업안내 37쪽).
              </>,
              <>결과는 검진일로부터 <strong>15일 이내</strong>에 우편·이메일·모바일로 받습니다(실시기준 제9조).</>,
              <>
                암 의심 등으로 판정되면 검진기관이 추가검사와 진료를 안내하고, 보건소가 확진 여부를 확인·관리합니다
                (사업안내 23~29쪽).
              </>,
            ]}
          />
        </DocSection>

        <DocNote tone="amber" title="이 글에 없는 것">
          2년 주기 암의 대상 연도를 무엇으로 가르는지는 사업안내와 고시에 적혀 있지 않아 싣지 않았습니다. 내가
          올해 대상인지는 건강검진표나 공단 조회로 확인해 주세요. 암환자 의료비 지원은 다른 사업이라 다루지
          않았습니다.
        </DocNote>

        <DocSection title="출처">
          <DocList
            items={[
              <>
                보건복지부·국립암센터 「
                <a href={PDF} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                  2026 국가암검진사업 안내
                </a>
                」 — 2·18~32·37~39쪽 (복지로 원문 첨부)
              </>,
              <>
                <a href={RULE} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                  암검진 실시기준
                </a>{" "}
                (보건복지부 고시 제2025-220호) 제4·6·7·9·10·11조 — 위 안내 부록 2
              </>,
              <>
                <a href={LAW} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                  암관리법 시행령
                </a>{" "}
                제7조·제8조·별표 1 (2026-01-02 시행)
              </>,
            ]}
          />
          <p className="text-sm">
            문의: 국민건강보험공단 <strong>1577-1000</strong> · 보건복지상담센터 <strong>129</strong>
          </p>
          <p>
            <Link href="/service/WLF00001176" className="text-brand underline">
              암검진사업 상세 보기 — 복지로 원문 →
            </Link>
          </p>
          <DocNote>
            이 글은 법령·고시·사업안내를 옮기고 비용의 10%를 계산한 것이며, 검진 대상인지 판정하지 않습니다.
            금액은 요양급여비용이 바뀌면 해 중간에도 달라질 수 있습니다(사업안내 30쪽 주).
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="cancer-screening" />
    </>
  );
}
