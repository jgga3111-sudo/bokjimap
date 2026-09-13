/**
 * 복지 서비스 **변경 점검** — 목록을 새로 받아 수록 기준 목록과 대조한다.
 *
 *   node --env-file=.env.local scripts/check-updates.mjs [날짜폴더]
 *
 * ── 왜 따로 만들었나 (2026-09-13) ──────────────────────────────
 * `build-data.mjs`는 `data-research/parsed.json`(2026-08-31 목록)의 조회수 순서로
 * 상위 900건을 고른다. 이 파일을 새 목록으로 **통째로 바꾸면** 조회수가 조금씩
 * 달라진 것만으로 900위 경계의 사업이 들고 나고, 이미 색인된 상세 페이지가
 * 404가 된다. 그래서 여기서는 **원본을 건드리지 않고** 새 목록을 날짜 폴더에
 * 받아 대조만 한다. 무엇을 반영할지는 이 보고서를 보고 사람이 정한다.
 *
 * API 콜: 중앙 1 + 지자체 5 = 6콜. 상세는 받지 않는다(한도가 따로 걸려 있다 —
 * fetch-detail.mjs 머리말 3번).
 *
 * ── 대조 규칙 ──────────────────────────────────────────────────
 *  · `inqNum`(조회수)은 비교하지 않는다. 날마다 오르는 카운터다.
 *  · 쉼표로 이어진 값(`lifeArray` 등)은 **정렬해서** 비교한다. 호출마다 순서가
 *    흔들린다(2026-09-07 재수집에서 20건이 순서만 달랐다).
 *  · 공백은 접어서 비교한다.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { readFileSync, existsSync } from "node:fs";

const KEY = process.env.DATA_GO_KR_SERVICE_KEY_ENCODED;
if (!KEY) {
  console.error("DATA_GO_KR_SERVICE_KEY_ENCODED 없음. --env-file=.env.local 확인.");
  process.exit(1);
}

const kst = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
const STAMP = process.argv[2] ?? kst;
const DIR = `data-research/check/${STAMP}`;

const SOURCES = [
  {
    id: "central",
    url: "http://apis.data.go.kr/B554287/NationalWelfareInformationsV001/NationalWelfarelistV001",
  },
  {
    id: "local",
    url: "http://apis.data.go.kr/B554287/LocalGovernmentWelfareInformations/LcgvWelfarelist",
  },
];

function tag(xml, name) {
  const m = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? m[1].trim() || null : null;
}

function records(xml) {
  return [...xml.matchAll(/<servList>([\s\S]*?)<\/servList>/g)].map((m) => {
    const rec = {};
    for (const f of m[1].matchAll(/<(\w+)>([\s\S]*?)<\/\1>/g)) rec[f[1]] = f[2].trim();
    return rec;
  });
}

async function fetchPage(src, pageNo) {
  const url = `${src.url}?serviceKey=${KEY}&callTp=L&srchKeyCode=003&pageNo=${pageNo}&numOfRows=1000`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${src.id} p${pageNo}: HTTP ${res.status}`);
  const xml = await res.text();
  const code = tag(xml, "resultCode");
  if (code !== "0") throw new Error(`${src.id} p${pageNo}: resultCode=${code} ${tag(xml, "resultMessage")}`);
  return xml;
}

async function collect(src) {
  /* 이미 받아 둔 날짜 폴더가 있으면 다시 부르지 않는다 — 한도를 아낀다. */
  const cached = `${DIR}/${src.id}.json`;
  if (existsSync(cached)) return JSON.parse(readFileSync(cached, "utf8"));

  const first = await fetchPage(src, 1);
  const total = Number(tag(first, "totalCount"));
  const pages = Math.ceil(total / 1000);
  const all = records(first);
  await writeFile(`${DIR}/${src.id}-p1.xml`, first);
  for (let p = 2; p <= pages; p++) {
    const xml = await fetchPage(src, p);
    await writeFile(`${DIR}/${src.id}-p${p}.xml`, xml);
    all.push(...records(xml));
  }
  if (all.length !== total) {
    throw new Error(`${src.id}: totalCount=${total}인데 ${all.length}건 — 목록이 덜 왔다. 대조하지 않는다.`);
  }
  await writeFile(cached, JSON.stringify(all));
  return all;
}

