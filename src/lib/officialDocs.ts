import { services } from "@/data/services";

/**
 * 원문에 붙어 있는 **사업안내 지침·매뉴얼 파일** 모으기 (2026-09-16).
 *
 * ── 왜 ─────────────────────────────────────────────────────────
 * 서치콘솔 실적(09-16 확인)에 「"★2026년 국민기초생활보장 사업안내.pdf"」처럼
 * **지침 파일 이름을 그대로 치는 검색어**가 여러 건 노출되고 있었다. 우리 상세의
 * 「서식·안내 자료」 칸이 걸려서 나온 것인데, 정작 그 파일들을 한자리에 모아 놓은
 * 화면은 없었다. 수록 910건 중 87%에 첨부가 있고(790건), 그중 안내·지침 파일이
 * 300건 넘게 붙어 있다 — 이미 가진 재료다.
 *
 * ── 규칙 ───────────────────────────────────────────────────────
 * · 파일을 우리가 다시 올리지 않는다. **링크는 그 사업 상세로** 보내고, 내려받기는
 *   복지로 원문 링크로만 한다(상세의 「서식·안내 자료」 절).
 * · 파일 이름에서 **연도를 읽어 함께 보여준다.** 첨부가 작년·재작년판인 사업이
 *   실제로 있다(2025년 이하 87개). 연도를 안 보여주면 오래된 지침을 올해 것으로
 *   읽게 된다 — CLAUDE.md 3절 「작년 공고를 올해로 옮기지 않는다」.
 * · 연도는 **파일 이름에 적힌 것**이지 우리가 판정한 것이 아니다. 못 읽으면 null.
 */

export type DocRow = {
  /** 파일 이름 그대로 */
  name: string;
  /** 이름에서 읽은 발행연도 — 못 읽으면 null */
  year: number | null;
  serviceId: string;
  serviceName: string;
  department: string;
  /** 복지로 조회수 순위(수록 목록의 자리) */
  rank: number;
};

const DOC_RE = /안내|지침|매뉴얼/;
const FILE_RE = /\.(pdf|hwpx?|docx?)$/i;

/** 「2026년」·「'26년」·「2026」 가운데 앞에서 처음 읽히는 연도. */
function yearOf(name: string): number | null {
  /* 2010~2029만 연도로 읽는다. 파일 이름에 섞인 「2000」·문서번호가 연도로
     잡히던 것을 막는다(화면에서 「2000년판 1개」가 나와서 좁혔다, 09-16). */
  const full = name.match(/20[12]\d/);
  if (full) return Number(full[0]);
  const short = name.match(/(?:^|[^0-9])'?(\d{2})년/);
  if (short) return 2000 + Number(short[1]);
  return null;
}

export const OFFICIAL_DOCS: readonly DocRow[] = (() => {
  const out: DocRow[] = [];
  const seen = new Set<string>();
  services.forEach((s, i) => {
    for (const f of s.forms) {
      if (!DOC_RE.test(f.name) || !FILE_RE.test(f.name)) continue;
      /* 같은 사업에 같은 이름이 두 번 붙어 오는 경우가 있다(원본 그대로). */
      const key = `${s.id}|${f.name}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({
        name: f.name,
        year: yearOf(f.name),
        serviceId: s.id,
        serviceName: s.name,
        department: s.department ?? "",
        rank: i + 1,
      });
    }
  });
  return out;
})();

export const docsByYear = (): [string, number][] => {
  const m = new Map<string, number>();
  for (const d of OFFICIAL_DOCS) {
    const k = d.year ? `${d.year}년판` : "연도 표기 없음";
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  /* 연도 내림차순, 「연도 표기 없음」은 맨 뒤. 문자열 정렬로 두면 그 줄이
     맨 위로 올라온다(화면 확인). */
  return [...m.entries()].sort((a, b) => {
    const na = /^\d+/.test(a[0]) ? Number(a[0].slice(0, 4)) : -1;
    const nb = /^\d+/.test(b[0]) ? Number(b[0].slice(0, 4)) : -1;
    return nb - na;
  });
};
