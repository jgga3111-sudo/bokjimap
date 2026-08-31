"use client";

/**
 * 레이아웃 자체가 터졌을 때의 최후 화면.
 *
 * `error.tsx`는 레이아웃 **안쪽**에서 난 오류만 잡는다. 헤더나 푸터가
 * 터지면 그 바깥이라 잡히지 않고, 그때는 이 파일이 대신 뜬다.
 * 레이아웃을 못 쓰는 상황이므로 `<html>`과 `<body>`를 직접 그려야 하고,
 * 전역 CSS도 안 실렸다고 보고 스타일을 인라인으로 둔다.
 *
 * 여기까지 왔다는 건 사이트 골격이 무너진 것이다. 길게 설명하지 않고
 * 새로고침만 안내한다.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body
        style={{
          fontFamily:
            '"Pretendard","Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif',
          color: "#17181a",
          margin: 0,
          padding: "64px 16px",
          textAlign: "center",
          wordBreak: "keep-all",
        }}
      >
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
          사이트를 불러오지 못했습니다
        </h1>
        <p style={{ marginTop: 8, fontSize: 14, color: "#6b7280" }}>
          잠시 후 다시 시도해 주세요.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: 24,
            padding: "12px 20px",
            fontSize: 15,
            fontWeight: 700,
            color: "#fff",
            background: "#0b57d0",
            border: 0,
            borderRadius: 12,
            cursor: "pointer",
          }}
        >
          새로고침
        </button>
        {error.digest && (
          <p style={{ marginTop: 24, fontSize: 12, color: "#6b7280" }}>
            오류 번호 {error.digest}
          </p>
        )}
      </body>
    </html>
  );
}
