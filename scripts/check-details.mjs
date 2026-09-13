/**
 * 상세 원본 **내용 대조** — 다시 받은 상세가 예전 원본과 실제로 달라졌는가.
 *
 *   node scripts/check-details.mjs <날짜폴더>
 *
 * `check-updates.mjs`가 고른 servId를 `detail-before/`에 백업해 두고
 * `detail-raw/`에서 지운 뒤 `fetch-detail.mjs`로 다시 받은 상태에서 돌린다.
 *
 * ── 달라 보이지만 달라진 게 아닌 것 (2026-09-07 재수집에서 배움) ──
 *  · 쉼표 목록의 **순서**가 호출마다 흔들린다("저소득, 장애인" ↔ "장애인, 저소득").
 *  · `<xxxList>` 안의 항목 **순서**도 흔들린다.
 *  · 조회수 카운터(`inqNum`)는 날마다 오른다.
 * 이것들만 다른 파일은 **내용이 같은 것**으로 본다. 그대로 원본을 바꾸면 다음
 * build-data가 순서만 다른 diff를 만들고 사이트맵 lastmod가 거짓으로 밀린다.
 */
import { readFileSync, readdirSync } from "node:fs";

const STAMP = process.argv[2];
if (!STAMP) {
  console.error("날짜 폴더를 주세요 — node scripts/check-details.mjs 2026-09-13");
  process.exit(1);
}
const DIR = `data-research/check/${STAMP}`;
const IGNORE = new Set(["inqNum"]);

const flat = (s) => s.replace(/\s+/g, " ").trim();
const sortCsv = (s) => (s.includes(",") ? s.split(",").map((x) => x.trim()).filter(Boolean).sort().join(",") : s);

function parse(xml) {
  const inner = xml.match(/<wantedDtl>([\s\S]*)<\/wantedDtl>/);
  let body = inner ? inner[1] : xml;
  const lists = {};
  body = body.replace(/<(\w+List)>([\s\S]*?)<\/\1>/g, (_, name, content) => {
    const item = [...content.matchAll(/<(\w+)>([\s\S]*?)<\/\1>/g)]
      .map((m) => `${m[1]}=${flat(m[2])}`)
      .sort()
      .join("|");
    (lists[name] ??= []).push(item);
    return "";
  });
  const out = {};
  for (const m of body.matchAll(/<(\w+)>([\s\S]*?)<\/\1>/g)) {
    if (IGNORE.has(m[1])) continue;
    out[m[1]] = sortCsv(flat(m[2]));
  }
  for (const [name, items] of Object.entries(lists)) out[name] = items.sort().join(" ## ");
  return out;
}

const services = readFileSync("src/data/services.ts", "utf8");
const listed = JSON.parse(services.slice(services.indexOf("= [") + 2, services.lastIndexOf("]") + 1));
const rank = new Map(listed.map((s, i) => [s.id, { rank: i + 1, name: s.name }]));

const files = readdirSync(`${DIR}/detail-before`).filter((f) => f.endsWith(".xml"));
let same = 0;
const changed = [];
for (const f of files) {
  const id = f.replace(".xml", "");
  const a = parse(readFileSync(`${DIR}/detail-before/${f}`, "utf8"));
  const b = parse(readFileSync(`data-research/detail-raw/${f}`, "utf8"));
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])];
  const diffs = keys.filter((k) => (a[k] ?? "") !== (b[k] ?? ""));
  if (!diffs.length) {
    same++;
    continue;
  }
  changed.push({ id, ...rank.get(id), diffs: diffs.map((k) => ({ k, before: a[k] ?? null, after: b[k] ?? null })) });
}

changed.sort((x, y) => x.rank - y.rank);
console.log(`대조 ${files.length}건 — 내용 같음 ${same} · 내용 달라짐 ${changed.length}`);
for (const c of changed) {
  console.log(`\n${c.rank}위 ${c.id} ${c.name}`);
  for (const d of c.diffs) {
    const cut = (v) => (v == null ? "(없음)" : v.length > 160 ? `${v.slice(0, 160)}…` : v);
    console.log(`  [${d.k}]`);
    console.log(`    전: ${cut(d.before)}`);
    console.log(`    후: ${cut(d.after)}`);
  }
}
