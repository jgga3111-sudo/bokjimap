import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services, SERVICES_UPDATED } from "@/data/services";
import { LAST_CHECKED } from "@/lib/sourceTotals";

const G = guideBySlug("online-share")!;

/*
  왜 이 글인가 (2026-09-16).

  09-16 경쟁 조사에서 해피나눔이 매거진 99편을 **자기 데이터를 센 글**로 채워 둔 것을 봤다
  (「마감일은 상시가 60%」·「온라인 신청 비율」 같은 것). 우리 안내 글 27편은 전부 제도
  해설이고 집계 글이 0편이었다. 집계 글은 복지로 원문을 한 글자도 안 쓰므로 애드센스가
  지적한 「원문 반복」에서 가장 멀고, 우리는 910건 필드를 이미 들고 있어 오늘 쓸 수 있다.

  ── 숫자는 전부 렌더 시점 집계다 ────────────────────────────────
  손으로 적은 수는 한 개도 없다. 수록이 바뀌면 이 글의 문장도 같이 바뀐다
  (guides.ts 머리말 — 숫자를 손으로 적으면 조용히 틀려진다).

  ── 하지 않는 것 ───────────────────────────────────────────────
  "온라인으로 못 한다"고 단정하지 않는다. 우리가 아는 것은 **복지로가 그 칸에 무엇을
  적어 두었나**뿐이다(09-11에 「온라인 신청 안 됨」을 「복지로 온라인 신청 — 연동 없음」으로
  고친 것과 같은 자리). 지자체 570여 건에는 그 칸 자체가 없다(CLAUDE.md 5절).
*/

const CENTRAL = services.filter((s) => s.provider === "central");
const LOCAL = services.filter((s) => s.provider !== "central");
const ONLINE = CENTRAL.filter((s) => s.onlineApply === true);

