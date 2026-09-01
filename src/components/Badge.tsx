import { toneClass, type Tone } from "@/lib/display";

/**
 * 배지 — 색 딱지 하나.
 *
 * 이모지를 받는 icon 속성이 있었는데 없앴다. 지급 형태마다 그림을 달아 두니
 * (💰🎫✂️📦…) 목록에서 카드가 여덟 장 깔릴 때 그림만 스무 개가 됐다.
 * 배지는 글자 두세 자와 색이면 충분하다.
 */
export default function Badge({
  tone = "slate",
  children,
}: {
  tone?: Tone;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${toneClass(tone)}`}
    >
      {children}
    </span>
  );
}
