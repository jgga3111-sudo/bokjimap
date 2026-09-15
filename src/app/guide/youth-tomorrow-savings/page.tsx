import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("youth-tomorrow-savings")!;

export const metadata: Metadata = {
  title: "청년내일저축계좌 만기 조건 — 정부지원금을 못 받게 되는 7가지",
  description:
    "매월 10만원 이상 넣으면 정부가 30만원을 얹어 3년 뒤 1,440만원+이자가 됩니다. 다만 교육 10시간·자금사용계획서를 빠뜨리거나 12개월 미납이면 정부지원금은 환수됩니다. 2026년 보건복지부 사업안내로 정리했습니다.",
  alternates: { canonical: "/guide/youth-tomorrow-savings" },
};

/*
  왜 이 글인가 (2026-09-13).

  조회수 1위(수록 910건 조회수의 13.4%)인데 상세 페이지에 우리가 따로 확인한 것이
  하나도 없었다. 애드센스 「가치가 별로 없는 콘텐츠」 거절 뒤 가장 먼저 채울 자리다.

  복지로 원문에는 가입 조건과 매칭액까지만 있다. 정작 사람들이 3년 동안 부딪히는
  것 — **언제 정부지원금을 잃는가, 쉬어야 할 때 어떻게 하나, 소득이 늘면 어떻게
  되나** — 는 원문에 붙은 첨부 「2026년 자활사업안내(Ⅱ) 자산형성지원 통장사업
  안내」(보건복지부, 196쪽)에 있다. 이 글은 그 안내서를 옮긴 것이다.

  그리고 **원문과 안내서가 어긋나는 자리가 하나** 있다. 복지로 원문은 아직
  「중위소득 50% 초과~100% 이하: 10만원 매칭」을 적고 있는데, 안내서는 2026년
  개정 사항으로 「차상위 초과자 신규모집 중단」을 적었다. 둘을 나란히 싣는다 —
  기존 가입자 몫의 규정이 남아 있는 것으로 읽히지만, 그건 우리 해석이라 본문에는
  두 문서의 표현만 옮긴다(CLAUDE.md 3절).

  숫자 규칙: 안내서에 적힌 값은 그대로(쪽수 표기), 우리가 곱한 값은 **표에
  「계산」이라고 적는다**. 이자는 은행마다 달라 계산하지 않는다.
*/
const ID = "WLF00000060";
const S = services.find((s) => s.id === ID);

/** 원문에 첨부된 보건복지부 사업안내 PDF. 원문의 첨부 목록에서 이름으로 찾는다. */
const GUIDE_PDF =
  S?.forms.find((f) => f.name.includes("자산형성지원 통장사업"))?.url ?? null;
const DOC = "2026년 자활사업안내(Ⅱ) 자산형성지원 통장사업 안내";
const CHECKED = "2026-09-13";

/** 안내서 62쪽 「2026년 기준 중위소득, 가입 및 유지기준」 표. 원 단위 그대로. */
const JOIN_LINE: readonly [string, number][] = [
  ["1인 가구", 1_282_119],
  ["2인 가구", 2_099_646],
  ["3인 가구", 2_679_518],
  ["4인 가구", 3_247_369],
  ["5인 가구", 3_778_360],
  ["6인 가구", 4_277_976],
  ["7인 가구", 4_757_575],
];

const MONTHS = 36;
const GOV = 300_000;

/** 본인 저축액별 3년 합계. 10만원 줄만 안내서(3쪽)에 적힌 값이고 나머지는 곱한 값. */
const ROWS = [100_000, 200_000, 300_000, 500_000].map((mine) => ({
  mine,
  mineTotal: mine * MONTHS,
  govTotal: GOV * MONTHS,
  total: (mine + GOV) * MONTHS,
  stated: mine === 100_000,
}));

function Source({ page }: { page: string }) {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      {GUIDE_PDF ? (
        <a
          href={GUIDE_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-brand"
        >
          보건복지부 「{DOC}」
        </a>
      ) : (
        <>보건복지부 「{DOC}」</>
      )}{" "}
      {page} · {CHECKED} 확인
    </p>
  );
}

export default function YouthTomorrowSavingsGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="매달 10만원을 넣으면 정부가 30만원을 얹어 줍니다. 그런데 이 30만원은 3년 동안 조건을 지켜야 내 돈이 됩니다. 가입 전에 알아야 할 것은 금액보다 그 조건입니다."
        updated={`최종 수정 ${G.updated} · 보건복지부 「${DOC}」에서 ${CHECKED} 확인`}
      >
        <DocSection title="먼저 — 2026년 모집은 끝났고, 대상도 좁아졌습니다">
          <p>
            복지로 원문에 적힌 2026년 모집기간은{" "}
            <strong>&rsquo;26.5.4.(월) ~ &rsquo;26.5.20.(수)</strong>입니다. 다음
            모집 일정은 아직 원문에 없습니다. 작년 날짜로 짐작하지 않고 비워 둡니다.
          </p>
          <p>
            그리고 올해부터 <strong>새로 가입할 수 있는 사람이 줄었습니다.</strong>{" "}
            보건복지부 안내서의 2026년 주요 개정에 이렇게 적혀 있습니다.
          </p>
          <blockquote className="border-l-2 border-line pl-3 text-slate-700">
            &ldquo;청년내일저축계좌 &rsquo;26년부터 차상위 초과자(기준 중위소득
            50~100% 이하) 신규모집 중단&rdquo;
          </blockquote>
          <Source page="viii·3·62쪽" />
          <DocNote tone="amber" title="복지로 원문과 다른 점">
            복지로 원문의 지원 내용에는 아직 「중위소득 50%초과~100%이하: 10만원 정액
            매칭」 줄이 남아 있습니다. 안내서는 같은 구간에 대해 위처럼 신규모집
            중단을 적고, 68쪽에서 &ldquo;가입 시 가구소득 기준에 따라 지원&rdquo;되며
            &ldquo;가입 이후 계층이동이 발생하더라도 지원액은 변경되지 않는다&rdquo;고
            적습니다. 올해 새로 가입하는 경우 어느 구간이 적용되는지는 주민센터나
            보건복지상담센터(129)에서 확인해 주세요.
          </DocNote>
        </DocSection>

        <DocSection title="가입 조건 셋 — 모두 맞아야 합니다">
          <DocList
            items={[
              <>
                <strong>나이</strong> — 신청 당시 만 15세 이상~만 39세 이하(신청 월에
                만 15세가 되는 자~신청 월에 만 40세가 되는 자)
              </>,
              <>
                <strong>일</strong> — 지금 일하고 있고, 월 근로·사업소득이{" "}
                <strong>10만원 이상</strong>. 안내서는 이 소득을 &ldquo;별도의
                추가공제없이 100% 근로･사업소득 반영(일명 &lsquo;세전&rsquo;)&rdquo;으로
                봅니다. 근로장학금·무급근로·실업급여·육아휴직급여는 가입이 안 됩니다.
              </>,
              <>
                <strong>가구소득</strong> — 소득인정액이 기준 중위소득 50% 이하
              </>,
            ]}
          />
          <p>
            가구소득 기준을 금액으로 옮기면 아래와 같습니다. 안내서 표 그대로입니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">가구원 수</th>
                  <th className="px-3 py-2 text-right font-semibold">
                    가입기준(중위소득 50%, 월)
                  </th>
                </tr>
              </thead>
              <tbody>
                {JOIN_LINE.map(([k, v]) => (
                  <tr key={k} className="border-b border-line">
                    <td className="px-3 py-2">{k}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{won(v)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Source page="61~62쪽" />
          <DocNote title="월급과 비교하면 안 됩니다">
            기준은 월급이 아니라 <strong>소득인정액</strong>(소득평가액 + 재산의
            소득환산액)이고, 가구원 전체를 봅니다. 그래서 위 금액보다 월급이 적어도
            재산이 있으면 넘을 수 있고, 반대도 있습니다. 저희는 해당 여부를 판정하지
            않습니다. 소득인정액이 무엇인지는{" "}
            <Link href="/guide/income-line" className="text-brand underline">
              소득 기준선 안내
            </Link>
            에 풀어 두었습니다.
          </DocNote>
          <p>
            <strong>30세 미만이면 가구를 세는 법이 다릅니다.</strong> 부모와 주거·생계를
            달리하면 그 청년을 1인 가구로 보고 청년 본인의 소득만 조사합니다.
            기초생활보장에서는 30세 미만 미혼 자녀가 중위소득 50% 이상을 벌어야 따로
            보는데, 이 통장은 50% 미만 소득활동이어도 따로 봅니다.
          </p>
          <Source page="65쪽" />
        </DocSection>

        <DocSection title="3년 뒤 얼마가 되나">
          <p>
            본인 저축은 매월 10만원 이상, 만원 단위로 <strong>최대 50만원</strong>까지
            넣을 수 있습니다. 정부 매칭은 본인이 얼마를 넣든{" "}
            <strong>매월 30만원 정액</strong>입니다(중위소득 50% 이하 구간).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">매월 본인 저축</th>
                  <th className="px-3 py-2 text-right font-semibold">본인 3년</th>
                  <th className="px-3 py-2 text-right font-semibold">정부 3년</th>
                  <th className="px-3 py-2 text-right font-semibold">합계(이자 제외)</th>
                  <th className="px-3 py-2 font-semibold">값</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.mine} className="border-b border-line">
                    <td className="px-3 py-2">{won(r.mine)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{won(r.mineTotal)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{won(r.govTotal)}</td>
                    <td className="px-3 py-2 text-right font-bold tabular-nums text-ink">
                      {won(r.total)}
                    </td>
                    <td className="px-3 py-2 text-xs text-muted">
                      {r.stated ? "안내서 3쪽" : "저희가 계산"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            10만원 줄은 안내서에 &ldquo;1,440만원 + 이자 * 본인저축 360만원 포함&rdquo;으로
            적혀 있습니다. 나머지 줄은 같은 규칙(정부 30만원 정액 × 36개월)으로 저희가
            곱한 값입니다. 이자는 금융기관마다 달라 넣지 않았고, 생계급여 수급 청년의
            근로소득공제금 같은 추가지원금도 넣지 않았습니다.
          </p>
          <p>
            <strong>더 넣어도 정부 몫은 그대로입니다.</strong> 본인 저축을 늘리면 모이는
            돈은 커지지만 매칭 30만원은 변하지 않습니다. 만기 전에 본인 적금을 한 번
            중도 인출할 수 있습니다(최소 보유액 10만원은 남겨야 합니다).
          </p>
          <Source page="3·68쪽" />
        </DocSection>

        <DocSection title="정부지원금을 받는 네 조건">
          <p>안내서가 적은 지원요건은 넷입니다. 하나라도 빠지면 정부 몫은 나오지 않습니다.</p>
          <DocList
            items={[
              <>
                <strong>매월 10만원 이상 저축</strong> — 매월 1일~20일 자동이체가
                원칙이고, 그달 몫으로 인정되는 기간은 전월 23일~당월 22일입니다.
              </>,
              <>
                <strong>3년간 근로활동 지속</strong> — 1년에 한 번 이상 확인조사를
                합니다(가입 후 3개월은 제외).
              </>,
              <>
                <strong>자립역량교육 총 10시간 이수</strong> — 자산형성포털 등에서
                받습니다.
              </>,
              <>
                <strong>자금사용계획서 제출</strong> — 해지 신청서와 함께 냅니다.
              </>,
            ]}
          />
          <p>
            받은 지원금은 쓸 곳이 정해져 있습니다. 주택 구입·임대, 본인·자녀의
            고등교육·기술훈련, 사업의 창업·운영자금, 그 밖의 자활·자립입니다(국민기초생활
            보장법 시행령 제21조의2).
          </p>
          <Source page="64·74쪽" />
        </DocSection>

        <DocSection title="정부지원금을 잃는 일곱 가지">
          <p>
            아래에 해당하면 <strong>본인이 넣은 돈과 그 이자만</strong> 돌려받고,
            정부지원금(근로소득장려금)과 추가지원금은 환수됩니다.
          </p>
          <DocList
            items={[
              <>
                확인조사에서 <strong>근로활동을 하고 있지 않은 것</strong>으로 확인될 때
              </>,
              <>
                적립중지를 미리 신청하지 않고 본인 저축을{" "}
                <strong>누적 12개월</strong> 안 넣었을 때
              </>,
              <>자립역량교육 이수 기준에 못 미칠 때</>,
              <>압류·가압류가 걸렸을 때</>,
              <>본인이 사망했을 때</>,
              <>만기 전에 본인이 해지를 요청했을 때</>,
              <>자금사용계획서를 내지 않았을 때</>,
            ]}
          />
          <p>
            <strong>3년을 다 채워도</strong> 교육 이수 기준에 못 미치거나 계획서를 안
            내면 똑같이 본인 적립금과 이자만 받습니다. 이 경우는 나중에 다시 가입할 수
            있습니다. 반대로 전액을 받고 끝나면 <strong>다시 가입할 수 없습니다.</strong>
          </p>
          <p>
            해지 신청서와 자금사용계획서는 해지 사유가 생긴 날부터 6개월이 되는 달의
            말일까지 내야 하고, 넘기면 시군구가 직권으로 해지합니다.
          </p>
          <Source page="73~75쪽" />
          <DocNote title="일을 쉬었다고 바로 끝나지는 않습니다">
            확인조사 결과를 통보받은 날부터 <strong>1개월 안에</strong>, 직전 확인조사
            시작월부터 이번 확인조사 시작월까지 기간 중 50% 이상 일했음을 소명하면
            구제될 수 있습니다(안내서 73쪽). 통보 우편을 흘려 넘기지 마세요.
          </DocNote>
        </DocSection>

        <DocSection title="쉬어야 할 때 — 적립중지는 미리 신청합니다">
          <p>
            <strong>일반 적립중지(최대 12개월)</strong> — 실직, 본인이나 부양가족의
            질병·사고 같은 부득이한 사유가 있을 때 3년 중 최대 12개월까지 멈출 수
            있습니다. 희망일 최소 7일 전에 신청해야 하고, 멈춘 기간에는 정부지원금이
            쌓이지 않습니다. 2026년 개정으로 6개월에서 12개월이 됐고, &rsquo;26.1.31
            이후 신청분부터 적용됩니다.
          </p>
          <p>
            <strong>특별 적립중지(최대 2년)</strong> — 군입대, 임신·출산으로 인한 퇴직,
            육아휴직 중인 가입자만 쓸 수 있습니다. 신청하면 가입기간이{" "}
            <strong>5년으로 자동 연장</strong>되지만 정부지원금은 최대 3년까지만
            매칭됩니다. 증빙서류(입영통지서, 육아휴직 확인서 등)를 갖고 지자체에 직접
            신청해야 합니다.
          </p>
          <DocNote tone="amber" title="뒤늦게 신청하면 소급되지 않습니다">
            안내서는 &ldquo;누적 12개월 미납으로 해지사유 발생 후 적립중지 신청하더라도
            소급 적용 불가&rdquo;라고 적습니다. 행복e음에 등록되지 않은 적립중지도
            &ldquo;소급 적용 절대 불가&rdquo;입니다. 멈출 일이 생기면 저축을 멈추기{" "}
            <strong>전에</strong> 신청하세요.
          </DocNote>
          <Source page="15~16·64쪽" />
        </DocSection>

        <DocSection title="소득이 늘면 오히려 먼저 받습니다">
          <p>
            가입한 뒤 청년 본인의 근로·사업소득이 <strong>기준 중위소득 100%</strong>를
            넘으면 탈락이 아니라 <strong>중도 지급</strong>입니다. 교육 이수와 자금사용
            계획서 조건을 채우면 그때까지 쌓인 본인 적립금·정부지원금·추가지원금을
            받고 끝납니다. 1~3인 가구는 3인 가구 기준({won(5_359_036)})을 씁니다.
          </p>
          <Source page="62·73쪽" />
        </DocSection>

        <DocSection title="신청은 어디서">
          <p>
            본인이 직접 복지로(온라인)나 주민센터(방문)에서 신청합니다. 자가진단표를
            작성해 필수 요건이 맞으면 서류를 냅니다. 시군구가 심사해{" "}
            <strong>70일 이내</strong>에 결과를 알리고, 선정되면 금융기관에서 통장을
            만들며 첫 달 본인 저축(10만원 이상)을 넣습니다.
          </p>
          <p>
            문의: 보건복지상담센터 <strong>129</strong> · 자산형성지원 콜센터{" "}
            <strong>1522-3690</strong>
          </p>
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문 →
              </Link>
            </p>
          )}
          <Source page="66~67쪽" />
          <DocNote>
            이 글은 보건복지부 사업안내를 옮긴 것이고, 가입이나 지급 여부를 판정하지
            않습니다. 규정은 해마다 바뀌니 신청 직전에는 복지로 공고와 담당 주민센터에서
            그해 기준을 다시 확인해 주세요.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="youth-tomorrow-savings" />
    </>
  );
}
