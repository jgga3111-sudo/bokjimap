import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import KpassCalc from "@/components/KpassCalc";
import { guideBySlug } from "@/lib/guides";
import {
  KPASS_TYPES,
  KPASS_REGIONS,
  KPASS_CHECKED,
  KPASS_SOURCE,
  KPASS_SOURCE_URL,
  MIN_RIDES,
  NORMAL_FARE_CAP,
} from "@/lib/kpass";
import { services } from "@/data/services";
import { won } from "@/lib/display";

const G = guideBySlug("k-pass")!;

/** 원문 페이지. 이름은 목록에서 가져온다 — 손으로 적으면 바뀔 때 어긋난다. */
const SERVICE_ID = "WLF00005440";
const SERVICE = services.find((s) => s.id === SERVICE_ID);

export const metadata: Metadata = {
  title: "K-패스 환급 계산 — 내 유형·지역이면 얼마 돌려받나",
  description:
    "K-패스(모두의 카드) 환급은 기본형·일반형·플러스형 셋 중 가장 큰 것으로 자동 적용됩니다. 일반 20%·청년 30%·3자녀 50%·저소득 53%와 지역별 기준금액을 한국교통안전공단 표에서 옮겨, 월 이용금액을 넣으면 바로 계산됩니다.",
  alternates: { canonical: "/guide/k-pass" },
};

/*
  왜 이 글인가. 앞의 글들은 "언제 신청하나·언제 들어오나"까지 말했다.
  이 글은 **얼마인가**를 말하는 첫 글이다.

  근거는 전부 한국교통안전공단(운영기관) 표다. 우리 수록 데이터에서 뽑은
  숫자가 하나도 없다 — `/guide/unemployment`(조문만으로 쓴 글) 다음으로
  그런 글이고, 이유도 같다. 복지로가 안 싣는 값이기 때문이다.
*/

/** 요율이 같은 유형을 한 줄로 묶는다 — 공단 표가 병합해 둔 모양 그대로. */
const RATE_ROWS = (() => {
  const byRate = new Map<number, string[]>();
  for (const t of KPASS_TYPES) {
    const list = byRate.get(t.rate) ?? [];
    list.push(t.label);
    byRate.set(t.rate, list);
  }
  return [...byRate.entries()].sort((a, b) => a[0] - b[0]);
})();

const GROUP_LABEL = {
  general: "일반 국민",
  mid: "청년·2자녀·어르신",
  high: "3자녀 이상·저소득",
} as const;

