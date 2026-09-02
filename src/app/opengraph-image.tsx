import { ImageResponse } from "next/og";
import { services } from "@/data/services";
import { OgCard, OG_SIZE, ogFonts } from "@/lib/og";

/*
  사이트 기본 공유 카드.

  Next는 상위 세그먼트의 opengraph-image를 하위가 물려받는다. 그래서 이 한
  장이 /guide·/check·/region 등 따로 카드를 두지 않은 모든 페이지를 덮는다.
  개별 사업만 자기 카드를 따로 그린다(service/[id]/opengraph-image.tsx).
*/

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "복지클릭 — 전국 복지·지원금을 조회수 순으로";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="전국 복지·지원금"
        title="내가 받을 수 있는 지원부터 봅니다"
        /* 수록 건수는 손으로 적지 않는다. 수집이 늘면 조용히 틀린 말이 된다. */
        note={`수록 ${services.length.toLocaleString()}건`}
      />
    ),
    { ...size, fonts: ogFonts() },
  );
}
