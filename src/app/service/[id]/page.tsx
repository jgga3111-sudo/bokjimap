import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, SERVICES_UPDATED } from "@/data/services";
import { isIndexable, type WelfareService } from "@/types/welfare";
import { payType, cycleLabel, placeLabel, views, won, visiblePayTypes, periodLabel, payTypeHelp, cycleHelp } from "@/lib/display";
import { targetBySlug, lifeStageBySlug } from "@/lib/axes";
import { thresholdOf, BASE_YEAR } from "@/lib/midIncome";
import { SITE } from "@/lib/site";
import { jsonLd, safeUrl, telHref } from "@/lib/safe";
import TrackView from "@/components/TrackView";
import MyEligibility from "@/components/MyEligibility";

const byId = new Map(services.map((s) => [s.id, s]));

/**
 * 같은 이름의 사업이 여럿 있다 — 55건이 25개 이름을 나눠 쓴다.
 * "청년월세 지원사업"은 국토교통부 것 하나에 구미시·음성군 것이 따로 있다.
 * 셋 다 <title>이 글자 하나까지 같으면 구글은 하나만 남기고 나머지를
 * "중복 페이지"로 접는다 — 러닝온에서 본 "크롤링됨 – 색인 안 됨"의 한 갈래다.
 *
 * 그래서 **이름이 겹칠 때만** 앞에 지역을 붙인다. 겹치지 않는 845건은
 * 그대로 둔다. 지역을 붙이면 25개 그룹이 전부 갈린다(2026-09-02 확인).
 * 상세 화면에는 이미 제목 바로 아래에 같은 지역 표기가 있으므로
 * 화면과 제목이 어긋나지도 않는다.
 */
