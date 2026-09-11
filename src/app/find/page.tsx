import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { targetBySlug, lifeStageBySlug } from "@/lib/axes";
import { sidoBySlug } from "@/lib/regions";
import ServiceList from "@/components/ServiceList";
import AxisFinder from "@/components/AxisFinder";
import { RememberFind } from "@/components/LastFind";

export const metadata: Metadata = {
  title: "조건으로 복지·지원금 찾기",
  /*
    **색인시키지 않는다** — `/search`와 같은 이유다(그 파일 머리말 참고).
    축 조합마다 URL이 하나씩 생기므로 그대로 두면 내용이 거의 같은 페이지가
    수백 개 만들어진다. 지금 서치콘솔에 "발견됨 – 색인 안 됨"이 528건
    쌓여 있는데 거기에 스스로 더 얹는 짓이다(6절).

    follow는 남긴다 — 결과에서 상세로 가는 링크는 따라가도 된다.
    색인시킬 축 페이지는 이미 따로 있다(`/life/*`·`/target/*`·`/region/*`).
  */
  robots: { index: false, follow: true },
  /* 루트의 `canonical: "/"`가 물려 오지 않게(`/search` 머리말 참고). */
  alternates: { canonical: "/find" },
};

/** 한 값만 받는다. 같은 이름이 여러 번 오면 첫 것만 쓴다. */
const one = (v: string | string[] | undefined) =>
  (Array.isArray(v) ? v[0] : (v ?? "")).trim();

/**
 * 조건을 겹쳐서 좁힌 결과 — **서버에서 거른다.**
 *
 * `noindex`라 정적 생성으로 얻는 것이 없다. 서버에서 900건을 그대로 거르고
 * **클라이언트 번들은 한 바이트도 안 늘린다**(`/search`가 택한 것과 같은 길).
 * 고르는 상자(`AxisFinder`)만 클라이언트로 남고, 그 상자는 축 목록만 안다.
 */
export default async function FindPage({ searchParams }: PageProps<"/find">) {
  const sp = await searchParams;
  const lifeSlug = one(sp.life);
  const targetSlug = one(sp.target);
  const regionSlug = one(sp.region);

  /* 슬러그가 이상하면 **그 축을 무시한다.** 404를 내지 않는 이유 — 주소를
     손으로 고쳐 온 사람에게 빈 화면을 주느니, 나머지 조건으로 좁혀 보여주고
     무엇이 적용됐는지 위에 적는 쪽이 낫다. */
  const life = lifeSlug ? lifeStageBySlug(lifeSlug) : undefined;
  const target = targetSlug ? targetBySlug(targetSlug) : undefined;
  const sido = regionSlug ? sidoBySlug(regionSlug) : undefined;

  const hits = services.filter((s) => {
    if (life && !s.lifeStages.includes(life.slug)) return false;
    if (target && !s.targets.includes(target.slug)) return false;
    /* 지역을 고르면 그 지역 지자체 사업 + 전국 공통(중앙부처)을 함께 본다.
       `/region/[sido]`가 두 절로 나눠 보여주는 것과 같은 범위다. */
    if (sido && !(s.sidoName === sido.fullName || s.provider === "central"))
      return false;
    return true;
  });

  const picked = [life?.label, target?.label, sido?.name].filter(Boolean);

  /* 자르되 **잘랐다고 적는다**(`/search`와 같은 규칙). */
  const MAX = 120;
  const shown = hits.slice(0, MAX);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* 첫 화면 「지난번 조건」용으로 **걸러 낸** 조건과 건수만 브라우저에
          적는다(2026-09-11, lib/lastFind.ts). 화면에는 아무것도 없다.
          조건이 없는 맨 화면은 기억할 게 없으니 그리지 않는다. */}
      {picked.length > 0 && (
        <RememberFind
          life={life?.slug ?? ""}
          target={target?.slug ?? ""}
          region={sido?.slug ?? ""}
          count={hits.length}
        />
      )}
      <header>
        <h1 className="text-xl font-bold sm:text-2xl">
          {picked.length > 0 ? (
            <>
              <span className="text-brand">{picked.join(" · ")}</span> 조건으로
              찾기
            </>
          ) : (
            "조건으로 복지·지원금 찾기"
          )}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {hits.length.toLocaleString()}건
          {hits.length > MAX && ` · 위에서 ${MAX}건만 보여드립니다`}
        </p>
      </header>

      <section className="rounded-2xl border border-line bg-white p-5">
        <h2 className="text-sm font-bold text-ink">조건 바꾸기</h2>
        {/* 걸러 낸 값(`life?.slug`)을 넘긴다 — 주소에 적힌 날것이 아니라.
            엉뚱한 슬러그가 들어왔을 때 그걸 다시 칩으로 되살리지 않으려는
            것이다. 화면에 적용된 것과 상자에 켜진 것이 늘 같아야 한다. */}
        <div className="mt-3">
          {/* key가 있어야 위 규칙이 **뒤로 가기에도** 지켜진다(2026-09-11).
              상자는 처음 받은 값으로만 상태를 잡는데, 사이트 안에서 이동하면
              같은 상자가 그대로 쓰여 옛 선택이 남았다 — 청년·저소득(67건)에서
              뒤로 가면 결과는 청년 305건인데 「저소득」이 켜진 채였다.
              적용된 조건을 key로 주면 조건이 바뀔 때마다 새로 그린다. */}
          <AxisFinder
            key={`${life?.slug ?? ""}|${target?.slug ?? ""}|${sido?.slug ?? ""}`}
            initialLife={life?.slug ?? ""}
            initialTarget={target?.slug ?? ""}
            initialRegion={sido?.slug ?? ""}
          />
        </div>
      </section>

      {hits.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white p-6">
          <p className="font-bold text-ink">고른 조건에 맞는 사업이 없습니다.</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            조건을 하나 줄여 보세요. 저희가 수록한 것은 복지로 조회수 상위{" "}
            {services.length.toLocaleString()}건이라, 실제로는 있는데 여기
            없을 수 있습니다.{" "}
            <Link href="/source" className="underline hover:text-brand">
              무엇을 수록했는지 보기 →
            </Link>
          </p>
        </div>
      ) : (
        <ServiceList services={shown} />
      )}

      {/* 색인되는 축 페이지로 내보낸다. 이 화면 자체는 noindex라, 좋은 결과를
          만났을 때 남길 만한 주소를 함께 준다. */}
      {picked.length > 0 && (
        <nav className="rounded-xl border border-line bg-sunken/70 px-4 py-3 text-sm">
          <span className="text-muted">축 하나로만 보기 — </span>
          <span className="inline-flex flex-wrap gap-x-3 gap-y-1">
            {life && (
              <Link href={`/life/${life.slug}`} className="underline hover:text-brand">
                {life.label}
              </Link>
            )}
            {target && (
              <Link href={`/target/${target.slug}`} className="underline hover:text-brand">
                {target.label}
              </Link>
            )}
            {sido && (
              <Link href={`/region/${sido.slug}`} className="underline hover:text-brand">
                {sido.name}
              </Link>
            )}
          </span>
        </nav>
      )}
    </div>
  );
}
