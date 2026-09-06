"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { entriesOfMonth } from "@/lib/calendar";

/**
 * 첫 화면의 "이번 달에 챙길 것" 한 줄.
 *
 * **왜 클라이언트인가.** 이 사이트는 전부 정적으로 미리 만들어 둔다. 서버에서
 * `new Date()`를 부르면 **빌드한 날의 달**이 HTML에 박히고, 배포를 안 하면
 * 10월에도 9월이라고 적혀 있게 된다. 달이 넘어가는 순간 거짓말이 되는 문장을
 * 정적 HTML에 박아 둘 수는 없다.
 *
 * 그래서 서버는 아무것도 그리지 않고(null), 브라우저에서 달을 읽은 뒤에만
 * 나타난다. 하이드레이션 불일치가 생기지 않는 방식이다. 색인 관점에서도
 * 잃는 게 없다 — 이 줄이 가리키는 `/guide/calendar`는 정적으로 만들어져
 * 사이트맵에 들어가고, 푸터와 안내 목록에서도 링크된다.
 *
 * 달력에 없는 달은 없지만(`calendar.ts` 참고), 나중에 항목을 빼서 빈 달이
 * 생기면 이 줄은 조용히 사라진다. 빈 상자를 그리지 않는다.
 *
 * `calendar.ts`는 `services.ts`(2.9MB)를 부르지 않는다. 그래서 이 컴포넌트를
 * 클라이언트로 둬도 번들이 커지지 않는다.
 *
 * `useEffect`+`setState`가 아니라 `useSyncExternalStore`를 쓴다. 이 저장소의
 * 린트가 효과 안에서 setState를 부르는 것을 막고 있고(cascading render),
 * 이 컴포넌트가 하는 일이 바로 **바깥 값(달력)을 읽어 오는 것**이라
 * 원래 이쪽이 맞는 도구다. `RecentViews`·`MyEligibility`도 같은 방식이다.
 */

/** 달은 세션 도중 바뀌지 않는다. 구독할 바깥 사건이 없어 해지 함수만 준다. */
const noop = () => () => {};
/** 브라우저에서만 부른다. 같은 달 안에서는 늘 같은 수라 스냅숏이 안정적이다. */
const currentMonth = () => new Date().getMonth() + 1;
/** 서버에는 "지금"이 없다. 정적 HTML에 빌드한 달을 박지 않으려고 null을 준다. */
const noMonth = () => null;

export default function ThisMonth() {
  const month = useSyncExternalStore(noop, currentMonth, noMonth);

  if (month === null) return null;

  const rows = entriesOfMonth(month);
  if (rows.length === 0) return null;

  /* 한 줄이라 다 못 싣는다. 앞의 둘만 이름을 보이고 나머지는 수로 말한다.
     같은 제도가 그달에 두 번 걸리는 경우가 있어(9월 근로장려금 신청·지급)
     이름은 중복을 없애고 센다. */
  const names = [...new Set(rows.map((r) => r.label))];
  const shown = names.slice(0, 2);
  const more = names.length - shown.length;

  return (
    <Link
      href={`/guide/calendar#m${month}`}
      className="group block rounded-2xl border border-amber-300/70 bg-amber-50/70 px-5 py-4 transition hover:border-amber-400"
    >
      {/* 375px에서 셋을 한 줄에 흘려보내면 "신청 달력 →"만 다음 줄에 홀로
          떨어져 어디에 걸린 말인지 알 수 없다. 제목과 링크를 한 줄에 묶고,
          제도 이름은 아래로 내린다. */}
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-extrabold text-amber-900">
          📅 {month}월에 챙길 것
        </span>
        <span className="shrink-0 text-xs font-bold text-amber-800 group-hover:underline">
          신청 달력 →
        </span>
      </div>
      <p className="mt-1 text-sm text-slate-700">
        {shown.join(" · ")}
        {more > 0 && ` 외 ${more}개`}
      </p>
      <p className="mt-1 text-xs text-slate-600">
        기간이 정해져 있어 놓치면 못 받는 것만 모았습니다 · 공식 공고에서 확인
      </p>
    </Link>
  );
}
