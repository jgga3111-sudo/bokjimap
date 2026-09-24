import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import { thresholdOf } from "@/lib/midIncome";
import { won } from "@/lib/display";
import { YS_CHECKED, YS_DOC, YS_KINDS, YS_OVERLAP, YS_SOURCE_ID } from "@/lib/youthSpecial";

const G = guideBySlug("youth-special-support")!;
const S = services.find((s) => s.id === YS_SOURCE_ID);
/** 복지로 원문에 붙은 지침 PDF. 첨부 목록에서 이름으로 찾는다. */
const GUIDE_PDF = S?.forms.find((f) => f.name.includes("청소년사업 안내"))?.url ?? null;

export const metadata: Metadata = {
  title: "청소년특별지원, 생활비와 치료비는 누구에게 나오나 — 네 가지 위기 요건과 최대 3년",
  description:
    "9~24세 위기청소년에게 생활·건강·학업·자립·상담·법률·활동비를 지원합니다. 생활비와 치료비는 보호자가 없거나 고립·은둔한 청소년에게만, 부모 소득은 함께 사는 부모만 세고, 학업·자립지원은 3년까지 — 복지로 원문에 없는 기준을 성평등가족부 2026년 지침으로 확인했습니다.",
  alternates: { canonical: "/guide/youth-special-support" },
};

/*
  왜 이 글인가 (2026-09-24 아침 루틴).

  조회수 21위(약 99만)인데 「따로 확인한 것」이 0이었다. 원문은 종류별 상한만 적고,
  누가 생활비를 받는지·부모 소득을 어떻게 세는지·몇 년까지인지가 없다.
  근거와 원문·지침이 어긋나는 곳은 `lib/youthSpecial.ts` 머리말.
*/

function Src({ pages }: { pages: string }) {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      {GUIDE_PDF ? (
        <a href={GUIDE_PDF} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
          {YS_DOC}
        </a>
      ) : (
        <>{YS_DOC}</>
      )}{" "}
      {pages} · {YS_CHECKED} 확인
    </p>
  );
}

const th = "px-3 py-2 font-semibold";
const td = "px-3 py-2";