const dupName = new Set(
  Object.entries(
    services.reduce<Record<string, number>>((acc, s) => {
      acc[s.name] = (acc[s.name] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .filter(([, n]) => n > 1)
    .map(([name]) => name),
);

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/service/[id]">): Promise<Metadata> {
  const { id } = await params;
  const s = byId.get(id);
  if (!s) return {};

  const where = placeLabel(s);
  const label = dupName.has(s.name) ? `${where} ${s.name}` : s.name;

  /* 설명 앞에 사업명을 세우는 이유. 요약문은 정부 API에서 오는데, 서로
     다른 사업이 글자까지 같은 문장을 쓰는 경우가 있다 — 뇌 MRI 검사비
     지원과 임플란트·틀니 지원이 똑같이 "저소득 주민의 경제적 부담을
     경감시키고…"로 시작한다. 본문은 전혀 다른데 설명만 보면 같은
     페이지고, 그러면 구글이 하나로 접는다. 사업명이 그 둘을 가른다. */
  const gist = s.summary ?? s.outline;
  return {
    title: `${label} — 지원대상·지원내용·신청방법`,
    description: gist
      ? `${label} — ${gist}`
      : `${label}의 지원 대상과 신청 방법을 정리했습니다.`,
    alternates: { canonical: `/service/${s.id}` },
    /* 본문이 얇은 항목은 색인에서 뺀다. 러닝온에서 얇은 페이지 510개가
       "발견됨 – 색인 안 됨"에 빠진 것을 실측했다(docs/02). */
    robots: isIndexable(s) ? undefined : { index: false, follow: true },
  };
}

/** 본문 문단. 원문의 줄바꿈을 그대로 살린다 — 항목 나열이 뭉개지지 않게. */
function Prose({ text }: { text: string }) {
  return (
    <div className="space-y-1.5 text-sm leading-relaxed whitespace-pre-line text-slate-700">
      {text}
    </div>
  );
}

/**
 * 본문 한 절.
 *
 * 제목 앞에 이모지를 달았었다 — 👥 지원 대상, ✅ 선정 기준, 🎁 지원 내용,
 * 📝 신청 방법, ☎️ 문의처, 📄 서식, ⚖️ 근거 법령. 일곱 개가 전부 다른 그림에
 * 다른 색이라, 절을 구분해 주는 게 아니라 페이지를 알록달록하게 만들었다.
 * 정부24 서비스 상세는 같은 자리에 **한 세트로 그린 파란 선 아이콘**을 쓴다.
 * 우리는 아이콘 세트를 직접 그릴 형편이 아니니 아예 없앴다.
 *
 * 대신 제목 왼쪽에 브랜드색 세로 바를 둔다. 그림 일곱 종이 하던 일
 * — "여기서 새 절이 시작한다" — 을 색 하나로 한다.
 */
/**
 * 페이지 안 목차.
 *
 * 왜 필요한가. 조회수 상위 상세는 375px 화면에서 **5,400px**이 넘는다.
 * 사람들이 가장 알고 싶은 "얼마 주나"(지원 내용)가 2,900px 지점에 있어서,
 * 엄지로 열 번 넘게 밀어야 닿는다.
 *
 * 새로 만들 것은 거의 없었다 — 절마다 id가 이미 붙어 있었다(`#target`
 * `#criteria` `#benefit` `#apply` `#contact` `#forms` `#law`, 900건 전부).
 * 쓰는 데가 없어서 놀고 있었을 뿐이다.
 *
 * **있는 절만 건다.** 상세를 아직 못 받은 항목은 절이 두어 개뿐인데 거기에
 * 목차를 얹으면 목차가 본문보다 길어진다. 그래서 셋 미만이면 그리지 않는다.
 */
const TOC = [
  { id: "target", title: "지원 대상", has: (s: WelfareService) => !!s.eligibility },
  { id: "criteria", title: "선정 기준", has: (s: WelfareService) => !!s.selectionCriteria },
  { id: "benefit", title: "지원 내용", has: (s: WelfareService) => !!s.supportContent },
  {
    id: "apply",
    title: "신청 방법",
    has: (s: WelfareService) => !!s.applyMethod || s.applySteps.length > 0,
  },
  {
    id: "contact",
    title: "문의처",
    has: (s: WelfareService) => s.contacts.length > 0 || s.homepages.length > 0,
  },
  { id: "forms", title: "서식", has: (s: WelfareService) => s.forms.length > 0 },
  { id: "law", title: "근거 법령", has: (s: WelfareService) => s.lawBasis.length > 0 },
] as const;

function PageToc({ s }: { s: WelfareService }) {
  const items = TOC.filter((t) => t.has(s));
  if (items.length < 3) return null;

  /*
    마지막 칸은 본문 절이 아니라 **공식 안내로 내려가는 길**이다.

    이 사이트의 역할은 안내와 링크까지다(CLAUDE.md 3절). 그런데 그 링크가
    페이지 맨 끝 회색 각주 안에 작은 글씨로 있었다. 조회수 상위 상세는
    375px에서 5,400px이 넘으니, 정작 마지막에 해야 할 일이 가장 닿기 어려운
    자리에 있었던 셈이다.

    바깥으로 바로 내보내지 않고 **각주 자리로 스크롤시킨다.** 우리가 받아둔
    날짜와 "그 뒤로 바뀌었을 수 있다"는 경고를 읽고 나서 누르는 것과, 그냥
    누르는 것은 다르다. 위에 외부 링크를 하나 더 다는 것보다 이쪽이 맞다.

    `has`는 넣지 않는다 — 세 절 미만이면 목차를 안 그린다는 규칙(위 주석)을
    이 칸이 채워서 깨뜨리면 안 되기 때문에, 절 개수를 센 **뒤에** 붙인다.
  */
  const official = safeUrl(s.officialUrl);

  return (
    <nav aria-label="이 페이지 안에서" className="rounded-xl border border-line bg-slate-50/70 px-4 py-3">
      <h2 className="text-xs font-bold text-muted">이 페이지에서</h2>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {items.map((t) => (
          <li key={t.id}>
            <a
              href={`#${t.id}`}
              className="inline-block rounded-full border border-line bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:border-brand hover:text-brand"
            >
              {t.title}
            </a>
          </li>
        ))}
        {official && (
          <li>
            <a
              href="#official"
              className="inline-block rounded-full border border-brand bg-brand-soft px-3 py-1.5 text-sm font-medium text-brand transition hover:bg-brand hover:text-white"
            >
              공식 안내 ↓
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  /* scroll-mt는 sticky 헤더보다 커야 한다. 헤더가 99px(로고·검색 56 +
     분류 칩 43)인데 scroll-mt-20(80px)이어서, 목차로 뛰면 제목이 헤더 밑에
     19px 잠겼다. 앵커는 900건에 다 깔려 있었지만 목차가 없어 아무도 누르지
     않았고, 그래서 여태 안 드러났다. 28 = 112px. */
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mb-2 flex items-center gap-2 font-bold text-ink">
        <span aria-hidden className="h-4 w-1 shrink-0 rounded-full bg-brand" />
        {title}
      </h2>
      {children}
    </section>
  );
}

/** 표의 한 줄. 값이 없으면 줄 자체를 그리지 않는다. */
function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 border-b border-line py-2.5 last:border-0">
      <dt className="w-20 shrink-0 text-sm text-muted">{label}</dt>
      <dd className="min-w-0 text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}

/**
 * 핵심 세 칸 — **무엇으로 / 얼마 간격으로 / 인터넷으로 되나.**
 *
 * ── 왜 만들었나 ────────────────────────────────────────────────
 * 원본 지원내용은 행정 문서 문장 그대로다. 주거급여의 지원내용은 "기준임대료를
 * 상한으로 실제 임차료(월 임차료+보증금 환산액)을 지원합니다"로 시작한다.
 * 정확하지만, 이걸 읽고 "그래서 돈이 나온다는 건가 요금이 깎인다는 건가"를
 * 아는 사람은 많지 않다.
 *
 * 그런데 그 답은 이미 데이터에 있었다. `/guide/mistakes`가 수록분을 집계해
 * **가장 많이 틀리는 지점**으로 꼽은 것이 정확히 이 둘이다 — "돈이 아닌데
 * 돈으로 알거나, 한 번인데 매달로 알거나". 알고 있으면서 표 안쪽 작은
 * 글씨로만 알려주고 있었다.
 *
 * ── 새로 더하는 게 아니라 모으는 것이다 ──────────────────────────
 * 같은 값이 네 군데에 흩어져 있었다.
 *   ① 제목 위 배지(현금 / 온라인신청 가능)
 *   ② 「한눈에 보기」 표의 지원 형태·지원 주기 줄
 *   ③ 「쉽게 말하면」의 풀이 문장
 * 셋을 여기 하나로 합친다. 배지는 목록에서 여러 건을 훑을 때 쓰는 장치지,
 * 한 건을 읽는 화면에서 같은 말을 더 작게 반복할 이유가 없다.
 *
 * ── 지어내지 않는다 ────────────────────────────────────────────
 * 세 값 모두 원본이 준 구조화된 값이다. 우리가 사업 내용을 요약해 다시 쓰지
 * 않는다(CLAUDE.md 3절). 풀이 문장도 값에서 유도한 것이지 사업별 설명이
 * 아니다 — 가장 중요한 건 융자다. "융자"라고만 적혀 있으면 받는 돈으로
 * 오해하기 쉬운데 수록분에 30건이 있다.
 *
 * ── 빈칸이 안 생기는지 재고 만들었다 (2026-09-05) ───────────────
 *   지급형태 900/900 · 지급주기 900/900 · 온라인신청 330/900
 * 앞의 둘은 늘 있으므로 고정, 온라인신청은 **값이 있을 때만** 세 번째 칸을
 * 만든다. 값이 없는 570건(지자체)에서는 두 칸으로 그린다.
 *
 * `false`(276건)도 그린다. "인터넷으로는 안 된다"는 것도 알아야 헛되이
 * 찾아 헤매지 않는다. 어디서 접수하는지는 원문에 있을 때만 아래 「신청 방법」
 * 절이 말한다 — 여기서 짐작해 채우지 않는다.
 */
function KeyFacts({ s }: { s: WelfareService }) {
  const pays = visiblePayTypes(s.payTypes);
  if (pays.length === 0 && !s.cycle) return null;

  const cells: { k: string; v: string; help: string | null }[] = [];

  if (pays.length > 0) {
    cells.push({
      k: "받는 방법",
      v: pays.map((p) => payType(p).label).join(" · "),
      /* 형태가 둘 이상인 건이 50건 있다. 풀이를 전부 이으면 칸이 길어져
         옆 칸과 높이가 어긋나므로 두 문장까지만 싣는다. */
      help:
        pays
          .map(payTypeHelp)
          .filter((v): v is string => Boolean(v))
          .slice(0, 2)
          .join(" ") || null,
    });
  }

  if (s.cycle) {
    cells.push({
      k: "받는 주기",
      v: cycleLabel(s.cycle) ?? s.cycle,
      help: cycleHelp(s.cycle),
    });
  }

  if (s.onlineApply !== null) {
    cells.push({
      k: "온라인 신청",
      v: s.onlineApply ? "가능" : "안 됨",
      help: s.onlineApply
        ? "인터넷으로 신청할 수 있습니다."
        : "인터넷 신청은 받지 않습니다.",
    });
  }

  /* 칸 수만큼만 열을 만든다.

     처음엔 `sm:grid-cols-3`으로 고정했다가 지자체 사업에서 깨졌다 —
     온라인신청 값이 없어 칸이 둘인데 열은 셋이라, 넓은 화면에서 **빈
     세 번째 열이 회색 덩어리로** 남았다. 칸 사이 선을 `gap-px`와 배경색으로
     내고 있어서 빈 열이 곧 색면이 된다. 수록 900건 중 570건이 이 경우다. */
  const cols =
    cells.length >= 3
      ? "sm:grid-cols-3"
      : cells.length === 2
        ? "sm:grid-cols-2"
        : "";

  return (
    <section
      aria-label="핵심 정보"
      /* 칸 사이 선을 gap-px + 배경색으로 낸다. 칸마다 border를 주면 맞닿는
         자리가 2px로 겹쳐 두꺼워진다. */
      className={`mt-4 grid gap-px overflow-hidden rounded-xl border border-line bg-line ${cols}`}
    >
      {cells.map((c) => (
        <div key={c.k} className="bg-white px-4 py-3">
          <p className="text-xs font-bold text-muted">{c.k}</p>
          <p className="mt-0.5 text-lg leading-tight font-extrabold text-ink">
            {c.v}
          </p>
          {c.help && (
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
              {c.help}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}

/**
 * 선정기준에서 읽어낸 중위소득 기준을 자가진단으로 잇는다.
 * 문장에 명시가 없으면 이 배너 자체를 띄우지 않는다 — 짐작으로 기준을
 * 만들어 붙이면 "대상이라고 해서 갔는데 아니었다"가 된다.
 */
function IncomeBanner({ s }: { s: WelfareService }) {
  if (s.medianPercent === null) return null;
  return (
    <div className="rounded-xl border border-brand/20 bg-brand-soft p-4">
      <p className="text-sm font-bold text-ink">
        소득 기준: 기준 중위소득 {s.medianPercent}% 이하
      </p>
      <p className="mt-1.5 text-sm text-slate-700">
        {BASE_YEAR}년 기준 1인 가구{" "}
        <strong>{won(thresholdOf(1, s.medianPercent))}</strong>, 4인 가구{" "}
        <strong>{won(thresholdOf(4, s.medianPercent))}</strong> 이하입니다.
      </p>
      {/* 자가진단을 이미 한 사람에게는 비교 결과를, 안 한 사람에게는
          계산하러 가는 버튼을 보여준다. 어느 쪽을 그릴지는 브라우저에
          저장된 결과가 있느냐에 달렸으므로 MyEligibility가 둘 다 맡는다. */}
      <MyEligibility percent={s.medianPercent} />
    </div>
  );
}

export default async function ServiceDetail({
  params,
}: PageProps<"/service/[id]">) {
  const { id } = await params;
  const s = byId.get(id);
  if (!s) notFound();

  const tags = [
    ...s.targets.map((t) => targetBySlug(t)),
    ...s.lifeStages.map((t) => lifeStageBySlug(t)),
  ].filter(Boolean);

  /*
    관련 서비스를 "대상이 겹치면 조회수 순"으로만 뽑으면, 600개 페이지가 전부
    같은 상위 5건(청년내일저축계좌·청년월세…)을 가리킨다. 내부 링크가 한곳으로
    몰려 나머지 페이지로 가는 길이 생기지 않는다.
    같은 지역을 가장 무겁게 치고, 그다음 대상·생애주기가 겹치는 정도로 매긴다.
  */
  const related = services
    .filter((o) => o.id !== s.id)
    .map((o) => {
      const sameRegion = o.sidoName && o.sidoName === s.sidoName ? 3 : 0;
      const sharedTargets = o.targets.filter((t) =>
        s.targets.includes(t),
      ).length;
      const sharedStages = o.lifeStages.filter((t) =>
        s.lifeStages.includes(t),
      ).length;
      return { o, score: sameRegion + sharedTargets + sharedStages };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.o.views - a.o.views)
    .slice(0, 5)
    .map((x) => x.o);

  /* 검색 결과에 "홈 › 복지 서비스 › 사업명" 경로가 표시되게 한다. */
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "복지 서비스",
        item: `${SITE.url}/service`,
      },
      { "@type": "ListItem", position: 3, name: s.name ?? id },
    ],
  };

  return (
    <article className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }}
      />
      {/* 본 것을 브라우저에 적어 둔다(화면에는 아무것도 안 그린다).
          첫 화면의 "최근 본 지원"이 이걸 읽는다. */}
      <TrackView id={s.id} name={s.name ?? id} place={placeLabel(s)} />
      <nav aria-label="위치" className="text-xs text-muted">
        <Link href="/" className="hover:text-brand">
          홈
        </Link>
        {" › "}
        <Link href="/service" className="hover:text-brand">
          복지 서비스
        </Link>
        {" › "}
        <span className="text-slate-600">{s.name}</span>
      </nav>

      <header>
        {/* 제목 위에 지급형태 배지를 달았었다. 바로 아래 「핵심 세 칸」이
            같은 값을 더 크게, 뜻까지 붙여 말하므로 뺐다. 배지는 목록에서
            여러 건을 훑을 때 쓰는 장치다(KeyFacts 주석 참고). */}
        <h1 className="text-2xl leading-snug font-extrabold sm:text-3xl">
          {s.name}
        </h1>

        <p className="mt-2 text-sm text-muted">
          {[placeLabel(s), s.department].filter(Boolean).join(" · ")}
          {s.views > 0 && (
            <>
              {" · "}
              <span className="text-slate-400">
                복지로 조회 {views(s.views)}
              </span>
            </>
          )}
        </p>

        {/* 원문보다 먼저 온다. 원문은 행정 문장이라 읽어야 알 수 있는데,
            "현금인가 바우처인가 · 한 번인가 매달인가"는 읽기 전에 알아야
            나머지를 읽을지 말지 정할 수 있다. */}
        <KeyFacts s={s} />

        {(s.summary ?? s.outline) && (
          <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
            {s.summary ?? s.outline}
          </p>
        )}
      </header>

      {/* 목차는 "한눈에 보기" 앞이다. 표를 먼저 두면 목차가 첫 화면 밖으로
          밀려서, 정작 스크롤을 아끼려고 만든 것이 스크롤해야 보인다. */}
      <PageToc s={s} />

      {/* 한눈에 보기 — 본문을 읽기 전에 형태부터 파악되게. */}
      <section>
        <h2 className="mb-2 flex items-center gap-2 font-bold text-ink">
          <span aria-hidden className="h-4 w-1 shrink-0 rounded-full bg-brand" />
          한눈에 보기
        </h2>
        <dl className="rounded-xl border border-line px-4 py-1">
          {/* 지원 형태·지원 주기 줄은 여기 있었다. 제목 밑 「핵심 세 칸」으로
              옮겼다 — 같은 값을 한 화면에 두 번 적을 이유가 없다. */}
          <Row label="신청 방법" value={s.applyMethods.join(" · ")} />
          <Row
            label="대상"
            value={tags.map((t) => t!.label).join(" · ")}
          />
          <Row label="담당" value={s.department} />
          <Row label="기준연도" value={s.baseYear && `${s.baseYear}년`} />
          {/* 원본은 "사업 시행 기간"이지 접수 기간이 아니다. 종료일이
              없는 사업에는 9999-12-31이 들어와 그대로 화면에 나갔었다. */}
          <Row label="시행" value={periodLabel(s.applyStart, s.applyEnd)} />
        </dl>
      </section>

      <IncomeBanner s={s} />

      {/* 상세 본문을 아직 못 받은 항목. 없는 걸 없다고 쓰고 원문으로 보낸다 —
          그럴듯한 문장으로 빈자리를 메우면 그게 곧 저품질 페이지가 된다. */}
      {!s.eligibility && !s.supportContent && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
          이 사업의 <strong>지원 대상·선정 기준·지원 내용</strong> 상세는 아직
          수집 중입니다. 지금은 아래 복지로 공식 안내에서 확인해 주세요.
        </p>
      )}

      {s.eligibility && (
        <Section id="target" title="지원 대상">
          <Prose text={s.eligibility} />
        </Section>
      )}

      {s.selectionCriteria && (
        <Section id="criteria" title="선정 기준">
          <Prose text={s.selectionCriteria} />
        </Section>
      )}

      {s.supportContent && (
        <Section id="benefit" title="지원 내용">
          <Prose text={s.supportContent} />
        </Section>
      )}

      {(s.applyMethod || s.applySteps.length > 0) && (
        <Section id="apply" title="신청 방법">
          {s.applyMethod && <Prose text={s.applyMethod} />}
          {s.applySteps.length > 0 && (
            <ol className="mt-3 space-y-2">
              {s.applySteps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                    {i + 1}
                  </span>
                  <span className="min-w-0">{step}</span>
                </li>
              ))}
            </ol>
          )}
        </Section>
      )}

      {(s.contacts.length > 0 || s.homepages.length > 0) && (
        <Section id="contact" title="문의처">
          <ul className="space-y-1.5 text-sm">
            {s.contacts.map((c, i) => {
              /* 문의처 칸에 "평일 09~18시" 같은 안내문이 들어오는 경우가 있다.
                 그런 값을 전화 링크로 만들면 눌러도 아무 일이 없는 죽은 링크가
                 되므로, 번호로 읽히는 것만 링크로 건다. */
              const tel = telHref(c.url);
              return (
                <li key={`c${i}`} className="text-slate-700">
                  {c.name && <span className="text-muted">{c.name} </span>}
                  {tel ? (
                    <a href={tel} className="font-medium text-brand">
                      {c.url}
                    </a>
                  ) : (
                    <span className="font-medium">{c.url}</span>
                  )}
                </li>
              );
            })}
            {s.homepages.map((h, i) => {
              const url = safeUrl(h.url);
              if (!url) return null;
              return (
                <li key={`h${i}`} className="text-slate-700">
                  {h.name && <span className="text-muted">{h.name} </span>}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand break-all underline"
                  >
                    {h.url}
                  </a>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {s.forms.length > 0 && (
        <Section id="forms" title="서식·안내 자료">
          <ul className="space-y-1.5 text-sm">
            {s.forms.map((f, i) => {
              const url = safeUrl(f.url);
              if (!url) return null;
              return (
                <li key={i}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand underline"
                  >
                    {f.name || "첨부파일"}
                  </a>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {s.lawBasis.length > 0 && (
        <Section id="law" title="근거 법령">
          <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
            {s.lawBasis.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </Section>
      )}

      {/*
        안내 글로 가는 길. 상세 페이지는 사람이 "이걸 신청해야겠다"고 마음먹는
        지점이라, 신청 방법·서류 안내가 필요해지는 순간이 정확히 여기다.
        (덤으로, 글이 색인되려면 안쪽에서 걸리는 링크가 있어야 한다. 푸터
        링크 하나로는 부족하다.)
      */}
      <aside className="rounded-xl border border-line bg-white px-4 py-3.5 text-sm leading-relaxed">
        <p className="font-bold text-ink">복지 신청이 처음이라면</p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-slate-600">
          <li>
            <Link href="/guide/apply" className="hover:text-brand hover:underline">
              신청 방법 총정리 →
            </Link>
          </li>
          <li>
            <Link
              href="/guide/documents"
              className="hover:text-brand hover:underline"
            >
              필요 서류 안내 →
            </Link>
          </li>
          <li>
            <Link href="/guide/terms" className="hover:text-brand hover:underline">
              용어 풀이 →
            </Link>
          </li>
        </ul>
      </aside>

      <footer
        id="official"
        className="scroll-mt-28 space-y-3 rounded-xl border border-line bg-slate-50 p-4 text-xs leading-relaxed text-slate-600"
      >
        {/* 날짜를 두 개 쓴다. "우리가 받아둔 날"과 "기관이 고친 날"은 다른
            값이라 한 칸에 넣으면 안 된다. 원본 최종수정일은 330건이 비어
            있는데, 그때 날짜가 통째로 사라지면 읽는 사람은 이게 오늘 받은
            건지 반년 된 건지 알 수 없다. 수집일은 항상 적는다(3절). */}
        <p>
          이 내용은 공공데이터포털 &lsquo;복지서비스&rsquo; 데이터를{" "}
          <strong>{SERVICES_UPDATED}에 받아</strong> 정리한 것입니다.
          {s.updatedAt && ` 원본 최종수정일은 ${s.updatedAt}입니다.`} 신청
          자격·금액·기간은 그 뒤로 바뀌었을 수 있으니{" "}
          <strong>반드시 아래 공식 안내로 최종 확인</strong>하세요.
        </p>
        {/*
          이 페이지에서 마지막에 해야 할 일이다. 그런데 여태 각주와 같은
          크기·같은 회색으로 놓여 있어서, 읽고 나서 어디로 가야 하는지가
          보이지 않았다. 화면에서 유일한 채운 단추로 만든다 — 목차의
          「공식 안내 ↓」가 데려오는 자리도 여기다.

          모바일에서는 폭을 꽉 채운다. 375px에서 글자 크기 그대로 두면
          엄지로 누르기에 작다.
        */}
        {safeUrl(s.officialUrl) && (
          <a
            href={safeUrl(s.officialUrl)!}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg bg-brand px-4 py-3 text-center text-sm font-bold text-white transition hover:brightness-110 sm:inline-block sm:px-5"
          >
            복지로에서 공식 안내 보기 ↗
          </a>
        )}
      </footer>

      {related.length > 0 && (
        <section>
          <h2 className="mb-2 font-bold text-ink">비슷한 대상의 다른 지원</h2>
          <ul className="space-y-1.5">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/service/${r.id}`}
                  className="text-sm text-slate-700 hover:text-brand hover:underline"
                >
                  {r.name}
                  <span className="ml-1.5 text-xs text-muted">
                    {placeLabel(r)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
