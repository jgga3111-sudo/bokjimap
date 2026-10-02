import { hasPage } from "@/lib/serviceLink";

/**
 * 상세 페이지가 없는 사업의 이름 뒤에 붙는 표시(2026-10-02).
 * 누르면 복지클릭 밖(복지로 원문)으로 나간다는 것을 미리 알린다.
 * 상세가 있는 사업에는 아무것도 그리지 않는다.
 */
export default function OutMark({ id }: { id: string }) {
  if (hasPage(id)) return null;
  return (
    <span className="ml-1.5 whitespace-nowrap text-xs font-normal text-muted">
      복지로 원문 ↗
    </span>
  );
}
