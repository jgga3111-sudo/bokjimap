import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";

const G = guideBySlug("source-conflicts")!;
const CHECKED = "2026-10-04";

export const metadata: Metadata = {
  title: "복지로 원문과 부처 지침이 서로 다른 곳 — 어느 쪽을 따랐는지",
  description:
    "디딤씨앗통장 월 10만원 대 5만원, 청소년 건강지원 월 대 연 200만원, 암검진 지역가입자 57,000원 대 60,000원처럼 복지로 원문과 법령·부처 지침이 어긋난 곳을 어느 쪽을 따랐는지와 함께 정리했습니다.",
  alternates: { canonical: "/guide/source-conflicts" },
};

/*
  왜 이 글인가 (2026-10-04).

  안내 글을 쓰면서 복지로 원문과 법령·부처 지침을 나란히 읽다 보니, 같은 사업의 같은 항목이
  서로 다르게 적힌 곳이 여러 번 나왔다. 글마다 흩어져 있어서 한 번에 볼 수 없었다. 이 글은
  새 사실을 더하지 않는다 — 각 글이 이미 출처(조문·쪽수)를 달아 적은 어긋남을 한 표로 모은 것이다.

  ── 쓰는 규칙 ────────────────────────────────────────────────
  · 값은 해당 글이 적은 그대로 옮긴다. 이 글에서 새로 계산하거나 다시 해석하지 않는다.
  · 어느 쪽이 맞는지 판정하지 않는다(CLAUDE.md 3절). 저희가 따른 쪽과 그 이유, 어긋난 사실을
    화면에 같이 적었다고만 쓴다. 창구에서 실제로 쓰는 기준은 129·시군구에 확인하라고 적는다.
  · 해마다 바뀌는 값이라 확인일을 적고, 해결되면 행을 지운다. 새로 어긋남을 찾으면 행을 더한다.
  · 표 하나에 행을 더할 때는 해당 안내 글에 같은 어긋남이 이미 적혀 있어야 한다.
*/

type Row = {
  name: string;
  slug: string;
  /** 복지로 원문이 적은 것 */
  bokjiro: string;
  /** 법령·고시·지침·누리집이 적은 것 */
  other: string;
  /** 저희가 따른 쪽과 처리 */
  chose: string;
};

const ROWS: readonly Row[] = [
  {
    name: "디딤씨앗통장 정부 지원금",
    slug: "child-development-account",
    bokjiro: "같은 칸 안에서 「월 10만원 내 지원」과 「월 최대 5만원」이 함께 적힘",
    other: "아동복지법 시행규칙 제19조제2항 「적립한 금액의 2배」, 국가아동권리보장원 상품표 「1천 원 이상 10만 원 이하」",
    chose: "월 10만원 쪽. 두 값을 나란히 적고 시·군·구 확인을 붙임",
  },
  {
    name: "청소년특별지원 건강지원",
    slug: "youth-special-support",
    bokjiro: "월 200만원 이하",
    other: "성평등가족부 2026년 지침 기준표·세부표 두 곳 모두 연 200만원 이하",
    chose: "지침(연 200만원) 쪽. 원문은 월로 읽으면 12배가 되므로 두 값을 같이 적음",
  },
  {
    name: "과학문화바우처 출생 연도",
    slug: "science-voucher",
    bokjiro: "6세 이상(2019.12.31 이전 출생자) — 기준연도는 2026",
    other: "2026년 모집 공고 6세 이상('20.12.31. 이전 출생자)",
    chose: "공고 쪽. 원문대로 읽으면 2020년생 가구가 대상이 아니라고 넘길 수 있어 어긋난 사실을 적음",
  },
  {
    name: "국가암검진 지역가입자 지원 기준",
    slug: "cancer-screening",
    bokjiro: "월 57,000원 이하",
    other: "2026 국가암검진사업 안내 월 60,000원 이하(주요 변경사항)",
    chose: "사업안내 쪽. 57,001~60,000원 가구가 못 받는다고 알게 되지 않도록 두 값을 적음",
  },
  {
    name: "재난적의료비 소득 기준",
    slug: "catastrophic-medical",
    bokjiro: "기준 중위소득 50% 이하 160만원",
    other: "보건복지부 고시 별표 1 — 1인 가구 맨 윗구간 120만원, 2인 이상 160만원",
    chose: "둘 다 적음. 중위소득 기준과 건강보험료 기준은 잣대가 달라 서로 환산하지 않음",
  },
  {
    name: "한부모가족 아동양육비 금액",
    slug: "single-parent-support",
    bokjiro: "청소년한부모 원문은 0~1세 37만원·2세 이상 40만원, 같은 제도의 다른 원문은 0~1세 40만원·2세 이상 37만원",
    other: "성평등가족부 2026년 지침 0~1세 40만원·2세 이상 37만원",
    chose: "지침 쪽. 원문끼리도 어긋난다는 사실을 화면에 적음",
  },
  {
    name: "아이돌봄 한부모 등 가정 취학(B) 가형 지원률",
    slug: "childcare-service",
    bokjiro: "시간당 10,872원(이용요금의 85%)",
    other: "아이돌봄 누리집 안내문 「75% → 80%」, 일반 요금표는 이미 80%",
    chose: "정하지 않음. 계산기에서 이 칸을 빼고 둘 다 적음",
  },
  {
    name: "에너지바우처 근거 고시",
    slug: "energy-voucher",
    bokjiro: "첨부 고시 제2025-30호",
    other: "지금 시행 중인 고시 제2026-141호(2026-06-11 시행)",
    chose: "새 고시 쪽. 수록 원문 첨부가 한 판 낡았다는 사실을 글에 적음",
  },
  {
    name: "기저귀·조제분유 장애인·다자녀 소득 기준",
    slug: "diaper-formula",
    bokjiro: "건강보험료 기준 100%",
    other: "2026년 모자보건사업 안내 본문 「80%」, 각주 「80% → 100%, '26.7월~」",
    chose: "100% 쪽. 본문 숫자만 보면 받을 수 있는 가구가 안 된다고 넘길 수 있어 두 값을 적음",
  },
];

