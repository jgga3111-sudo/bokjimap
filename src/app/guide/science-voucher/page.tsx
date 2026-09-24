import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import {
  SV_CHECKED,
  SV_SOURCE_ID,
  SV_NOTICE_URL,
  SV_NOTICE_NAME,
  SV_NOTICE_ON,
  SV_SITE,
  SV_POLICY_URL,
  SV_TEL,
  SV_MAIL,
  SV_POINT,
  SV_POINT_LAST_YEAR,
  SV_PEOPLE,
  SV_DATES,
  SV_WHAT,
  SV_CAUTION,
} from "@/lib/scienceVoucher";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("science-voucher")!;
const S = services.find((s) => s.id === SV_SOURCE_ID);

export const metadata: Metadata = {
  title: "과학문화바우처 10만원, 2026년 10월 12일 17시에 사라집니다",
  description:
    "2026년 과학문화바우처(과학바우처)는 1인당 10만원이고, 받은 포인트를 쓸 수 있는 기간이 2026년 7월 13일부터 10월 12일 17시까지입니다. 신청은 6월 2일에 끝났습니다. 한국과학창의재단 모집 공고와 지원센터 누리집으로 일정·사용처·소멸 규칙을 확인했습니다.",
  alternates: { canonical: "/guide/science-voucher" },
};

/*
  왜 이 글인가 (2026-09-21).

  서치콘솔에서 「과학바우처」가 몇 주째 노출 1위인데 클릭이 0이었다. 검색 결과에
  우리 상세가 걸려도 복지로 원문뿐이라 사람이 찾는 답 — 언제까지 쓰나 — 이 없었다.
  같은 날 아침 루틴에서는 1차 출처를 못 잡아 보류했고, 다시 찾아서 썼다.
  출처와 찾은 경로는 `lib/scienceVoucher.ts` 머리말.
*/

function SrcNotice() {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      <a href={SV_NOTICE_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
        {SV_NOTICE_NAME}
      </a>{" "}
      (한국과학창의재단, {SV_NOTICE_ON} 게시) · {SV_CHECKED} 확인
    </p>
  );
}

function SrcSite({ what, href }: { what: string; href: string }) {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
        과학문화바우처 지원센터 누리집
      </a>{" "}
      {what} · {SV_CHECKED} 확인
    </p>
  );
}

