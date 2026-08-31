# 복지 서비스 API 조사 기록

최종 확인: 2026-08-31

---

## 1. 검증된 엔드포인트

인증키 없이 호출해 **응답 형태로 경로 유효성을 확인**했다. 두 주소 모두
`SERVICE_KEY_IS_NOT_REGISTERED_ERROR`(`returnReasonCode` 30)를 돌려줬다.
경로가 틀렸다면 다른 오류가 났을 것이므로, **주소는 맞고 키만 없는 상태**다.

| 구분 | 엔드포인트 |
|---|---|
| 지자체 복지서비스 목록 | `http://apis.data.go.kr/B554287/LocalGovernmentWelfareInformations/LcgvWelfarelist` |
| 중앙부처 복지서비스 목록 | `http://apis.data.go.kr/B554287/NationalWelfareInformationsV001/NationalWelfarelistV001` |

기관 코드 `B554287` = 한국사회보장정보원.

확인한 응답(키 미등록 시):
```xml
<OpenAPI_ServiceResponse>
<cmmMsgHeader>
  <errMsg>SERVICE_KEY_IS_NOT_REGISTERED_ERROR</errMsg>
  <returnAuthMsg>등록되지 않은 서비스키</returnAuthMsg>
  <returnReasonCode>30</returnReasonCode>
</cmmMsgHeader>
</OpenAPI_ServiceResponse>
```

각 목록 API에는 상세조회 오퍼레이션이 짝으로 있다(포털 설명 기준). 상세 경로는
키 발급 후 실제 호출로 확인한다. **추측해서 적지 않는다.**

---

## 2. 확인된 이용 조건

공공데이터포털 데이터셋 페이지 기준.

| 항목 | 값 |
|---|---|
| 활용신청 | 개발·운영 모두 **자동승인** |
| 개발계정 트래픽 | **1,000건/일** |
| 운영계정 | 활용사례 등록 시 증가 신청 가능 |
| 이용허락범위 | **제한 없음** (상업적 이용 가능 → 애드센스 게재 OK) |
| 응답 포맷 | XML |

데이터셋 링크
- 지자체복지서비스: https://www.data.go.kr/data/15108347/openapi.do
- 중앙부처복지서비스: https://www.data.go.kr/data/15090532/openapi.do
- 복지서비스정보(파일): https://www.data.go.kr/data/15083323/fileData.do — **367행**, 연 1회 갱신

---

## 3. 확인 못 한 것 (키 발급 후 첫 작업)

이 항목들이 확정되기 전에는 **URL 총량도, API 응답 타입도 확정하지 않는다.**
공개 문서에 필드 목록이 없고, 포털은 "SWAGGER 문서와 코드표 첨부파일 참고"로만
안내한다. odcloud swagger(`infuser.odcloud.kr/oas/docs?namespace=...`)는
`APPLICATION_001`을 반환해 이 데이터셋에는 해당하지 않는다.

- [ ] **지자체복지서비스 실제 건수** — 중앙부처는 367건 확인, 지자체는 미확인
- [ ] **응답 필드명 전체** — `servId` / `servNm` 류로 추정되나 **확인 전까지 안 쓴다**
- [ ] 지역 값 표기 방식 — "강원특별자치도"인지 "강원도"인지 "강원"인지
      (`src/lib/regions.ts`의 `matchSido`가 세 형태를 모두 시도하도록 만들어 뒀다)
- [ ] 대상·분류 코드 체계 — `src/lib/targets.ts`의 `keywords`는 코드가 없을 때
      쓰는 보조 수단일 뿐, 1차 근거가 아니다
- [ ] 신청기간 필드 유무 — 마감 D-day와 알림 기능의 전제
- [ ] 갱신주기 — 중앙부처 파일은 연 1회, 지자체 API는 미표기

### 키 발급 후 실행할 것

1. `numOfRows=1`로 한 건만 받아 **응답 XML 원문을 그대로 저장**한다
   (`data-research/sample-*.xml`).
2. 그 원문에서 필드명을 옮겨 `src/lib/fetchWelfare.ts`의 변환 계층을 만든다.
3. `totalCount`로 전체 건수를 확인하고 URL 총량을 확정한다.
4. 시·군·구 목록을 응답값에서 만들어 낸다(손으로 적지 않는다 — `regions.ts` 주석 참조).

---

## 4. 신청 방법

공공데이터포털 회원가입 → 위 데이터셋 페이지 → **활용신청** → 자동승인 →
마이페이지에서 인증키 확인. 키는 `.env.local`에 두고 **커밋하지 않는다**
(`.gitignore`에 `.env*` 포함 확인 완료).

```
# .env.local (커밋 금지)
DATA_GO_KR_SERVICE_KEY=...
```