export default function KpassGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="환급률이 20%인지 53%인지, 기준금액이 3만원인지 10만원인지는 내가 어느 유형이고 어디 사는지에 달렸습니다. 그런데 그 표가 복지로 안내에는 없습니다."
        updated={`최종 수정 ${G.updated} · 요율과 기준금액은 ${KPASS_CHECKED} 확인`}
      >
        <DocSection title="원문에는 범위만 있습니다">
          <p>
            복지로가 주는 공공데이터에서 이 사업의 지원 내용은 이렇게 끝납니다.
          </p>
          <blockquote className="rounded-xl bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
            월 {MIN_RIDES}회 이상 대중교통 이용금액의 20%~53.3% 환급
            <br />
            기준금액(3~10만원)을 초과하는 지출 금액 전액 환급
          </blockquote>
          <p>
            <strong>범위만 있고 내 값이 없습니다.</strong> 20%와 53.3%는 3배가
            차이 나고, 3만원과 10만원도 3배가 차이 납니다. 이대로는 얼마를
            돌려받는지 알 수 없습니다.
          </p>
          <p>
            표는 사업을 운영하는{" "}
            <strong>한국교통안전공단</strong> 쪽에 있었습니다. 아래는 그 표를
            그대로 옮긴 것입니다.
          </p>
        </DocSection>

        <DocSection title="계산해 보기">
          <KpassCalc />
        </DocSection>

        <DocSection title="환급 유형이 셋입니다">
          <p>
            <strong>고르는 게 아니라 셋 다 계산됩니다.</strong> 공단 안내는
            &ldquo;월 1일~말일 기준으로 대중교통 {MIN_RIDES}회 이상 이용 시
            3가지(기본형/일반형/플러스형) 환급 유형 중 가장 유리한 유형으로 자동
            적용되어 익월 환급&rdquo;이라고 적고 있습니다. 미리 선택할 것이
            없습니다.
          </p>
          <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
            <li>
              <strong className="text-ink">기본형</strong> — 이용금액에 유형별
              비율을 곱합니다.
            </li>
            <li>
              <strong className="text-ink">일반형</strong> — 기준금액을 넘는
              만큼 돌려줍니다. 다만 대상이{" "}
              <strong>
                1회 {NORMAL_FARE_CAP.toLocaleString("ko-KR")}원 미만 이용분
              </strong>
              뿐입니다.
            </li>
            <li>
              <strong className="text-ink">플러스형</strong> — 같은 방식인데
              대상이 <strong>전체 이용분</strong>이고, 그만큼 기준금액이 높습니다.
            </li>
          </ul>
          <p>
            그래서 시내버스·지하철만 타면 일반형이 유리하고, 광역버스처럼 한 번에
            {" "}{NORMAL_FARE_CAP.toLocaleString("ko-KR")}원이 넘는 이용이 섞이면
            플러스형 쪽이 커집니다.
          </p>
        </DocSection>

        <DocSection title="① 기본형 환급 비율">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[22rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-slate-50">
                  <th className="px-3 py-2 text-left font-bold text-ink">유형</th>
                  <th className="px-3 py-2 text-right font-bold text-ink">
                    환급 비율
                  </th>
                </tr>
              </thead>
              <tbody>
                {RATE_ROWS.map(([rate, labels]) => (
                  <tr key={rate} className="border-b border-line last:border-0">
                    <td className="px-3 py-2 text-slate-700">
                      {labels.join(" · ")}
                    </td>
                    <td className="px-3 py-2 text-right font-bold tabular-nums text-ink">
                      {Math.round(rate * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {KPASS_TYPES.filter((t) => t.note).map((t) => (
            <p key={t.id} className="text-xs leading-relaxed text-muted">
              <strong>{t.label}</strong> — {t.note}
            </p>
          ))}
          {/*
            2026-09-08에 여기서 틀릴 뻔했다. 공단 페이지를 요약해 읽었더니
            "어르신 50%"라고 나왔는데, 원문 표는 청년·어르신·2자녀를 한 칸에
            묶어(colspan=3) 30%로 적고 있었다. 국토교통부 보도자료 제목이
            "어르신 유형(환급률 30%) 신설"이라 대조하면 바로 걸린다.
            돈이 걸린 표는 병합 셀까지 열어 보고 옮긴다.
          */}
        </DocSection>

        <DocSection title="② 지역별 기준금액">
          <p>
            일반형·플러스형이 넘어야 하는 금액입니다. 지역과 유형에 따라
            다릅니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-slate-50">
                  <th className="px-3 py-2 text-left font-bold text-ink">지역</th>
                  {(["general", "mid", "high"] as const).map((g) => (
                    <th
                      key={g}
                      className="px-3 py-2 text-right font-bold text-ink"
                    >
                      {GROUP_LABEL[g]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {KPASS_REGIONS.map((r) => (
                  <tr key={r.id} className="border-b border-line last:border-0">
                    <td className="px-3 py-2 text-slate-700">{r.label}</td>
                    {(["general", "mid", "high"] as const).map((g) => (
                      <td
                        key={g}
                        className="px-3 py-2 text-right tabular-nums text-slate-700"
                      >
                        {won(r.threshold[g][0])}
                        <span className="text-muted"> / </span>
                        {won(r.threshold[g][1])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs leading-relaxed text-muted">
            각 칸은 <strong>일반형 / 플러스형</strong> 순서입니다.
          </p>
          <p>
            이 표의 가장 작은 값이 {won(30000)}, 가장 큰 값이 {won(100000)}입니다.
            복지로 원문이 말한 &ldquo;기준금액(3~10만원)&rdquo;과 정확히
            맞습니다. <strong>서로 다른 두 출처가 같은 수를 가리킵니다.</strong>
          </p>
        </DocSection>

        <DocSection title="저희가 하지 않는 것">
          <p>
            <strong>자격을 판정하지 않습니다.</strong> 유형은 고르는 것이지
            저희가 맞히는 것이 아닙니다. 청년인지 저소득인지는 회원가입 때
            주민등록번호 검증으로 정해지고, 어느 지역이 우대·특별지원지역인지도
            지자체마다 다릅니다.
          </p>
          <p>
            계산기가 내놓는 금액은 <strong>공단 표에 넣어 저희가 계산한 값</strong>
            입니다. 원 단위 아래 처리 방식이 표에 없어 반올림했고, 그 사실을
            화면에도 적어 두었습니다.
          </p>
          <DocNote>
            요율과 기준금액은 바뀝니다. 이 글의 숫자는 위에 적힌 확인일 기준이고,
            실제 환급액은 이용 내역에 따라 달라집니다. 정확한 금액은 K-패스
            앱이나 홈페이지에서 확인해 주세요.
          </DocNote>
          <p className="text-sm">
            근거{" "}
            <a
              href={KPASS_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand"
            >
              {KPASS_SOURCE}
            </a>{" "}
            · {KPASS_CHECKED} 확인
          </p>
          {SERVICE && (
            <p>
              <Link
                href={`/service/${SERVICE_ID}`}
                className="text-brand underline"
              >
                복지로 원문으로 보기 — {SERVICE.name} →
              </Link>
            </p>
          )}
        </DocSection>
      </DocPage>
      <GuideNav current="k-pass" />
    </>
  );
}
