import { ImageResponse } from "next/og";
import { services } from "@/data/services";
import { placeLabel, views } from "@/lib/display";
import { OgCard, OG_SIZE, ogFonts } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "복지클릭 사업 안내";

const byId = new Map(services.map((s) => [s.id, s]));

/*
  900장을 빌드 때 미리 굽는다. 요청 때 그리게 두면 카톡 미리보기 봇이
  기다려 주지 않아 첫 공유에서 빈 카드가 나갈 수 있다.
*/
export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const s = byId.get(id);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={placeLabel(s ?? { provider: "central", sidoName: null, sigunguName: null })}
        title={s?.name ?? "복지클릭"}
        /* 조회수는 복지로 누적값이다. 0이면 아예 적지 않는다. */
        note={s && s.views > 0 ? `조회 ${views(s.views)}` : undefined}
      />
    ),
    { ...size, fonts: ogFonts() },
  );
}
