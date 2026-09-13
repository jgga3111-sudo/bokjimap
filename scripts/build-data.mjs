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
import { readFileSync, writeFileSync, existsSync } from "node:fs";
/* 화면의 「지난 신청 기간」 띠와 **같은 함수**로 마감 표를 만든다(아래 closing.ts).
   Node 24는 .ts를 타입만 걷어 내고 읽는다 — 이 파일은 `import type`만 쓴다. */
import { statedApplyPeriod } from "../src/lib/applyPeriod.ts";

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

/**
 * XML 엔티티 복원.
 *
 * 이름 있는 엔티티 몇 개만 풀었더니 **숫자 엔티티가 그대로 화면에 나왔다.**
 * 공고문에는 항목 번호로 `&#9312;`(①) 같은 것이 흔하게 쓰여서, 지원대상
 * 문단이 "&#9312; 소득평가액이…"로 보였다. 정합성 점검이 23건을 잡았다.
 *
 * 그래서 `&#NNN;`과 `&#xHH;`를 통째로 푼다. 코드포인트 범위를 벗어난 값은
 * String.fromCodePoint가 예외를 던지므로 원문 그대로 둔다 — 한 건 때문에
 * 빌드 전체가 죽는 편이 훨씬 나쁘다.
 *
 * ⚠ `&amp;`는 **맨 마지막**에 푼다. 먼저 풀면 원문의 `&amp;#9312;`가
 * `&#9312;`가 됐다가 다시 ①로 바뀐다 — 원문에 없던 글자를 만들어 내는 셈이다.
 */
