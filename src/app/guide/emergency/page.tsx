import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote, DocList } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import { views as fmtViews, cycleLabel, visiblePayTypes, payType, won } from "@/lib/display";

const G = guideBySlug("emergency")!;

export const metadata: Metadata = {
  title: `${G.title} — 긴급복지지원 여덟 갈래`,
  description:
    "실직·질병·화재처럼 갑작스러운 위기에 쓰는 긴급복지지원은 생계·의료·주거·연료비·교육 등 여덟 갈래입니다. 무엇이 있는지, 위기사유는 어떻게 정해져 있는지 정리했습니다.",
  alternates: { canonical: "/guide/emergency" },
};

/*
  금액을 **손으로 적지 않는다. 대신 원문에서 뽑아 그린다.**

  ── 원래 결정과 왜 바꿨나 (2026-09-08) ─────────────────────────
  처음에는 금액을 아예 싣지 않기로 했다. 이유는 이랬다 — "여기 옮겨 적으면
  고시가 바뀌는 순간 이 글만 옛 숫자로 남는다. 지원금 글에서 그건 단순한
  오타가 아니라 사람을 헛걸음시키는 오류다."

  그 걱정은 **손으로 적을 때만** 맞다. 아래는 수록 원문(`supportContent`)을
  빌드 때 파싱해서 그리므로, 재수집으로 금액이 바뀌면 이 글도 같이 바뀐다.
  상세 페이지와 **같은 한 곳**을 보기 때문에 둘이 어긋날 수가 없다.

  바꾼 계기: 이 글에 금액이 한 번도 안 나와서, 읽는 사람이 규모를 못 잡고
  있었다. 토스 미니앱 인기 100선에서 이 제도가 6위인데 부제가 "가구당 최대
  183만원 까지"였다 — 사람들이 먼저 알고 싶어 하는 것이 금액이라는 뜻이다.

  ⚠ 파싱이 실패하면 **아무것도 그리지 않는다.** 틀린 표를 그리느니 없는 게
  낫다. 기준연도도 원문에서 같이 가져와 표 옆에 붙인다.
*/
const LIVELIHOOD = services.find((s) => s.id === "WLF00003180");

/** `1인 가구 : 783,000원/월` 꼴을 뽑는다. 원문이 "가구"와 "가족"을 섞어 쓴다. */
const LIVELIHOOD_AMOUNTS = (LIVELIHOOD?.supportContent ?? "")
  .split("\n")
  .map((line) => line.match(/^\s*(\d+)인\s*(?:가구|가족)\s*:\s*([\d,]+)\s*원/))
  .filter((m): m is RegExpMatchArray => m !== null)
  .map((m) => ({ size: Number(m[1]), amount: Number(m[2].replace(/,/g, "")) }));

/** `7인 이상 : 1인 증가 시마다 301,700/월씩 추가` — 여기만 "원"이 빠져 있다. */
const LIVELIHOOD_EXTRA = (() => {
  const m = (LIVELIHOOD?.supportContent ?? "").match(
    /(\d+)인\s*이상\s*:\s*1인\s*증가\s*시마다\s*([\d,]+)/,
  );
  return m ? { from: Number(m[1]), each: Number(m[2].replace(/,/g, "")) } : null;
})();
const family = services
  .filter((s) => s.name.startsWith("긴급복지"))
  .sort((a, b) => b.views - a.views);

/** 지자체가 따로 운영하는 긴급 지원. 중앙 긴급복지와 별개로 굴러간다. */
const localCrisis = services
  .filter(
    (s) =>
      s.provider === "local" && /긴급|위기|구호/.test(s.name),
  )
  .sort((a, b) => b.views - a.views)
  .slice(0, 8);

const top = family[0];
const rest = family.slice(1).reduce((a, s) => a + s.views, 0);

/*
  "긴급복지 계열은 모두 중위소득 75%"라고 적어 두었는데, 재수집 뒤 여덟 갈래
  중 한 건(사회복지시설이용지원)의 선정기준에서 비율이 읽히지 않게 됐다
  (2026-09-02). 원문에 비율 표현이 없으면 medianPercent는 null이고, 그건
  "기준이 다르다"가 아니라 "우리가 못 읽었다"는 뜻이다. 그래서 **비율이
  적힌 것만** 세어 말하고, 값이 갈리면 문장 자체를 바꾼다.
*/
const famWithPct = family.filter((s) => s.medianPercent != null);
const famPercents = [
  ...new Set(famWithPct.map((s) => s.medianPercent!)),
].sort((a, b) => a - b);

