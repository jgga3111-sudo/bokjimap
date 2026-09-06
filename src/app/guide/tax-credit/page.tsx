import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";

const G = guideBySlug("tax-credit")!;

export const metadata: Metadata = {
  title: `${G.title} — 정기신청·반기신청·기한 후 신청의 차이`,
  description:
    "근로장려금은 한 해에 신청 창구가 넷입니다. 정기신청 5월, 반기신청 3월·9월, 기한 후 신청 6~12월. 무엇이 다르고 언제 얼마가 들어오는지 국세청 안내로 정리했습니다.",
  alternates: { canonical: "/guide/tax-credit" },
};

/*
  왜 이 글인가. 검색 수요를 재 보니(2026-09-06, 네이버 데이터랩) 근로장려금
  무리가 우리가 잰 것 중 가장 컸다 — 5월이 7월의 5.5배다.

  그런데 **우리 데이터가 유독 얇다.** 수록 900건 중 조회수 23위인데,
  신청방법 서술이 비어 있고 서식도 0개다. 이유는 분명하다 —
  이건 보건복지부가 아니라 **국세청** 제도라, 복지로가 채워 주는 칸이
  다른 사업과 다르게 비어 있다.

  그래서 이 글은 우리 데이터를 집계하는 글이 아니라 **국세청 안내를 옮겨
  빈칸을 메우는 글**이다. 숫자와 날짜는 전부 국세청 화면에서 확인했고,
  링크를 걸어 두었다. 자격 판정은 하지 않는다(CLAUDE.md 3절).
*/
const ID = "WLF00001148";
const S = services.find((s) => s.id === ID);

const NTS_STEP =
  "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40397&cntntsId=238977";
const NTS_PAY =
  "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2453&cntntsId=7784";

type Door = {
  key: string;
  when: string;
  who: string;
  pay: string;
  cut: string | null;
};

/** 국세청 안내 화면에서 옮긴 네 갈래. 원문 표현을 바꾸지 않는다. */
const DOORS: readonly Door[] = [
  {
    key: "정기신청",
    when: "5월 1일~5월 31일",
    who: "모두 — 자녀장려금은 이 문에서만 신청합니다",
    pay: "9월 말까지",
    cut: null,
  },
  {
    key: "반기신청 — 상반기분",
    when: "9월 1일~9월 15일",
    who: "근로소득만 있는 사람",
    pay: "2026년 12월 30일",
    cut: "연간 산정액의 35%가 먼저 나오고, 나머지는 다음 해에 정산됩니다.",
  },
  {
    key: "반기신청 — 하반기분",
    when: "3월 1일~3월 15일",
    who: "근로소득만 있는 사람",
    pay: "2027년 6월 30일",
    cut: "상반기분을 신청했다면 자동으로 신청된 것으로 봅니다.",
  },
  {
    key: "기한 후 신청",
    when: "6월 2일~12월 1일",
    who: "5월 정기신청을 놓친 사람",
    pay: "신청일로부터 4개월 이내",
    cut: "장려금의 95%만 나옵니다.",
  },
];

