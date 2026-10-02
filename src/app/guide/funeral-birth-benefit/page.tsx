import { serviceLink } from "@/lib/serviceLink";
import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";

const G = guideBySlug("funeral-birth-benefit")!;
const CHECKED = "2026-09-29";
/* 복지로 원문 첨부. 이 PC에서는 복지로가 내려받기를 막아(EFWSV00001) 법제처 생활법령 미러로 받아 읽었다. */
const PDF =
  "https://bokjiro.go.kr/ssis-tbu/CmmFileUtil/getDownload.do?atcflId=20260325UUWBM1131560182102679&atcflSn=1";
const MIRROR = "https://www.easylaw.go.kr/CSP/FlDownload.laf?flSeq=1768434007453";
const LAW = "https://www.law.go.kr/법령/국민기초생활보장법";

export const metadata: Metadata = {
  title: "장제급여 80만원·해산급여 70만원 2026 — 누가 받고, 장례·출산 뒤 무엇을 내나",
  description:
    "생계·의료·주거급여 수급자가 사망하면 장례를 치른 사람에게 장제급여 80만원, 출산하면 해산급여 1인당 70만원이 나옵니다. 교육급여만 받는 가구는 안 되는 이유와 신청 방법을 2026년 사업안내에서 옮겼습니다.",
  alternates: { canonical: "/guide/funeral-birth-benefit" },
};

/*
  왜 이 글인가 (2026-09-29 아침 루틴).

  조회수 38위 「장제급여」(28만) 원문은 "1구당 80만원"과 대상까지 적는다. 없는 것은 ① 누구에게 주는가
  (장례를 실제로 치른 사람) ② 무엇을 내는가(장례 비용 증빙) ③ 언제 들어오나(신청일부터 4일)
  ④ 교육급여만 받는 가구는 왜 안 되나다. 같은 쪽에 해산급여(70만원)가 붙어 있어 함께 썼다.
  서치콘솔에서 「2026년 국민기초생활보장 사업안내.pdf」가 몇 주째 노출만 되고 클릭이 0이었다.

  1차 출처는 원문 첨부 「2026년 국민기초생활보장 사업안내」(보건복지부, 545쪽 PDF — 인쇄 쪽 = 파일 쪽 − 26).
  복지로 첨부는 이 PC에서 내려받기가 막혀 법제처 「찾기쉬운 생활법령정보」 미러로 받았다(같은 파일 이름).
  법은 국민기초생활 보장법 제13조(해산급여)·제14조(장제급여).

  원문(복지로) 금액과 사업안내 금액은 같다 — 장제 80만원, 해산 70만원(추가 출생아 70만원).
  긴급복지 장제비(80만원)와 장제급여를 겹쳐 받을 수 있는지는 사업안내에 적혀 있지 않아 쓰지 않는다
  (해산 쪽은 「긴급복지지원 해산비와 중복 지급 불가」가 명시돼 있다).
*/

const cell = "px-3 py-2";
const th = "px-3 py-2 font-semibold";
const head = "border-y border-line bg-sunken text-left";
const row = "border-b border-line align-top";

/* 사업안내 254~256쪽 */
const TABLE: readonly (readonly [string, string, string])[] = [
  ["누가 대상인가", "생계·의료·주거급여 수급자가 사망한 경우, 「의사상자 등 예우 및 지원에 관한 법률」 제14조의 의사자", "생계·의료·주거급여 수급자가 출산(출산예정 포함)한 경우"],
  ["얼마", "1구당 800천원", "1인당 700천원, 추가 출생영아 1인당 700천원(쌍둥이 1,400천원)"],
  ["누구에게", "장제를 실제로 행하는 사람(원칙)", "수급자나 그 세대주 또는 세대주에 준하는 사람"],
  ["언제까지 지급", "지급신청일부터 4일 이내 처리", "지급신청일부터 4일 이내 처리"],
];

