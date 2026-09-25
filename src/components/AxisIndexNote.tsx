import Link from "next/link";
import type { ReactNode } from "react";
import { services } from "@/data/services";
import type { Axis } from "@/lib/axes";

/**
 * 축 목록(/life·/target) 머리 설명 (2026-09-25).
 *
 * 애드센스 점검에서 이 두 쪽 본문이 270자 안팎이고 거의 다 링크 글자라는 지적을 받았다.
 * 칸만 늘어놓으면 "이 분류가 무엇이고 어디까지 믿을 수 있나"를 말하지 않는다 — 그걸 적는다.
 * 숫자와 예시 사업은 전부 렌더할 때 센다(수록이 바뀌면 같이 바뀐다).
 */
export default function AxisIndexNote({
  field,
  word,
  axes,
  children,
}: {
  field: "lifeStages" | "targets";
  /** 「생애주기」·「대상」 */
  word: string;
  axes: readonly Axis[];
  /** 축마다 다른 셋째 문단 */
  children: ReactNode;
}) {
  const label = (slug: string) => axes.find((a) => a.slug === slug)?.label ?? slug;
  const byViews = [...services].sort((a, b) => b.views - a.views);
  const multi = byViews.filter((s) => s[field].length > 1);
  const empty = byViews.filter((s) => s[field].length === 0);
  const ex = multi[0];

  return (
    <section className="card space-y-3 px-5 py-5 text-sm leading-relaxed text-slate-700 sm:px-7 sm:py-6">
      <h2 className="text-lg font-extrabold text-ink">이 분류는 이렇게 읽어 주세요</h2>
      <p>
        {word} 칸은 저희가 나눈 것이 아니라 복지로 원문이 사업마다 붙여 둔 분류입니다. 한 사업에
        여러 칸이 붙기도 해서, 수록 {services.length.toLocaleString()}건 중{" "}
        {multi.length.toLocaleString()}건은 둘 이상의 목록에 함께 나옵니다
        {ex && (
          <>
            {" "}
            — 예를 들어 「{ex.name}」은 {ex[field].map(label).join(", ")} 목록에 모두 있습니다
          </>
        )}
        . 그래서 위 목록의 건수를 더하면 수록 건수보다 많습니다.
      </p>
      <p>
        반대로 {empty.length.toLocaleString()}건은 원문에 이 칸이 비어 있어 어느 목록에도 나오지
        않습니다.{" "}
        {empty.length >= 3 && (
          <>
            「{empty[0].name}」·「{empty[1].name}」·「{empty[2].name}」처럼 많이 찾는 사업도 여기에
            들어 있습니다.{" "}
          </>
        )}
        목록에서 못 찾으면 위 검색창에 이름을 넣거나{" "}
        <Link href="/#ask" className="text-brand underline">
          말로 물어보기
        </Link>
        를 써 보세요.
      </p>
      <p>{children}</p>
    </section>
  );
}
