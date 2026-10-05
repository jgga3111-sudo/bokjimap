import type { Metadata } from "next";
import { GUIDES, GUIDE_GROUPS } from "@/lib/guides";
import { services } from "@/data/services";
import AdSenseScript from "@/components/AdSenseScript";
import GuideBrowser from "@/components/GuideBrowser";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "복지 신청 안내 — 상황별로 묶은 해설",
  description: `아이가 태어났을 때, 일을 그만뒀을 때, 아프거나 돌봄이 필요할 때 — 상황별로 묶은 안내 글 ${GUIDES.length}편입니다. 어디서 신청하는지, 어떤 서류가 필요한지, 공고문의 낯선 말이 무슨 뜻인지도 수록 ${services.length.toLocaleString()}건을 직접 집계해 정리했습니다.`,
  alternates: { canonical: "/guide", types: { "application/rss+xml": "/rss.xml" } },
  /* 글이 아니라 목록이라 website — app/guide/layout.tsx의 article을 되돌린다. */
  openGraph: { type: "website", locale: "ko_KR", siteName: SITE.name },
};

/*
  상황별로 묶는다(2026-09-28). 글이 49편을 넘기며 한 줄로 늘어놓으니 찾는 글이
  스크롤 끝에 있었다. 사람은 제도 이름보다 **자기 상황**으로 찾는다 — 「아이가
  태어났다」, 「일을 그만뒀다」. 갈래와 순서는 lib/guides.ts의 GUIDE_GROUPS 한 곳이
  정하고, 첫 화면 「이런 일이 생겼다면」이 같은 표를 입구로 쓴다.
  요약은 두 줄만 보이게 자른다 — 글자는 HTML에 다 있다(검색엔진은 전문을 읽는다).

  2026-10-05 — 56편이 되어 묶어도 길었다. 갈래를 골라 보는 화면(GuideBrowser)으로 바꿨다:
  넓은 화면은 왼쪽 갈래 목록 + 두 칸 카드, 좁은 화면은 갈래 칩 줄 + 제목만.
*/
const GROUPED = GUIDE_GROUPS.map((grp) => ({
  key: grp.key,
  short: grp.short,
  title: grp.title,
  hint: grp.hint,
  guides: GUIDES.filter((g) => g.group === grp.key).map((g) => ({
    slug: g.slug,
    title: g.title,
    summary: g.summary,
  })),
})).filter((grp) => grp.guides.length > 0);

export default function GuideIndex() {
  return (
    <div className="space-y-8">
      <AdSenseScript />
      <header className="band space-y-2">
        <h1 className="text-2xl font-extrabold sm:text-3xl">복지 신청 안내</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          어디서 신청하는지, 무엇을 챙겨 가는지, 공고문의 저 말이 무슨 뜻인지 — 수록한{" "}
          {services.length.toLocaleString()}건을 직접 집계하고 법령·사업안내서를 찾아{" "}
          {GUIDES.length}편을 썼습니다. 지금 겪는 상황부터 고르세요.
        </p>
      </header>

      <GuideBrowser groups={GROUPED} />

      <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5 text-sm leading-relaxed text-amber-900">
        이 글들은 <strong>제도 안내</strong>이지 자격 판정이 아닙니다. 실제
        신청 자격·금액·기간은 각 사업의 공식 안내와 담당 기관에서 반드시
        최종 확인하세요.
      </p>
    </div>
  );
}
