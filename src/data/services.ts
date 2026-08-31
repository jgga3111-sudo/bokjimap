import type { WelfareService } from "@/types/welfare";

/**
 * 복지 서비스 데이터.
 *
 * **아직 비어 있다.** 공공데이터포털 인증키를 받아 실제 응답을 확인한 뒤
 * 수집 스크립트로 채운다. 지금 임의의 예시 데이터를 넣지 않는 이유는, 그게
 * 남아서 진짜 데이터인 척하는 사고가 흔하기 때문이다.
 *
 * 데이터가 들어와도 DB는 쓰지 않는다. 갱신주기가 연 단위라 파일로 충분하고,
 * Supabase 무료 플랜은 활성 프로젝트 2개 제한 + 1주일 무활동 시 자동 중지라
 * 러닝온과 경합한다(CLAUDE.md 0절).
 *
 * 검증된 API 엔드포인트는 `docs/01-api.md` 참조.
 */
export const services: readonly WelfareService[] = [];

/** 데이터 파일을 마지막으로 갱신한 날. sitemap의 lastmod에 쓴다. */
export const SERVICES_UPDATED = "2026-08-31";
