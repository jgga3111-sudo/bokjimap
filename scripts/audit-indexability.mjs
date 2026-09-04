/**
 * 색인 가능성 점검 — 사이트맵에 넣어 놓고 정작 색인이 안 될 페이지를 잡는다.
 *
 * audit-sitemap.mjs는 **소스의 규칙**을 읽어 "몇 개가 나갈 것인가"를 센다.
 * 이 스크립트는 **빌드 결과물**을 읽어 "그게 색인될 수 있는 상태인가"를 본다.
 * 둘은 잡는 게 다르다. 규칙이 맞아도 렌더된 HTML이 틀릴 수 있다.
 *
 * 서치콘솔이 "색인 안 됨"으로 분류하는 사유 중, 배포 전에 잡을 수 있는 것:
 *
 *   제출된 URL에 noindex 태그가 있음  → 사이트맵과 robots가 어긋난 경우
 *   대체 페이지(적절한 표준 태그 포함) → canonical이 자기를 안 가리키는 경우
 *   중복 페이지, 사용자가 표준 미지정  → 제목·설명이 똑같은 페이지가 둘 이상
 *
 * 마지막 것이 제일 조용히 생긴다. 2026-09-04에 `/theme/pregnancy-birth`와
 * `/life/pregnancy`의 <title>이 글자까지 같았다. 내용은 26건 대 114건으로
 * 전혀 달랐는데도 제목만 보면 같은 페이지다. 축이 다르면 제목도 달라야 한다.
 *
 * 실행 전에 `npx next build`가 끝나 있어야 한다(빌드 산출물을 읽는다).
 */
import { readFileSync, existsSync } from "node:fs";

const APP = ".next/server/app";
const SITEMAP = `${APP}/sitemap.xml.body`;
const ORIGIN = "https://bokjiclick.co.kr";

if (!existsSync(SITEMAP)) {
  console.error("빌드 산출물이 없다. 먼저 `npx next build`를 돌린다.");
  process.exit(1);
}

const urls = [...readFileSync(SITEMAP, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1],
);

/** URL을 프리렌더된 HTML 경로로. 홈은 `/`가 아니라 `index.html`이다. */
const htmlPath = (url) => {
  const path = url.replace(ORIGIN, "");
  return `${APP}${path === "" || path === "/" ? "/index" : path}.html`;
};

const missing = [];
const noindexed = [];
const badCanonical = [];
const byTitle = new Map();
const byDescription = new Map();

/**
 * 어느 목록에서도 링크되지 않는 상세 — **고아.**
 *
 * 사이트맵에만 있고 사이트 안에서는 갈 길이 없는 페이지다. 구글은 사이트맵으로
 * 발견은 하지만 "어디서도 안 걸리는 페이지"로 보고 뒤로 미룬다. 사람은 아예
 * 도달할 수 없다.
 *
 * 이 검사를 넣은 계기(2026-09-04): `/benefit/[slug]`가 상위 60건에서 잘려
 * 「국민내일배움카드제」가 사이트 어디에도 링크되지 않고 있었다. 목록 상한은
 * 무게를 줄이려고 걸었는데, 그 대가가 눈에 안 보였던 것이다. 상한을 다시
 * 만질 때마다 이 줄이 알려 준다.
 */
const linkedFrom = new Set();

for (const url of urls) {
  const file = htmlPath(url);
  if (!existsSync(file)) {
    missing.push(url);
    continue;
  }
  const html = readFileSync(file, "utf8");

  /* 상세가 아닌 페이지(목록·허브)가 거는 상세 링크를 모은다. 상세끼리
     거는 링크는 세지 않는다 — 상세 A에서만 걸리는 상세 B도 고아다. */
  if (!/^\/service\/WLF/.test(url.replace(ORIGIN, ""))) {
    for (const m of html.matchAll(/\/service\/(WLF\d+)/g)) linkedFrom.add(m[1]);
  }

  if (/noindex/i.test(html)) noindexed.push(url);

  const canonical = html.match(/rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  if (canonical !== url) badCanonical.push(`${url}  →  ${canonical ?? "없음"}`);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const desc = html.match(/name="description" content="([^"]*)"/)?.[1] ?? "";
  byTitle.set(title, [...(byTitle.get(title) ?? []), url]);
  byDescription.set(desc, [...(byDescription.get(desc) ?? []), url]);
}

const dupes = (map) =>
  [...map.entries()]
    .filter(([key, list]) => key !== "" && list.length > 1)
    .sort((a, b) => b[1].length - a[1].length);

const dupTitles = dupes(byTitle);
const dupDescs = dupes(byDescription);

const short = (url) => url.replace(ORIGIN, "");
const line = "─".repeat(52);

console.log(line);
console.log(`색인 가능성 점검 — 사이트맵 ${urls.length}개`);
console.log(line);

/* 사이트맵에 든 상세 중, 어떤 목록에서도 링크되지 않은 것. */
const orphans = urls
  .map((u) => u.replace(ORIGIN, "").match(/^\/service\/(WLF\d+)$/)?.[1])
  .filter((id) => id && !linkedFrom.has(id));

const problems = [
  ["HTML이 없다 (사이트맵에만 있는 URL)", missing.map(short)],
  ["어느 목록에서도 링크되지 않는다 (고아)", orphans],
  ["사이트맵에 있는데 noindex다", noindexed.map(short)],
  ["canonical이 자기를 안 가리킨다", badCanonical.map(short)],
  [
    "제목이 겹친다",
    dupTitles.map(([t, l]) => `[${t}]  ${l.map(short).join(" · ")}`),
  ],
  [
    "설명이 겹친다",
    dupDescs.map(([d, l]) => `[${d.slice(0, 40)}…]  ${l.map(short).join(" · ")}`),
  ],
];

let failed = 0;
for (const [label, items] of problems) {
  if (items.length === 0) {
    console.log(`  ✓ ${label} — 없음`);
    continue;
  }
  failed += items.length;
  console.log(`  ✗ ${label} — ${items.length}건`);
  for (const item of items.slice(0, 10)) console.log(`      ${item}`);
  if (items.length > 10) console.log(`      … 외 ${items.length - 10}건`);
}

console.log(line);
if (failed) {
  console.log(`${failed}건. 배포 전에 고친다.`);
  process.exit(1);
}
console.log("전부 통과. 사이트맵의 모든 URL이 색인 가능한 상태다.");