/** 지자체 원문의 접수 방식 값을 센다. 값은 원본이 매긴 것 그대로다. */
const METHOD_COUNT = (() => {
  const m = new Map<string, number>();
  for (const s of LOCAL) for (const v of s.applyMethods) m.set(v, (m.get(v) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
})();

const ONLINE_METHODS = new Set(["인터넷", "모바일앱", "모바일", "E-mail"]);
const LOCAL_ONLINE = LOCAL.filter((s) =>
  s.applyMethods.some((v) => ONLINE_METHODS.has(v)),
);

/* 제목·설명의 숫자도 집계값이다(09-16 리뷰 — 처음엔 910·54를 손으로 적었다). */
export const metadata: Metadata = {
  title: `인터넷으로 신청되는 지원금은 얼마나 되나 — 수록 ${services.length}건을 세어 봤습니다`,
  description: `복지로에서 온라인 신청이 되는 사업은 우리가 실은 ${services.length}건 중 ${ONLINE.length}건뿐입니다. 지자체 사업은 복지로가 아니라 각자의 누리집에서 받습니다. 「온라인 신청 안 됨」이 무슨 뜻인지, 어디로 가야 하는지를 수록분을 직접 세어 정리했습니다.`,
  alternates: { canonical: "/guide/online-share" },
};

export default function OnlineShareGuide() {
  const total = services.length;
  return (
    <>
      <DocPage
        title={G.title}
        lead={`「온라인 신청 가능」이라는 표시는 복지로에서 바로 신청되는 사업에만 붙습니다. 그런 사업은 우리가 실은 ${total}건 가운데 ${ONLINE.length}건입니다. 그렇다고 나머지를 전부 주민센터에 가야 하는 것은 아닙니다 — 지자체 사업은 각자의 누리집에서 받습니다.`}
        updated={`최종 수정 ${G.updated} · 수록 ${total}건을 ${SERVICES_UPDATED}에 받아 ${LAST_CHECKED}에 다시 대조한 값을 셌습니다`}
      >
        <DocSection title="세어 보면 이렇습니다">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">갈래</th>
                  <th className="px-3 py-2 text-right font-semibold">건수</th>
                  <th className="px-3 py-2 font-semibold">무슨 뜻인가</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">복지로에서 바로 신청</td>
                  <td className="px-3 py-2 text-right tabular-nums">{ONLINE.length}건</td>
                  <td className="px-3 py-2">
                    중앙부처 {CENTRAL.length}건 가운데 원문의 온라인 신청 칸이 「가능」인 것
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">복지로 연동은 없음</td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {CENTRAL.length - ONLINE.length}건
                  </td>
                  <td className="px-3 py-2">
                    복지로에서 안 된다는 뜻이지, 인터넷으로 못 한다는 뜻이 아닙니다
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">그 칸이 아예 없음</td>
                  <td className="px-3 py-2 text-right tabular-nums">{LOCAL.length}건</td>
                  <td className="px-3 py-2">
                    지자체 사업. 대신 「접수 방식」 칸이 따로 옵니다(아래)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            수록 {total}건을 센 값입니다. 전국의 모든 사업이 아니라 복지클릭이 실은 범위입니다.
          </p>
        </DocSection>

        <DocSection title="지자체 사업은 접수 방식이 따로 적혀 있습니다">
          <p>
            지자체 {LOCAL.length}건에는 복지로 연동 칸이 없는 대신, 원문이 접수 방식을
            여러 개 적어 둡니다. 한 사업에 둘 이상 붙기도 합니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[360px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">원문의 접수 방식</th>
                  <th className="px-3 py-2 text-right font-semibold">건수</th>
                </tr>
              </thead>
              <tbody>
                {METHOD_COUNT.map(([name, n]) => (
                  <tr key={name} className="border-b border-line">
                    <td className="px-3 py-2">{name}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{n}건</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            인터넷·모바일·전자우편 가운데 하나라도 적힌 사업이{" "}
            <strong>{LOCAL_ONLINE.length}건</strong>입니다. 복지로에서는 안 되지만 그
            지자체 누리집에서는 되는 사업이 이만큼 있다는 뜻입니다.
          </p>
          <DocNote>
            접수 방식은 <strong>원본이 매긴 값</strong>입니다. 우리가 고치지 않습니다.
            같은 사업이라도 해마다 창구가 바뀌므로, 신청 전에 상세의 문의처로 한 번 더
            확인하는 쪽이 안전합니다.
          </DocNote>
        </DocSection>

        <DocSection title="복지로에서 바로 되는 사업">
          <p>
            아래는 원문의 온라인 신청 칸이 「가능」인 {ONLINE.length}건 가운데 복지로
            조회수가 높은 순으로 열 건입니다.
          </p>
          <ul className="space-y-1 text-sm">
            {ONLINE.slice(0, 10).map((s) => (
              <li key={s.id}>
                <Link
                  href={`/service/${s.id}`}
                  className="text-brand underline hover:no-underline"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm">
            창구가 어떻게 다른지는{" "}
            <Link href="/guide/apply" className="text-brand underline">
              어디서 어떻게 신청하나
            </Link>
            에, 온라인으로 되는 사업만 모은 목록은{" "}
            <Link href="/guide/online" className="text-brand underline">
              집에서 온라인으로 신청할 수 있는 지원
            </Link>
            에 있습니다.
          </p>
        </DocSection>

        <DocSection title="이 숫자를 어떻게 읽어야 하나">
          <p>
            &ldquo;온라인 신청 {ONLINE.length}건&rdquo;은 <strong>복지로 한 곳</strong>의
            이야기입니다. 정부의 신청 창구는 복지로 말고도 정부24·고용24·국세청 홈택스·
            한국장학재단처럼 여러 곳으로 나뉘어 있고, 지자체는 또 각자의 누리집을 씁니다.
            그래서 &ldquo;복지로에서 안 된다&rdquo;를 &ldquo;인터넷으로 못 한다&rdquo;로
            읽으면 헛걸음을 하게 됩니다.
          </p>
          <p>
            저희가 상세 화면에 &ldquo;복지로 온라인 신청 — 연동 없음&rdquo;이라고만 적고
            그 이상 단정하지 않는 이유가 이것입니다.
          </p>
        </DocSection>
      </DocPage>
      <GuideNav current="online-share" />
    </>
  );
}
