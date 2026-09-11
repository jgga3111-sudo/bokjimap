import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AUTH_ON } from "@/lib/auth/config";
import AuthShell from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = {
  title: "가입하기",
  robots: { index: false, follow: false },
  alternates: { canonical: "/signup" },
};

export default function SignupPage() {
  if (!AUTH_ON) notFound();
  return (
    <AuthShell
      title="가입하기"
      lead={
        <>
          가입하면 ☆로 저장한 관심 지원을 휴대폰과 PC 어디서나 볼 수 있습니다.
          이메일 하나로 한 번만 가입할 수 있고, 메일 인증을 마쳐야 가입이
          끝납니다.
        </>
      }
    >
      <SignupForm />
      <p className="mt-5 text-center text-sm text-muted">
        이미 가입하셨나요?{" "}
        <Link href="/login" className="font-medium text-brand underline">
          로그인
        </Link>
      </p>
    </AuthShell>
  );
}
