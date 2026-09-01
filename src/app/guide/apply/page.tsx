import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";

const G = guideBySlug("apply")!;

export const metadata: Metadata = {
  title: `${G.title} — 복지로·정부24·주민센터 비교`,
  description:
    "복지 지원금 신청 창구는 복지로·정부24·주민센터 세 곳입니다. 무엇이 다른지, 온라인으로 되는 사업이 실제로 얼마나 되는지 수록 900건을 집계해 정리했습니다.",
  alternates: { canonical: "/guide/apply" },
};

/*
  숫자는 렌더 시점에 실제 데이터에서 센다. 본문에 상수로 박아 두면 수집이
  늘어날 때마다 글이 조용히 틀린 말이 된다 — 그리고 그 사실을 아무도
  눈치채지 못한다.

  ⚠ 중앙부처와 지자체는 신청 정보를 **다른 필드로** 준다. 중앙부처 사업은
  온라인 가능 여부를 참/거짓으로만 주고 신청 수단 목록이 아예 없다(330건 전부).
  지자체 사업은 반대로 참/거짓이 없고 수단 목록만 있다. 처음에 이걸 모르고
  `applyMethods`만 세었다가 "900건 중 505건에만 신청 방법이 있다"고 쓸 뻔했다.
  중앙부처 330건에 정보가 없는 게 아니라 다른 칸에 들어 있었다.
*/
const central = services.filter((s) => s.provider === "central");
const local = services.filter((s) => s.provider === "local");

const centralOnline = central.filter((s) => s.onlineApply === true);
const localWithMethods = local.filter((s) => s.applyMethods.length > 0);
const localOnline = localWithMethods.filter((s) =>
  s.applyMethods.some((m) => ["인터넷", "모바일", "모바일앱"].includes(m)),
);
const localVisit = localWithMethods.filter((s) =>
  s.applyMethods.includes("방문"),
);
const onlineTotal = centralOnline.length + localOnline.length;

const withSteps = services.filter((s) => s.applySteps.length > 0);
const avgSteps =
  withSteps.reduce((a, s) => a + s.applySteps.length, 0) / withSteps.length;

const pct = (a: number, b: number) => Math.round((a / b) * 100);

const CHANNELS = [
  {
    name: "복지로",
    where: "bokjiro.go.kr",
    what: "복지 사업 전용 창구",
    good: "복지 사업만 모아 두어 찾기 쉽고, 온라인 신청이 되는 사업은 대부분 여기로 이어집니다. 이 사이트가 인용하는 원문도 복지로입니다.",
  },
  {
    name: "정부24",
    where: "gov.kr",
    what: "행정 서비스 전반 창구",
    good: "복지 신청보다 서류 발급에 강합니다. 주민등록등본·가족관계증명서처럼 신청에 딸려 오는 서류를 여기서 먼저 떼면 한 번에 끝납니다.",
  },
  {
    name: "주민센터",
    where: "주소지 행정복지센터",
    what: "대면 창구",
    good: "온라인으로 안 되는 사업은 결국 여기입니다. 자격이 애매할 때 담당 공무원이 직접 확인해 준다는 점은 온라인에 없는 장점입니다.",
  },
];