const decodeNumeric = (s) =>
  s
    .replace(/&#x([0-9a-fA-F]+);/g, (m, h) => codePoint(parseInt(h, 16), m))
    .replace(/&#(\d+);/g, (m, d) => codePoint(Number(d), m));

function decodeEntities(s) {
  return decodeNumeric(s)
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&");
}

function codePoint(n, original) {
  try {
    return String.fromCodePoint(n);
  } catch {
    return original;
  }
}

/**
 * 이름 있는 **기호** 엔티티.
 *
 * 2026-09-06에 찾았다. 숫자 엔티티(`&#9312;`)는 2차에서 풀고 있었는데
 * **이름 엔티티는 아무도 풀지 않아** 화면에 글자 그대로 나가고 있었다.
 * 900건 중 49건 · 148군데였고, 그 49건이 가져가는 조회수가 전체의 28.3%다
 * (장애인연금 3위, 주거급여 4위, 에너지바우처 5위, 기초연금 8위가 들어 있다).
 *
 *   화면에 나가던 것   …1년차 월 10만원 &rarr; 2년차 월 20만원…
 *   원문이 말한 것     …1년차 월 10만원 → 2년차 월 20만원…
 *
 * 실제로 나온 열한 종은 &rsquo; &lsquo; &sim; &times; &rarr; &ldquo; &rdquo;
 * &middot; &divide; &ge; &harr; 이고, 같은 자리에 언제든 올 수 있는 이웃
 * (다른 화살표·대시·분수·단위 기호)을 함께 넣었다.
 *
 * ⚠ `&amp; &lt; &gt; &quot; &apos;`는 **넣지 않는다.** 그 다섯은 1차에서 이미
 * 풀었고, 2차에서 또 풀면 원문에 없던 해독이 한 단계 더 일어난다(위 주석의
 * 이유와 같다). 여기 있는 것은 전부 구조와 무관한 기호뿐이라 두 번 풀려도
 * `<`나 `&`를 만들어 내지 않는다.
 */
const SYMBOL_ENTITIES = {
  // 따옴표·대시·말줄임
  rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“",
  sbquo: "‚", bdquo: "„", ndash: "–", mdash: "—",
  hellip: "…", bull: "•", middot: "·", sdot: "⋅",
  prime: "′", Prime: "″", laquo: "«", raquo: "»",
  // 화살표
  rarr: "→", larr: "←", uarr: "↑", darr: "↓",
  harr: "↔", rArr: "⇒", lArr: "⇐", hArr: "⇔",
  // 셈·비교
  times: "×", divide: "÷", plusmn: "±", minus: "−",
  ge: "≥", le: "≤", ne: "≠", asymp: "≈",
  sim: "∼", infin: "∞", radic: "√", sum: "∑",
  // 단위·표시
  deg: "°", permil: "‰", micro: "µ", copy: "©",
  reg: "®", trade: "™", sect: "§", para: "¶",
  dagger: "†", Dagger: "‡", curren: "¤",
  // 통화
  euro: "€", pound: "£", yen: "¥", cent: "¢",
  // 분수·윗첨자
  frac12: "½", frac14: "¼", frac34: "¾",
  sup1: "¹", sup2: "²", sup3: "³",
};

/* 긴 이름부터 맞춰 본다. 짧은 이름이 긴 이름의 앞머리인 짝(`sup`과 `sup2`
   같은)이 나중에 추가돼도 앞의 것이 먼저 걸려 뒤 글자가 남는 일이 없다. */
const RE_SYMBOL = new RegExp(
  `&(${Object.keys(SYMBOL_ENTITIES).sort((a, b) => b.length - a.length).join("|")});`,
  "g",
);

const decodeNamedSymbols = (s) => s.replace(RE_SYMBOL, (m, k) => SYMBOL_ENTITIES[k] ?? m);

/**
 * 엔티티 복원 + 캐리지리턴을 줄바꿈으로. 원문 내용은 바꾸지 않는다.
 *
 * 숫자 엔티티를 **두 번** 푼다. 원본이 이중 인코딩돼 있기 때문이다.
 *
 *   원본 XML   …※ &amp;#9312; 30세 이상…
 *   1차 해독   …※ &#9312; 30세 이상…      ← 여기서 멈추면 화면에 이대로 나온다
 *   2차 해독   …※ ① 30세 이상…
 *
 * 복지로 데이터베이스에 들어 있는 글자가 실제로 `&#9312;`다. 담당자가 항목
 * 번호를 HTML 엔티티로 적어 넣었고, API는 그 `&`를 규칙대로 `&amp;`로 감쌌다.
 * 그래서 XML을 제대로 풀어도 HTML 엔티티가 한 겹 남는다.
 *
 * 2차에서는 **숫자 엔티티와 기호 엔티티만** 푼다. `&amp;`를 또 풀면 원문에
 * 없던 해독이 한 단계 더 일어나 진짜 `&` 문자가 든 문장을 망가뜨릴 수 있다.
 * 남는 위험은 본문에 "&#13;"을 글자 그대로 설명하는 경우뿐인데, 복지 공고문에
 * 그런 문장은 없다.
 */
function clean(v) {
  if (!v) return null;
  const s = decodeNamedSymbols(decodeNumeric(decodeEntities(v)))
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

/**
 * 항목별 **다시 확인한 날** — `data-research/rechecks.json`.
 *
 * 2026-09-13 전에는 확인일이 `SERVICES_UPDATED` 하나뿐이었다. 그런데 그날
 * 상위 100건과 목록이 바뀐 9건(합 109건)만 원본을 다시 받아 대조했다. 날짜를
 * 오늘로 올리면 **안 본 791건까지 "09-13 확인"**이 되고, 그대로 두면 **본 109건이
 * "09-04 확인"**으로 남는다. 어느 쪽도 사실이 아니라 항목마다 따로 둔다(3절
 * `verifiedAt`).
 *
 *  · `checkedAt` — 원본을 다시 받아 대조한 날. 내용이 같았어도 확인은 한 것이다.
 *  · `changedAt` — 대조해서 **내용이 실제로 달라진** 날. 사이트맵 lastmod에 쓴다.
 *    같았던 99건은 여기 안 들어간다 — 안 바뀐 페이지의 lastmod를 밀면 거짓 신호다.
 *
 * 여러 번 점검하면 날짜 순으로 덮어써서 **가장 최근** 값이 남는다.
 */
const RECHECK = { checked: new Map(), changed: new Map(), added: new Map() };
if (existsSync("data-research/rechecks.json")) {
  const runs = JSON.parse(readFileSync("data-research/rechecks.json", "utf8"));
  for (const date of Object.keys(runs).sort()) {
    for (const id of runs[date].rechecked) RECHECK.checked.set(id, date);
    for (const id of runs[date].changed) RECHECK.changed.set(id, date);
    /* 그날 **처음** 수록한 것. 한 번 넣은 뒤로는 날짜를 덮어쓰지 않는다 —
       나중에 다시 점검해도 "처음 받은 날"은 그대로여야 한다. */
    for (const id of runs[date].added ?? []) {
      if (!RECHECK.added.has(id)) RECHECK.added.set(id, date);
    }
  }
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
    checkedAt: RECHECK.checked.get(l.servId) ?? null,
    changedAt: RECHECK.changed.get(l.servId) ?? null,
    addedAt: RECHECK.added.get(l.servId) ?? null,
  };
});

/**
 * 데이터를 **받은** 날. 이 파일을 생성한 날이 아니다.
 *
 * 상세 페이지 맨 아래가 이 값을 그대로 문장으로 쓴다 —
 * "공공데이터포털 데이터를 {이 날짜}에 받아 정리한 것입니다."
 *
 * 그래서 API를 다시 부르지 않고 **코드만 고쳐 다시 생성할 때** 오늘 날짜가
 * 들어가면 사실이 아닌 문장이 나간다. 게다가 sitemap의 허브 lastmod가 전부
 * 오늘로 밀려, 내용은 그대로인데 다 고친 것처럼 보이는 거짓 신호가 된다
 * (CLAUDE.md 4절 "lastmod를 나눠 쓴다").
 *
 * 그런 때는 원래 받은 날짜를 세 번째 인자로 준다.
 *
 *   node scripts/build-data.mjs 900 2026-09-04
 *
 * 새로 수집한 뒤라면 인자 없이 돌린다 — 오늘이 곧 받은 날이다.
 */
const todayKst = new Date(Date.now() + 9 * 3600_000).toISOString().slice(0, 10);
const today = process.argv[3] ?? todayKst;
if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) {
  console.error(`받은 날짜가 YYYY-MM-DD 꼴이 아니다: ${today}`);
  process.exit(1);
}

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

