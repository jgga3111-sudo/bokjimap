import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import type { EmailOtpType } from "@supabase/supabase-js";
import {
  AUTH_ON,
  MEMBER_HINT,
  HINT_COOKIE_OPTIONS,
  safeNext,
} from "@/lib/auth/config";
import { createSupabase, supabaseConfigured } from "@/lib/supabase/server";

const TYPES: readonly EmailOtpType[] = [
  "signup",
  "email",
  "recovery",
  "email_change",
  "invite",
  "magiclink",
];

/**
 * 인증 메일의 링크가 돌아오는 곳 (2026-09-11).
 *
 * 두 모양을 다 받는다.
 *   ?token_hash=…&type=…  — 메일 템플릿을 우리가 고친 경우(권장).
 *                           **다른 기기에서 메일을 열어도** 된다.
 *   ?code=…               — Supabase 기본 템플릿. 가입한 그 브라우저에서만
 *                           통한다(PKCE 확인 값이 그 브라우저 쿠키에 있다).
 * 휴대폰으로 가입하고 PC 메일로 여는 사람이 흔해서, 대시보드의 메일
 * 템플릿을 앞의 모양으로 바꾸는 것을 준비 목록에 적어 두었다(CLAUDE.md).
 *
 * 성공하면 로그인된 상태로 `/account`(비밀번호 찾기면 `/reset`)로 보낸다.
 * 실패(만료·이미 쓴 링크)하면 로그인 화면에 이유를 띄운다.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  if (!AUTH_ON || !supabaseConfigured()) {
    return NextResponse.redirect(new URL("/", url));
  }

  const tokenHash = url.searchParams.get("token_hash");
  const rawType = url.searchParams.get("type");
  const type = TYPES.find((t) => t === rawType) ?? null;
  const code = url.searchParams.get("code");
  const next = safeNext(
    url.searchParams.get("next"),
    type === "recovery" ? "/reset" : "/account?welcome=1",
  );

  const sb = await createSupabase();
  let ok = false;
  if (tokenHash && type) {
    ok = !(await sb.auth.verifyOtp({ type, token_hash: tokenHash })).error;
  } else if (code) {
    ok = !(await sb.auth.exchangeCodeForSession(code)).error;
  }

  if (!ok) return NextResponse.redirect(new URL("/login?error=link", url));

  (await cookies()).set(MEMBER_HINT, "1", HINT_COOKIE_OPTIONS);
  return NextResponse.redirect(new URL(next, url));
}
