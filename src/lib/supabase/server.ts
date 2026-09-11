import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { AUTH_COOKIE_OPTIONS } from "@/lib/auth/config";

/**
 * Supabase 접속 — **서버에서만** 쓴다 (2026-09-11).
 *
 * 브라우저는 Supabase에 직접 붙지 않는다. 가입·로그인·관심 지원 동기화가
 * 전부 서버 액션을 거친다. 그래서
 *   ① 키가 클라이언트 번들에 안 실린다(환경변수에 NEXT_PUBLIC_을 안 붙인다)
 *   ② CSP에 Supabase 주소를 열어 줄 필요가 없다(next.config.ts 그대로)
 *   ③ 토큰 쿠키를 httpOnly로 둘 수 있다(auth/config.ts)
 *
 * 환경변수 셋 — Vercel과 `.env.local`에 넣는다(값은 커밋하지 않는다).
 *   SUPABASE_URL              프로젝트 주소
 *   SUPABASE_PUBLISHABLE_KEY  공개 키(sb_publishable_…). 권한은 RLS가 막는다.
 *   SUPABASE_SECRET_KEY       비밀 키(sb_secret_…). **탈퇴 처리에만** 쓴다.
 */

export function supabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY);
}

/** 요청한 사람의 권한으로 도는 접속. 쿠키에서 로그인 상태를 읽고 갱신한다. */
export async function createSupabase() {
  const store = await cookies();
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookieOptions: AUTH_COOKIE_OPTIONS,
      cookies: {
        getAll() {
          return store.getAll();
        },
        setAll(list) {
          /* 서버 컴포넌트 렌더 중에는 쿠키를 못 쓴다(Next 규칙). 그때는
             조용히 넘어간다 — 토큰 갱신은 proxy.ts와 서버 액션이 한다. */
          try {
            for (const { name, value, options } of list) {
              store.set(name, value, options);
            }
          } catch {
            /* 위 주석 */
          }
        },
      },
    },
  );
}

/**
 * 관리자 권한 접속 — **탈퇴(계정 삭제)에만** 쓴다. 이용자 권한으로는
 * 자기 계정을 지울 수 없게 Supabase가 막아 두었기 때문이다.
 * 이 키는 RLS를 건너뛰므로 다른 곳에서 쓰지 않는다.
 */
export function createSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type Supabase = Awaited<ReturnType<typeof createSupabase>>;
