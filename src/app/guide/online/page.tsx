import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import ServiceList from "@/components/ServiceList";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";

const G = guideBySlug("online")!;

export const metadata: Metadata = {
  title: `${G.title} — 주민센터에 가지 않아도 되는 사업`,
  description:
    "복지로·정부24에서 온라인으로 신청할 수 있는 복지 사업만 모았습니다. 중앙부처 사업과 지자체 사업을 나눠, 인증 수단과 준비물까지 정리했습니다.",
  alternates: { canonical: "/guide/online" },
};

/*
  중앙부처와 지자체는 온라인 가능 여부를 다른 필드로 준다(guide/apply의 주석
  참고). 두 갈래를 따로 뽑아 따로 보여준다 — 섞으면 어느 쪽 근거로 걸린
  것인지 알 수 없다.
*/
const NET = ["인터넷", "모바일", "모바일앱"];

const centralOnline = services.filter(
  (s) => s.provider === "central" && s.onlineApply === true,
);
const localOnline = services.filter(
  (s) =>
    s.provider === "local" && s.applyMethods.some((m) => NET.includes(m)),
);

/** 지자체 190여 건을 한 화면에 다 깔면 목록만 남는 페이지가 된다. */
const LOCAL_SHOWN = 24;
const localTop = localOnline.slice(0, LOCAL_SHOWN);

export default function OnlineGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="복지 신청은 아직도 방문 접수가 많지만, 집에서 끝낼 수 있는 사업도 적지 않습니다. 되는 것만 모았습니다."
        updated={`최종 수정 ${G.updated} · 수록 ${services.length.toLocaleString()}건 집계 기준`}
      >
        <DocSection title="온라인으로 되는 사업은 몇 건인가">
          <p>
            수록한 {services.length.toLocaleString()}건 가운데 온라인 신청
            경로가 확인되는 것은{" "}
            <strong>
              {(centralOnline.length + localOnline.length).toLocaleString()}건
            </strong>
            입니다. 중앙부처 {centralOnline.length}건, 지자체{" "}
            {localOnline.length}건입니다.
          </p>
          <p>
            중앙부처 사업은 대부분 <strong>복지로</strong>에서 바로 신청까지
            이어집니다. 전국 어디에 살든 조건만 맞으면 같은 화면에서 신청할 수
            있습니다. 지자체 사업은 시·군·구 홈페이지나 별도 신청 사이트로
            가는 경우가 많아, 사업마다 들어가는 곳이 다릅니다.
          </p>
        </DocSection>

        <DocSection title="시작 전에 인증 수단부터">
          <p>
            온라인 신청에서 가장 많이 막히는 지점은 자격이 아니라{" "}
            <strong>본인 확인</strong>입니다. 신청서를 다 쓰고 마지막에
            인증에서 걸려 처음부터 다시 하는 일이 흔합니다. 시작하기 전에 셋 중
            하나는 준비해 두세요.
          </p>
          <ul className="space-y-2">
            <li>
              <strong>간편인증</strong> — 카카오·네이버·통신사 패스 등.
              가장 쉽고 대부분의 창구에서 받습니다.
            </li>
            <li>
              <strong>금융인증서·공동인증서</strong> — 은행 앱에서 발급합니다.
              간편인증을 받지 않는 일부 창구에서 필요합니다.
            </li>
            <li>
              <strong>본인 명의 휴대전화</strong> — 어느 방식이든 결국
              필요합니다. 가족 명의 휴대전화로는 본인 인증이 되지 않습니다.
            </li>
          </ul>
          <DocNote>
            신청인 본인이 직접 해야 합니다. 가족이 대신 온라인으로 넣으면 본인
            인증에서 걸립니다. 대리 신청은 위임장을 갖춰 창구에서 하는 쪽이
            확실합니다 —{" "}
            <Link href="/guide/documents" className="text-brand underline">
              신청 서류 안내
            </Link>
            를 보세요.
          </DocNote>
        </DocSection>

        <DocSection title="온라인이라고 서류가 없는 건 아닙니다">
          <p>
            신청서 자체는 화면에서 쓰지만, 소득·재산을 증명하는 서류나 가구원
            동의서는 따로 요구되는 경우가 있습니다. 파일로 올리게 하는 곳도
            있고, 신청은 온라인으로 받고 서류만 방문·우편으로 받는 곳도
            있습니다.
          </p>
          <p>
            그래서 <strong>신청 버튼을 누르기 전에 필요 서류를 먼저</strong>{" "}
            확인하는 편이 낫습니다. 스캔이나 사진이 필요하면 미리 찍어 두세요.
            중간에 나갔다 오면 입력한 내용이 날아가는 창구가 아직 많습니다.
          </p>
        </DocSection>

        <DocSection title={`중앙부처 사업 ${centralOnline.length}건`}>
          <p>
            전국 어디서나 신청할 수 있는 사업입니다. 조회수가 높은 순으로
            전부 실었습니다.
          </p>
          <div className="pt-1">
            <ServiceList services={centralOnline} />
          </div>
        </DocSection>

        <DocSection title={`지자체 사업 ${localOnline.length}건`}>
          <p>
            <strong>본인이 사는 지역의 사업만 신청할 수 있습니다.</strong>{" "}
            조회수가 높은 순으로 {LOCAL_SHOWN}건만 아래에 실었습니다. 나머지{" "}
            {localOnline.length - LOCAL_SHOWN}건은{" "}
            <Link href="/region" className="text-brand underline">
              지역별 목록
            </Link>
            에서 내 지역을 골라 찾는 편이 빠릅니다 — 다른 지역 사업은
            신청할 수 없기 때문입니다.
          </p>
          <div className="pt-1">
            <ServiceList services={localTop} />
          </div>
        </DocSection>

        <DocSection title="목록에 없다고 안 되는 것은 아닙니다">
          <p>
            여기 실은 것은 <strong>원문에 온라인 신청 경로가 적혀 있는</strong>{" "}
            사업입니다. 원문이 신청 방법을 비워 둔 사업도 있고, 그 사이에
            온라인 접수를 새로 연 지자체도 있습니다. 관심 있는 사업이 목록에
            없다면 담당 부서에 한 번 물어보세요.
          </p>
          <p>
            반대로 여기 있다고 지금 당장 접수 중이라는 뜻도 아닙니다. 예산이
            소진되거나 접수 기간이 아니면 화면이 열리지 않습니다. 각 사업의
            원문 링크에서 현재 상태를 확인하세요.
          </p>
        </DocSection>
      </DocPage>

      <div className="mx-auto max-w-3xl">
        <GuideNav current="online" />
      </div>
    </>
  );
}
