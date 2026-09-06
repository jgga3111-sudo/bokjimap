import { ImageResponse } from "next/og";
import { guideBySlug } from "@/lib/guides";
import { OgCard, OG_SIZE, ogFonts } from "@/lib/og";

/* 안내 글은 사람 손으로 가장 많이 옮겨지는 페이지다 — 제목을 카드에 싣는다.
   09-06에 두 편을 새로 내면서 이 파일을 빠뜨렸다. 나머지 열두 편에는 있고
   새 둘에만 없어서, 카톡에 붙이면 이 둘만 썸네일 없이 나갔다. */
const G = guideBySlug("calendar")!;

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = G.title;

export default function Image() {
  return new ImageResponse(<OgCard eyebrow="복지 신청 안내" title={G.title} />, {
    ...size,
    fonts: ogFonts(),
  });
}
