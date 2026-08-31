import { toneClass, type Tone } from "@/lib/display";

export default function Badge({
  tone = "slate",
  icon,
  children,
}: {
  tone?: Tone;
  icon?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${toneClass(tone)}`}
    >
      {icon && <span aria-hidden>{icon}</span>}
      {children}
    </span>
  );
}
