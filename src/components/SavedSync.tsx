"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { AUTH_ON, MEMBER_HINT } from "@/lib/auth/config";
import {
  subscribe,
  getSnapshot,
  replaceSaved,
  clearSaved,
  type SavedItem,
} from "@/lib/saved";
import { syncSaved, pushSavedOps } from "@/lib/auth/actions";

/** 이 브라우저가 어느 계정과 이미 합쳐졌는지(계정 id). 로그아웃 때 지운다. */
export const SYNC_KEY = "bokjiclick:saved-synced";

/** 계정 목록을 다시 받는 최소 간격. 페이지를 옮길 때마다 부르지 않게. */
const PULL_GAP = 30_000;
const RETRY = 10_000;

const noop = () => () => {};
const isMember = () => document.cookie.split("; ").includes(`${MEMBER_HINT}=1`);

function readKey(): string | null {
  try {
    return localStorage.getItem(SYNC_KEY);
  } catch {
    return null;
  }
}
function writeKey(v: string | null) {
  try {
    if (v) localStorage.setItem(SYNC_KEY, v);
    else localStorage.removeItem(SYNC_KEY);
  } catch {
    /* 저장소가 막혀 있으면 매번 합친다 — 합치기는 몇 번 해도 같다 */
  }
}

/**
 * 관심 지원을 계정과 맞춘다 (2026-09-11). 화면에는 아무것도 안 그린다.
 * 로그인했을 때만 돈다.
 *
 * ── 09-11 코드 리뷰로 다시 짰다 ────────────────────────────────
 * 처음 판(목록 통째로 덮어쓰기)에서 네 가지가 걸렸다.
 *   ① 계정 목록 읽기가 실패하면 빈 목록으로 알고 브라우저 목록을 지웠다
 *   ② 첫 동기화가 끝나기 전에 누른 ☆가 곧 온 계정 목록에 덮여 사라졌다
 *   ③ 탭을 열어 둔 채 다른 기기에서 뺀 것이 되살아났다
 *   ④ 로그인이 풀려도 앞사람 목록이 남아 다음 사람 계정에 합쳐질 수 있었다
 *
 * 그래서 이렇게 돈다 —
 *   · 브라우저에서 바뀐 것은 **넣기/빼기 차이**로 적어 두고(`adds`·`removes`),
 *     계정에는 그 차이만 보낸다. 성공한 것만 지운다.
 *   · 계정 목록을 받으면 **아직 못 보낸 차이를 그 위에 다시 얹어서** 브라우저에
 *     반영한다. 그래서 받는 사이에 누른 ☆가 사라지지 않는다.
 *   · 받기 실패(null)는 **아무것도 안 바꾸고** 10초 뒤 다시 한다.
 *   · 받는 때 — 처음 열 때, 탭이 다시 보일 때, 페이지를 옮길 때(30초에 한 번).
 *   · 로그인이 분명히 풀렸으면(`signedOut`) 이 브라우저가 계정과 합쳐졌던
 *     경우에만 목록을 지운다. 합쳐진 적 없는 목록은 이 사람 것이라 남긴다.
 *   · 받기와 보내기는 **한 줄로 세워** 차례로 한다.
 */
export default function SavedSync() {
  const pathname = usePathname();
  const member = useSyncExternalStore(noop, isMember, () => false);
  const pullRef = useRef<((force?: boolean) => void) | null>(null);

  useEffect(() => {
    if (!AUTH_ON || !member) return;

    let alive = true;
    let ready = false;
    let applying = false;
    let lastPull = 0;
    let prev: SavedItem[] = getSnapshot();
    const adds = new Map<string, SavedItem>();
    const removes = new Set<string>();
    let chain: Promise<void> = Promise.resolve();
    let flushTimer: ReturnType<typeof setTimeout> | undefined;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const enqueue = (job: () => Promise<void>) => {
      chain = chain.then(job, job);
    };

    /** 계정 목록 위에 아직 못 보낸 차이를 얹는다. 새로 넣은 것이 앞에 온다. */
    const withPending = (list: SavedItem[]) => {
      const kept = list.filter((x) => !removes.has(x.id));
      const have = new Set(kept.map((x) => x.id));
      const fresh = [...adds.values()].filter((x) => !have.has(x.id));
      return [...fresh, ...kept];
    };

    const apply = (list: SavedItem[]) => {
      applying = true;
      replaceSaved(list);
      applying = false;
      prev = getSnapshot();
    };

    const retry = (fn: () => void) => {
      clearTimeout(retryTimer);
      retryTimer = setTimeout(fn, RETRY);
    };

    const flush = () => {
      if (!ready || (adds.size === 0 && removes.size === 0)) return;
      const a = [...adds.values()];
      const r = [...removes];
      enqueue(async () => {
        const ok = await pushSavedOps(a, r).catch(() => false);
        if (!alive) return;
        if (!ok) return retry(flush);
        /* 보내는 사이에 다시 바뀐 것은 남겨 둔다. */
        for (const x of a) if (adds.get(x.id) === x) adds.delete(x.id);
        for (const id of r) if (!adds.has(id)) removes.delete(id);
      });
    };

    const pull = (force = false) => {
      if (!force && Date.now() - lastPull < PULL_GAP) return;
      lastPull = Date.now();
      enqueue(async () => {
        const res = await syncSaved(getSnapshot(), readKey()).catch(() => null);
        if (!alive) return;
        if (res === null) return retry(() => pull(true));
        if ("signedOut" in res) {
          if (readKey()) {
            adds.clear();
            removes.clear();
            apply([]);
            clearSaved();
            writeKey(null);
          }
          return;
        }
        writeKey(res.userId);
        apply(withPending(res.items));
        ready = true;
        flush();
      });
    };

    const unsub = subscribe(() => {
      if (applying) return;
      const cur = getSnapshot();
      const curIds = new Map(cur.map((x) => [x.id, x] as const));
      const prevIds = new Set(prev.map((x) => x.id));
      for (const [id, x] of curIds) {
        if (!prevIds.has(id)) {
          adds.set(id, x);
          removes.delete(id);
        }
      }
      for (const id of prevIds) {
        if (!curIds.has(id)) {
          removes.add(id);
          adds.delete(id);
        }
      }
      prev = cur;
      if (!ready) return;
      clearTimeout(flushTimer);
      /* ☆를 연달아 누르면 한 번에 모아 보낸다. */
      flushTimer = setTimeout(flush, 400);
    });

    const onVisible = () => {
      if (document.visibilityState === "visible") pull();
    };
    document.addEventListener("visibilitychange", onVisible);

    pullRef.current = pull;
    pull(true);

    return () => {
      alive = false;
      pullRef.current = null;
      unsub();
      document.removeEventListener("visibilitychange", onVisible);
      clearTimeout(flushTimer);
      clearTimeout(retryTimer);
    };
  }, [member]);

  /* 페이지를 옮길 때도 받는다(30초 간격 안이면 건너뛴다). */
  useEffect(() => {
    pullRef.current?.();
  }, [pathname]);

  return null;
}