export default function EmergencyGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="실직, 갑작스러운 병, 화재, 이혼으로 소득이 끊긴 상황에 쓰라고 만든 제도가 따로 있습니다. 기초생활수급과는 별개이고, 심사보다 지급이 먼저입니다."
        updated={`최종 수정 ${G.updated} · 수록 ${services.length.toLocaleString()}건 집계 기준`}
      >
        <DocSection title="하나가 아니라 여덟 갈래입니다">
          <p>
            &lsquo;긴급복지지원&rsquo;은 사업 하나가 아니라 여러 갈래로 나뉘어
            있습니다. 수록 데이터에 잡히는 것만{" "}
            <strong>{family.length}갈래</strong>입니다. 그런데 조회수는 한 곳에
            심하게 쏠려 있습니다.
          </p>
          <p className="rounded-lg bg-sunken px-4 py-3 leading-relaxed">
            <strong>{top.name}</strong> {fmtViews(top.views)}회
            <span className="mx-2 text-muted">vs</span>
            나머지 {family.length - 1}갈래 합계 {fmtViews(rest)}회
          </p>
          <p>
            같은 위기 상황에서 <strong>함께 신청할 수 있는 것들인데</strong>{" "}
            생계지원 하나만 알고 나머지를 그냥 지나칩니다. 병원비가 문제라면
            의료지원이, 살 곳이 문제라면 주거지원이 따로 있습니다.
          </p>

          <ul className="space-y-2.5">
            {family.map((s) => {
              const pay = visiblePayTypes(s.payTypes)[0];
              return (
                <li key={s.id}>
                  <Link
                    href={`/service/${s.id}`}
                    className="group flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-lg border border-line bg-white px-4 py-3 transition hover:border-brand"
                  >
                    <span className="font-semibold text-ink group-hover:text-brand">
                      {s.name.replace(/^긴급복지\s*/, "")}
                    </span>
                    <span className="text-xs text-muted">
                      {[pay && payType(pay).label, cycleLabel(s.cycle)]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                    <span className="ml-auto shrink-0 text-xs text-muted">
                      조회 {fmtViews(s.views)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-muted">
            각 사업을 누르면 원문 그대로의 금액과 기준연도가 나옵니다.
          </p>
        </DocSection>

        {/*
          금액 표. 위 주석대로 **원문에서 뽑아 그린다** — 파싱이 실패하면
          이 절 자체가 사라진다. 상세 페이지와 같은 한 곳을 보므로 둘이
          어긋날 수 없다.
        */}
        {LIVELIHOOD && LIVELIHOOD_AMOUNTS.length > 0 && (
          <DocSection title="생계지원은 얼마인가">
            <p>
              여덟 갈래 중 가장 많이 찾는 <strong>{LIVELIHOOD.name}</strong>은
              가구원 수에 따라 <strong>정액</strong>으로 나옵니다. 소득에 따라
              달라지는 것이 아니라 인원수로 정해집니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[18rem] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line bg-sunken">
                    <th className="px-3 py-2 text-left font-bold text-ink">
                      가구원 수
                    </th>
                    <th className="px-3 py-2 text-right font-bold text-ink">
                      월 지원액
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {LIVELIHOOD_AMOUNTS.map((r) => (
                    <tr
                      key={r.size}
                      className="border-b border-line last:border-0"
                    >
                      <td className="px-3 py-2 text-slate-700">{r.size}인</td>
                      <td className="px-3 py-2 text-right font-bold tabular-nums text-ink">
                        {won(r.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {LIVELIHOOD_EXTRA && (
              <p className="text-sm">
                {LIVELIHOOD_EXTRA.from}인 이상은 1인 늘 때마다{" "}
                <strong>{won(LIVELIHOOD_EXTRA.each)}</strong>씩 더해집니다.
              </p>
            )}
            <p className="text-xs leading-relaxed text-muted">
              이 표는 저희가 적어 넣은 것이 아니라{" "}
              <Link
                href={`/service/${LIVELIHOOD.id}`}
                className="underline hover:text-brand"
              >
                원문
              </Link>
              에서 그대로 뽑아 그린 것입니다
              {LIVELIHOOD.baseYear && ` (기준연도 ${LIVELIHOOD.baseYear}년)`}.
              원문이 고쳐지면 이 표도 같이 바뀝니다. 나머지 일곱 갈래는 금액
              구조가 저마다 달라 각 상세에서 확인해 주세요.
            </p>
          </DocSection>
        )}

        <DocSection title="위기사유는 법으로 정해져 있습니다">
          <p>
            &ldquo;어렵다&rdquo;고 해서 다 되는 것이 아니라, 어떤 상황을 위기로
            볼지가 목록으로 정해져 있습니다. 원문에 적힌 것을 추리면 이렇습니다.
          </p>
          {/* 짧은 문장 여덟 줄이라 불릿이 없으면 줄바꿈인지 항목인지 안 보인다.
              DocList가 점을 붙여 준다. */}
          <DocList
            items={[
              "주소득자의 사망·가출·행방불명, 구금시설 수용으로 소득 상실",
              "중한 질병 또는 부상",
              "가구원으로부터의 방임·유기·학대",
              "가정폭력 또는 성폭력 피해",
              "화재나 자연재해로 살던 집에서 생활하기 곤란해진 경우",
              "휴업·폐업, 사업장 화재로 영업이 곤란해진 경우",
              "실직으로 소득을 상실한 경우",
              "지자체 조례로 정한 사유, 보건복지부 장관이 고시한 사유",
            ]}
          />
          <p>
            마지막 항목이 넓습니다. 고시로 더해진 것 중에는{" "}
            <strong>이혼으로 소득이 크게 줄어든 경우</strong>, 요금을 못 내
            전기가 끊긴 경우, 교정시설 출소 후 생계가 곤란한 경우 등이
            있습니다. 흔히 &ldquo;나는 해당 안 되겠지&rdquo; 하고 넘기는
            상황들입니다.
          </p>
          <DocNote tone="brand">
            소득 기준도 있습니다. {family.length}갈래 가운데 선정기준에
            비율이 적혀 있는 것은 {famWithPct.length}건인데,{" "}
            {famPercents.length === 1 ? (
              <>
                모두 <strong>기준 중위소득 {famPercents[0]}%</strong>입니다.
              </>
            ) : (
              <>
                기준선이{" "}
                <strong>중위소득 {famPercents.join("%·")}%</strong>로
                갈립니다.
              </>
            )}{" "}
            내가 어느 구간인지는{" "}
            <Link href="/check" className="text-brand underline">
              자가진단
            </Link>
            에서 1분이면 확인됩니다.
          </DocNote>
        </DocSection>

        <DocSection title="선지원 후조사입니다">
          <p>
            이 제도의 핵심은 순서입니다. 보통의 복지는 소득·재산을 조사한 뒤
            결정하지만, 긴급복지는{" "}
            <strong>먼저 지원하고 나중에 조사합니다.</strong> 위기는 심사를
            기다려 주지 않기 때문입니다.
          </p>
          <p>
            그래서 <strong>빨리 알리는 것이 가장 중요합니다.</strong> 상황이
            벌어진 직후에 주민센터나 129에 연락하세요. 몇 달 지나서 &ldquo;그때
            어려웠다&rdquo;고 하면 이 제도로는 처리되지 않습니다.
          </p>
          <ul className="space-y-2">
            <li>
              <strong>보건복지상담센터 129</strong> — 일반 상담은 평일
              09:00~18:00이지만,{" "}
              <strong>긴급지원 상담은 24시간 받습니다.</strong> 긴급복지지원과
              복지사각지대, 노인·아동학대, 정신건강 상담이 여기 해당합니다.
              밤이나 주말에 상황이 벌어져도 걸 수 있다는 뜻입니다.
            </li>
            <li>
              <strong>주소지 시·군·구청 또는 행정복지센터</strong> — 실제 지원
              결정을 하는 곳입니다.
            </li>
          </ul>
          <p>
            본인이 아니어도 신고할 수 있습니다. 이웃이나 친척이 알려서 지원이
            시작되는 경우가 많습니다.
          </p>
        </DocSection>

        {localCrisis.length > 0 && (
          <DocSection title="지자체가 따로 하는 긴급 지원">
            <p>
              중앙 긴급복지에서 걸리더라도 포기하기 이릅니다. 시·도가 자체
              예산으로 운영하는 긴급 지원이 따로 있고, 소득 기준이나 위기사유가
              더 넓게 잡힌 곳이 있습니다.
            </p>
            <ul className="space-y-1.5">
              {localCrisis.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/service/${s.id}`}
                    className="text-sm text-slate-700 hover:text-brand hover:underline"
                  >
                    {s.name}
                    <span className="ml-1.5 text-xs text-muted">
                      {[s.sidoName, s.sigunguName].filter(Boolean).join(" ")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted">
              내 지역 것만 신청할 수 있습니다.{" "}
              <Link href="/region" className="text-brand underline">
                지역별 목록
              </Link>
              에서 사는 곳을 골라 확인하세요.
            </p>
          </DocSection>
        )}

        <DocSection title="이 글의 한계">
          <p>
            여기 정리한 것은 <strong>제도의 뼈대</strong>입니다. 실제 지원
            여부는 위기사유가 인정되는지, 소득·재산이 기준 안에 드는지,
            같은 사유로 이미 받은 적이 있는지에 따라 달라지고,{" "}
            <strong>그 판단은 시·군·구청장이 합니다.</strong> 이 사이트는
            판정하지 않습니다.
          </p>
          <DocNote>
            지금 위급하다면 글을 더 읽지 말고{" "}
            <strong>국번 없이 129</strong>로 전화하세요. 긴급지원 상담은
            24시간 열려 있습니다.
          </DocNote>
        </DocSection>
      </DocPage>

      <div className="mx-auto max-w-3xl">
        <GuideNav current="emergency" />
      </div>
    </>
  );
}
