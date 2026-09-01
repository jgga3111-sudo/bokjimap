import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocList, DocNote } from "@/components/Doc";
import MailLink from "@/components/MailLink";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "문의·오류 신고",
  description:
    "복지클릭의 잘못된 정보를 신고하거나 문의하는 방법입니다. 개별 복지 자격 상담은 보건복지상담센터 129를 이용해 주세요.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <DocPage
      title="문의·오류 신고"
      lead="잘못된 내용을 발견하셨다면 알려주세요. 정부 자료를 옮기는 과정에서 생긴 오류는 저희가 고칠 수 있습니다."
    >
      <section className="rounded-2xl border border-brand/20 bg-brand-soft p-5">
        <p className="text-sm text-slate-700">문의 접수처</p>
        <p className="mt-1 text-lg font-bold break-all">
          <MailLink className="text-brand underline" />
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          운영자 한 사람이 확인하고 답변합니다. 답변에 며칠 걸릴 수 있는 점
          양해 부탁드립니다.
        </p>
      </section>

      <DocSection title="이런 것을 받습니다">
        <DocList
          items={[
            <>
              <strong>정보 오류 신고</strong> — 지원 금액·자격·기간·연락처가
              실제와 다른 경우
            </>,
            <>
              <strong>누락 제보</strong> — 있어야 할 사업이 안 보이는 경우
            </>,
            <>
              <strong>기능 문제</strong> — 페이지가 안 열리거나 계산이 이상한
              경우
            </>,
            <>
              <strong>제휴·인용 문의</strong> — 사이트 내용을 인용하거나
              사용하려는 경우
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="이렇게 적어 주시면 빠릅니다">
        <div className="rounded-xl border border-line bg-slate-50 p-4 font-mono text-xs leading-relaxed whitespace-pre-line text-slate-700">
          {`페이지 주소: https://bokjiclick.co.kr/service/WLF00000060
어느 부분: "지원 내용" 항목의 금액
어떻게 다른가: 월 10만원으로 적혀 있으나 2026년부터 12만원으로 인상됨
근거(있으면): 보건복지부 2026년 사업안내 32쪽`}
        </div>
        <p>
          근거 링크까지 주시면 확인이 훨씬 빨라집니다. 없어도 괜찮으니 우선
          알려만 주세요.
        </p>
      </DocSection>

      <DocSection title="답변드리기 어려운 것">
        <DocNote tone="amber" title="개별 복지 상담은 받지 않습니다">
          &ldquo;제 상황에서 받을 수 있나요&rdquo;, &ldquo;서류는 무엇이
          필요한가요&rdquo; 같은 질문은 저희가 답할 수 없습니다. 정확한 판정에는
          소득·재산·가구 구성을 모두 확인해야 하고, 그 권한은 행정기관에
          있습니다.
        </DocNote>
        <p>아래로 문의하시면 정확한 안내를 받으실 수 있습니다.</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[460px] border-collapse text-sm">
            <thead>
              <tr className="border-y border-line bg-slate-50 text-left">
                <th className="px-3 py-2 font-semibold">문의처</th>
                <th className="px-3 py-2 font-semibold">연락</th>
                <th className="px-3 py-2 font-semibold">무엇을</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "보건복지상담센터",
                  "129 (국번없이)",
                  "복지 제도 전반, 자격 상담",
                ],
                [
                  "읍·면·동 주민센터",
                  "주소지 관할",
                  "기초생활보장·차상위 신청과 심사",
                ],
                ["복지로", "bokjiro.go.kr", "온라인 신청, 모의계산"],
                [
                  "국민건강보험공단",
                  "1577-1000",
                  "건강보험료·소득 관련 확인",
                ],
              ].map(([a, b, c]) => (
                <tr key={a} className="border-b border-line">
                  <th scope="row" className="px-3 py-2.5 text-left font-medium">
                    {a}
                  </th>
                  <td className="px-3 py-2.5 text-slate-600">{b}</td>
                  <td className="px-3 py-2.5 text-slate-600">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="개인정보를 보내지 마세요">
        <p>
          문의하실 때 주민등록번호, 계좌번호, 가족 정보 같은 개인정보는 적지 말아
          주세요. 저희는 그 정보로 할 수 있는 일이 없고, 받아 두지도 않습니다.
          {SITE.name}이 개인정보를 어떻게 다루는지는{" "}
          <Link href="/privacy" className="text-brand underline">
            개인정보처리방침
          </Link>
          에 있습니다.
        </p>
      </DocSection>
    </DocPage>
  );
}
