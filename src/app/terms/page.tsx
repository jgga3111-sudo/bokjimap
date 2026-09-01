import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocList, DocNote } from "@/components/Doc";
import MailLink from "@/components/MailLink";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "이용약관",
  description:
    "복지클릭 서비스 이용약관입니다. 제공하는 정보의 성격과 한계, 저작권, 책임의 범위를 정합니다.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <DocPage
      title="이용약관"
      lead={`${SITE.name}(${SITE.url}, 이하 "사이트")을 이용하실 때 적용되는 조건입니다.`}
      updated={`시행일 ${SITE.policyEffectiveDate}`}
    >
      <DocSection no={1} title="목적">
        <p>
          이 약관은 {SITE.operator}(이하 &ldquo;운영자&rdquo;)가 제공하는
          사이트의 이용 조건과 절차, 운영자와 이용자의 권리·의무·책임을 정하는
          것을 목적으로 합니다.
        </p>
      </DocSection>

      <DocSection no={2} title="서비스의 내용">
        <p>사이트는 다음을 제공합니다.</p>
        <DocList
          items={[
            "공공데이터포털이 공개한 중앙부처·지방자치단체 복지 서비스 정보의 정리·검색",
            "기준 중위소득에 근거한 소득 구간 자가진단 도구",
            "각 서비스의 공식 안내 페이지로 연결되는 링크",
          ]}
        />
        <DocNote tone="amber" title="사이트는 공식 기관이 아닙니다">
          운영자는 정부·지방자치단체 또는 그 위탁기관이 아니며, 복지 급여의
          신청 접수·심사·지급과 아무런 관련이 없습니다. 사이트는 신청을 대행하지
          않고, 개별 자격에 대한 상담이나 법률·세무 자문을 제공하지 않습니다.
        </DocNote>
      </DocSection>

      <DocSection no={3} title="정보의 정확성과 면책">
        <DocList
          items={[
            <>
              사이트가 제공하는 정보는 공공데이터를 <strong>있는 그대로</strong>{" "}
              정리한 것이며, 운영자는 그 내용의 정확성·완전성·최신성을 보증하지
              않습니다.
            </>,
            <>
              복지 사업의 자격 요건·지원 금액·신청 기간은 수시로 바뀌고, 원자료
              반영과 수집에 시차가 있습니다. 실제 내용은{" "}
              <strong>각 서비스의 공식 안내와 담당 기관을 통해 최종
              확인</strong>하셔야 합니다.
            </>,
            <>
              자가진단 결과는 소득만을 기준으로 한 참고값입니다. 실제 심사는
              재산의 소득환산액을 포함한 소득인정액으로 이루어지므로 결과가 다를
              수 있으며, 이 결과가 수급 자격을 보장하지 않습니다.
            </>,
            <>
              운영자는 이용자가 사이트의 정보를 신뢰해 행한 판단이나 그로 인해
              발생한 손해에 대해 책임을 지지 않습니다. 다만 운영자의 고의 또는
              중대한 과실이 있는 경우에는 그러하지 아니합니다.
            </>,
          ]}
        />
      </DocSection>

      <DocSection no={4} title="저작권">
        <DocList
          items={[
            <>
              사이트가 인용한 공공데이터의 저작권은 해당 공공기관에 있습니다.
              출처와 이용 조건은{" "}
              <Link href="/source" className="text-brand underline">
                데이터 출처
              </Link>
              에 밝혀 두었습니다.
            </>,
            <>
              그 자료를 수집·분류·편집한 결과물과 사이트의 문장·디자인·구조에
              대한 권리는 운영자에게 있습니다.
            </>,
            <>
              이용자는 개인적·비상업적 목적으로 사이트의 내용을 열람하고 인용할
              수 있습니다. 다만 <strong>기계적 수단을 이용한 대량 복제, 사이트
              내용의 상당 부분을 그대로 옮긴 재배포</strong>는 운영자의 사전
              동의 없이 할 수 없습니다.
            </>,
          ]}
        />
      </DocSection>

      <DocSection no={5} title="광고">
        <p>
          사이트는 운영 비용을 충당하기 위해 제3자 광고를 게재할 수 있습니다.
          광고의 내용과 광고주와의 거래는 해당 광고주의 책임이며, 운영자는 이에
          대해 책임을 지지 않습니다. 광고와 관련한 쿠키 처리는{" "}
          <Link href="/privacy" className="text-brand underline">
            개인정보처리방침
          </Link>
          에 따릅니다.
        </p>
      </DocSection>

      <DocSection no={6} title="외부 링크">
        <p>
          사이트는 복지로·정부 부처·지방자치단체 등 외부 사이트로 연결되는
          링크를 포함합니다. 운영자는 링크된 사이트의 내용이나 그 사이트에서
          발생한 일에 대해 책임지지 않으며, 해당 사이트의 정책이 별도로
          적용됩니다.
        </p>
      </DocSection>

      <DocSection no={7} title="이용자의 의무">
        <p>이용자는 다음 행위를 해서는 안 됩니다.</p>
        <DocList
          items={[
            "사이트의 정상적인 운영을 방해하는 행위(과도한 자동 요청, 취약점 탐색 등)",
            "사이트의 내용을 사실과 다르게 편집해 배포하는 행위",
            "타인의 권리를 침해하거나 법령을 위반하는 목적으로 사이트를 이용하는 행위",
          ]}
        />
      </DocSection>

      <DocSection no={8} title="서비스의 변경·중단">
        <p>
          운영자는 사이트의 내용과 구성을 변경하거나 서비스를 중단할 수
          있습니다. 무상으로 제공되는 서비스인 만큼, 변경·중단으로 인한 손해에
          대해 운영자는 별도의 보상을 하지 않습니다.
        </p>
      </DocSection>

      <DocSection no={9} title="약관의 변경">
        <p>
          운영자는 필요한 경우 이 약관을 변경할 수 있으며, 변경된 약관은 이
          페이지에 게시한 때부터 적용됩니다. 중요한 변경은 시행일을 명시해
          안내합니다.
        </p>
      </DocSection>

      <DocSection no={10} title="문의">
        <p>
          약관과 관련한 문의는 <MailLink className="text-brand underline" />로
          보내주세요.
        </p>
      </DocSection>
    </DocPage>
  );
}
