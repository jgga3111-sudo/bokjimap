import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocList, DocNote } from "@/components/Doc";
import MailLink from "@/components/MailLink";
import { services, SERVICES_UPDATED } from "@/data/services";

/*
  ── 정보 수집·검수 기준 (2026-09-11) ──────────────────────────────
  CLAUDE.md 3절(데이터 원칙)과 5절(데이터 소스)을 **읽는 사람 쪽으로** 옮긴
  페이지다. 여태 그 원칙은 코드 주석과 작업 문서에만 있었고, 화면에서는
  「사이트 소개」의 "확인하지 못한 값을 채우지 않습니다" 한 줄이 전부였다.

  왜 따로 두나. 지원금 정보는 신청·금전에 직접 닿는다. 이 사이트가 정확성을
  경쟁력으로 삼는다면, **무엇을 어떻게 확인하고 무엇을 하지 않는지**를 읽는
  사람이 스스로 판단할 수 있게 밝혀야 한다. 「데이터 출처」는 *어디서*
  가져왔는지를, 이 페이지는 *어떤 규칙으로* 옮기는지를 말한다.

  숫자는 전부 렌더 시점에 센다(수록 건수·중앙/지자체·마지막 수집일).
  손으로 적은 수치는 재수집 뒤 조용히 틀린 말이 된다(lib/guides.ts 머리말).

  색인한다. 약관·방침처럼 어느 사이트에나 있는 정형 문서가 아니라 이 사이트가
  무엇을 믿을 만한지 말하는 글이라, 사이트맵에도 올린다(sitemap.ts).
*/
export const metadata: Metadata = {
  title: "정보 수집·검수 기준",
  description:
    "복지클릭이 복지·지원금 정보를 어디서 가져와 어떤 규칙으로 옮기는지 밝힙니다. 확인하지 못한 값은 비우고, 금액·연령은 원문 그대로 두며, 자격 판정은 하지 않습니다.",
  alternates: { canonical: "/standards" },
};

const central = services.filter((s) => s.provider === "central").length;
const local = services.filter((s) => s.provider === "local").length;
const total = services.length.toLocaleString();

