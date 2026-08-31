"use client";

import { useSyncExternalStore } from "react";
import { SITE } from "@/lib/site";

/**
 * 이메일 주소를 화면에서 조립해 보여준다.
 *
 * 서버가 내보내는 HTML에는 `jgga1234567 @ gmail.com`처럼 띄어 쓴 글자만 담고,
 * 브라우저에서 수화(hydration)가 끝난 뒤에 mailto 링크로 바꾼다. 수집 봇
 * 대부분은 HTML만 정규식으로 긁어가므로 이것만으로도 상당수를 거른다.
 *
 * useEffect + setState 대신 useSyncExternalStore를 쓴다. 서버 스냅샷은 false,
 * 클라이언트 스냅샷은 true라서 수화 전후가 자연스럽게 갈리고, 이펙트 안에서
 * setState를 부르는 연쇄 렌더도 생기지 않는다.
 */
const subscribe = () => () => {};

export default function MailLink({ className }: { className?: string }) {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!hydrated) {
    return (
      <span className={className}>
        {SITE.contactUser} @ {SITE.contactHost}
      </span>
    );
  }

  const address = `${SITE.contactUser}@${SITE.contactHost}`;
  return (
    <a href={`mailto:${address}`} className={className}>
      {address}
    </a>
  );
}
