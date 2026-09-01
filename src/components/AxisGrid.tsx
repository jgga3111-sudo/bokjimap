import Link from "next/link";

/** 축 카드가 필요로 하는 최소 형태. `Axis`와 `Benefit` 둘 다 만족한다. */
type Item = { slug: string; label: string; blurb: string };

/**
 * 대상·생애주기 같은 축 목록을 카드 격자로 보여준다.
 *
 * 제네릭인 이유: 호출하는 쪽이 `countOf`에서 축의 고유 필드를 쓴다
 * (`THEMES`는 `value`, `BENEFITS`는 `values`). 매개변수를 `Item`으로 좁히면
 * 그 필드가 사라져 호출부가 전부 깨진다.
 */
export default function AxisGrid<T extends Item>({
  base,
  items,
  countOf,
}: {
  base: string;
  items: readonly T[];
  countOf: (a: T) => number;
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((a) => (
        <li key={a.slug}>
          <Link
            href={`${base}/${a.slug}`}
            className="block rounded-xl border border-line p-4 transition hover:border-brand"
          >
            <p className="flex items-baseline gap-2">
              <span className="font-bold">{a.label}</span>
              <span className="text-xs text-muted">
                {countOf(a)}건
              </span>
            </p>
            <p className="mt-1 text-sm text-muted">{a.blurb}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
