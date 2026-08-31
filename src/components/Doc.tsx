import Link from "next/link";

/**
 * 소개·약관·방침 같은 글 페이지의 공통 틀.
 *
 * 이런 페이지는 대충 만들면 티가 난다. 폰트 크기·줄간격·목차가 페이지마다
 * 다르면 사이트 전체가 급조된 것처럼 보인다. 틀을 하나로 묶어 둔다.
 */
export function DocPage({
  title,
  lead,
  updated,
  children,
}: {
  title: string;
  lead?: string;
  /** 시행일·최종 수정일 */
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl">
      <nav aria-label="위치" className="text-xs text-muted">
        <Link href="/" className="hover:text-brand">
          홈
        </Link>
        {" › "}
        <span className="text-slate-600">{title}</span>
      </nav>

      <header className="mt-3 border-b border-line pb-6">
        <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
        {lead && (
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {lead}
          </p>
        )}
        {updated && (
          <p className="mt-3 text-xs text-muted">{updated}</p>
        )}
      </header>

      <div className="mt-8 space-y-10">{children}</div>
    </article>
  );
}

/** 글 페이지의 한 절. 번호를 붙이면 약관처럼 조문으로 읽힌다. */
export function DocSection({
  no,
  title,
  children,
}: {
  no?: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-bold text-ink">
        {no !== undefined && (
          <span className="mr-1.5 text-brand">제{no}조</span>
        )}
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
        {children}
      </div>
    </section>
  );
}

/** 본문 안의 목록. 약관·방침에서 반복적으로 쓴다. */
export function DocList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2">
          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
          <span className="min-w-0">{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** 눈에 띄게 알려야 할 문장 상자. 면책·주의 문구에 쓴다. */
export function DocNote({
  tone = "amber",
  title,
  children,
}: {
  tone?: "amber" | "brand";
  title?: string;
  children: React.ReactNode;
}) {
  const cls =
    tone === "amber"
      ? "border-amber-200 bg-amber-50 text-amber-900"
      : "border-brand/20 bg-brand-soft text-slate-700";
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${cls}`}>
      {title && <p className="font-bold">{title}</p>}
      <div className={title ? "mt-1" : undefined}>{children}</div>
    </div>
  );
}
