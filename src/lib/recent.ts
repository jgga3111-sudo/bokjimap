/**
 * 최근 본 지원 — 브라우저에만 남는다.
 *
 * 왜 필요한가 — 이 사이트에서 사람들이 하는 일은 "하나 찾기"가 아니라 "여러
 * 개 훑고 비교하기"다. 청년월세를 보고, 뒤로 가고, 다른 걸 보고, 아까 그걸
 * 다시 찾는다. 지금은 그때 검색어를 다시 쳐야 한다.
 *
 * 서버에 보내지 않는다. 계정도 만들지 않는다. 어떤 복지를 알아봤는지는
 * 소득·가족관계를 짐작하게 하는 민감한 정보다. 개인정보처리방침에 "이용자
 * 정보를 수집하지 않는다"고 써 둔 것과도 어긋나면 안 된다.
 * **localStorage에만 두고, 우리는 읽지 않는다.**
 */

export type RecentItem = { id: string; name: string; place: string };

const KEY = "bokjimap:recent";
const MAX = 6;

/* 빈 값은 **같은 배열**을 돌려줘야 한다. useSyncExternalStore는 스냅샷이
   매번 새 객체면 무한히 다시 그린다. */
const EMPTY: RecentItem[] = [];

/**
 * 저장된 값이 우리가 쓴 모양인지 본다.
 *
 * localStorage는 이용자가 직접 고칠 수 있다. 남을 해칠 수는 없지만, 이상한
 * 값이 들어 있으면 화면이 깨지고 **id가 그대로 주소에 붙는다.** 그래서 id는
 * 형식까지 확인한다.
 */
function isItem(x: unknown): x is RecentItem {
  if (!x || typeof x !== "object") return false;
  const v = x as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    /^WLF\d+$/.test(v.id) &&
    typeof v.name === "string" &&
    v.name.length > 0 &&
    typeof v.place === "string"
  );
}

let cache: RecentItem[] | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) fn();
}

function load(): RecentItem[] {
  /* 시크릿 모드나 저장 공간 차단 설정에서는 접근 자체가 예외를 던진다. */
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const clean = parsed.filter(isItem).slice(0, MAX);
    return clean.length ? clean : EMPTY;
  } catch {
    return EMPTY;
  }
}

function onStorage(e: StorageEvent) {
  /* 다른 탭에서 바뀌면 이쪽도 맞춘다. */
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

export function getSnapshot(): RecentItem[] {
  return (cache ??= load());
}

/** 서버에는 localStorage가 없다. 항상 빈 목록으로 그린다. */
export function getServerSnapshot(): RecentItem[] {
  return EMPTY;
}

/** 방금 본 것을 맨 앞에 둔다. 이미 있으면 위로 끌어올린다. */
export function remember(item: RecentItem): void {
  if (!isItem(item)) return;
  try {
    const next = [item, ...getSnapshot().filter((x) => x.id !== item.id)].slice(
      0,
      MAX,
    );
    localStorage.setItem(KEY, JSON.stringify(next));
    cache = next;
    emit();
  } catch {
    /* 저장이 막혀 있으면 조용히 넘어간다. 없어도 사이트는 돌아간다. */
  }
}

export function clearRecent(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* 위와 같다 */
  }
  cache = EMPTY;
  emit();
}
