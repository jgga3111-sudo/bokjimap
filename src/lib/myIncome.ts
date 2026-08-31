/**
 * 자가진단 결과 — 브라우저에만 남는다.
 *
 * 자가진단을 해서 "나는 중위소득 62%"라는 걸 알아낸 사람이, 상세 페이지에서
 * "이 사업은 80% 이하"를 보고 **머릿속으로 다시 비교하고 있다.** 그 비교는
 * 우리가 해 줄 수 있다.
 *
 * 소득 금액은 저장하지 않는다. **가구원 수와 퍼센트만** 둔다. 화면에 필요한
 * 건 그 둘뿐이고, 월급 액수까지 브라우저에 적어 둘 이유가 없다.
 * 서버로 보내지 않는 것은 [recent.ts]와 같은 이유다 — 어떤 복지를 얼마의
 * 소득으로 알아봤는지는 그 사람에 대해 너무 많은 것을 말해 준다.
 */

export type MyIncome = {
  /** 가구원 수 */
  household: number;
  /** 기준 중위소득 대비 비율(%). 소수점은 버린다. */
  percent: number;
  /** 저장한 날(YYYY-MM-DD). 오래된 결과에 "다시 계산" 안내를 띄우는 데 쓴다. */
  savedOn: string;
};

const KEY = "bokjimap:income";

let cache: MyIncome | null | undefined;
const listeners = new Set<() => void>();

function valid(x: unknown): x is MyIncome {
  if (!x || typeof x !== "object") return false;
  const v = x as Record<string, unknown>;
  return (
    typeof v.household === "number" &&
    Number.isFinite(v.household) &&
    v.household >= 1 &&
    v.household <= 20 &&
    typeof v.percent === "number" &&
    Number.isFinite(v.percent) &&
    v.percent >= 0 &&
    v.percent <= 100000 &&
    typeof v.savedOn === "string"
  );
}

function load(): MyIncome | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return valid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function onStorage(e: StorageEvent) {
  if (e.key === KEY) {
    cache = undefined;
    for (const fn of listeners) fn();
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

export function getSnapshot(): MyIncome | null {
  if (cache === undefined) cache = load();
  return cache;
}

/** 서버에는 localStorage가 없다. */
export function getServerSnapshot(): MyIncome | null {
  return null;
}

export function save(household: number, percent: number): void {
  const next: MyIncome = {
    household,
    percent: Math.floor(percent),
    savedOn: new Date(Date.now() + 9 * 3600_000).toISOString().slice(0, 10),
  };
  if (!valid(next)) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* 저장이 막혀 있어도 자가진단 자체는 그대로 쓸 수 있다 */
  }
  cache = next;
  for (const fn of listeners) fn();
}

export function forget(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* 위와 같다 */
  }
  cache = null;
  for (const fn of listeners) fn();
}
