/**
 * 공식 알림 서비스 셋 (2026-09-28).
 *
 * 복지클릭은 알림을 보내지 않는다(방침 — 이메일·전화번호를 받지 않는다). 대신
 * 정부가 직접 운영하는 알림 서비스로 잇는다. 설명은 각 서비스 누리집·보건복지부
 * 보도자료에 적힌 만큼만 옮겼다(확인일 CHECKED). 종류 수(몇 종 안내)는 해마다
 * 늘어서 적지 않는다. 둘러싸는 제목·상자는 쓰는 쪽이 정한다(/saved · 신청 달력 글).
 */
const CHECKED = "2026-09-28";

const ALERTS = [
  {
    name: "복지로 「복지멤버십」(맞춤형 급여 안내)",
    href: "https://www.bokjiro.go.kr",
    desc: "가입하면 소득·재산 정보를 분석해 받을 수 있는 복지서비스를 문자·복지로 앱으로 알려 줍니다. 가입할 때 개인정보·금융정보 활용 동의가 필요하고, 주소지와 관계없이 가까운 행정복지센터에서도 가입할 수 있습니다.",
    src: "보건복지부 보도자료",
    srcHref: "https://www.mohw.go.kr/board.es?mid=a10503000000&bid=0027&act=view&list_no=1479969",
  },
  {
    name: "정부24 「혜택알리미」",
    href: "https://plus.gov.kr/portal/benefitV2/",
    desc: "내가 받을 수 있는 정부 혜택을 모아 보여 주고, 맞춤안내 조건과 알림을 설정할 수 있습니다.",
    src: null,
    srcHref: null,
  },
  {
    name: "국민비서",
    href: "https://www.ips.go.kr/pot/svc/ntcn/selectIpsGdnc.do",
    desc: "건강검진(암검진 포함), 근로·자녀장려금 안내, 문화누리카드 발급·이용 안내 같은 알림을 카카오톡·네이버·은행 앱 등 고른 앱으로 받습니다.",
    src: null,
    srcHref: null,
  },
] as const;

export default function OfficialAlerts() {
  return (
    <>
      <ul className="space-y-3">
        {ALERTS.map((a) => (
          <li key={a.name} className="text-sm leading-relaxed text-slate-700">
            <a
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-brand underline"
            >
              {a.name} ↗
            </a>
            <span className="block">
              {a.desc}
              {a.srcHref && (
                <>
                  {" "}
                  <a
                    href={a.srcHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 underline"
                  >
                    ({a.src})
                  </a>
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-slate-500">
        각 서비스 누리집에서 {CHECKED}에 확인한 내용입니다. 가입·알림 설정은 각 서비스에서
        하며, 복지클릭은 이 서비스들과 관계가 없습니다.
      </p>
    </>
  );
}