export default function SourceConflictsGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="같은 사업인데 복지로 원문과 법령·부처 지침이 다른 금액이나 기준을 적은 곳이 있습니다. 안내 글을 쓰다 만난 곳을 한 표로 모았습니다. 어느 쪽이 맞는지는 저희가 판정하지 않고, 따른 쪽과 이유를 적었습니다."
        updated={`최종 수정 ${G.updated} · 각 글의 출처를 ${CHECKED} 다시 대조`}
      >
        <DocNote tone="brand" title="창구에서는 어느 쪽 기준을 쓰는지 꼭 물어보세요">
          이 표는 원문과 지침이 어긋난 사실을 알려 드리는 것이지, 어느 쪽이 맞다고 정해 드리는 것이 아닙니다. 해마다
          값이 바뀌므로 신청 전에 보건복지상담센터 129 또는 주소지 시·군·구에 확인하는 것이 가장 정확합니다.
        </DocNote>

        <DocSection title="어긋난 곳">
          <div className="-mx-1 overflow-x-auto">
            <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
              <caption className="sr-only">복지로 원문과 다른 출처의 값이 어긋난 사업</caption>
              <thead className="bg-ground text-ink">
                <tr>
                  <th scope="col" className="px-3 py-2 font-semibold">사업</th>
                  <th scope="col" className="px-3 py-2 font-semibold">복지로 원문</th>
                  <th scope="col" className="px-3 py-2 font-semibold">법령·고시·지침</th>
                  <th scope="col" className="px-3 py-2 font-semibold">저희가 한 처리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line align-top">
                {ROWS.map((r) => (
                  <tr key={r.slug}>
                    <td className="px-3 py-2 font-medium text-ink">
                      <Link href={`/guide/${r.slug}`} className="text-brand underline">
                        {r.name}
                      </Link>
                    </td>
                    <td className="px-3 py-2">{r.bokjiro}</td>
                    <td className="px-3 py-2">{r.other}</td>
                    <td className="px-3 py-2">{r.chose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            사업 이름을 누르면 조문·쪽수와 함께 쓴 안내 글로 갑니다. 값은 각 글이 적은 그대로 옮겼고, 이 글에서 다시
            계산하지 않았습니다.
          </p>
        </DocSection>

        <DocSection title="왜 이런 일이 생기나요">
          <p>
            복지로 원문은 해마다 새로 쓰는 법령·지침보다 늦게 고쳐지는 경우가 많고, 한 사업이 여러 원문 항목으로 나뉘어
            있으면 항목끼리도 값이 다르게 남습니다. 위 표에서 한부모 아동양육비가 그런 경우입니다. 수록 원문에 첨부된
            고시가 한 판 낡은 경우(에너지바우처)도 있습니다.
          </p>
        </DocSection>

        <DocSection title="저희가 따르는 기준">
          <p>
            법령·고시처럼 날짜와 조항이 확인되는 쪽, 그리고 해당 연도 지침처럼 더 구체적인 쪽을 따릅니다. 따른 쪽만 적지
            않고 어긋난 사실을 화면에 함께 적어서, 원문만 보고 오신 분이 값이 다른 이유를 알 수 있게 합니다. 두 출처로
            값을 정할 수 없는 경우(아이돌봄·재난적의료비)에는 정하지 않고 둘 다 적었습니다.
          </p>
          <p>
            이 표는 새 어긋남을 찾을 때마다 늘리고, 원문이 고쳐져 해결된 행은 지웁니다. 틀린 곳을 찾으셨다면{" "}
            <Link href="/contact" className="text-brand underline">
              알려 주세요
            </Link>
            . 수집·검수 방식은{" "}
            <Link href="/standards" className="text-brand underline">
              정보 수집·검수 기준
            </Link>
            에 있습니다.
          </p>
        </DocSection>
      </DocPage>
      <GuideNav current="source-conflicts" />
    </>
  );
}
