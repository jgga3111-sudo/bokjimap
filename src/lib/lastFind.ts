/**
 * 지난번 조건 — `/find`에서 마지막으로 본 조건 조합 (2026-09-11).
 *
 * 왜 필요한가 — 조건을 겹쳐 좁힌 결과(`/find`)는 noindex라 검색으로 다시
 * 못 들어오고, 주소도 `?life=youth&target=low-income`처럼 외울 만한 모양이
 * 아니다. 첫 화면에 와서 다시 보려면 칩 셋을 처음부터 다시 눌러야 한다.
 * 그래서 **마지막 한 번**만 기억해 첫 화면 「조건을 겹쳐서 좁히기」 위에
 * 한 줄로 되돌려 준다 — "지난번: 청년 · 저소득 · 서울 40건 → 다시 보기".
 *
 * ── 무엇을 저장하나 — 슬러그와 건수뿐 ────────────────────────────
 * `{ life, target, region, count, at }`. 축 목록에 있는 슬러그, 그때 나온
 * 건수, 본 날(YYYY-MM-DD)이다. 검색어·사업 이름·주소 같은 것은 없다.
 * 조건 조합 자체가 소득·가족관계를 짐작하게 하는 값이라 recent.ts와 같은
 * 원칙을 지킨다 — **localStorage에만 두고, 서버로 보내지 않는다.**
 * 개인정보처리방침 2조 「브라우저에 남는 것」 목록에 이 항목도 있어야 한다.
 *
 * ── 왜 한 건만 ──────────────────────────────────────────────────
 * 최근 본 지원처럼 여섯을 쌓지 않는다. 조건 조합에는 이름이 없어서 줄을
 * 늘어놓으면 "청년·저소득 67건 / 청년·저소득·서울 40건 …"처럼 비슷한 줄이
 * 쌓여 읽기만 나빠진다. "아까 그거"는 마지막 하나면 된다.
 *
 * ── 이 파일은 데이터를 모른다 ──────────────────────────────────
 * 축 목록(`axes.ts`·`regions.ts`)만 읽는다. 둘 다 순수 데이터라 클라이언트
 * 번들에 안전하다(AxisFinder와 같다). **`@/data/services`(2.9MB)는 여기로
 * 들어오면 안 된다** — 건수는 `/find`가 서버에서 세어 넘겨 준다.
 */

import { LIFE_STAGES, TARGETS, lifeStageBySlug, targetBySlug } from "@/lib/axes";
import { SIDO_LIST, sidoBySlug } from "@/lib/regions";

export type LastFind = {
  /** 생애주기 슬러그. 안 골랐으면 "" */
  life: string;
  /** 대상 슬러그. 안 골랐으면 "" */
  target: string;
  /** 시·도 슬러그. 안 골랐으면 "" */
  region: string;
  /** 그때 나온 건수 — 120건으로 자르기 **전**의 전체 수 */
  count: number;
  /** 본 날. YYYY-MM-DD(브라우저 시계 기준) */
  at: string;
};

const KEY = "bokjiclick:last-find";

/** 건수 상한. 수록이 900건이라 이보다 클 수 없다 — 손으로 고친 값을 거른다. */
const MAX_COUNT = 100_000;

const LIFE_SLUGS = new Set(LIFE_STAGES.map((a) => a.slug));
const TARGET_SLUGS = new Set(TARGETS.map((a) => a.slug));
const SIDO_SLUGS = new Set(SIDO_LIST.map((s) => s.slug));

/**
 * 저장된 값이 우리가 쓴 모양인지 본다.
 *
 * localStorage는 이용자가 직접 고칠 수 있고, 슬러그는 **그대로 주소에 붙는다.**
 * 그래서 축 목록에 있는 값만 받는다(recent.ts가 id 형식을 보는 것과 같은 이유).
 * 조건이 하나도 없는 것은 기억할 것이 없으므로 거른다.
 */
function isLastFind(x: unknown): x is LastFind {
  if (!x || typeof x !== "object") return false;
  const v = x as Record<string, unknown>;
  const slugOk = (val: unknown, set: Set<string>) =>
    typeof val === "string" && (val === "" || set.has(val));
  if (
    !slugOk(v.life, LIFE_SLUGS) ||
    !slugOk(v.target, TARGET_SLUGS) ||
    !slugOk(v.region, SIDO_SLUGS)
  )
    return false;
  if (!v.life && !v.target && !v.region) return false;
  return (
    typeof v.count === "number" &&
    Number.isInteger(v.count) &&
    v.count >= 0 &&
    v.count <= MAX_COUNT &&
    typeof v.at === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(v.at)
  );
}

/* `undefined`는 "아직 안 읽음", `null`은 "읽었는데 없음"이다. 둘을 가르지
   않으면 없는 값을 매번 다시 읽는다. 값이 있을 때는 같은 객체를 돌려줘야
   한다 — useSyncExternalStore는 스냅샷이 매번 새 객체면 무한히 다시 그린다. */
let cache: LastFind | null | undefined = undefined;
const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) fn();
}

function load(): LastFind | null {
  /* 시크릿 모드나 저장 공간 차단 설정에서는 접근 자체가 예외를 던진다. */
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isLastFind(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function onStorage(e: StorageEvent) {
  /* 다른 탭에서 바뀌면 이쪽도 맞춘다. */
  if (e.key === KEY) {
    cache = undefined;
    emit();
  }
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot(): LastFind | null {
  if (cache === undefined) cache = load();
  return cache;
}

/** 서버에는 localStorage가 없다. 항상 없는 것으로 그린다. */
export function getServerSnapshot(): LastFind | null {
  return null;
}

/** 브라우저 시계 기준 오늘. `toISOString`은 UTC라 밤 9시 이후 날짜가 하루 앞선다. */
function today(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/**
 * `/find` 결과를 봤을 때 부른다. **걸러 낸 슬러그**를 받는다 — 주소에 적힌
 * 날것이 아니라 페이지가 실제로 적용한 값(find/page.tsx의 `life?.slug`).
 * 엉뚱한 슬러그가 들어오면 통째로 버린다. 조건이 없으면 기억하지 않는다.
 */
export function rememberFind(v: Omit<LastFind, "at">): void {
  const next: LastFind = {
    life: v.life,
    target: v.target,
    region: v.region,
    count: v.count,
    at: today(),
  };
  if (!isLastFind(next)) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
    cache = next;
    emit();
  } catch {
    /* 저장이 막혀 있으면 조용히 넘어간다. 없어도 사이트는 돌아간다. */
  }
}

export function clearLastFind(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* 위와 같다 */
  }
  cache = null;
  emit();
}

/** 다시 볼 주소. AxisFinder가 만드는 것과 같은 순서(life·target·region). */
export function lastFindHref(v: LastFind): string {
  const params = new URLSearchParams();
  if (v.life) params.set("life", v.life);
  if (v.target) params.set("target", v.target);
  if (v.region) params.set("region", v.region);
  return `/find?${params.toString()}`;
}

/** 화면에 적을 이름들. 축 표기(`label`·`name`)를 그대로 쓴다 — 여기서 새로 짓지 않는다. */
export function lastFindLabels(v: LastFind): string[] {
  return [
    lifeStageBySlug(v.life)?.label,
    targetBySlug(v.target)?.label,
    sidoBySlug(v.region)?.name,
  ].filter((s): s is string => Boolean(s));
}
