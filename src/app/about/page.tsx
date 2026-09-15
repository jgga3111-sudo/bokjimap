import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocList, DocNote } from "@/components/Doc";
import MailLink from "@/components/MailLink";
import { SITE } from "@/lib/site";
import { services, SERVICES_UPDATED } from "@/data/services";
import { SIDO_LIST } from "@/lib/regions";
import { BASE_YEAR } from "@/lib/midIncome";
import AdSenseScript from "@/components/AdSenseScript";
import { SOURCE_TOTAL, SOURCE_TOTALS } from "@/lib/sourceTotals";
import { GUIDES } from "@/lib/guides";
import { PAY_DATES } from "@/lib/payDates";
import { CALENDAR } from "@/lib/calendar";

export const metadata: Metadata = {
  title: "사이트 소개",
  description:
    "복지클릭은 중앙부처와 전국 시·군·구에 흩어진 복지 서비스를 공공데이터로 모아 정리하는 사이트입니다. 무엇을 하고 무엇을 하지 않는지 밝힙니다.",
  alternates: { canonical: "/about" },
};

const local = services.filter((s) => s.provider === "local").length;

/* 조회수가 얼마나 몰려 있나 — 손으로 적었던 「상위 500건이 86.5%」가 수록이 바뀌며
   낡아 있었다(2026-09-13 발견). 렌더할 때 센다. */
const TOP_N = 100;
const byViews = [...services].sort((a, b) => b.views - a.views);
const totalViews = byViews.reduce((a, s) => a + s.views, 0);
const topShare = totalViews
  ? Math.round((byViews.slice(0, TOP_N).reduce((a, s) => a + s.views, 0) / totalViews) * 1000) / 10
  : 0;
const central = services.filter((s) => s.provider === "central").length;

