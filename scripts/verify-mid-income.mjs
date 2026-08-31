/**
 * midIncome.ts의 값과 계산이 보건복지부 고시와 일치하는지 대조한다.
 *
 *   node scripts/verify-mid-income.mjs
 *
 * 왜 필요한가 — 기준 중위소득은 사이트 전체 판정의 뿌리다. 여기가 틀리면
 * "당신은 대상입니다"가 통째로 거짓말이 된다.
 *
 * ⚠ 이 스크립트는 한 번 실패했다. 처음엔 1~6인만 대조하고 7인은 검사하지
 * 않았는데, 하필 7인 값이 틀려 있었다(고시 9,515,150 vs 외삽 9,555,185).
 * 검사 범위가 코드에서 가장 자신 없는 구간을 덮지 않으면 검증이 아니다.
 * 그래서 지금은 기준 중위소득 표 자체와 8인 증가액까지 대조한다.
 */
import { readFileSync } from "node:fs";

const src = readFileSync("src/lib/midIncome.ts", "utf8");
const table = [...src.matchAll(/^\s+([\d_]+), \/\/ (\d)인/gm)].map((m) =>
  Number(m[1].replaceAll("_", "")),
);

/* midIncome.ts의 함수를 import 하지 않고 규칙을 여기서 다시 구현한다.
   같은 함수를 쓰면 함수가 틀렸을 때 검증도 똑같이 틀린다. */
const median = (n) =>
  n <= 7 ? table[n - 1] : table[6] + (table[6] - table[5]) * (n - 7);
const th = (n, p) => Math.round((median(n) * p) / 100);

/* ── 고시값 ────────────────────────────────────────────────────
   출처: 보건복지부고시 제2025-135호 「2026년 기준 중위소득 및 생계·의료급여
   선정기준과 최저보장수준」, 제77차 중앙생활보장위원회(2025-07-31) 보도자료,
   보건복지부 '수급자선정기준' 페이지.
   ──────────────────────────────────────────────────────────── */

const OFFICIAL_MEDIAN = [
  2_564_238, 4_199_292, 5_359_036, 6_494_738, 7_556_719, 8_555_952, 9_515_150,
];

/** 8인 이상 1인당 증가액 = 7인 − 6인. 보건복지부가 문구로 명시한 규칙이다. */
const PER_EXTRA = 959_198;

/** 급여별 선정기준(1~7인). 7인 32% 3,044,848은 복지부 페이지와 대조 확인. */
const OFFICIAL_BENEFIT = {
  32: [820556, 1343773, 1714892, 2078316, 2418150, 2737905, 3044848],
  40: [1025695, 1679717, 2143614, 2597895, 3022688, 3422381, 3806060],
  48: [1230834, 2015660, 2572337, 3117474, 3627225, 4106857, 4567272],
  50: [1282119, 2099646, 2679518, 3247369, 3778360, 4277976, 4757575],
};

let bad = 0;
const fail = (msg) => {
  bad++;
  console.error(`  ✗ ${msg}`);
};

if (table.length !== 7) {
  fail(`표에서 읽은 가구 수가 ${table.length}개다. 7개여야 한다.`);
}

OFFICIAL_MEDIAN.forEach((expected, i) => {
  const got = median(i + 1);
  if (got !== expected)
    fail(`기준 중위소득 ${i + 1}인: 계산 ${got} ≠ 고시 ${expected}`);
});

const step = median(8) - median(7);
if (step !== PER_EXTRA) {
  fail(`8인 이상 1인당 증가액: 계산 ${step} ≠ 고시 ${PER_EXTRA}`);
}

for (const [p, row] of Object.entries(OFFICIAL_BENEFIT)) {
  row.forEach((expected, i) => {
    const got = th(i + 1, Number(p));
    if (got !== expected)
      fail(`${p}% ${i + 1}인: 계산 ${got} ≠ 고시 ${expected}`);
  });
}

const total =
  OFFICIAL_MEDIAN.length + 1 + Object.values(OFFICIAL_BENEFIT).flat().length;

console.log("기준 중위소득 1~7인");
for (let n = 1; n <= 7; n++) {
  console.log(`  ${n}인  ${median(n).toLocaleString()}원`);
}
console.log(
  `  8인  ${median(8).toLocaleString()}원 (외삽, 1인당 +${PER_EXTRA.toLocaleString()})`,
);
console.log(
  bad === 0 ? `\n✅ 고시값 ${total}개 전부 일치` : `\n❌ ${bad}건 불일치`,
);
process.exit(bad === 0 ? 0 : 1);
