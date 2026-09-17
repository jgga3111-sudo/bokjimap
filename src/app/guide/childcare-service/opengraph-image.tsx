import { ImageResponse } from "next/og";
import { guideBySlug } from "@/lib/guides";
import { OgCard, OG_SIZE, ogFonts } from "@/lib/og";

/* 글을 새로 낼 때는 page.tsx와 이 파일을 **같이** 만든다(09-06에 빠뜨린 전례). */
const G = guideBySlug("childcare-service")!;

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = G.title;

export default function Image() {
  return new ImageResponse(<OgCard eyebrow="복지 신청 안내" title={G.title} />, {
    ...size,
    fonts: ogFonts(),
  });
}
