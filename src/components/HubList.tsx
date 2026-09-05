"use client";

import { useMemo, useState } from "react";
import ServiceCard from "./ServiceCard";
import { toCard, type HubRow, type FacetGroup } from "@/lib/hubRows";

/**
 * 축 페이지의 목록 — 좁히기와 더 보기가 붙어 있다.
 *
 * ── 무엇을 고쳤나 ──────────────────────────────────────────────
 * 축이 여섯인데 서로 교차가 안 됐다. `/target/low-income` 262건에서 "서울만"을
 * 고를 수 없었고, `/benefit/cash`는 481건 중 60건만 그리고 **나머지 421건으로
 * 가는 길이 아예 없었다.** 반대로 `/life/youth`는 305장을 전부 서버에서 그려
 * HTML이 828KB였다 — 자르지도, 좁히지도 못한 채 무겁기만 했다.
 *
 * ── 세 가지를 동시에 만족시켜야 한다 ────────────────────────────
 *  ① 사람이 좁힐 수 있을 것        → 필터 단추 (브라우저에서 건다)
 *  ② 크롤러가 전부 볼 수 있을 것    → 맨 아래 **전체 이름 목록**
 *  ③ 페이지가 가벼울 것            → 카드는 24장만 그린다
 *
 * ②를 빼면 안 된다. 카드를 24장만 그리면 나머지는 HTML에 링크가 없고, 축
 * 페이지가 유일한 통로인 사업은 어디서도 발견되지 않는다. 이름만 건 목록은
 * 한 건에 150바이트라 481건이라도 72KB고, 사람에게도 훑을 거리가 된다.
 *
 * 접기(`<details>`)로 두는 이유는 화면에서 밀어내기 위해서다. 접혀 있어도
 * HTML에는 있으므로 크롤러는 그대로 읽는다.
 */

/** 한 번에 그리는 카드 수. "더 보기"를 누르면 이만큼씩 늘어난다. */
const PAGE = 24;

