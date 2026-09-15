import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("combined-support")!;

export const metadata: Metadata = {
  title:
    "두 가지를 같이 받을 수 있나 — 부모급여·아동수당·기초연금·장애인연금을 법과 지침으로 확인했습니다",
  description:
    "부모급여와 아동수당은 함께 나오고, 장애인연금 기초급여는 65세부터 기초연금으로 바뀝니다. 기초연금은 생계급여를 줄이지만 장애인연금·한부모 아동양육비는 줄이지 않습니다. 자주 묻는 조합 일곱 가지를 아동수당법·기초연금법·장애인연금법과 2026년 국민기초생활보장 사업안내로 정리했습니다.",
  alternates: { canonical: "/guide/combined-support" },
};

/*
  왜 이 글인가 (2026-09-16).

  「같이 받을 수 있나」는 사람들이 가장 많이 묻는 말인데, 우리 데이터로는 답할 수가 없다.
  수록 910건 중 원문에 중복 이야기가 적힌 사업은 아래에서 세는 대로 50건 안쪽이고,
  조회수 상위 100건 중에는 네 건뿐이다(2026-09-15 실측). 원문에 없다고 함께 받을 수
  있다는 뜻이 아니므로, 답은 원문 밖 — 법령과 부처 지침 — 에서 찾아야 한다.

  ── 이 글이 근거로 쓴 것 ────────────────────────────────────────
  · 「아동수당법」(시행 2026.9.10) 제4조제1항·제5항, 부칙(2026.3.20) 제2조
  · 「장애인연금법」(시행 2025.10.1) 제6조제5항·제7조
  · 「기초연금법」(시행 2025.10.1) 제5조·제6조·제8조
  · 보건복지부 「2026년 국민기초생활보장 사업안내」(2026.1.1. 발행) 인쇄 102·103·124~125쪽
  · 보건복지부 기초연금 누리집 「기초연금액 산정」 화면
  · 복지로 수록 원문(부모급여·영유아보육료·장애인연금·청년월세 등)
  전부 1차 출처에서 직접 받아 대조했다. 법령은 DRF API 전문, 지침은 PDF 545쪽 원문.

  ── 하지 않는 것 ───────────────────────────────────────────────
  자격 판정을 하지 않는다(CLAUDE.md 3절). "받을 수 있습니다"가 아니라 "법·지침이
  이렇게 적고 있습니다"까지만 쓴다. 금액 예시는 전부 "저희가 계산한 값"이라고 밝힌다.
*/

const CHECKED = "2026-09-16";
const BLS_URL =
  "https://mohw.go.kr/board.es?act=view&bid=0009&list_no=1488483&mid=a10402000000";
const BP_URL = "https://basicpension.mohw.go.kr/menu.es?mid=a10103010000";
const law = (name: string) =>
  `https://www.law.go.kr/법령/${encodeURIComponent(name)}`;

/** 상세 링크 — 수록에 없으면 링크를 안 건다. */
function Svc({ id, name }: { id: string; name: string }) {
  const s = services.find((x) => x.id === id);
  if (!s) return <>{name}</>;
  return (
    <Link href={`/service/${s.id}`} className="text-brand underline hover:no-underline">
      {s.name}
    </Link>
  );
}

