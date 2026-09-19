"use client";

import { useSyncExternalStore } from "react";

/**
 * 보는 사람의 **오늘**(`YYYY-MM-DD`, 현지 시각). 서버에서는 null.
 *
 * `PastPeriodNotice`·`ThisMonth`가 같은 코드를 각자 들고 있다. 2026-09-13에
 * 「마감」 딱지와 모아 보기가 더 붙으면서 넷째·다섯째 사본이 생길 참이라
 * 새로 쓰는 쪽은 이걸 부른다(원래 둘은 건드리지 않았다 — 요청 밖 수정이다).
 *
 * · 서버에는 "오늘"이 없다. 정적 HTML에 **빌드한 날의 판정**을 굳히지 않으려고
 *   null을 준다 — 배포를 안 하는 동안 조용히 틀려 간다(PastPeriodNotice 머리말).
 * · `toISOString()`은 UTC라 한국 새벽 0~9시에 어제로 읽힌다. 마감 당일 아홉
 *   시간 동안 딱지가 안 뜨는 창이 생기므로 현지 날짜로 만든다.
 * · 자정을 넘겨 열어 둔 탭은 다시 볼 때(탭 복귀·창 포커스) 날짜를 다시 읽는다(09-19).
 *   안 그러면 D-day가 어제 값으로 남는다. 타이머는 두지 않는다 — 안 보는 탭은 틀려도 해가 없다.
 */
const subscribe = (onChange: () => void) => {
  document.addEventListener("visibilitychange", onChange);
  window.addEventListener("focus", onChange);
  return () => {
    document.removeEventListener("visibilitychange", onChange);
    window.removeEventListener("focus", onChange);
  };
};

const localToday = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const noToday = () => null;

export function useLocalToday(): string | null {
  return useSyncExternalStore(subscribe, localToday, noToday);
}
