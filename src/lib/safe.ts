/**
 * 외부에서 들어온 값을 화면에 내보내기 전에 거르는 곳.
 *
 * 이 사이트의 본문·링크·기관명은 전부 공공데이터포털 API가 준 값이다.
 * 정부 데이터라서 안전할 것 같지만, **우리가 만들지 않은 문자열**이라는 점은
 * 똑같다. 지자체 담당자가 입력한 값이 그대로 흘러오고, 필드에 무엇이 들어올지
 * 우리는 통제하지 못한다. 그래서 여기서 한 번 거른다.
 */

/**
 * JSON-LD를 `<script>` 안에 넣을 때 쓴다.
 *
 * `JSON.stringify`는 `<`를 이스케이프하지 않는다. 사업명에 `</script>`가
 * 들어 있으면 브라우저가 거기서 스크립트를 닫아 버리고, 그 뒤 문자열이
 * **HTML로 해석된다.** 구조화 데이터를 넣으려다 스크립트 삽입 통로를 여는 셈이다.
 *
 * `<` 같은 유니코드 이스케이프는 JSON에서 원래 글자와 완전히 같은 값이라
 * 검색엔진이 읽는 내용은 바뀌지 않는다. HTML 파서만 못 알아보게 만드는 것이다.
 * `&`까지 막는 건 HTML 주석(`<!--`)으로 파서 상태를 흔드는 변종을 함께 끊기 위함이다.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/**
 * 링크에 걸어도 되는 주소인지 본다. http/https가 아니면 **null을 준다.**
 *
 * `javascript:`로 시작하는 값이 href에 들어가면 이용자가 누르는 순간 그
 * 스크립트가 우리 사이트 권한으로 실행된다. 원본 데이터에 그런 값이 있는지
 * 지금은 없지만, 링크 필드(홈페이지·서식)는 담당자가 자유 입력하는 칸이라
 * 언제든 들어올 수 있다.
 *
 * 스킴이 아예 없는 값(`www.bokjiro.go.kr`)은 https를 붙여 살린다 — 실제
 * 데이터에 흔한 형태이고, 버리면 멀쩡한 링크가 사라진다.
 */
export function safeUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const v = raw.trim();
  if (v === "") return null;

  // 스킴이 없으면 https를 붙인다. `//`로 시작하는 값도 스킴 없는 주소다.
  const candidate = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(v)
    ? v
    : `https://${v.replace(/^\/+/, "")}`;

  try {
    const u = new URL(candidate);
    return u.protocol === "http:" || u.protocol === "https:" ? u.href : null;
  } catch {
    // 주소로 해석되지 않는 값(설명문이 링크 칸에 들어온 경우 등)
    return null;
  }
}

/**
 * 전화 링크.
 *
 * `tel:` 자체는 스크립트를 실행하지 못한다. 여기서 막는 것은 **잘못된 번호로
 * 거는 링크**다. 원본 문의처 칸은 자유 입력이라 실제로 이런 값들이 들어온다.
 *
 *   "044-202-3000"          정상
 *   "1577-1000 (내선 2)"     내선 표기가 붙음
 *   "☎ 02-2133-7000"        기호가 앞에 붙음
 *   "평일 09시~18시"          아예 번호가 아님
 *
 * 처음엔 숫자만 전부 뽑아 붙였다. 그랬더니 "1577-1000 (내선 2)"가
 * `tel:157710002`가 됐다 — 내선 번호가 뒤에 달라붙은 **없는 번호**다.
 * 죽은 링크보다 나쁘다. 엉뚱한 곳으로 실제로 전화가 걸린다.
 *
 * 그래서 **첫 숫자부터 이어지는 한 덩어리만** 쓴다. 뒤에 괄호나 한글이
 * 나오면 거기서 끊는다.
 *
 * 최소 3자리인 이유 — 129(보건복지상담센터), 120(다산콜) 같은 특수번호가
 * 문의처에 실제로 자주 들어온다. 7자리로 잡았다가 이것들을 통째로 잃었다.
 */
export function telHref(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const s = raw.trim();

  const first = s.search(/\d/);
  if (first < 0) return null;

  const run = s.slice(first).match(/^[\d\-\s.]+/);
  if (!run) return null;

  const digits = run[0].replace(/\D/g, "");
  if (digits.length < 3 || digits.length > 15) return null;
  return `tel:${digits}`;
}
