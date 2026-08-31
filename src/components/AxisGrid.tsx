import Link from "next/link";
import type { Axis } from "@/lib/axes";

/** 대상·생애주기 같은 축 목록을 카드 격자로 보여준다. */
export default function AxisGrid({
  base,
  items,
  countOf,
}: {
  base: string;
  items: readonly Axis[];
  countOf: (a: Axis) => number;
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((a) => (
        <li key={a.slug}>
          <Link
            href={`${base}/${a.slug}`}
            className="block rounded-xl border border-[--color-line] p-4 transition hover:border-[--color-brand]"
          >
            <p className="flex items-baseline gap-2">
              <span className="font-bold">{a.label}</span>
              <span className="text-xs text-[--color-muted]">
                {countOf(a)}건
              </span>
            </p>
            <p className="mt-1 text-sm text-[--color-muted]">{a.blurb}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
