import ServiceCard, { type CardService } from "./ServiceCard";

/**
 * 서비스 목록. 여러 허브 화면(지역·대상·생애주기·전체)이 공유한다.
 *
 * 빈 목록을 "곧 추가됩니다" 같은 말로 덮지 않는다. 없으면 없다고 쓴다.
 */
export default function ServiceList({
  services,
  ranked = false,
}: {
  services: readonly CardService[];
  ranked?: boolean;
}) {
  if (services.length === 0) {
    return (
      <p className="rounded-xl border border-line bg-slate-50 px-4 py-10 text-center text-sm text-muted">
        해당하는 서비스가 없습니다.
      </p>
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {services.map((s, i) => (
        <li key={s.id}>
          <ServiceCard service={s} rank={ranked ? i + 1 : undefined} />
        </li>
      ))}
    </ul>
  );
}
