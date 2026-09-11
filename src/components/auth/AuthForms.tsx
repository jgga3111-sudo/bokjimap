"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  signUp,
  signIn,
  resendConfirm,
  requestReset,
  updatePassword,
  deleteAccount,
  signOut,
  type AuthState,
} from "@/lib/auth/actions";
import { clearSaved } from "@/lib/saved";
import { SYNC_KEY } from "@/components/SavedSync";

/**
 * 계정 화면의 입력 양식들 (2026-09-11).
 *
 * 전부 서버 액션으로 보낸다 — 평범한 `<form>`이라 CSP의 `form-action 'self'`
 * 안에서 돈다(next.config.ts). 검사는 서버가 한 번 더 하므로 여기서는
 * 브라우저 기본 검사(required·type=email)만 건다.
 */

const INPUT =
  "mt-1 h-11 w-full rounded-lg border border-line bg-white px-3 text-base outline-none focus:border-brand";
const LABEL = "block text-sm font-bold text-ink";
const BUTTON =
  "h-11 w-full rounded-xl bg-brand font-bold text-white transition hover:brightness-110 disabled:opacity-60";

function Message({ state }: { state: AuthState }) {
  if (!state?.message) return null;
  return (
    <p
      role={state.ok ? "status" : "alert"}
      className={`rounded-lg px-3 py-2.5 text-sm leading-relaxed ${
        state.ok ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"
      }`}
    >
      {state.message}
    </p>
  );
}

function ResendForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(resendConfirm, undefined);
  return (
    <form action={action} className="space-y-2">
      <input type="hidden" name="email" value={email} />
      <Message state={state} />
      <button
        type="submit"
        disabled={pending}
        className="text-sm font-medium text-brand underline disabled:opacity-60"
      >
        {pending ? "보내는 중…" : "인증 메일 다시 보내기"}
      </button>
    </form>
  );
}

export function SignupForm() {
  const [state, action, pending] = useActionState(signUp, undefined);

  if (state?.ok && state.email) {
    return (
      <div className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
        <p className="font-bold text-ink">인증 메일을 보냈습니다</p>
        <p className="text-sm leading-relaxed text-slate-700">
          <strong>{state.email}</strong>로 온 메일의 <strong>링크를 눌러야</strong>{" "}
          가입이 끝납니다. 몇 분 안에 오지 않으면 스팸함을 확인해 주세요.
        </p>
        <ResendForm email={state.email} />
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <label className={LABEL}>
        이메일
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state?.email}
          className={INPUT}
        />
      </label>
      <label className={LABEL}>
        비밀번호
        <span className="ml-1.5 font-normal text-muted">8자 이상, 영문·숫자 섞어서</span>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={72}
          className={INPUT}
        />
      </label>
      <label className={LABEL}>
        비밀번호 확인
        <input
          name="password2"
          type="password"
          autoComplete="new-password"
          required
          className={INPUT}
        />
      </label>

      {/* 필수 동의 둘. 만 14세 미만은 법정대리인 동의가 따로 필요해(개인정보
          보호법 제22조의2) 받지 않는다. 수집 항목·목적·보관 기간은 동의
          바로 옆에 적는다 — 방침 링크만 두면 아무도 안 연다. */}
      <div className="space-y-2 rounded-lg bg-sunken px-3 py-3 text-sm">
        <label className="flex items-start gap-2">
          <input type="checkbox" name="agree" required className="mt-1" />
          <span className="leading-relaxed text-slate-700">
            <strong>[필수] 개인정보 수집·이용 동의</strong> — 이메일·비밀번호
            (암호화 저장)·저장한 관심 지원을, 로그인과 기기 간 동기화를 위해
            수집합니다. <strong>탈퇴하면 바로 지웁니다.</strong>{" "}
            <Link href="/privacy" className="text-brand underline" target="_blank">
              자세히
            </Link>
          </span>
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" name="age14" required className="mt-1" />
          <span className="text-slate-700">
            <strong>[필수]</strong> 만 14세 이상입니다
          </span>
        </label>
      </div>

      <Message state={state} />
      <button type="submit" disabled={pending} className={BUTTON}>
        {pending ? "가입하는 중…" : "가입하고 인증 메일 받기"}
      </button>
    </form>
  );
}

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(signIn, undefined);
  return (
    <div className="space-y-4">
      <form action={action} className="space-y-4">
        {next && <input type="hidden" name="next" value={next} />}
        <label className={LABEL}>
          이메일
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state?.email}
            className={INPUT}
          />
        </label>
        <label className={LABEL}>
          비밀번호
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={INPUT}
          />
        </label>
        <Message state={state} />
        <button type="submit" disabled={pending} className={BUTTON}>
          {pending ? "로그인하는 중…" : "로그인"}
        </button>
      </form>
      {state?.needConfirm && state.email && <ResendForm email={state.email} />}
    </div>
  );
}