export default function YouthSpecialSupportGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="어려운 처지의 9~24세 청소년에게 생활비·치료비·학원비·상담비 등을 시·군·구가 지원하는 제도입니다. 복지로 원문은 종류별 상한액만 적어 두어서, 실제로 갈리는 기준을 성평등가족부 2026년 지침에서 옮겼습니다."
        updated={`최종 수정 ${G.updated} · 성평등가족부 지침에서 ${YS_CHECKED} 확인`}
      >
        <DocNote tone="brand" title="생활비와 치료비는 모든 대상자에게 나오지 않습니다">
          생활지원(월 65만원 이하)과 건강지원은 <strong>보호자가 없거나 실질적으로 보호를 받지 못하는 청소년</strong>,
          그리고 <strong>고립·은둔 청소년</strong>에게만 줍니다(시행령 제7조제1항 단서). 학교 밖 청소년이라도 부모의
          보호를 받고 있다면 학업·자립·상담 같은 다른 지원을 받습니다.
          <Src pages="542·559쪽" />
        </DocNote>

        <DocSection title="누가 받나 — 두 가지를 모두">
          <p>
            <strong>나이</strong>는 9세가 되는 해 1월 1일부터 24세가 끝나는 해 12월 31일까지입니다. 여기에 아래 네
            가지 중 <strong>하나 이상</strong>에 해당하고, 가구 소득이 <strong>기준 중위소득 100% 이하</strong>여야
            합니다.
          </p>
          <DocList
            items={[
              <>보호지원 대상자 중 비행·일탈을 막기 위해 지원이 필요한 청소년</>,
              <>학교 밖 청소년(「학교 밖 청소년 지원에 관한 법률」 제2조제2호)</>,
              <>보호자가 없거나 실질적으로 보호자의 보호를 받지 못하는 청소년</>,
              <>
                다른 사람과 거의 교류하지 않거나 오랫동안 제한된 공간에서만 지내 일상생활이 현저히 어려운 청소년
                (고립·은둔 청소년, 2025.11.18. 시행령 개정으로 범위가 넓어짐)
              </>,
            ]}
          />
          <p>
            다른 법으로 <strong>같은 내용</strong>의 지원을 이미 받고 있으면 그 항목은 받지 못합니다. 내용이 다르면
            됩니다 — 아래 「같이 받을 수 없는 것」 참고.
          </p>
          <Src pages="541~543쪽" />
        </DocSection>

        <DocSection title="부모 소득은 이렇게 셉니다">
          <p>
            가구원은 <strong>실제로 생계나 주거를 함께하는 부모만</strong> 넣습니다. 주민등록이 어디에 있는지,
            친부모인지 양부모인지는 따지지 않습니다. 함께 사는 조부모나 19세 이상 형제·자매는 넣지 않습니다.
          </p>
          <DocList
            items={[
              <>아버지가 재혼했고 청소년이 어머니와 산다면 — 어머니와 청소년 2인 가구</>,
              <>청소년 둘과 부모, 조부모가 함께 산다면 — 조부모를 빼고 4인 가구</>,
              <>부모 없이 친척 집에서 산다면 — 친척은 빼고 청소년 1인 가구</>,
              <>19세 이상 형·누나가 아르바이트로 돌봐 준다면 — 청소년 1인 가구</>,
              <>
                쉼터에 있고 가정으로 돌아갈 수 없다고 확인되면 — 쉼터 소장이나 센터장 확인서로 1인 가구
              </>,
            ]}
          />
          <p>
            소득은 소득인정액(소득평가액 + 재산의 소득환산액)으로 봅니다. 근로소득은 30%를 빼고 세며, 34세 이하·65세
            이상·장애인의 근로·사업소득은 50%를 뺍니다. <strong>금융재산과 부채는 조사하지 않습니다.</strong>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className={th}>가구원 수</th>
                  <th className={th}>기준 중위소득 100% (월)</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((n) => (
                  <tr key={n} className="border-b border-line">
                    <td className={`${td} font-medium text-ink`}>{n}인</td>
                    <td className={`${td} tabular-nums`}>{won(thresholdOf(n, 100))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted">
            2026년 기준 중위소득(보건복지부 고시 제2025-135호)이고 지침 549쪽 표와 같은 값입니다. 내 소득이 이
            기준선의 어디쯤인지는{" "}
            <Link href="/check" className="text-brand underline">
              소득 자가진단
            </Link>
            에서 계산할 수 있습니다(판정이 아니라 계산입니다).
          </p>
          <Src pages="543·549쪽" />
        </DocSection>

        <DocSection title="무엇을 얼마까지">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className={th}>종류</th>
                  <th className={th}>상한</th>
                  <th className={th}>무엇에 쓰나</th>
                </tr>
              </thead>
              <tbody>
                {YS_KINDS.map((k) => (
                  <tr key={k.kind} className="border-b border-line align-top">
                    <td className={`${td} font-medium text-ink`}>
                      {k.kind}
                      {k.narrow && <span className="block text-xs font-normal text-muted">보호자 없음·고립·은둔만</span>}
                    </td>
                    <td className={`${td} tabular-nums`}>{k.cap}</td>
                    <td className={td}>{k.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            금액은 모두 <strong>「이하」</strong>입니다. 실제로 얼마를 줄지는 시·군·구 청소년복지심의위원회가
            정합니다. 생활지원만 청소년 계좌로 들어오고, 나머지는 <strong>서비스를 준 기관(병원·학원 등)에 바로
            입금</strong>하는 것이 원칙입니다.
          </p>
          <DocNote title="복지로 원문과 지침이 다른 곳 — 건강지원">
            복지로 원문은 건강지원을 <strong>「월 200만원 이하」</strong>로 적고, 성평등가족부 지침은 기준표(542쪽)와
            세부표(562쪽) 두 곳에서 <strong>「연 200만원 이하」</strong>로 적습니다. 시행령은 금액을 장관이 정한다고만
            하므로 이 글은 지침을 따랐습니다. 비급여 진료는 원칙적으로 빠지고 시·군·구가 따로 판단합니다.
          </DocNote>
          <DocList
            items={[
              <>
                <strong>한 가지가 원칙입니다.</strong> 가장 필요한 1개 항목을 지원하고, 심의를 거치면 2개 이상도
                됩니다.
              </>,
              <>
                <strong>한 가구에서 생활지원은 2명까지</strong>입니다. 생활지원이 아닌 지원은 셋째부터도 받을 수 있습니다.
              </>,
              <>
                상한을 넘는 몫을 「기타지원」으로 더 받을 수는 없습니다. 지침이 든 예로, 생활비 80만원이 필요해도
                생활지원 65만원까지만 인정됩니다.
              </>,
              <>
                미인가 대안학교는 학업지원 대상 학교가 아닙니다. 검정고시 학원비를 받으면 매달 출석 증빙을 내고
                실제로 시험에 응시해야 합니다.
              </>,
              <>청소년상담복지센터의 상담비는 상담지원 대상이 아닙니다.</>,
            ]}
          />
          <Src pages="560~565쪽" />
        </DocSection>

        <DocSection title="얼마나 오래 받나">
          <p>
            지원 기간은 <strong>1년 이내</strong>이고, 필요하면 <strong>1년 범위에서 한 번 연장</strong>합니다.{" "}
            <strong>학업지원과 자립지원은 두 번까지 연장</strong>할 수 있어 최대 3년입니다(시행령 제7조제3항).
            연장할 때는 소득과 자격 변동을 다시 봅니다.
          </p>
          <p>
            지급은 <strong>신청한 날부터</strong> 셉니다 — 결정이 늦게 나도 신청일로 거슬러 올라가 줍니다. 정기
            지급일은 매월 20일처럼 시·군·구가 정합니다.
          </p>
          <DocNote title="중간에 끊기는 경우">
            나이 기준을 넘거나, 부모 소득이 바뀌었거나, 취업해서 지원이 필요 없어졌거나, 연락이 끊기거나,{" "}
            <strong>외국에 90일 이상 머물면</strong> 지원이 멈춥니다. 변동이 확인된 달(또는 그다음 달)부터
            멈추고, 부당하게 받았거나 정한 용도와 다르게 쓴 돈은 돌려받아 갑니다.
          </DocNote>
          <Src pages="557~558·560~561쪽" />
        </DocSection>

        <DocSection title="같이 받을 수 없는 것">
          <p>
            <strong>같은 내용만 막습니다.</strong> 지침이 든 예로, 생계급여와 의료급여를 받는 청소년은 특별지원의
            생활지원·건강지원은 못 받지만 학업·자립·상담지원은 받을 수 있습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className={th}>특별지원 항목</th>
                  <th className={th}>이미 받고 있으면 그 항목은 안 되는 것</th>
                </tr>
              </thead>
              <tbody>
                {YS_OVERLAP.map((o) => (
                  <tr key={o.kind} className="border-b border-line align-top">
                    <td className={`${td} font-medium text-ink`}>{o.kind}</td>
                    <td className={td}>{o.with}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            쉼터 같은 시설에 들어가 있으면 먹고 자는 것이 보장되므로 생활지원 대상이 아닙니다(다른 항목은 됩니다).
            반대로 <strong>주거급여만 받고 생계비는 안 받는다면 생활지원을 받을 수 있습니다.</strong>
          </p>
          <Src pages="542·559~560쪽" />
        </DocSection>

        <DocSection title="신청은 누가, 어디서">
          <p>
            청소년 본인이나 보호자뿐 아니라 <strong>청소년지도사·청소년상담사·교사·사회복지사·청소년 담당
            공무원</strong>도 대신 신청할 수 있습니다. 본인이 아닌 사람이 신청하면 청소년의 동의가 있어야 합니다
            (법 제15조). 장소는 주소지 읍·면·동 행정복지센터이고, <strong>주소와 실제로 사는 곳이 다르면 사는 곳에서도
            신청할 수 있습니다.</strong> 1년 내내 받습니다.
          </p>
          <p>
            사회보장급여 신청서와 「특별지원 사전 검토서」를 냅니다. 결정은 <strong>신청일부터 30일 안에</strong>
            나오고, 조사가 필요하면 14일 늘어납니다. 결과는 지원 내용·금액·기간을 적어 서면으로 알려 줍니다.
          </p>
          <DocNote tone="brand" title="급할 때는 심의 없이 먼저 받을 수 있습니다">
            가정 밖에 있거나 성매매에 노출될 위험이 있는 등 30일을 기다릴 수 없으면, 시·군·구가 심의위원회를
            거치지 않고 먼저 지원할 수 있습니다(법 제15조제3항). 이 긴급지원은 <strong>생활지원·건강지원에 한해 3회
            (3개월)</strong>가 원칙이고, 뒤에 심의위원회가 계속 줄지 정합니다.
          </DocNote>
          <Src pages="540·545~546·555쪽" />
        </DocSection>

        <DocSection title="확인과 문의">
          <p>
            문의는 주소지 읍·면·동 행정복지센터와 가까운 <strong>청소년상담복지센터</strong>·
            <strong>학교밖청소년지원센터</strong>입니다. 선정되면 이 센터들이 지원 기간 동안 사례관리를 맡습니다.
            청소년 상담전화는 <strong>1388</strong>입니다.
          </p>
          {S && (
            <p>
              <Link href={`/service/${S.id}`} className="text-brand underline">
                {S.name} 상세 보기 — 복지로 원문 →
              </Link>
            </p>
          )}
          <DocNote>
            이 글은 성평등가족부 지침과 시행령에 적힌 것을 옮긴 것이며, 누가 받을 수 있는지 판정하지 않습니다.
            위기 상황과 소득은 시·군·구가 조사해 정합니다.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="youth-special-support" />
    </>
  );
}
