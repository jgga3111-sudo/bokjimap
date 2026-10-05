import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, ogFonts } from "@/lib/og";

/* 목록(/guide)만 공유 이미지가 없어 카톡·페북에서 썸네일 없이 나갔다(2026-10-05). */
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "복지 신청 안내 — 상황별로 묶은 해설";

export default function Image() {
  return new ImageResponse(<OgCard eyebrow="복지 신청 안내" title="상황별로 묶은 해설" />, {
    ...size,
    fonts: ogFonts(),
  });
}
