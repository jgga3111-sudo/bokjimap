/**
 * `lib/reminder.ts` 확인 — 「내년에 다시 확인하기」 날짜 (2026-09-17).
 *   node scripts/verify-reminder.mjs
 * 틀리면 assert가 멈춘다.
 */
import assert from "node:assert/strict";
import { periodStart, nextCheckDate } from "../src/lib/reminder.ts";

const c = (kind, end, text) =>
  ({ kind, end, text, name: "x" });

/* 시작일 읽기 — 실제 마감 표에 있는 모양들 */
assert.equal(periodStart(c("period", "2026-05-20", "'26.5.4.(월) ~ '26.5.20.")), "2026-05-04");
assert.equal(periodStart(c("period", "2026-05-29", "3.30(월) 09:00 ~ 5.29")), "2026-03-30");
assert.equal(periodStart(c("gov24", "2026-04-17", "2026-04-06 ~ 2026-04-17")), "2026-04-06");
assert.equal(periodStart(c("gov24", "2026-06-30", "2026년 6월 17일 ~ 30일")), "2026-06-17");
assert.equal(periodStart(c("gov24", "2026-11-17", "2026-2학기 신청기간 : 2026.7.1.~2026.11.17.")), "2026-07-01");
assert.equal(periodStart(c("gov24", "2026-12-11", "'25.12.22.~'26.12.11.")), "2025-12-22");
/* 신청 기간이 아닌 것·시작일이 없는 것은 null */
assert.equal(periodStart(c("program", "2026-09-30", "~ 2026-09-30")), null);
assert.equal(periodStart(c("period", "2026-09-30", "~ 2026-09-30")), null);
assert.equal(periodStart(c("stated", null, "신청 마감")), null);

/* 확인할 날 = 지난 시작일 + 1년 − 14일, 오늘 뒤로 오는 첫 날 */
const youth = c("period", "2026-05-20", "'26.5.4.(월) ~ '26.5.20.");
assert.equal(nextCheckDate(youth, "2026-09-17"), "2027-04-20");
assert.equal(nextCheckDate(youth, "2027-04-20"), "2028-04-20"); // 그날이 지나면 다음 해
assert.equal(nextCheckDate(youth, "2026-05-20"), null); // 끝나는 날엔 아직 안 지남
assert.equal(nextCheckDate(c("period", "2026-03-10", "2026.3.3.~3.10."), "2026-09-17"), "2027-02-17");

console.log("verify-reminder: 통과");
