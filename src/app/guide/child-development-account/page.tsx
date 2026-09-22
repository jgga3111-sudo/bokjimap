import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import CdaCalc from "@/components/CdaCalc";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import {
  CDA_BIZ_URL,
  CDA_CHECKED,
  CDA_DOC,
  CDA_EXIT,
  CDA_FAQ_URL,
  CDA_MATCH_BASE,
  CDA_MAX_MATCH,
  CDA_MAX_SAVE,
  CDA_OFFICIAL_TABLE,
  CDA_ORG,
  CDA_SOURCE_ID,
  CDA_TABLE_YEARS,
  CDA_USES,
} from "@/lib/cda";
import { won } from "@/lib/display";

const G = guideBySlug("child-development-account")!;
const S = services.find((s) => s.id === CDA_SOURCE_ID);

export const metadata: Metadata = {
  title: "디딤씨앗통장, 정부가 얹어 주는 돈은 월 10만원입니다 — 복지로 원문과 어긋나는 곳",
  description:
    "아동발달지원계좌(디딤씨앗통장)는 아이가 매달 넣은 돈의 2배를 정부가 월 10만원까지 얹어 줍니다. 복지로 원문에는 「월 최대 5만원」이라 적힌 줄이 남아 있습니다. 통장이 왜 둘인지, 중간에 찾으면 정부 돈은 어떻게 되는지를 아동복지법 시행규칙과 국가아동권리보장원 안내로 확인했습니다.",
  alternates: { canonical: "/guide/child-development-account" },
};

/*
  왜 이 글인가 (2026-09-23 아침 루틴).

  조회수 26위(약 65만)인데 「따로 확인한 것」이 0이던 사업이다. 데이터랩 6~8월
  월평균은 실업급여의 0.12배로, 오늘 후보 넷 가운데 가장 컸다.

  복지로 원문에 금액은 있다. 없는 것은 ① 원문 두 줄이 어긋난다는 사실
  ② 통장이 둘이라는 것 ③ 중간에 찾으면 정부 돈은 어떻게 되는지다.
  근거와 한계는 `lib/cda.ts` 머리말에 적어 두었다.
*/

function Src({ what }: { what: string }) {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      <a href={CDA_BIZ_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
        {CDA_ORG} 디딤씨앗통장 사업안내
      </a>
      {" · "}
      {what} · {CDA_CHECKED} 확인
    </p>
  );
}

const th = "px-3 py-2 font-semibold";
const td = "px-3 py-2";

