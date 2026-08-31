"use client";

import Link from "next/link";

/**
 * 페이지 렌더 중 예외가 났을 때의 화면.
 *
 * 이게 없으면 Next.js 기본 오류 화면이 뜬다. 개발 모드에서는 스택 추적이,
 * 배포에서는 영문 "Application error: a client-side exception has occurred"가
 * 나온다. 복지 정보를 찾으러 온 사람에게는 사이트가 통째로 고장 난 것으로
 * 보이고, 애드센스 심사에서도 그대로 노출된다.
 *
 * `digest`만 보여주고 오류 내용은 감춘다. 예외 메시지에는 내부 경로나 데이터
 * 구조가 섞여 나올 수 있는데, 그건 이용자에게 쓸모없고 공격자에게는 단서다.
 * 문의로 digest를 받으면 Vercel 로그에서 같은 값을 찾아 대조할 수 있다.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl py-8 text-center">
      <p className="text-4xl font-extrabold text-amber">!</p>
      <h1 className="mt-4 text-xl font-bold sm:text-2xl">
        화면을 불러오지 못했습니다
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        일시적인 문제일 수 있습니다. 다시 시도해 보시고, 계속 같은 화면이 나오면
        알려주세요.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-brand px-5 py-3 font-bold text-white transition hover:brightness-110"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="rounded-xl border border-line bg-white px-5 py-3 font-bold text-ink transition hover:border-brand hover:text-brand"
        >
          첫 화면으로
        </Link>
      </div>

      {error.digest && (
        <p className="mt-6 text-xs text-muted">
          오류 번호 <code className="font-mono">{error.digest}</code> —{" "}
          <Link href="/contact" className="underline hover:text-brand">
            문의
          </Link>
          하실 때 이 번호를 함께 알려주시면 빨리 찾을 수 있습니다.
        </p>
      )}
    </div>
  );
}