export default function HubList({
  rows,
  groups,
}: {
  rows: readonly HubRow[];
  groups: readonly FacetGroup[];
}) {
  /* 축마다 하나씩만 고른다. 여러 개를 고르게 하면 "서울 그리고 부산"이
     되는데, 사람이 기대하는 건 대개 "서울 중에서 청년"이다. */
  const [sel, setSel] = useState<Record<string, string>>({});
  const [shown, setShown] = useState(PAGE);

  /*
    필터 상자를 접을지 말지.

    `/benefit/cash`는 고를 수 있는 게 지역 17 + 주제 15 + 생애주기 7이라
    375px 화면에서 **열 줄**이 된다. 목록보다 필터가 먼저 화면을 채우면
    무엇을 보러 온 페이지인지 흐려진다. 그래서 항목이 많으면 접어 두고,
    적은 허브(대부분이 그렇다)에서는 펴 둔다.
  */
  const total = groups.reduce((n, g) => n + g.options.length, 0);
  const [openFilter, setOpenFilter] = useState(total <= 14);

  /* 한 건이 걸리는 필터값을 미리 Set으로 풀어 둔다. 아래에서 목록 거르기와
     칸별 건수 세기가 같은 걸 반복해서 훑기 때문이다. */
  const sets = useMemo(
    () => rows.map((r) => new Set(r[13].split(","))),
    [rows],
  );

  const filtered = useMemo(() => {
    const picked = Object.entries(sel).filter(([, v]) => v);
    if (picked.length === 0) return rows;
    return rows.filter((_, i) =>
      picked.every(([k, v]) => sets[i].has(`${k}:${v}`)),
    );
  }, [rows, sets, sel]);

  /**
   * 칸마다 붙는 건수를 **고른 조건에 맞춰 다시 센다.**
   *
   * 처음엔 서버에서 한 번 센 값을 그대로 붙였다가 죽은 조합을 만들었다.
   * `/benefit/cash`에서 「서울」을 고른 뒤에도 주제 칸에 「생활지원 74」가
   * 그대로 붙어 있는데, 눌러 보면 0건이 나왔다.
   *
   * 데이터 때문이다 — **주제는 중앙부처 사업에만 붙는다**(지자체 570건 중
   * 주제가 달린 건 0건). 중앙부처 사업은 전부 전국이라 특정 시·도와는 절대
   * 겹치지 않는다. 반대로 대상·생애주기는 양쪽에 다 있어서(중앙 210건)
   * 주제와도 섞인다. 어느 조합이 살아 있는지는 축 이름만 봐서는 모른다.
   *
   * 그래서 규칙으로 막지 않고 **세어서 막는다.** 다른 칸에서 고른 것까지
   * 반영해 실제 남는 건수를 세고, 0이 되는 칸은 지운다. 자기 칸의 선택은
   * 빼고 센다 — 안 그러면 고른 칸 하나만 남고 나머지 지역이 사라진다.
   */
  const counts = useMemo(() => {
    const out: Record<string, Map<string, number>> = {};
    for (const g of groups) {
      const others = Object.entries(sel).filter(([k, v]) => v && k !== g.key);
      const m = new Map<string, number>();
      for (let i = 0; i < rows.length; i++) {
        if (!others.every(([k, v]) => sets[i].has(`${k}:${v}`))) continue;
        for (const o of g.options) {
          if (sets[i].has(`${g.key}:${o.value}`)) {
            m.set(o.value, (m.get(o.value) ?? 0) + 1);
          }
        }
      }
      out[g.key] = m;
    }
    return out;
  }, [rows, sets, groups, sel]);

  const pick = (key: string, value: string) => {
    setSel((s) => ({ ...s, [key]: s[key] === value ? "" : value }));
    /* 좁히면 처음부터 다시 본다. 안 그러면 12건짜리 결과에 "더 보기"가
       눌린 상태로 남아 왜 다 보이는지 알 수 없다. */
    setShown(PAGE);
  };

  const active = Object.values(sel).some(Boolean);
  const visible = filtered.slice(0, shown);

  return (
    <div className="space-y-4">
      {groups.length > 0 && (
        <details
          open={openFilter}
          onToggle={(e) => setOpenFilter(e.currentTarget.open)}
          className="rounded-xl border border-line bg-slate-50/70"
        >
          <summary className="cursor-pointer px-3.5 py-2.5 text-sm font-medium text-slate-700 hover:text-brand">
            조건으로 좁히기
            <span className="ml-1.5 text-xs font-normal text-muted">
              {groups.map((g) => g.label).join(" · ")}
            </span>
            {active && (
              <span className="ml-1.5 text-xs font-bold text-brand">
                {filtered.length.toLocaleString()}건
              </span>
            )}
          </summary>
          <div className="space-y-2.5 border-t border-line px-3.5 pt-3 pb-3.5">
            {groups.map((g) => {
              /* 남는 칸이 없는 축은 줄째로 뺀다. 「서울」을 고르면 주제 축은
                 고를 게 하나도 없어지는데, 라벨만 덩그러니 남으면 고장으로
                 보인다. */
              const live = g.options.some(
                (o) =>
                  (counts[g.key]?.get(o.value) ?? 0) > 0 ||
                  sel[g.key] === o.value,
              );
              if (!live) return null;
              return (
                <div
                  key={g.key}
                  className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5"
                >
                  <span className="w-14 shrink-0 text-xs font-bold text-slate-500">
                    {g.label}
                  </span>
                  {g.options.map((o) => {
                    const on = sel[g.key] === o.value;
                    const c = counts[g.key]?.get(o.value) ?? 0;
                    /* 0건이 되는 칸은 지운다. 남겨 두면 눌러도 빈 화면만
                     나오는 단추가 된다. 고른 칸은 0이어도 남긴다 —
                     다시 눌러 풀 길이 있어야 한다. */
                    if (c === 0 && !on) return null;
                    return (
                      <button
                        key={o.value}
                        type="button"
                        aria-pressed={on}
                        onClick={() => pick(g.key, o.value)}
                        className={`rounded-full border px-2.5 py-1 text-xs transition ${
                          on
                            ? "border-brand bg-brand font-medium text-white"
                            : "border-line bg-white text-slate-600 hover:border-brand hover:text-brand"
                        }`}
                      >
                        {o.label}
                        <span
                          className={
                            on ? "ml-1 text-white/70" : "ml-1 text-slate-400"
                          }
                        >
                          {c}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
            {active && (
              <div className="flex items-center gap-3 pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setSel({});
                    setShown(PAGE);
                  }}
                  className="text-xs text-muted underline hover:text-brand"
                >
                  조건 지우기
                </button>
                <span className="text-xs text-slate-500">
                  {filtered.length.toLocaleString()}건
                </span>
              </div>
            )}
          </div>
        </details>
      )}

      {filtered.length === 0 ? (
        /* 없으면 없다고 쓴다. 조건을 지우는 길만 남겨 둔다. */
        <p className="rounded-xl border border-line bg-slate-50 px-4 py-10 text-center text-sm text-muted">
          고른 조건에 해당하는 서비스가 없습니다.
        </p>
      ) : (
        <>
          <ul className="grid gap-3 sm:grid-cols-2">
            {visible.map((r) => (
              <li key={r[0]}>
                <ServiceCard service={toCard(r)} />
              </li>
            ))}
          </ul>

          {shown < filtered.length && (
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE)}
              className="w-full rounded-xl border border-line bg-white py-3 text-sm font-medium text-slate-700 transition hover:border-brand hover:text-brand"
            >
              {(filtered.length - shown).toLocaleString()}건 더 보기
            </button>
          )}
        </>
      )}

      {/* ② 전체 이름 목록. 접혀 있어도 HTML에는 있다 — 크롤러가 읽는 자리다.
          Link 대신 a를 쓴다. 수백 개를 Link로 걸면 미리 가져오기가 한꺼번에
          돌아 목록을 여는 것만으로 네트워크가 붐빈다. */}
      {filtered.length > PAGE && (
        <details className="rounded-xl border border-line bg-white">
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-slate-700 hover:text-brand">
            전체 {filtered.length.toLocaleString()}건 이름으로 훑어보기
          </summary>
          <ul className="grid gap-x-4 gap-y-1.5 border-t border-line px-4 py-3.5 text-sm sm:grid-cols-2">
            {filtered.map((r) => (
              <li key={r[0]} className="truncate">
                <a
                  href={`/service/${r[0]}`}
                  className="text-slate-600 hover:text-brand hover:underline"
                >
                  {r[1]}
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}

      {/*
        맨 위로.

        "더 보기"를 몇 번 누르면 481장이 깔린다 — 375px에서 2만 픽셀이 넘고,
        조건을 다시 고르려면 그 길을 전부 거슬러 올라가야 한다. 필터 상자는
        페이지 맨 위에 있는데 돌아갈 길이 없었다.

        떠 있는 단추(fixed) 대신 앵커를 쓴다. 목록 위에 늘 떠 있으면 카드
        하나를 계속 가리고, 자바스크립트도 붙는다. 여기까지 내려온 사람은
        어차피 바닥에 닿아 있다.
      */}
      {filtered.length > PAGE && (
        <p className="pt-1 text-center">
          <a
            href="#top"
            className="inline-block rounded-lg border border-line bg-white px-4 py-2 text-xs text-muted transition hover:border-brand hover:text-brand"
          >
            ↑ 맨 위로 — 조건 다시 고르기
          </a>
        </p>
      )}
    </div>
  );
}