export default function CdaGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="취약계층 아이가 통장에 돈을 넣으면 정부가 그 두 배를 얹어 주고, 18세가 된 뒤 자립에 쓸 때 찾는 통장입니다. 얼마가 얹히는지, 중간에 찾으면 얹힌 돈은 어떻게 되는지가 복지로 원문에 제대로 적혀 있지 않아 따로 확인했습니다."
        updated={`최종 수정 ${G.updated} · ${CDA_ORG} 안내와 아동복지법 시행규칙에서 ${CDA_CHECKED} 확인`}
      >
        <DocNote title="복지로 원문 안에서 두 줄이 어긋나 있습니다">
          같은 칸 앞줄은 「월 {won(CDA_MATCH_BASE)} 내의 범위에서 1:2로 매칭하여 국가(지자체)가 월{" "}
          {won(CDA_MAX_MATCH)} 내 지원」이라고 적고, 뒷줄은 「정부 매칭 지원금은 월 최대{" "}
          {won(CDA_MATCH_BASE)}까지 가능」이라고 적습니다. 절반이 차이 납니다.
          <br />
          <strong>아동복지법 시행규칙 제19조제2항</strong>은 「해당 아동이 적립한 금액의 <strong>2배</strong>에
          해당하는 금액을 매월 지원한다」이고, {CDA_ORG}이 공개한 상품표도 정부지원 계좌를 「1천 원 이상{" "}
          <strong>10만 원</strong> 이하」로 적습니다. 이 글은 10만원으로 셉니다. 신청 전에 보건복지상담센터{" "}
          <strong>129</strong>나 관할 시·군·구청에 한 번 더 확인하세요.
        </DocNote>

        <DocSection title="정부가 얹어 주는 돈은 내가 넣은 돈의 두 배">
          <p>
            아이(보호자·후원자)가 한 달에 넣은 돈의 2배를 국가와 지방자치단체가 다음 달에 넣어 줍니다. 매칭이
            붙는 몫은 월 {won(CDA_MATCH_BASE)}까지라, 정부가 넣는 돈은 월 {won(CDA_MAX_MATCH)}이 최대입니다.
            아이 쪽 통장에는 월 {won(CDA_MAX_SAVE)}까지 넣을 수 있지만, {won(CDA_MATCH_BASE)}을 넘긴 몫에는
            매칭이 붙지 않습니다.
          </p>
          <DocList
            items={[
              <>
                <strong>1:2 매칭</strong> — {won(CDA_MATCH_BASE)}을 넣으면 정부가 {won(CDA_MAX_MATCH)}을 넣어 한 달에{" "}
                {won(150_000)}이 쌓입니다.
              </>,
              <>
                매칭금은 <strong>그달 적립액을 합쳐 다음 달에</strong> 들어옵니다. 적립과 매칭은 소급되지 않아서,
                그달 1일부터 말일 사이에 넣어야 그달 몫으로 셉니다.
              </>,
              <>
                아동수당·부모급여도 이 통장에 넣을 수 있습니다. 그것까지 합쳐 월 {won(CDA_MAX_SAVE)}까지입니다.
              </>,
            ]}
          />
          <Src what="「매칭 및 적립」" />
        </DocSection>

        <DocSection title="통장이 두 개인 이유">
          <p>
            디딤씨앗통장은 계좌가 둘입니다. 아이가 넣는 <strong>「디딤씨앗 적립예금」</strong>과 정부가 넣는{" "}
            <strong>「디딤씨앗 국공채 투자신탁」</strong>입니다. 통장을 받아 보면 예금 통장 이름이 아이 이름이 아니라{" "}
            <strong>시·군·구 이름</strong>으로 되어 있어 놀라기 쉬운데, 잘못 만든 것이 아닙니다.
          </p>
          <p>
            정부가 매달 얼마를 얹을지 정하려면 그달에 얼마가 입금됐는지를 봐야 하는데, 아이 이름으로 통장을 열면
            금융실명제의 비밀보장 때문에 매달 아이 동의서를 받아야 합니다. 그래서 예금 통장만 시·군·구 이름으로
            열고, 아이 이름을 함께 적어 두며,{" "}
            <strong>입출금·만기·해지에서의 법적 지위는 아이 이름으로 연 것과 같게</strong> 운영한다고 적혀 있습니다.
          </p>
          <Src what="자주하는 질문 「왜 2개의 계좌로 구성되어 있나요」" />
        </DocSection>

        <DocSection title="18세까지 넣으면 얼마가 되나">
          <CdaCalc />
          <p className="mt-4">
            {CDA_ORG}이 공개한 만기 수령액 표입니다. 이자를 뺀 금액이고, 위 계산기는 이 표 열다섯 칸과 모두 같은
            값을 냅니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm tabular-nums">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className={th}>매달 넣는 돈</th>
                  {CDA_TABLE_YEARS.map((y) => (
                    <th key={y} className={th}>
                      {y}년
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CDA_OFFICIAL_TABLE.map((row) => (
                  <tr key={row.monthly} className="border-b border-line">
                    <td className={`${td} font-medium text-ink`}>{won(row.monthly)}</td>
                    {row.years.map((v, i) => (
                      <td key={CDA_TABLE_YEARS[i]} className={td}>
                        {v.toLocaleString("ko-KR")}만원
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600">
            월 {won(100_000)} 줄이 월 {won(50_000)} 줄보다 정부 지원이 늘지 않는 것은, {won(CDA_MATCH_BASE)}을
            넘긴 몫에는 매칭이 붙지 않기 때문입니다. 늘어난 것은 내가 넣은 돈뿐입니다.
          </p>
          <Src what={`${CDA_DOC} p.76을 인용한 자주하는 질문`} />
          <DocNote tone="brand" title="이자는 따로 붙습니다">
            2026년 3월 기준으로 적립예금은 만기까지 남은 기간에 따라 연 2.90%(1개월 이상)에서 3.20%(48개월 이상)로
            붙고, 일반정기적금 고시금리가 바뀌면 함께 바뀝니다. 정부 쪽 국공채 투자신탁은 목표수익률이 「적립 시점의
            국공채 1년 금리 + 0.6%」이고 최근 1년 평균 수익률은 2.03%, 신탁보수는 0.3%라고 적혀 있습니다. 해마다
            달라지는 값이라 위 계산에는 넣지 않았습니다.
          </DocNote>
        </DocSection>

        <DocSection title="중간에 찾으면 정부가 얹은 돈은 어떻게 되나">
          <p>
            여기가 이 통장에서 가장 헷갈리는 자리입니다. 중간에 찾는다고 정부 돈이 무조건 사라지지는 않지만,{" "}
            <strong>그 자리에서 함께 나오지는 않습니다.</strong>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className={th}>어떻게 찾나</th>
                  <th className={th}>조건</th>
                  <th className={th}>내가 넣은 돈</th>
                  <th className={th}>정부가 얹은 돈</th>
                </tr>
              </thead>
              <tbody>
                {CDA_EXIT.map((e) => (
                  <tr key={e.kind} className="border-b border-line align-top">
                    <td className={`${td} font-medium text-ink`}>{e.kind}</td>
                    <td className={td}>
                      {e.when}
                      <span className="mt-1 block text-xs text-muted">{e.note}</span>
                    </td>
                    <td className={td}>받음</td>
                    <td className={`${td} ${e.match ? "font-semibold text-brand" : ""}`}>
                      {e.match ? "받음" : "이때는 안 나옴"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DocList
            items={[
              <>
                <strong>조기 인출</strong>로 쓸 수 있는 용도는 셋뿐입니다 — 학자금, 기술자격·취업훈련, 의료비.
                의료비는 의료급여·긴급복지 같은 다른 지원을 받지 못하는 경우에 한합니다.
              </>,
              <>
                <strong>중도 해지</strong>는 아이의 사망·이민 같은 경우이고, 이때 정부매칭금은 환수됩니다. 다만 24세
                이후에 사망한 경우에는 매칭금도 상속인에게 갑니다.
              </>,
              <>
                시설·위탁으로 보호받던 아이가 <strong>가정으로 돌아가거나</strong> 가구가 수급에서 벗어나도 통장은
                그대로 이어집니다. 입양되는 경우도 원칙은 계속 지원이고, 입양부모가 원하면 중도해지를 고를 수
                있는데 이때는 정부매칭금이 환수됩니다.
              </>,
            ]}
          />
          <Src what={`${CDA_DOC} p.65~68을 인용한 「디딤씨앗통장 해지」`} />
        </DocSection>

        <DocSection title="만기에 쓸 수 있는 곳">
          <p>
            18세가 되고 아래 용도를 갖추면 내가 넣은 돈과 정부가 얹은 돈을 함께 찾습니다. 17세라도 용도를 갖추면
            시·군·구 판단으로 찾을 수 있고(’25년부터), <strong>24세가 되면 용도를 따지지 않고 전액</strong>{" "}
            받습니다.
          </p>
          <DocList items={CDA_USES.map((u) => <>{u}</>)} />
          <p>
            찾는 절차는 적립예금 통장을 들고 관할 시·군·구청에 가서 「디딤씨앗통장 적립금 사용 신청서」와 증빙(학자금
            고지서 등)을 내고, 승인이 나면 받은 「적립금 지급 요청서」와 신분증을 들고 신한은행 지점에서 받는
            순서입니다. 주소지와 사는 곳이 다르면 사는 곳에서도 신청할 수 있습니다.
          </p>
          <Src what={`${CDA_DOC} 자주하는 질문 「해지 절차는?」`} />
        </DocSection>

        <DocSection title="누가 가입하나 — 원문과 다른 곳">
          <p>아동복지법 시행규칙 제19조제1항이 정한 대상은 지금 셋입니다.</p>
          <DocList
            items={[
              <>법 제15조제1항제3호부터 제5호까지에 따라 <strong>보호조치 중인 아동</strong></>,
              <>「장애인복지법」 제58조에 따른 <strong>장애인복지시설에 입소 중인 아동</strong></>,
              <>
                「국민기초생활 보장법」에 따른 <strong>수급자·차상위계층 가정의 아동</strong> 중 보건복지부장관이
                정하는 아동
              </>,
            ]}
          />
          <p>
            {CDA_ORG} 안내는 이것을 18세 미만의 아동복지시설(아동양육시설·공동생활가정) 보호아동, 가정위탁
            보호아동, 장애인거주시설 아동, 생계·의료·주거·교육급여 수급가구 아동, 차상위계층과 한부모가족 가정
            아동으로 풀어 적습니다. 차상위계층 아동은 <strong>2025년부터</strong> 들어왔습니다.
          </p>
          <DocNote title="복지로 원문에 남아 있는 갈래가 있습니다">
            복지로 원문은 대상에 「소년소녀가정 아동」과 「장애인생활시설 아동」을 적고 있습니다. 시행규칙 제19조제1항
            제3호는 <strong>2026년 4월 2일 개정으로 삭제</strong>됐고, 지금 조문과 {CDA_ORG} 안내에는 소년소녀가정이라는
            갈래가 없습니다. 시설 이름도 조문은 「장애인복지시설」, 안내는 「장애인거주시설」로 적습니다. 어느 쪽이
            지금 창구에서 쓰이는 기준인지는 저희가 판정하지 않습니다 — 해당된다고 생각되면 129나 읍·면·동 행정복지센터에
            물어보세요.
          </DocNote>
          <p className="text-xs text-muted">
            근거 — 아동복지법 제42~44조, 같은 법 시행규칙 제19·20조(국가법령정보센터 전문, 시행 2026-08-04) ·{" "}
            <a href={CDA_FAQ_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
              {CDA_ORG} 자주하는 질문
            </a>
          </p>
        </DocSection>

        <DocSection title="언제까지 받나">
          <p>
            정부 지원은 18세 미만까지입니다. 그런데 끝나는 달을 아이 생일로 세면 어긋날 수 있습니다 — 기준은{" "}
            <strong>적립계좌 만기일이 속한 달</strong>입니다. 예를 들어 생일이 3월 15일이고 적립계좌 만기일이 3월
            10일이면, 3월까지 넣은 돈에 대해 4월에 매칭금이 들어오고 끝납니다.
          </p>
          <p>
            다만 통장에 든 총 가입기간이 6개월 이하이면 만기일이 아니라 <strong>18세가 되는 생일이 속한 달</strong>
            까지입니다.
          </p>
          <Src what="자주하는 질문 「정부의 1:2 매칭금 지원기간은 어떻게 되나요」" />
        </DocSection>

        <DocSection title="신청과 문의">
          <p>
            기초생활수급·차상위 가정 아동은 <strong>주소지 읍·면·동 행정복지센터</strong>에 신청하고, 시설·가정위탁
            아동은 시설이나 읍·면·동이 명단을 모아 시·군·구에 냅니다. 시·군·구가 대상을 정하면 협력은행이 통장을
            만듭니다. 복지로 누리집에서도 「서비스 신청」이 됩니다.
          </p>
          <p>
            통장 개설·매칭금·해지 문의는 관할 시·군·구청과 보건복지상담센터 <strong>129</strong>,{" "}
            {CDA_ORG} 자산형성관리팀 <strong>02-6454-8500</strong>입니다. 아이에게 매달 돈을 넣어 줄 후원자를 찾는
            일은 후원자관리센터 <strong>1670-1834</strong>에서 맡습니다.
          </p>
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문 →
              </Link>
            </p>
          )}
          <p>
            다 큰 뒤에 드는 통장으로는{" "}
            <Link href="/guide/youth-tomorrow-savings" className="text-brand underline">
              청년내일저축계좌
            </Link>
            와{" "}
            <Link href="/guide/hope-savings" className="text-brand underline">
              희망저축계좌
            </Link>{" "}
            글이 따로 있습니다.
          </p>
          <DocNote>
            이 글은 아동복지법과 {CDA_ORG}이 공개한 안내에 적힌 것을 옮긴 것이며, 누가 가입할 수 있는지 판정하지
            않습니다. 이율과 수익률은 2026년 3월 기준 값이라 지금과 다를 수 있습니다.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="child-development-account" />
    </>
  );
}
