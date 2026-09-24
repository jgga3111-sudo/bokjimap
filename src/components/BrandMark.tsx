/**
 * 로고 표지(2026-09-24). 여태 로고가 「복지클릭」 글자뿐이었다 — 웰로·정부24·토스는
 * 전부 표지 하나를 글자 앞에 둔다. 글자만 있으면 만들다 만 사이트로 읽힌다.
 *
 * 모양은 이름 그대로 「누르는 손가락 끝」 — 둥근 사각 위에 화살표와 물결 두 줄.
 * 정부 상징(태극·무궁화)을 닮은 것은 피했다. 공공기관으로 읽히면 안 된다(layout.tsx
 * 구조화 데이터 주석과 같은 이유).
 */
export default function BrandMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" className="fill-brand" />
      <path
        d="M12.5 10.5 22 17.2l-4.3.9 2.4 4.8-2 1-2.4-4.8-3.2 2.7z"
        fill="#fff"
        strokeLinejoin="round"
        stroke="#fff"
        strokeWidth="0.8"
      />
      <path
        d="M8.2 12.6a6 6 0 0 1 3-4.2M6 11.2a8.6 8.6 0 0 1 4.2-5.6"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.7"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
