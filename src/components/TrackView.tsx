"use client";

import { useEffect } from "react";
import { remember } from "@/lib/recent";

/**
 * 상세 페이지를 봤다는 사실만 브라우저에 적어 둔다.
 *
 * 화면에는 아무것도 그리지 않는다. 상세 페이지는 서버 컴포넌트라 직접
 * localStorage를 만질 수 없어서, 이 껍데기 하나만 클라이언트로 둔다.
 */
export default function TrackView({
  id,
  name,
  place,
}: {
  id: string;
  name: string;
  place: string;
}) {
  useEffect(() => {
    remember({ id, name, place });
  }, [id, name, place]);

  return null;
}
