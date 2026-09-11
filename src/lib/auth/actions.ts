"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { SITE } from "@/lib/site";
import {
  AUTH_ON,
  MEMBER_HINT,
  HINT_COOKIE_OPTIONS,
  safeNext,
  checkEmail,
  checkPassword,
} from "./config";
import {
  createSupabase,
  createSupabaseAdmin,
  supabaseConfigured,
  type Supabase,
} from "@/lib/supabase/server";
import { isSavedItem, type SavedItem } from "@/lib/saved";

/**
 * 계정 서버 액션 (2026-09-11). 브라우저는 Supabase에 직접 붙지 않고
 * 전부 여기를 거친다(lib/supabase/server.ts 머리말).
 *
 * 문구 원칙 — **무엇이 잘못됐고 어떻게 하면 되는지**를 한 문장에.
 * Supabase가 돌려주는 영어 오류문은 화면에 그대로 내지 않는다.
 */

export type AuthState =
  | { ok?: boolean; message?: string; needConfirm?: boolean; email?: string }
  | undefined;

const OFF: AuthState = { message: "지금은 계정 기능을 쓸 수 없습니다." };
const ready = () => AUTH_ON && supabaseConfigured();
const str = (f: FormData, k: string) => String(f.get(k) ?? "");
const GENERIC = "처리 중 문제가 생겼습니다. 잠시 뒤 다시 시도해 주세요.";
const TOO_OFTEN = "요청이 너무 잦습니다. 몇 분 뒤 다시 시도해 주세요.";

/**
 * 인증 메일의 링크가 돌아올 주소. 우리 도메인과 개발 서버만 받는다 —
 * 요청 머리의 Origin을 그대로 쓰면 남의 주소로 링크가 나갈 수 있다.
 * (Supabase 대시보드의 Redirect URLs 허용 목록이 한 번 더 막는다.)
 */
async function siteOrigin(): Promise<string> {
  const o = (await headers()).get("origin");
  if (o === SITE.url || (o && /^http:\/\/localhost:\d+$/.test(o))) return o;
  return SITE.url;
}

async function setHint(on: boolean) {
  const c = await cookies();
  if (on) c.set(MEMBER_HINT, "1", HINT_COOKIE_OPTIONS);
  else c.delete(MEMBER_HINT);
}

/* ── 가입 ─────────────────────────────────────────────────────── */

/**
 * **같은 이메일로는 두 번 가입할 수 없다(사용자 요구, 09-11).**
 *
 * Supabase는 이메일 인증을 켜 두면 이미 있는 주소로 가입해도 오류를 안
 * 내고, 가짜 계정을 돌려준다 — 남의 가입 여부를 캐내지 못하게 하려는
 * 것이다. 그 가짜 계정은 연결된 신원(identities)이 **0개**라 그걸로
 * 가려낸다. 인증을 끈 설정이면 `user_already_exists` 오류가 온다.
 * 둘 다 같은 문장으로 알린다.
 *
 * 아직 인증을 안 한 주소로 다시 가입하면 새 계정이 아니라 **같은 계정에
 * 인증 메일을 다시 보낸다**(Supabase 동작). 그건 중복이 아니라 정상이다.
 */
const DUP = (email: string): AuthState => ({
  email,
  message:
    "이미 가입된 이메일입니다. 로그인하시거나, 비밀번호가 기억나지 않으면 비밀번호 찾기를 이용해 주세요.",
});

