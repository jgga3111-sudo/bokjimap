/**
 * 질의 문자열을 다루는 순수 함수들.
 *
 * `lib/search.ts`(브라우저 색인)와 `lib/searchFull.ts`(서버 전문검색)가
 * **같은 규칙으로** 글자를 다뤄야 해서 따로 떼어 놓았다. 한쪽만 고치면
 * 헤더 드롭다운과 결과 페이지가 다른 답을 내놓는다.
 *
 * 이 파일은 데이터를 import하지 않는다. 그래야 클라이언트 번들에 들어가도
 * 안전하다.
 */

/* ── 한글 초성 검색 ───────────────────────────────────────────────
   "ㅊㄴㅇㅅ"로 "청년월세"를 찾을 수 있게 한다. 한국어 사이트에서 이용자가
   기대하는 동작이고, 오타·띄어쓰기 실수를 많이 흡수한다.

   한글 음절은 유니코드 0xAC00~0xD7A3에 초성 19 × 중성 21 × 종성 28 순서로
   배열돼 있다. 그래서 (코드 − 0xAC00) / 588 이 초성 인덱스다.
   ──────────────────────────────────────────────────────────────── */
const CHO = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const HANGUL_START = 0xac00;
const HANGUL_END = 0xd7a3;

export function toChoseong(text: string): string {
  let out = "";
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code >= HANGUL_START && code <= HANGUL_END) {
      out += CHO[Math.floor((code - HANGUL_START) / 588)];
    } else {
      out += ch;
    }
  }
  return out;
}

/** 질의가 초성만으로 이뤄졌는가. 그럴 때만 초성 대조로 전환한다. */
export const isChoseongQuery = (q: string) =>
  /^[ㄱ-ㅎ]+$/.test(q.replace(/\s/g, ""));

/** 비교용 정규화 — 공백과 가운뎃점을 지운다. "청년 월세" = "청년월세" */
export const norm = (s: string) =>
  s.toLowerCase().replace(/[\s·・.,()]/g, "");
