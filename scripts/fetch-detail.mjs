/**
 * 복지 서비스 **상세** 수집 — 조회수 높은 순.
 *
 *   node --env-file=.env.local scripts/fetch-detail.mjs [건수]
 *
 * 왜 조회수 순인가 ─────────────────────────────────────────────
 * 목록 API의 `inqNum`은 복지로에서 그 서비스가 조회된 누적 횟수다. 전체
 * 5,219건의 조회수 합에서
 *      상위  100건 = 77.1%   상위  500건 = 86.5%
 *      상위  300건 = 83.8%   상위 1000건 = 90.2%
 * 를 차지한다. 개발계정 한도가 하루 1,000콜인데 굳이 6일에 걸쳐 전량을 받을
 * 이유가 없다. **수요의 9할은 상위 1,000건 안에 있다.**
 *
 * ── 실측으로 배운 것 (2026-08-31) ──────────────────────────────
 *  1. 동시 4 + 무지연으로 돌렸더니 900건 중 732건이 HTTP 429였고,
 *     그 실패들이 **일일 1,000콜 한도를 그대로 소진**했다
 *     (errMsg LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR, code 22).
 *     → 동시 2 + 250ms 지연 + 지수 백오프로 낮췄다.
 *  2. 응답이 <wantedDtl>로 감싸여 있는데 래퍼를 안 벗기면 정규식이 문서
 *     전체를 한 건으로 삼켜 **본문 필드가 전부 사라진다**. 173건을 그렇게
 *     날렸다. → 원본 XML을 먼저 저장한다. 파싱이 틀려도 한도를 다시 안 쓴다.
 * ────────────────────────────────────────────────────────────
 *
 * 재개 가능: 이미 받은 servId는 건너뛴다. 중간에 끊겨도 다시 돌리면 이어진다.
 */
import { mkdir, writeFile, readdir } from "node:fs/promises";
import { readFileSync } from "node:fs";

const KEY = process.env.DATA_GO_KR_SERVICE_KEY_ENCODED;
if (!KEY) {
  console.error("DATA_GO_KR_SERVICE_KEY_ENCODED 없음. --env-file=.env.local 확인.");
  process.exit(1);
}

const LIMIT = Number(process.argv[2] ?? 900);
const OUT = "data-research/detail";
const RAW = "data-research/detail-raw";
const CONCURRENCY = 2;
const DELAY_MS = 250;

const ENDPOINT = {
  central:
    "http://apis.data.go.kr/B554287/NationalWelfareInformationsV001/NationalWelfaredetailedV001",
  local:
    "http://apis.data.go.kr/B554287/LocalGovernmentWelfareInformations/LcgvWelfaredetailed",
};

const RE_LIST = /<(\w+List)>([\s\S]*?)<\/\1>/g;
const RE_TAG = /<(\w+)>([\s\S]*?)<\/\1>/g;

/** 상세 XML → 객체. <wantedDtl> 래퍼를 반드시 먼저 벗긴다(위 주석 2번). */
export function parseDetail(xml) {
  const inner = xml.match(/<wantedDtl>([\s\S]*)<\/wantedDtl>/);
  let body = inner ? inner[1] : xml.replace(/<\?xml[^>]*\?>/, "");

  const lists = {};
  for (const m of body.matchAll(RE_LIST)) {
    const item = {};
    for (const f of m[2].matchAll(RE_TAG)) item[f[1]] = f[2].trim();
    (lists[m[1]] ??= []).push(item);
  }
  body = body.replace(RE_LIST, "");

  const rec = {};
  for (const f of body.matchAll(RE_TAG)) {
    const v = f[2].trim();
    if (v) rec[f[1]] = v;
  }
  return { ...rec, ...lists };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchOne(provider, servId, attempt = 0) {
  const url = `${ENDPOINT[provider]}?serviceKey=${KEY}&callTp=D&servId=${servId}`;
  const res = await fetch(url);
  const xml = await res.text();

  if (/LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS/.test(xml)) {
    const err = new Error("일일 요청한도 초과(code 22)");
    err.quota = true;
    throw err;
  }
  if (res.status === 429) {
    if (attempt >= 5) throw new Error("HTTP 429 (재시도 5회 초과)");
    await sleep(800 * 2 ** attempt);
    return fetchOne(provider, servId, attempt + 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (!xml.includes("<servNm>")) {
    throw new Error(xml.slice(0, 200).replace(/\s+/g, " "));
  }
  return xml;
}

const raw = JSON.parse(readFileSync("data-research/parsed.json", "utf8"));
const ranked = [
  ...raw.central.map((r) => ({ ...r, provider: "central" })),
  ...raw.local.map((r) => ({ ...r, provider: "local" })),
].sort((a, b) => Number(b.inqNum) - Number(a.inqNum));

await mkdir(OUT, { recursive: true });
await mkdir(RAW, { recursive: true });

/* 본문이 실제로 들어 있는 것만 "받았다"고 본다. 예전 파서 버그로 리스트만
   남은 파일은 다시 받아야 하므로 done에서 뺀다. */
const done = new Set(
  (await readdir(RAW)).filter((f) => f.endsWith(".xml")).map((f) => f.slice(0, -4)),
);
console.log(`이미 받은 상세(원본 보유): ${done.size}건`);

const todo = ranked.filter((r) => !done.has(r.servId)).slice(0, LIMIT);
console.log(
  `이번 실행: ${todo.length}건 (조회수 ${todo[0]?.inqNum} ~ ${todo.at(-1)?.inqNum})`,
);

let ok = 0;
let fail = 0;
let cursor = 0;
let stop = null;

async function worker() {
  while (cursor < todo.length && !stop) {
    const r = todo[cursor++];
    try {
      const xml = await fetchOne(r.provider, r.servId);
      await writeFile(`${RAW}/${r.servId}.xml`, xml);
      await writeFile(
        `${OUT}/${r.servId}.json`,
        JSON.stringify(
          { provider: r.provider, list: r, detail: parseDetail(xml) },
          null,
          1,
        ),
      );
      ok++;
      if (ok % 50 === 0) console.log(`  ${ok}/${todo.length} ...`);
      await sleep(DELAY_MS);
    } catch (e) {
      fail++;
      console.error(`  실패 ${r.servId} (${r.servNm}): ${e.message}`);
      if (e.quota) stop = "일일 한도 소진 — 내일 다시 실행하면 이어받는다";
      if (fail > 20 && ok === 0) stop = "연속 실패 — 중단";
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));

console.log(`\n성공 ${ok} / 실패 ${fail}${stop ? `\n중단: ${stop}` : ""}`);
console.log(`누적 상세: ${done.size + ok}건`);