export default function TaxCreditGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="이름은 하나인데 신청하는 문이 넷입니다. 어느 문으로 들어가느냐에 따라 받는 시점도, 금액도 달라집니다."
        updated={`최종 수정 ${G.updated} · 날짜와 금액은 국세청 안내 화면에서 2026-09-06 확인`}
      >
        <DocSection title="왜 헷갈리나 — 복지로에는 안 적혀 있습니다">
          <p>
            근로장려금은 이 사이트에 수록된{" "}
            {services.length.toLocaleString()}건 중 조회수 상위에 드는 제도입니다.
            그런데 상세 페이지를 열어 보면 다른 사업보다 칸이 비어 있습니다.
          </p>
          <ul className="space-y-1.5">
            <li className="flex gap-3">
              <span className="w-28 shrink-0 text-muted">신청 방법 설명</span>
              <span className="font-medium text-ink">
                {S?.applyMethod ? "있음" : "비어 있음"}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-28 shrink-0 text-muted">신청 서식</span>
              <span className="font-medium text-ink">
                {S ? `${S.forms.length}개` : "—"}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-28 shrink-0 text-muted">온라인 신청</span>
              <span className="font-medium text-ink">
                {S?.onlineApply === false ? "복지로에서는 안 됨" : "—"}
              </span>
            </li>
          </ul>
          <p>
            빠뜨린 게 아닙니다. 이 제도는 <strong>보건복지부가 아니라 국세청</strong>{" "}
            소관이라, 복지로가 채워 주는 칸이 애초에 다릅니다. 신청도 주민센터가
            아니라 <strong>홈택스와 관할 세무서</strong>에서 합니다.
          </p>
          <p>
            아래는 그 빈칸을 국세청 안내로 메운 것입니다.
          </p>
        </DocSection>

        <DocSection title="네 개의 문">
          <div className="space-y-3">
            {DOORS.map((d) => (
              <div
                key={d.key}
                className="overflow-hidden rounded-xl border border-line bg-white"
              >
                <p className="border-b border-line bg-slate-50 px-4 py-2.5 text-sm font-extrabold text-ink">
                  {d.key}
                </p>
                <dl className="divide-y divide-line text-sm">
                  {[
                    ["언제 신청", d.when],
                    ["누가", d.who],
                    ["언제 들어오나", d.pay],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-3 px-4 py-2.5">
                      <dt className="w-24 shrink-0 text-muted">{k}</dt>
                      <dd className="min-w-0 font-medium text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                {d.cut && (
                  <p className="border-t border-line bg-amber-50/60 px-4 py-2.5 text-xs leading-relaxed text-slate-700">
                    {d.cut}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted">
            출처{" "}
            <a
              href={NTS_STEP}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand"
            >
              국세청 — 신청 기간
            </a>{" "}
            ·{" "}
            <a
              href={NTS_PAY}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand"
            >
              국세청 — 심사 및 지급
            </a>
            . 2026-09-06 확인.
          </p>
        </DocSection>

        <DocSection title="5월과 9월, 무엇을 고르나">
          <p>
            <strong className="text-ink">5월(정기신청)은 모두에게 열립니다.</strong>{" "}
            그리고 <strong>자녀장려금은 이 문에서만</strong> 신청됩니다 — 반기신청
            표에는 근로소득자만 적혀 있습니다. 대신 돈은 9월 말에 들어옵니다.
          </p>
          <p>
            <strong className="text-ink">
              9월·3월(반기신청)은 근로소득만 있는 사람 전용입니다.
            </strong>{" "}
            먼저 받는 대신 <strong>정확한 금액은 나중에 정산</strong>됩니다. 상반기
            분으로 35%를 먼저 받고, 나머지는 다음 해에 맞춰 봅니다.
          </p>
          <DocNote>
            어느 쪽이 유리한지는 저희가 판정하지 않습니다. 소득 구성과 필요한
            시점에 따라 갈리고, 그 판단은 국세청 장려금 상담센터(1566-3636)나
            관할 세무서에서 받으셔야 합니다.
          </DocNote>
        </DocSection>

        <DocSection title="12월 1일이 진짜 마지막입니다">
          <p>
            5월을 놓쳐도 끝이 아닙니다. <strong>6월 2일부터 12월 1일까지</strong>{" "}
            기한 후 신청을 받습니다. 다만 <strong>95%만</strong> 나옵니다.
          </p>
          <p>
            12월 1일이 지나면 그해 몫은 되돌릴 방법이 없습니다. 이 사이트의{" "}
            <Link href="/guide/calendar" className="text-brand underline">
              신청 달력
            </Link>
            에 다른 제도의 마감일과 함께 적어 두었습니다.
          </p>
        </DocSection>

        <DocSection title="어디서 신청하나">
          <p>
            주민센터가 아니라 <strong>홈택스</strong>(www.hometax.go.kr, 모바일은
            손택스)입니다. 국세청이 보낸 안내문이 있다면 거기 적힌{" "}
            <strong>개별인증번호</strong>로 ARS <strong>1544-9944</strong>에서도
            신청할 수 있습니다.
          </p>
          <p>
            안내문을 못 받았어도 요건에 맞으면 홈택스나 서면으로 신청할 수
            있습니다. 혼자 하기 어려우면 국세청 장려금 상담센터{" "}
            <strong>1566-3636</strong>에 신청대리를 요청할 수 있습니다.
          </p>
          {S && (
            <p>
              <Link
                href={`/service/${S.id}`}
                className="text-brand underline"
              >
                {S.name} 상세 보기 — 지원 대상·선정 기준 원문 →
              </Link>
            </p>
          )}
          <DocNote>
            이 글의 날짜와 비율은 국세청 안내 화면을 옮긴 것입니다. 해마다
            바뀔 수 있으니 신청 직전에는 위 출처 링크에서 그해 공고를 다시
            확인해 주세요.
          </DocNote>
        </DocSection>
      </DocPage>
      <GuideNav current="tax-credit" />
    </>
  );
}
