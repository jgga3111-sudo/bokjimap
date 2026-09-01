import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";

const G = guideBySlug("documents")!;

export const metadata: Metadata = {
  title: `${G.title} — 반복해서 요구되는 공통 서식`,
  description:
    "복지 신청 서류는 사업마다 다르지만 반복해서 나오는 공통 서식이 있습니다. 사회보장급여 신청서·소득재산 신고서·금융정보 제공 동의서가 무엇인지, 준비 순서는 어떻게 잡는지 정리했습니다.",
  alternates: { canonical: "/guide/documents" },
};

/* 첨부 파일을 실제로 세어 본다. 글에 상수를 박지 않는다. */
const withForms = services.filter((s) => s.forms.length > 0);
const fileCount = services.reduce((a, s) => a + s.forms.length, 0);
const hasForm = (re: RegExp) =>
  services.filter((s) => s.forms.some((f) => re.test(f.name))).length;

/**
 * 반복해서 나오는 네 가지. 이름은 우리 데이터에 실제로 첨부돼 있는 파일명에서
 * 가져왔다 — 우리가 지어낸 분류가 아니다.
 */
const COMMON = [
  {
    name: "사회보장급여 신청(변경)서",
    count: hasForm(/사회보장급여.*신청/),
    what: "복지 신청의 기본 서식입니다. 누가, 어떤 급여를, 어떤 가구 구성으로 신청하는지를 적습니다. 사업이 달라도 이 한 장은 대부분 공통으로 냅니다.",
  },
  {
    name: "소득·재산 신고서",
    count: hasForm(/소득[·ㆍ,]?\s*재산\s*신고/),
    what: "근로소득·사업소득과 집·자동차·예금을 적는 서식입니다. 자격을 가르는 소득인정액이 여기서 계산되므로 가장 꼼꼼히 봐야 합니다.",
  },
  {
    name: "금융정보 등 제공 동의서",
    count: hasForm(/금융정보/),
    what: "예금·보험·신용 정보를 기관이 조회하도록 동의하는 서류입니다. 소득·재산을 신고서만으로 확인할 수 없어 거의 함께 요구됩니다. 가구원 전원의 서명이 필요한 경우가 많습니다.",
  },
  {
    name: "위임장",
    count: hasForm(/위임장/),
    what: "본인이 아닌 가족이 대신 신청할 때 냅니다. 대리 신청 자체는 대부분 허용되지만, 위임장과 대리인 신분증이 없으면 접수가 되지 않습니다.",
  },
];

