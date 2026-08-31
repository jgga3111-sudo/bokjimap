/**
 * 복지 서비스 원본 수집.
 *
 *   node --env-file=.env.local scripts/fetch-welfare.mjs
 *
 * 두 API에서 전량을 받아 **원본 XML 그대로** `data-research/raw/`에 저장하고,
 * 축(지역·대상·생애주기)에 실제로 어떤 값이 들어 있는지 집계해 보여준다.
 *
 * 왜 여기서 도메인 모델로 변환하지 않는가 — 원본을 먼저 눈으로 확인하고 축을
 * 확정한 다음에 변환해야, 값을 잘못 해석한 채 굳어지는 일이 없다. 변환은 축을
 * 확정한 뒤 별도 스크립트에서 한다.
 *
 * ── API 관측 사실 (2026-08-31 실측) ──────────────────────────────
 *  · 필수 파라미터: callTp=L, srchKeyCode=003 (둘 중 하나만 빠져도 resultCode 10)
 *  · numOfRows 1000 정상, 100 정상, **500은 resultCode 99로 실패**(원인 불명)
 *  · 중앙부처 totalCount 461 / 지자체 totalCount 4758
 *  · 개발계정 일 1,000콜 한도 → 1000건씩 받으면 전량 6콜
 * ────────────────────────────────────────────────────────────────
 */
import { mkdir, writeFile } from "node:fs/promises";

const KEY = process.env.DATA_GO_KR_SERVICE_KEY_ENCODED;
if (!KEY) {
  console.error(
    "DATA_GO_KR_SERVICE_KEY_ENCODED 가 없다. --env-file=.env.local 을 붙였는지 확인.",
  );
  process.exit(1);
}

const SOURCES = [
  {
    id: "central",
    label: "중앙부처",
    url: "http://apis.data.go.kr/B554287/NationalWelfareInformationsV001/NationalWelfarelistV001",
  },
  {
    id: "local",
    label: "지자체",
    url: "http://apis.data.go.kr/B554287/LocalGovernmentWelfareInformations/LcgvWelfarelist",
  },
];

const PAGE_SIZE = 1000;
const RAW_DIR = "data-research/raw";

/** 응답에서 단일 태그 값을 꺼낸다. 없으면 null — 빈 문자열로 뭉개지 않는다. */
function tag(xml, name) {
  const m = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? m[1].trim() || null : null;
}

/** <servList> 블록을 필드 객체 배열로 쪼갠다. */
function records(xml) {
  return [...xml.matchAll(/<servList>([\s\S]*?)<\/servList>/g)].map((m) => {
    const rec = {};
    for (const f of m[1].matchAll(/<(\w+)>([\s\S]*?)<\/\1>/g)) {
      rec[f[1]] = f[2].trim();
    }
    return rec;
  });
}

async function fetchPage(src, pageNo) {
  const url =
    `${src.url}?serviceKey=${KEY}` +
    `&callTp=L&srchKeyCode=003&pageNo=${pageNo}&numOfRows=${PAGE_SIZE}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${src.label} p${pageNo}: HTTP ${res.status}`);
  const xml = await res.text();

  const code = tag(xml, "resultCode");
  if (code !== "0") {
    throw new Error(
      `${src.label} p${pageNo}: resultCode=${code} ${tag(xml, "resultMessage")}`,
    );
  }
  return xml;
}

async function collect(src) {
  await mkdir(RAW_DIR, { recursive: true });

  const first = await fetchPage(src, 1);
  const total = Number(tag(first, "totalCount"));
  const pages = Math.ceil(total / PAGE_SIZE);
  const all = records(first);
  await writeFile(`${RAW_DIR}/${src.id}-p1.xml`, first);

  for (let p = 2; p <= pages; p++) {
    const xml = await fetchPage(src, p);
    await writeFile(`${RAW_DIR}/${src.id}-p${p}.xml`, xml);
    all.push(...records(xml));
  }

  // 서버가 알려준 총건수와 실제로 받은 건수가 다르면 조용히 넘어가지 않는다.
  if (all.length !== total) {
    console.warn(
      `  ⚠ ${src.label}: totalCount=${total} 인데 ${all.length}건 수신 — 확인 필요`,
    );
  }
  console.log(`  ${src.label}: ${all.length}건 (${pages}콜)`);
  return all;
}

/** 쉼표로 이어진 다중값 필드를 펼쳐 값별 건수를 센다. */
function tally(rows, field) {
  const counts = new Map();
  let missing = 0;
  for (const r of rows) {
    const raw = r[field];
    if (!raw) {
      missing++;
      continue;
    }
    for (const v of raw.split(",").map((s) => s.trim()).filter(Boolean)) {
      counts.set(v, (counts.get(v) ?? 0) + 1);
    }
  }
  return { counts: [...counts].sort((a, b) => b[1] - a[1]), missing };
}

function report(title, rows, field) {
  const { counts, missing } = tally(rows, field);
  console.log(`\n── ${title} (${field}) — 고유값 ${counts.length}개, 값 없음 ${missing}건`);
  for (const [v, n] of counts.slice(0, 30)) {
    console.log(`   ${String(n).padStart(5)}  ${v}`);
  }
  if (counts.length > 30) console.log(`   … 외 ${counts.length - 30}개`);
}

const [central, local] = await Promise.all(SOURCES.map(collect));

console.log(`\n합계 ${central.length + local.length}건`);

report("지자체 시·도", local, "ctpvNm");
report("지자체 시·군·구", local, "sggNm");
report("지자체 대상", local, "trgterIndvdlNmArray");
report("지자체 생애주기", local, "lifeNmArray");
report("중앙부처 소관부처", central, "jurMnofNm");
report("중앙부처 관심주제", central, "intrsThemaArray");

await writeFile(
  "data-research/parsed.json",
  JSON.stringify({ central, local }, null, 2),
);
console.log("\ndata-research/parsed.json 저장 완료");