/*
  마감 표 — **끝나는 날이 적혀 있는 사업만** 뽑는다(2026-09-13).

  「마감」 딱지는 목록 카드·첫 화면 순위표·상세·「신청 기간이 지난 지원」 모음에
  붙는데, 그중 목록(HubList)과 모음은 **클라이언트 컴포넌트**다. 거기서 판정하려고
  services.ts를 부르면 2.9MB가 번들에 실린다(바로 위 검색 색인과 같은 이유).
  그래서 판정에 필요한 끝날만 따로 담는다. 수록 900건 중 열몇 건이다.

  **지났는지는 여기서 정하지 않는다.** 끝날만 적고 비교는 브라우저가 한다 —
  빌드한 날로 판정하면 배포를 안 하는 동안 조용히 틀려 간다(PastPeriodNotice 머리말).

  두 갈래를 구분해 둔다. 읽는 사람에게 할 말이 다르다.
   · `period`  본문에 적힌 **신청 기간**의 끝날(`statedApplyPeriod` — 상세의 띠와
               같은 함수). 해마다 다시 공고가 날 수 있다.
   · `program` 상세 API의 **사업 시행 종료일**(`enfcEndYmd`). `9999-…`는 상시라
               뺀다(`9999-12-21` 같은 오타값도 있다).
  둘 다 있으면 신청 기간을 쓴다 — 사업이 계속돼도 이번 신청은 끝났을 수 있다.
*/
/*
  셋째 갈래 `stated` — **원문이 스스로 마감이라고 적은 것**(2026-09-13 추가).
  날짜 규칙만으로는 안 잡혔다. 고양 청년둥지론은 사업명이 「… - 신청 마감」이고,
  청년 주택임차보증금 이자는 본문에 「<2025년도 신청 마감>」이 있다. 화면 점검 중
  허브 이름 목록에서 이름 끝의 "마감"을 딱지로 잘못 셌다가 알게 됐다.

  조건부 문장은 **마감이 아니다.** 「예산소진시 마감」·「조기 소진에 따른 마감
  가능」은 아직 안 끝났다는 뜻이라, 앞 12자에 `소진`·`시`가 붙거나 뒤에
  `가능`·`될`이 오면 거른다. 상병수당의 「'24.12월 사업종료」도 일부 지역 1단계
  얘기라 이 낱말(`사업종료`)은 아예 보지 않는다 — `(신청|접수|모집) 마감`만 본다.
  2026-09-13 수록 900건 실측: 이 규칙에 걸리는 것 3건(경기여성 취업지원금은
  신청 기간이 있어 period로 간다) → stated 2건.
*/
const STATED = /(\d{4}년도?\s*)?(신청|접수|모집)\s*마감/g;
function statedClosure(s) {
  const body = [s.name, s.summary, s.outline, s.supportContent, s.applyMethod, s.eligibility]
    .filter(Boolean)
    .join("\n");
  for (const m of body.matchAll(STATED)) {
    const before = body.slice(Math.max(0, m.index - 12), m.index);
    const after = body.slice(m.index + m[0].length, m.index + m[0].length + 4);
    if (/(소진|시)\s*$/.test(before) || /^\s*(가능|될|예정)/.test(after)) continue;
    return m[0].replace(/\s+/g, " ").trim();
  }
  return null;
}

