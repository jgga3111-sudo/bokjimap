/**
 * 원본 수집물 → `src/data/services.ts`
 *
 *   node scripts/build-data.mjs [수록건수]
 *
 * 입력
 *   data-research/parsed.json      목록 API 전량(5,219건)
 *   data-research/detail-raw/*.xml 상세 API 원본(받은 만큼)
 *
 * 정렬 기준은 **복지로 조회수(inqNum)** 다. 사람들이 실제로 많이 찾아본 순서로
 * 수록한다(docs/02 — 얇은 페이지 대량 생성은 색인에서 손해).
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";

const LIMIT = Number(process.argv[2] ?? 600);
const DETAIL_RAW = "data-research/detail-raw";

const RE_LIST = /<(\w+List)>([\s\S]*?)<\/\1>/g;
const RE_TAG = /<(\w+)>([\s\S]*?)<\/\1>/g;

function parseDetail(xml) {
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

/** XML 엔티티 복원 + 캐리지리턴을 줄바꿈으로. 원문 내용은 바꾸지 않는다. */
function clean(v) {
  if (!v) return null;
  const s = v
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#13;", "\n")
    .replace(/\r\n?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return s || null;
}

const splitCsv = (v) =>
  v ? v.split(",").map((x) => x.trim()).filter(Boolean) : [];

/** 축 슬러그 변환 — src/lib/axes.ts의 값 목록과 같아야 한다. */
const TARGET_SLUG = {
  저소득: "low-income",
  장애인: "disability",
  보훈대상자: "veteran",
  "한부모·조손": "single-parent",
  다자녀: "multi-child",
  "다문화·탈북민": "multicultural",
};
const LIFE_SLUG = {
  "임신 · 출산": "pregnancy",
  영유아: "infant",
  아동: "child",
  청소년: "teen",
  청년: "youth",
  중장년: "middle-age",
  노년: "senior",
};
const toSlugs = (raw, map) =>
  splitCsv(raw)
    .map((v) => map[v])
    .filter(Boolean);

/**
 * "기준 중위소득 60% 이하" 같은 문장에서 퍼센트를 읽는다.
 *
 * 여러 개가 나오면 **가장 큰 값**을 쓴다. 사업 문서는 보통 "생계급여 32%,
 * 차상위 50% …"처럼 좁은 기준부터 나열하는데, 이용자 입장에서 알아야 할 건
 * "여기까지는 해당된다"는 상한이기 때문이다.
 * 명시가 없으면 null. 짐작하지 않는다.
 */
function readMedianPercent(text) {
  if (!text) return null;
  const hits = [
    ...text.matchAll(/중위\s*소득\s*(?:의\s*)?(\d{2,3})\s*(?:%|퍼센트)/g),
  ].map((m) => Number(m[1]));
  const valid = hits.filter((n) => n >= 20 && n <= 300);
  return valid.length ? Math.max(...valid) : null;
}

const ymd = (v) =>
  v && /^\d{8}$/.test(v) ? `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6)}` : null;

/** <xxxList> 항목을 {name, url}로. 필드명이 두 API에서 다르다. */
function links(list) {
  return (list ?? []).map((x) => ({
    name: clean(x.servSeDetailNm ?? x.wlfareInfoReldNm) ?? "",
    url: clean(x.servSeDetailLink ?? x.wlfareInfoReldCn),
  }));
}

const raw = JSON.parse(readFileSync("data-research/parsed.json", "utf8"));
const ranked = [
  ...raw.central.map((r) => ({ ...r, provider: "central" })),
  ...raw.local.map((r) => ({ ...r, provider: "local" })),
].sort((a, b) => Number(b.inqNum) - Number(a.inqNum));

let withDetail = 0;

const services = ranked.slice(0, LIMIT).map((l) => {
  const path = `${DETAIL_RAW}/${l.servId}.xml`;
  const d = existsSync(path) ? parseDetail(readFileSync(path, "utf8")) : {};
  if (Object.keys(d).length) withDetail++;

  const eligibility = clean(d.tgtrDtlCn ?? d.sprtTrgtCn);
  const selection = clean(d.slctCritCn);

  return {
    id: l.servId,
    name: clean(l.servNm),
    provider: l.provider,
    views: Number(l.inqNum) || 0,

    sidoName: clean(l.ctpvNm),
    sigunguName: clean(l.sggNm),
    department: clean(l.jurMnofNm ?? l.bizChrDeptNm) ,

    targets: toSlugs(l.trgterIndvdlNmArray ?? l.trgterIndvdlArray, TARGET_SLUG),
    lifeStages: toSlugs(l.lifeNmArray ?? l.lifeArray, LIFE_SLUG),
    themes: splitCsv(l.intrsThemaArray),

    payTypes: splitCsv(l.srvPvsnNm),
    cycle: clean(l.sprtCycNm),
    applyMethods: splitCsv(l.aplyMtdNm ?? d.aplyMtdNm),
    onlineApply:
      l.onapPsbltYn === "Y" ? true : l.onapPsbltYn === "N" ? false : null,

    summary: clean(l.servDgst),
    outline: clean(d.wlfareInfoOutlCn),
    eligibility,
    selectionCriteria: selection,
    supportContent: clean(d.alwServCn),
    applyMethod: clean(d.aplyMtdCn),
    applySteps: links(d.applmetList)
      .map((x) => x.url)
      .filter(Boolean),

    medianPercent:
      readMedianPercent([eligibility, selection].filter(Boolean).join(" ")) ??
      readMedianPercent(clean(l.servDgst)),

    applyStart: ymd(d.enfcBgngYmd),
    applyEnd: ymd(d.enfcEndYmd),

    contacts: links(d.inqplCtadrList).filter((x) => x.url),
    homepages: links(d.inqplHmpgReldList).filter((x) => x.url),
    lawBasis: links(d.baslawList).map((x) => x.name).filter(Boolean),
    forms: links(d.basfrmList).filter((x) => x.url),

    officialUrl: clean(l.servDtlLink),
    baseYear: clean(d.crtrYr),
    updatedAt: ymd(l.lastModYmd ?? d.lastModYmd),
  };
});

const today = new Date(Date.now() + 9 * 3600_000).toISOString().slice(0, 10);

const header = `import type { WelfareService } from "@/types/welfare";

/**
 * 복지 서비스 데이터 — **자동 생성 파일. 직접 고치지 말 것.**
 *
 *   node scripts/build-data.mjs
 *
 * 수록 기준: 복지로 누적 조회수(inqNum) 상위 ${LIMIT}건.
 * 전체 5,219건 중 상위 500건이 전체 조회수의 86.5%를 차지한다 — 사람들이
 * 실제로 찾는 것부터 채운다(docs/02).
 *
 * 생성 시각: ${today} · 상세 본문 확보 ${withDetail}/${services.length}건
 */
export const services: readonly WelfareService[] = `;

writeFileSync(
  "src/data/services.ts",
  header +
    JSON.stringify(services, null, 1) +
    `;\n\n/** 데이터 파일을 마지막으로 갱신한 날. sitemap의 lastmod에 쓴다. */\nexport const SERVICES_UPDATED = "${today}";\n`,
);

/*
  검색 색인을 **별도 파일로** 뽑는다.

  처음엔 search.ts에서 services를 import해 색인을 만들었다. 그랬더니 검색창이
  클라이언트 컴포넌트라 **services.ts 전체가 브라우저 번들에 실렸다** —
  요약문·복지로 링크·문의처까지 전부. 청크 하나가 528KB가 됐다.
  번들러는 "이 배열에서 필드 몇 개만 쓴다"를 알 수 없으니 원본을 통째로 넣는다.

  그래서 필요한 것만 담은 파일을 여기서 만든다. 배열의 배열로 쓰는 이유는
  객체로 하면 키 이름이 600번 반복되기 때문이다(44.9KB → 32.9KB).
*/
const index = services.map((s) => [
  s.id.replace("WLF", ""),
  s.name ?? "",
  s.provider === "central"
    ? "전국"
    : [s.sidoName, s.sigunguName].filter(Boolean).join(" "),
  s.department ?? "",
  s.views,
]);

writeFileSync(
  "src/data/searchIndex.ts",
  `/**
 * 검색 색인 — **자동 생성 파일. 직접 고치지 말 것.**
 *
 *   node scripts/build-data.mjs
 *
 * [id(WLF 접두사 제거), 서비스명, 지역, 담당부처, 복지로 조회수]
 *
 * services.ts를 클라이언트 컴포넌트에서 import하면 전체 데이터가 번들에
 * 실린다. 검색에 필요한 필드만 여기 담아 그걸 막는다.
 */
export type SearchRow = [string, string, string, string, number];

export const SEARCH_INDEX: SearchRow[] = ${JSON.stringify(index)};
`,
);
console.log(
  `검색 색인 ${index.length}건 / ${(JSON.stringify(index).length / 1024).toFixed(1)}KB`,
);

const bodyLen = services.map(
  (s) =>
    [s.outline, s.summary, s.eligibility, s.selectionCriteria, s.supportContent, s.applyMethod]
      .filter(Boolean)
      .join("").length,
);
bodyLen.sort((a, b) => a - b);
console.log(`수록 ${services.length}건 / 상세 본문 확보 ${withDetail}건`);
console.log(
  `본문 길이  중앙값 ${bodyLen[bodyLen.length >> 1]}  200자 이상 ${bodyLen.filter((x) => x >= 200).length}건`,
);
console.log(
  `중위소득 % 판독 ${services.filter((s) => s.medianPercent !== null).length}건`,
);