export default function StandardsPage() {
  return (
    <DocPage
      title="정보 수집·검수 기준"
      lead="지원금 정보는 신청과 돈에 바로 닿습니다. 그래서 복지클릭은 무엇을 어디서 가져와 어떤 규칙으로 옮기는지, 그리고 무엇을 하지 않는지를 미리 적어 둡니다."
      updated={`복지 서비스 데이터 최종 수집일 ${SERVICES_UPDATED}`}
    >
      <DocNote tone="brand" title="한 줄 요약">
        정부가 공개한 자료를 <strong>원문 그대로</strong> 옮기고, 확인하지 못한
        값은 <strong>비워 둡니다.</strong> 자료에 없는 값을 채울 때는 법령
        조문이나 소관 기관 자료를 찾아 <strong>어디서 가져왔는지 함께</strong>{" "}
        적습니다. 받을 수 있는지 없는지를 대신 판정하지는 않습니다.
      </DocNote>

      <DocSection title="어디서 가져오나">
        <p>
          복지 서비스 정보는 공공데이터포털이 제공하는 두 오픈API에서
          받습니다. 중앙부처 사업은{" "}
          <strong>중앙부처복지서비스 조회 서비스</strong>, 시·군·구 사업은{" "}
          <strong>지자체복지서비스 조회 서비스</strong>입니다. 둘 다
          한국사회보장정보원이 제공하며 이용허락범위에 제한이 없습니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-sm">
            <tbody>
              {[
                ["수록 서비스", `${total}건`],
                ["중앙부처 사업", `${central.toLocaleString()}건`],
                ["지자체 사업", `${local.toLocaleString()}건`],
                ["마지막 수집일", SERVICES_UPDATED],
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
          공공데이터포털에 등록된 전체 사업 가운데 복지로에서 많이 조회된
          것부터 차례로 싣습니다. 출처별 링크와 이용 조건은{" "}
          <Link href="/source" className="text-brand underline">
            데이터 출처
          </Link>
          에 적어 두었습니다.
        </p>
      </DocSection>

      <DocSection title="옮길 때 지키는 것">
        <DocList
          items={[
            <>
              <strong>확인하지 못하면 비웁니다.</strong> 금액·기간·연락처가
              원문에 없으면 그 자리를 비워 둡니다. 짐작해서 채우지 않고,
              &lsquo;정보 없음&rsquo; 같은 말로 메우지도 않습니다. 빈칸이
              부실해 보여도, 틀린 값으로 헛걸음하게 하거나 신청 기회를 놓치게
              하는 것보다 낫다고 봅니다.
            </>,
            <>
              <strong>작년 공고를 올해 것으로 옮기지 않습니다.</strong> 지원금은
              해마다 금액과 요건이 바뀝니다. 기준연도를 대조하고, 원문이 어느
              해 것인지 알 수 없으면 올해 것처럼 적지 않습니다.
            </>,
            <>
              <strong>출처가 엇갈리면 공식 자료를 따릅니다.</strong> 지자체
              공고·복지로·소관 부처 자료가 서로 다르면 공식 쪽을 싣고, 어떻게
              달랐는지도 함께 적습니다. 두 공식 자료가 서로 다를 때는 한쪽을
              고르지 않고 <strong>다르다는 사실 자체</strong>를 싣습니다.
            </>,
            <>
              <strong>금액·소득기준·연령은 원문 표현 그대로 둡니다.</strong>{" "}
              반올림하거나 요약하지 않습니다. 요약하다 조건 하나가 빠지면 그게
              곧 잘못된 안내가 되기 때문입니다.
            </>,
            <>
              <strong>마감된 공고는 숨기지 않고 &ldquo;마감&rdquo;으로
              표시합니다.</strong> 내년 재공고를 미리 찾아보는 분들이 있어서,
              지난 것도 지난 것이라고 적어 둔 채로 남깁니다.
            </>,
            <>
              <strong>자격 판정을 하지 않습니다.</strong> 법령 해석이나 수급
              자격 판정은 이 사이트의 역할이 아닙니다.{" "}
              <Link href="/check" className="text-brand underline">
                자가진단
              </Link>
              은 소득만 보는 가늠이며, 실제 심사는 재산까지 반영해 담당 기관이
              합니다. 안내와 공식 창구 링크까지가 저희 일입니다.
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="자료에 없는 값을 채울 때">
        <p>
          복지로 원문에는 <strong>지급일</strong>이나 <strong>환급률 표</strong>
          처럼 정작 궁금한 값이 빠져 있을 때가 있습니다. 그런 값은 다음 두
          방식으로만 채우고, 그 밖의 방법으로는 채우지 않습니다.
        </p>
        <DocList
          items={[
            <>
              <strong>법령 조문에서 찾고, 조문을 그대로 밝힙니다.</strong>{" "}
              지급일은 시행령·시행규칙에 있습니다. 조문을 저희 말로 바꾸지 않고
              따옴표 안에 그대로 싣고, 어느 법 몇 조인지와 확인한 날짜를 함께
              적습니다. 조문을 찾지 못한 제도는 싣지 않습니다.{" "}
              <Link href="/guide/pay-dates" className="text-brand underline">
                지급일 안내
              </Link>
              가 이 방식으로 만들어졌습니다.
            </>,
            <>
              <strong>소관 기관의 공식 자료에서 옮깁니다.</strong> 원문이
              &ldquo;20%~53.3%&rdquo;처럼 범위만 말하면 운영기관이 공개한 표를
              찾아 옮깁니다. 블로그나 요약 글은 근거로 쓰지 않습니다.
            </>,
            <>
              <strong>계산기가 내놓는 값은 &ldquo;저희가 계산한 값&rdquo;이라고
              표시합니다.</strong> 산식에 넣어 곱한 결과는 원문에 없는
              숫자입니다. 그 사실을 화면에 그대로 적고, 모르는 값은 0으로
              두지 않고 &ldquo;계산 안 함&rdquo;으로 둡니다.
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="언제 갱신하나">
        <p>
          정해진 주기 없이 <strong>수시로</strong> 다시 받습니다. 복지 서비스
          데이터의 마지막 수집일은 <strong>{SERVICES_UPDATED}</strong>이며, 이
          날짜는 각 서비스 페이지 상단에도 &ldquo;확인&rdquo;으로 표시됩니다.
        </p>
        <p>
          직접 쓴 안내 글은 글마다 마지막으로 손본 날을 머리에 적습니다. 글
          안의 집계 숫자는 손으로 적지 않고 수록 데이터에서 그때그때 세므로,
          데이터를 다시 받으면 글의 숫자도 함께 바뀝니다.
        </p>
      </DocSection>

      <DocSection title="서비스 페이지의 두 날짜">
        <p>
          서비스 페이지 상단에는 날짜가 둘까지 붙습니다. 뜻이 다르니 나란히
          읽어 주세요.
        </p>
        <DocList
          items={[
            <>
              <strong>확인일</strong> — 저희가 공공데이터포털에서 그 정보를{" "}
              <strong>받아 온 날</strong>입니다. 원문이 그날 고쳐졌다는 뜻이
              아닙니다.
            </>,
            <>
              <strong>원문 최종수정일</strong> — 담당 기관이 그 정보를{" "}
              <strong>마지막으로 고친 날</strong>입니다. 지자체 사업에만 있고,
              중앙부처 사업은 원본 데이터가 이 값을 주지 않아 표시되지
              않습니다. 없는 값을 &ldquo;정보 없음&rdquo;으로 채우지 않는 규칙이
              여기에도 적용됩니다.
            </>,
          ]}
        />
        <p>
          원문 최종수정일이 오래됐다고 해서 저희가 &ldquo;오래된 정보&rdquo;라고
          판정해 붙이지는 않습니다. 며칠이 지나야 낡은 것인지는 제도마다
          다르기 때문입니다. 두 날짜를 보고 읽는 분이 정하실 수 있게 둡니다.
        </p>
      </DocSection>

      <DocSection title="틀린 곳을 발견하셨다면">
        <DocNote tone="amber" title="신청 전에는 공식 안내로 반드시 최종 확인하세요">
          위 규칙을 지켜도 원문이 바뀐 뒤 저희가 다시 받아오기까지 시차가
          있고, 모든 사업이 공공데이터포털에 등록돼 있지도 않습니다. 각
          서비스 페이지의 복지로 원문 링크나 담당 기관에서 확인해 주세요.
        </DocNote>
        <p>
          옮기는 과정에서 생긴 오류는 저희가 고칠 수 있습니다.{" "}
          <Link href="/contact" className="text-brand underline">
            문의·오류 신고
          </Link>
          로 어느 페이지의 어느 부분인지 알려 주시거나,{" "}
          <MailLink className="text-brand underline" />로 보내 주세요.
        </p>
      </DocSection>
    </DocPage>
  );
}
