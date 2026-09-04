import { SEARCH_INDEX, type SearchRow } from "@/data/searchIndex";
import { toChoseong, isChoseongQuery, norm } from "@/lib/searchText";

/**
 * 헤더 검색창이 쓰는 **가벼운 이름 색인.**
 *
 * 색인을 통째로 브라우저에 내려 치는 즉시 거른다. 대신 담긴 필드가
 * [id, 이름, 지역, 부처]뿐이라 **본문은 못 본다** — "백신"·"도배"처럼
 * 이름에 없는 낱말은 여기서 0건이 나온다.
 *
 * 본문까지 찾는 일은 `lib/searchFull.ts`(서버)가 맡는다. 드롭다운에서
 * Enter를 치면 `/search`로 넘어가 거기서 다시 걸린다. 색인에 본문을 실으면
 * 169~738KB가 늘어나는데, 서버로 넘기면 번들이 0바이트도 안 는다.
 *
 * ⚠ 색인은 반드시 `@/data/searchIndex`에서 가져온다. 여기서 `@/data/services`를
 * import해 색인을 만들면, 이 파일이 클라이언트 컴포넌트에 딸려 들어가면서
 * **services.ts 전체(요약문·복지로 링크·문의처까지)가 번들에 실린다.**
 * 번들러는 "이 배열에서 필드 몇 개만 쓴다"를 알 수 없기 때문이다.
 * 실제로 그렇게 만들었다가 청크 하나가 528KB가 됐다.
 */

export type Row = SearchRow;
export const INDEX = SEARCH_INDEX;

export const idOf = (row: Row) => `WLF${row[0]}`;

export type Hit = { id: string; name: string; place: string; dept: string };

/**
 * 검색 — 걸리는 것을 **전부** 점수순으로 준다.
 *
 * 점수 규칙 — 이름이 질의로 **시작**하면 가장 높고, 이름에 들어 있으면 그다음,
 * 지역·부처에만 있으면 낮다. "청년"을 쳤을 때 "청년내일저축계좌"가
 * "서울시 청년정책과 소관 ○○"보다 위에 와야 하기 때문이다.
 *
 * 여러 낱말을 넣으면 **모두** 걸리는 것만 남긴다("서울 청년" → 둘 다 포함).
 *
 * 자르지 않고 다 주는 이유 — 검색창 드롭다운은 8건만 보여주지만 "청년"에는
 * 실제로 60건이 걸린다. 나머지 52건으로 갈 길이 없으면 그 데이터는 없는 것과
 * 같다. 전체 결과 페이지(/search)가 이걸 그대로 받아 쓴다.
 */
export function searchAll(query: string): Hit[] {
  const raw = query.trim();
  if (raw.length === 0) return [];

  const useCho = isChoseongQuery(raw);
  const tokens = raw.split(/\s+/).map(norm).filter(Boolean);
  if (tokens.length === 0) return [];

  const scored: { row: Row; score: number }[] = [];

  for (const row of INDEX) {
    const name = useCho ? norm(toChoseong(row[1])) : norm(row[1]);
    const rest = useCho
      ? norm(toChoseong(row[2] + row[3]))
      : norm(row[2] + row[3]);

    let score = 0;
    let matchedAll = true;

    for (const t of tokens) {
      if (name.startsWith(t)) score += 100;
      else if (name.includes(t)) score += 50;
      else if (rest.includes(t)) score += 10;
      else {
        matchedAll = false;
        break;
      }
    }
    if (!matchedAll) continue;

    /*
      같은 등급이면 **조회수가 많은 것**을 먼저 보여준다.
      처음엔 짧은 이름을 우선했더니 "청년월세"를 쳤을 때 조회수 1,255만짜리
      국토교통부 청년월세 지원사업이 지자체 동명 사업들에 밀려 3위로 갔다.
      사이트 전체가 조회수 순으로 짜여 있으니 검색도 같은 기준을 따른다.

      log10을 쓰는 이유 — 조회수는 983에서 1,285만까지 4자리 이상 차이가 나서
      그대로 더하면 등급 점수(50점 간격)를 압도한다. 로그로 누르면 0~7 범위라
      **등급이 같을 때만** 순서를 가른다.
    */
    score += Math.log10(row[4] + 1);
    scored.push({ row, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .map(({ row }) => ({
      id: idOf(row),
      name: row[1],
      place: row[2],
      dept: row[3],
    }));
}

/** 검색창 드롭다운처럼 앞부분만 필요할 때. */
export const search = (query: string, limit = 8): Hit[] =>
  searchAll(query).slice(0, limit);
