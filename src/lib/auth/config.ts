/**
 * 계정 기능의 스위치와 공통 규칙 (2026-09-11).
 *
 * ── 스위치 하나로 켜고 끈다 ─────────────────────────────────────
 * `NEXT_PUBLIC_AUTH_ON=1`일 때만 가입·로그인 화면과 헤더 링크가 나온다.
 * 꺼져 있으면 그 화면들은 404이고 사이트는 계정 기능이 없던 때와 같다.
 * 이렇게 둔 이유 — 코드가 먼저 배포돼도 **Supabase 키가 들어오고 개인정보
 * 처리방침이 바뀌기 전에는 가입을 한 명도 받으면 안 된다.** 방침이
 * "회원가입을 받지 않는다"고 말하는 동안 가입을 받으면 그 자체가 거짓이다.
 * 방침의 회원 조항도 같은 스위치로 켜진다(privacy/page.tsx).
 *
 * 빌드 때 값이 박힌다(NEXT_PUBLIC_). 켜고 끌 때는 Vercel 환경변수를 바꾸고
 * **다시 배포**해야 한다.
 *
 * 이 파일은 브라우저에서도 읽힌다. 비밀 값은 여기 두지 않는다.
 */

export const AUTH_ON = process.env.NEXT_PUBLIC_AUTH_ON === "1";

/**
 * 로그인 표식 쿠키. 값은 "1"뿐이고 아무 정보도 없다.
 *
 * 진짜 로그인 쿠키(Supabase 토큰)는 `httpOnly`라 자바스크립트가 못 읽는다
 * — 사이트에 스크립트가 끼어들어도 토큰을 훔쳐 가지 못하게. 대신 헤더가
 * "로그인" / "내 계정" 중 무엇을 띄울지 알아야 해서 이 표식을 따로 둔다.
 * 서버에 묻지 않고 브라우저에서 정하므로 **정적 페이지 807개가 정적으로
 * 남는다.** 표식이 틀려도(토큰 만료) 피해는 없다 — `/account`가 서버에서
 * 다시 확인하고 로그인 화면으로 보낸다.
 */
export const MEMBER_HINT = "bc_member";

const secure = process.env.NODE_ENV === "production";

/** Supabase 토큰 쿠키. 브라우저 스크립트에서 안 보이게 한다. */
export const AUTH_COOKIE_OPTIONS = {
  path: "/",
  sameSite: "lax" as const,
  httpOnly: true,
  secure,
};

export const HINT_COOKIE_OPTIONS = {
  path: "/",
  sameSite: "lax" as const,
  httpOnly: false,
  secure,
  maxAge: 60 * 60 * 24 * 400,
};

/**
 * 로그인 뒤 돌아갈 곳. 우리 사이트 안의 경로만 받는다(열린 리다이렉트 방지).
 *
 * ⚠ 처음엔 앞 두 글자만 봤다(`/`로 시작, `//`·`/\`는 거절). **구멍이었다**
 * (09-11 코드 리뷰) — `?next=/%09/evil.com`은 탭 문자가 풀려 `"/\t/evil.com"`이
 * 되고, 브라우저는 주소를 읽을 때 탭·줄바꿈을 지우므로 `//evil.com`으로
 * 간다. 로그인하자마자 피싱 사이트로 넘어가는 길이었다.
 * 그래서 ① 제어문자와 `\`가 하나라도 있으면 거절하고 ② 실제로 URL로 풀어
 * 본 뒤 출처가 그대로인지 대조한다. 돌려주는 것도 원문이 아니라 **풀어 낸
 * 경로**다.
 */
export function safeNext(raw: string | null | undefined, fallback: string): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return fallback;
  /* 제어문자(U+0000~001F, 007F)와 역슬래시를 거절한다. 이 줄은 반드시
     역슬래시-u 이스케이프로 쓴다 — 글자 그대로 넣으면 파일이 바이너리로
     읽혀 git diff·grep이 안 된다(09-11에 실제로 그랬다). */
  if (/[\u0000-\u001f\u007f\\]/.test(raw)) return fallback;
  try {
    const base = "https://bokjiclick.invalid";
    const u = new URL(raw, base);
    if (u.origin !== base) return fallback;
    return u.pathname + u.search + u.hash;
  } catch {
    return fallback;
  }
}

/** 틀렸으면 이유(한국어), 맞으면 null. 화면과 서버가 같은 규칙을 쓴다. */
export function checkEmail(email: string): string | null {
  if (!email) return "이메일을 입력해 주세요.";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "이메일 형식이 맞지 않습니다.";
  }
  return null;
}

/**
 * 8자 이상, 영문과 숫자를 하나씩은 섞는다. 72자 상한은 비밀번호를
 * 암호화하는 방식(bcrypt)이 그 뒤를 버리기 때문이다 — 73자째부터는
 * 바꿔도 같은 비밀번호로 취급되니, 긴 문장을 넣은 사람이 속지 않게 막는다.
 */
export function checkPassword(pw: string): string | null {
  if (pw.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
  if (pw.length > 72) return "비밀번호는 72자까지 쓸 수 있습니다.";
  if (!/[A-Za-z]/.test(pw) || !/\d/.test(pw)) {
    return "비밀번호에 영문과 숫자를 함께 넣어 주세요.";
  }
  return null;
}