export default function ScienceVoucherGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="과학 도서와 교구를 살 수 있는 온라인 포인트입니다. 2026년에는 1인당 10만원으로 지난해의 두 배가 됐지만, 쓸 수 있는 날짜가 정해져 있고 그날이 지나면 남은 돈은 사라집니다."
        updated={`최종 수정 ${G.updated} · 모집 공고와 지원센터 누리집에서 ${SV_CHECKED} 확인`}
      >
        <DocNote title="2026년에 포인트를 받았다면 10월 12일 오후 5시까지입니다">
          지원센터 누리집 첫 화면과 모집 공고가 똑같이 적고 있습니다 —{" "}
          <strong>
            이용 기간 {SV_DATES.useFrom} ~ {SV_DATES.useTo}
          </strong>
          . 이 시각이 지나면 남은 포인트는 쓸 수 없고, 다음 해로 넘어가지도 현금으로 바뀌지도 않습니다.
        </DocNote>

        <DocSection title="2026년 일정 — 신청은 끝났고, 지금은 쓰는 기간입니다">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[380px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">무엇</th>
                  <th className="px-3 py-2 font-semibold">언제</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["신청 접수", `${SV_DATES.applyFrom} ~ ${SV_DATES.applyTo}`],
                  ["선정 결과 발표", SV_DATES.result],
                  ["포인트 사용", `${SV_DATES.useFrom} ~ ${SV_DATES.useTo}`],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-line">
                    <td className="px-3 py-2 font-medium text-ink">{k}</td>
                    <td className="px-3 py-2 tabular-nums">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SrcNotice />
          <p>
            복지로 원문에는 이 날짜가 없습니다. 「사용기간: 발행일로부터 3개월」이라고만 적혀 있어서, 내가 언제까지 써야
            하는지를 원문만 보고는 알 수 없습니다. 2027년 일정은 아직 나오지 않았습니다 — 나오면 같은 자리에 올립니다.
          </p>
          <DocNote tone="brand">
            신청은 <strong>한 해에 한 번</strong>이고, 이미 포인트를 받은 사람은 그해에 다시 신청할 수 없습니다. 2026년
            접수는 6월 2일에 끝났으므로, 올해 신청하지 못했다면 다음 해 공고를 기다려야 합니다.
          </DocNote>
        </DocSection>

        <DocSection title="얼마를 몇 명에게 주나">
          <DocList
            items={[
              <>
                1인당 <strong>{won(SV_POINT)}</strong> 온라인 포인트입니다. 지원센터 누리집의 「추진경과」는 2023년에
                3만원에서 5만원으로, <strong>2026년에 5만원에서 10만원으로</strong> 올랐다고 적습니다(지난해 대비 두 배,{" "}
                {won(SV_POINT_LAST_YEAR)} → {won(SV_POINT)}).
              </>,
              <>
                2026년 발행 규모는 <strong>총 {SV_PEOPLE.toLocaleString()}명</strong>이고, 공고는 여기에 한 줄을 붙여
                두었습니다 — 「예산규모 대비 <strong>1.1배수</strong> 이용자 선발」.
              </>,
              <>
                가족 단위로 신청하면 <strong>대표자 한 사람에게 포인트를 합쳐서</strong> 줍니다.
              </>,
            ]}
          />
          <SrcNotice />
          <DocNote title="예산이 떨어지면 기간 안이라도 못 씁니다">
            같은 공고와 「포인트 사용정책」 쪽이 <strong>「사용 기간 내라도 바우처 예산 소진 시 잔여 포인트 사용 불가」</strong>
            라고 적습니다. 예산보다 10% 많은 인원을 뽑았다는 문장과 나란히 있는 경고입니다. 언제 소진되는지는 어디에도
            적혀 있지 않으니, 남은 포인트가 있다면 10월 12일을 기다릴 이유가 없습니다.
          </DocNote>
        </DocSection>

        <DocSection title="누가 받을 수 있나 — 나이가 원문과 다릅니다">
          <p>
            2026년 공고의 신청 자격은 <strong>6세 이상(2020년 12월 31일 이전 출생자)</strong>인 기초생활수급자·차상위계층·법정
            한부모가족입니다(법정 증빙서류를 뗄 수 있는 사람). 신청 단위는 개인 또는 가족입니다.
          </p>
          <DocNote title="복지로 원문의 출생 연도는 한 해 낡았습니다">
            복지로 원문은 기준연도가 2026년인데도 「6세 이상(<strong>2019</strong>.12.31 이전 출생자)」로 적혀 있습니다.
            2026년 공고는 <strong>2020년 12월 31일</strong> 이전 출생자입니다. 원문 쪽을 그대로 읽으면 2020년생 아이를 둔
            가구가 「우리는 안 되겠네」 하고 넘기게 됩니다. 어느 쪽이 맞는지는 신청 시점의 공고가 정합니다.
          </DocNote>
          <p>
            선정 기준도 두 문서가 다릅니다. 복지로 원문은 「과학문화 바우처 이용 경험이 없는 신규 기초생활수급자·차상위계층」을
            선정 기준으로 적는데, 2026년 공고에는 그 문구가 없고 <strong>1.1배수 선발</strong>만 적혀 있습니다. 어느 쪽이
            실제 선정에 쓰였는지는 저희가 판단하지 않고, 두 문서를 그대로 옮깁니다.
          </p>
          <SrcNotice />
        </DocSection>

        <DocSection title="무엇을 살 수 있나">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">구분</th>
                  <th className="px-3 py-2 font-semibold">상품</th>
                </tr>
              </thead>
              <tbody>
                {SV_WHAT.map((r) => (
                  <tr key={r.kind} className="border-b border-line">
                    <td className="px-3 py-2 font-medium text-ink">{r.kind}</td>
                    <td className="px-3 py-2">{r.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SrcSite what="「포인트 사용정책」" href={SV_POLICY_URL} />
          <p>
            오프라인 상품도 있는데, 그 경우에도 <strong>누리집에서 예약을 끝낸 뒤 현장에서 쓰는</strong> 방식입니다.
            가게에서 카드처럼 긁는 바우처가 아닙니다.
          </p>
        </DocSection>

        <DocSection title="돈을 잃는 자리 다섯">
          <DocList items={SV_CAUTION.map((t, i) => <span key={i}>{t}</span>)} />
          <SrcSite what="「포인트 사용정책」·「바우처 이용안내」" href={SV_POLICY_URL} />
          <p>
            공고는 여기에 하나를 더합니다 — <strong>소액으로 남은 포인트는 복합결제</strong>(신용카드, 휴대전화 소액결제
            등)로 보태서 쓸 수 있습니다. 5천원이 남았다고 포기하지 않아도 된다는 뜻입니다.
          </p>
          <p>
            복지로 원문도 한 줄을 보탭니다 — 「발행된 바우처 포인트를 전액 미사용할 경우, 차년도 바우처 신청시 선정되지
            않을 수 있습니다」. 안 쓰면 그해 10만원만 잃는 것이 아닐 수 있다는 말입니다.
          </p>
        </DocSection>

        <DocSection title="확인과 문의">
          <p>
            내가 뽑혔는지, 포인트가 얼마나 남았는지는 <strong>과학문화바우처 누리집에 로그인해서</strong> 봅니다
            (과학문화바우처.kr). 사업은 과학기술정보통신부가 총괄하고 <strong>한국과학창의재단</strong>이 운영하며,
            포인트몰은 현대이지웰에 위탁돼 있습니다. 재원은 과학기술진흥기금과 복권기금입니다.
          </p>
          <p>
            문의:{" "}
            <a href={SV_SITE} target="_blank" rel="noopener noreferrer" className="text-brand underline">
              과학문화바우처 지원센터
            </a>{" "}
            <strong>{SV_TEL}</strong>(평일 09:00~18:00) · {SV_MAIL}
          </p>
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문 →
              </Link>
            </p>
          )}
          <DocNote>
            이 글은 모집 공고와 운영기관 누리집에 적힌 것을 옮긴 것이며, 누가 대상인지 판정하지 않습니다. 날짜와 금액은
            해마다 바뀌므로 신청 시점의 공고를 함께 확인하세요. 수록 원문에 첨부된 운영 요령은{" "}
            <strong>2023년 4월 개정본</strong>이라 이 글은 2026년 공고를 따랐습니다.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="science-voucher" />
    </>
  );
}
