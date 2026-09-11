"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AUTH_ON, MEMBER_HINT } from "@/lib/auth/config";

const noop = () => () => {};
const isMember = () => document.cookie.split("; ").includes(`${MEMBER_HINT}=1`);

/**
 * 헤더 오른쪽의 「로그인」 / 「내 계정」 (2026-09-11).
 *
 * 서버에 묻지 않고 브라우저의 표식 쿠키로 정한다 — 헤더에서 서버가 로그인을
 * 확인하면 **모든 페이지가 요청마다 새로 그려지는** 동적 페이지가 된다
 * (auth/config.ts 머리말). 서버 렌더에서는 늘 「로그인」으로 나간다.
 *
 * 계정 기능이 꺼져 있으면 아무것도 안 그린다.
 */
export default function AccountLink() {
  usePathname();
  const member = useSyncExternalStore(noop, isMember, () => false);
  if (!AUTH_ON) return null;

  return (
    <Link
      href={member ? "/account" : "/login"}
      className="shrink-0 text-sm font-medium text-slate-600 hover:text-brand"
    >
      {member ? "내 계정" : "로그인"}
    </Link>
  );
}
