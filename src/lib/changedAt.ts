import { services } from "@/data/services";

/**
 * 내용이 바뀐 사업의 id → 바뀐 날(`changedAt`) — 관심 지원 목록에 「내용 바뀜」을 붙인다(09-17).
 *
 * 서버에서만 부른다. 관심 지원 목록은 클라이언트라 910건을 내리지 않고
 * 바뀐 것만 담은 작은 표를 props로 넘긴다(09-17 기준 20건).
 */
export const CHANGED_AT: Readonly<Record<string, string>> = Object.fromEntries(
  services.filter((s) => s.changedAt).map((s) => [s.id, s.changedAt!]),
);
