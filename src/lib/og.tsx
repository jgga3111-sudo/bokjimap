import fs from "node:fs";
import path from "node:path";
import type { ReactElement } from "react";

/**
 * 공유 카드(Open Graph 이미지) 공용 부품.
 *
 * 2026-09-02까지 이 사이트에는 OG 이미지가 아예 없었다. `/opengraph-image`가
 * 404였고 layout의 openGraph에도 images 키가 없었다. 카톡·밴드·카페에 링크를
 * 붙이면 **썸네일 없이 제목 한 줄만** 떴다. 네이버 웹문서는 정부기관이
 * 독점하고 있어서(docs/03 §3) 사람 손으로 퍼지는 경로가 상대적으로 더 중요한데,
 * 그 경로의 첫인상이 비어 있었던 셈이다.
 *
 * 이미지 파일을 그리지 않고 `next/og`로 글자만 찍는다. 사업이 900건이고
 * 앞으로 더 늘기 때문에, 손으로 만든 그림은 어차피 따라가지 못한다.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;

/**
 * 한글 폰트.
 *
 * satori는 시스템 폰트를 못 쓴다. 폰트를 안 넘기면 한글이 전부 두부(□)가 된다.
 * 맑은고딕은 MS 소유라 저장소에 넣을 수 없어 Noto Sans KR(OFL)을 쓴다.
 *
 * 원본 가변 폰트는 10.4MB다. 그대로 넣지 않고 **완성형 2,350자 + 라틴·기호**로
 * 잘라 두 굵기 각 약 490KB로 줄였다. 2,350자로 정한 근거: 수록 데이터의
 * 사업명·지역명·부서명에 실제로 쓰인 한글이 549자였고, **그 549자가 전부
 * 2,350자 안에 들어간다**(2026-09-02 확인). 앞으로 사업이 늘어도 현대 한국어
 * 표기는 사실상 이 범위를 벗어나지 않는다.
 *
 * 자를 때 쓴 절차는 docs/04-og-card.md에 적어 두었다 — 폰트를 갱신할 일이
 * 생기면 거기서부터 다시 한다.
 */
const FONT_DIR = path.join(process.cwd(), "src/assets/fonts");

let cached: { name: string; data: Buffer; weight: 400 | 700; style: "normal" }[];

export function ogFonts() {
  /* 900장을 굽는 동안 매번 1MB를 다시 읽지 않는다. */
  cached ??= [
    {
      name: "Noto Sans KR",
      data: fs.readFileSync(path.join(FONT_DIR, "NotoSansKR-Regular.subset.ttf")),
      weight: 400,
      style: "normal",
    },
    {
      name: "Noto Sans KR",
      data: fs.readFileSync(path.join(FONT_DIR, "NotoSansKR-Bold.subset.ttf")),
      weight: 700,
      style: "normal",
    },
  ];
  return cached;
}

/**
 * 제목 글자 크기.
 *
 * 카톡 미리보기는 카드를 작게 줄여 보여준다. 긴 이름을 억지로 한 크기에
 * 맞추면 어느 쪽도 안 읽힌다 — 짧으면 크게, 길면 줄이되 바닥은 둔다.
 */
function titleSize(len: number): number {
  if (len <= 12) return 88;
  if (len <= 20) return 74;
  if (len <= 30) return 62;
  return 54;
}

/** 그래도 넘치면 자른다. 세 줄이 카드 높이의 한계다. */
function clamp(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export function OgCard({
  eyebrow,
  title,
  note,
}: {
  /** 카드 맨 위 한 줄 — 지역이나 분류. */
  eyebrow: string;
  title: string;
  /** 오른쪽 아래 보조 정보. 없으면 자리를 비운다. */
  note?: string;
}): ReactElement {
  const text = clamp(title, 44);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        fontFamily: "Noto Sans KR",
      }}
    >
      {/* 위쪽 띠 하나로 브랜드 색을 쓴다. 배경 전체를 칠하면 글자가 덜 읽힌다. */}
      <div style={{ display: "flex", height: 18, backgroundColor: "#0b57d0" }} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          padding: "0 76px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 700,
            color: "#0b57d0",
            letterSpacing: "-0.01em",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: titleSize(text.length),
            fontWeight: 700,
            lineHeight: 1.22,
            color: "#17181a",
            letterSpacing: "-0.02em",
          }}
        >
          {text}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 76px 54px",
          fontSize: 30,
          color: "#6b7280",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ fontWeight: 700, color: "#17181a" }}>복지클릭</span>
          <span style={{ marginLeft: 14 }}>bokjiclick.co.kr</span>
        </div>
        {note ? <div style={{ display: "flex" }}>{note}</div> : null}
      </div>
    </div>
  );
}
