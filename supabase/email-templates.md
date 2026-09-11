# Supabase 인증 메일 템플릿 (복지클릭)

Supabase → Authentication → Emails → Templates에 붙인다.
**SMTP(Resend)를 연결해야 편집이 열린다**(09-11 확인 — 그 전에는 잠겨 있다).

링크는 **token_hash 모양**이다 — 가입한 브라우저가 아니어도(휴대폰 가입 → PC 메일) 통한다.
`src/app/auth/confirm/route.ts`가 받는다.

## 1. Confirm sign up (가입 인증)

Subject:
[복지클릭] 메일 인증을 마쳐 주세요

Body:
<div style="font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#1a1a18">
  <p style="font-size:18px;font-weight:700;margin:0 0 12px">복지<span style="color:#0b57d0">클릭</span></p>
  <p style="margin:0 0 16px;line-height:1.6">복지클릭 가입을 신청해 주셔서 감사합니다.<br>아래 단추를 누르면 메일 인증이 끝나고 가입이 완료됩니다.</p>
  <p style="margin:0 0 20px"><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email" style="display:inline-block;background:#0b57d0;color:#fff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:10px">메일 인증하고 가입 마치기</a></p>
  <p style="margin:0;font-size:13px;color:#5f5e5a;line-height:1.6">직접 가입하지 않으셨다면 이 메일을 무시하셔도 됩니다. 인증하지 않으면 계정은 만들어지지 않습니다.</p>
</div>

## 2. Reset password (비밀번호 재설정)

Subject:
[복지클릭] 비밀번호 재설정 링크

Body:
<div style="font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#1a1a18">
  <p style="font-size:18px;font-weight:700;margin:0 0 12px">복지<span style="color:#0b57d0">클릭</span></p>
  <p style="margin:0 0 16px;line-height:1.6">비밀번호를 새로 정하려면 아래 단추를 눌러 주세요.</p>
  <p style="margin:0 0 20px"><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/reset" style="display:inline-block;background:#0b57d0;color:#fff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:10px">새 비밀번호 정하기</a></p>
  <p style="margin:0;font-size:13px;color:#5f5e5a;line-height:1.6">요청하지 않으셨다면 이 메일을 무시하셔도 됩니다. 비밀번호는 바뀌지 않습니다.</p>
</div>
