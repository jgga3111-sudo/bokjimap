import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AUTH_ON } from "@/lib/auth/config";
import AuthShell from "@/components/auth/AuthShell";
import { ForgotForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
  robots: { index: false, follow: false },
  alternates: { canonical: "/forgot" },
};

export default function ForgotPage() {
  if (!AUTH_ON) notFound();
  return (
    <AuthShell
      title="비밀번호 찾기"
      lead="가입한 이메일로 비밀번호를 새로 정하는 링크를 보내 드립니다."
    >
      <ForgotForm />
      <p className="mt-5 text-center text-sm">
        <Link href="/login" className="text-muted underline hover:text-brand">
          로그인으로 돌아가기
        </Link>
      </p>
    </AuthShell>
  );
}