export default function DocumentsGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="서류를 한 번에 못 갖춰서 주민센터를 두 번 가는 일이 흔합니다. 사업마다 다르지만, 반복해서 나오는 것들이 있습니다."
        updated={`최종 수정 ${G.updated} · 수록 ${services.length.toLocaleString()}건 집계 기준`}
      >
        <DocSection title="사업이 달라도 반복되는 네 가지">
          <p>
            수록한 사업 중 {withForms.length}건에 첨부 파일이 달려 있고, 파일은
            모두 {fileCount}개입니다. 파일명을 훑어보면 사업이 제각각인데도 같은
            서식이 계속 나옵니다. 아래 넷이 그것입니다.
          </p>
          <div className="space-y-3">
            {COMMON.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-line bg-white p-4"
              >
                <p className="flex flex-wrap items-baseline gap-2">
                  <span className="font-bold text-ink">{c.name}</span>
                  <span className="text-xs text-muted">
                    수록 사업 {c.count}건에 첨부
                  </span>
                </p>
                <p className="mt-1.5 leading-relaxed">{c.what}</p>
              </div>
            ))}
          </div>
          <p>
            이 넷은 보건복지부가 고시한 공통 서식이라 사업이 달라도 양식이
            같습니다. 한 번 써 보면 다음 사업에서 훨씬 빨라집니다.
          </p>
        </DocSection>

        <DocSection title="등본·가족관계증명서는 안 떼도 될 때가 많습니다">
          <p>
            신청서와 함께 <strong>행정정보 공동이용 동의서</strong>를 내면,
            담당 기관이 주민등록등본이나 가족관계증명서 같은 서류를 직접
            조회합니다. 이 동의서 한 장으로 떼야 할 서류가 여러 장 줄어듭니다.
          </p>
          <p>
            그런데 창구에서 먼저 알려주지 않으면 모르고 지나칩니다. 미리 떼서
            가져가도 문제는 없지만, 그 서류를 떼러 정부24나 무인발급기를 한
            번 더 거치게 됩니다.{" "}
            <strong>
              신청 전에 &ldquo;공동이용 동의로 대체되는 서류가 무엇인지&rdquo;를
              담당 부서에 먼저 물어보세요.
            </strong>
          </p>
        </DocSection>

        <DocSection title="첨부 파일이 곧 제출 서류는 아닙니다">
          <p>
            원문에 붙어 있는 파일 {fileCount}개를 열어 보면 상당수가 신청서가
            아니라 <strong>공무원용 사업안내 지침</strong>입니다.
            &ldquo;2026년 ○○사업 안내&rdquo; 같은 수백 쪽짜리 PDF가 그렇습니다.
            신청자가 그걸 다 읽을 필요는 없습니다.
          </p>
          <p>
            다만 그 지침 안에 <strong>제출 서류 목록</strong>이 표로 정리돼
            있는 경우가 많습니다. 목차에서 &ldquo;신청&rdquo;이나
            &ldquo;구비서류&rdquo;를 찾아 그 부분만 보면 됩니다. 이 사이트는
            각 서비스 상세 페이지에 첨부 파일을 원문 링크 그대로 걸어 두었으니
            거기서 바로 열 수 있습니다.
          </p>
          <DocNote>
            제출 서류는 <strong>같은 사업이라도 지자체마다 다를 수 있습니다.</strong>{" "}
            여기 정리한 것은 무엇을 미리 준비하면 좋은지에 대한 안내이지 확정된
            목록이 아닙니다. 최종 목록은 반드시 접수처에 확인하세요.
          </DocNote>
        </DocSection>

        <DocSection title="준비 순서">
          <p>
            서류를 떼는 순서를 잘못 잡으면 유효기간이 지나 다시 떼야 합니다.
            증명서는 대개 발급일로부터 기간이 정해져 있습니다.
          </p>
          <ol className="space-y-2">
            <li>
              <strong>① 담당 부서에 전화해 목록을 확정합니다.</strong> 이
              한 통이 헛걸음 한 번을 막습니다. 공동이용 동의로 생략되는
              서류도 여기서 확인됩니다.
            </li>
            <li>
              <strong>② 집에서 쓸 수 있는 것부터 씁니다.</strong> 신청서,
              신고서, 동의서는 서식만 내려받아 미리 채워 둘 수 있습니다.
            </li>
            <li>
              <strong>③ 증명서는 마지막에 뗍니다.</strong> 유효기간 때문입니다.
              정부24에서 대부분 무료로 발급됩니다.
            </li>
            <li>
              <strong>④ 가구원 서명이 필요한 것을 미리 받아 둡니다.</strong>{" "}
              금융정보 동의서가 여기 걸립니다. 따로 사는 가족이면 하루로
              끝나지 않습니다.
            </li>
          </ol>
        </DocSection>

        <DocSection title="자격부터 확인하는 게 먼저입니다">
          <p>
            서류를 다 갖춰 갔는데 소득 기준에서 걸리면 그 시간이 통째로
            사라집니다. 복지 사업의 자격은 대부분 &ldquo;기준 중위소득 몇 %
            이하&rdquo;로 정해지므로, 내가 어느 구간인지 먼저 보고 움직이는
            편이 낫습니다.
          </p>
          <p>
            <Link href="/check" className="text-brand underline">
              자격 자가진단
            </Link>
            에 가구원 수와 소득만 넣으면 바로 나옵니다. 넣은 값은 브라우저에만
            저장되고 서버로 보내지 않습니다.
          </p>
        </DocSection>
      </DocPage>

      <div className="mx-auto max-w-3xl">
        <GuideNav current="documents" />
      </div>
    </>
  );
}
