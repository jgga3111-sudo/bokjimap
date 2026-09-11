import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AUTH_ON, safeNext } from "@/lib/auth/config";
import AuthShell from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = {
  title: "로그인",
  robots: { index: false, follow: false },
  alternates: { canonical: "/login" },
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  if (!AUTH_ON) notFound();
  const sp = await searchParams;
  const next = safeNext(one(sp.next), "/account");
  const linkFailed = one(sp.error) === "link";

  return (
    <AuthShell title="로그인">
      {linkFailed && (
        <p
          role="alert"
          className="mb-4 rounded-lg bg-rose-50 px-3 py-2.5 text-sm leading-relaxed text-rose-900"
        >
          메일의 링크가 만료됐거나 이미 쓰인 링크입니다. 로그인해 보시고, 인증이
          안 됐다고 나오면 인증 메일을 다시 받아 주세요.
        </p>
      )}
      <LoginForm next={next} />
      <div className="mt-5 flex justify-between text-sm">
        <Link href="/forgot" className="text-muted underline hover:text-brand">
          비밀번호 찾기
        </Link>
        <Link href="/signup" className="font-medium text-brand underline">
          가입하기
        </Link>
      </div>
    </AuthShell>
  );
}
