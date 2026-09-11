import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocList, DocNote } from "@/components/Doc";
import MailLink from "@/components/MailLink";
import { SITE } from "@/lib/site";
import { AUTH_ON } from "@/lib/auth/config";

/*
  ── 회원 조항은 계정 기능 스위치와 함께 켜진다 (2026-09-11) ─────────
  `AUTH_ON`이 꺼져 있으면 이 방침은 예전 그대로 "회원가입을 받지 않는다"를
  말한다. 켜면 가입 때 받는 정보·위탁·국외 이전 조항이 함께 나온다.
  **가입 화면과 방침이 한 스위치에 묶여 있어야 한다** — 방침은 "안 받는다"
  라고 말하는데 가입을 받는 순간이 생기면 안 되기 때문이다.
  켤 때는 `SITE.policyEffectiveDate`를 켜는 날로 올리고, 9조대로 7일 전에
  바뀌는 내용을 먼저 알린다(CLAUDE.md의 계정 기능 준비 목록).
*/
export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: AUTH_ON
    ? "복지클릭이 회원가입 때 받는 이메일과 관심 지원 목록을 어디에 쓰고 언제 지우는지, 접속 기록과 쿠키가 어떻게 처리되는지 밝힙니다."
    : "복지클릭은 회원가입을 받지 않고 이용자의 개인정보를 직접 수집하지 않습니다. 접속 기록과 쿠키가 어떻게 처리되는지 밝힙니다.",
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
        {AUTH_ON ? (
          <>
            회원가입은 <strong>선택</strong>입니다. 가입하면{" "}
            <strong>이메일과 저장한 관심 지원</strong>만 받고, 탈퇴하면 바로
            지웁니다. 이름·연락처·주소는 받지 않습니다. 자가진단에 입력한{" "}
            <strong>소득 금액은 어디에도 저장하지 않습니다.</strong> 가입하지
            않으면 계산 결과와 최근 본 지원·관심 지원은{" "}
            <strong>이용자 본인의 브라우저에만</strong> 남습니다.
          </>
        ) : (
          <>
            복지클릭은 회원가입이 없고, 이름·연락처 같은 개인정보를 직접 수집하지
            않습니다. 자가진단에 입력한{" "}
            <strong>소득 금액은 어디에도 저장하지 않습니다.</strong> 계산 결과와
            최근 본 지원·관심 지원 같은 이용 기록만 <strong>이용자 본인의 브라우저에</strong> 남으며,
            운영자의 서버로는 전송되지 않습니다.
          </>
        )}
      </DocNote>

      {AUTH_ON ? (
        <DocSection no={1} title="회원가입 때 받는 개인정보">
          <p>
            회원가입은 선택입니다. 가입하지 않아도 사이트의 모든 정보를 볼 수
            있습니다. 가입하는 경우에만 다음 정보를 받습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-sunken text-left">
                  <th className="px-3 py-2 font-semibold">항목</th>
                  <th className="px-3 py-2 font-semibold">쓰는 곳</th>
                  <th className="px-3 py-2 font-semibold">보관 기간</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-b border-line">
                  <td className="px-3 py-2.5 text-ink">이메일 주소</td>
                  <td className="px-3 py-2.5">
                    회원 식별, 가입 인증·비밀번호 재설정 메일 발송
                  </td>
                  <td className="px-3 py-2.5">탈퇴 시 즉시 파기</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2.5 text-ink">비밀번호</td>
                  <td className="px-3 py-2.5">
                    로그인. 되돌릴 수 없는 방식으로 암호화해 저장하며 운영자도
                    볼 수 없습니다.
                  </td>
                  <td className="px-3 py-2.5">탈퇴 시 즉시 파기</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2.5 text-ink">
                    저장한 관심 지원(사업 이름·지역)
                  </td>
                  <td className="px-3 py-2.5">
                    여러 기기에서 같은 목록을 보기 위해
                  </td>
                  <td className="px-3 py-2.5">빼거나 탈퇴하면 즉시 파기</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-3 py-2.5 text-ink">
                    가입·로그인 일시(자동 생성)
                  </td>
                  <td className="px-3 py-2.5">계정 보안, 부정 이용 방지</td>
                  <td className="px-3 py-2.5">탈퇴 시 즉시 파기</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            만 14세 미만은 가입할 수 없습니다. 이름·생년월일·전화번호·주소·
            주민등록번호는 받지 않습니다.
          </p>
          <p>
            <strong>파기</strong> — 탈퇴하면 계정과 관심 지원이 데이터베이스에서
            즉시 삭제되며 되돌릴 수 없습니다. 수탁자가 장애 대비용 백업을
            보관하는 경우, 백업에 남은 사본은 그 보관 주기가 지나면 삭제됩니다.
          </p>
        </DocSection>
      ) : (
        <DocSection no={1} title="수집하지 않는 개인정보">
          <p>
            사이트는 회원가입·로그인 기능이 없으며, 이름·생년월일·연락처·주소 등
            이용자를 식별할 수 있는 정보를 입력받거나 저장하지 않습니다.
          </p>
        </DocSection>
      )}

      <DocSection no={2} title="브라우저에 저장되는 정보">
        <p>
          <Link href="/check" className="text-brand underline">
            자격 자가진단
          </Link>
          에 입력하는 가구원 수와 소득(또는 건강보험료)은{" "}
          <strong>이용자의 브라우저 안에서만 계산</strong>됩니다. 입력한 값은
          운영자의 서버로 전송되지 않습니다.
        </p>
        <p>
          이용 편의를 위해 다음 {AUTH_ON ? "다섯" : "네"} 가지가 이용자 본인의
          브라우저 저장소(localStorage)에 남습니다.{" "}
          {AUTH_ON ? (
            <>
              이 값들은 운영자에게 전송되지 않으며 운영자가 열람하지도
              않습니다. 다만 <strong>관심 지원은 로그인한 경우에 한해</strong>{" "}
              기기 간 동기화를 위해 계정에 저장됩니다(1조·6조).
            </>
          ) : (
            <>
              이 값들은 <strong>이용자의 기기를 벗어나지 않으며</strong>,
              운영자에게 전송되지도, 운영자가 열람하지도 않습니다.
            </>
          )}
        </p>
        <DocList
          items={[
            <>
              <strong>자가진단 결과</strong> — 가구원 수, 기준 중위소득 대비
              비율(%), 저장한 날짜. 다른 사업 페이지에서 &ldquo;이 사업 기준에
              해당하는지&rdquo;를 바로 견주어 보는 데 씁니다.{" "}
              <strong>입력한 소득 금액 자체는 저장하지 않습니다.</strong>
            </>,
            <>
              <strong>최근 본 지원</strong> — 최근에 연 서비스 6건의 이름과
              지역. 첫 화면에서 다시 찾아가기 위한 것입니다.
            </>,
            <>
              <strong>관심 지원</strong> — 이용자가 ☆로 저장한 서비스의 이름과
              지역. 나중에 다시 보기 위한 것입니다.
            </>,
            <>
              <strong>지난번 조건</strong> — 「조건으로 찾기」에서 마지막으로 고른
              생애주기·대상·지역과 그때 나온 건수 한 건. 첫 화면에서 같은 조건을
              다시 열기 위한 것입니다.
            </>,
            ...(AUTH_ON
              ? [
                  <>
                    <strong>동기화 표식</strong> — 이 브라우저의 관심 지원이
                    어느 계정과 맞춰졌는지 나타내는 계정 식별값. 로그아웃하면
                    지워집니다.
                  </>,
                ]
              : []),
          ]}
        />
        <p>
          {AUTH_ON ? "다섯" : "네"} 가지 모두 이용자가 직접 지울 수 있습니다. 자가진단 결과는 사업
          페이지의 <strong>&ldquo;내 결과 지우기&rdquo;</strong>, 최근 본 지원은
          첫 화면의 <strong>&ldquo;지우기&rdquo;</strong>, 관심 지원은 목록의{" "}
          <strong>&ldquo;빼기&rdquo;</strong>, 지난번 조건은 첫 화면의{" "}
          <strong>&ldquo;지우기&rdquo;</strong>를 누르면 즉시 삭제됩니다.
          브라우저의 사이트 데이터 삭제로도 없어집니다.
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
          {AUTH_ON ? (
            <>
              <strong>
                {SITE.policyEffectiveDate} 현재 사이트는 이용자 분석 도구나
                광고를 사용하지 않습니다. 로그인한 이용자에게만 로그인 상태를
                유지하기 위한 필수 쿠키를 심습니다.
              </strong>{" "}
              이 쿠키는 로그인 확인 외에 쓰지 않으며, 로그아웃하거나 탈퇴하면
              지워집니다.{" "}
            </>
          ) : (
            <>
              <strong>
                {SITE.policyEffectiveDate} 현재 사이트는 이용자 분석 도구나
                광고를 사용하지 않으며, 쿠키를 심지 않습니다.
              </strong>{" "}
            </>
          )}
          제2조의 브라우저 저장소는 쿠키와 달리 서버로 전송되지 않으며, 이용자를
          추적하는 데 쓰이지 않습니다.
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
        <p>사이트 운영을 위해 다음 업무를 위탁하고 있습니다.</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-sm">
            <thead>
              <tr className="border-y border-line bg-sunken text-left">
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
                <td className="px-3 py-2.5 text-slate-600">도메인 등록·관리</td>
              </tr>
              {AUTH_ON && (
                <>
                  <tr className="border-b border-line">
                    <td className="px-3 py-2.5">Supabase Inc.</td>
                    <td className="px-3 py-2.5 text-slate-600">
                      회원 정보·관심 지원 저장, 로그인 인증
                    </td>
                  </tr>
                  <tr className="border-b border-line">
                    <td className="px-3 py-2.5">Resend</td>
                    <td className="px-3 py-2.5 text-slate-600">
                      가입 인증·비밀번호 재설정 메일 발송
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        {AUTH_ON && (
          <>
            <p>
              <strong>국외 이전</strong> — 메일을 보내기 위해 회원의 이메일
              주소가 Resend(미국 회사)로 전송됩니다. 메일은 Resend의 일본(도쿄)
              서버에서 발송됩니다.
            </p>
            <DocList
              items={[
                "이전 항목: 이메일 주소",
                "이전 국가: 일본(발송 서버, 도쿄), 미국(수탁자 본사)",
                "이전 시기·방법: 가입 인증·비밀번호 재설정 메일을 보낼 때마다 네트워크로 전송",
                "이용 목적: 메일 발송",
                "보유 기간: 발송 기록은 수탁자의 보관 정책에 따라 보관 후 삭제",
              ]}
            />
            <p>
              회원 정보를 저장하는 Supabase 데이터베이스는 대한민국(서울) 지역에
              둡니다. 이전을 원하지 않으면 가입하지 않거나 탈퇴할 수 있으며, 이
              경우 계정 기능만 쓸 수 없고 나머지 서비스는 그대로 이용할 수
              있습니다.
            </p>
          </>
        )}
      </DocSection>

      <DocSection no={7} title="이용자의 권리">
        {AUTH_ON ? (
          <p>
            회원은 언제든지{" "}
            <Link href="/account" className="text-brand underline">
              내 계정
            </Link>
            에서 가입한 이메일을 확인하고, 관심 지원을 빼고, 탈퇴(즉시 삭제)할
            수 있습니다. 그 밖의 열람·정정·삭제·처리정지 요청은 아래 연락처로
            보내 주시면 지체 없이 처리합니다.
          </p>
        ) : (
          <p>
            사이트는 개인정보를 수집·보관하지 않으므로 열람·정정·삭제를 요청할
            대상 정보가 없습니다. 그럼에도 확인이 필요한 사항이 있으면 아래
            연락처로 문의해 주시면 지체 없이 답변드리겠습니다.
          </p>
        )}
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
