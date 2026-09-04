import Link from "next/link";
import Badge from "./Badge";
import {
  payType,
  cycleLabel,
  views,
  placeLabel,
  visiblePayTypes,
} from "@/lib/display";
import { targetBySlug, lifeStageBySlug } from "@/lib/axes";
import type { WelfareService } from "@/types/welfare";

/**
 * 카드가 실제로 읽는 필드만 추린 형태.
 *
 * `WelfareService` 전체를 받으면 이 카드를 **클라이언트에서 그릴 수 없다.**
 * 필터가 붙은 허브 목록(`HubList`)은 브라우저에서 항목을 골라 다시 그리는데,
 * 그러려면 항목이 RSC 페이로드를 타고 브라우저까지 와야 한다. 한 건에
 * 지원내용·선정기준·신청절차·서식까지 다 실리면 481건짜리 목록에서만
 * 1MB가 넘는다. 여기 적힌 열세 개면 카드를 그리는 데 충분하다.
 */
export type CardService = Pick<
  WelfareService,
  | "id"
  | "name"
  | "summary"
  | "views"
  | "department"
  | "provider"
  | "sidoName"
  | "sigunguName"
  | "targets"
  | "lifeStages"
  | "cycle"
  | "payTypes"
  | "onlineApply"
>;

/**
 * 서비스 카드.
 *
 * 처음에는 한 장에 딱지가 5~6개였다 — 지급형태 배지 두 개(각각 다른 색에
 * 이모지까지), 주기 배지, 온라인신청 배지, 그리고 아래에 대상 태그 세 개.
 * 목록은 카드를 여덟 장 깔기 때문에 화면 하나에 색 딱지가 마흔 개가 됐다.
 * "복잡해 보인다"의 정체가 이것이었다.
 *
 * 같은 사업(청년월세)을 정부24 서비스 상세에서 열어 보면 배지가 하나다.
 *
 * 그래서 **색이 붙는 것은 위쪽 두 개까지**로 못 박았다.
 *   ① 지급 형태 하나 — 돈이 나오는지 아닌지. 가장 먼저 알고 싶은 것.
 *   ② 온라인신청 — 900건 중 54건(6%)뿐이라 있으면 실제로 드문 정보다.
 *      (첫 화면 상위 8건이 우연히 전부 여기 해당해 반복처럼 보이지만,
 *       목록 전체로 보면 열에 아홉은 이 배지가 없다.)
 *
 * 주기와 대상은 정보가 아니라 부연이다. 배지에서 빼 **맨 아래 회색 한 줄**로
 * 내렸다. 읽히기는 하되 먼저 눈에 띄지는 않는다.
 *
 * 값이 없는 줄은 통째로 비운다. "정보 없음"으로 채우면 카드가 노이즈가 된다.
 */
export default function ServiceCard({
  service: s,
  rank,
}: {
  service: CardService;
  rank?: number;
}) {
  const tags = [
    ...s.targets.map((t) => targetBySlug(t)?.label),
    ...s.lifeStages.map((t) => lifeStageBySlug(t)?.label),
  ].filter(Boolean);

  /* 맨 아래 한 줄 — 주기 + 대상 둘. 점으로 잇는다. */
  const meta = [cycleLabel(s.cycle), ...tags.slice(0, 2)].filter(Boolean);

  /* 지급 형태는 첫 번째만 보여준다. 둘 이상인 사업은 상세의
     "한눈에 보기"에 전부 적혀 있다. */
  const pay = visiblePayTypes(s.payTypes)[0];

  return (
    <Link
      href={`/service/${s.id}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-white p-4 transition hover:border-brand hover:shadow-[0_2px_12px_rgba(11,87,208,0.08)]"
    >
      {(pay || s.onlineApply) && (
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          {pay && <Badge tone={payType(pay).tone}>{payType(pay).label}</Badge>}
          {s.onlineApply && <Badge>온라인신청</Badge>}
        </div>
      )}

      <h3 className="font-bold leading-snug text-ink group-hover:text-brand">
        {rank !== undefined && (
          <span className="mr-1.5 text-sm font-extrabold text-brand">
            {rank}
          </span>
        )}
        {s.name}
      </h3>

      <p className="mt-1 text-xs text-muted">
        {[placeLabel(s), s.department].filter(Boolean).join(" · ")}
      </p>

      {s.summary && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {s.summary}
        </p>
      )}

      <div className="mt-auto flex items-end justify-between gap-3 pt-3 text-xs text-slate-400">
        <span className="min-w-0 truncate">{meta.join(" · ")}</span>
        {s.views > 0 && (
          <span className="shrink-0" title="복지로 누적 조회수">
            조회 {views(s.views)}
          </span>
        )}
      </div>
    </Link>
  );
}
