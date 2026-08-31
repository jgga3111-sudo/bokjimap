/**
 * 생성된 src/data/services.ts 정합성 점검.
 *
 *   node scripts/audit-data.mjs
 *
 * build-data.mjs를 돌린 뒤 항상 이걸 돌린다. 데이터가 조용히 틀어지는 걸
 * 화면에서 발견하면 이미 늦다. 검사 항목:
 *   id 중복·형식 / 이름 누락 / 중앙-지자체와 지역값의 앞뒤 / 조회수 정렬
 *   축 슬러그가 axes.ts와 일치하는지 / 시도명이 regions.ts fullName과 맞는지
 *   XML 엔티티 미복원 / CR 잔류 / 공백 / 이상한 URL / medianPercent 범위
 */
import { readFileSync } from "node:fs";
const src = readFileSync("src/data/services.ts", "utf8");
const json = src.slice(src.indexOf("= [") + 2, src.lastIndexOf("];") + 1);
const services = JSON.parse(json);
const problems = [];
const P = (t, m) => problems.push(`[${t}] ${m}`);

console.log(`총 ${services.length}건`);

// 1. 필수값
const ids = new Set();
for (const s of services) {
  if (!s.id) P("id", "id 없음");
  if (ids.has(s.id)) P("id", `중복 id ${s.id}`);
  ids.add(s.id);
  if (!s.name) P("name", `${s.id} 이름 없음`);
  if (!/^WLF\d+$/.test(s.id)) P("id", `URL에 위험한 id ${s.id}`);
  if (s.provider === "local" && !s.sidoName) P("region", `${s.id} 지자체인데 시도 없음: ${s.name}`);
  if (s.provider === "central" && s.sidoName) P("region", `${s.id} 중앙부처인데 시도 있음`);
  if (s.views === 0) P("views", `${s.id} 조회수 0`);
}

// 2. 정렬 확인
for (let i = 1; i < services.length; i++)
  if (services[i - 1].views < services[i].views) { P("sort", `조회수 정렬 깨짐 @${i}`); break; }

// 3. 축 슬러그가 axes.ts와 맞는가
const axes = readFileSync("src/lib/axes.ts", "utf8");
const slugs = new Set([...axes.matchAll(/slug:\s*"([a-z-]+)"/g)].map((m) => m[1]));
for (const s of services) {
  for (const t of [...s.targets, ...s.lifeStages])
    if (!slugs.has(t)) P("axis", `${s.id} 알 수 없는 슬러그 ${t}`);
}

// 4. 지역 매칭 — sitemap/region 페이지가 fullName으로 비교한다
const reg = readFileSync("src/lib/regions.ts", "utf8");
const fullNames = new Set([...reg.matchAll(/fullName:\s*"([^"]+)"/g)].map((m) => m[1]));
const sidoInData = new Set(services.map((s) => s.sidoName).filter(Boolean));
for (const n of sidoInData)
  if (!fullNames.has(n)) P("region", `데이터의 시도 "${n}" 가 regions.ts fullName에 없음`);
console.log(`데이터 시도 ${sidoInData.size}종 / regions.ts fullName ${fullNames.size}종`);

// 5. 텍스트 위생
for (const s of services) {
  for (const [k, v] of Object.entries(s)) {
    if (typeof v !== "string") continue;
    if (/&(amp|lt|gt|quot|#\d+);/.test(v)) P("entity", `${s.id}.${k} 엔티티 미복원: ${v.slice(0, 60)}`);
    if (v.includes("\r")) P("cr", `${s.id}.${k} CR 남음`);
    if (v !== v.trim()) P("trim", `${s.id}.${k} 공백`);
  }
}

// 6. URL
for (const s of services) {
  for (const l of [...s.contacts, ...s.homepages, ...s.forms])
    if (l.url && /[<>"]/.test(l.url)) P("url", `${s.id} 이상한 URL ${l.url.slice(0,50)}`);
  if (s.officialUrl && !s.officialUrl.startsWith("http")) P("url", `${s.id} officialUrl 비정상`);
}

// 7. medianPercent 범위
for (const s of services)
  if (s.medianPercent !== null && (s.medianPercent < 20 || s.medianPercent > 300))
    P("median", `${s.id} medianPercent ${s.medianPercent}`);

// 8. 통계
const stat = (f) => services.filter(f).length;
console.log(`중앙 ${stat(s=>s.provider==="central")} / 지자체 ${stat(s=>s.provider==="local")}`);
console.log(`요약 있음 ${stat(s=>s.summary)} / 대상태그 있음 ${stat(s=>s.targets.length)} / 생애주기 있음 ${stat(s=>s.lifeStages.length)}`);
console.log(`시군구 있음 ${stat(s=>s.sigunguName)} / medianPercent ${stat(s=>s.medianPercent!==null)}`);

const counts = {};
for (const p of problems) { const k = p.slice(0, p.indexOf("]") + 1); counts[k] = (counts[k]||0)+1; }
console.log("\n=== 문제 유형별 ===");
console.log(counts);
console.log("\n=== 샘플 (유형당 3건) ===");
const shown = {};
for (const p of problems) {
  const k = p.slice(0, p.indexOf("]") + 1);
  shown[k] = (shown[k]||0)+1;
  if (shown[k] <= 3) console.log(p);
}
console.log(`\n총 ${problems.length}건`);
