import { SITE } from "@/lib/site";
import type { DatedEntry } from "@/lib/calendar";
import { icsTitle } from "@/lib/calendarLinks";

/**
 * 신청 달력 항목 하나를 `.ics`(iCalendar, RFC 5545) 한 장으로 만든다.
 *
 * ── 왜 `.ics`인가 (2026-09-12) ─────────────────────────────────
 * 사용자가 "네이버 캘린더 알림"을 원했는데, **네이버에는 구글 같은 「링크 한
 * 번으로 일정 추가」 주소가 없다.** 공식 캘린더 API(`openapi.naver.com`)는
 * 있지만 OAuth 로그인과 앱 등록이 필요하고 — 그리고 그 API가 받는 본문이
 * 바로 **iCalendar 문자열**이다. 즉 네이버에서도 이 형식이 정식 경로다.
 *
 * `.ics` 하나면 네이버 캘린더(가져오기)·아이폰·구글·아웃룩이 전부 읽는다.
 * 휴대폰에서는 링크를 누르는 순간 캘린더 앱이 바로 열린다.
 *
 * ── 알림은 우리가 보내지 않는다 ────────────────────────────────
 * 메일을 보내려면 이메일 주소를 받아야 하고, 그 순간 개인정보처리방침을
 * 고치고 7일 전에 알려야 한다(방침 9조). 대신 **`.ics` 안에 3일 전 알림
 * (`VALARM`)을 넣어** 이용자의 캘린더가 스스로 울리게 한다. 우리는 아무
 * 개인정보도 받지 않고, 이용자는 알림을 받는다.
 *
 * ── 날짜를 하루로 잡는 이유 ────────────────────────────────────
 * 기간이 「6월 2일~12월 1일」처럼 여섯 달짜리인 항목이 있다. 그대로 넣으면
 * 남의 달력이 여섯 달 내내 이 일정으로 덮인다. 그래서 **끝나는 날 하루짜리
 * 종일 일정**으로 넣고, 원문 기간은 설명에 그대로 적는다.
 */

/** 텍스트 값 이스케이프 — RFC 5545 §3.3.11. 순서가 중요하다(역슬래시 먼저). */
function esc(v: string): string {
  return v
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/**
 * 75옥텟 접기 — RFC 5545 §3.1.
 *
 * ⚠ **글자 수가 아니라 바이트 수**다. 한글은 UTF-8에서 3바이트라 글자로
 * 세면 줄이 두 배 넘게 길어진다. 그리고 **글자 중간에서 자르면 안 된다** —
 * 잘린 바이트가 다음 줄로 넘어가면 깨진 글자가 된다. 그래서 한 글자씩
 * 바이트를 더해 가며 넘칠 때 끊는다.
 */
const UTF8 = new TextEncoder();

function fold(line: string): string {
  const out: string[] = [];
  let cur = "";
  let bytes = 0;
  for (const ch of line) {
    const n = UTF8.encode(ch).length;
    /* 이어지는 줄은 맨 앞 한 칸(공백)이 접힘 표시라 그만큼 덜 담긴다. */
    const limit = out.length === 0 ? 75 : 74;
    if (bytes + n > limit) {
      out.push(cur);
      cur = "";
      bytes = 0;
    }
    cur += ch;
    bytes += n;
  }
  out.push(cur);
  return out.join("\r\n ");
}

/** `2026-09-15` → `20260915` */
function compact(iso: string): string {
  return iso.replace(/-/g, "");
}

/** 종일 일정의 `DTEND`는 **끝난 다음 날**이다(끝을 포함하지 않는다). */
function nextDay(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return compact(d.toISOString().slice(0, 10));
}

export function buildIcs(e: DatedEntry): string {
  const single = e.start === e.end;
  const detail = `${SITE.url}/service/${e.id}`;

  const desc = [
    `기간: ${e.period}`,
    single ? null : "이 일정은 위 기간의 마지막 날에 표시했습니다.",
    e.note,
    `${e.source}에서 ${e.checkedAt}에 확인한 내용입니다.`,
    `출처: ${e.sourceUrl}`,
    `자세히: ${detail}`,
    "정확한 일정은 반드시 공식 공고에서 다시 확인하세요.",
  ]
    .filter(Boolean)
    .join("\n");

  /* DTSTAMP를 `new Date()`로 잡으면 빌드할 때마다 값이 달라져 같은 내용의
     파일이 매번 바뀐 것처럼 보인다. 확인일로 고정해 **빌드가 늘 같은 결과**를
     내게 한다(사이트맵 lastmod를 함부로 안 미는 것과 같은 이유). */
  const stamp = `${compact(e.checkedAt)}T000000Z`;

  return vcalendar([
    `UID:${e.key}@bokjiclick.co.kr`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${compact(e.end)}`,
    `DTEND;VALUE=DATE:${nextDay(e.end)}`,
    `SUMMARY:${esc(icsTitle(e))}`,
    `DESCRIPTION:${esc(desc)}`,
    `URL:${esc(detail)}`,
    "TRANSP:TRANSPARENT",
    "BEGIN:VALARM",
    /* 3일 전. 캘린더가 대신 울려 주므로 우리는 메일을 보내지 않는다. */
    "TRIGGER:-P3D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(`${e.label} · ${e.what}`)}`,
    "END:VALARM",
  ]);
}

/** VEVENT 줄들을 VCALENDAR 한 장으로 감싼다. */
function vcalendar(event: string[]): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${SITE.name}//${SITE.url}//KO`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    ...event,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  /* RFC 5545는 줄 끝을 CRLF로 못 박는다. 파일이 LF로 나가면 깐깐한 캘린더가
     통째로 거른다 — 이 파일만은 저장소 줄바꿈과 무관하게 CRLF다. */
  return lines.map(fold).join("\r\n") + "\r\n";
}

/**
 * 「내년에 다시 확인하기」 일정 한 장(2026-09-17, `lib/reminder.ts`).
 *
 * 날짜는 내년 공고일이 아니라 **우리가 정한 확인할 날**이라 설명 첫 줄에 그렇게
 * 적는다. 알림은 그날 오전 9시(종일 일정 시작 + 9시간).
 */
export function buildReminderIcs(r: {
  id: string;
  name: string;
  date: string;
  periodText: string;
  today: string;
}): string {
  const detail = `${SITE.url}/service/${r.id}`;
  const desc = [
    `지난 신청 기간: ${r.periodText}`,
    "이 날짜는 공고일이 아닙니다. 지난번 신청 기간이 시작된 날의 2주 전으로 복지클릭이 정한 「확인해 볼 날」입니다.",
    "올해도 모집하는지, 언제인지는 공식 공고에서 확인하세요.",
    `자세히: ${detail}`,
  ].join("\n");

  return vcalendar([
    `UID:remind-${r.id}-${compact(r.date)}@bokjiclick.co.kr`,
    `DTSTAMP:${compact(r.today)}T000000Z`,
    `DTSTART;VALUE=DATE:${compact(r.date)}`,
    `DTEND;VALUE=DATE:${nextDay(r.date)}`,
    `SUMMARY:${esc(`[${SITE.name}] ${r.name} · 모집 공고 확인하기`)}`,
    `DESCRIPTION:${esc(desc)}`,
    `URL:${esc(detail)}`,
    "TRANSP:TRANSPARENT",
    "BEGIN:VALARM",
    "TRIGGER;RELATED=START:PT9H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(`${r.name} 모집 공고 확인하기`)}`,
    "END:VALARM",
  ]);
}
