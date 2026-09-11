/**
 * 관심 지원 — 이용자가 ☆로 골라 둔 사업 (2026-09-11).
 *
 * 「최근 본 지원」(recent.ts)은 **본 것**을 저절로 적는다. 여기는 **고른 것**을
 * 적는다. 둘은 다르다 — 최근 본 것은 여섯 건에서 밀려나 사라지지만, 골라 둔
 * 것은 이용자가 지울 때까지 남아야 한다. 그래서 따로 둔다.
 *
 * ── 어디에 저장하나 ───────────────────────────────────────────
 * **먼저 이 브라우저에만 둔다.** 로그인하지 않아도 ☆를 누를 수 있어야 한다
 * (사용자 결정, 09-11) — 가입 전에는 저장을 못 하게 하면 쓰는 사람이 준다.
 * 로그인하면 계정 쪽으로 옮겨 기기 사이에 이어지게 하는데, 그 동기화는
 * 이 파일이 아니라 계정 코드가 맡는다. 이 파일은 브라우저 저장소만 안다.
 *
 * 이름과 지역을 id와 함께 적는 이유 — 목록을 그릴 때 900건 데이터(2.9MB)를
 * 브라우저로 내리지 않기 위해서다(`lib/search.ts` 머리말의 함정).
 */

export type SavedItem = { id: string; name: string; place: string };

const KEY = "bokjiclick:saved";

/** 넉넉히 둔다. 넘으면 가장 오래된 것부터 밀어 낸다. 수록 900건 중
    이만큼 골라 두는 사람은 사실상 없고, 상한은 저장소가 무한히 커지지
    않게 하는 안전장치일 뿐이다. */
const MAX = 200;

/* 빈 값은 **같은 배열**을 돌려줘야 한다. useSyncExternalStore는 스냅샷이
   매번 새 객체면 무한히 다시 그린다(recent.ts와 같다). */
const EMPTY: SavedItem[] = [];

/** localStorage는 이용자가 고칠 수 있다. id는 그대로 주소에 붙으므로
    형식까지 본다(recent.ts와 같은 검사). */
export function isSavedItem(x: unknown): x is SavedItem {
  if (!x || typeof x !== "object") return false;
  const v = x as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    /^WLF\d+$/.test(v.id) &&
    typeof v.name === "string" &&
    v.name.length > 0 &&
    v.name.length <= 200 &&
    typeof v.place === "string" &&
    v.place.length <= 100
  );
}

let cache: SavedItem[] | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) fn();
}

function load(): SavedItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const seen = new Set<string>();
    const clean = parsed.filter((x): x is SavedItem => {
      if (!isSavedItem(x) || seen.has(x.id)) return false;
      seen.add(x.id);
      return true;
    });
    return clean.length ? clean.slice(0, MAX) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function write(next: SavedItem[]) {
  try {
    if (next.length) localStorage.setItem(KEY, JSON.stringify(next));
    else localStorage.removeItem(KEY);
  } catch {
    /* 저장이 막혀 있으면(시크릿 모드 등) 이 화면에서만 기억한다. */
  }
  cache = next.length ? next : EMPTY;
  emit();
}

function onStorage(e: StorageEvent) {
  /* 다른 탭에서 ☆를 누르면 이쪽도 맞춘다. */
  if (e.key === KEY) {
    cache = null;
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

export function getSnapshot(): SavedItem[] {
  return (cache ??= load());
}

/** 서버에는 localStorage가 없다. 늘 빈 목록으로 그린다. */
export function getServerSnapshot(): SavedItem[] {
  return EMPTY;
}

/** 새로 고른 것을 맨 앞에 둔다. 이미 있으면 뺀다(☆ 한 번 더 누르기). */
export function toggleSaved(item: SavedItem): boolean {
  if (!isSavedItem(item)) return false;
  const cur = getSnapshot();
  if (cur.some((x) => x.id === item.id)) {
    write(cur.filter((x) => x.id !== item.id));
    return false;
  }
  write([item, ...cur].slice(0, MAX));
  return true;
}

export function removeSaved(id: string): void {
  write(getSnapshot().filter((x) => x.id !== id));
}

/** 계정 동기화가 서버 목록으로 통째로 바꿀 때 쓴다. */
export function replaceSaved(items: readonly SavedItem[]): void {
  const seen = new Set<string>();
  write(
    items
      .filter((x) => isSavedItem(x) && !seen.has(x.id) && seen.add(x.id))
      .slice(0, MAX),
  );
}

export function clearSaved(): void {
  write(EMPTY);
}