const closing = {};
for (const s of services) {
  const p = statedApplyPeriod(s);
  const said = p ? null : statedClosure(s);
  if (p) {
    closing[s.id] = { kind: "period", end: p.end, text: p.text, name: s.name };
  } else if (said) {
    /* 날짜가 없다 — 원문이 끝났다고 말했으므로 오늘과 비교할 것이 없다. */
    closing[s.id] = { kind: "stated", end: null, text: said, name: s.name };
  } else if (s.applyEnd && !s.applyEnd.startsWith("9999")) {
    closing[s.id] = { kind: "program", end: s.applyEnd, text: `~ ${s.applyEnd}`, name: s.name };
  }
}

writeFileSync(
  "src/data/closing.ts",
  `/**
 * 마감 표 — **자동 생성 파일. 직접 고치지 말 것.**
 *
 *   node scripts/build-data.mjs
 *
 * 끝나는 날이 적혀 있는 사업의 끝날. 지났는지는 브라우저가 오늘과 비교한다
 * (\`components/DeadlineBadge.tsx\`). 만드는 규칙은 build-data.mjs의 마감 표 주석.
 */
export type Closing = {
  /** period = 본문의 신청 기간 · program = 사업 시행 종료일 · stated = 원문이 마감이라고 적음 */
  kind: "period" | "program" | "stated";
  /** YYYY-MM-DD. stated는 날짜가 없어 null이고, 늘 마감으로 본다. */
  end: string | null;
  /** 원문 조각 그대로 */
  text: string;
  name: string;
};

export const CLOSING: Readonly<Record<string, Closing>> = ${JSON.stringify(closing, null, 1)};
`,
);
console.log(`마감 표 ${Object.keys(closing).length}건 (신청 기간 ${Object.values(closing).filter((c) => c.kind === "period").length} · 원문이 마감이라 적음 ${Object.values(closing).filter((c) => c.kind === "stated").length} · 사업 종료일 ${Object.values(closing).filter((c) => c.kind === "program").length})`);

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