export default function AboutPage() {
  return (
    <>
    <AdSenseScript />
    <DocPage
      title="사이트 소개"
      lead="복지 정보는 정부 부처와 243개 지방자치단체에 따로따로 있습니다. 복지클릭은 그걸 한곳에 모아, 내가 받을 수 있는 것부터 보이게 만듭니다."
    >
      <DocSection title="왜 만들었나">
        <p>
          청년월세 지원을 받으려고 검색하면 국토교통부 안내, 시청 공고, 블로그
          요약글이 뒤섞여 나옵니다. 어느 것이 올해 기준인지, 우리 동네에도
          있는지, 내 소득이 되는지를 한 화면에서 알기 어렵습니다.
        </p>
        <p>
          정작 공공데이터포털에는 중앙부처와 지자체의 복지 서비스가 모두 공개돼
          있습니다. 흩어져 있을 뿐 없는 정보가 아닙니다. 복지클릭은 그 데이터를
          받아 사람이 읽을 수 있는 형태로 정리합니다.
        </p>
      </DocSection>

      <DocSection title="무엇을 하나">
        <DocList
          items={[
            <>
              <strong>많이 찾는 것부터 보여줍니다.</strong> 복지로에서 실제로
              조회된 횟수 순으로 정렬합니다. 수록한{" "}
              {services.length.toLocaleString()}건 중 상위 {TOP_N}건이 수록분 조회수의{" "}
              {topShare}%를 차지합니다.
            </>,
            <>
              <strong>한 장에서 읽히게 합니다.</strong> 현금인지 바우처인지
              감면인지, 매월인지 1회성인지, 누가 대상인지를 카드 한 장에
              담습니다.
            </>,
            <>
              <strong>내 소득이 기준선의 어디쯤인지 계산합니다.</strong>{" "}
              <Link href="/check" className="text-brand underline">
                자가진단
              </Link>
              에 가구원 수와 소득을 넣으면 {BASE_YEAR}년 기준 중위소득의 몇
              %인지 나옵니다. 받을 수 있는지를 판정하지는 않습니다.
            </>,
            <>
              <strong>원문을 고치지 않습니다.</strong> 지원 대상·선정 기준·지원
              내용은 정부가 쓴 문장을 그대로 옮깁니다. 요약하면서 조건이 빠지면
              그게 곧 잘못된 안내가 됩니다.
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="무엇을 하지 않나">
        <DocNote tone="amber" title="복지클릭은 정부·지자체 공식 기관이 아닙니다">
          공공데이터를 정리해 보여주는 민간 사이트입니다. 신청 접수나 심사와는
          아무 관계가 없습니다.
        </DocNote>
        <DocList
          items={[
            <>
              <strong>신청을 대신 해주지 않습니다.</strong> 신청은 각 사업의
              공식 창구(주민센터, 복지로, 해당 기관)에서 하셔야 합니다.
            </>,
            <>
              <strong>개별 자격 상담을 하지 않습니다.</strong> 자가진단은 소득만
              보는 가늠이고, 실제 심사는 재산까지 반영한 소득인정액으로 합니다.
              정확한 판정은 주민센터나 보건복지상담센터(129)에서 받으세요.
            </>,
            <>
              <strong>확인하지 못한 값을 채우지 않습니다.</strong> 금액·기간·연락처가
               원본에 없으면 그 자리를 비웁니다. &lsquo;정보 없음&rsquo;
              같은 문구로 메우거나 짐작해서 적지 않습니다.
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="지금 수록된 것">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-sm">
            <tbody>
              {[
                ["수록 서비스", `${services.length.toLocaleString()}건`],
                ["중앙부처 사업", `${central.toLocaleString()}건`],
                ["지자체 사업", `${local.toLocaleString()}건`],
                ["지역", `${SIDO_LIST.length}개 시·도`],
                ["기준연도", `${BASE_YEAR}년`],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-line">
                  <th scope="row" className="py-2.5 text-left font-medium text-muted">
                    {k}
                  </th>
                  <td className="py-2.5 text-right font-bold">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          공공데이터포털에 등록된 전체는 {SOURCE_TOTAL.toLocaleString()}건({SOURCE_TOTALS.checkedAt} 기준)이고,
          그중 조회수가 높은 것부터 차례로 채우고 있습니다. 어디서 받아 온 데이터인지는{" "}
          <Link href="/source" className="text-brand underline">
            데이터 출처
          </Link>
          에 적어 두었습니다.
        </p>
      </DocSection>

      <DocSection title="원문에 없는 것은 따로 확인합니다">
        <p>
          공공데이터에는 지급일·신청 일정·계산 방법처럼 사람들이 가장 궁금해하는 값이 빠져 있는
          경우가 많습니다. 그런 값은 법령 조문, 부처 고시, 정부가 낸 사업안내서를 직접 읽고
          찾아 출처와 확인일을 함께 적습니다.
        </p>
        <DocList
          items={[
            <>
              직접 쓴{" "}
              <Link href="/guide" className="text-brand underline">
                안내 글 {GUIDES.length}편
              </Link>{" "}
              — 글마다 근거 조문·쪽수를 달았습니다.
            </>,
            <>
              법령에서 찾은{" "}
              <Link href="/guide/pay-dates" className="text-brand underline">
                지급일 {PAY_DATES.length}건
              </Link>{" "}
              · 공식 공고로 확인한{" "}
              <Link href="/guide/calendar" className="text-brand underline">
                신청 일정 {CALENDAR.length}건
              </Link>
            </>,
            <>
              두 출처가 서로 다르면 한쪽을 고르지 않고 다르다는 사실을 그대로 적습니다. 자세한
              원칙은{" "}
              <Link href="/standards" className="text-brand underline">
                정보 수집·검수 기준
              </Link>
              에 있습니다.
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="광고와 운영비">
        <p>
          복지클릭은 개인이 운영하며, 운영비는 Google AdSense 광고로 충당하려 합니다(현재 광고
          승인 심사 중). 광고는 안내 글·지원 상세처럼 내용이 있는 페이지에만 싣고, 검색 결과·관심 지원
          목록 같은 화면에는 싣지 않습니다(사이트 안에서 다른 페이지로 옮겨 가면 앞 페이지에서 불러온 코드가
          남아 있을 수는 있습니다).
        </p>
        <DocList
          items={[
            <>돈을 받고 특정 사업을 위에 올리거나 소개하지 않습니다. 순서는 복지로 조회수입니다.</>,
            <>제휴(수수료) 링크를 쓰지 않습니다.</>,
            <>
              광고 쿠키가 어떻게 처리되는지는{" "}
              <Link href="/privacy" className="text-brand underline">
                개인정보처리방침
              </Link>{" "}
              4조에 적었습니다.
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="운영">
        <DocList
          items={[
            <>운영자: {SITE.operator}</>,
            <>
              데이터를 처음 받은 날 {SERVICES_UPDATED} · 상위 사업을 다시 받아 대조한 날{" "}
              {SOURCE_TOTALS.checkedAt}. 사업마다의 확인일은 각 상세 페이지 제목 아래에 있습니다.
            </>,
            <>
              문의·오류 신고: <MailLink className="text-brand underline" />
            </>,
            <>
              잘못된 내용을 발견하시면{" "}
              <Link href="/contact" className="text-brand underline">
                문의하기
              </Link>
              로 알려주세요. 어느 페이지의 어느 부분인지 적어 주시면 빠르게
              고칠 수 있습니다.
            </>,
          ]}
        />
      </DocSection>
    </DocPage>
    </>
  );
}
