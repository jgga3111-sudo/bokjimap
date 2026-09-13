import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("childcare-choice")!;

export const metadata: Metadata = {
  title: "보육료·유아학비·양육수당 차이와 변경 신청 15일 규칙",
  description:
    "어린이집은 보육료, 유치원은 유아학비, 집에서 키우면 양육수당 — 한 아이에게는 하나만 나옵니다. 옮길 때 신청일이 15일 전인지 뒤인지에 따라 그달 보육료를 자부담하거나 환수될 수 있습니다. 교육부 2026년도 보육사업안내로 정리했습니다.",
  alternates: { canonical: "/guide/childcare-choice" },
};

/*
  왜 이 글인가 (2026-09-13).

  조회수 6위 영유아보육료(2.8%) · 10위 유아학비(2.0%) · 18위 가정양육수당(1.3%)은
  한 아이를 두고 **셋 중 하나만** 받는 제도인데, 복지로에는 세 페이지로 따로 있다.
  원문마다 다른 둘로 옮기는 규칙이 한 방향씩만 적혀 있어서, 한자리에 모아야
  "지금 옮기면 이번 달은 어떻게 되나"에 답할 수 있다.

  네 방향 규칙 전체와 그 결과(자부담·환수)는 영유아보육료 원문에 첨부된
  교육부 「2026년도 보육사업안내」 93쪽 「보육비용 신청 관련 안내문」에 있다.
  금액은 세 원문의 2026년 단가를 그대로 옮겼다. 자격 판정은 하지 않는다(3절).
*/
const IDS = { care: "WLF00003250", kinder: "WLF00000969", home: "WLF00003253", parent: "WLF00004657" };
const find = (id: string) => services.find((s) => s.id === id);
const CARE = find(IDS.care);
const KINDER = find(IDS.kinder);
const HOME = find(IDS.home);
const PARENT = find(IDS.parent);

const PDF = CARE?.forms.find((f) => f.name.includes("보육사업안내"))?.url ?? null;
const DOC = "2026년도 보육사업안내";
const CHECKED = "2026-09-13";

