/** 계정 화면들의 공통 틀 — 좁은 한 단, 제목과 한 줄 설명. */
export default function AuthShell({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold">{title}</h1>
        {lead && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{lead}</p>
        )}
      </header>
      <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
        {children}
      </div>
    </div>
  );
}
