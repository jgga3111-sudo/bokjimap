/**
 * 상세 페이지를 두지 않는 사업의 표(`src/data/noPage.ts`)를 만든다.
 *
 * 2026-10-02 — 애드센스가 「가치가 별로 없는 콘텐츠」로 두 번째 거절했다. 09-13에
 * 얇은 상세를 noindex로만 돌리고 페이지는 남겼는데, 러닝온이 같은 사유로 반려됐을 때
 * 통한 조치는 **주소째 없애는 것**이었다(noindex는 크롤링을 막지 않고, 애드센스는
 * 사이트 전체를 본다). 그래서 색인 대상이 아닌 상세는 페이지를 만들지 않고, 목록·검색의
 * 카드가 복지로 원문으로 바로 이어진다.
 *
 * 규칙은 `src/lib/indexable.ts`의 `isIndexable` 하나다 — 여기서 다시 적지 않고 그 함수를
 * 그대로 불러 쓴다. 값은 복지로 원문 주소의 사업 구분(1 중앙부처 · 2 지자체)이다.
 * `npm run build` 앞에서 저절로 돈다(package.json prebuild).
 */
import { createJiti } from "jiti";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(import.meta.url, { alias: { "@": path.join(root, "src") } });
const { services } = await jiti.import("@/data/services");
const { isIndexable } = await jiti.import("@/lib/indexable");

const rows = services.filter((s) => !isIndexable(s));
for (const s of rows) {
  const m = (s.officialUrl ?? "").match(/wlfareInfoReldBztpCd=0([12])$/);
  if (!m || !s.officialUrl.includes(s.id)) throw new Error(`복지로 주소 형태가 다르다: ${s.id} ${s.officialUrl}`);
}
const body = rows.map((s) => `${s.id}:${s.officialUrl.slice(-1)}`).join(",");
writeFileSync(
  path.join(root, "src", "data", "noPage.ts"),
  `/* 자동 생성 — scripts/build-no-page.mjs. 손으로 고치지 않는다.
   상세 페이지를 두지 않는 사업 ${rows.length}건(전체 ${services.length}건). 값은 복지로 사업 구분(1 중앙 · 2 지자체). */
export const NO_PAGE: Record<string, 1 | 2> = {${body}};
`,
);
console.log(`noPage.ts — 상세 없음 ${rows.length}건 · 상세 있음 ${services.length - rows.length}건`);