export default function FuneralBirthBenefitGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="기초생활수급자 가구에 사망이나 출산이 생기면 매달 받는 급여와 별도로 한 번 받는 돈이 있습니다 — 장제급여와 해산급여입니다. 복지로 원문에 금액은 있지만, 장례를 치른 뒤 누가 무엇을 내야 하는지와 언제 들어오는지가 없어서 2026년 국민기초생활보장 사업안내에서 옮겼습니다."
        updated={`최종 수정 ${G.updated} · 2026년 국민기초생활보장 사업안내(보건복지부)에서 ${CHECKED} 확인`}
      >
        <DocSection title="한 장으로 보면">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className={head}>
                  <th className={th}></th>
                  <th className={th}>장제급여 (사망)</th>
                  <th className={th}>해산급여 (출산)</th>
                </tr>
              </thead>
              <tbody>
                {TABLE.map(([k, a, b]) => (
                  <tr key={k} className={row}>
                    <td className={`${cell} font-semibold`}>{k}</td>
                    <td className={cell}>{a}</td>
                    <td className={cell}>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600">
            사업안내 254~256쪽. 두 급여 모두 읍·면·동에서 접수하고 시·군·구 생계급여 담당 팀이 지급합니다.
          </p>
        </DocSection>

        <DocSection title="교육급여만 받는 가구는 안 됩니다">
          <p>
            법이 대상을 「생계·주거·의료급여 중 하나 이상을 받는 수급자」로 정해 두었습니다(국민기초생활 보장법
            제13조제1항·제14조제1항). 사업안내도 <strong>「교육급여만 받는 수급자는 급여대상이 아니며」</strong>라고 적고
            있습니다(16·254·255쪽). 차상위계층도 이 조문의 대상에 들지 않습니다.
          </p>
          <p>
            반대로 가구 전체가 급여를 받지 않아도 특례로 대상이 되는 경우가 있습니다. 의료급여 특례, 자활급여 특례,
            구직촉진수당 지급에 따른 특례, 정부 해외인턴·군 입대 특례 가구는 가구원이 출산하거나 사망하면 두 급여를
            받습니다(56·58·60·70·73쪽). 내 가구가 여기에 드는지는 주민센터에서 확인하세요.
          </p>
        </DocSection>

        <DocSection title="장제급여 — 장례를 치른 뒤 내는 것">
          <DocList
            items={[
              <>
                <strong>누가 받나</strong> — 장례를 <strong>실제로 치른 사람</strong>이 원칙입니다(법 제14조제2항, 256쪽).
                혼자 살던 수급자가 사망하는 등 어쩔 수 없는 경우에는 시장·군수·구청장이 장례를 맡도록 지정한 사람에게
                줄 수 있습니다.
              </>,
              <>
                <strong>내는 서류</strong> — 복지대상자 장제급여 지원신청서(서식 6호). 사망진단서·사체검안서는{" "}
                <strong>사망신고가 되어 있으면 따로 내지 않습니다.</strong> 대신{" "}
                <strong>실제로 장례를 치렀는지 확인할 서류</strong>(검안·운반·화장·매장 등 장제비용 지출 영수증)는
                내야 합니다(255~256쪽, 서식 405쪽).
              </>,
              <>
                <strong>어디서</strong> — 사망한 수급자의 주소지가 아니어도{" "}
                <strong>전국 어느 시·군·구·읍·면·동에서나</strong> 낼 수 있습니다(’22. 9. 6. 시행, 256쪽).
              </>,
              <>
                <strong>언제 들어오나</strong> — 통장번호를 확인해 <strong>지급신청일부터 4일 이내</strong> 처리합니다(256쪽).
              </>,
              <>
                돈으로 주는 것이 적당하지 않다고 보면 물품으로 줄 수 있습니다(법 제14조제2항 단서, 255쪽).
              </>,
            ]}
          />
          <DocNote tone="amber" title="이 신청서로 사망신고가 되지는 않습니다">
            서식 6호의 유의사항 그대로 옮기면 — 「해산·장제급여 지원신청으로 출생·사망신고를 갈음할 수 없으므로」
            출생·사망신고는 따로 해야 합니다(405쪽).
          </DocNote>
          <p className="text-sm text-slate-600">
            연고자가 장례에 쓸 수급 사실 증빙을 요청하면 수급이력 확인서(서식 44호)를 받을 수 있습니다(260쪽).
          </p>
        </DocSection>

        <DocSection title="사망한 달의 생계급여">
          <DocList
            items={[
              <>
                사망한 날이 속한 달의 생계급여는 <strong>그 달 몫 전액</strong>이 나옵니다. 기준은 사망신고일이 아니라{" "}
                <strong>실제 사망일</strong>입니다(242쪽).
              </>,
              <>
                3인 가구에서 한 사람이 사망하면 그 달은 3인 가구 금액, 다음 달부터 2인 가구 금액입니다(242쪽).
              </>,
              <>
                사망한 달의 <strong>다음 달부터</strong> 들어온 생계급여는 돌려줘야 합니다. 혼자 살던 수급자가 사망했는데
                생계급여가 들어왔고 그 돈을 장례에 썼다면, 돌려줄 생계급여와 받을 장제급여를 서로 셈해 정리할 수 있습니다
                (주거급여는 안 됨, 242쪽).
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="해산급여 — 출산 전에도 신청됩니다">
          <DocList
            items={[
              <>
                <strong>출산예정일 4주 전부터</strong> 신청할 수 있습니다(의사 소견서나 진단서, 산모수첩으로 확인, 254쪽).
              </>,
              <>
                의료기관 진단서 등으로 증명된 <strong>사산·유산도 출산에 포함</strong>됩니다. 이 경우 의사·한의사·조산사의
                사실확인서를 붙입니다. 「모자보건법」 제14조의 합법적인 인공임신중절수술도 대상입니다(254쪽).
              </>,
              <>
                출생증명서는 출생신고로 대신할 수 있고, 출생신고 때 <strong>행복출산 원스톱서비스</strong>로 해산급여 신청을
                함께 낼 수 있습니다(254쪽).
              </>,
              <>
                <strong>긴급복지 해산비와는 겹쳐 받지 못합니다.</strong> 산모·신생아 건강관리 지원사업과는 함께 받을 수
                있습니다(254쪽).
              </>,
            ]}
          />
          <p className="text-sm">
            산모·신생아 건강관리 서비스는{" "}
            <Link href="/guide/postpartum-care" className="text-brand underline">
              따로 정리한 글
            </Link>
            이 있습니다.
          </p>
        </DocSection>

        <DocNote tone="amber" title="이 글에 없는 것">
          수급자가 아닌 긴급복지 지원 가구의 장제비·해산비(각 80만원·70만원)는{" "}
          <Link href="/guide/emergency" className="text-brand underline">
            긴급복지 글
          </Link>
          에 있습니다. 긴급복지 장제비와 장제급여를 함께 받을 수 있는지는 사업안내에 적혀 있지 않아 쓰지 않았습니다.
          받을 수 있는지는 주민센터가 정하므로 이 글은 판정하지 않습니다.
        </DocNote>

        <DocSection title="출처">
          <DocList
            items={[
              <>
                보건복지부 「
                <a href={PDF} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                  2026년 국민기초생활보장 사업안내
                </a>
                」 — 16·56·58·60·70·73·242·254~256·260·405쪽 (복지로 원문 첨부 ·{" "}
                <a href={MIRROR} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                  법제처 생활법령 게시본
                </a>
                )
              </>,
              <>
                <a href={LAW} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                  국민기초생활 보장법
                </a>{" "}
                제13조(해산급여)·제14조(장제급여)
              </>,
            ]}
          />
          <p className="text-sm">
            문의: 읍·면·동 행정복지센터 · 보건복지상담센터 <strong>129</strong>
          </p>
          <p className="flex flex-col gap-1">
            <Link href="/service/WLF00003267" className="text-brand underline">
              장제급여 상세 보기 — 복지로 원문 →
            </Link>
            <Link {...serviceLink("WLF00001135")} className="text-brand underline">
              해산급여 상세 보기 — 복지로 원문 →
            </Link>
          </p>
          <DocNote>
            이 글은 사업안내의 기준과 절차를 옮긴 것이며, 받을 수 있는지 판정하지 않습니다.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="funeral-birth-benefit" />
    </>
  );
}
