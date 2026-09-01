import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/Badge";
import { services } from "@/data/services";
import { isIndexable, type WelfareService } from "@/types/welfare";
import { payType, cycleLabel, placeLabel, views, won, visiblePayTypes, periodLabel, payTypeHelp, cycleHelp } from "@/lib/display";
import { targetBySlug, lifeStageBySlug } from "@/lib/axes";
import { thresholdOf, BASE_YEAR } from "@/lib/midIncome";
import { SITE } from "@/lib/site";
import { jsonLd, safeUrl, telHref } from "@/lib/safe";
import TrackView from "@/components/TrackView";
import MyEligibility from "@/components/MyEligibility";

const byId = new Map(services.map((s) => [s.id, s]));

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
  return {
    title: `${s.name} — 지원대상·지원내용·신청방법`,
    description:
      s.summary ??
      s.outline ??
      `${where} ${s.name}의 지원 대상과 신청 방법을 정리했습니다.`,
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
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
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
 * "쉽게 말하면" — 지급 형태와 주기를 사람 말로 풀어 준다.
 *
 * 원본 지원내용은 행정 문서 문장 그대로다. 예를 들어 주거급여의 지원내용은
 * "기준임대료를 상한으로 실제 임차료(월 임차료+보증금 환산액)을 지원합니다"로
 * 시작한다. 정확하지만, 이걸 읽고 "그래서 돈이 나온다는 건가 요금이 깎인다는
 * 건가"를 아는 사람은 많지 않다.
 *
 * 그렇다고 우리가 사업 내용을 요약해 다시 쓰면 틀릴 위험이 크다. 그래서
 * **구조화된 값(지급형태·주기)만 가지고** 확실한 것만 적는다. 사업마다 다른
 * 내용은 아래 원문 그대로 두고, 여기서는 "어떤 형태로 받는가"만 말한다.
 *
 * 가장 중요한 건 융자다 — 배지에 "융자"라고만 적혀 있으면 받는 돈으로
 * 오해하기 쉬운데, 수록분에 30건이 있다.
 */
function PlainWords({ s }: { s: WelfareService }) {
  const notes = [
    ...visiblePayTypes(s.payTypes).map(payTypeHelp),
    cycleHelp(s.cycle),
  ].filter((v): v is string => Boolean(v));

  if (notes.length === 0) return null;

  return (
    <section className="rounded-xl border border-line bg-slate-50/70 px-4 py-3.5">
      <h2 className="text-sm font-bold text-ink">쉽게 말하면</h2>
      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-700">
        {notes.map((n) => (
          <li key={n} className="flex gap-2">
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400"
            />
            <span className="min-w-0">{n}</span>
          </li>
        ))}
      </ul>
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
        {/* 배지는 카드와 같은 규칙 — 지급 형태와 온라인신청까지만.
            주기는 바로 아래 "한눈에 보기" 표에 있으므로 여기서 뺀다. */}
        <div className="flex flex-wrap items-center gap-1.5">
          {visiblePayTypes(s.payTypes).map((p) => (
            <Badge key={p} tone={payType(p).tone}>
              {payType(p).label}
            </Badge>
          ))}
          {s.onlineApply && <Badge>온라인신청 가능</Badge>}
        </div>

        <h1 className="mt-3 text-2xl leading-snug font-extrabold sm:text-3xl">
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

        {(s.summary ?? s.outline) && (
          <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
            {s.summary ?? s.outline}
          </p>
        )}
      </header>

      {/* 한눈에 보기 — 본문을 읽기 전에 형태부터 파악되게. */}
      <section>
        <h2 className="mb-2 flex items-center gap-2 font-bold text-ink">
          <span aria-hidden className="h-4 w-1 shrink-0 rounded-full bg-brand" />
          한눈에 보기
        </h2>
        <dl className="rounded-xl border border-line px-4 py-1">
          <Row
            label="지원 형태"
            value={visiblePayTypes(s.payTypes).map((p) => payType(p).label).join(" · ")}
          />
          <Row label="지원 주기" value={cycleLabel(s.cycle)} />
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

      <PlainWords s={s} />

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

      <footer className="space-y-3 rounded-xl border border-line bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
        <p>
          이 내용은 공공데이터포털 &lsquo;복지서비스&rsquo; 데이터를 정리한
          것입니다.
          {s.updatedAt && ` 원본 최종수정일 ${s.updatedAt}.`} 신청 자격·금액·기간은
          변경될 수 있으니 <strong>반드시 아래 공식 안내로 최종 확인</strong>하세요.
        </p>
        {safeUrl(s.officialUrl) && (
          <a
            href={safeUrl(s.officialUrl)!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border border-line bg-white px-4 py-2 font-medium text-brand"
          >
            복지로에서 공식 안내 보기 →
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
