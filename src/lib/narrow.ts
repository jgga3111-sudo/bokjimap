import type { WelfareService } from "@/types/welfare";
import {
  TARGETS,
  LIFE_STAGES,
  lifeStageBySlug,
  targetBySlug,
  type Axis,
} from "@/lib/axes";
import { SIDO_LIST, sidoBySlug, type Sido } from "@/lib/regions";

/**
 * 허브 페이지 위에 다는 「이 안에서 더 좁히기」 칩의 건수.
 *
 * ── 왜 필요했나 ────────────────────────────────────────────────
 * `/life/youth`는 305건인데 거기서 "저소득만"으로 가는 길이 없었다. 축을
 * 겹치는 화면(`/find`)은 09-09에 만들었지만 **허브 29쪽 어디에도 그리로 가는
 * 링크가 0개**였다(09-11 실측). 사람이 실제로 서 있는 자리는 허브인데,
 * 겹치는 도구는 첫 화면과 `/ask`에서만 열렸다.
 *
 * ── 건수는 빌드 때 센다 ────────────────────────────────────────
 * `AxisFinder`는 데이터를 몰라 건수를 못 보여준다(그 파일 머리말 — 900건을
 * 브라우저로 내리면 2.9MB). 여기는 서버 컴포넌트에서 부르므로 세어서 붙일 수
 * 있다. 0건짜리 칩은 만들지 않는다 — 눌러도 빈 화면이 나오는 단추다.
 *
 * ── ⚠ `matchesFind`는 `src/app/find/page.tsx`의 필터와 글자까지 같아야 한다 ──
 * 칩에 「저소득 67」이라 적어 놓고 `/find`가 66건을 내면 사이트가 거짓말을
 * 하는 셈이다. `/find`는 필터 함수를 export하지 않고 페이지 안에 인라인으로
 * 갖고 있어서(그 파일은 손대지 않기로 함) 여기에 **같은 규칙을 옮겨 적었다.**
 * 한쪽을 고치면 다른 쪽도 고친다. 실측(2026-09-11): 청년×저소득 67 ·
 * 청년×저소득×서울 40 — CLAUDE.md 6절 `/find` 항목의 값과 같다.
 *
 * ── 이 주소들은 색인되지 않는다 ────────────────────────────────
 * `/find`는 noindex(follow)다. 조합마다 URL이 생기지만 사이트맵에 넣지 않고
 * 색인 대상도 아니다. 좋은 결과를 만난 사람이 남길 주소는 `/find` 맨 아래의
 * 축 페이지 링크가 준다.
 */

/**
 * `/find`가 읽는 주소 조건. **열쇠 이름이 곧 쿼리 파라미터 이름**이다
 * (`?life=youth&target=low-income&region=seoul`).
 */
export type FindQuery = { life?: string; target?: string; region?: string };

/** 슬러그를 축 객체로 푼 것. `/find`처럼 모르는 슬러그는 그 축을 무시한다. */
type Resolved = { life?: Axis; target?: Axis; sido?: Sido };

function resolve(q: FindQuery): Resolved {
  return {
    life: q.life ? lifeStageBySlug(q.life) : undefined,
    target: q.target ? targetBySlug(q.target) : undefined,
    sido: q.region ? sidoBySlug(q.region) : undefined,
  };
}

/**
 * `/find`의 `hits` 필터 그대로. 지역을 고르면 그 지역 지자체 사업 + 전국
 * 공통(중앙부처)을 함께 본다 — `/region/[sido]`가 두 절로 나눠 보여주는 것과
 * 같은 범위다.
 */
export function matchesFind(s: WelfareService, r: Resolved): boolean {
  if (r.life && !s.lifeStages.includes(r.life.slug)) return false;
  if (r.target && !s.targets.includes(r.target.slug)) return false;
  if (r.sido && !(s.sidoName === r.sido.fullName || s.provider === "central"))
    return false;
  return true;
}

/**
 * `/find` 주소. 파라미터 순서를 `AxisFinder`와 같게(life → target → region)
 * 둔다 — 같은 조건이 두 가지 주소로 나뉘면 뒤로 가기·캐시가 갈린다.
 */
export function findHref(q: FindQuery): string {
  const p = new URLSearchParams();
  if (q.life) p.set("life", q.life);
  if (q.target) p.set("target", q.target);
  if (q.region) p.set("region", q.region);
  const s = p.toString();
  return s ? `/find?${s}` : "/find";
}

export type NarrowChip = {
  slug: string;
  label: string;
  count: number;
  href: string;
};

export type NarrowRow = {
  key: keyof FindQuery;
  label: string;
  chips: NarrowChip[];
  /** 건수 상위 `NARROW_MAX`개 뒤에 더 있을 때만 값이 있다. 지금 축만 건 `/find`. */
  moreHref: string | null;
};

/**
 * 한 줄에 놓는 칩 상한. 지역이 16개라 다 펴면 375px에서 세 줄이 되는데,
 * 허브 머리에 그만한 자리를 줄 수 없다. 나머지는 「…」로 `/find`에 넘긴다.
 */
export const NARROW_MAX = 8;

const AXES: {
  key: keyof FindQuery;
  label: string;
  items: readonly { slug: string; label: string }[];
}[] = [
  { key: "life", label: "생애주기", items: LIFE_STAGES },
  { key: "target", label: "대상", items: TARGETS },
  {
    key: "region",
    label: "지역",
    items: SIDO_LIST.map((s) => ({ slug: s.slug, label: s.name })),
  },
];

/**
 * 지금 허브의 축(`base`)을 고정한 채, **나머지 축**마다 겹쳤을 때의 건수를
 * 센다. 0건은 빼고, 건수 순으로 `NARROW_MAX`개까지만 남긴다.
 *
 * `base`에 이미 든 축은 줄을 만들지 않는다 — `/region/seoul`에서 지역 줄을
 * 다시 보여줄 이유가 없다(`facetsFor`와 같은 판단).
 */
export function narrowRows(
  list: readonly WelfareService[],
  base: FindQuery,
): NarrowRow[] {
  const fixed = resolve(base);
  /* 기준 축부터 좁혀 둔다. 축마다 900건을 다시 훑지 않아도 되고, 나머지
     축의 판정은 `matchesFind`가 그대로 한다. */
  const pool = list.filter((s) => matchesFind(s, fixed));

  const rows: NarrowRow[] = [];
  for (const axis of AXES) {
    if (base[axis.key]) continue;
    const chips = axis.items
      .map((item) => {
        const q: FindQuery = { ...base, [axis.key]: item.slug };
        const count = pool.filter((s) => matchesFind(s, resolve(q))).length;
        return { slug: item.slug, label: item.label, count, href: findHref(q) };
      })
      .filter((c) => c.count > 0)
      /* 건수 내림차순. 같으면 원래 순서(정렬이 안정적이라 그대로 남는다). */
      .sort((a, b) => b.count - a.count);
    if (chips.length === 0) continue;
    rows.push({
      key: axis.key,
      label: axis.label,
      chips: chips.slice(0, NARROW_MAX),
      moreHref: chips.length > NARROW_MAX ? findHref(base) : null,
    });
  }
  return rows;
}
