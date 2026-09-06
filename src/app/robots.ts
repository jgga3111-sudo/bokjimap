import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * robots.txt
 *
 * ── 먼저 분명히 해 둘 것 ──────────────────────────────────────────
 * 이 사이트는 **검색에 걸리는 것이 유일한 유입 경로**다. 그래서 "크롤링을
 * 막는다"는 말은 여기서 두 갈래로 갈린다.
 *
 *   검색엔진(구글·빙·네이버·다음)  — 막으면 사이트가 죽는다. 전부 열어 둔다.
 *   그 밖의 수집기                — 막아도 잃을 것이 없다. 여기서 막는다.
 *
 * 그리고 robots.txt는 **지키는 봇에게만** 통한다. 법적 구속력이 없고, 악성
 * 스크레이퍼는 그냥 무시한다. 그래도 다는 이유는, 실제로 트래픽을 많이
 * 먹는 대형 수집기(AI 학습·SEO 분석)는 대부분 이걸 지키기 때문이다.
 * 진짜로 요청을 끊으려면 Vercel 방화벽(WAF)이 필요하다 — 대시보드에서 켠다.
 *
 * ── 왜 AI 학습 수집기를 막나 ──────────────────────────────────────
 * 이 사이트의 경쟁 상대는 **틀린 정보를 퍼뜨리는 AI 양산 블로그**다
 * (CLAUDE.md 3절). 우리가 법령을 한 조씩 찾아 채운 지급일 같은 것을
 * 학습 수집기가 통째로 가져가면, 우리를 이기는 데 우리 데이터가 쓰인다.
 * 반대로 학습을 막아도 **검색 순위에는 영향이 없다** — 구글은
 * Google-Extended가 검색 색인·순위와 무관하다고 명시한다.
 *
 * ── 반대로 열어 두는 것 ───────────────────────────────────────────
 * AI **검색** 봇(OAI-SearchBot, ChatGPT-User, Claude-User, PerplexityBot)은
 * 막지 않는다. 학습용이 아니라 답변에 출처를 달아 사람을 보내 주는 쪽이다.
 * 학습만 막고 유입은 받는 것이 이득이다.
 *
 * 판단이 갈리면 여기 한 줄을 옮기면 된다. 예컨대 퍼플렉시티까지 막고 싶으면
 * `PerplexityBot`과 `Perplexity-User`를 아래 AI_TRAINING에 넣는다.
 *
 * 링크 미리보기 봇(카카오톡·페이스북·트위터·슬랙)도 열어 둔다. 카톡으로
 * 링크를 보냈을 때 제목·이미지가 뜨는 것이 이 주제에서는 특히 중요하다.
 *
 * 애드센스 크롤러(Mediapartners-Google)도 반드시 열려 있어야 한다.
 * 막으면 광고가 안 붙는다. 아래 `*` 규칙에 포함되니 따로 적지 않는다.
 */

/**
 * AI 학습 데이터 수집기.
 *
 * 여기 없는 이름이 계속 생긴다. 새 이름을 봤을 때 판단 기준은 하나다 —
 * **그 봇이 사람을 우리 사이트로 보내 주는가.** 보내 주면 열고, 가져가기만
 * 하면 막는다.
 */
const AI_TRAINING = [
  "GPTBot", // OpenAI 학습 (검색용 OAI-SearchBot과 다른 봇이다)
  "ClaudeBot", // Anthropic 학습
  "anthropic-ai",
  "Claude-Web",
  "CCBot", // Common Crawl — 공개 학습 데이터셋 대부분이 여기서 나온다
  "Google-Extended", // Gemini 학습. 검색 색인·순위와는 무관하다
  "Applebot-Extended", // Apple Intelligence 학습 (검색용 Applebot은 열어 둔다)
  "meta-externalagent", // Meta AI 학습 (미리보기용 facebookexternalhit은 열어 둔다)
  "meta-externalfetcher",
  "FacebookBot",
  "Bytespider", // ByteDance. 요청량이 유난히 많은 것으로 알려져 있다
  "Amazonbot",
  "YouBot",
  "Diffbot",
  "omgili",
  "omgilibot",
  "ImagesiftBot",
  "Timpibot",
  "AI2Bot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "Kangaroo Bot",
  "Webzio-Extended",
  "Scrapy", // 기본값 그대로 돌리는 수집 스크립트
];

/**
 * SEO 분석 크롤러.
 *
 * 우리에게 사람을 보내 주지 않는다. 하는 일은 두 가지다 — 우리 구조와
 * 키워드를 훑어 유료 도구에 파는 것, 그리고 대역폭을 쓰는 것.
 * 경쟁 사이트가 우리를 들여다보는 통로이기도 하다.
 */
const SEO_SCANNERS = [
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "BLEXBot",
  "DataForSeoBot",
  "Barkrowler",
  "serpstatbot",
  "ZoominfoBot",
  "magpie-crawler",
  "SeekportBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      /* 기본 — 검색엔진과 미리보기 봇은 전부 여기 걸린다.
         robots.txt는 "가장 잘 맞는 그룹 하나"만 적용되므로, 아래에서 이름을
         집어 막은 봇만 빠지고 나머지는 이 규칙을 그대로 따른다. */
      {
        userAgent: "*",
        allow: "/",
        // 내부용 화면은 색인 대상이 아니다.
        disallow: ["/api/"],
      },
      { userAgent: AI_TRAINING, disallow: "/" },
      { userAgent: SEO_SCANNERS, disallow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
