import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";

const G = guideBySlug("voucher-use")!;

export const metadata: Metadata = {
  title:
    "문화누리카드, 받은 다음이 더 중요합니다 — 잔액·합산·재발급·12월 31일",
  description:
    "2026년 문화누리카드는 1인당 15만원에 생애주기별 1만원이 더 붙습니다. 안 쓰고 남은 지원금은 12월 31일 23시 59분이 지나면 국고로 돌아갑니다. 잔액 확인, 세대 합산, 재발급 기한을 한국문화예술위원회 공식 안내로 정리했습니다.",
  alternates: { canonical: "/guide/voucher-use" },
};

/*
  왜 이 글인가 (2026-09-16).

  09-16 질문 조사에서 「바우처 사용처·잔액·재발급」 갈래가 6건 나왔는데 우리 글은 0편이었다
  (문화누리카드는 데이터랩 검색량 2위 — 실업급여의 1.3배). 우리 상세는 **신청까지만** 말한다.
  받은 다음에 생기는 질문(어디서 쓰나·얼마 남았나·잃어버렸다·언제까지 쓰나)에 답하는 글이
  한 편도 없었다.

  ── 근거 (전부 한국문화예술위원회 문화누리 누리집 원문, 2026-09-16 확인) ──
  · 소개 — 2026년 1인당 15만원 + 생애주기별 1만원, 추가 대상 연도, 예산 소진 안내
  · 사용하기 — 12.31. 23:59 지나면 국고 반납, 취소·환불 소요일, 세대 합산, 미성년자 숙박 제한
  · 카드발급 — 발급·재충전 11.30. 18시까지, 온라인 재발급 12.15. 23:59까지, 양도 시 2년 제한
  · 잔액확인 — 누리집은 본인인증 필요, ARS 1544-3412 / NH농협카드 1644-4000

  ── 하지 않는 것 ───────────────────────────────────────────────
  가맹점 목록을 우리가 옮겨 적지 않는다(수시로 바뀐다 — 누리집 가맹점 검색으로 보낸다).
  "이건 결제된다/안 된다"를 판정하지 않는다(3절).
*/

const SRC = "https://www.mnuri.kr";
const CHECKED = "2026-09-16";
const CARD = services.find((s) => s.id === "WLF00000055");

function Src({ page, href }: { page: string; href: string }) {
  return (
    <p className="text-xs text-muted">
      출처{" "}
      <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
        한국문화예술위원회 문화누리 누리집 「{page}」
      </a>{" "}
      · {CHECKED} 확인
    </p>
  );
}