const norm = (v) => {
  if (v == null) return "";
  const s = String(v).replace(/\s+/g, " ").trim();
  return s.includes(",") ? s.split(",").map((x) => x.trim()).filter(Boolean).sort().join(",") : s;
};

await mkdir(DIR, { recursive: true });
const fresh = {};
for (const src of SOURCES) fresh[src.id] = await collect(src);

const old = JSON.parse(readFileSync("data-research/parsed.json", "utf8"));
const services = readFileSync("src/data/services.ts", "utf8");
const listed = JSON.parse(services.slice(services.indexOf("= [") + 2, services.lastIndexOf("]") + 1));
const listedIds = new Set(listed.map((s) => s.id));
const rankOf = new Map(listed.map((s, i) => [s.id, i + 1]));

const report = { stamp: STAMP, totals: {}, removed: [], added: [], changed: [] };

for (const src of SOURCES) {
  const before = new Map(old[src.id].map((r) => [r.servId, r]));
  const after = new Map(fresh[src.id].map((r) => [r.servId, r]));
  report.totals[src.id] = { before: before.size, after: after.size };

  for (const [id, r] of before) {
    if (!after.has(id)) {
      report.removed.push({
        id, provider: src.id, name: r.servNm, views: Number(r.inqNum) || 0,
        listed: listedIds.has(id), rank: rankOf.get(id) ?? null,
      });
    }
  }
  for (const [id, r] of after) {
    if (!before.has(id)) {
      report.added.push({
        id, provider: src.id, name: r.servNm, views: Number(r.inqNum) || 0,
        sido: r.ctpvNm ?? null, registered: r.svcfrstRegTs ?? null, lastMod: r.lastModYmd ?? null,
      });
    }
  }
  for (const [id, a] of after) {
    const b = before.get(id);
    if (!b || !listedIds.has(id)) continue;
    const fields = [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((f) => f !== "inqNum");
    const diffs = fields
      .filter((f) => norm(a[f]) !== norm(b[f]))
      .map((f) => ({ field: f, before: b[f] ?? null, after: a[f] ?? null }));
    if (diffs.length) {
      report.changed.push({ id, provider: src.id, name: a.servNm, rank: rankOf.get(id), diffs });
    }
  }
}

/* 새로 생긴 사업이 **지금 수록 900건의 맨 끝(900위) 조회수**를 넘는가.
   넘으면 조회수로는 수록 대상이지만, 넣을지는 사람이 정한다(위 머리말). */
const cutViews = Math.min(...listed.map((s) => s.views));
report.cutViews = cutViews;
report.added.sort((a, b) => b.views - a.views);
report.removed.sort((a, b) => (a.rank ?? 1e9) - (b.rank ?? 1e9));
report.changed.sort((a, b) => a.rank - b.rank);

await writeFile(`${DIR}/report.json`, JSON.stringify(report, null, 1));

console.log(`목록 대조 — ${STAMP} (기준: parsed.json 2026-08-31)`);
for (const [k, t] of Object.entries(report.totals)) console.log(`  ${k}: ${t.before} → ${t.after}`);
console.log(`\n없어진 사업 ${report.removed.length}건 (수록 900건 안: ${report.removed.filter((r) => r.listed).length})`);
for (const r of report.removed.filter((r) => r.listed)) console.log(`  ${r.rank}위 ${r.id} ${r.name}`);
console.log(`\n새로 생긴 사업 ${report.added.length}건 (수록 끝 조회수 ${cutViews} 이상: ${report.added.filter((r) => r.views >= cutViews).length})`);
for (const r of report.added.slice(0, 15)) console.log(`  조회 ${String(r.views).padStart(7)} ${r.id} ${r.provider} ${r.sido ?? ""} ${r.name}`);
console.log(`\n수록 900건 중 목록 항목이 바뀐 것 ${report.changed.length}건`);
const byField = {};
for (const c of report.changed) for (const d of c.diffs) byField[d.field] = (byField[d.field] ?? 0) + 1;
console.log("  항목별:", JSON.stringify(byField));
console.log(`\n보고서: ${DIR}/report.json`);
