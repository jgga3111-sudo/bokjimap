import type { NextConfig } from "next";

/**
 * 보안 응답 헤더.
 *
 * 이 사이트는 로그인도 결제도 없고 이용자에게서 받는 입력은 자가진단 숫자뿐이라
 * "털릴 게 없는" 것처럼 보인다. 그래도 헤더를 다는 이유는 두 가지다.
 *
 *  1. **복지 정보 사이트는 사칭 대상이 된다.** 우리 페이지를 iframe으로 덮어
 *     "지원금 신청" 버튼을 씌우면 정부 사이트로 착각한 사람이 개인정보를 넣는다.
 *     frame-ancestors / X-Frame-Options가 그걸 막는다.
 *  2. **본문이 전부 외부 데이터다.** 공공데이터포털이 준 문자열을 그대로
 *     화면에 낸다. 코드에서 한 번 거르지만(src/lib/safe.ts), 거기를 빠져나간
 *     값이 있을 때 헤더가 마지막 그물이 된다.
 *
 * script-src는 넣지 않았다. Next.js는 하이드레이션 데이터를 인라인 스크립트로
 * 심기 때문에 nonce 없이는 'unsafe-inline'을 열어야 하는데, 그러면 CSP를 단
 * 의미가 사라진다. 애드센스를 붙일 때 미들웨어로 nonce를 발급하며 함께 손본다.
 */
const securityHeaders = [
  /* 서버가 말한 Content-Type을 브라우저가 제멋대로 바꿔 해석하지 못하게 한다.
     텍스트 파일이 스크립트로 실행되는 경로를 막는다. */
  { key: "X-Content-Type-Options", value: "nosniff" },

  /* 다른 사이트가 우리 페이지를 프레임에 넣지 못하게 한다(클릭재킹).
     X-Frame-Options는 구형 브라우저용, CSP frame-ancestors가 현행 표준이라
     둘 다 건다. */
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },

  /* 외부로 나갈 때 전체 URL 대신 출처만 보낸다. 우리 URL에는 개인정보가
     없지만, 자가진단 결과가 나중에 쿼리스트링에 실리더라도 새 나가지 않게
     지금 기본값을 잡아 둔다. */
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  /* 쓰지 않는 브라우저 기능을 아예 꺼 둔다. 나중에 코드나 광고 스크립트가
     이걸 요구하면 이용자에게 권한 창이 뜨는데, 복지 정보 사이트에서 카메라·
     위치 권한을 물으면 그 자체로 사기처럼 보인다. */
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },

  /* 이 도메인은 앞으로도 https로만 뜬다. preload는 넣지 않았다 — 목록에
     올리면 되돌리기가 매우 번거롭고, 지금 얻을 이득이 그만큼 크지 않다. */
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  /* 어떤 프레임워크로 만들었는지 굳이 헤더로 알리지 않는다. */
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
