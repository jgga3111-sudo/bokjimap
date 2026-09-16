/**
 * 보조금24 원본을 우리 수록 사업과 맞춰 `src/data/gov24.ts`를 만든다 — 2026-09-16.
 *
 * ── 이 파일이 조심하는 것 ──────────────────────────────────────
 * 두 원천을 이름으로 맞추는 일은 **조용히 틀리기 쉽다.** 실제로 유사도만 보면
 * 「교육급여(맞춤형 급여)」와 「생계급여(맞춤형 급여)」가 둘 다 **「주거급여」**에
 * 0.71로 붙었다(09-16 실측). 그래서 세 겹으로 거른다.
 *
 *   ① 기관 급이 같아야 한다 — 중앙부처 사업은 부·처·청 소관인 것끼리,
 *      지자체 사업은 그 시·도(시·군·구) 이름이 든 기관끼리만 본다.
 *      ⚠ 「충청북도」가 지자체로 안 걸리던 버그가 있었다. 기관 이름의
 *      **끝 글자**로 판정한다(부·처·청·위원회…는 중앙).
 *   ② 이름 유사도(2글자 묶음 Dice) **0.75 이상**. 0.71에서 위 사고가 났다.
 *   ③ 급여 종류·대상 낱말이 서로 달라지면 버린다(생계/주거/교육/의료급여,
 *      장애인·아동·청년·한부모…). 같은 낱말 집합일 때만 통과.
 *
 * 걸러진 것은 **버린다.** 반쯤 맞는 것을 실으면 남의 사업 서류를 보여주게 된다
 * (CLAUDE.md 3절 — 확인 못 하면 null).
 *
 * ── 싣는 값 ────────────────────────────────────────────────────
 * 구비서류 · 공무원확인구비서류 · 법령 · 자치법규 · 온라인신청사이트URL ·
 * 신청기한. 전부 **원문 그대로** 옮기고 우리가 요약하지 않는다. 화면에는
 * 「행정안전부 공공서비스 정보에서 옮김 + 확인일」을 함께 적는다.
 *
 * 쓰는 법: node scripts/build-gov24.mjs [확인일 YYYY-MM-DD]
 */
import fs from "node:fs";
import path from "node:path";

const CHECKED = process.argv[2] ?? new Date().toISOString().slice(0, 10);
const SRC = path.join("data-research", "gov24");
const read = (f) => JSON.parse(fs.readFileSync(path.join(SRC, f), "utf8"));

const list = read("serviceList.json");
const details = new Map(read("serviceDetail.json").map((d) => [d["서비스ID"], d]));

/* 수록 데이터는 생성 파일이라 그대로 파싱해 쓴다(build-data.mjs가 만든 것). */
const servicesTs = fs.readFileSync(path.join("src", "data", "services.ts"), "utf8");
const start = servicesTs.indexOf("= [") + 2;
const end = servicesTs.indexOf("\n];", start) + 2;
const ours = JSON.parse(servicesTs.slice(start, end));

