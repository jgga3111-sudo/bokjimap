-- 관심 지원 — 계정에 붙는 목록 (2026-09-11)
--
-- Supabase 대시보드 → SQL Editor에 이 파일을 통째로 붙여 한 번 실행한다.
-- 다시 실행해도 괜찮게 짰다(if not exists / drop policy if exists).
--
-- · 계정을 지우면 목록도 같이 지워진다(on delete cascade).
--   개인정보처리방침의 "탈퇴 시 지체 없이 파기"가 이 한 줄에 달려 있다.
-- · 권한은 RLS가 막는다. 로그인한 사람은 **자기 줄만** 읽고 쓰고 지운다.
--   서버가 공개 키(publishable)로 붙어도 남의 목록은 못 본다.
-- · 수정(update) 정책은 두지 않는다. 목록은 넣고 빼기만 한다.

create table if not exists public.saved_services (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  service_id text        not null check (service_id ~ '^WLF[0-9]+$'),
  name       text        not null check (char_length(name) between 1 and 200),
  place      text        not null default '' check (char_length(place) <= 100),
  created_at timestamptz not null default now(),
  primary key (user_id, service_id)
);

alter table public.saved_services enable row level security;

-- 권한은 **필요한 만큼만 직접** 준다. 프로젝트를 만들 때 「새 테이블 자동
-- 공개(Automatically expose new tables)」를 껐다(Supabase 권장, 09-11) —
-- 그래서 이 줄이 없으면 로그인한 사람도 이 표를 못 읽는다.
-- 수정(update)은 안 준다. 로그인 안 한 사람(anon)에게는 아무것도 안 준다.
--
-- ⚠ authenticated도 **먼저 전부 걷고** 준다. 자동 공개를 껐는데도 Supabase가
-- 새 표에 truncate·trigger·references를 기본으로 붙여 두었다(09-11 실행 후
-- information_schema로 확인). truncate는 RLS를 안 거치고 표를 통째로 비운다.
-- Data API로는 못 부르지만 필요 없는 권한은 두지 않는다.
revoke all on public.saved_services from anon, authenticated;
grant select, insert, delete on public.saved_services to authenticated;

drop policy if exists "saved: read own" on public.saved_services;
create policy "saved: read own" on public.saved_services
  for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "saved: insert own" on public.saved_services;
create policy "saved: insert own" on public.saved_services
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "saved: delete own" on public.saved_services;
create policy "saved: delete own" on public.saved_services
  for delete to authenticated
  using ((select auth.uid()) = user_id);
