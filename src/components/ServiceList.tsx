import Link from "next/link";
import type { WelfareService } from "@/types/welfare";

/**
 * 서비스 목록. 여러 허브 화면(지역·대상·전체)이 공유한다.
 *
 * 빈 목록일 때 "곧 추가됩니다" 같은 말로 덮지 않는다. 몇 건인지, 왜 없는지를
 * 그대로 보여주는 편이 사용자에게도 정확하고, 얇은 페이지를 그럴듯하게
 * 위장하지 않는다.
 */
export default function ServiceList({
  services,
}: {
  services: readonly WelfareService[];
}) {
  if (services.length === 0) {
    return (
      <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
        등록된 서비스가 없습니다.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {services.map((s) => (
        <li key={s.id}>
          <Link
            href={`/service/${s.id}`}
            className="block rounded-lg border border-slate-200 px-4 py-3 hover:border-slate-400"
          >
            <p className="font-medium">{s.name}</p>
            <p className="mt-1 text-xs text-slate-500">
              {/*
                값이 없으면 그 자리를 비운다. "정보 없음" 같은 문구로 채우면
                화면이 노이즈로 가득 찬다. 확인 못 한 건 안 쓴다.
              */}
              {[
                s.provider === "central" ? "중앙부처" : s.sidoName,
                s.sigunguName,
                s.department,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
            {s.summary && (
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                {s.summary}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
