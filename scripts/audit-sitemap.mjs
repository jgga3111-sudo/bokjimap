/**
 * 사이트맵에 무엇이 실리는지 미리 본다.
 *
 *   node scripts/audit-sitemap.mjs
 *
 * 서치콘솔에 사이트맵을 제출하기 **전에** 돌린다.
 *
 * 왜 필요한가 — 사이트맵은 "이 주소들을 색인해 달라"는 제출이고, 서치콘솔은
 * 제출 대비 색인 비율을 계속 보여준다. 색인될 리 없는 페이지를 섞어 제출하면
 * 그 비율이 나빠지고, 나중에 진짜 문제가 생겼을 때 구분이 안 된다.
 * 러닝온에서 얇은 페이지 510개가 "발견됨 – 색인 안 됨"으로 쌓인 것을 겪었다.
 *
 * 그런데 사이트맵은 코드(src/app/sitemap.ts)가 만들고, 그 코드는 빌드해야
 * 돌아간다. 제출하기 직전에 눈으로 확인할 방법이 없으면 결국 서치콘솔에서
 * 사후에 알게 된다. 그래서 같은 규칙을 여기서 데이터로 다시 계산한다.
 *
 * ⚠ 이 파일은 sitemap.ts와 **규칙이 같아야 한다.** 한쪽만 고치면 이 점검은
 * 거짓말을 하게 된다. 기준(MIN_BODY_LENGTH, MIN_SERVICES)을 바꿀 때 둘 다 본다.
 */
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(p, "utf8");

/** services.ts에서 배열만 떼어 낸다(audit-data.mjs와 같은 방식). */
const src = read("src/data/services.ts");
const services = JSON.parse(
  src.slice(src.indexOf("= [") + 2, src.lastIndexOf("];") + 1),
);

/** 상수는 실제 소스에서 읽는다. 여기 숫자를 베껴 두면 반드시 어긋난다. */
const num = (file, name) => {
  const m = read(file).match(new RegExp(`${name}\\s*=\\s*(\\d+)`));
  if (!m) throw new Error(`${file}에서 ${name}을 못 찾음`);
  return Number(m[1]);
};
const MIN_BODY_LENGTH = num("src/types/welfare.ts", "MIN_BODY_LENGTH");
const MIN_SERVICES = num("src/lib/axes.ts", "MIN_SERVICES");

const bodyLen = (s) =>
  [s.outline, s.summary, s.eligibility, s.selectionCriteria, s.supportContent, s.applyMethod]
    .filter(Boolean)
    .join("").length;

const indexable = services.filter((s) => bodyLen(s) >= MIN_BODY_LENGTH);

/** 허브 페이지 수 — sitemap.ts의 hub()와 같은 조건. */
const countHub = (pick) => {
  const tally = new Map();
  for (const s of services) for (const v of pick(s)) tally.set(v, (tally.get(v) ?? 0) + 1);
  return [...tally.values()].filter((n) => n >= MIN_SERVICES).length;
};

const regions = countHub((s) => (s.sidoName ? [s.sidoName] : []));
const targets = countHub((s) => s.targets);
const lifeStages = countHub((s) => s.lifeStages);

/* 정적 페이지는 sitemap.ts에 손으로 적혀 있으므로 거기서 세어 온다. */
const sitemapSrc = read("src/app/sitemap.ts");
const staticBlock = sitemapSrc.slice(
  sitemapSrc.indexOf("const staticPages"),
  sitemapSrc.indexOf("] as const"),
);
const staticPaths = [...staticBlock.matchAll(/\["([^"]*)",/g)].map((m) => m[1]);

const line = "─".repeat(52);
console.log(line);
console.log("사이트맵에 제출될 것");
console.log(line);
console.log(`  정적 페이지        ${String(staticPaths.length).padStart(5)}개`);
console.log(`    ${staticPaths.map((p) => p || "/").join(" ")}`);
console.log(`  서비스 상세        ${String(indexable.length).padStart(5)}개  (본문 ${MIN_BODY_LENGTH}자 이상)`);
console.log(`  지역 허브          ${String(regions).padStart(5)}개  (각 ${MIN_SERVICES}건 이상)`);
console.log(`  대상 허브          ${String(targets).padStart(5)}개`);
console.log(`  생애주기 허브      ${String(lifeStages).padStart(5)}개`);
console.log(
  `  ${"합계".padEnd(17)}${String(
    staticPaths.length + indexable.length + regions + targets + lifeStages,
  ).padStart(5)}개`,
);

console.log();
console.log(line);
console.log("일부러 제출하지 않는 것");
console.log(line);
console.log(`  서비스 상세        ${String(services.length - indexable.length).padStart(5)}개  본문이 ${MIN_BODY_LENGTH}자 미만 — 상세에서도 noindex`);
console.log(`  약관·방침·문의     ${String(3).padStart(5)}개  정형 문서라 색인 가치 없음 (푸터 링크로는 접근 가능)`);

/* 본문 길이 분포 — MIN_BODY_LENGTH를 어디로 잡을지 정하는 근거. */
const lens = services.map(bodyLen).sort((a, b) => a - b);
const at = (q) => lens[Math.min(lens.length - 1, Math.floor(lens.length * q))];
console.log();
console.log(line);
console.log("본문 길이 분포 (기준선을 다시 잡을 때 본다)");
console.log(line);
console.log(`  최소 ${at(0)}  25% ${at(0.25)}  중앙값 ${at(0.5)}  75% ${at(0.75)}  최대 ${lens[lens.length - 1]}`);

if (indexable.length === 0) {
  console.log();
  console.log("⚠ 색인 대상 상세가 0건이다. 상세 본문을 아직 수집하지 않았다는 뜻이다.");
  console.log("  이 상태로 사이트맵을 제출하면 목록 페이지만 올라간다.");
  console.log("  fetch-daily.bat으로 상세를 받은 뒤 다시 확인할 것.");
}
