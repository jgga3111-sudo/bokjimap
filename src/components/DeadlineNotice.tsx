"use client";

import { CLOSING } from "@/data/closing";
import { useLocalToday } from "@/lib/useLocalToday";
import { deadlineState } from "./DeadlineBadge";
import { ddayLabel } from "@/lib/dday";

/**
 * 상세 페이지 「곧 끝납니다」 띠 — D-10부터 끝나는 날까지만 나타난다(2026-09-13).
 *
 * 제목 옆 딱지(`DeadlineBadge`)는 짧아서, 휴대폰에서는 마우스를 올려 설명을 볼
 * 수가 없다. 그래서 상세에서만은 한 문장으로 풀어 적는다. 끝나는 날이 지나면
 * 이 띠는 사라지고 `PastPeriodNotice`(「이미 지났습니다」)가 그 자리를 받는다 —
 * 둘은 같은 끝날을 보므로 겹치거나 비는 날이 없다.
 *
 * **예산 조기 소진 문장을 늘 붙인다.** D-8이라고 적어 두면 사람은 8일 안에만
 * 하면 된다고 믿는다. 실제로는 「예산 소진 시 마감」인 사업이 많아(09-13 수록
 * 910건 본문에서 여러 건 확인) 그 전에 끝날 수 있다. 숫자가 확실해 보일수록
 * 이 한 줄이 필요하다.
 */
export default function DeadlineNotice({ id }: { id: string }) {
  const today = useLocalToday();
  const st = deadlineState(id, today);
  if (!st || st.kind !== "soon") return null;
  const c = CLOSING[id];
  /* 신청 기간은 본문 문장에서 뽑은 것이고, 사업 기간은 원문의 시행 기간 칸에서
     온 것이다. 「본문에 적힌 사업 기간」이라고 쓰면 본문에 없는 말을 한 셈이다. */
  const what =
    c.kind === "period"
      ? "본문에 적힌 신청 기간"
      : c.kind === "gov24"
        ? "보조금24(행정안전부)에 적힌 신청기한"
        : "원문에 적힌 사업 기간";

  return (
    <p className="mt-4 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm leading-relaxed text-rose-900">
      <strong>
        {ddayLabel(st.days)} — {what}({c.text})
        {st.days === 0 ? "이 오늘 끝납니다." : `이 ${st.days}일 뒤에 끝납니다.`}
      </strong>{" "}
      예산이 떨어지면 그 전에 끝날 수 있으니{" "}
      <a href="#official" className="font-bold underline">
        아래 공식 안내
      </a>
      에서 먼저 확인해 주세요.
    </p>
  );
}