const norm = (s) =>
  (s ?? "").replace(/[\s()（）[\]·・,.\-–—~～"“”']/g, "").toLowerCase();

const bigrams = (s) => {
  const t = norm(s);
  const g = new Set();
  for (let i = 0; i < t.length - 1; i++) g.add(t.slice(i, i + 2));
  return g;
};

const dice = (a, b) => {
  let hit = 0;
  for (const x of a) if (b.has(x)) hit++;
  return (2 * hit) / (a.size + b.size || 1);
};

/* 시·도 이름 목록 — 우리 수록값과 보조금24 기관명의 첫 낱말에서 모은다. */
const SIDO = new Set([
  ...ours.map((s) => s.sidoName).filter(Boolean),
  ...list
    .map((g) => (g["소관기관명"] ?? "").trim().split(/\s+/))
    .filter((p) => p.length > 1)
    .map((p) => p[0]),
]);

/** 중앙부처인가 — 기관 이름의 끝 글자로 본다.
 *  ⚠ 「인천광역시서해구시설관리공단」처럼 띄어 쓰지 않은 지자체 기관이 「공단」으로
 *  끝나 중앙으로 읽혔다(09-16 리뷰). 시·도 이름으로 시작하면 먼저 지자체로 본다. */
const isCentralOrg = (org) => {
  const t = (org ?? "").trim();
  for (const sido of SIDO) if (t.startsWith(sido)) return false;
  if (/(특별시|광역시|특별자치시|특별자치도|도|시|군|구|교육청)$/.test(t)) return false;
  return /(부|처|청|위원회|공단|공사|원|본부|관리원)$/.test(t);
};

/** 급여 종류·대상 낱말. 서로 다르면 다른 사업으로 본다. */
const KEY_RE =
  /(생계|주거|교육|의료|해산|장제|자활)급여|장애인|아동|청년|노인|한부모|다자녀|임산부|산모|어르신|청소년/g;
const keysOf = (s) => new Set((s ?? "").match(KEY_RE) ?? []);
const sameKeys = (a, b) => {
  const A = keysOf(a);
  const B = keysOf(b);
  if (A.size !== B.size) return false;
  for (const x of A) if (!B.has(x)) return false;
  return true;
};

const MIN_SCORE = 0.75;

const indexed = list.map((g) => ({
  g,
  bg: bigrams(g["서비스명"]),
  org: (g["소관기관명"] ?? "").trim(),
}));

const matched = [];
const rejected = [];

for (const s of ours) {
  const central = s.provider === "central";
  const bg = bigrams(s.name);
  let best = null;
  let bestScore = 0;

  for (const c of indexed) {
    if (central !== isCentralOrg(c.org)) continue;
    if (!central) {
      /* 시·도와 시·군·구는 **낱말째 같아야** 한다. 앞 두 글자로 보던 때
         「경상남도교육청」 사업이 「경상북도 김천시」에 붙었다(09-16 리뷰 —
         경상남·북, 충청남·북이 둘 다 「경상」「충청」이 된다). */
      const parts = c.org.split(/\s+/);
      if (parts[0] !== s.sidoName) continue;
      /* ④ 급이 같아야 한다 — 도(道) 사업이 그 안의 시·군 사업과 붙는 것을 막는다.
         「충북 청년 월세 지원」이 「옥천군 청년 월세 지원」에 붙었다(09-16 실측).
         같은 이름이라도 집행 주체가 다르면 구비서류·기한이 다를 수 있다.
         시·군·구 칸이 비었어도 담당 부서가 「강원특별자치도 인제군 …」이면 군 사업이다. */
      const deptSgg = (s.department ?? "").split(/\s+/)[1];
      const ourSgg = s.sigunguName ?? (/(시|군|구)$/.test(deptSgg ?? "") ? deptSgg : null);
      const govSgg = parts[1] && /(시|군|구)$/.test(parts[1]) ? parts[1] : null;
      if (ourSgg !== govSgg) continue;
    }
    const score = dice(bg, c.bg);
    if (score > bestScore) {
      bestScore = score;
      best = c.g;
    }
  }

  if (!best || bestScore < MIN_SCORE) continue;
  if (!sameKeys(s.name, best["서비스명"])) {
    rejected.push([s.name, best["서비스명"], bestScore.toFixed(2)]);
    continue;
  }

  const d = details.get(best["서비스ID"]) ?? {};
  const val = (k) => {
    const v = (d[k] ?? "").trim();
    return v && v !== "해당없음" ? v : null;
  };

  const row = {
    id: s.id,
    gid: best["서비스ID"],
    gname: best["서비스명"],
    gorg: (best["소관기관명"] ?? "").trim(),
    score: Number(bestScore.toFixed(2)),
    docs: val("구비서류"),
    officialDocs: val("공무원확인구비서류"),
    laws: val("법령"),
    localLaws: val("자치법규"),
    onlineUrl: val("온라인신청사이트URL"),
    deadline: val("신청기한"),
  };
  /* 새로 주는 것이 하나도 없으면 싣지 않는다 — 빈 절을 910쪽에 찍지 않으려는 것. */
  if (row.docs || row.laws || row.localLaws || row.onlineUrl || row.deadline) matched.push(row);
}

/* ⑤ 보조금24 사업 하나는 우리 사업 하나에만 붙는다. 「주거안정 월세대출」이
   「…월세대출 보증」(금융위원회)에도 붙었다(09-16 리뷰). 둘 이상이 한 사업을
   가리키면 이름이 똑같은(1) 하나만 남기고, 그런 것이 없으면 전부 버린다. */
const byGid = new Map();
for (const m of matched) byGid.set(m.gid, [...(byGid.get(m.gid) ?? []), m]);
for (const [gid, rows] of byGid) {
  if (rows.length < 2) continue;
  const exact = rows.filter((r) => r.score === 1);
  const keep = exact.length === 1 ? exact[0] : null;
  for (const r of rows) {
    if (r === keep) continue;
    matched.splice(matched.indexOf(r), 1);
    rejected.push([r.id, gid, "같은 보조금24 사업에 둘 이상 붙음"]);
  }
}

const out = `/* 자동 생성 — scripts/build-gov24.mjs. 손으로 고치지 않는다.
 *
 * 행정안전부 「대한민국 공공서비스(혜택) 정보」(보조금24)에서 우리 수록 사업과
 * **확실히 같은 것**만 골라 담았다(매칭 규칙은 그 스크립트 머리말).
 * 값은 원문 그대로이고, 화면에는 출처와 확인일을 함께 적는다.
 */
export type Gov24Row = {
  /** 우리 수록 사업 id */
  id: string;
  /** 보조금24 서비스ID */
  gid: string;
  gname: string;
  gorg: string;
  /** 이름 유사도(0~1). 0.75 미만은 아예 싣지 않는다. */
  score: number;
  docs: string | null;
  officialDocs: string | null;
  laws: string | null;
  localLaws: string | null;
  onlineUrl: string | null;
  deadline: string | null;
};

/** 보조금24 원본을 받아 대조한 날. */
export const GOV24_CHECKED = ${JSON.stringify(CHECKED)};

export const GOV24: Readonly<Record<string, Gov24Row>> = ${JSON.stringify(
  Object.fromEntries(matched.map((m) => [m.id, m])),
  null,
  1,
)};
`;

fs.writeFileSync(path.join("src", "data", "gov24.ts"), out);

const has = (f) => matched.filter((m) => m[f]).length;
console.log(`수록 ${ours.length}건 · 보조금24 ${list.length}건`);
console.log(`맞물린 것 ${matched.length}건 (유사도 ${MIN_SCORE} 이상 · 기관 급 일치 · 낱말 일치)`);
console.log(
  `  구비서류 ${has("docs")} · 법령 ${has("laws")} · 자치법규 ${has("localLaws")} · 온라인신청 ${has("onlineUrl")} · 신청기한 ${has("deadline")}`,
);
if (rejected.length) {
  console.log(`\n낱말이 달라 버린 것 ${rejected.length}건:`);
  for (const r of rejected.slice(0, 10)) console.log("  ", r.join("  →  "));
}