export async function signUp(_: AuthState, form: FormData): Promise<AuthState> {
  if (!ready()) return OFF;
  const email = str(form, "email").trim().toLowerCase();
  const password = str(form, "password");

  const bad = checkEmail(email) ?? checkPassword(password);
  if (bad) return { message: bad, email };
  if (password !== str(form, "password2")) {
    return { message: "비밀번호 두 칸이 서로 다릅니다.", email };
  }
  if (form.get("agree") !== "on" || form.get("age14") !== "on") {
    return { message: "필수 항목 두 가지에 체크해 주세요.", email };
  }

  const sb = await createSupabase();
  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${await siteOrigin()}/auth/confirm` },
  });

  if (error) {
    if (error.code === "user_already_exists" || error.code === "email_exists") {
      return DUP(email);
    }
    if (error.code === "over_email_send_rate_limit" || error.status === 429) {
      return { message: TOO_OFTEN, email };
    }
    if (error.code === "weak_password") {
      return { message: "비밀번호가 너무 쉽습니다. 더 길고 섞인 것으로 바꿔 주세요.", email };
    }
    return { message: GENERIC, email };
  }
  if (data.user && (data.user.identities?.length ?? 0) === 0) return DUP(email);

  return { ok: true, email };
}

/** 인증 메일 다시 보내기. 가입 완료 화면과 로그인 화면(미인증)이 쓴다. */
export async function resendConfirm(_: AuthState, form: FormData): Promise<AuthState> {
  if (!ready()) return OFF;
  const email = str(form, "email").trim().toLowerCase();
  const bad = checkEmail(email);
  if (bad) return { message: bad, email };

  const sb = await createSupabase();
  const { error } = await sb.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: `${await siteOrigin()}/auth/confirm` },
  });
  if (error?.status === 429) return { message: TOO_OFTEN, email, needConfirm: true };
  /* 없는 주소여도 같은 문장을 낸다 — 가입 여부를 캐묻는 데 쓰이지 않게. */
  return {
    ok: true,
    email,
    needConfirm: true,
    message: "인증 메일을 다시 보냈습니다. 받은편지함과 스팸함을 확인해 주세요.",
  };
}

/* ── 로그인·로그아웃 ───────────────────────────────────────────── */

export async function signIn(_: AuthState, form: FormData): Promise<AuthState> {
  if (!ready()) return OFF;
  const email = str(form, "email").trim().toLowerCase();
  const password = str(form, "password");
  const bad = checkEmail(email);
  if (bad) return { message: bad, email };
  if (!password) return { message: "비밀번호를 입력해 주세요.", email };

  const sb = await createSupabase();
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) {
    if (error.code === "email_not_confirmed") {
      return {
        email,
        needConfirm: true,
        message: "메일 인증이 아직 안 됐습니다. 가입할 때 받은 메일의 링크를 눌러 주세요.",
      };
    }
    if (error.code === "invalid_credentials") {
      return { email, message: "이메일 또는 비밀번호가 맞지 않습니다." };
    }
    if (error.status === 429) return { email, message: TOO_OFTEN };
    return { email, message: GENERIC };
  }

  await setHint(true);
  redirect(safeNext(str(form, "next"), "/account"));
}

export async function signOut(): Promise<void> {
  if (ready()) {
    const sb = await createSupabase();
    /* **이 기기만** 로그아웃한다. 기본값은 모든 기기(global)라, 휴대폰에서
       누르면 PC도 풀리는데 PC 쪽 브라우저 목록은 안 지워진 채 남아 다음
       사람 계정에 합쳐질 수 있었다(09-11 코드 리뷰). */
    await sb.auth.signOut({ scope: "local" });
  }
  await setHint(false);
  redirect("/");
}

/* ── 비밀번호 찾기·바꾸기 ─────────────────────────────────────── */

export async function requestReset(_: AuthState, form: FormData): Promise<AuthState> {
  if (!ready()) return OFF;
  const email = str(form, "email").trim().toLowerCase();
  const bad = checkEmail(email);
  if (bad) return { message: bad, email };

  const sb = await createSupabase();
  const { error } = await sb.auth.resetPasswordForEmail(email, {
    redirectTo: `${await siteOrigin()}/auth/confirm?next=/reset`,
  });
  if (error?.status === 429) return { message: TOO_OFTEN, email };
  /* 가입된 주소인지 아닌지는 말하지 않는다. */
  return {
    ok: true,
    email,
    message:
      "가입된 이메일이면 비밀번호 재설정 메일을 보냈습니다. 받은편지함과 스팸함을 확인해 주세요.",
  };
}

/** 재설정 메일의 링크로 들어왔거나 로그인한 상태에서만 바꿀 수 있다. */
export async function updatePassword(_: AuthState, form: FormData): Promise<AuthState> {
  if (!ready()) return OFF;
  const password = str(form, "password");
  const bad = checkPassword(password);
  if (bad) return { message: bad };
  if (password !== str(form, "password2")) {
    return { message: "비밀번호 두 칸이 서로 다릅니다." };
  }

  const sb = await createSupabase();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) {
    return {
      message:
        "링크가 만료됐거나 로그인이 풀렸습니다. 비밀번호 찾기를 다시 해 주세요.",
    };
  }
  const { error } = await sb.auth.updateUser({ password });
  if (!error) {
    /* 비밀번호를 바꾼 사람은 대개 "다른 기기에 남은 로그인"을 끊고 싶어서
       바꾼다(휴대폰 분실 등). 지금 기기는 남기고 나머지만 끊는다(09-11 보안
       점검). 실패해도 비밀번호는 이미 바뀌었으니 조용히 넘어간다. */
    await sb.auth.signOut({ scope: "others" }).catch(() => {});
  }
  if (error) {
    if (error.code === "same_password") {
      return { message: "지금 쓰는 비밀번호와 같습니다. 다른 것으로 정해 주세요." };
    }
    /* 대시보드에서 「Secure password change」를 켜 두면 로그인한 지 오래된
       세션은 재인증을 요구한다. 그때는 메일 링크로 바꾸게 안내한다. */
    if (error.code === "reauthentication_needed") {
      return { message: "보안을 위해 로그아웃한 뒤 비밀번호 찾기 메일로 바꿔 주세요." };
    }
    if (error.code === "weak_password") {
      return { message: "비밀번호가 너무 쉽습니다. 더 길고 섞인 것으로 바꿔 주세요." };
    }
    return { message: GENERIC };
  }
  await setHint(true);
  redirect("/account?pw=1");
}

/* ── 탈퇴 ─────────────────────────────────────────────────────── */

/**
 * 계정을 **바로** 지운다. 저장한 관심 지원은 DB에서 계정과 함께 지워진다
 * (on delete cascade — supabase/migrations 참고). 개인정보처리방침에
 * "탈퇴 시 지체 없이 파기"라고 쓰는 근거가 이것이다.
 */
export async function deleteAccount(_: AuthState, form: FormData): Promise<AuthState> {
  if (!ready()) return OFF;
  if (str(form, "confirm").trim() !== "탈퇴") {
    return { message: "확인란에 「탈퇴」 두 글자를 그대로 적어 주세요." };
  }
  const sb = await createSupabase();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) redirect("/login?next=/account");

  const admin = createSupabaseAdmin();
  if (!admin) {
    return { message: "지금은 탈퇴를 처리할 수 없습니다. 문의 메일로 알려 주시면 바로 지워 드립니다." };
  }
  const { error } = await admin.auth.admin.deleteUser(user.id);
  if (error) return { message: GENERIC };

  await sb.auth.signOut();
  await setHint(false);
  redirect("/");
}

/* ── 관심 지원 동기화 ─────────────────────────────────────────── */

const TABLE = "saved_services";
const MAX = 200;

function clean(list: unknown): SavedItem[] {
  if (!Array.isArray(list)) return [];
  const seen = new Set<string>();
  const out: SavedItem[] = [];
  for (const x of list) {
    if (!isSavedItem(x) || seen.has(x.id)) continue;
    seen.add(x.id);
    out.push({ id: x.id, name: x.name, place: x.place });
    if (out.length >= MAX) break;
  }
  return out;
}

function cleanIds(list: unknown): string[] {
  if (!Array.isArray(list)) return [];
  const ids = list.filter((x): x is string => typeof x === "string" && /^WLF\d+$/.test(x));
  return [...new Set(ids)].slice(0, MAX);
}

/** 읽기 실패는 **빈 목록이 아니라 null**이다. 둘을 뭉개면 장애 한 번에
    브라우저 목록이 빈 목록으로 덮여 지워진다(09-11 코드 리뷰). */
async function readAll(sb: Supabase, userId: string): Promise<SavedItem[] | null> {
  const { data, error } = await sb
    .from(TABLE)
    .select("service_id, name, place")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(MAX);
  if (error) return null;
  return clean(
    (data ?? []).map((r) => ({ id: r.service_id, name: r.name, place: r.place })),
  );
}

/**
 * 계정에 넣는다. 한 계정 200건까지 — 넘치는 것은 넣지 않는다.
 *
 * 저장 시각을 **한 줄씩 1초씩 앞당겨** 적는다. 한 번에 넣은 줄이 모두 같은
 * 시각이면 읽을 때 순서가 섞여, 가입 전에 고른 순서가 첫 로그인 때
 * 흐트러졌다(09-11 코드 리뷰). 목록 앞의 것(최근에 고른 것)이 가장 늦다.
 */
async function insertCapped(sb: Supabase, userId: string, items: SavedItem[]) {
  if (!items.length) return true;
  const { count, error } = await sb
    .from(TABLE)
    .select("service_id", { count: "exact", head: true })
    .eq("user_id", userId);
  if (error) return false;
  const room = Math.max(0, MAX - (count ?? 0));
  if (room === 0) return true;
  const now = Date.now();
  const rows = items.slice(0, room).map((x, i) => ({
    user_id: userId,
    service_id: x.id,
    name: x.name,
    place: x.place,
    created_at: new Date(now - i * 1000).toISOString(),
  }));
  const { error: e } = await sb
    .from(TABLE)
    .upsert(rows, { onConflict: "user_id,service_id", ignoreDuplicates: true });
  return !e;
}

/**
 * 로그인했는가. 셋으로 가른다 — 로그인됨 / **로그인이 풀림** / **확인 실패**.
 * 네트워크가 잠깐 끊긴 것을 "로그아웃됨"으로 읽으면 브라우저 목록을
 * 지워 버리므로, 세션이 없다고 **분명히** 말할 때만 "풀림"으로 본다.
 */
async function whoAmI(sb: Supabase): Promise<{ id: string } | "out" | "error"> {
  const { data, error } = await sb.auth.getUser();
  if (data.user) return data.user;
  if (
    !error ||
    error.name === "AuthSessionMissingError" ||
    error.status === 401 ||
    error.status === 403
  ) {
    return "out";
  }
  return "error";
}

export type SyncResult =
  | { userId: string; items: SavedItem[] }
  | { signedOut: true }
  | null;

/**
 * 계정 목록을 받는다. 이 브라우저가 이 계정과 **처음** 만났으면
 * (`syncedFor`가 다르면) 먼저 브라우저 목록을 계정에 합친다.
 *   · 성공 → 계정 목록
 *   · 로그인이 풀림 → `{ signedOut }` (브라우저가 앞사람 목록을 지운다)
 *   · 실패 → null (브라우저는 **아무것도 바꾸지 않고** 나중에 다시 한다)
 */
export async function syncSaved(local: unknown, syncedFor: unknown): Promise<SyncResult> {
  if (!ready()) return null;
  const sb = await createSupabase();
  const me = await whoAmI(sb);
  if (me === "error") return null;
  if (me === "out") {
    await setHint(false);
    return { signedOut: true };
  }
  if (syncedFor !== me.id && !(await insertCapped(sb, me.id, clean(local)))) {
    return null;
  }
  const items = await readAll(sb, me.id);
  return items ? { userId: me.id, items } : null;
}

/**
 * ☆로 **넣은 것과 뺀 것만** 보낸다.
 *
 * 처음엔 브라우저 목록으로 계정 목록을 통째로 덮어썼다. 그러면 탭을 열어
 * 둔 채 다른 기기에서 뺀 항목이, 이 탭에서 ☆를 하나 누르는 순간 옛 목록과
 * 함께 되살아났다(09-11 코드 리뷰). 차이만 보내면 남의 변경을 건드리지
 * 않는다. 지우고 넣는 사이에 실패해 목록이 줄어드는 일도 없어졌다.
 */
export async function pushSavedOps(adds: unknown, removes: unknown): Promise<boolean> {
  if (!ready()) return false;
  const sb = await createSupabase();
  const me = await whoAmI(sb);
  if (typeof me === "string") return false;

  const rm = cleanIds(removes);
  if (rm.length) {
    const { error } = await sb.from(TABLE).delete().eq("user_id", me.id).in("service_id", rm);
    if (error) return false;
  }
  return insertCapped(sb, me.id, clean(adds));
}
