/**
 * midIncome.ts의 계산이 보건복지부 고시값과 일치하는지 대조한다.
 *
 * 왜 필요한가 — 기준 중위소득은 사이트 전체 판정의 뿌리다. 여기가 틀리면
 * "당신은 대상입니다"가 통째로 거짓말이 된다. 표를 손으로 옮기는 순간
 * 오타 가능성이 생기므로, 고시된 급여별 선정기준(32/40/48/50%)을 별도로
 * 적어 두고 계산 결과와 대조한다.
 *
 *   node scripts/verify-mid-income.mjs
 */
import { readFileSync } from "node:fs";

const src = readFileSync("src/lib/midIncome.ts", "utf8");
const table = [...src.matchAll(/^\s+([\d_]+), \/\/ (\d)인/gm)].map((m) =>
  Number(m[1].replaceAll("_", "")),
);
const median = (n) =>
  n <= 6 ? table[n - 1] : table[5] + (table[5] - table[4]) * (n - 6);
const th = (n, p) => Math.round((median(n) * p) / 100);

/* 보도자료에 실린 2026년 급여별 선정기준 (1~6인) */
const OFFICIAL = {
  32: [820556, 1343773, 1714892, 2078316, 2418150, 2737905],
  40: [1025695, 1679717, 2143614, 2597895, 3022688, 3422381],
  48: [1230834, 2015660, 2572337, 3117474, 3627225, 4106857],
  50: [1282119, 2099646, 2679518, 3247369, 3778360, 4277976],
};

let bad = 0;
for (const [p, row] of Object.entries(OFFICIAL)) {
  row.forEach((expected, i) => {
    const got = th(i + 1, Number(p));
    if (got !== expected) {
      bad++;
      console.error(`불일치 ${p}% ${i + 1}인: 계산 ${got} ≠ 고시 ${expected}`);
    }
  });
}
console.log(`기준 중위소득 표: ${table.join(", ")}`);
console.log(`7인 외삽: ${median(7).toLocaleString()}원`);
console.log(bad === 0 ? "✅ 24개 고시값 전부 일치" : `❌ ${bad}건 불일치`);
process.exit(bad === 0 ? 0 : 1);
