import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";
import { SIDO_LIST } from "@/lib/regions";

const G = guideBySlug("region")!;

export const metadata: Metadata = {
  title: `${G.title} — 전국 공통 사업과 지역 사업 구분하기`,
  description:
    "복지 사업은 전국 어디서나 되는 것과 사는 지역에서만 되는 것으로 나뉩니다. 둘을 가르는 법, 시·도와 시·군·구의 차이, 이사할 때 생기는 일을 정리했습니다.",
  alternates: { canonical: "/guide/region" },
};

const central = services.filter((s) => s.provider === "central");
const local = services.filter((s) => s.provider === "local");
const sigunguLevel = local.filter((s) => s.sigunguName);
const sidoLevel = local.length - sigunguLevel.length;
const sigunguKinds = new Set(
  sigunguLevel.map((s) => `${s.sidoName} ${s.sigunguName}`),
).size;

/** 시·도별 수록 건수. 우리 데이터에 실제로 잡힌 것만 센다. */
const bySido = SIDO_LIST.map((sd) => ({
  ...sd,
  count: local.filter((s) => s.sidoName === sd.fullName).length,
})).sort((a, b) => b.count - a.count);

const maxCount = Math.max(...bySido.map((b) => b.count));

export default function RegionGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="“옆 동네 친구는 받았다는데 나는 왜 없나”의 답은 대부분 여기 있습니다. 복지 사업에는 두 종류가 섞여 있습니다."
        updated={`최종 수정 ${G.updated} · 수록 ${services.length.toLocaleString()}건 집계 기준`}
      >
        <DocSection title="전국 것과 내 지역 것">
          <p>
            수록한 사업은 크게 두 갈래입니다. 이 구분을 모르면 신청할 수 없는
            사업을 붙들고 시간을 씁니다.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-line bg-white p-4">
              <p className="flex items-baseline gap-2">
                <span className="font-bold text-ink">중앙부처 사업</span>
                <span className="text-xs text-muted">
                  {central.length}건
                </span>
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                보건복지부·국토교통부 등이 운영합니다.{" "}
                <strong>전국 어디에 살든</strong> 조건만 맞으면 신청할 수
                있습니다. 기초연금·아동수당·청년월세처럼 이름이 널리 알려진
                것들이 대부분 여기입니다.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-white p-4">
              <p className="flex items-baseline gap-2">
                <span className="font-bold text-ink">지자체 사업</span>
                <span className="text-xs text-muted">{local.length}건</span>
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                시·도나 시·군·구가 자체 예산으로 운영합니다.{" "}
                <strong>그 지역에 주소를 둔 사람만</strong> 신청할 수 있습니다.
                출산장려금·청년수당처럼 이름은 비슷한데 금액이 제각각인 것들이
                여기입니다.
              </p>
            </div>
          </div>
          <p>
            이 사이트는 카드와 상세 페이지에{" "}
            <strong>전국인지 특정 지역인지</strong>를 항상 표시합니다.
            &ldquo;전국&rdquo;이라고 적혀 있으면 중앙부처 사업입니다.
          </p>
        </DocSection>

        <DocSection title="지자체 사업은 다시 두 층입니다">
          <p>
            같은 지자체 사업이라도 광역(시·도)이 하는 것과 기초(시·군·구)가
            하는 것이 다릅니다. 수록 {local.length}건을 나눠 보면{" "}
            <strong>시·군·구 단위 {sigunguLevel.length}건</strong>,{" "}
            <strong>시·도 단위 {sidoLevel}건</strong>입니다. 시·군·구는{" "}
            {sigunguKinds}곳이 등장합니다.
          </p>
          <p>
            여기서 흔한 오해가 생깁니다.{" "}
            <strong>
              내가 받을 수 있는 것은 시·도 사업과 내 시·군·구 사업을 합친
              것입니다.
            </strong>{" "}
            경기도에 산다면 경기도 사업과 내가 사는 시의 사업 양쪽을 봐야
            합니다. 도청 사업만 보고 시청 사업을 안 보는 경우가 많습니다.
          </p>
          <p>
            드물게 둘이 겹치기도 합니다. 같은 목적의 지원을 도와 시가 각각
            운영하면 중복 수급이 막히거나 한쪽만 선택해야 합니다. 이런 조건은
            공고문의 선정기준에 적혀 있으므로 신청 전에 확인하세요.
          </p>
        </DocSection>

        <DocSection title="우리 데이터의 지역 분포">
          <p>
            수록한 지자체 사업 {local.length}건이 시·도별로 어떻게 나뉘는지
            그대로 세어 본 것입니다.
          </p>
          {/* 격자로 짠다. flex + width:% 조합은 라벨 폭만큼 넘친다
              (guide/income-line 주석 참고). */}
          <div className="space-y-1">
            {bySido
              .filter((b) => b.count > 0)
              .map((b) => (
                <div
                  key={b.slug}
                  className="grid grid-cols-[3.5rem_1fr_3rem] items-center gap-2 text-sm"
                >
                  <Link
                    href={`/region/${b.slug}`}
                    className="text-right text-slate-600 hover:text-brand hover:underline"
                  >
                    {b.name}
                  </Link>
                  <span
                    className="h-4 rounded-sm bg-brand/70"
                    style={{
                      width: `${Math.max(2, (b.count / maxCount) * 100)}%`,
                    }}
                    aria-hidden
                  />
                  <span className="text-xs text-muted tabular-nums">
                    {b.count}건
                  </span>
                </div>
              ))}
          </div>
          <DocNote>
            <strong>이 표를 &ldquo;복지가 많은 지역&rdquo;으로 읽지 마세요.</strong>{" "}
            우리는 전체 5,219건 중 복지로에서 많이 조회된 순으로{" "}
            {services.length.toLocaleString()}건을 수록했습니다. 인구가 많은
            지역의 사업이 더 많이 조회되므로 인구 규모가 그대로 반영됩니다.
            지역별 복지 수준을 비교할 수 있는 자료가 아닙니다.
          </DocNote>
        </DocSection>

        <DocSection title="이사하면 어떻게 되나">
          <p>
            지자체 사업의 기준은 대부분 <strong>주민등록상 주소지</strong>입니다.
            이사하면 받던 지원이 끊기고, 새 주소지의 사업을 새로 신청해야 하는
            경우가 많습니다. 자동으로 이어지지 않습니다.
          </p>
          <ul className="space-y-2">
            <li>
              <strong>거주 기간 요건을 확인하세요.</strong> &ldquo;신청일 기준
              6개월 이상 계속 거주&rdquo; 같은 조건이 붙는 사업이 있습니다.
              전입 직후에는 해당되지 않습니다.
            </li>
            <li>
              <strong>받던 지원의 중단 신고가 필요할 수 있습니다.</strong>{" "}
              모르고 계속 받으면 나중에 환수됩니다.
            </li>
            <li>
              <strong>중앙부처 사업은 대체로 이어집니다.</strong> 전국 공통이라
              주소가 바뀌어도 자격이 유지되지만, 주소 변경 신고는 해야 합니다.
            </li>
          </ul>
          <p>
            전입 신고를 하러 주민센터에 갈 때{" "}
            <strong>&ldquo;여기서 새로 신청할 수 있는 복지가 있는지&rdquo;</strong>{" "}
            한 번 물어보세요. 창구가 같습니다.
          </p>
        </DocSection>

        <DocSection title="내 지역부터 보기">
          <p>
            시·도를 고르면 그 지역의 사업이 조회수 순으로 나옵니다. 중앙부처
            사업은 어느 지역에서든 신청할 수 있으니 함께 보세요.
          </p>
          <ul className="flex flex-wrap gap-1.5 pt-1">
            {SIDO_LIST.map((sd) => (
              <li key={sd.slug}>
                <Link
                  href={`/region/${sd.slug}`}
                  className="inline-block rounded-full border border-line px-3 py-1.5 text-sm text-slate-600 transition hover:border-brand hover:text-brand"
                >
                  {sd.name}
                </Link>
              </li>
            ))}
          </ul>
        </DocSection>
      </DocPage>

      <div className="mx-auto max-w-3xl">
        <GuideNav current="region" />
      </div>
    </>
  );
}