export default function ApplyGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="받을 수 있는 지원을 찾았는데 정작 신청에서 막히는 경우가 많습니다. 창구가 여러 곳인데 사업마다 열려 있는 곳이 다르기 때문입니다."
        updated={`최종 수정 ${G.updated} · 수록 ${services.length.toLocaleString()}건 집계 기준`}
      >
        <DocSection title="창구는 세 곳입니다">
          <p>
            복지 지원금 신청은 사실상 세 곳에서 이뤄집니다. 어느 곳이 더 좋은
            게 아니라 <strong>사업마다 열려 있는 창구가 다릅니다.</strong> 찾은
            사업이 온라인으로 되는지부터 확인하는 편이 빠릅니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-slate-50 text-left">
                  <th className="px-3 py-2 font-semibold">창구</th>
                  <th className="px-3 py-2 font-semibold">성격</th>
                  <th className="px-3 py-2 font-semibold">언제 쓰나</th>
                </tr>
              </thead>
              <tbody>
                {CHANNELS.map((c) => (
                  <tr key={c.name} className="border-b border-line align-top">
                    <th scope="row" className="px-3 py-3 text-left">
                      <span className="font-semibold text-ink">{c.name}</span>
                      <span className="mt-0.5 block text-xs font-normal text-muted">
                        {c.where}
                      </span>
                    </th>
                    <td className="px-3 py-3 text-slate-600">{c.what}</td>
                    <td className="px-3 py-3 leading-relaxed text-slate-600">
                      {c.good}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocSection title="온라인으로 되는 사업은 절반이 안 됩니다">
          <p>
            중앙부처 사업과 지자체 사업은 원문이 신청 정보를 적는 방식이
            다릅니다. 중앙부처는 온라인 신청 가능 여부를 표시하고, 지자체는
            신청 수단을 목록으로 적습니다. 각각 세어 보면 이렇습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-slate-50 text-left">
                  <th className="px-3 py-2 font-semibold">구분</th>
                  <th className="px-3 py-2 font-semibold">수록</th>
                  <th className="px-3 py-2 font-semibold">온라인 신청</th>
                  <th className="px-3 py-2 font-semibold">비율</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <th scope="row" className="px-3 py-2 text-left font-medium">
                    중앙부처
                  </th>
                  <td className="px-3 py-2 text-slate-600">
                    {central.length}건
                  </td>
                  <td className="px-3 py-2 font-semibold text-brand">
                    {centralOnline.length}건
                  </td>
                  <td className="px-3 py-2 text-slate-600">
                    {pct(centralOnline.length, central.length)}%
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <th scope="row" className="px-3 py-2 text-left font-medium">
                    지자체
                  </th>
                  <td className="px-3 py-2 text-slate-600">
                    {localWithMethods.length}건
                    <span className="block text-xs text-muted">
                      신청 수단이 적힌 것
                    </span>
                  </td>
                  <td className="px-3 py-2 font-semibold text-brand">
                    {localOnline.length}건
                  </td>
                  <td className="px-3 py-2 text-slate-600">
                    {pct(localOnline.length, localWithMethods.length)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            합치면 온라인으로 신청할 수 있는 사업은{" "}
            <strong>{onlineTotal}건</strong>입니다. 나머지는 창구에 가거나
            우편·전화로 접수해야 합니다. 지자체 사업 중 방문 접수를 받는 것은{" "}
            {localVisit.length}건으로 가장 많습니다.
          </p>
          <p>
            &ldquo;요즘은 다 인터넷으로 되지 않나&rdquo; 하고 마감 직전에
            알아보다가 못 하는 경우가 여기서 생깁니다. 중앙부처 사업은 전국
            단위라 온라인 창구를 갖추는 편이지만, 시·군·구 사업은 담당 부서 한
            곳에서 접수하는 경우가 많습니다.
          </p>
          <DocNote tone="brand">
            지금 보고 있는 사업이 어느 쪽인지는 각 서비스 상세 페이지의{" "}
            <strong>신청 방법</strong> 항목에 적어 두었습니다. 온라인으로 되는
            것만 모아 보려면{" "}
            <Link href="/guide/online" className="text-brand underline">
              집에서 온라인으로 신청할 수 있는 지원
            </Link>
            을 보세요.
          </DocNote>
        </DocSection>

        <DocSection title="신청 전에 세 가지만 확인하세요">
          <p>헛걸음의 대부분은 이 셋 중 하나를 안 보고 간 경우입니다.</p>
          <ol className="space-y-3">
            <li>
              <p className="font-semibold text-ink">1. 기준연도</p>
              <p className="mt-1">
                지원금은 해마다 금액과 요건이 바뀝니다. 검색으로 걸린 글이
                작년 공고인 줄 모르고 그 금액을 기대하고 갔다가 달라진 경우가
                많습니다. 이 사이트는 각 사업의 기준연도를 그대로 표시하고 원문
                링크를 함께 답니다.
              </p>
            </li>
            <li>
              <p className="font-semibold text-ink">2. 지원 주기</p>
              <p className="mt-1">
                <strong>한 번 받고 끝나는지 매달 나오는지</strong>는 생활
                계획이 달라지는 문제입니다. 수록 사업 중 매달 나오는 것과 한
                번만 받는 것이 거의 같은 수로 섞여 있습니다. 카드와 상세
                페이지에 &ldquo;매월 지급&rdquo;, &ldquo;1회 지급&rdquo;으로
                구분해 적었습니다.
              </p>
            </li>
            <li>
              <p className="font-semibold text-ink">3. 무엇으로 받는지</p>
              <p className="mt-1">
                계좌로 오는 현금인지, 카드에 충전되는 바우처인지, 요금이 깎이는
                감면인지, <strong>나중에 갚아야 하는 융자</strong>인지에 따라
                준비할 것이 다릅니다.{" "}
                <Link href="/benefit" className="text-brand underline">
                  혜택 종류별로 갈라 둔 목록
                </Link>
                에서 확인하세요.
              </p>
            </li>
          </ol>
        </DocSection>

        <DocSection title="신청서를 내면 끝이 아닙니다">
          <p>
            신청 절차가 단계별로 적혀 있는 사업 {withSteps.length}건을 세어
            보면 평균 <strong>{avgSteps.toFixed(1)}단계</strong>입니다. 신청은
            그중 한 단계일 뿐이고 뒤에 조사와 결정이 남아 있습니다. 대체로 이런
            흐름입니다.
          </p>
          <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm leading-loose text-slate-700">
            신청 접수 → 소득·재산 조사 → 자격 심사 → 결정 통지 → 지급
          </p>
          <p>
            그래서 신청한 날 바로 돈이 들어오지 않습니다. 조사에 몇 주가 걸리는
            사업이 흔하고 결과는 문자나 우편으로 옵니다.{" "}
            <strong>연락처와 계좌를 정확히 적었는지가 의외로 중요합니다</strong>{" "}
            — 결정 통지를 못 받아 기한을 넘기면 처음부터 다시 해야 합니다.
          </p>
          <p>
            탈락 통지에는 사유가 함께 적혀 있습니다. 소득 기준을 넘긴 것인지
            서류가 빠진 것인지에 따라 대응이 다릅니다. 서류 문제라면 보완해서
            다시 낼 수 있는 경우가 있으니 담당 부서에 먼저 물어보세요.
          </p>
        </DocSection>

        <DocSection title="막히면 물어볼 곳">
          <p>
            제도가 복잡해서 글로 다 풀 수 없는 부분이 반드시 남습니다. 자격이
            애매하거나 어느 사업에 해당하는지 모르겠다면 사람에게 묻는 편이
            빠릅니다.
          </p>
          <ul className="space-y-2">
            <li>
              <strong>보건복지상담센터 129</strong> — 전국 어디서나 국번 없이
              129, 무료입니다. 일반 상담은 <strong>평일 09:00~18:00</strong>,
              긴급지원 상담은 24시간 받습니다.
            </li>
            <li>
              <strong>주소지 행정복지센터(주민센터)</strong> — 복지 담당
              공무원이 있습니다. 실제 신청을 받는 곳이라 가장 정확합니다.
            </li>
            <li>
              <strong>각 사업의 담당 부서</strong> — 이 사이트는 사업마다 담당
              부서와 연락처를 원문 그대로 적어 두었습니다. 사업별 세부 요건은
              이쪽이 확실합니다.
            </li>
          </ul>
          <DocNote>
            이 사이트는 정부·지자체 공식 기관이 아니며, 신청을 대행하거나
            자격을 판정하지 않습니다. 공공데이터포털이 공개한 복지 서비스
            정보를 모아 찾기 쉽게 정리하는 곳입니다. 최종 확인은 반드시 위
            기관에서 하세요.
          </DocNote>
        </DocSection>
      </DocPage>

      <div className="mx-auto max-w-3xl">
        <GuideNav current="apply" />
      </div>
    </>
  );
}