function Src({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted">출처 {children} · {CHECKED} 확인</p>;
}

function Bls({ page }: { page: string }) {
  return (
    <Src>
      <a href={BLS_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
        보건복지부 「2026년 국민기초생활보장 사업안내」
      </a>{" "}
      {page}
    </Src>
  );
}

function Law({ name, article }: { name: string; article: string }) {
  return (
    <a href={law(name)} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
      「{name}」 {article}
    </a>
  );
}

/** 2026년 값 — 각 절에 출처를 따로 달았다. */
const BASE_PENSION = 349_700; // 기초연금 기준연금액(기초연금 누리집)
const NP_LINE = 524_550; // 기준연금액의 150%(기초연금 누리집 산정표)
const LIVELIHOOD_1 = 820_556; // 1인 가구 생계급여 선정기준(복지로 원문)

/**
 * 원문에 「중복」이라는 말이 한 번이라도 나오는 사업이 몇 건인지 — 렌더 시점에 센다.
 * 뜻을 가려 세지 않는다("중복 지원 불가"도 "중복 가능"도 같이 센다). 화면에서
 * 말하는 것은 "원문이 이 이야기를 하기는 하는가"뿐이기 때문이다.
 */
const dupCount = services.filter((s) =>
  /중복/.test(
    `${s.summary ?? ""} ${s.eligibility ?? ""} ${s.selectionCriteria ?? ""} ${s.supportContent ?? ""}`,
  ),
).length;

export default function CombinedSupportGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="같이 받을 수 있는지는 사업마다 다르고, 한 줄로 정리되는 규칙이 없습니다. 다만 사람들이 자주 묻는 조합은 법령과 부처 지침에 답이 적혀 있습니다. 조합 일곱 가지를 원문 조문까지 찾아 정리했습니다."
        updated={`최종 수정 ${G.updated} · 법령 전문과 2026년 부처 지침에서 ${CHECKED} 확인`}
      >
        <DocSection title="막는 방식이 세 가지입니다">
          <p>
            &ldquo;중복지원 안 된다&rdquo;는 말이 늘 같은 뜻은 아닙니다. 제도가
            겹침을 다루는 방식은 크게 셋입니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">방식</th>
                  <th className="px-3 py-2 font-semibold">무슨 일이 일어나나</th>
                  <th className="px-3 py-2 font-semibold">이 글의 예</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">하나만 받는다</td>
                  <td className="px-3 py-2">
                    같은 성격의 돈이라 한쪽을 받으면 다른 쪽이 안 나옵니다.
                  </td>
                  <td className="px-3 py-2">
                    부모급여와 보육료 · 장애인연금 기초급여와 기초연금
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">받되 다른 쪽이 줄어든다</td>
                  <td className="px-3 py-2">
                    둘 다 나오지만, 한쪽이 소득으로 잡히거나 차감돼 합계가 단순
                    덧셈이 아닙니다.
                  </td>
                  <td className="px-3 py-2">
                    기초연금과 생계급여 · 국민연금과 기초연금 · 주거급여와 청년월세
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">그대로 함께 받는다</td>
                  <td className="px-3 py-2">
                    서로 건드리지 않습니다. 법이나 지침이 그렇게 적어 둔 경우입니다.
                  </td>
                  <td className="px-3 py-2">
                    부모급여와 아동수당 · 장애인연금과 생계급여 · 한부모 아동양육비와
                    생계급여
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocSection title="1. 부모급여 + 아동수당 — 둘 다 나옵니다">
          <p>
            <strong>부모급여는 아동수당과 별개의 제도가 아닙니다.</strong>{" "}
            「아동수당법」 제4조는 제1항에서 아동수당을 매월 10만원 주도록 하고,
            제5항에서 &ldquo;제1항에도 불구하고 2세 미만의 아동에게는 매월 50만원
            이상으로서 대통령령으로 정하는 금액을 <strong>추가로</strong>{" "}
            지급한다&rdquo;고 적습니다. 그 &lsquo;추가로 주는 아동수당&rsquo;이
            부모급여입니다. 그래서 0~1세 아이는 아동수당과 부모급여를 함께 받습니다.
          </p>
          <p>
            받는 나이도 법에 있습니다. 제4조 제1항은 13세 미만으로 적혀 있지만,
            2026년 3월 20일 개정 부칙 제2조가 연도별 특례를 두어{" "}
            <strong>2026년은 9세, 2027년 10세, 2028년 11세, 2029년 12세</strong>로
            단계를 밟습니다. 지금 &ldquo;만 9세 미만&rdquo;인 이유가 이것입니다.
          </p>
          <Src>
            <Law name="아동수당법" article="제4조제1항·제5항, 부칙(2026.3.20) 제2조" />
          </Src>
          <p className="text-sm">
            사업 원문은{" "}
            <Svc id="WLF00004657" name="부모급여 지원" />
            {" · "}
            <Svc id="WLF00001171" name="아동수당 지급" />에 있습니다.
          </p>
        </DocSection>

        <DocSection title="2. 부모급여 + 어린이집 보육료 — 둘이 아니라 차액입니다">
          <p>
            어린이집에 보내면 부모급여가 현금으로 그대로 나오지 않습니다. 복지로
            원문이 금액까지 적어 두고 있습니다 — 0세는 어린이집에 다니면{" "}
            <strong>보육료 바우처 {won(584_000)}</strong>가 나가고 부모급여와의{" "}
            <strong>차액 {won(416_000)}</strong>만 현금으로 들어옵니다. 1세는
            보육료 바우처 {won(515_000)}가 나가고 차액이 없습니다.
          </p>
          <p>
            2세(24개월)부터는 부모급여가 끝나고 가정양육수당으로 넘어갑니다. 집에서
            키우다 어린이집으로, 또는 그 반대로 바꿀 때는 <strong>변경 신청</strong>
            을 해야 하고, 신청일이 그달 15일 이전인지 16일 이후인지에 따라 그달에
            받는 것이 달라집니다.
          </p>
          <Src>
            복지로 원문 <Svc id="WLF00004657" name="부모급여 지원" />
            {" · "}
            <Svc id="WLF00003250" name="영유아보육료 지원" />
            {" · "}
            <Svc id="WLF00003253" name="가정양육수당 지원사업" />
          </Src>
          <p className="text-sm">
            어디서 키우느냐에 따라 무엇이 나오는지는{" "}
            <Link href="/guide/childcare-choice" className="text-brand underline">
              어린이집·유치원·집, 어디서 키우느냐에 따라 받는 돈
            </Link>
            에 더 자세히 적었습니다.
          </p>
        </DocSection>

        <DocSection title="3. 아동수당·부모급여 + 생계급여 — 생계급여가 줄지 않습니다">
          <p>
            기초생활보장은 소득을 먼저 따지기 때문에, 다른 데서 받은 돈이 생계급여를
            깎는 일이 자주 생깁니다. 아동수당과 부모급여는 그렇지 않습니다. 보건복지부
            지침이 <strong>실제소득 산정에서 제외하는 금품</strong>에 &ldquo;
            「아동수당법」 제4조제1항에 따른 아동수당 및 &lsquo;부모급여
            사업안내&rsquo;에 따른 부모급여&rdquo;를 그대로 적어 두었습니다. 어린이집
            보육료와 유치원 교육비, 가정에서 키우는 아이의 양육수당도 같은 자리에
            있습니다.
          </p>
          <Bls page="인쇄 102쪽" />
        </DocSection>

        <DocSection title="4. 기초연금 + 장애인연금 — 65세에 한쪽으로 바뀝니다">
          <p>
            장애인연금은 기초급여와 부가급여 둘로 되어 있습니다.{" "}
            <strong>기초급여는 기초연금과 같이 받지 못합니다.</strong>{" "}
            「장애인연금법」 제6조제5항이 &ldquo;수급권자 중 「기초연금법」에 따른
            기초연금 수급권자에게는 기초급여를 지급하지 아니한다&rdquo;고 못 박습니다.
            복지로 원문도 65세가 되는 달의 전달까지 기초급여를 주고, 65세가 되는
            달부터는 기초연금으로 바꿔 지급한다고 적습니다 —{" "}
            <strong>이때 기초연금은 따로 신청해야 합니다.</strong>
          </p>
          <p>
            반면 <strong>부가급여는 제7조의 별개 급여</strong>라 그대로 이어집니다.
            원문의 2026년 금액표를 보면 기초생활보장(생계·의료) 수급자는 65세 미만
            월 {won(90_000)}, 65세 이상 월 {won(439_700)}입니다.
          </p>
          <Src>
            <Law name="장애인연금법" article="제6조제5항·제7조" /> · 복지로 원문{" "}
            <Svc id="WLF00003249" name="장애인연금" />
          </Src>
          <DocNote>
            장애인연금과 장애수당도 함께 받는 것이 아닙니다. 장애인연금은
            「장애인연금법」상 중증장애인에게, 장애수당은 중증에 해당하지 않는
            수급자·차상위계층에게 나갑니다(복지로 원문{" "}
            <Svc id="WLF00003265" name="장애수당" />).
          </DocNote>
        </DocSection>

        <DocSection title="5. 기초연금 + 국민연금 — 국민연금이 많으면 기초연금이 줄 수 있습니다">
          <p>
            국민연금을 받는다고 기초연금이 없어지지는 않습니다. 「기초연금법」 제6조
            제1항은 국민연금 급여액 등이 <strong>기준연금액의 150% 이하</strong>면
            기초연금액을 기준연금액으로 한다고 적습니다. 2026년 기준연금액은 월{" "}
            {won(BASE_PENSION)}이므로 그 선은 월 {won(NP_LINE)}입니다. 국민연금이
            이보다 많으면 제5조 제5항의 산식으로 계산해 기초연금이 줄어들 수
            있습니다.
          </p>
          <p>
            다만 <strong>줄지 않는 사람이 법에 따로 적혀 있습니다.</strong> 제5조
            제7항은 국민연금 유족연금·장애연금을 받는 사람, 「장애인연금법」에 따른
            수급권자, 기초생활보장 수급권자 등에게는 기준연금액을 그대로 준다고
            합니다. 부부가 모두 기초연금을 받으면 각각 20%를 감액합니다(제8조
            제1항).
          </p>
          <Src>
            <Law name="기초연금법" article="제5조·제6조·제8조" /> ·{" "}
            <a href={BP_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
              보건복지부 기초연금 누리집 「기초연금액 산정」
            </a>
          </Src>
        </DocSection>

        <DocSection title="6. 기초연금 + 생계급여 — 기초연금만큼 생계급여가 줄어듭니다">
          <p>
            이 조합이 가장 많이 오해받는 자리입니다. 기초연금은 생계급여를 계산할 때{" "}
            <strong>소득으로 잡히고, 빼 주지 않습니다.</strong> 2026년 지침의
            공적이전소득 요약표에서 기초연금은 &lsquo;실제소득 포함 ○ · 소득공제
            ×&rsquo;로 적혀 있습니다. 생계급여는 선정기준에서 소득인정액을 뺀 만큼
            나오므로, 기초연금을 받으면 그만큼 생계급여가 줄어듭니다.
          </p>
          <p className="rounded-xl bg-sunken px-4 py-3 text-sm leading-relaxed">
            <strong>예를 들면</strong> 다른 소득이 없는 1인 가구라면 2026년 생계급여
            선정기준이 월 {won(LIVELIHOOD_1)}입니다. 여기서 기초연금{" "}
            {won(BASE_PENSION)}을 소득으로 잡으면 생계급여는 월{" "}
            {won(LIVELIHOOD_1 - BASE_PENSION)}이 되고, 손에 들어오는 돈의 합은{" "}
            {won(LIVELIHOOD_1)} 그대로입니다.{" "}
            <strong>이 계산은 저희가 지침의 방식대로 해 본 값입니다</strong> — 실제
            소득인정액은 재산의 소득환산액까지 더해 계산하므로 사람마다 다릅니다.
          </p>
          <Bls page="인쇄 124~125쪽(공적이전소득 요약표)" />
        </DocSection>

        <DocSection title="7. 청년월세 + 주거급여 — 겹치는 만큼 뺀 금액만 나옵니다">
          <p>
            청년월세 지원은 주거급여를 받는 사람도 신청할 수 있지만 전액이 나오지는
            않습니다. 원문이 &ldquo;주거급여 수급자의 경우 주거급여액 중
            월차임분(청년 주거급여 분리지급액 포함)을 차감한 금액만
            지원합니다&rdquo;라고 적고 있습니다. 같은 원문이{" "}
            <strong>국토부나 지자체의 다른 청년월세 지원을 받고 있으면 제외</strong>
            한다고도 적습니다(수혜가 끝난 뒤에는 신청 가능).
          </p>
          <Src>
            복지로 원문 <Svc id="WLF00004661" name="청년월세 지원사업" />
            {" · "}
            <Svc id="WLF00003201" name="주거급여(맞춤형 급여)" />
          </Src>
        </DocSection>

        <DocSection title="생계급여를 받는 집이라면 — 어느 돈이 생계급여를 깎나">
          <p>
            위의 조합 말고도, 생계급여를 받는 집에서는 &ldquo;이 돈을 받으면 생계급여가
            줄어드나&rdquo;가 늘 문제입니다. 2026년 지침이 갈래를 나눠 적어 두었습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">갈래</th>
                  <th className="px-3 py-2 font-semibold">해당하는 돈</th>
                  <th className="px-3 py-2 font-semibold">생계급여에 미치는 영향</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">소득으로 친다</td>
                  <td className="px-3 py-2">
                    기초연금, 국민연금·공무원연금 등 연금급여, 실업급여·육아휴직급여,
                    산재보험 휴업·장해급여, 구직촉진수당
                  </td>
                  <td className="px-3 py-2">그만큼 줄어듭니다</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">소득에 넣었다가 다시 뺀다</td>
                  <td className="px-3 py-2">
                    장애인연금 기초급여·부가급여, 장애수당·장애아동수당, 한부모가족
                    아동양육비·추가아동양육비, 보훈 생활조정수당, 입양아동 양육수당
                  </td>
                  <td className="px-3 py-2">줄지 않습니다</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">아예 소득으로 보지 않는다</td>
                  <td className="px-3 py-2">
                    아동수당·부모급여, 어린이집 보육료·유치원 교육비, 가정에서 키우는
                    아이의 양육수당, 근로장려금·자녀장려금(재산으로는 봅니다),
                    가정위탁 양육보조금
                  </td>
                  <td className="px-3 py-2">줄지 않습니다</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Bls page="인쇄 102·103·124~125쪽" />
          <DocNote>
            표의 갈래는 <strong>수급자 본인 가구</strong>를 조사할 때의 기준입니다.
            부양의무자 가구를 볼 때는 기준이 따로 있고(지침 인쇄 189~190쪽), 차상위는
            범위를 달리 정할 수 있습니다. 금액이 얼마나 줄어드는지는 소득인정액 전체를
            계산해야 나오므로 주민센터에서 확인하세요.
          </DocNote>
        </DocSection>

        <DocSection title="우리 데이터로는 여기까지만 답할 수 있습니다">
          <p>
            복지로 원문에 중복 이야기가 한 줄이라도 적힌 사업은 수록 {services.length}
            건 중 <strong>{dupCount}건</strong>뿐입니다. 나머지 사업의 상세에 아무
            말이 없는 것은 &ldquo;함께 받을 수 있다&rdquo;는 뜻이 아니라{" "}
            <strong>원문이 그 이야기를 안 한다</strong>는 뜻입니다. 그래서 이 글은
            데이터가 아니라 법령과 부처 지침에서 답을 찾았고, 여기 없는 조합은
            저희도 모릅니다.
          </p>
          <p>
            신청할 때는 지금 받고 있는 지원을 모두 알리는 편이 안전합니다. 나중에
            중복으로 확인되면 받은 돈을 돌려줘야 할 수 있습니다. 확인은 주민센터나
            보건복지상담센터(국번 없이 <strong>129</strong>)에서 합니다.
          </p>
          <p className="text-sm">
            원문에 적힌 중복 사례는{" "}
            <Link href="/faq#apply" className="text-brand underline">
              자주 묻는 질문 — 여러 지원을 동시에 받을 수 있나요
            </Link>
            에 모아 두었습니다.
          </p>
        </DocSection>
      </DocPage>
      <GuideNav current="combined-support" />
    </>
  );
}
