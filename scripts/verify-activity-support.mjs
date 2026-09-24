/**
 * `lib/activitySupport.ts` 확인 — 본인부담금 규칙이 지침 78쪽 조견표를 그대로 만드는가 (2026-09-25).
 *   node scripts/verify-activity-support.mjs
 * 표 값은 「2026 장애인활동지원 사업안내」 78쪽에서 옮겼다(1구간 → 15구간 순).
 */
import assert from "node:assert/strict";
import { AS_BANDS, AS_INCOMES, copayOf } from "../src/lib/activitySupport.ts";

const T = 216200;
const TABLE = {
  basic: Array(15).fill(0),
  near: Array(15).fill(20000),
  m70: [T, T, T, T, T, T, 207200, 186600, 165900, 145100, 124400, 103700, 83000, 62300, 41600],
  m120: [T, T, T, T, T, T, T, T, T, T, 186700, 155500, 124500, 93400, 62400],
  m180: [T, T, T, T, T, T, T, T, T, T, T, 207400, 166000, 124600, 83200],
  over: [T, T, T, T, T, T, T, T, T, T, T, T, 207600, 155800, 104000],
};

for (const inc of AS_INCOMES)
  AS_BANDS.forEach((b, i) => assert.equal(copayOf(b.limit, inc), TABLE[inc.id][i], `${inc.id} ${b.band}구간`));

/* 구간 경계가 끊기지 않고 이어지는가 */
for (let i = 1; i < AS_BANDS.length; i++) assert.equal(AS_BANDS[i].max, AS_BANDS[i - 1].min);
assert.equal(AS_BANDS.at(-1).min, 42);

console.log("ok — 조견표 90칸 일치");
