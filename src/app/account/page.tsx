import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AUTH_ON } from "@/lib/auth/config";
import { createSupabase, supabaseConfigured } from "@/lib/supabase/server";
import { LogoutButton, DeleteForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = {
  title: "내 계정",
  robots: { index: false, follow: false },
  alternates: { canonical: "/account" },
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/**
 * 내 계정 (2026-09-11). 서버에서 로그인을 **다시 확인한다** — 헤더의
 * 표식 쿠키만 믿지 않는다(auth/config.ts). 없으면 로그인 화면으로.
 */
export default async function AccountPage({ searchParams }: PageProps<"/account">) {
  if (!AUTH_ON || !supabaseConfigured()) notFound();
  const sb = await createSupabase();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) redirect("/login?next=/account");

  const sp = await searchParams;
  const { count } = await sb
    .from("saved_services")
    .select("service_id", { count: "exact", head: true })
    .eq("user_id", user.id);

  const joined = user.created_at
    ? new Date(new Date(user.created_at).getTime() + 9 * 3600_000)
        .toISOString()
        .slice(0, 10)
    : null;

  return (
    <div className="mx-auto max-w-md space-y-5">
      <h1 className="text-2xl font-extrabold">내 계정</h1>

      {one(sp.welcome) === "1" && (
        <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2.5 text-sm text-emerald-900">
          메일 인증이 끝났습니다. 가입을 환영합니다.
        </p>
      )}
      {one(sp.pw) === "1" && (
        <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2.5 text-sm text-emerald-900">
          비밀번호를 바꿨습니다.
        </p>
      )}

      <section className="rounded-2xl border border-line bg-white p-5">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-muted">이메일</dt>
            <dd className="min-w-0 truncate font-medium text-ink">{user.email}</dd>
          </div>
          {joined && (
            <div className="flex justify-between gap-3">
              <dt className="text-muted">가입일</dt>
              <dd className="text-ink">{joined}</dd>
            </div>
          )}
          <div className="flex justify-between gap-3">
            <dt className="text-muted">관심 지원</dt>
            <dd>
              <Link href="/saved" className="font-medium text-brand underline">
                {(count ?? 0).toLocaleString()}건 보기
              </Link>
            </dd>
          </div>
        </dl>
        <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
          <LogoutButton />
          <Link
            href="/reset"
            className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand hover:text-brand"
          >
            비밀번호 바꾸기
          </Link>
        </div>
      </section>

      <details className="rounded-2xl border border-line bg-white p-5">
        <summary className="cursor-pointer text-sm font-medium text-slate-600">
          탈퇴하기
        </summary>
        <p className="mt-3 mb-4 text-sm leading-relaxed text-slate-600">
          탈퇴하면 계정과 저장한 관심 지원이 <strong>바로 지워지고 되돌릴 수
          없습니다.</strong> 같은 이메일로는 다시 가입할 수 있습니다.
        </p>
        <DeleteForm />
      </details>
    </div>
  );
}
