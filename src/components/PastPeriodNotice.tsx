"use client";

import { useSyncExternalStore } from "react";

/**
 * "본문에 적힌 신청 기간이 이미 지났습니다" 띠.
 *
 * ── 왜 브라우저에서 그리나 ─────────────────────────────────────
 * 이 사이트는 전부 정적으로 미리 만들어 둔다. 서버에서 `new Date()`로
 * "지났는가"를 판정하면 **빌드한 날의 답**이 HTML에 굳는다. 그러면 5월 19일에
 * 배포한 페이지는 5월 21일이 되어도 "아직 안 지났다"고 말한다. 마감을 알리려고
 * 만든 장치가 마감을 숨기는 꼴이다.
 *
 * 그래서 서버는 **적혀 있는 끝날**만 넘기고(`src/lib/applyPeriod.ts`),
 * 오늘과의 비교는 여기서 한다. 다음 해 공고가 올라오기 전까지, 배포를 하지
 * 않아도 날짜가 지나는 순간 스스로 뜬다.
 *
 * `RecentViews`·`MyEligibility`·`ThisMonth`와 같은 `useSyncExternalStore`
 * 방식이다. 이 저장소의 린트가 효과 안 setState를 막고 있기도 하고,
 * 하는 일 자체가 **바깥 값(오늘)을 읽어 오는 것**이라 원래 이쪽이 맞다.
 *
 * ── 무엇을 말하고 무엇을 말하지 않나 ───────────────────────────
 * "신청이 마감됐습니다"라고 단정하지 않는다. 우리가 아는 것은 **원문에 적힌
 * 기간이 지났다**는 사실뿐이고, 추가 모집이 붙었는지 올해 공고가 새로
 * 나왔는지는 모른다. 판정은 하지 않고 공식 안내로 보낸다(CLAUDE.md 3절).
 */

/** 날짜는 세션 도중 바뀌지 않는다. 구독할 바깥 사건이 없어 해지 함수만 준다. */
const noop = () => () => {};

/**
 * 보는 사람의 **현지 날짜**. `toISOString()`은 UTC라 한국 시간 자정~오전 9시에
 * 하루 전으로 읽힌다 — 마감 당일에 띠가 안 뜨는 창이 아홉 시간 생긴다.
 */
const localToday = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

/** 서버에는 "오늘"이 없다. 정적 HTML에 빌드한 날의 판정을 굳히지 않는다. */
const noToday = () => null;

export default function PastPeriodNotice({
  end,
  text,
}: {
  /** 본문에 적힌 신청 기간의 끝날. `YYYY-MM-DD` */
  end: string;
  /** 본문 원문 조각. 우리가 고쳐 쓰지 않고 그대로 보여준다. */
  text: string;
}) {
  const today = useSyncExternalStore(noop, localToday, noToday);

  if (today === null) return null;
  if (end >= today) return null;

  return (
    <p className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
      <strong>본문에 적힌 신청 기간({text})은 이미 지났습니다.</strong>{" "}
      해마다 다시 공고가 나오는 사업일 수 있으니, 올해 일정은{" "}
      <a href="#official" className="font-bold underline">
        아래 공식 안내
      </a>
      에서 확인해 주세요.
    </p>
  );
}