export function ForgotForm() {
  const [state, action, pending] = useActionState(requestReset, undefined);
  return (
    <form action={action} className="space-y-4">
      <label className={LABEL}>
        가입한 이메일
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state?.email}
          className={INPUT}
        />
      </label>
      <Message state={state} />
      <button type="submit" disabled={pending} className={BUTTON}>
        {pending ? "보내는 중…" : "재설정 메일 받기"}
      </button>
    </form>
  );
}

export function ResetForm() {
  const [state, action, pending] = useActionState(updatePassword, undefined);
  return (
    <form action={action} className="space-y-4">
      <label className={LABEL}>
        새 비밀번호
        <span className="ml-1.5 font-normal text-muted">8자 이상, 영문·숫자 섞어서</span>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={72}
          className={INPUT}
        />
      </label>
      <label className={LABEL}>
        새 비밀번호 확인
        <input
          name="password2"
          type="password"
          autoComplete="new-password"
          required
          className={INPUT}
        />
      </label>
      <Message state={state} />
      <button type="submit" disabled={pending} className={BUTTON}>
        {pending ? "바꾸는 중…" : "비밀번호 바꾸기"}
      </button>
    </form>
  );
}

/** 이 브라우저에 남은 관심 지원을 지운다. 공용 PC에서 로그아웃한 뒤
    다음 사람에게 앞사람의 목록이 보이면 안 된다. */
function forgetLocal() {
  clearSaved();
  try {
    localStorage.removeItem(SYNC_KEY);
  } catch {
    /* 저장소가 막혀 있으면 지울 것도 없다 */
  }
}

export function LogoutButton() {
  return (
    <form action={signOut} onSubmit={forgetLocal}>
      <button
        type="submit"
        className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand hover:text-brand"
      >
        로그아웃
      </button>
    </form>
  );
}

export function DeleteForm() {
  const [state, action, pending] = useActionState(deleteAccount, undefined);
  return (
    <form
      action={action}
      /* 확인란이 서버와 같은 조건(「탈퇴」)을 통과할 때만 이 브라우저 목록을
         지운다. 무조건 지우면 오타로 탈퇴가 거절돼도 목록부터 사라졌다
         (계정은 남는데 여기서만 빈 목록 — 09-11 점검에서 걸림). */
      onSubmit={(e) => {
        const v = new FormData(e.currentTarget).get("confirm");
        if (String(v ?? "").trim() === "탈퇴") forgetLocal();
      }}
      className="space-y-3"
    >
      <label className="block text-sm text-slate-700">
        확인을 위해 <strong>탈퇴</strong>라고 적어 주세요.
        <input name="confirm" required autoComplete="off" className={INPUT} />
      </label>
      <Message state={state} />
      <button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-xl border border-rose-300 bg-white font-bold text-rose-700 transition hover:bg-rose-50 disabled:opacity-60"
      >
        {pending ? "지우는 중…" : "계정과 저장한 관심 지원 지우기"}
      </button>
    </form>
  );
}
