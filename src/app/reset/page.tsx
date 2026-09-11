import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AUTH_ON } from "@/lib/auth/config";
import AuthShell from "@/components/auth/AuthShell";
import { ResetForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = {
  title: "새 비밀번호 정하기",
  robots: { index: false, follow: false },
  alternates: { canonical: "/reset" },
};

export default function ResetPage() {
  if (!AUTH_ON) notFound();
  return (
    <AuthShell
      title="새 비밀번호 정하기"
      lead="재설정 메일의 링크로 들어왔거나 로그인한 상태에서 바꿀 수 있습니다."
    >
      <ResetForm />
    </AuthShell>
  );
}
