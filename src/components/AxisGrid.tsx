import Link from "next/link";
import AxisIcon from "@/components/AxisIcon";

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
          {/*
            아이콘은 **왼쪽 고정 칸**에 둔다. 글 옆에 흘려 넣으면 라벨 길이가
            제각각이라(「청년」 두 글자부터 「다문화·탈북민」까지) 카드마다
            딴 자리에 붙는다. 칸을 고정하면 격자로 훑을 때 눈이 한 줄로 간다.

            배경은 `bg-white`다. 카드가 지면(오프화이트) 위로 떠 보이게 한
            것과 같은 이유로, 아이콘 칸은 카드 안에서 한 겹 더 눌러 둔다.
          */}
          <Link
            href={`${base}/${a.slug}`}
            className="flex h-full gap-3 rounded-xl border border-line bg-white p-4 transition hover:border-brand"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <AxisIcon slug={a.slug} />
            </span>
            <span className="min-w-0">
              <span className="flex items-baseline gap-2">
                <span className="font-bold">{a.label}</span>
                <span className="text-xs text-muted">{countOf(a)}건</span>
              </span>
              <span className="mt-1 block text-sm text-muted">{a.blurb}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
