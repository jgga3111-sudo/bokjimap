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

  /*
    CSP.

    `script-src`는 여전히 넣지 않는다(위 머리말 참고). 대신 **스크립트와
    무관하면서 애드센스를 건드리지 않는** 세 가지를 더 건다. 2026-09-06에
    셋 다 지금 코드에서 쓰이지 않는 것을 확인하고 넣었다 —
    `<form>` 0건, `<iframe>·<object>·<embed>` 0건, `<base>` 0건.

      base-uri 'self'
        `<base href="https://남의사이트/">` 한 줄이 주입되면 페이지의 모든
        상대 링크가 그쪽으로 간다. 우리 상세 페이지는 링크가 수십 개고
        본문이 전부 외부 데이터라, 이게 막히지 않으면 링크를 통째로
        빼앗기는 경로가 열린다.

      form-action 'self'
        주입된 폼이 남의 서버로 값을 보내는 것을 막는다. 지금 이 사이트에
        폼은 하나도 없으니 잃을 것이 없다.

      object-src 'none'
        플래시·PDF 플러그인 삽입 경로를 닫는다. 역시 쓰는 데가 없다.

    광고는 iframe **안**에서 뜨는데, CSP는 다른 출처의 iframe 내부로
    상속되지 않는다. 그래서 이 셋은 애드센스에 영향을 주지 않는다.
    `frame-src`를 건드리지 않은 것도 같은 이유다 — 그건 광고 iframe을
    직접 막는 자리라 손대면 광고가 사라진다.
  */
  {
    key: "Content-Security-Policy",
    value:
      "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
  },

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

  /* 다른 사이트가 우리 페이지를 팝업으로 열어 창 사이를 건드리지 못하게
     한다. `same-origin`이 아니라 `-allow-popups`로 둔 이유 — 광고 클릭으로
     새 창이 열리는 것은 그대로 되어야 한다(09-11 보안 점검). */
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
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
