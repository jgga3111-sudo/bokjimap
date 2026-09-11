import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { AUTH_COOKIE_OPTIONS } from "@/lib/auth/config";

/**
 * 로그인 토큰 갱신 — **계정 화면 두 곳에서만** 돈다 (2026-09-11).
 *
 * 서버 컴포넌트는 렌더 중에 쿠키를 쓸 수 없어서(Next 규칙), 토큰이 만료된
 * 채 `/account`를 열면 갱신한 새 토큰을 브라우저에 돌려주지 못한다. 그 한
 * 걸음을 여기서 먼저 한다. Supabase 안내서는 이걸 **모든 경로**에 걸라고
 * 하지만, 그러면 정적 페이지 807개의 요청마다 이 함수가 돈다. 로그인이
 * 의미 있는 곳은 둘뿐이라 거기만 건다. 서버 액션은 스스로 쿠키를 쓸 수
 * 있어 여기가 필요 없다.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (process.env.NEXT_PUBLIC_AUTH_ON !== "1" || !url || !key) return response;

  const sb = createServerClient(url, key, {
    cookieOptions: AUTH_COOKIE_OPTIONS,
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(list) {
        for (const { name, value } of list) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of list) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });
  await sb.auth.getClaims();
  return response;
}

export const config = {
  matcher: ["/account", "/reset"],
};