export default function VoucherUseGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="문화누리카드는 발급받는 것으로 끝이 아닙니다. 남은 돈은 해가 바뀌면 사라지고, 세대에 카드가 여러 장이면 한 장으로 모을 수 있으며, 잃어버렸을 때 다시 받을 수 있는 기한이 따로 있습니다. 공식 안내에 적힌 날짜와 번호를 그대로 옮겼습니다."
        updated={`최종 수정 ${G.updated} · 문화누리 누리집에서 ${CHECKED} 확인`}
      >
        <DocSection title="2026년에 얼마가 들어오나">
          <p>
            1인당 <strong>연 15만원</strong>이고, 여기에 <strong>생애주기별 1만원</strong>이
            더 붙습니다. 추가 지원 대상은 공식 안내에 이렇게 적혀 있습니다 —
            청소년기(13~18세) 2008~2013년 출생자, 준고령기(60~64세) 1962~1966년 출생자.
          </p>
          <p>
            다만 <strong>예산이 떨어지면 끝납니다.</strong> 기본지원금 예산이 소진되면 카드
            발급(재충전)이 안 되고, 추가지원금 예산만 소진되면 기본 15만원만 지급됩니다.
          </p>
          <Src page="문화누리카드란?" href={`${SRC}/munhwa/introduceNuri.do`} />
        </DocSection>

        <DocSection title="⚠ 12월 31일 23시 59분 — 남은 돈은 국고로 돌아갑니다">
          <blockquote className="border-l-4 border-line pl-4 text-sm leading-relaxed text-slate-700">
            &ldquo;사용하지 않고 남은 지원금은 사업종료일(2026.12.31.(목) 23시59분)이
            지나면 국고로 자동 반납처리 됩니다.(다음 연도로 이월되지 않음)&rdquo;
          </blockquote>
          <p>
            그래서 <strong>12월에 결제를 취소할 때가 가장 위험합니다.</strong> 당일 취소가
            아니면 가맹점에 따라 영업일 기준 3~10일이 걸리는데, 그 사이에 사용 기간이
            끝나면 취소된 금액을 다시 쓸 수 없습니다. 공식 안내의 예시가 이렇습니다 —
            12월 24일에 결제하고 12월 29일에 취소하면 승인은 3~5일 뒤에 나고, 그때는 이미
            기간이 지난 뒤입니다.
          </p>
          <p>
            2026년 지원금으로 <strong>2027년에 있을 공연·기차·숙박을 미리 예약</strong>했다가
            해가 바뀐 뒤 취소해도 마찬가지로 국고 반납입니다.
          </p>
          <Src page="사용하기" href={`${SRC}/useOfCard/useInfo.do`} />
        </DocSection>

        <DocSection title="얼마 남았는지 — 본인인증이 없어도 확인됩니다">
          <p>
            누리집에서 사용내역·잔액을 보려면 본인인증이 필요하지만, 인증 수단이 없으면
            전화로 확인할 수 있습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">무엇을</th>
                  <th className="px-3 py-2 font-semibold">어디로</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">잔액 조회</td>
                  <td className="px-3 py-2">
                    문화누리카드 고객지원센터{" "}
                    <a href="tel:15443412" className="font-medium text-brand underline">
                      1544-3412
                    </a>{" "}
                    → 잔액조회(2번)에서 카드번호와 생년월일로 확인
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2 font-medium">사용 내역</td>
                  <td className="px-3 py-2">
                    같은 번호 → 상담원 연결(4번). 정확한 내역은 NH농협카드{" "}
                    <a href="tel:16444000" className="font-medium text-brand underline">
                      1644-4000
                    </a>{" "}
                    → 기프트카드(7번) → 문화누리카드(5번)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            고객지원센터 운영시간은 월~금(공휴일 제외) 09:00~12:00, 13:00~18:00입니다.
          </p>
          <Src page="카드사용 및 잔액확인" href={`${SRC}/card/confirmBalance/cardIssue_step01.do`} />
        </DocSection>

        <DocSection title="집에 카드가 여러 장이면 한 장으로 모읍니다">
          <p>
            주민등록상 같은 세대에서 발급받은 카드가 여러 장이면 <strong>한 장에 지원금을
            합산</strong>해 쓸 수 있습니다. 주민센터에서 합산 신청서를 쓰거나, 누리집의
            「카드발급/잔액조회 → 카드합산 동의 → 세대별 카드 잔액합산 신청」으로 됩니다.
            처리에는 하루가 걸립니다.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
            <li>사회복지시설 거주자와 외국인 세대원은 합산할 수 없습니다.</li>
            <li>합산한 카드는 그해 안에는 다시 나눌 수 없습니다.</li>
            <li>본인이 따로 충전한 돈은 합산되지 않습니다.</li>
            <li>
              <strong>미성년자(2008.1.1. 이후 출생) 카드를 대표 카드로 고르면 주의</strong>가
              필요합니다 — 그 카드로는 호텔·숙소 예약 플랫폼 결제가 안 됩니다.
            </li>
          </ul>
          <Src page="사용하기" href={`${SRC}/useOfCard/useInfo.do`} />
        </DocSection>

        <DocSection title="잃어버렸을 때 — 기한이 둘로 나뉩니다">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">무엇</th>
                  <th className="px-3 py-2 font-semibold">기한(2026년)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className="px-3 py-2">신규 발급·재충전</td>
                  <td className="px-3 py-2">11월 30일 18시까지</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2">그해 지원금을 쓰기 위한 온라인·앱 재발급</td>
                  <td className="px-3 py-2">12월 15일 23시 59분까지</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            발급 신청 후 <strong>10일 이내에는 재발급이 안 됩니다</strong>(주민센터 즉시
            발급 포함). 우편 수령은 영업일 기준 3~5일, 반송되면 1~2주까지 걸립니다.
            온라인·앱으로 받은 카드는 <strong>수령등록을 하고 2시간 뒤</strong>부터 쓸 수
            있습니다.
          </p>
          <DocNote>
            카드를 남에게 팔거나 넘기면(중고 거래 글을 올리는 것 포함) 사용이 정지되고{" "}
            <strong>2년간 발급이 제한</strong>됩니다. 공식 안내에 그대로 적혀 있습니다.
          </DocNote>
          <Src page="카드발급(신규·재발급·재충전)" href={`${SRC}/card/cardMain/cardIssue_step00.do`} />
        </DocSection>

        <DocSection title="어디서 쓸 수 있나">
          <p>
            <strong>등록된 가맹점(오프라인·온라인)에서만</strong> 결제됩니다. 카드로 결제할
            수 없는 곳에서 현금으로 바꿔 쓸 수 없고, 국내 거래 업종·품목만 허용됩니다.
            가맹점은 수시로 바뀌므로 저희가 목록을 옮겨 적지 않습니다 — 누리집의 가맹점
            검색에서 지금 값을 확인하세요.
          </p>
          <p className="text-sm">
            신청 자격·금액 같은 제도 쪽 내용은{" "}
            {CARD ? (
              <Link href={`/service/${CARD.id}`} className="text-brand underline">
                {CARD.name}
              </Link>
            ) : (
              "통합문화이용권(문화누리카드) 상세"
            )}
            에 원문 그대로 실려 있습니다.
          </p>
        </DocSection>
      </DocPage>
      <GuideNav current="voucher-use" />
    </>
  );
}
