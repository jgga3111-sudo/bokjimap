import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { parseAsk, type Chip } from "@/lib/askParse";
import { askSearch, type AskHit } from "@/lib/askSearch";
import AskBox from "@/components/AskBox";

export const metadata: Metadata = {
  title: "말로 물어보고 지원금 찾기",
  /*
    **색인시키지 않는다** — `/search`·`/find`와 같은 이유다. 질문마다 URL이
    하나씩 생기므로 색인시키면 내용이 거의 같은 페이지가 무한히 생긴다.
    지금 서치콘솔에 "발견됨 – 색인 안 됨"이 528건 쌓여 있는데 거기에 스스로
    더 얹는 짓이다(CLAUDE.md 6절).

    follow는 남긴다 — 결과에서 상세·축 페이지로 가는 링크는 따라가도 된다.
    색인시킬 축 페이지는 따로 있고, 아래에서 그리로 내보낸다.
  */
  robots: { index: false, follow: true },
  /* 루트의 `canonical: "/"`가 물려 오지 않게(`/search` 머리말 참고). */
  alternates: { canonical: "/ask" },
};

/** 축마다 색인되는 페이지가 따로 있다. 칩을 거기로 건다. */
const AXIS_HREF: Record<Chip["axis"], string> = {
  life: "/life",
  target: "/target",
  benefit: "/benefit",
  region: "/region",
};

const AXIS_NAME: Record<Chip["axis"], string> = {
  life: "생애주기",
  target: "대상",
  benefit: "혜택",
  region: "지역",
};

/** 은/는. 한글이 아닌 글자로 끝나면 받침을 모르니 둘 다 적는다. */
function topicParticle(word: string): string {
  const c = word.charCodeAt(word.length - 1);
  if (c < 0xac00 || c > 0xd7a3) return "은(는)";
  return (c - 0xac00) % 28 ? "은" : "는";
}

