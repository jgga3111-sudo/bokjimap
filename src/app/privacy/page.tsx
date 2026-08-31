import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocList, DocNote } from "@/components/Doc";
import MailLink from "@/components/MailLink";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "복지맵은 회원가입을 받지 않고 이용자의 개인정보를 직접 수집하지 않습니다. 접속 기록과 쿠키가 어떻게 처리되는지 밝힙니다.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <DocPage
      title="개인정보처리방침"
      lead={`${SITE.name}(${SITE.url})은 이용자의 개인정보를 소중히 다루며, 「개인정보 보호법」을 준수합니다.`}
      updated={`시행일 ${SITE.policyEffectiveDate}`}
    >
      <DocNote tone="brand" title="한 줄 요약">
        복지맵은 회원가입이 없고, 이름·연락처 같은 개인정보를 직접 수집하지
        않습니다. 자가진단에 입력한 소득과 가구원 수는{" "}
        <strong>서버로 전송되지 않고 브라우저에서만 계산</strong>되며 저장되지도
        않습니다.
      </DocNote>

      <DocSection no={1} title="수집하지 않는 개인정보">
        <p>
          사이트는 회원가입·로그인 기능이 없으며, 이름·생년월일·연락처·주소 등
          이용자를 식별할 수 있는 정보를 입력받거나 저장하지 않습니다.
        </p>
      </DocSection>

      <DocSection no={2} title="자가진단에 입력한 정보">
        <p>
          <Link href="/check" className="text-brand underline">
            자격 자가진단
          </Link>
          에 입력하는 가구원 수와 소득(또는 건강보험료)은{" "}
          <strong>이용자의 브라우저 안에서만 계산</strong>됩니다. 이 값은
          운영자의 서버로 전송되지 않고, 저장되거나 제3자에게 제공되지 않으며,
          페이지를 벗어나면 사라집니다.
        </p>
      </DocSection>

      <DocSection no={3} title="자동으로 생성되어 수집되는 정보">
        <p>
          사이트는 클라우드 호스팅 서비스(Vercel Inc.)를 통해 제공되며, 서비스
          제공과 보안을 위해 접속 시 다음 정보가 자동으로 기록될 수 있습니다.
        </p>
        <DocList
          items={[
            "IP 주소, 접속 일시, 요청한 주소(URL), 응답 상태",
            "브라우저 종류와 운영체제 정보(User-Agent), 접속 경로(Referrer)",
          ]}
        />
        <p>
          이 기록은 서비스 운영과 장애 대응, 부정 이용 방지의 목적으로만
          이용되며, 개별 이용자를 식별하는 데 사용하지 않습니다. 호스팅 사업자의
          보관 정책에 따라 일정 기간 후 자동으로 삭제됩니다.
        </p>
      </DocSection>

      <DocSection no={4} title="쿠키">
        <p>
          <strong>{SITE.policyEffectiveDate} 현재 사이트는 이용자 분석 도구나
          광고를 사용하지 않으며, 별도의 쿠키를 심지 않습니다.</strong>
        </p>
        <p>
          다만 운영 비용 충당을 위해 향후 Google AdSense 광고를 도입할 예정이며,
          도입 시 다음과 같이 처리됩니다.
        </p>
        <DocList
          items={[
            <>
              Google을 포함한 제3자 광고 사업자는 쿠키를 사용해 이용자의 이전
              방문 기록에 기반한 광고를 게재할 수 있습니다.
            </>,
            <>
              Google이 광고 쿠키를 사용함으로써 이용자와 다른 웹사이트의 방문
              기록에 기초해 광고를 제공할 수 있습니다.
            </>,
            <>
              이용자는{" "}
              <a
                href="https://myadcenter.google.com/personalizationoff"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline"
              >
                Google 광고 설정
              </a>
              에서 맞춤 광고를 끌 수 있습니다. 제3자 광고 사업자의 쿠키는{" "}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline"
              >
                aboutads.info
              </a>
              에서 차단할 수 있습니다.
            </>,
            <>
              브라우저 설정에서 쿠키 저장을 거부할 수 있습니다. 다만 이 경우
              일부 기능의 이용이 제한될 수 있습니다.
            </>,
          ]}
        />
        <p className="text-xs text-muted">
          광고를 실제로 게재하기 시작하면 이 조항의 첫 문장을 그에 맞게 고치고
          시행일을 갱신합니다.
        </p>
      </DocSection>

      <DocSection no={5} title="개인정보의 제3자 제공">
        <p>
          운영자는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만 법령에
          따라 수사기관 등이 적법한 절차로 요구하는 경우에는 그에 따릅니다.
        </p>
      </DocSection>

      <DocSection no={6} title="처리 위탁">
        <p>
          사이트 운영을 위해 다음 업무를 위탁하고 있습니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-sm">
            <thead>
              <tr className="border-y border-line bg-slate-50 text-left">
                <th className="px-3 py-2 font-semibold">수탁자</th>
                <th className="px-3 py-2 font-semibold">위탁 업무</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line">
                <td className="px-3 py-2.5">Vercel Inc.</td>
                <td className="px-3 py-2.5 text-slate-600">
                  웹사이트 호스팅 및 콘텐츠 전송
                </td>
              </tr>
              <tr className="border-b border-line">
                <td className="px-3 py-2.5">가비아</td>
                <td className="px-3 py-2.5 text-slate-600">
                  도메인 등록·관리
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection no={7} title="이용자의 권리">
        <p>
          사이트는 개인정보를 수집·보관하지 않으므로 열람·정정·삭제를 요청할
          대상 정보가 없습니다. 그럼에도 확인이 필요한 사항이 있으면 아래
          연락처로 문의해 주시면 지체 없이 답변드리겠습니다.
        </p>
      </DocSection>

      <DocSection no={8} title="개인정보 보호책임자">
        <DocList
          items={[
            <>책임자: {SITE.operator}</>,
            <>
              연락처: <MailLink className="text-brand underline" />
            </>,
          ]}
        />
        <p>
          개인정보 침해에 관한 상담이 필요하시면 아래 기관에 문의하실 수
          있습니다.
        </p>
        <DocList
          items={[
            "개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)",
            "개인정보 분쟁조정위원회 (kopico.go.kr / 1833-6972)",
            "대검찰청 사이버수사과 (spo.go.kr / 1301)",
            "경찰청 사이버수사국 (ecrm.police.go.kr / 182)",
          ]}
        />
      </DocSection>

      <DocSection no={9} title="방침의 변경">
        <p>
          이 방침의 내용이 바뀌는 경우 변경 사항을 이 페이지에 게시하고 시행일을
          갱신합니다. 중요한 변경은 최소 7일 전에 안내합니다.
        </p>
      </DocSection>
    </DocPage>
  );
}
