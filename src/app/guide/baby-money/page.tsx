import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection, DocNote } from "@/components/Doc";
import GuideNav from "@/components/GuideNav";
import { guideBySlug } from "@/lib/guides";
import { services } from "@/data/services";

const G = guideBySlug("baby-money")!;

export const metadata: Metadata = {
  title: `${G.title} — 부모급여·아동수당·첫만남이용권 비교`,
  description:
    "이름이 비슷해 헷갈리는 세 가지를 원문 그대로 나란히 놓았습니다. 언제 한 번인지 매달인지, 현금인지 카드 포인트인지, 몇 살까지인지가 전부 다릅니다.",
  alternates: { canonical: "/guide/baby-money" },
};

/*
  왜 이 셋인가. 조회수 상위 스무 건 안에 **셋이 모두 들어 있다** — 첫만남
  155만, 부모급여 171만, 아동수당 136만(복지로 누적). 같은 부처가 같은
  시기의 같은 가정에 주는 것이라 이름만 보면 구분이 안 된다.

  비교의 재료는 전부 **수록된 원문 필드**다. 지급형태·주기는 데이터가 주는
  값이고, 금액과 연령은 지원내용·지원대상 원문에서 그대로 옮겼다. 어느 쪽이
  유리한지, 함께 받을 수 있는지는 **판정하지 않는다**(CLAUDE.md 3절).
  연령 조건이 겹친다는 사실까지만 적고 확인은 공식 창구로 보낸다.
*/
const ID = {
  first: "WLF00004656", // 첫만남이용권
  parent: "WLF00004657", // 부모급여 지원
  child: "WLF00001171", // 아동수당 지급
} as const;

const find = (id: string) => services.find((s) => s.id === id);
const first = find(ID.first);
const parent = find(ID.parent);
const child = find(ID.child);

type Col = {
  id: string;
  short: string;
  when: string;
  how: string;
  amount: string;
  age: string;
};

const COLS: Col[] = [
  {
    id: ID.first,
    short: "첫만남이용권",
    when: "태어날 때 한 번",
    how: "국민행복카드 포인트(바우처)",
    amount: "첫째 200만원 · 둘째 이상 300만원",
    age: "출생 후 2년 이내",
  },
  {
    id: ID.parent,
    short: "부모급여",
    when: "매달",
    how: "현금",
    amount: "0세 월 100만원 · 1세 월 50만원",
    age: "0~23개월",
  },
  {
    id: ID.child,
    short: "아동수당",
    when: "매달",
    how: "현금",
    amount: "월 10~13만원",
    age: "만 9세 미만",
  },
];

/** 원문을 그대로 인용할 때 쓰는 상자. 우리가 고쳐 쓰지 않는다는 표시다. */
function Quote({ s }: { s: { name: string; supportContent: string | null } }) {
  return (
    <blockquote className="rounded-lg border-l-4 border-line bg-slate-50 py-3 pr-3 pl-4 text-sm leading-relaxed whitespace-pre-line text-slate-700">
      {(s.supportContent ?? "").trim()}
    </blockquote>
  );
}