function Source({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted">{children}</p>;
}
const docLink = (page: string) => (
  <>
    {PDF ? (
      <a href={PDF} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
        교육부 「{DOC}」
      </a>
    ) : (
      <>교육부 「{DOC}」</>
    )}{" "}
    {page}
  </>
);

type Switch = { from: string; to: string; by15: string; after16: string };

/** 보육사업안내 93쪽 안내문. 결과 문구는 원문 괄호 안의 말을 그대로 옮긴다. */
const SWITCHES: readonly Switch[] = [
  {
    from: "집(양육수당·부모급여 현금)",
    to: "어린이집(보육료)",
    by15: "변경신청일부터 보육료 지원 — 그달 양육수당·부모급여(현금)는 안 나옴",
    after16: "그달 양육수당·부모급여(현금)는 전액 지원, 보육료는 다음 달 1일부터 — 그달 어린이집 보육료는 자부담",
  },
  {
    from: "어린이집(보육료)",
    to: "집(양육수당·부모급여 현금)",
    by15: "그달 양육수당·부모급여(현금) 전액 지원 — 그달 어린이집 보육료는 자부담",
    after16: "그달은 퇴소일까지 보육료 지원, 양육수당·부모급여(현금)는 다음 달 1일부터 — 그달 현금은 안 나옴",
  },
];

export default function ChildcareChoiceGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="어린이집에 보내면 보육료, 유치원에 보내면 유아학비, 집에서 키우면 양육수당입니다. 한 아이에게 동시에 나오지 않고, 옮기는 날짜에 따라 한 달 치가 달라집니다."
        updated={`최종 수정 ${G.updated} · 금액은 복지로 원문 2026년 단가, 변경 규칙은 교육부 「${DOC}」에서 ${CHECKED} 확인`}
      >
        <DocSection title="한 장으로 보면 (2026년)">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">어디서</th>
                  <th className="px-3 py-2 font-semibold">제도</th>
                  <th className="px-3 py-2 font-semibold">원문의 2026년 금액</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2">어린이집</td>
                  <td className="px-3 py-2">영유아보육료</td>
                  <td className="px-3 py-2">
                    기본보육 지원 단가 0세반 {won(584_000)} · 1세반 {won(515_000)} · 2세반{" "}
                    {won(426_000)} · 3~5세반 {won(280_000)}
                  </td>
                </tr>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2">유치원</td>
                  <td className="px-3 py-2">유아학비(3~5세)</td>
                  <td className="px-3 py-2">
                    교육비 국공립 월 {won(100_000)} · 사립 월 {won(280_000)}
                    <br />
                    방과후 과정비 국공립 월 {won(50_000)} · 사립 월 {won(70_000)}
                    <br />
                    사립유치원 법정저소득층 추가 월 최대 {won(200_000)}(2026년 3월부터)
                  </td>
                </tr>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2">집 (0~23개월)</td>
                  <td className="px-3 py-2">부모급여(현금)</td>
                  <td className="px-3 py-2">0세 {won(1_000_000)} · 1세 {won(500_000)}</td>
                </tr>
                <tr className="border-b border-line align-top">
                  <td className="px-3 py-2">집 (24~86개월 미만)</td>
                  <td className="px-3 py-2">가정양육수당</td>
                  <td className="px-3 py-2">
                    월 {won(100_000)}(장애아동 10~20만원, 농어촌아동 10~15.6만원 연령별 차등)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Source>
            보육료·유아학비·양육수당은 각 복지로 원문, 부모급여 금액은 {docLink("93쪽")}의 괄호
            표기(&ldquo;0세 100만원, 1세 50만원&rdquo;)입니다. {CHECKED} 확인.
          </Source>
          <DocNote title="보육료는 부모 통장으로 들어오는 돈이 아닙니다">
            보육료는 2021년 3월부터 <strong>국민행복카드</strong>로 어린이집에 결제하는 방식으로
            지원됩니다(기발급된 아이행복카드도 사용 가능, {DOC} 89쪽). 표의 보육료 금액은 원문이
            &ldquo;지원 단가&rdquo;라고 적은 값입니다. 0·1세가 어린이집에 다니면 부모급여와의 차액을
            현금으로 받는 구조는{" "}
            <Link href="/guide/baby-money" className="text-brand underline">
              출산·육아 지원금 글
            </Link>
            에 따로 적었습니다.
          </DocNote>
        </DocSection>

        <DocSection title="한 아이에게는 하나만 나옵니다">
          <DocList
            items={[
              <>
                <strong>가정양육수당</strong>은 어린이집·유치원(특수학교 포함)·종일제
                아이돌봄서비스를 이용하지 않고 가정에서 양육되는 아이가 대상입니다.
              </>,
              <>
                <strong>유아학비</strong> 원문은 &ldquo;가정 양육수당 및 어린이집 보육료를 지원받고
                있는 유아&rdquo;를 지원대상에서 제외하고, 유치원 이용시간에 아이돌봄서비스와도
                중복지원이 안 된다고 적습니다.
              </>,
              <>
                유치원·어린이집의 누리과정 무상 지원 기간은 <strong>3년을 넘을 수 없습니다</strong>
                (유아교육법 제24조, 같은 법 시행령 제29조). 취학을 유예하면 유예한 1년에 한해 만 5세
                지원이 이어집니다(취학유예 통지서 제출).
              </>,
            ]}
          />
          <Source>가정양육수당·유아학비·영유아보육료 복지로 원문 · {CHECKED} 확인</Source>
        </DocSection>

        <DocSection title="옮길 때 — 15일이 기준입니다">
          <p>
            집 ↔ 어린이집으로 옮기면서 자격 변경을 신청할 때, <strong>그달 15일 이내에 신청했는지
            16일 이후인지</strong>에 따라 그달 받는 것이 갈립니다. 교육부 안내문은 이 차이 때문에
            &ldquo;보육료 자부담 발생 또는 중복수급으로 인한 환수 가능&rdquo;하다고 적습니다.
          </p>
          <div className="space-y-3">
            {SWITCHES.map((s) => (
              <div key={s.from} className="overflow-hidden rounded-xl border border-line bg-white">
                <p className="border-b border-line bg-sunken px-4 py-2.5 text-sm font-extrabold text-ink">
                  {s.from} → {s.to}
                </p>
                <dl className="divide-y divide-line text-sm">
                  <div className="flex gap-3 px-4 py-2.5">
                    <dt className="w-24 shrink-0 text-muted">15일 이내 신청</dt>
                    <dd className="min-w-0 text-slate-700">{s.by15}</dd>
                  </div>
                  <div className="flex gap-3 px-4 py-2.5">
                    <dt className="w-24 shrink-0 text-muted">16일 이후 신청</dt>
                    <dd className="min-w-0 text-slate-700">{s.after16}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <Source>{docLink("93쪽 「보육비용 신청 관련 안내문」 · 323쪽")} · {CHECKED} 확인</Source>
          <DocNote tone="amber" title="15일 안에 집으로 바꿨다면 카드로 보육료를 결제하지 마세요">
            안내문은 &ldquo;당월 15일 이내 양육수당으로 변경신청 후 퇴소하는 경우, 국민행복카드로
            보육료 결제를 하지 않도록 유의&rdquo;하라고 적습니다. 그달은 현금이 전액 나오므로, 카드로
            결제하면 &ldquo;중복수급으로 인한 보육료 결제 취소 사유&rdquo;에 해당합니다.
          </DocNote>
        </DocSection>

        <DocSection title="어린이집에 들어가는 날과 신청일을 맞추세요">
          <p>
            어린이집 입소와 보육료 신청은 별개입니다. 보호자가 입소일 전이나 입소와 동시에 보육료
            자격을 신청해야 하고, 날짜가 어긋나면 그 사이 보육료를 부모가 냅니다.
          </p>
          <DocList
            items={[
              <>
                <strong>입소일 이후 신청</strong> — 신청일부터 지원(그 전 며칠은 자부담 가능)
              </>,
              <>
                <strong>입소일 = 신청일</strong> — 입소일부터 지원
              </>,
              <>
                <strong>입소일 이전 신청</strong> — 입소일부터 지원
              </>,
            ]}
          />
          <p>
            0~1세(0~23개월) 아이가 어린이집을 그만둘 때는{" "}
            <strong>퇴소 희망일 7일 전까지</strong> 어린이집에 퇴소신청서를 내야 합니다(사진·이메일
            제출 가능). 입퇴소한 달의 보육료를 정산해 부모에게 사후 지급하기 때문입니다.
          </p>
          <Source>영유아보육료 복지로 원문 · {docLink("77·93쪽")} · {CHECKED} 확인</Source>
        </DocSection>

        <DocSection title="유치원으로 옮길 때는 소급이 안 됩니다">
          <p>유아학비 원문의 주의 사항입니다.</p>
          <DocList
            items={[
              <>
                보육료·양육수당을 받고 있었다면 <strong>반드시 유아학비로 변경 신청</strong>해야
                지원되고, <strong>소급 지원이 안 됩니다.</strong>
              </>,
              <>
                신청일 기준으로 지급되며, 유아학비를 신청하는 순간 <strong>보육료는 즉시 중단</strong>
                되고 양육수당은 변경신청일 기준에 따라 중단됩니다.
              </>,
              <>해외 체류 기간이 31일째가 되는 날 지원 자격이 중지되고, 다시 받으려면 재신청해야 합니다.</>,
              <>
                온라인 신청은 부모만 할 수 있습니다. 조부모·후견인 등은 주소지 읍면동 주민센터에서
                신청합니다.
              </>,
            ]}
          />
          <Source>유아학비 지원(3~5세 누리과정 지원) 복지로 원문 · {CHECKED} 확인</Source>
        </DocSection>

        <DocSection title="2026년 반 나이 기준">
          <p>
            어린이집 반은 태어난 해로 정합니다(&rsquo;26년 3월~&rsquo;27년 2월 적용, 영유아보육료
            원문).
          </p>
          <DocList
            items={[
              <>0세 — &rsquo;25.1.1. 이후 출생</>,
              <>1세 — &rsquo;24년생 · 2세 — &rsquo;23년생</>,
              <>3세 — &rsquo;22년생 · 4세 — &rsquo;21년생 · 5세 — &rsquo;20년생(취학유예 &rsquo;19년생)</>,
            ]}
          />
        </DocSection>

        <DocSection title="신청과 문의">
          <p>
            복지로 또는 주민센터에서 신청합니다. 제도 사이 변경 기준이 서로 달라 원문도
            보건복지상담센터 <strong>129</strong>나 지자체에 문의하라고 적습니다.
          </p>
          <ul className="space-y-1 text-sm">
            {[CARE, KINDER, HOME, PARENT].filter(Boolean).map((s) => (
              <li key={s!.id}>
                <Link href={`/service/${s!.id}`} className="text-brand underline">
                  {s!.name} — 복지로 원문 →
                </Link>
              </li>
            ))}
          </ul>
          <DocNote>
            이 글은 복지로 원문과 교육부 보육사업안내를 옮긴 것이며, 받을 수 있는지 판정하지
            않습니다. 단가와 규칙은 해마다 바뀌니 신청 직전에 그해 기준을 다시 확인해 주세요.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="childcare-choice" />
    </>
  );
}
