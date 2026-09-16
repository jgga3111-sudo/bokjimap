/**
 * 보조금24(행정안전부 「대한민국 공공서비스(혜택) 정보」) 원본 받기 — 2026-09-16.
 *
 * ── 왜 두 번째 원천을 쓰나 ─────────────────────────────────────
 * 복지로 API에는 **구비서류·근거법령 조문·온라인 신청 주소**가 없다. 09-16 경쟁
 * 조사에서 해피나눔·토스·혜택포털이 전부 이 보조금24를 함께 쓰는 것을 확인했고,
 * 실제로 받아 보니 그 세 가지가 필드로 온다(우리 수록과 맞물린 412건 기준
 * 구비서류 331 · 법령 269 · 온라인 신청 URL 132).
 *
 * ── 쓰는 법 ────────────────────────────────────────────────────
 *   node --env-file=.env.local scripts/fetch-gov24.mjs
 * 받은 원본은 `data-research/gov24/`에 둔다(커밋하지 않는다 — 35MB).
 * 매칭과 수록은 `scripts/build-gov24.mjs`가 한다.
 *
 * ── 키 ─────────────────────────────────────────────────────────
 * `GOV24_SERVICE_KEY` — 복지로 키(`DATA_GO_KR_SERVICE_KEY_ENCODED`)와 **다른
 * 계정의 다른 키**다(2026-09-16 사용자가 새로 가입해 발급). 둘을 섞지 않는다.
 * 개발계정 한도는 하루 10,000건인데 이 스크립트는 한 번에 22콜만 쓴다.
 */
import fs from "node:fs";
import path from "node:path";

const KEY = process.env.GOV24_SERVICE_KEY;
if (!KEY) {
  console.error("GOV24_SERVICE_KEY 없음. --env-file=.env.local 을 붙였는지 확인.");
  process.exit(1);
}

const OUT = path.join("data-research", "gov24");
fs.mkdirSync(OUT, { recursive: true });

const PER_PAGE = 1000;

async function get(endpoint, page) {
  const q = new URLSearchParams({
    page: String(page),
    perPage: String(PER_PAGE),
    serviceKey: KEY,
  });
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await fetch(`https://api.odcloud.kr/api/gov24/v3/${endpoint}?${q}`);
    if (r.ok) return r.json();
    /* 401은 키 문제라 기다려도 안 된다 — 바로 알리고 멈춘다. */
    if (r.status === 401) throw new Error(`401 — 키가 이 API에 등록되지 않았다: ${await r.text()}`);
    await new Promise((s) => setTimeout(s, 1500));
  }
  throw new Error(`${endpoint} ${page}쪽 실패`);
}

async function all(endpoint) {
  const first = await get(endpoint, 1);
  const pages = Math.ceil(first.totalCount / PER_PAGE);
  let data = first.data;
  for (let p = 2; p <= pages; p++) {
    data = data.concat((await get(endpoint, p)).data);
    process.stdout.write(`\r${endpoint} ${data.length}/${first.totalCount}`);
  }
  fs.writeFileSync(path.join(OUT, `${endpoint}.json`), JSON.stringify(data));
  console.log(`\n${endpoint} ${data.length}건 저장`);
}

await all("serviceList");
await all("serviceDetail");
console.log(`\n받은 날: ${new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10) /* KST — UTC면 오전 9시 전에 어제가 된다 */} — build-gov24.mjs 를 이어서 돌린다.`);