export default function BabyMoneyGuide() {
  return (
    <>
      <DocPage
        title={G.title}
        lead="셋 다 아이를 낳으면 나오는 돈이고, 셋 다 보건복지부가 합니다. 그런데 주는 방법도 기간도 금액도 다릅니다."
        updated={`최종 수정 ${G.updated} · 수록 ${services.length.toLocaleString()}건 중 세 사업의 원문 기준`}
      >
        <DocSection title="한 장으로 보면">
          <p>
            셋을 가르는 것은 <strong>언제·무엇으로·얼마나</strong> 세
            가지입니다.
          </p>

          {/* 모바일에서 표는 가로로 넘친다. 감싸서 표만 밀리게 한다 —
              페이지 전체가 가로로 밀리면 읽는 자리를 잃는다. */}
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left">
                  <th className="py-2 pr-3 font-semibold text-muted"> </th>
                  {COLS.map((c) => (
                    <th key={c.id} className="py-2 pr-3 font-bold text-ink">
                      {c.short}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="align-top">
                {(
                  [
                    ["언제", "when"],
                    ["무엇으로", "how"],
                    ["얼마", "amount"],
                    ["나이", "age"],
                  ] as const
                ).map(([label, key]) => (
                  <tr key={key} className="border-b border-line/70">
                    <th className="py-2.5 pr-3 text-left font-semibold whitespace-nowrap text-muted">
                      {label}
                    </th>
                    {COLS.map((c) => (
                      <td key={c.id} className="py-2.5 pr-3 text-slate-700">
                        {c[key]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th className="py-2.5 pr-3 text-left font-semibold text-muted">
                    상세
                  </th>
                  {COLS.map((c) => (
                    <td key={c.id} className="py-2.5 pr-3">
                      <Link
                        href={`/service/${c.id}`}
                        className="text-brand underline"
                      >
                        보기
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted">
            금액과 나이는 각 사업의 지원내용·지원대상 원문에서 옮긴 것입니다.
            해가 바뀌면 달라지므로 신청 전에 상세와 공식 안내를 확인하세요.
          </p>
        </DocSection>

        <DocSection title="1. 첫만남이용권 — 한 번, 그리고 현금이 아닙니다">
          <p>
            셋 중 <strong>유일하게 1회성</strong>입니다. 그리고 셋 중 유일하게{" "}
            <strong>바우처</strong>입니다 — 계좌로 돈이 들어오는 게 아니라
            국민행복카드에 포인트로 얹힙니다. 이 두 가지 때문에 &ldquo;아직 안
            들어왔다&rdquo;는 오해가 가장 많이 생기는 자리입니다.
          </p>
          {first && <Quote s={first} />}
          <p>
            시설 보호 아동 등 예외적으로 현금으로 주는 경우가 원문에 따로 적혀
            있습니다.{" "}
            <Link href="/benefit/voucher" className="text-brand underline">
              바우처로 받는 지원 전체 보기
            </Link>
          </p>
        </DocSection>

        <DocSection title="2. 부모급여 — 두 살 되기 전까지, 금액이 절반으로">
          <p>
            매달 나오지만 <strong>0세와 1세의 금액이 다릅니다.</strong> 그리고
            어린이집에 보내면 계산이 달라집니다 — 보육료가 바우처로 먼저 나가고
            그 차액만 현금으로 옵니다.
          </p>
          {parent && <Quote s={parent} />}
          <p>
            원문은 <strong>&ldquo;별도의 소득인정액 기준 없음&rdquo;</strong>
            이라고 적고 있습니다. 소득 때문에 미리 포기하는 일이 없도록 여기
            그대로 옮깁니다. 두 살이 되면 가정양육수당으로 넘어간다는 안내도
            원문에 있습니다.
          </p>
        </DocSection>

        <DocSection title="3. 아동수당 — 금액은 가장 작고, 기간은 가장 깁니다">
          <p>
            <strong>만 9세 미만</strong>까지 이어집니다. 셋 중 유일하게 아이가
            초등학교에 들어간 뒤에도 계속되는 항목입니다.
          </p>
          {child && <Quote s={child} />}
          <p>
            원문에 적힌 두 가지를 짚어 둡니다.{" "}
            <strong>지자체 조례에 따라 지역화폐로 나갈 수 있고</strong>, 아동이{" "}
            <strong>90일 이상 해외에 머물면 지급이 멈춥니다.</strong> 둘 다
            안내문에서 잘 넘어가는 줄입니다.
          </p>
        </DocSection>

        <DocSection title="연령 조건은 겹칩니다">
          <p>
            위 표의 나이 칸을 보면, <strong>태어난 해의 아이</strong>는 세
            사업의 연령 조건에 모두 들어갑니다. 첫만남이용권은 출생 후 2년,
            부모급여는 0~23개월, 아동수당은 만 9세 미만이기 때문입니다.
          </p>
          <DocNote>
            다만{" "}
            <strong>이 사이트는 중복 수급 여부를 판정하지 않습니다.</strong>{" "}
            연령 조건이 겹친다는 것은 원문에서 읽히는 사실이지만, 실제로 함께
            받을 수 있는지는 신청 시점의 지침에 달려 있습니다. 전화로 물을 곳은{" "}
            <strong>보건복지상담센터 국번 없이 129</strong>입니다.
          </DocNote>
        </DocSection>

        <DocSection title="한 번에 신청하는 통로가 있습니다">
          <p>
            비교한 세 사업은 원문에 신청 창구가 적혀 있지 않습니다. 다만 수록된
            다른 출산 관련 사업 여럿이{" "}
            <strong>&ldquo;행복출산 원스톱 서비스&rdquo;</strong>를 신청 통로로
            안내하고 있어, 그 표현을 그대로 옮깁니다.
          </p>
          <blockquote className="rounded-lg border-l-4 border-line bg-slate-50 py-3 pr-3 pl-4 text-sm leading-relaxed text-slate-700">
            &ldquo;출생신고 시 관할 행정복지센터에서 행복출산원스톱서비스 신청
            혹은 정부24(인터넷신청) 가능&rdquo;
            <span className="mt-1.5 block text-xs text-muted">
              — 수록 사업{" "}
              <Link
                href="/service/WLF00004415"
                className="text-brand underline"
              >
                다자녀가정 출산축하금 지원(확대)
              </Link>
              의 원문
            </span>
          </blockquote>
          <p className="text-xs text-muted">
            이 문장은 그 지자체 사업의 안내입니다. 위 세 사업에도 같은 통로가
            열려 있는지는 신청 시점에 창구나 129로 확인하세요 — 우리가 대신
            단정하지 않습니다.
          </p>
        </DocSection>

        <DocSection title="같이 보면 좋은 것">
          <p>
            임신·출산 단계에는 이 셋 말고도 진료비·산후조리·기저귀 지원 등이
            걸려 있고, 지자체가 따로 하는 출산장려금이 지역마다 다릅니다.
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <Link href="/life/pregnancy" className="text-brand underline">
                임신·출산 시기 지원 전체
              </Link>{" "}
              — 생애주기로 묶은 목록입니다
            </li>
            <li>
              <Link
                href="/theme/pregnancy-birth"
                className="text-brand underline"
              >
                주제 &lsquo;임신·출산&rsquo;
              </Link>{" "}
              — 중앙부처 사업이 여기 걸립니다
            </li>
            <li>
              <Link href="/guide/mistakes" className="text-brand underline">
                신청에서 자주 놓치는 여섯 가지
              </Link>{" "}
              — &lsquo;한 번인데 매달로 아는&rsquo; 실수를 다룹니다
            </li>
          </ul>
        </DocSection>
      </DocPage>

      <div className="mx-auto max-w-3xl">
        <GuideNav current="baby-money" />
      </div>
    </>
  );
}