/** 결과 한 묶음. 위아래 두 묶음이 같은 모양이어야 해서 떼어 놓았다. */
function HitList({ hits }: { hits: AskHit[] }) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
      {hits.map((h) => (
        <li key={h.id}>
          <Link
            href={`/service/${h.id}`}
            className="block px-4 py-3 transition hover:bg-brand-soft/40"
          >
            <p className="font-medium text-ink">{h.name}</p>
            <p className="mt-0.5 text-xs text-muted">
              {[h.place, h.dept].filter(Boolean).join(" · ")}
            </p>
            {/* 이름에 없는 낱말로 걸린 건 **왜 걸렸는지** 보여준다
                (`/search`와 같은 규칙). */}
            {h.snippet && (
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
                {h.snippet}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * 말로 물어본 것에 답하는 화면 — **서버에서 그린다.**
 *
 * `noindex`라 정적 생성으로 얻는 것이 없다. 900건을 서버에서 그대로 훑고
 * **클라이언트 번들은 한 바이트도 안 늘린다**(`/search`·`/find`와 같은 길).
 * 묻는 상자(`AskBox`)도 평범한 form이라 자바스크립트가 없다.
 *
 * 이 화면의 규칙 하나 — **읽은 것을 전부 펼쳐 보여준다.** 조건을 무엇으로
 * 바꿨는지, 어느 낱말을 못 찾았는지, 0건이라 무엇을 뺐는지를 결과보다 위에
 * 둔다. 알아들은 척하고 조용히 좁히면 안 나온 것이 없는 것인지 못 읽은
 * 것인지 구분할 방법이 사라진다.
 */
export default async function AskPage({ searchParams }: PageProps<"/ask">) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : (raw ?? "")).trim().slice(0, 120);

  const read = q ? parseAsk(q) : null;
  const answer = read ? askSearch(read) : null;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-xl font-bold sm:text-2xl">
          {q ? (
            <>
              <span className="text-brand">{q}</span>
            </>
          ) : (
            "말로 물어보고 찾기"
          )}
        </h1>
        {/* 몇 건인지만 적으면 "월세로 122건이 있구나"로 읽힌다. 조건으로
            좁힌 수와 낱말까지 걸린 수를 나눠 적는다. */}
        <p className="mt-1.5 text-sm text-muted">
          {answer
            ? answer.matchedTotal > 0
              ? `조건에 맞는 ${answer.poolTotal.toLocaleString()}건 가운데 말씀하신 낱말까지 걸린 것이 ${answer.matchedTotal.toLocaleString()}건입니다`
              : `조건에 맞는 ${answer.poolTotal.toLocaleString()}건입니다`
            : `수록 ${services.length.toLocaleString()}건에서 문장 그대로 찾아 드립니다`}
        </p>
      </header>

      <section className="rounded-2xl border border-line bg-white p-5">
        <h2 className="mb-3 text-sm font-bold text-ink">
          {q ? "다시 물어보기" : "무엇이 필요하신가요"}
        </h2>
        <AskBox defaultValue={q} autoFocus={!q} />
      </section>

      {/* ── 이렇게 읽었습니다 ────────────────────────────────────────
          결과보다 먼저 온다. 틀리게 읽었으면 여기서 알아채고 문장을 고쳐
          다시 물으면 된다. 칩은 전부 **색인되는 축 페이지**로 걸어 둔다. */}
      {answer && (
        <section className="rounded-2xl border border-brand/20 bg-brand-soft/30 p-5">
          <h2 className="text-sm font-bold text-ink">이렇게 읽었습니다</h2>

          {answer.applied.length === 0 && answer.usedWords.length === 0 ? (
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              질문에서 조건으로 바꿀 만한 말을 찾지 못했습니다. 아래는 수록분을
              조회수 순으로 보여드리는 것뿐입니다. 나이·지역·상황을 한마디만
              넣어 주시면 좁혀집니다 — 예: &ldquo;서울 사는 30대&rdquo;.
            </p>
          ) : (
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {answer.applied.map((c) => (
                <li key={`${c.axis}-${c.slug}`}>
                  <Link
                    href={`${AXIS_HREF[c.axis]}/${c.slug}`}
                    className="inline-flex items-baseline gap-1.5 rounded-full border border-brand bg-brand px-3 py-1.5 text-sm text-white transition hover:opacity-90"
                  >
                    {c.label}
                    <span className="text-[11px] opacity-75">
                      {AXIS_NAME[c.axis]}
                    </span>
                  </Link>
                </li>
              ))}
              {/* 바꿔서 찾았으면 **바꿨다고 적는다.** 「병원비」로 물었는데
                  「의료비」로 찾은 것을 조용히 넘기면, 왜 이 결과가 나왔는지
                  설명할 길이 없다(lib/askParse.ts의 SYNONYMS). */}
              {answer.usedWords.map((w) => (
                <li key={`w-${w.word}`}>
                  <span className="inline-flex items-baseline gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-sm text-slate-700">
                    {w.word}
                    <span className="text-[11px] text-muted">
                      {w.via ? `${w.via}로 찾음` : "본문에서 찾음"}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* 어느 낱말 때문에 그렇게 읽었는지. 「30대」를 청년으로 읽은 것을
              사람이 확인할 수 있어야 한다. */}
          {answer.applied.length > 0 && (
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {answer.applied
                .map((c) => `“${c.from}” → ${c.label}`)
                .join(" · ")}
            </p>
          )}

          {/* 혜택은 거르지 않고 위로 올리기만 한다 — 그 사실을 적는다.
              원본이 「전기요금 복지할인」을 「현금지급」으로 분류해 둔 탓에,
              걸러 내면 가장 맞는 답이 사라진다(lib/askSearch.ts). */}
          {answer.applied.some((c) => c.axis === "benefit") && (
            <p className="mt-2 text-xs leading-relaxed text-muted">
              혜택 종류는 <strong>거르지 않고 위로 올리기만</strong> 합니다.
              원본이 매긴 지급형태가 실제와 다른 사업이 있어서, 걸러 내면 맞는
              답이 빠집니다.
            </p>
          )}

          {/* 나이로 생애주기를 정했으면 그 선이 자격선이 아님을 밝힌다. */}
          {read?.ageUsed != null && (
            <p className="mt-2 text-xs leading-relaxed text-muted">
              나이로 생애주기를 골랐습니다. <strong>나이 기준은 사업마다
              다릅니다</strong> — 청년의 상한을 34세로 두는 사업도 39세로 두는
              사업도 있습니다. 목록을 좁히는 데만 쓴 값입니다.
            </p>
          )}

          {/* 0건이라 뺀 조건. 조용히 빼면 "왜 서울 아닌 게 나오지"가 된다. */}
          {answer.dropped.length > 0 && (
            <p className="mt-2 text-xs leading-relaxed text-amber-700">
              {answer.dropped.map((c) => c.label).join(" · ")} 까지 걸면 0건이라{" "}
              {answer.dropped.length === 1 ? "이 조건은" : "이 조건들은"} 빼고
              찾았습니다.
            </p>
          )}

          {/* 못 찾은 낱말. 이걸 안 적으면 질문의 절반을 버리고도 잘 찾아 준
              것처럼 보인다. */}
          {answer.missedWords.length > 0 && (
            <p className="mt-2 text-xs leading-relaxed text-muted">
              {/* ⚠ "수록 900건 어디에도 없다"라고 쓰면 **틀린 말**이 된다.
                  못 찾은 것은 조건으로 좁힌 뒤의 목록 안에서다. 09-09에
                  「기초생활수급자 전기요금 감면」으로 실제로 그랬다 —
                  「전기요금」은 900건에는 있는데 저소득·요금감면 24건
                  안에는 없었다. 세는 범위를 그대로 적는다(3절). */}
              {answer.missedWords.map((w) => `“${w}”`).join(" · ")}
              {/* 은/는은 **마지막 낱말의 받침**으로 고른다. 예전엔 낱말
                  개수로 골라 “주차장”는 · “틀니”은이 나갔다(2026-09-10). */}
              {topicParticle(answer.missedWords[answer.missedWords.length - 1])}{" "}
              {answer.poolTotal < services.length
                ? `위 조건에 맞는 ${answer.poolTotal.toLocaleString()}건 안에서는 찾지 못했습니다.`
                : `수록 ${services.length.toLocaleString()}건의 이름과 본문 어디에도 없어 쓰지 못했습니다.`}
            </p>
          )}
        </section>
      )}

      {/* 소득 금액을 말했으면 **판정하지 않고** 계산하는 곳으로 보낸다.
          "그 소득이면 받을 수 있습니다"는 이 사이트가 하지 않는 말이다
          (CLAUDE.md 3절). */}
      {read?.incomeSeen && (
        <section className="rounded-xl border border-line bg-sunken/70 px-4 py-3.5">
          <p className="text-sm leading-relaxed text-slate-700">
            소득을 말씀하셨네요. <strong>받을 수 있는지는 저희가 판정하지
            않습니다.</strong> 다만 복지 지원의 기준은 대부분 &ldquo;기준
            중위소득 몇 % 이하&rdquo;라, 어느 구간인지는 바로 계산해 볼 수
            있습니다.{" "}
            <Link href="/check" className="font-bold text-brand underline">
              소득 구간 계산하기 →
            </Link>
          </p>
        </section>
      )}

      {/* ── 결과 ──────────────────────────────────────────────────── */}
      {!q ? (
        <p className="rounded-xl border border-line bg-sunken px-4 py-10 text-center text-sm leading-relaxed text-muted">
          찾고 싶은 것을 문장으로 적어 주세요.
          <br />
          <span className="text-xs">
            나이·지역·상황을 함께 적으면 더 잘 좁혀집니다.
          </span>
        </p>
      ) : answer &&
        answer.matchedHits.length === 0 &&
        answer.otherHits.length === 0 ? (
        <div className="rounded-xl border border-line bg-sunken px-4 py-10 text-center">
          <p className="text-sm text-ink">
            <strong>{q}</strong> 에 맞는 사업을 찾지 못했습니다.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            저희가 수록한 것은 복지로 조회수 상위{" "}
            {services.length.toLocaleString()}건이라, 실제로는 있는데 여기 없을
            수 있습니다.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link
              href="/find"
              className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium hover:border-brand hover:text-brand"
            >
              조건을 직접 골라 찾기
            </Link>
            <Link
              href="/service"
              className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium hover:border-brand hover:text-brand"
            >
              많이 찾는 지원 보기
            </Link>
          </div>
        </div>
      ) : (
        answer && (
          <>
            {/* ① 낱말까지 걸린 것 — 질문에 곧바로 답하는 몫. */}
            {answer.matchedHits.length > 0 && <HitList hits={answer.matchedHits} />}

            {/* ② 조건만 맞는 것. **가르는 줄을 긋고 무엇이 다른지 적는다.**
                이 줄이 없으면 다섯째부터 나오는 장애인연금이 「월세」로 찾은
                결과처럼 읽힌다(lib/askSearch.ts 주석 ㉠). */}
            {answer.otherHits.length > 0 && (
              <div>
                <div className="mb-3 border-t border-line pt-4">
                  <h2 className="text-sm font-bold text-ink">
                    {answer.matchedHits.length > 0
                      ? "낱말은 안 걸렸지만 조건에는 맞는 것"
                      : "조건에 맞는 것"}
                  </h2>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    {/* 혜택은 거르는 조건이 아니므로 여기 이름에 넣지 않는다.
                        넣으면 "요금감면에 걸린 사업"이라는 틀린 말이 된다. */}
                    {answer.applied.some((c) => c.axis !== "benefit")
                      ? `${answer.applied
                          .filter((c) => c.axis !== "benefit")
                          .map((c) => c.label)
                          .join(" · ")}에 걸린 사업을 조회수 순으로 보여드립니다.`
                      : "수록분을 조회수 순으로 보여드립니다."}
                    {answer.poolTotal > answer.otherHits.length &&
                      ` 모두 ${answer.poolTotal.toLocaleString()}건이라 위에서 ${answer.otherHits.length}건만 보여드립니다.`}
                  </p>
                </div>
                <HitList hits={answer.otherHits} />
              </div>
            )}
          </>
        )
      )}

      {/* 하는 일과 하지 않는 일을 화면에 적는다. 문장으로 물어보는 화면은
          가만두면 "AI가 판정해 준 것"으로 읽히기 쉬운 자리다. */}
      <section className="rounded-xl border border-line bg-sunken/70 px-4 py-3.5">
        <p className="text-xs leading-relaxed text-muted">
          <strong className="text-slate-700">
            질문의 낱말을 조건으로 바꿔 수록분에서 찾아 드립니다.
          </strong>{" "}
          받을 수 있는지 없는지는 판정하지 않습니다 — 자격은 사업마다 다르고,
          그 판단은 소관 기관이 합니다. 조건을 직접 고르고 싶으시면{" "}
          <Link href="/find" className="underline hover:text-brand">
            조건으로 찾기
          </Link>
          , 이름을 아신다면{" "}
          <Link href="/search" className="underline hover:text-brand">
            검색
          </Link>
          이 더 빠릅니다.
        </p>
      </section>
    </div>
  );
}
