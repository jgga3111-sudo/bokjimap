import type { WelfareService } from "@/types/welfare";

/**
 * 복지 서비스 데이터 — **자동 생성 파일. 직접 고치지 말 것.**
 *
 *   node scripts/build-data.mjs
 *
 * 수록 기준: 복지로 누적 조회수(inqNum) 상위 600건.
 * 전체 5,219건 중 상위 500건이 전체 조회수의 86.5%를 차지한다 — 사람들이
 * 실제로 찾는 것부터 채운다(docs/02).
 *
 * 생성 시각: 2026-08-31 · 상세 본문 확보 0/600건
 */
export const services: readonly WelfareService[] = [
 {
  "id": "WLF00000060",
  "name": "청년내일저축계좌",
  "provider": "central",
  "views": 12856598,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "youth"
  ],
  "themes": [
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "근로빈곤층 청년의 생계수급자 등으로의 하락을 사전에 예방하고, 일하는 중간계층 청년이 사회에 안착할 수 있도록 자산형성을 지원합니다. (2026년 모집기간: '26.5.4.(월) ~ '26.5.20.(수))",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000060&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004661",
  "name": "청년월세 지원사업",
  "provider": "central",
  "views": 12555356,
  "sidoName": null,
  "sigunguName": null,
  "department": "국토교통부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "youth"
  ],
  "themes": [
   "주거"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "고금리·고물가 등으로 경제적 어려움을 겪는 청년층의 주거비 부담 경감을 위해 월 최대20만원씩 최장 24개월간 월세를 지원합니다(생애1회).\n  ※ '26년 신규 신청기간: 3.30(월) 09:00 ~ 5.29(금) 16:00까지",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004661&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003249",
  "name": "장애인연금",
  "provider": "central",
  "views": 5539746,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "장애로 인하여 생활이 어려운 중증장애인에게 매월 일정금액의 연금을 지급하여 생활안정 지원과 복지 증진 및 사회통합을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003249&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003201",
  "name": "주거급여(맞춤형 급여)",
  "provider": "central",
  "views": 4555154,
  "sidoName": null,
  "sigunguName": null,
  "department": "국토교통부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "주거",
   "에너지"
  ],
  "payTypes": [
   "현금지급",
   "기타"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "생활이 어려운 사람에게 주거급여를 실시하여 취약계층의 주거비 부담을 완화하고 양질의 주거 수준 향상을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003201&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000072",
  "name": "에너지바우처",
  "provider": "central",
  "views": 4124442,
  "sidoName": null,
  "sigunguName": null,
  "department": "기후에너지환경부",
  "targets": [
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "infant",
   "senior"
  ],
  "themes": [
   "생활지원",
   "주거",
   "에너지"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "에너지취약계층에게 에너지바우처를 지급하여 전기·가스·지역난방·등유·LPG 등 필요 에너지의 이용 비용을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000072&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003250",
  "name": "영유아보육료 지원",
  "provider": "central",
  "views": 2665473,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [
   "보육"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "어린이집 이용 영유아에 대한 보육료 지원을 통해 부모의 자녀양육 부담경감 및 원활한 경제활동을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003250&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003257",
  "name": "이동통신요금감면",
  "provider": "central",
  "views": 2090266,
  "sidoName": null,
  "sigunguName": null,
  "department": "과학기술정보통신부",
  "targets": [
   "veteran",
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "감면"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "사회적 취약계층을 대상으로 가계통신비 부담완화를 위해 통신요금을 감면합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003257&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001164",
  "name": "기초연금",
  "provider": "central",
  "views": 2017051,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "생활지원",
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "노인에게 기초연금을 지급하여 안정적인 소득기반을 제공함으로써 노인의 생활안정을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001164&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001188",
  "name": "산모·신생아 건강관리 지원사업",
  "provider": "central",
  "views": 1900404,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "multi-child",
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "infant",
   "pregnancy"
  ],
  "themes": [
   "신체건강",
   "임신·출산"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "출산가정에 건강관리사를 파견하여 산후관리를 지원함으로써 산모와 신생아의 건강을 증진하고 출산가정의 경제적 부담 경감을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001188&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000969",
  "name": "유아학비 지원(3~5세 누리과정 지원)",
  "provider": "central",
  "views": 1879582,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "국공사립유치원에 재원하는 유아를 대상으로 보호자의 소득수준에 관계없이 전 계층에 유아학비를 지원하여 실질적 교육기회 보장을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000969&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004657",
  "name": "부모급여 지원",
  "provider": "central",
  "views": 1713343,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [
   "보육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "영아기 집중돌봄을 두텁게 지원하여 출산 및 양육으로 인한 경제적 부담을 줄여드립니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004657&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005567",
  "name": "정신건강 심리상담 바우처사업",
  "provider": "central",
  "views": 1624386,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "정신건강"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "우울·불안 등 정서적 어려움으로 인해 심리상담이 필요한 국민에게 전문적인 심리상담 서비스를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005567&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004656",
  "name": "첫만남이용권",
  "provider": "central",
  "views": 1552413,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "infant",
   "pregnancy"
  ],
  "themes": [
   "임신·출산",
   "보육"
  ],
  "payTypes": [
   "현금지급",
   "전자바우처(바우처)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "출생 아동에게 200만원 이상의 첫만남 이용권을 지급하여 생애초기 아동양육에 따른 경제적 부담을 경감합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004656&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001171",
  "name": "아동수당 지급",
  "provider": "central",
  "views": 1363273,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "infant",
   "child"
  ],
  "themes": [
   "생활지원",
   "보육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "아동 양육에 따른 경제적 부담을 경감하고 건강한 성장 환경을 조성함으로써 아동의 기본적 권리와 복지를 증진합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001171&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001103",
  "name": "초중고 교육비 지원사업(고교학비 지원)",
  "provider": "central",
  "views": 1329892,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "현물지급",
   "감면",
   "실물바우처"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "형편이 어려운 저소득층 가정의 자녀에게 교육의 기회를  보장하기 위해서 학비를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001103&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003180",
  "name": "긴급복지 생계지원",
  "provider": "central",
  "views": 1286721,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "생계곤란 등의 위기상황에 처하여 도움이 필요한 사람을 일시적으로 신속하게 지원함으로써 위기상황에서 벗어나도록 합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003180&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001089",
  "name": "교육급여(맞춤형 급여)",
  "provider": "central",
  "views": 1257830,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "전자바우처(바우처)",
   "기타"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "생계유지 능력이 없거나 생활이 어려운 자에게 필요한 교육급여를 지급하여 빈곤층 교육비 부담을 경감하고 실질적인 교육기회를 보장합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001089&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003253",
  "name": "가정양육수당 지원사업",
  "provider": "central",
  "views": 1221352,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [],
  "lifeStages": [
   "infant",
   "child"
  ],
  "themes": [
   "보육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "가정에서 아이를 돌보는 가정 양육 시, 부모의 자녀 양육에 대한 부담을 줄이고 보육 서비스에 대한 선택권을 보장합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003253&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000024",
  "name": "아이돌봄서비스",
  "provider": "central",
  "views": 1104154,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "multicultural",
   "multi-child",
   "disability",
   "single-parent"
  ],
  "lifeStages": [
   "infant",
   "child",
   "teen"
  ],
  "themes": [
   "보육",
   "보호·돌봄"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "맞벌이를 하거나 갑자기 아이를 돌볼 수 없는 일이 생겼을 때 육아 도우미가 방문하여 12세 이하 자녀의 양육을 도와줍니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000024&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000092",
  "name": "저소득층 기저귀·조제분유 지원",
  "provider": "central",
  "views": 1026518,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "multi-child",
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "infant",
   "pregnancy"
  ],
  "themes": [
   "임신·출산",
   "보육",
   "입양·위탁"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "영아(0~24개월)를 양육하고 있는 저소득층 가정에 기저귀와 조제분유를 지원하여 경제적 부담을 경감합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000092&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000078",
  "name": "청소년특별지원",
  "provider": "central",
  "views": 992035,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "child",
   "teen",
   "youth"
  ],
  "themes": [
   "신체건강",
   "생활지원",
   "일자리",
   "문화·여가",
   "교육",
   "법률"
  ],
  "payTypes": [
   "현금지급",
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "사회·경제적으로 어려움을 겪는 위기청소년에게 생활비·치료비·학업지원비·심리검사 상담비 등 지원으로 건강한 성장 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000078&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001068",
  "name": "한부모가족 아동양육비 지원",
  "provider": "central",
  "views": 952340,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "보육",
   "교육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "저소득 한부모가족 및 조손가족이 가족의 기능을 유지하고 안정된 생활을 할 수 있도록 아동 양육비를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001068&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001148",
  "name": "근로·자녀장려금",
  "provider": "central",
  "views": 858026,
  "sidoName": null,
  "sigunguName": null,
  "department": "재정경제부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "일자리",
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "소득이 적어 생활이 어려운 자영업자 또는 근로자 가구에 근로장려금과 자녀장려금을 지급하여 근로 의욕을 더하고 소득과 자녀양육비를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001148&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000100",
  "name": "자산형성지원사업(희망저축계좌Ⅰ, Ⅱ)",
  "provider": "central",
  "views": 818870,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "희망저축계좌를 통해 일하는 생계·의료·주거·교육급여 수급가구 및 차상위계층이 자활에 필요한 자산을 형성할 수 있도록 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000100&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001132",
  "name": "생계급여(맞춤형 급여)",
  "provider": "central",
  "views": 707460,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "teen",
   "youth",
   "middle-age"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "생활이 어려운 사람에게 필요한 급여를 실시하여 최저생활을 보장하고 자활을 돕습니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001132&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003258",
  "name": "아동발달지원계좌(디딤씨앗통장)지원",
  "provider": "central",
  "views": 651628,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "입양·위탁",
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "취약계층 아동의 사회진출 시 학자금･취업･창업･주거마련 등에 소요되는 초기비용 마련을 위한 자산형성을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003258&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003227",
  "name": "초.중.고 학생 교육정보화 지원",
  "provider": "central",
  "views": 643768,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "초중고 학생에게 PC, 인터넷 통신비를 지원하여 정보 소외 계층의 교육 격차를 해소하고 균등한 교육 기회를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003227&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001175",
  "name": "자립준비청년 자립수당 지급",
  "provider": "central",
  "views": 600589,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "teen",
   "youth"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "자립준비청년(보호종료아동)에게 자립수당을 지급하여 보호종료 후 경제적 부담을 완화하고 복지향상을 통해 안정적 사회정착 및 성공적 자립을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001175&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000781",
  "name": "여성청소년 생리용품 지원",
  "provider": "central",
  "views": 587645,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "child",
   "teen",
   "youth"
  ],
  "themes": [
   "신체건강",
   "생활지원"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "취약계층 여성청소년 대상 생리용품 지원을 통해 여성 청소년의 건강한 성장을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000781&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00006196",
  "name": "자활성공지원금 지급·관리",
  "provider": "central",
  "views": 465308,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "일자리",
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "근로능력 있는 수급자가 자활 참여 후 취·창업 등 장기적 자립까지 연결되도록 취·창업 의지를 고취하고, 일정기간 이상 근속을 유도합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006196&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001155",
  "name": "노인일자리 및 사회활동 지원사업",
  "provider": "central",
  "views": 391996,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "일자리"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "활기차고 건강한 노후생활을 영위할 수 있도록 다양한 일자리를 제공하고 사회활동을 지원하여 노인 복지 향상에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001155&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004004",
  "name": "청년 월세 지원",
  "provider": "local",
  "views": 388893,
  "sidoName": "충청북도",
  "sigunguName": "옥천군",
  "department": "충청북도 옥천군 미래전략국 성장정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "분기",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "관내 거주 청년들에게 일정액의 월세를 지원하여 경제적 자립 기반 구축 및 생활 안정을 도모하기 위한 사업입니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004004&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00000061",
  "name": "의료급여 임신·출산 진료비 지원",
  "provider": "central",
  "views": 332187,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "infant",
   "pregnancy"
  ],
  "themes": [
   "신체건강",
   "임신·출산"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "임신 또는 출산한 의료급여 수급자와 2세미만 자녀에게 의료비를 지원하여 저소득층 국민보건 향상과 사회복지 증진에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000061&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003260",
  "name": "장애인활동지원",
  "provider": "central",
  "views": 331070,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "child",
   "teen",
   "youth",
   "middle-age"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "혼자서 일상생활과 사회생활을 하기 어려운 장애인에게 활동보조서비스를 제공하여 자립생활을 지원하고 사회참여를 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003260&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000055",
  "name": "통합문화이용권",
  "provider": "central",
  "views": 294386,
  "sidoName": null,
  "sigunguName": null,
  "department": "문화체육관광부",
  "targets": [
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "child",
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "문화·여가"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "기초생활수급자 및 차상위계층 대상 문화예술·국내 여행·체육 활동 지원을 통해 문화 향유 기회 확대로 문화격차 완화 및 소외계층의 삶의 질 향상을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000055&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004658",
  "name": "과학문화 바우처 지원",
  "provider": "central",
  "views": 290528,
  "sidoName": null,
  "sigunguName": null,
  "department": "과학기술정보통신부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "문화·여가",
   "교육"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "과학문화 소외지역 및 계층을 대상으로 과학문화 체험 기회 제공을 통한 격차 해소에 기여하고자 합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004658&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005411",
  "name": "일상돌봄 서비스 사업",
  "provider": "central",
  "views": 289137,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [
   "teen",
   "youth",
   "middle-age"
  ],
  "themes": [
   "정신건강",
   "생활지원",
   "보호·돌봄"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "일상생활에 돌봄이 필요한 중장년과 가족돌봄청년에게 일상생활의 어려움을 해소할 수 있도록 맞춤형 사회서비스를 통합 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005411&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003267",
  "name": "장제급여",
  "provider": "central",
  "views": 286086,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "수급자가 사망하였을 경우 사체의 검안, 운반, 화장 또는 매장 등의 기타 장례를 하는데 필요한 금품을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003267&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000074",
  "name": "양곡할인",
  "provider": "central",
  "views": 285013,
  "sidoName": null,
  "sigunguName": null,
  "department": "농림축산식품부",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "정부양곡을 기초수급가구 및 차상위계층에 할인된 가격으로 지원함으로써 저소득층의 생활안정을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000074&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001138",
  "name": "자활근로(기초, 차상위)",
  "provider": "central",
  "views": 284484,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "생활지원",
   "일자리"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "국민기초생활보장법에 따른 수급자 및 차상위 계층이 스스로 자립할 수 있도록 자활능력 배양, 기술습득 지원 및 근로기회를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001138&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003191",
  "name": "노인맞춤돌봄서비스",
  "provider": "central",
  "views": 273631,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "생활지원",
   "안전·위기",
   "보호·돌봄"
  ],
  "payTypes": [
   "현물지급",
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "일상생활 영위가 어려운 취약노인에게 적절한 돌봄서비스를 제공하여 안정적인 노후생활 보장, 노인의 기능·건강 유지 및 악화 예방을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003191&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003265",
  "name": "장애수당",
  "provider": "central",
  "views": 259070,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "장애인연금 비수급 경증장애인을 대상으로 장애로 인한 추가적 비용을 보전하여 저소득 장애인 가구의 생활 안정을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003265&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003245",
  "name": "국민취업지원제도",
  "provider": "central",
  "views": 258002,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "생활지원",
   "일자리"
  ],
  "payTypes": [
   "현금지급",
   "프로그램/서비스(서비스)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "저소득 구직자, 청년, 경력단절여성 등 취업 취약계층을 대상으로 취업지원서비스와 생계지원을 함께 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003245&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005442",
  "name": "긴급돌봄 지원사업",
  "provider": "central",
  "views": 243110,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "infant",
   "child",
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "안전·위기",
   "보호·돌봄"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "질병, 부상, 주 돌봄자의 갑작스러운 부재(사망, 입원 등), 재난피해 등 돌봄 공백을 신속히 보완해 국민의 돌봄불안을 해소합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005442&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005708",
  "name": "20세 이하 운전면허 학원비 지원",
  "provider": "local",
  "views": 242927,
  "sidoName": "강원특별자치도",
  "sigunguName": "홍천군",
  "department": "강원특별자치도 홍천군 경제진흥국 경제진흥과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "우편"
  ],
  "onlineApply": null,
  "summary": "지역에 거주하는 20세 이하 청년을 대상으로 운전면허 학원비 일부를 지원하여 가계 부담을 완화하고 사회 진출을 위한 능력 개발의 기회를 제공하며 관내 정착을 위한 사회적 분위기를 조성하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005708&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00005253",
  "name": "대전 청년 월세지원",
  "provider": "local",
  "views": 229497,
  "sidoName": "대전광역시",
  "sigunguName": null,
  "department": "대전광역시 복지국 청년정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "- 청년층의 주거비 부담 완화로 청년의 자립 기반 구축 및 지역 정착 도모\n- 월 20만원 지원(최대 12개월, 최대 240만원) *생애 1회",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005253&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-11"
 },
 {
  "id": "WLF00000076",
  "name": "스포츠강좌이용권",
  "provider": "central",
  "views": 227759,
  "sidoName": null,
  "sigunguName": null,
  "department": "문화체육관광부",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "infant",
   "child",
   "teen"
  ],
  "themes": [
   "문화·여가"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "저소득층 유청소년에게 지속적인 스포츠 활동 기회를 보장하여  체력향상과 건전한 여가활동을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000076&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003171",
  "name": "의료급여본인부담면제",
  "provider": "central",
  "views": 224290,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "multicultural",
   "veteran",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "의료급여 수급권자에 대한 의료비를 지원하여 저소득층 국민보건 향상과 사회복지 증진에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003171&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000102",
  "name": "의료급여(의료급여)",
  "provider": "central",
  "views": 220344,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "multicultural",
   "veteran",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "정신건강"
  ],
  "payTypes": [
   "현금지급",
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "의료급여 수급권자에 대한 의료비를 지원하여 저소득층의 국민보건 향상과 사회복지 증진에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000102&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001176",
  "name": "암검진사업",
  "provider": "central",
  "views": 219836,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "국가 암검진 사업을 통해 암을 조기 발견, 치료를 유도함으로써 암의 치료율을 높이고 암으로 인한 사망을 줄입니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001176&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001147",
  "name": "그 밖의 연장형 보육료 등 지원",
  "provider": "central",
  "views": 207321,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "multicultural",
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "infant",
   "child"
  ],
  "themes": [
   "보육",
   "보호·돌봄"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "그 밖의 연장형 어린이집(야간연장, 휴일, 24시 등)을 이용하는 영유아에 대하여 보육료를 지원함으로써  부모의 자녀양육 부담을 덜고 원활한 경제활동을 돕습니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001147&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001063",
  "name": "주거안정 월세대출",
  "provider": "central",
  "views": 199279,
  "sidoName": null,
  "sigunguName": null,
  "department": "국토교통부",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "주거",
   "서민금융"
  ],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "월세부담이 큰 사회초년생 등의 주택월세자금 융자를 통해 주거안정을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001063&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003179",
  "name": "긴급복지 의료지원",
  "provider": "central",
  "views": 185710,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "수술 또는 입원이 필요한 중한 질병 또는 부상으로 당해 의료비를 감당하기 곤란한 사람에게 의료비 및 약제비를 지원함으로써 위기상황에서 벗어날 수 있도록 합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003179&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004649",
  "name": "행복주택 공급",
  "provider": "central",
  "views": 179745,
  "sidoName": null,
  "sigunguName": null,
  "department": "국토교통부",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "주거"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "청년, (예비)신혼부부, 한부모가족, 대학생 등 젊은층의 주거 안정을 위해  대중교통이 편리하거나 직주근접이 가능한 부지에 주변 시세보다 저렴하게 공공임대주택을 공급합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004649&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003222",
  "name": "버팀목전세자금대출",
  "provider": "central",
  "views": 174918,
  "sidoName": null,
  "sigunguName": null,
  "department": "국토교통부",
  "targets": [
   "multicultural",
   "multi-child",
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "주거",
   "서민금융"
  ],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "무주택세대주의 주택전세자금 융자를 통해 주거안정을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003222&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003247",
  "name": "재난적의료비 지원 사업",
  "provider": "central",
  "views": 170347,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "신체건강",
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "질병‧부상 등으로 가구의 부담능력을 넘어서는 과도한 의료비로 인한 경제적 부담을 겪는 가구에 의료비를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003247&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003240",
  "name": "평생교육이용권 지원",
  "provider": "central",
  "views": 168404,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "사회적 취약계층(저소득층, 장애인)을 대상으로 바우처를 제공하여 실질적인 평생교육 기회를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003240&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005440",
  "name": "대중교통비 환급 지원(모두의카드)",
  "provider": "central",
  "views": 168033,
  "sidoName": null,
  "sigunguName": null,
  "department": "국토교통부",
  "targets": [
   "multicultural",
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "정기적 대중교통 이용을 지원하여 대중교통을 자주 이용하는 서민·청년층 등의 교통비 부담을 완화하고 대중교통 이용을 촉진합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005440&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001119",
  "name": "차상위본인부담경감대상자지원",
  "provider": "central",
  "views": 163723,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "차상위계층의 요양급여비 본인부담비용 경감 지원을 통해 의료보장 강화를 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001119&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005691",
  "name": "청년월세 지원사업",
  "provider": "local",
  "views": 156478,
  "sidoName": "경상북도",
  "sigunguName": "구미시",
  "department": "경상북도 구미시 미래교육돌봄국 인구청년과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "청년들의 주거비 부담 완화를 통해 안정적인 지역 정착과 주거환경 확보를 유도하여 안정적으로 사회에 진입할 수 있도록 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005691&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-06-30"
 },
 {
  "id": "WLF00003195",
  "name": "발달재활서비스",
  "provider": "central",
  "views": 147323,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "infant",
   "child",
   "teen"
  ],
  "themes": [
   "신체건강",
   "정신건강",
   "교육"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "성장기 정신적, 감각적 장애아동의 인지, 의사소통, 적응행동, 감각, 운동 등의 기능향상과 행동발달을 위한 재활서비스를 지원하고, 관련 정보를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003195&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000867",
  "name": "방과후학교 자유수강권",
  "provider": "central",
  "views": 147144,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "multicultural",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "교육",
   "보호·돌봄"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "방과후학교 수업을 통해 저소득층 자녀의 지속적이며 실직적인 교육기회를 확대하고 공교육 활성화 및 저소득층의 교육격차 해소를 돕습니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000867&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005687",
  "name": "학생교육비 '꿈드리미' 지원",
  "provider": "local",
  "views": 144146,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "광주광역시교육청",
  "department": "광주광역시교육청 행정국 조직복지과",
  "targets": [],
  "lifeStages": [
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "년",
  "applyMethods": [
   "모바일앱"
  ],
  "onlineApply": null,
  "summary": "(학생)학생의 원활한 교육 활동 지원을 통한 교육의 공공성, 공정성을 강화 \n (학부모) 교육경비 지원으로 학부모의 경제적 부담 완화 및 교육복지 만족도 제고     \n (지역사회) 꿈드리미 바우처카드의 지역 내 사용으로 지역경제 활성화 견인화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005687&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-04"
 },
 {
  "id": "WLF00001088",
  "name": "고위험 임산부 의료비 지원",
  "provider": "central",
  "views": 138041,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [
   "신체건강",
   "임신·출산"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "고위험 임신의 적정 치료와 관리에 필요한 진료비를 지원하여 경제적 부담을 줄이고, 건강한 출산을 보장합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001088&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000843",
  "name": "저소득층 여성청소년 생리용품 지원사업",
  "provider": "local",
  "views": 134152,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 평생교육국 청소년정책과",
  "targets": [
   "single-parent",
   "low-income"
  ],
  "lifeStages": [
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "년",
  "applyMethods": [
   "모바일앱",
   "인터넷",
   "모바일",
   "방문"
  ],
  "onlineApply": null,
  "summary": "취약계층 여성청소년에게 생리용품 구매 이용권(바우처) 지원을 통해 여성청소년의 건강한 성장 및 발달을 지원하고 건강권을 보장하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000843&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-04"
 },
 {
  "id": "WLF00000089",
  "name": "다함께 돌봄 사업",
  "provider": "central",
  "views": 130568,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "child"
  ],
  "themes": [
   "교육",
   "보호·돌봄"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "지역 중심의 맞춤형 돌봄 서비스를 제공하여 돌봄사각지대를 해소하고 맞벌이 가구 등의 육아부담을 경감합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000089&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004717",
  "name": "인천형 청년월세 지원사업",
  "provider": "local",
  "views": 130391,
  "sidoName": "인천광역시",
  "sigunguName": null,
  "department": "인천광역시 청년정책담당관",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "경제적으로 어려움을 겪고 있는 인천 청년(35~39세) 주거비 부담 완화\n * 국가사업(청년월세 한시 특별지원(19~34세))과 동일한 사업기준 적용, 대상연령만 확대",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004717&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-15"
 },
 {
  "id": "WLF00003279",
  "name": "언어발달지원사업",
  "provider": "central",
  "views": 128498,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "child"
  ],
  "themes": [
   "신체건강",
   "교육"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "장애인 부모의 자녀에게 필요한 언어발달지원서비스를 제공하여 아동의 건강한 성장을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003279&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003176",
  "name": "농식품바우처",
  "provider": "central",
  "views": 127664,
  "sidoName": null,
  "sigunguName": null,
  "department": "농림축산식품부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "infant",
   "child",
   "teen",
   "youth",
   "pregnancy"
  ],
  "themes": [
   "생활지원",
   "임신·출산"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "취약계층의 식품 접근성 강화 및 지속가능한 농식품 소비 체계 구축을 위해 국내산 농산물(과일류, 채소류, 흰우유, 신선알류, 육류, 잡곡류, 두부류, 임산물)를 구매할 수 있는 바우처를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003176&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002497",
  "name": "산후건강관리비용 지원",
  "provider": "local",
  "views": 127172,
  "sidoName": "서울특별시",
  "sigunguName": "강남구",
  "department": "서울특별시 강남구 보건소 건강관리과",
  "targets": [],
  "lifeStages": [
   "youth",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷",
   "우편"
  ],
  "onlineApply": null,
  "summary": "산모 및 신생아의 건강관리를 증진하고 출산 가정의 경제적 부담을 덜어주기 위하여 산후건강관리비용을 지원함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002497&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00002006",
  "name": "백내장수술비지원사업(보건소사업)",
  "provider": "local",
  "views": 120637,
  "sidoName": "제주특별자치도",
  "sigunguName": "서귀포시",
  "department": "제주특별자치도 서귀포시 서귀포보건소",
  "targets": [
   "low-income",
   "disability"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "만 65세 이상 노인의 백내장 수술비를 지원하여 의료비 부담 경감에 기여\n- 대상: 만65세 이상 노인중(기초연금수급자, 기초생활수급자, 등록장애인, 국가유공자(본인))\n- 지원금액: 1인당 연1회 1안구 120천원이내(본인부담금)",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002006&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-11"
 },
 {
  "id": "WLF00004292",
  "name": "기초생활보장사업 (명절위로금)",
  "provider": "local",
  "views": 119860,
  "sidoName": "경상남도",
  "sigunguName": "김해시",
  "department": "경상남도 김해시 복지국 생활보장과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "기초생활수급자(기초생계, 의료, 주거대상자) 설, 추석 명절 특별위로금 지원으로 훈훈한 명절 분위기 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004292&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00001169",
  "name": "의료급여 틀니·치과임플란트",
  "provider": "central",
  "views": 119406,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "틀니 및 치과임플란트에 대하여 의료급여를 실시하여 65세 이상 노인 수급권자의 경제적 부담을 완화하고 구강건강 향상을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001169&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003753",
  "name": "60세 이상 어르신 대상포진 예방접종",
  "provider": "local",
  "views": 118655,
  "sidoName": "충청북도",
  "sigunguName": "괴산군",
  "department": "충청북도 괴산군 보건소",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현물지급",
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "60세 이상 관내 1년 이상 거주한 어르신을 대상으로 대상포진 무료 예방접종을 실시하여 경제적 부담을 경감하고 질병 발생 위험을 감소시켜 건강수명을 연장하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003753&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-04"
 },
 {
  "id": "WLF00001093",
  "name": "독거노인·장애인 응급안전안심서비스",
  "provider": "central",
  "views": 117540,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "생활지원",
   "안전·위기"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "안전의 사각지대에 있는 노인과 장애인이 응급상황을 인지하고 응급상황에 대처할 수 있도록 안전대책을 마련하여 지역사회 예방적 돌봄을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001093&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000026",
  "name": "장애인자립자금대여",
  "provider": "central",
  "views": 116655,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "생활지원",
   "일자리",
   "서민금융"
  ],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "저소득 장애인의 소규모 창업 및 출퇴근용 자동차 구입 비용을 장기 저리로 대여하여 생업의 기반을 다지고 편리하게 이동할 수 있도록 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000026&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000056",
  "name": "의료급여(요양비)",
  "provider": "central",
  "views": 116447,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [
   "신체건강",
   "임신·출산"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "의료급여 수급권자에게 의료비를 지원하여 저소득층의  국민보건 향상과 사회복지 증진에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000056&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005036",
  "name": "개인채무조정",
  "provider": "central",
  "views": 108001,
  "sidoName": null,
  "sigunguName": null,
  "department": "금융위원회",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "서민금융"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "채무를 정상적으로 상환하기 어려운 분들을 대상으로 채무감면, 이자율 조정, 장기 분할상환 등의 채무조정을 통해 경제적으로 재기할 수 있도록 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005036&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005858",
  "name": "임신 사전건강관리 지원사업",
  "provider": "central",
  "views": 105730,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age",
   "pregnancy"
  ],
  "themes": [
   "임신·출산",
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "임신 및 출산에 장애가 될 수 있는 건강위험요인의 조기 발견 기회를 제공하고, 임신전 건강관리를 위한 의료.보건학적 지원을 통해 건강한 임신 출산 환경을 조성합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005858&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002907",
  "name": "아동급식 지원",
  "provider": "local",
  "views": 100873,
  "sidoName": "경상남도",
  "sigunguName": null,
  "department": "경상남도 복지여성국 보육정책과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "child"
  ],
  "themes": [],
  "payTypes": [
   "현금지급",
   "실물바우처",
   "전자바우처(바우처)"
  ],
  "cycle": "주",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "저소득 가정의 아동들이 건강하게 자랄 수 있도록 급식지원 등을 통해 결식예방 및 영양개선",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002907&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-12"
 },
 {
  "id": "WLF00004473",
  "name": "경기도 어린이·청소년 교통비 지원 사업",
  "provider": "local",
  "views": 98320,
  "sidoName": "경기도",
  "sigunguName": null,
  "department": "경기도 교통국 버스정책과",
  "targets": [],
  "lifeStages": [
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "분기",
  "applyMethods": [
   "인터넷",
   "모바일"
  ],
  "onlineApply": null,
  "summary": "경기버스 요금인상에 따라 교통비가 증가한 도내 만6~18세 어린이·청소년들이 사용한 대중교통 금액을 연 최대 24만원(분기별 6만원) 한도 내 교통비 환급",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004473&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00005631",
  "name": "아가와 엄마를 위한 무료 공익보험(우체국대한민국 엄마보험)",
  "provider": "central",
  "views": 96544,
  "sidoName": null,
  "sigunguName": null,
  "department": "과학기술정보통신부",
  "targets": [],
  "lifeStages": [
   "infant",
   "child",
   "pregnancy"
  ],
  "themes": [
   "임신·출산",
   "보육"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "자녀의 희귀질환과 엄마의 임신질환을 보장하는 공익보험으로 별도의 조건없이 국가(우체국)에서 보험료 전액을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005631&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001087",
  "name": "가사·간병 방문 지원사업",
  "provider": "central",
  "views": 95287,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "보호·돌봄"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "일상생활이 어려운 저소득층 가정에 간병·가사 서비스를 지원하여  취약계층의 생활 안정을 도모하고  가사·간병 방문 제공인력의 사회적 일자리를 창출합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001087&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003213",
  "name": "인플루엔자 국가예방접종 지원사업",
  "provider": "central",
  "views": 93031,
  "sidoName": null,
  "sigunguName": null,
  "department": "질병관리청",
  "targets": [],
  "lifeStages": [
   "infant",
   "child",
   "teen",
   "senior",
   "pregnancy"
  ],
  "themes": [
   "신체건강",
   "임신·출산"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "어르신, 임신부 및 어린이의 인플루엔자 접종률 향상과 질병부담 감소를 위해 인플루엔자 예방접종을 국가에서 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003213&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001104",
  "name": "한부모가족자녀 교육비 지원",
  "provider": "central",
  "views": 91224,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "한부모가족보호대상자에게 고교비(학비)를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001104&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005221",
  "name": "청년월세 지원사업",
  "provider": "local",
  "views": 90506,
  "sidoName": "충청북도",
  "sigunguName": "음성군",
  "department": "충청북도 음성군 2030전략실",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "분기",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "청년 주거부담 경감으로 사회적 자립 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005221&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00005444",
  "name": "취약계층 고효율가전 구매지원(취약계층 에너지복지사업)",
  "provider": "central",
  "views": 87816,
  "sidoName": null,
  "sigunguName": null,
  "department": "기후에너지환경부",
  "targets": [
   "multi-child",
   "veteran",
   "disability",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "에너지"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "사회적 배려계층을 대상으로 고효율 가전제품 구입비용을 일정 비율 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005444&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001162",
  "name": "긴급복지 연료비 및 전기요금",
  "provider": "central",
  "views": 84627,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급",
   "현물지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "긴급복지 주지원(생계지원, 주거지원)을 받는 가구 중 위기상황을 극복하기 위해 연료비나 전기요금 지원이 필요한 경우 부가적으로 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001162&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000917",
  "name": "긴급복지 주거지원",
  "provider": "central",
  "views": 84394,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "주거"
  ],
  "payTypes": [
   "현금지급",
   "현물지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "생계곤란 등의 위기상황에 처하여 도움이 필요한 경우 일시적으로 신속하게 지원함으로써 위기상황에서 벗어날 수 있도록 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000917&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005092",
  "name": "손자녀가족돌보미 지원사업",
  "provider": "local",
  "views": 84150,
  "sidoName": "전남광주통합특별시",
  "sigunguName": null,
  "department": "전남광주통합특별시 여성가족교육국 여성가족과",
  "targets": [],
  "lifeStages": [
   "child"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "팩스",
   "우편"
  ],
  "onlineApply": null,
  "summary": "맞벌이 또는 한부모 가정의 양육부담 경감 등",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005092&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-08-20"
 },
 {
  "id": "WLF00004639",
  "name": "전기요금 복지할인",
  "provider": "central",
  "views": 83215,
  "sidoName": null,
  "sigunguName": null,
  "department": "기후에너지환경부",
  "targets": [
   "veteran",
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "기초생활수급자, 차상위계층, 기초연금수급자, 장애인, 국가유공자의 전기요금 부담을 경감하고자 요금감면을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004639&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000025",
  "name": "장애인일자리지원",
  "provider": "central",
  "views": 82015,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "일자리"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "18세 이상 미취업 장애인에게 공공형 일자리를 제공하여 사회참여 확대와 소득보장을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000025&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003192",
  "name": "다문화가족 방문교육 서비스",
  "provider": "central",
  "views": 81839,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "multicultural"
  ],
  "lifeStages": [
   "infant",
   "child",
   "teen",
   "youth",
   "middle-age"
  ],
  "themes": [
   "생활지원",
   "교육"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "집합교육 참여가 어려운 다문화 가정에 방문하여 한국어 교육, 부모 교육, 자녀생활 교육을 제공하고 다문화 가족의 정착과 자녀양육을 돕습니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003192&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003262",
  "name": "장애아가족양육지원",
  "provider": "central",
  "views": 81319,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "infant",
   "child",
   "teen"
  ],
  "themes": [
   "생활지원",
   "보호·돌봄"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "장애아동 가족의 일상적인 돌봄 부담을 경감하고 보호자의 사회활동을 돕기 위하여 돌봄 및 일시적 휴식지원 서비스를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003262&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003927",
  "name": "청년 노동자 지원사업(청년 복지포인트)",
  "provider": "local",
  "views": 80917,
  "sidoName": "경기도",
  "sigunguName": null,
  "department": "경기도 사회적경제국 청년기회과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "분기",
  "applyMethods": [
   "인터넷",
   "모바일"
  ],
  "onlineApply": null,
  "summary": "청년 노동자에게 복리후생을 제공하여 청년노동자 처우개선 및 복지향상",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003927&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-22"
 },
 {
  "id": "WLF00006266",
  "name": "청년미래적금",
  "provider": "central",
  "views": 80450,
  "sidoName": null,
  "sigunguName": null,
  "department": "금융위원회",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [
   "생활지원",
   "서민금융"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "청년의 중장기 자산형성 지원을 위한 정책형 금융상품으로, 만기 3년 동안 매월 50만원 한도 내에서 자유롭게 납입 가능한 정부지원형 적금 상품입니다. 2026년 6월 예정",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006266&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005247",
  "name": "희망두배 청년통장",
  "provider": "local",
  "views": 77912,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 복지실 복지기획관 복지정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "학자금 대출, 주거비, 비정규직 취업 등으로 어려움을 겪고 있는 청년 대상 자산형성 지원을 통하여 서울시 근로청년의 자립의욕 고취 및 미래희망을 설계하도록 하는 사업",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005247&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-21"
 },
 {
  "id": "WLF00003226",
  "name": "모성보호육아지원(출산전후휴가(유산ㆍ사산휴가 포함) 급여, 육아휴직등 급여)",
  "provider": "central",
  "views": 76563,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [
   "생활지원",
   "임신·출산"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "출산전후 휴가급여, 육아휴직급여, 난임치료휴가급여 등의 지급을 통해 일과 가정의 양립을 지원하고 모성보호를 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003226&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000499",
  "name": "저소득한부모가족지원",
  "provider": "local",
  "views": 76183,
  "sidoName": "경상북도",
  "sigunguName": "안동시",
  "department": "경상북도 안동시 평생복지국 보육아동가족과",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [
   "child"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "저소득한부모가족 및 자녀 교육지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000499&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00004637",
  "name": "TV수신료 면제",
  "provider": "central",
  "views": 73935,
  "sidoName": null,
  "sigunguName": null,
  "department": "방송통신위원회",
  "targets": [
   "veteran",
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "서민금융"
  ],
  "payTypes": [
   "감면"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "기초생활수급자, 차상위계층, 장애인, 국가유공자 등의 TV수신료 요금을 감면 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004637&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000838",
  "name": "고용보험 미적용자 출산급여 지원",
  "provider": "central",
  "views": 73603,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [
   "생활지원",
   "임신·출산"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "소득활동을 하고 있으나 고용보험의 '출산전후휴가급여'를 지원받지 못하는 출산여성에게 출산급여를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000838&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001184",
  "name": "암환자의료비지원",
  "provider": "central",
  "views": 71885,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "infant",
   "child",
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "저소득층 암환자에게 의료비를 지원하여 경제적 부담을 완화하고, 의료이용 장벽을 낮춰 암 환자의 치료 접근성을 향상시키기 위해서 지원하고 있습니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001184&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004663",
  "name": "통합공공임대",
  "provider": "central",
  "views": 70280,
  "sidoName": null,
  "sigunguName": null,
  "department": "국토교통부",
  "targets": [
   "multicultural",
   "multi-child",
   "veteran",
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "youth",
   "senior"
  ],
  "themes": [
   "주거"
  ],
  "payTypes": [
   "현물대여"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "최저소득 계층, 저소득 서민, 젊은 층 및 장애인·국가유공자 등 사회 취약계층 등의 주거안정을 위해 공공임대주택을 공급합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004663&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001079",
  "name": "주거안정 월세대출 보증",
  "provider": "central",
  "views": 68669,
  "sidoName": null,
  "sigunguName": null,
  "department": "금융위원회",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "주거",
   "서민금융"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "자력은 부족하지만 장래 소득발생이 예상되고 자활의지가 있는 저소득 계층의 주거안정을 위해 월세대출을 보증합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001079&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001179",
  "name": "노인 무릎인공관절 수술 지원 사업",
  "provider": "central",
  "views": 68144,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "middle-age",
   "senior"
  ],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "무릎관절수술 지원을 통해 노인 건강을 보장하고 의료비 부담을 경감합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001179&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000087",
  "name": "지방세 비과세감면(주민세, 취득세, 자동차세, 재산세, 지역자원시설세 등)",
  "provider": "central",
  "views": 64667,
  "sidoName": null,
  "sigunguName": null,
  "department": "행정안전부",
  "targets": [
   "multi-child",
   "veteran",
   "disability",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "기초생활수급자, 국가유공자, 장애인 등이 부담하는 지방세를 감면&middot;면제하여 생활 안정과 시설 운영을 돕습니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000087&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003211",
  "name": "장애인보조기기 교부",
  "provider": "central",
  "views": 63982,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "생활지원"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "생활이 어려운 저소득 장애인에게 장애인보조기구를 교부함으로써 생활능력 향상 및 복지증진을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003211&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004006",
  "name": "청년희망적금",
  "provider": "local",
  "views": 62468,
  "sidoName": "대구광역시",
  "sigunguName": null,
  "department": "대구광역시 청년여성교육국 청년정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "모바일",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "사회진입 초기의 근로청년들에게 자산형성의 토대 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004006&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00003283",
  "name": "아동통합서비스지원(드림스타트사업)",
  "provider": "central",
  "views": 62411,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "multicultural",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "infant",
   "child"
  ],
  "themes": [
   "신체건강",
   "정신건강",
   "생활지원",
   "안전·위기"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "취약계층 아동에게 맞춤형 통합서비스를 제공하여 아동의 건강한 성장과 발달을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003283&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000946",
  "name": "산림복지서비스이용권",
  "provider": "central",
  "views": 61608,
  "sidoName": null,
  "sigunguName": null,
  "department": "산림청",
  "targets": [
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [
   "문화·여가"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "사회·경제적 여건으로 산림복지 혜택을 받지 못하는 소외계층에게 산림복지서비스 체험 기회를 제공하여 삶의 질을 높일 수 있도록 돕습니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000946&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001115",
  "name": "노인 개안수술비 지원",
  "provider": "central",
  "views": 61280,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "노인 개안수술비 지원을 통해 노인 및 가족의 의료비 부담을 경감합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001115&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003989",
  "name": "국민기초생활보장수급자 이사비용 지원사업",
  "provider": "local",
  "views": 61123,
  "sidoName": "강원특별자치도",
  "sigunguName": "삼척시",
  "department": "강원특별자치도 삼척시 안전건설국 건축과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "불안정한 주거 환경 개선 의지 고취 및 이사비용 부담 경감",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003989&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-06-30"
 },
 {
  "id": "WLF00005552",
  "name": "초등학교 입학축하금 지원",
  "provider": "local",
  "views": 60242,
  "sidoName": "부산광역시",
  "sigunguName": "연제구",
  "department": "부산광역시 연제구 복지교육국 가족정책과",
  "targets": [],
  "lifeStages": [
   "child"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "초등학교 입학생이 있는 모든 가정에 입학축하금을 지원하여 취학아동 가정의 경제적 부담을 완화하고 양육에 대한 사회적 공동책임을 강화하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005552&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-06"
 },
 {
  "id": "WLF00003903",
  "name": "경기도형 긴급복지 지원사업",
  "provider": "local",
  "views": 59879,
  "sidoName": "경기도",
  "sigunguName": null,
  "department": "경기도 복지국 복지사업과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급",
   "현물지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "○현행 법, 제도로는 지원받기 어려운 위기가정을 신속히 지원하여 위기사항 해소 및 완화 도움\n○생활은 어려우나 법과 제도 등 기준이 맞지 않아 지원을 받기 어려운 위기가구를 발굴지원하여 복지사각지대 해소",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003903&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-03-13"
 },
 {
  "id": "WLF00000047",
  "name": "고혈압·당뇨병 등록관리사업",
  "provider": "central",
  "views": 59643,
  "sidoName": null,
  "sigunguName": null,
  "department": "질병관리청",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "심뇌혈관질환 선행질환인 고혈압, 당뇨병 환자의 지속치료율 향상 및 자가관리 역량 지원을 통한 합병증 발생 또는 사망 발생 감소를 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000047&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004997",
  "name": "한국형 상병수당 시범사업",
  "provider": "central",
  "views": 59559,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age"
  ],
  "themes": [
   "신체건강",
   "생활지원",
   "보호·돌봄"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "근로자가 업무 외 질병·부상으로 경제활동이 어려운 경우 치료에 집중할 수 있도록 소득을 보전합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004997&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001109",
  "name": "청소년한부모 아동양육 및 자립지원",
  "provider": "central",
  "views": 59127,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [
   "teen"
  ],
  "themes": [
   "보육",
   "교육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "청소년한부모 가정의 자녀 양육환경을 개선하고 자립기반 마련을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001109&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003224",
  "name": "출산육아기 고용안정장려금",
  "provider": "central",
  "views": 58300,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [
   "생활지원",
   "임신·출산"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "출산전후휴가, 유산·사산 휴가, 육아휴직, 육아기 근로시간 단축 등을 부여(허용)한 사업주에게 장려금, 대체인력 인건비 등을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003224&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005448",
  "name": "다문화가족 자녀 교육활동비 지원",
  "provider": "central",
  "views": 57150,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "multicultural"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "학교 적응이나 학습에 어려움을 겪는 저소득 다문화 자녀에게 학력격차 해소를 위한 교육활동비를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005448&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005079",
  "name": "노인 보청기 및 성인용 보행기 지원 사업",
  "provider": "local",
  "views": 56511,
  "sidoName": "경기도",
  "sigunguName": "화성시",
  "department": "경기도 화성시 돌봄복지국 중장년노인과",
  "targets": [
   "low-income",
   "disability"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "난청 또는 보행이 어려운 노인들의 불편 해소와 편의 증진",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005079&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00003825",
  "name": "평택시 청년 월세 지원",
  "provider": "local",
  "views": 56382,
  "sidoName": "경기도",
  "sigunguName": "평택시",
  "department": "경기도 평택시 기획항만경제실 청년정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "정주하고 싶은 도시 평택을 만들고자 월세지원을 통해 청년의 주거비 부담 완화 및 사회진입 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003825&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-30"
 },
 {
  "id": "WLF00003237",
  "name": "미숙아 및 선천성이상아 의료비 지원",
  "provider": "central",
  "views": 56304,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "미숙아 및 선천성이상아 대상 의료비 지원을 통해 환아 가정의 경제적 부담을 완화하고, 미숙아 등 고위험 신생아의 건강한 성장 발달을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003237&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001061",
  "name": "지역사회서비스 투자사업",
  "provider": "central",
  "views": 56286,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [
   "신체건강",
   "정신건강",
   "생활지원",
   "주거",
   "일자리",
   "문화·여가",
   "안전·위기",
   "임신·출산",
   "보육",
   "교육",
   "입양·위탁",
   "보호·돌봄",
   "서민금융",
   "법률"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "지역의 특성과 수요에 부합하는 사회서비스를 제공하여 지역복지를 확충하고 서비스 제공 일자리를 창출할 수 있도록 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001061&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003278",
  "name": "여성장애인 출산비용지원",
  "provider": "central",
  "views": 55565,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [
   "임신·출산"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "임신과 출산에 대한 비용이 추가로 발생하는 여성장애인에게 출산비용을 지원하여 경제적 부담을 경감하고 모성권 보호에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003278&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000408",
  "name": "청소년증 발급",
  "provider": "local",
  "views": 55465,
  "sidoName": "경상남도",
  "sigunguName": "통영시",
  "department": "경상남도 통영시 문화복지국 여성가족과",
  "targets": [],
  "lifeStages": [
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "공적 신분증, 청소년우대 증표, 선불형 교통카드",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000408&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00001128",
  "name": "저소득층에너지효율개선",
  "provider": "central",
  "views": 55228,
  "sidoName": null,
  "sigunguName": null,
  "department": "기후에너지환경부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "주거",
   "에너지"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "한파, 폭염 등 기후변화에 더욱 취약한 에너지 소외계층을 대상으로 에너지 사용 환경을 개선하여 취약계층의 기후위기 적응력을 제고합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001128&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003198",
  "name": "장애아동수당",
  "provider": "central",
  "views": 54956,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "장애로 인하여 생활이 어려운 장애아동이 보다 편안한 생활을 할 수 있도록 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003198&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001903",
  "name": "백내장 수술비 지원",
  "provider": "local",
  "views": 54603,
  "sidoName": "제주특별자치도",
  "sigunguName": "제주시",
  "department": "제주특별자치도 제주시 제주보건소 건강증진과",
  "targets": [
   "low-income",
   "disability"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "평균수명 연장에 따른 노화에 의한 안질환 유병률 증가로 만 65세 이상 취약계층 노인의 백내장 수술비 지원을 통한 적기치료 유도 및 의료비 부담 경감",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001903&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-19"
 },
 {
  "id": "WLF00000062",
  "name": "기존주택등 매입임대주택 지원사업",
  "provider": "central",
  "views": 54589,
  "sidoName": null,
  "sigunguName": null,
  "department": "국토교통부",
  "targets": [
   "multi-child",
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "주거"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "도심 내 기초생활수급자 등 저소득층이 현 생활권에서 거주할 수 있도록 공공주택사업자가 다가구 등 기존주택 등을 매입하여 개·보수 또는 리모델링하여 저렴하게 공급하여 주거안정 을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000062&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001177",
  "name": "장기요양 본인부담금 감경",
  "provider": "central",
  "views": 54251,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "신체건강",
   "생활지원",
   "보호·돌봄"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "노인장기요양보험 장기요양급여 이용자 중 건강보험료순위 50%이하자 및 기타의료급여 수급권자 등에게 본인부담금을 감경하여 서비스 이용부담을 완화합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001177&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00006248",
  "name": "직장인 든든한 점심밥",
  "provider": "central",
  "views": 53539,
  "sidoName": null,
  "sigunguName": null,
  "department": "농림축산식품부",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "직장인 점심값 부담 완화 및 지역 외식 경제 활성화를 위해 중소기업 재직 근로자 대상 점심 외식비용의 일부를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006248&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001086",
  "name": "특별현금급여(가족요양비)",
  "provider": "central",
  "views": 53396,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "생활지원",
   "보호·돌봄"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "가족등으로부터 방문요양에 상당한 장기요양급여를 받은 때 수급자에게 특별현금급여를 지급합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001086&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001140",
  "name": "방과후보육료지원",
  "provider": "central",
  "views": 53244,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "child"
  ],
  "themes": [
   "보육",
   "교육"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "어린이집을 이용하는 12세 이하 취학아동에 대한 방과후 보육료를 지원하여 양육의 부담을 줄이고 원활한 경제활동을 돕습니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001140&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003271",
  "name": "내집마련 디딤돌 대출",
  "provider": "central",
  "views": 53057,
  "sidoName": null,
  "sigunguName": null,
  "department": "국토교통부",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "주거",
   "서민금융"
  ],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "무주택 세대주가 주택구입 자금을 빌릴 수 있도록 지원하여 주거 안정을 돕습니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003271&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003269",
  "name": "기존주택 전세임대주택 지원사업",
  "provider": "central",
  "views": 52888,
  "sidoName": null,
  "sigunguName": null,
  "department": "국토교통부",
  "targets": [
   "multi-child",
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [
   "주거"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "도심 내 저소득층이 현 생활권에서 안정적으로 거주할 수 있도록 임대료가 저렴한 임대주택을 지원하여 주거안정을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003269&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005004",
  "name": "치매검사비 지원",
  "provider": "central",
  "views": 52513,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "정신건강"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "치매조기검진을 통해 치매를 예방하고 진행을 완화하며, 이에 대한 검사비 부담을 경감합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005004&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003173",
  "name": "장애인스포츠강좌이용권 지원",
  "provider": "central",
  "views": 51359,
  "sidoName": null,
  "sigunguName": null,
  "department": "문화체육관광부",
  "targets": [
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "child",
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "문화·여가"
  ],
  "payTypes": [
   "전자바우처(바우처)",
   "실물바우처"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "장애인 대상 스포츠 참여 기회를 제공하여 삶의 질 향상, 사회적 소외감을 해소하여 사회통합에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003173&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005849",
  "name": "서울형 가사서비스 지원사업",
  "provider": "local",
  "views": 51036,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 여성가족실 가족담당관",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "수시",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "서울시 거주 중위소득 180%이하 임산부 맞벌이 다자녀 가정에게 가사서비스를 지원하여 일생활균형 지원 및 아이키우기 좋은환경 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": 180,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005849&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-06-03"
 },
 {
  "id": "WLF00001165",
  "name": "발달장애인 주간활동서비스",
  "provider": "central",
  "views": 50910,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "teen",
   "youth",
   "middle-age"
  ],
  "themes": [
   "보호·돌봄"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "발달장애인이 낮 시간 자신의 욕구를 반영한 지역사회 기반활동에 참여하게 함으로써 장애인의 자립생활을 지원하고 사회참여 증진을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001165&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002704",
  "name": "대상포진 예방접종 지원사업",
  "provider": "local",
  "views": 50552,
  "sidoName": "인천광역시",
  "sigunguName": "연수구",
  "department": "인천광역시 연수구 보건소 감염병관리과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현물지급",
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "65세 이상 어르신에게 대상포진 예방접종 비용을 지원함으로써 접종으로 인한 비용 부담을 경감시키고 질병 예방을 통한 삶의 질 향상 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002704&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-06-30"
 },
 {
  "id": "WLF00004810",
  "name": "울산광역시 청년가구 주거비 지원사업",
  "provider": "local",
  "views": 50380,
  "sidoName": "울산광역시",
  "sigunguName": null,
  "department": "울산광역시 건설주택국 건축정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "분기",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "청년층의 주거안정을 통한 지역정착 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004810&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00004986",
  "name": "여성청소년 위생용품 지원",
  "provider": "local",
  "views": 49846,
  "sidoName": "충청북도",
  "sigunguName": "영동군",
  "department": "충청북도 영동군 행정복지국 가족행복과",
  "targets": [],
  "lifeStages": [
   "teen",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "분기",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "보건위생에 필수적인 물품을 일반 여성청소년에게 지원하여 청소년의 건강한 생활 보장\n？ 지원대상 : 영동군에 주민등록을 둔  11세~18세 모든 여성청소년\n                (2008년 ~ 2015년사이에 출생자)\n？ 지원내용 : 월14,000원 위생용품(생리대) 구매 비용 지급",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004986&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-05"
 },
 {
  "id": "WLF00004864",
  "name": "청년 일자리 근속장려금 지원사업",
  "provider": "local",
  "views": 49681,
  "sidoName": "강원특별자치도",
  "sigunguName": "홍천군",
  "department": "강원특별자치도 홍천군 경제진흥국 경제진흥과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문",
   "인터넷",
   "우편"
  ],
  "onlineApply": null,
  "summary": "❍ 홍천군 거주 청년이 관내 중소기업에 정규직으로 취업 시 인센티브를 지원하여 장기근속을 장려함으로써 기업의 고용안정을 도모하고 청년인구 유출 방지 및 장기적 인구증가 효과 기대\n❍ 지원금을 홍천사랑카드로 지급하여 지역경제 활성화 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004864&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00002247",
  "name": "차상위계층 특별생계비",
  "provider": "local",
  "views": 49164,
  "sidoName": "경상북도",
  "sigunguName": "영주시",
  "department": "경상북도 영주시 문화복지국 복지정책과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "실질적으로 생계유지가 어려우나 수급자 범위를 벗어나 국가의 지원을 받지 못하는 차상위계층을 발굴,선정하여 최소한의 생계비를 지원함으로써 사회안정망을 보완하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002247&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-20"
 },
 {
  "id": "WLF00003248",
  "name": "재가급여",
  "provider": "central",
  "views": 49155,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "생활지원",
   "보호·돌봄"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "독립적인 일상 생활이 어려운 노인과, 노인부양가정에 필요한 각종 서비스를 제공하여 건강하고 안정된 생활을 돕고 부양에 대한 부담을 줄여줍니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003248&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004475",
  "name": "결혼축하금 지원사업",
  "provider": "local",
  "views": 49100,
  "sidoName": "전북특별자치도",
  "sigunguName": "김제시",
  "department": "전북특별자치도 김제시 기획감사실",
  "targets": [],
  "lifeStages": [
   "middle-age",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "인구절벽을 극복하고 결혼과 출산을 장려하는 사회 분위기를 조성하고 \n신혼 초 안정적인 결혼생활 정착 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004475&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00003177",
  "name": "복권기금 꿈사다리 장학사업",
  "provider": "central",
  "views": 48392,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "teen"
  ],
  "themes": [
   "생활지원",
   "교육"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "복권기금을 재원으로 저소득층 우수 중·고생을 발굴, 대학까지 지원하여 교육의 희망사다리 기능을 강화합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003177&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000036",
  "name": "주거취약계층 주거상향 지원사업",
  "provider": "central",
  "views": 48257,
  "sidoName": null,
  "sigunguName": null,
  "department": "국토교통부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "주거"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "쪽방·고시원 등 열악한 비주택거주자의 공공임대주택 이주수요를 발굴하고 LH와 협력하여 이주과정을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000036&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000833",
  "name": "기초생활수급자 명절 위로금 지원",
  "provider": "local",
  "views": 47609,
  "sidoName": "경기도",
  "sigunguName": "의왕시",
  "department": "경기도 의왕시 복지문화국 복지정책과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "우리민족의 고유 명절인 설,추석을 맞이하여 저소득층에게 위로금을 지원하여 훈훈한 명절분위기 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000833&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-13"
 },
 {
  "id": "WLF00003138",
  "name": "저소득 어르신 보청기 지원",
  "provider": "local",
  "views": 47529,
  "sidoName": "인천광역시",
  "sigunguName": "옹진군",
  "department": "인천광역시 옹진군 보건소 건강증진과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "난청으로 생활불편을 겪는 저소득 어르신에게 보청기를 지원하여 환자중심의 의료서비스 제공으로\n안정적인 사회생활 유지 및 건강한 노후생활 보장",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003138&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00000064",
  "name": "발달장애인 부모상담지원사업",
  "provider": "central",
  "views": 46511,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "infant",
   "child"
  ],
  "themes": [
   "정신건강"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "발달장애인 부모에게 발달장애인의 양육과 부양에 따른 심리적 부담 완화 및 가족기능 향상 도모를 위한 전문 심리상담을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000064&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003202",
  "name": "의료급여(본인부담 상한금)",
  "provider": "central",
  "views": 46350,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "multicultural",
   "veteran",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "정신건강"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "의료급여 수급권자에게 의료비를 지원하여 저소득층의 국민보건 향상과 사회복지 증진에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003202&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005097",
  "name": "서울형 아이돌봄비 지원사업",
  "provider": "local",
  "views": 44950,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 여성가족정책실 아이돌봄담당관",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "양육공백 가정에 실질적인 양육 조력자를 지원하여 부모 부담을 완화하고 아이키우기 좋은 환경 마련",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005097&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-03-12"
 },
 {
  "id": "WLF00002493",
  "name": "주거급여수급자 월세보증금 지원",
  "provider": "local",
  "views": 44910,
  "sidoName": "인천광역시",
  "sigunguName": "중구",
  "department": "인천광역시 중구 행정복지국 복지정책과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "목돈마련이 어려운 주거급여수급자의 월세보증금을 지원하여 주거 취약계층의 실질적 주거비 부담을 완화하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002493&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00001094",
  "name": "어린이집지원(교사근무환경개선비,교사겸직원장지원비)",
  "provider": "central",
  "views": 44496,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "일자리"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "어린이집 보육교사와 교사를 겸직하는 원장의 근로여건개선을 위해 근무환경 개선비를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001094&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003790",
  "name": "저소득 한부모가족 난방비 지원 사업",
  "provider": "local",
  "views": 43953,
  "sidoName": "경기도",
  "sigunguName": "화성시",
  "department": "경기도 화성시 성평등가족국 저출생대응과",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "저소득 한부모가족이 건강하고 문화적인 생활을 영위할 수 있도록 동절기 난방비를 지원함으로써, 한부모가족의 생활안정 및 자립기반 조성과 복지증진에 기여",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003790&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-07"
 },
 {
  "id": "WLF00003983",
  "name": "만 65세 이상 대상포진 예방접종 지원사업",
  "provider": "local",
  "views": 43685,
  "sidoName": "경상남도",
  "sigunguName": "함양군",
  "department": "경상남도 함양군 보건소 보건행정과",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "면역력이 저하되기 시작하는 65세 이상 고령층을 대상으로 대상포진 예방접종 비용을 지원하여 질병 발생에 따른 경제적 부담을 감소시키고, 대상포진 발병 및 합병증을 최소화하여 건강한 노후생활에 이바지하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003983&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-07"
 },
 {
  "id": "WLF00004794",
  "name": "청년 발전을 위한 자격증 취득 응시료 지원",
  "provider": "local",
  "views": 43296,
  "sidoName": "부산광역시",
  "sigunguName": "수영구",
  "department": "부산광역시 수영구 미래전략국 일자리경제과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "어학시험 및 자격증 취득 응시료 지원사업을 통해 취업준비를 위한 경제적 부담을 완화하고 취업역량 강화로 취업률 제고",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004794&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-16"
 },
 {
  "id": "WLF00000044",
  "name": "생활안정자금(융자)",
  "provider": "central",
  "views": 43009,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "서민금융"
  ],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "저소득 노동자, 특수형태근로종사자, 1인 자영업자가 혼례·장예 등 사유 발생 시 필요한 생활자금을 저리로 융자하여 생계안정을 지원하고자 합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000044&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000657",
  "name": "차상위계층 난방비 지원",
  "provider": "local",
  "views": 42959,
  "sidoName": "강원특별자치도",
  "sigunguName": "동해시",
  "department": "강원특별자치도 동해시 행정복지국 복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "〇 동해시 차상위계층 난방비 지원 조례 「국민기초생활 보장법」 제2조 제10호에 따른 차상위계층에 동절기 난방비를 지원\n\n〇 난방비 지원을 통해 경제적 부담을 경감하고 저속득층의 생활안정을 도모하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000657&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-10"
 },
 {
  "id": "WLF00001183",
  "name": "다문화보육료지원",
  "provider": "central",
  "views": 42522,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "multicultural"
  ],
  "lifeStages": [
   "infant"
  ],
  "themes": [
   "보육"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "어린이집을 이용하는 다문화 가정의 영유아 자녀에게 보육료를 지원하여 부모의 양육에 대한 부담을 덜고, 부모가 원활한 경제활동을 할 수 있도록 돕습니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001183&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003242",
  "name": "국가예방접종 사업",
  "provider": "central",
  "views": 42220,
  "sidoName": null,
  "sigunguName": null,
  "department": "질병관리청",
  "targets": [],
  "lifeStages": [
   "infant",
   "child"
  ],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)",
   "기타"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "국가예방접종 비용을 지원하여 경제적 부담을 경감하고 예방접종 대상 감염병 퇴치 기반 마련 및 건강증진에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003242&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000864",
  "name": "희귀질환자 의료비 지원사업",
  "provider": "central",
  "views": 41921,
  "sidoName": null,
  "sigunguName": null,
  "department": "질병관리청",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "생활지원"
  ],
  "payTypes": [
   "현금지급",
   "감면"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "희귀질환자 중 저소득층 건강보험가입자에게 본인부담금 등 의료비를 지원하여 경제적 부담을 경감합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000864&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005638",
  "name": "청년 이사비 지원사업",
  "provider": "local",
  "views": 41338,
  "sidoName": "충청남도",
  "sigunguName": "태안군",
  "department": "충청남도 태안군 산업건설국 신속허가과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": " 경기 침체 및 고용 불안정으로 이직 및 창업 등으로 청년 주거 비용이 증가하면서, 군으로 전입하는 무주택 청년 가구에 이사비를 지원\n 주거비 부담을 완화하며 안정적인 주거 정착 및 인구증가에 기여하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005638&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-25"
 },
 {
  "id": "WLF00005696",
  "name": "청년 전월세보증금 대출이자 지원사업",
  "provider": "local",
  "views": 41300,
  "sidoName": "경상북도",
  "sigunguName": "구미시",
  "department": "경상북도 구미시 미래교육돌봄국 인구청년과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "목돈 마련이 어려운 무주택 청년들의 높은 주거비 부담 경감을 위해 임차보증금 대출이자를\n 지원하여 청년들의 주거 안정 및 정주 여건 향상",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005696&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-06-30"
 },
 {
  "id": "WLF00004638",
  "name": "가스요금할인",
  "provider": "central",
  "views": 41190,
  "sidoName": null,
  "sigunguName": null,
  "department": "산업통상부",
  "targets": [
   "multi-child",
   "veteran",
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "서민금융"
  ],
  "payTypes": [
   "감면"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "기초생활수급자, 차상위계층, 장애인, 국가유공자 등 사회적배려대상자가 사용하는 도시가스요금을 감액하여 요금 감면을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004638&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003264",
  "name": "지역사회 통합건강증진사업",
  "provider": "central",
  "views": 40767,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "정신건강"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "지역사회를 기반으로 다양한 건강증진사업을 내실 있게 추진하여 지자체 건강수준 향상, 국가 건강수명 및 삶의 질 증대를 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003264&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001135",
  "name": "해산급여",
  "provider": "central",
  "views": 40667,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [
   "생활지원",
   "임신·출산"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "수급자 가구의 조산 및 분만전과 분만후의 출산에 필요한 조치와 보호를 위해 해산비를 지급합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001135&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002234",
  "name": "서울형 기초보장제도 운영",
  "provider": "local",
  "views": 40208,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 복지정책실 복지기획관 복지정책과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "생활수준은 최저생계비 이하이나 국민기초생활보장제도 법정기준이 맞지 않아 보호를 받지 못하는 비수급 빈곤층의 최소한의 생계보장 및 복지 사각지대 해소 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002234&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-20"
 },
 {
  "id": "WLF00001060",
  "name": "대학생 근로장학금 지원",
  "provider": "central",
  "views": 40054,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "multicultural",
   "multi-child",
   "veteran",
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "youth"
  ],
  "themes": [
   "생활지원",
   "교육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "저소득층 대학생에게 근로 기회를 제공하고 그에 따른 대가(장학금)를 지급하여 안정적인 학업 여건을 조성합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001060&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004375",
  "name": "산모신생아건강관리지원사업 본인부담금지원",
  "provider": "local",
  "views": 39432,
  "sidoName": "경상남도",
  "sigunguName": null,
  "department": "경상남도 김해시 김해시보건소 건강증진과",
  "targets": [],
  "lifeStages": [
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "우편"
  ],
  "onlineApply": null,
  "summary": "○ 저출산, 고령화시대를 맞이하여 지자체에서도 다양하고 적극적인 지원 방안을 모색해야 할 필요가 있음\n○ 본인부담금 걱정으로 건강관리사 이용이 어려운 출산가정에 실비지원으로 경제적 부담 경감\n○ 건강관리사 이용 확대로 취약계층 일자리 확대 효과",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004375&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-13"
 },
 {
  "id": "WLF00000091",
  "name": "한부모가족복지시설 지원",
  "provider": "central",
  "views": 39153,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [
   "infant",
   "child",
   "teen",
   "youth"
  ],
  "themes": [
   "주거",
   "보호·돌봄"
  ],
  "payTypes": [
   "시설입소",
   "기타"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "저소득 무주택 한부모가족의 안정을 위해 일정기간동안 한부모가족복지시설에 거주할 수 있도록 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000091&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000099",
  "name": "저소득장애인 진단서 발급비 및 검사비 지원사업",
  "provider": "central",
  "views": 39060,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "신체건강",
   "정신건강"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "저소득장애인 등에게 장애정도 심사용 진단서 발급비 및 검사비 일부를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000099&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005748",
  "name": "다자녀 학생 교육비 지원사업",
  "provider": "local",
  "views": 38665,
  "sidoName": "경상남도",
  "sigunguName": "경상남도교육청",
  "department": "경상남도교육청 미래교육국 교육복지과",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "현금지급",
   "전자바우처(바우처)"
  ],
  "cycle": "년",
  "applyMethods": [
   "우편",
   "방문"
  ],
  "onlineApply": null,
  "summary": "1. 다자녀 학생 교육비 지원으로 국가적 출산 장려 정책에 기여\n2. 다자녀 가정에 교육비 지원을 통해 학부모의 경제적 부담 경감",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005748&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00001150",
  "name": "발달장애인 가족휴식지원사업",
  "provider": "central",
  "views": 38520,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [
   "정신건강",
   "보호·돌봄"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "발달장애인 가족의 돌봄 스트레스를 완화하고 정서적 안정을 지원하기 위하여 가족휴식 지원서비스를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001150&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003967",
  "name": "다자녀가정 우대카드 지원사업",
  "provider": "local",
  "views": 37836,
  "sidoName": "대구광역시",
  "sigunguName": null,
  "department": "대구광역시 청년여성교육국 출산보육과",
  "targets": [],
  "lifeStages": [
   "teen",
   "child",
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "대구시  다자녀가정의 우대를 위해 2자녀 이상 가정에 '대구아이조아카드' 발급",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003967&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-11"
 },
 {
  "id": "WLF00000104",
  "name": "시각·청각장애인용 TV 보급사업",
  "provider": "central",
  "views": 37709,
  "sidoName": null,
  "sigunguName": null,
  "department": "방송통신위원회",
  "targets": [
   "veteran",
   "disability",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "시각&middot;청각 장애인이 비장애인과 동등한 조건에서 방송매체에 접근할 수 있도록  장애인용 맞춤형 TV를 보급하여 방송소외계층의 방송접근권을 보장합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000104&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003277",
  "name": "취업 후 상환 학자금대출",
  "provider": "central",
  "views": 37404,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age"
  ],
  "themes": [
   "교육",
   "서민금융"
  ],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "반기",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "대학 학자금 마련에 어려움을 겪는 학생들에게 저리의 학자금대출을 지원하여 취업 후 일정기준의 소득이 발생한 때부터 상환할 수 있도록 합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003277&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004660",
  "name": "고령자 고용지원금",
  "provider": "central",
  "views": 37263,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [],
  "lifeStages": [
   "middle-age",
   "senior"
  ],
  "themes": [
   "일자리"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "분기",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "60세 이상인 근로자수가 증가하는 사업주를 지원하여 고령자의 고용 안정을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004660&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005112",
  "name": "경상남도 청년 월세 지원사업",
  "provider": "local",
  "views": 37050,
  "sidoName": "경상남도",
  "sigunguName": null,
  "department": "경상남도 거제시 경제해양국 민생경제과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "취업난·높은 주거비 부담 등 주거 문제를 겪고 있는 청년의 주거 안정과 사회 진입을 돕고 안정적인 생활 기반 마련을 통해 지역 정착을 유도하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005112&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-12"
 },
 {
  "id": "WLF00001067",
  "name": "장애아보육료지원",
  "provider": "central",
  "views": 36836,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "infant",
   "child"
  ],
  "themes": [
   "보육"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "어린이집 이용 장애아동에 대한 보육료 지원을 통해 부모의 자녀양육 부담경감 및 원활한 경제활동을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001067&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005143",
  "name": "부산청년 자산형성지원 사업",
  "provider": "local",
  "views": 36716,
  "sidoName": "부산광역시",
  "sigunguName": null,
  "department": "부산광역시 청년산학국 청년정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "청년의 근로의욕 고취 및 자산형성 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005143&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00005409",
  "name": "장애인 버스요금 지원",
  "provider": "local",
  "views": 36536,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 복지정책실 복지기획관 장애인복지정책과",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "youth",
   "teen",
   "senior",
   "middle-age",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "장애인 교통비 부담 경감 및 사회참여 활성화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005409&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-09"
 },
 {
  "id": "WLF00003299",
  "name": "저소득층 냉·난방비 지원사업",
  "provider": "local",
  "views": 36484,
  "sidoName": "강원특별자치도",
  "sigunguName": "철원군",
  "department": "강원특별자치도 철원군 주민생활지원실",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "(기존) 동절기 저소득 취약계층의 월동난방비 지원으로 경제적 부담경감과 생활안정 도모\n→ (변경) 1. 폭염 등 이상기후로 하절기 냉방비 부담 증가 및 취약계층의 건강·안전 문제가 확대되는 상황에서, 기존 동절기 중심 난방비 1회 지원 체계를 냉·난방 통합(분할 지급)으로 개편하여 계절별 지원 공백을 최소화하고, 취약가구의 생활안정을 도모하고자 함.\n2. 에너지바우처 등 유사 제도 확대 및 중복지원 제외 강화로 인해 기존 사업의 실 지원가구 감소 및 집행률 저조(2025년 36.4%)가 발생하여 예산 집행 효율성 제고 및 실질적 수혜 확대를 위해 지원 구조를 개선하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003299&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00003929",
  "name": "상수도요금감면(기초생활수급자,국가(독립)유공자,어린이집,유치원,사회복지시설,다문화가정,한부모가정,다자녀가정)",
  "provider": "local",
  "views": 35807,
  "sidoName": "경기도",
  "sigunguName": "고양시",
  "department": "경기도 고양시 상하수도사업소 수도행정과",
  "targets": [
   "multicultural",
   "multi-child",
   "veteran",
   "single-parent",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "감면"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "기초생활수급자,국가(독립)유공자,어린이집,유치원,사회복지시설,다문화가정,한부모가정,다자녀가정의 상수도요금 감면으로 경제적 부담 경감 및 생활안정 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003929&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00003520",
  "name": "저소득층 난방연료비 지원",
  "provider": "local",
  "views": 35344,
  "sidoName": "강원특별자치도",
  "sigunguName": "평창군",
  "department": "강원특별자치도 평창군 행정지원국 복지정책과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "동절기 기초생활수급 가구에 난방연료비를 지원하여 저소득층 위기 관리 강화 및 생활 안정 지원\n\n에너지바우처와 다른 타사업과 중복지원 제외 후 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003520&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-19"
 },
 {
  "id": "WLF00005244",
  "name": "서울특별시교육청 초·중·고 입학준비금 지원 사업",
  "provider": "local",
  "views": 33823,
  "sidoName": "서울특별시",
  "sigunguName": "서울특별시교육청",
  "department": "서울특별시교육청 기획조정실 학생맞춤지원담당관",
  "targets": [],
  "lifeStages": [
   "teen",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문",
   "모바일앱"
  ],
  "onlineApply": null,
  "summary": "서울 소재 관내 학교(초·중·고) 신입생(학부모) 대상 입학 준비에 필요한 물품(교복, 의류, 신발, 가방, 도서, 안경, 전자 기기 등)을 자율적으로 직접구매 할 수 있도록 하는 정책으로  초·중·고를 포괄하는 보편적 교육복지의 실현으로 교육의 공공성을 강화하고  학교 입학에 필요한 준비금을 지원하여 학부모 교육비 부담 경감하고자함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005244&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-04"
 },
 {
  "id": "WLF00003225",
  "name": "환경보건이용권",
  "provider": "central",
  "views": 33614,
  "sidoName": null,
  "sigunguName": null,
  "department": "환경부",
  "targets": [
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "생활지원",
   "주거",
   "안전·위기"
  ],
  "payTypes": [
   "현물지급",
   "프로그램/서비스(서비스)"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "환경보건이용권(10만원 상당 포인트)을 통해 기초생활수급자 13세 미만 어린이에게 환경성질환 예방용품, 청소서비스, 건강체험, 진료비 지원 및 실내환경 유해인자 진단·컨설팅 등 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003225&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003238",
  "name": "의료급여수급권자 일반건강검진비 지원",
  "provider": "central",
  "views": 33530,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "의료급여수급권자를 대상으로 일반건강검진, 의료급여생애전환기검진을 제공하여 건강증진을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003238&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004651",
  "name": "직업능력개발운영(훈련수당)",
  "provider": "central",
  "views": 33424,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "일자리",
   "교육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "장애인이 그 희망·적성·능력 등에 맞는 직업생활을 할 수 있도록 하기 위하여 장애인에게 직업능력개발훈련을 실시합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004651&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000888",
  "name": "영구임대주택공급",
  "provider": "central",
  "views": 33331,
  "sidoName": null,
  "sigunguName": null,
  "department": "국토교통부",
  "targets": [
   "multicultural",
   "veteran",
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [
   "주거"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "생계·의료급여 수급자, 국가유공자, 일본군 위안부 피해자 등 사회보호계층에게 영구임대주택을 공급하여 주거안정을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000888&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005538",
  "name": "천사지원금 지급",
  "provider": "local",
  "views": 33315,
  "sidoName": "인천광역시",
  "sigunguName": null,
  "department": "인천광역시 여성가족국 영유아정책과",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "년",
  "applyMethods": [
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "영유아기 지원 정책 마련으로 초기 양육에 따른 경제적 부담 경감 및 출산장려 분위기 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005538&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00001091",
  "name": "국가유공자의료급여증발급",
  "provider": "central",
  "views": 33156,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "정신건강"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "저소득 국가유공자와 가족들의 의료비 부담 경감을 위해 국가유공자 의료급여증을 발급합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001091&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004647",
  "name": "국민연금 출산크레딧",
  "provider": "central",
  "views": 32906,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "출산에 대해 연금 가입기간을 추가로 인정하여 출산 친화 환경을 조성하고 여성의 연금 수급 기회를 확대합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004647&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000010",
  "name": "저소득 노인 틀니·임플란트 본인부담금 지원사업",
  "provider": "local",
  "views": 32520,
  "sidoName": "인천광역시",
  "sigunguName": "연수구",
  "department": "인천광역시 연수구 복지환경국 사회보장과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "저소득층 어르신들 대상으로 틀니 및 임플란트 시술 시 본인부담금을 지원하여 경제적 부담을 완화하고 구강건강 증진 도모하고자 합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000010&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00005852",
  "name": "중장년 경력지원제",
  "provider": "central",
  "views": 32375,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [],
  "lifeStages": [
   "middle-age"
  ],
  "themes": [
   "일자리",
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "퇴직한 사무직 등 중장년에게 일경험을 쌓을 수 있도록 하고, 재취업과 경력 전환을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005852&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002178",
  "name": "다둥이 차량렌탈 지원사업",
  "provider": "local",
  "views": 32179,
  "sidoName": "대구광역시",
  "sigunguName": "북구",
  "department": "대구광역시 북구 보건소 건강증진과",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [
   "infant",
   "middle-age",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현물대여"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "다자녀 출산가정에 나들이 이동수단 서비스를 제공하여 여가활동 및 생활편의를 돕고 출산장려 분위기를 확산하기 위함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002178&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00003178",
  "name": "긴급복지 해산비지원",
  "provider": "central",
  "views": 32051,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [
   "신체건강",
   "임신·출산"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "생계곤란 등의 위기상황에 처하여 도움이 필요한 긴급복지 주지원(생계,주거,의료,시설이용) 중인 대상자(가구구구성원 포함) 중 조산(助産) 및 분만 후의 필요한 조치와 보호를 위해 해산비를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003178&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003281",
  "name": "국가보훈대상자 취업능력개발지원",
  "provider": "central",
  "views": 31979,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "일자리",
   "교육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "취업지원대상자의 취업경쟁력 향상을 통한 취업촉진을 위하여 취업능력개발비용을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003281&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001130",
  "name": "선천성 난청검사 및 보청기 지원",
  "provider": "central",
  "views": 31822,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "선천성 난청을 조기진단하고, 조기 재활을 통해 난청으로 인해 발생할 수 있는 언어 지능 발달장애 사회부적응 등을 예방하고 건강한 성장을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001130&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003244",
  "name": "국민임대주택공급",
  "provider": "central",
  "views": 31530,
  "sidoName": null,
  "sigunguName": null,
  "department": "국토교통부",
  "targets": [
   "multicultural",
   "multi-child",
   "veteran",
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [
   "주거"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "무주택 저소득층(소득 1~4분위 계층)의 주거안정을 위해 국민임대주택을 공급합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003244&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005856",
  "name": "양육비 선지급",
  "provider": "central",
  "views": 31424,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [
   "infant",
   "child",
   "teen",
   "youth"
  ],
  "themes": [
   "보육",
   "보호·돌봄",
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "한부모가족 등의 안정적인 자녀 양육환경 조성을 위해 국가가 먼저 양육비를 지급하고, 추후 양육비 채무자에게 회수하는 사업입니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005856&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00006014",
  "name": "강남구 교통비 지원사업",
  "provider": "local",
  "views": 31315,
  "sidoName": "서울특별시",
  "sigunguName": "강남구",
  "department": "서울특별시 강남구 안전교통국 교통행정과",
  "targets": [],
  "lifeStages": [
   "senior",
   "teen",
   "child",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "분기",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "교통약자인 어르신·어린이·청소년을 대상으로 교통비 부담을 완화하여 교통복지를 실현하고, 버스 이용률 증가로 교통체증 감소 및 대중교통 이용 활성화\n(19~24세 청년은 2025년 10월부터 교통비 지원사업 시행)",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006014&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-04"
 },
 {
  "id": "WLF00003209",
  "name": "독립유공자 (손)자녀 생활지원금",
  "provider": "central",
  "views": 30755,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "보상금을 받지 않는 독립유공자의 (손)자녀 중 생계곤란 가구의 생활지원을 통해 독립유공자 후손으로서의 영예로운 생활을 보장합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003209&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005023",
  "name": "청소년부모 아동양육비 지원사업",
  "provider": "central",
  "views": 30534,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [],
  "lifeStages": [
   "teen"
  ],
  "themes": [
   "보육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "저소득 청소년부모 가구에 아동양육비를 지원하여 자녀양육 부담을 경감하고 생활의 안정을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005023&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000892",
  "name": "긴급복지 장제비지원",
  "provider": "central",
  "views": 30509,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "생계곤란 등의 위기상황에 처하여 도움이 필요해 긴급복지 주지원(생계, 의료, 주거, 사회복지시설 이용지원)을 받는 긴급지원대상자(가구구성원 포함)가 사망한 경우 장제에 필요한 비용을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000892&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001178",
  "name": "청소년 발달장애인 방과후활동서비스",
  "provider": "central",
  "views": 30175,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "보호·돌봄"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": true,
  "summary": "만 6세 이상~만 18세 미만의 청소년 발달장애인이 방과후에도 돌봄을 지원받을 수 있도록 방과후활동 이용권을 지급합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001178&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00006135",
  "name": "청년 월세 지원",
  "provider": "local",
  "views": 30104,
  "sidoName": "경기도",
  "sigunguName": "수원시",
  "department": "경기도 수원시 문화청년체육국 청년청소년과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "경제적 어려움을 겪고 있는 청년들에게 월 임차료를 지원하여 주거비 부담을 완화하고 생활안정 도모에 기여",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006135&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-30"
 },
 {
  "id": "WLF00005702",
  "name": "전입세대 이사비용 지원사업",
  "provider": "local",
  "views": 29768,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "화순군",
  "department": "전남광주통합특별시 화순군 인구청년정책과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "○ 우리 지역 전입 세대 대상 이사 시 발생하는 실비를 지원하여 안정적 정착을 유도함으로써, 적극적이고 선제적인 인구 유입 정책을 추진하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005702&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-15"
 },
 {
  "id": "WLF00003282",
  "name": "다문화가족 자녀 언어발달지원서비스",
  "provider": "central",
  "views": 29751,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "multicultural",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "infant",
   "child",
   "teen"
  ],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "다문화가정의 자녀가 건강한 사회구성원, 글로벌 인재로 성장할 수 있도록 체계적인 언어발달을 돕습니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003282&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003218",
  "name": "의료급여(의료급여건강생활유지비)",
  "provider": "central",
  "views": 29705,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "multicultural",
   "veteran",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "정신건강"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "의료급여 수급권자에 대한 의료비를 지원하여 저소득층 국민보건 향상과 사회복지 증진에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003218&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003862",
  "name": "저소득계층 임대보증금 지원 사업",
  "provider": "local",
  "views": 29625,
  "sidoName": "경상남도",
  "sigunguName": null,
  "department": "경상남도 도시주택국 주택과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "장기공공임대주택(영구임대, 국민임대, 행복주택, 통합공공임대주택)에 입주하는 저소득계층에 임대보증금(최대2천만원)을 무이자로 최초 2년(추가 2회 연장 가능, 최대6년) 지원하여 주거 안정 도모와 자립기반 마련 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003862&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-27"
 },
 {
  "id": "WLF00003719",
  "name": "다자녀 가정 기저귀 지원사업",
  "provider": "local",
  "views": 29437,
  "sidoName": "강원특별자치도",
  "sigunguName": "화천군",
  "department": "강원특별자치도 화천군 보건의료원 보건사업과",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [
   "pregnancy",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "다자녀 가정에 대한 기저귀 지원으로 경제적 부담을 경감하고, 출산을 장려하여 아이기르기 가장좋은 화천만들기 기본환경을 조성하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003719&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-11"
 },
 {
  "id": "WLF00004655",
  "name": "장애인취업성공패키지",
  "provider": "central",
  "views": 29419,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "일자리"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "장애인의 취업역량을 강화하고 성공적인 취업을 지원하기 위해 '상담·취업계획수립→직업능력향상→집중 취업알선'에 이르는 통합적인 취업지원 프로그램을 집중 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004655&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001107",
  "name": "지역아동센터 지원",
  "provider": "central",
  "views": 29269,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "multicultural",
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "생활지원",
   "문화·여가",
   "교육",
   "보호·돌봄"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "방과후 돌봄이 필요한 지역사회 아동의 건전육성을 위하여 보호·교육, 건전한 놀이와 오락의 제공, 보호자와 지역사회의 연계 등 종합적인 복지서비스를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001107&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001182",
  "name": "학교우유급식",
  "provider": "central",
  "views": 29173,
  "sidoName": null,
  "sigunguName": null,
  "department": "농림축산식품부",
  "targets": [
   "veteran",
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "학교우유급식을 통해 성장기 학생들에게 필수 영양소를 공급하여 신체 발달과 건강 증진을 돕고, 낙농산업의 안정적 발전을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001182&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001149",
  "name": "공공산림가꾸기",
  "provider": "central",
  "views": 28909,
  "sidoName": null,
  "sigunguName": null,
  "department": "산림청",
  "targets": [
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "일자리",
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "청년 실업자나 장년층 퇴직자 등을 산림사업에 투입하여 일자리 창출에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001149&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004076",
  "name": "경기여성 취업지원금 지원 사업",
  "provider": "local",
  "views": 28671,
  "sidoName": "경기도",
  "sigunguName": null,
  "department": "경기도 여성가족국 고용평등과",
  "targets": [],
  "lifeStages": [
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "도내 경력보유여성에게 구직지원금을 지원하여 적극적 구직의사가 있는 미취업 여성의 노동시장 진입을 촉진\n\n ○ 접수기간: 2026년 4월 16일 ~ 4월 20일  (접수마감) \n \n ○ 선정인원: 300명 내외(접수인원 중 평가를 통해 최종 선정)\n  \n ○ 신청방법: 온라인 신청(https://apply.jobaba.net)\n \n ○ 지원대상: 경기도에 1년 이상 거주하고 기준 중위소득 150% 이하 가구에 속한 적극적 구직의지가 있는내가이거 35세~59세 미취업 여성\n\n ○ 지원내용: : 취업지원금, 취업지원프로그램 등",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": 150,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004076&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-11"
 },
 {
  "id": "WLF00002235",
  "name": "서울형 긴급복지지원",
  "provider": "local",
  "views": 28345,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 복지실 돌봄고독정책관 돌봄복지과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급",
   "현물지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "갑작스러운 위기상황으로 생계유지가 곤란한 저소득 위기가구에 대해 생계지원 등을 신속하게 제공하여 안정적 생활을 유지하도록 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002235&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-06-30"
 },
 {
  "id": "WLF00004041",
  "name": "아동수당플러스 지원 사업",
  "provider": "local",
  "views": 28325,
  "sidoName": "경기도",
  "sigunguName": "성남시",
  "department": "경기도 성남시 복지국 아동보육과",
  "targets": [],
  "lifeStages": [
   "child",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "실물바우처"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "아동 양육에 따른 경제적 부담을 경감하고 건강한 성장 환경을 조성함으로써 아동의 기본적 권리와 복지 증진에 이바지",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004041&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-11"
 },
 {
  "id": "WLF00002637",
  "name": "청년 임차보증금 이자지원사업",
  "provider": "local",
  "views": 28234,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 주택정책실 주택공급기획관 주택정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "기타",
   "현금대여(융자)"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "서울시 내 주택에 임차하려는 청년에게 보증금을 위한 대출금 이자를 지원해줌으로서, 주거비를 감소시키는데 목적이 있음",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002637&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00006436",
  "name": "2026년 청년 운전면허 취득비용 지원사업",
  "provider": "local",
  "views": 28127,
  "sidoName": "경상남도",
  "sigunguName": "김해시",
  "department": "경상남도 김해시 인구청년정책관",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "청년의 운전면허 취득에 대한 경제적 부담 경감을 통해 청년들의 원활한 취업 및 사회진출을 촉진",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006436&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00003181",
  "name": "장애인의료비지원",
  "provider": "central",
  "views": 27941,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "정신건강"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "생활이 어려운 저소득 장애인에게 의료비를 지원하여 생활안정 및 의료 보장을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003181&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003053",
  "name": "어르신 대상포진 예방접종비 지원",
  "provider": "local",
  "views": 27870,
  "sidoName": "강원특별자치도",
  "sigunguName": "삼척시",
  "department": "강원특별자치도 삼척시 보건소 예방관리과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "감면"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "대상포진 예방접종으로 감영성질환의 조기발견. 예방 및 자가 건강관리 능력 향상으로 건강한 노후생활 및 삶의 질 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003053&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-06-19"
 },
 {
  "id": "WLF00004696",
  "name": "대상포진 무료예방접종",
  "provider": "local",
  "views": 27830,
  "sidoName": "충청북도",
  "sigunguName": "충주시",
  "department": "충청북도 충주시 보건소 질병관리과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "면역력이 약한 어르신을 대상으로 대상포진 무료예방접종을 실시하여 대상포진 합병증 예방 및 건강수명 연장",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004696&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-06-30"
 },
 {
  "id": "WLF00000037",
  "name": "시간제보육 지원",
  "provider": "central",
  "views": 27433,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [
   "보육"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "가정 양육 시에도 필요한 때에 필요한 만큼 이용할 수 있는 보육 서비스를 제공하여 자녀 양육에 대한 부담을 경감하고 부모의 보육 서비스 선택권을 보장합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000037&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005861",
  "name": "울부심 생활+ 조부모 손주 돌봄 수당",
  "provider": "local",
  "views": 27398,
  "sidoName": "울산광역시",
  "sigunguName": null,
  "department": "울산광역시 복지보훈여성국 복지정책과",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "우편",
   "E-mail",
   "팩스"
  ],
  "onlineApply": null,
  "summary": "부모급여를 받는 0~1세 영아와 보육을 받는 3~5세 유아 사이의 양육 공백을 해소하여 아이 낳고 기르기 좋은 울산의 아동 양육 환경을 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005861&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-06"
 },
 {
  "id": "WLF00003273",
  "name": "의료급여(본인부담 보상금)",
  "provider": "central",
  "views": 27267,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "multicultural",
   "veteran",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "정신건강"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "의료급여 수급권자에 대한 의료비를 지원하여 저소득층 국민보건 향상과 사회복지 증진에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003273&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003246",
  "name": "청소년산모 임신·출산 의료비 지원",
  "provider": "central",
  "views": 26910,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "teen",
   "pregnancy"
  ],
  "themes": [
   "신체건강",
   "임신·출산"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "청소년산모에게 임신 및 출산에 필요한 의료비를 지원하여 청소년산모와 태아의 건강증진을 돕습니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003246&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000095",
  "name": "사회보험사각지대해소 사업(두루누리 사회보험료 지원사업)",
  "provider": "central",
  "views": 26900,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age"
  ],
  "themes": [
   "일자리",
   "서민금융"
  ],
  "payTypes": [
   "감면"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "소규모 사업 저임금 근로자, 예술인, 노무제공자의 사회보험료를 지원하여 사회보험가입 사각지대 해소 및 사회안전망을 강화합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000095&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003266",
  "name": "직업훈련생계비대부",
  "provider": "central",
  "views": 26724,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "일자리",
   "교육"
  ],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "근로 취약계층이 생계비에 대한 부담없이 장기간 체계적인 훈련을 받고 더 나은 일자리로 취업할 수 있도록 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003266&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002617",
  "name": "신혼부부 임차보증금 지원사업",
  "provider": "local",
  "views": 26715,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 주택정책실 주택공급기획관 주택정책과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "모바일",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "신혼부부의 주거비 부담 경감 및 주거안정성 강화를 위해 임차보증금 대출을 지원하여 주거배려 계층의 주거디딤돌 역할 마련",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002617&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00002058",
  "name": "기저귀.조제분유 지원사업 대상자 확대(셋째아 이상 기저귀 지원사업)",
  "provider": "local",
  "views": 26422,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "여수시",
  "department": "전남광주통합특별시 여수시 보건소 건강증진과",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [
   "pregnancy",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "분기",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "필수재이고 경제적 고부담 요인인 기저귀를 셋째아 이상 출산가정에 바우처를 지원함으로서 실질적인 혜택 제공 및 저출산 극복 기여",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002058&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00003594",
  "name": "취약계층 명절위로금 (상품권)지원",
  "provider": "local",
  "views": 26338,
  "sidoName": "전북특별자치도",
  "sigunguName": "임실군",
  "department": "전북특별자치도 임실군 복지환경국 주민복지과",
  "targets": [
   "single-parent",
   "disability",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "실물바우처"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "저소득 취약계층에 대한 경제적 지원으로 최소한의 삶의 질 향상 확보 및 지역사회 안정적 정착 기회 부여",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003594&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-04"
 },
 {
  "id": "WLF00005261",
  "name": "제주교통복지카드 운영",
  "provider": "local",
  "views": 26310,
  "sidoName": "제주특별자치도",
  "sigunguName": null,
  "department": "제주특별자치도 교통항공국 대중교통과",
  "targets": [
   "disability",
   "veteran"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)",
   "감면"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "제주도 거주 주민 65세이상 어르신 및 국가유공자, 등록장애인, 어린이, 청소년 등 대중교통이용 시 버스요금 면제",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005261&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-02-12"
 },
 {
  "id": "WLF00003199",
  "name": "예술활동준비금 지원",
  "provider": "central",
  "views": 26294,
  "sidoName": null,
  "sigunguName": null,
  "department": "문화체육관광부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "예술인들이 예술 외적인 요인으로 인해 예술활동을 중단하는 상황에 이르지 않도록 '예술활동 준비 단계'를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003199&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003184",
  "name": "온동네 초등돌봄교육",
  "provider": "central",
  "views": 26292,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "child"
  ],
  "themes": [
   "보호·돌봄"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "정규수업 외 시간에 초등학생의 성장과 발달을 위해 학교와 지역사회의 다양한 돌봄과 교육 자원을 연계하여 종합적으로 운영하는 학교 교육활동을 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003184&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003473",
  "name": "청년 노동자 지원사업(중소기업 청년 노동자 지원사업)",
  "provider": "local",
  "views": 26229,
  "sidoName": "경기도",
  "sigunguName": null,
  "department": "경기도 사회적경제국 청년기회과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "분기",
  "applyMethods": [
   "인터넷",
   "모바일"
  ],
  "onlineApply": null,
  "summary": "경기도 소재 중소기업에 재직중인 도 거주 청년 노동자에게 임금보전을 통해 청년 노동자 처우개선 및 복지증진",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003473&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-22"
 },
 {
  "id": "WLF00001638",
  "name": "산모신생아 건강관리사업 확대",
  "provider": "local",
  "views": 26130,
  "sidoName": "부산광역시",
  "sigunguName": null,
  "department": "부산광역시 시민건강국 건강정책과",
  "targets": [],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "출산가정 대상 산후도우미 지원하는 산모신생아 건강관리 지원 확대로 표준화된 서비스 제공, 경제적 부담경감, 사회적 일자리 창출",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001638&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-19"
 },
 {
  "id": "WLF00004213",
  "name": "50세 이상 기초생활수급자, 65세 이상 차상위계층 대상포진 접종 지원",
  "provider": "local",
  "views": 25977,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "보성군",
  "department": "전남광주통합특별시 보성군 보건소",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "50세 이상 기초생활수급자, 65세 이상 차상위계층 \n대상포진 접종을 통해 주민 삶의 질 향상",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004213&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-08"
 },
 {
  "id": "WLF00003228",
  "name": "의료급여 선택의료급여기관제",
  "provider": "central",
  "views": 25853,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "multicultural",
   "veteran",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "정신건강"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "의료급여 수급권자에 대한 의료비를 지원하여 저소득층 국민보건 향상과 사회복지 증진에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003228&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003194",
  "name": "시설급여",
  "provider": "central",
  "views": 25835,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "생활지원",
   "보호·돌봄"
  ],
  "payTypes": [
   "시설입소"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "독립적인 일상 생활이 어려운 노인이나 노인질병이 있는 중등 수급자에게 장기요양기관 등 시설 입소를 통해 신체 활동 및 교육 훈련을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003194&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003236",
  "name": "청소년상담1388 전화상담",
  "provider": "central",
  "views": 25831,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [],
  "lifeStages": [
   "child",
   "teen",
   "youth"
  ],
  "themes": [
   "정신건강",
   "보호·돌봄"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "365일 24시간 연중 상시 이용가능한 비대면 청소년상담채널 운영으로 청소년 고민해소 지원 및 위기청소년을 조기발견합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003236&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003241",
  "name": "노후긴급자금 대부사업",
  "provider": "central",
  "views": 25581,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "middle-age",
   "senior"
  ],
  "themes": [
   "생활지원",
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "만 60세 이상의 국민연금 연금수급자에게 전월세보증금, 의료비(배우자 포함),배우자 장제비 및 재해복구비 용도의 긴급한 생활안정자금을 저리로 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003241&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005445",
  "name": "자립준비청년(보호종료아동) 자립정착금 지원",
  "provider": "central",
  "views": 25425,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "teen",
   "youth"
  ],
  "themes": [
   "생활지원",
   "입양·위탁",
   "보호·돌봄"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "아동복지시설 및 가정위탁보호아동이 퇴소 또는 위탁종료 시 경제적 지원을 통해 안정적인 사회정착을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005445&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005863",
  "name": "청년 부동산중개수수료 및 이사비 지원사업",
  "provider": "local",
  "views": 24869,
  "sidoName": "대구광역시",
  "sigunguName": "중구",
  "department": "대구광역시 중구 행정안전국 혁신사업홍보과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "E-mail"
  ],
  "onlineApply": null,
  "summary": "경기침체 및 고용시장 악화로 청년 구직기간이 장기화되면서 청년 주거비용이 크게 증가하여, \n부동산 중개수수료 및 이사비 지원을 통해 주거취약 청년가구의 주거비용 부담을 경감하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005863&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00002966",
  "name": "어르신 틀니 및 보청기 지원",
  "provider": "local",
  "views": 24749,
  "sidoName": "제주특별자치도",
  "sigunguName": "제주시",
  "department": "제주특별자치도 제주시 복지위생국 노인복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "○ 어르신들에게 틀니 시술비 지원을 통하여 구강기능회복 및 건강한 노후생활 유지\n○ 보청기 착용이 필요한 저소득 어르신들의 생활불편 해소",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002966&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-11"
 },
 {
  "id": "WLF00001076",
  "name": "서민금융 활성화 지원(햇살론youth 보증사업)",
  "provider": "central",
  "views": 24649,
  "sidoName": null,
  "sigunguName": null,
  "department": "금융위원회",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [
   "생활지원",
   "서민금융"
  ],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "금융취약계층인 대학생, 청년의 금융애로를 해소하여 학업 및 취업에 전념, 향후 제도권 금융으로 안착할 수 있도록 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001076&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001112",
  "name": "긴급복지 교육지원",
  "provider": "central",
  "views": 24308,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "분기",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "생계곤란 등의 위기상황에 처하여 도움이 필요한 긴급복지(생계지원, 주거지원, 사회복지시설 이용지원)를 받는 대상자 중 부가지원인 교육지원이 필요하다고 인정되는 초･중･고등학교 입학생 또는 재학생을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001112&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005019",
  "name": "청년 취업자 주거비 지원사업",
  "provider": "local",
  "views": 24289,
  "sidoName": "전남광주통합특별시",
  "sigunguName": null,
  "department": "전남광주통합특별시 인구청년이민국 청년희망과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "분기",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "일하는 청년의 주거 안정과 경제적 자립을 지원하기 위해, 전월세 주택에 거주하고 일정 소득 이하인 청년의 주거비를 최대 12개월간 월 20만원씩 현금으로 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005019&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00005293",
  "name": "청년 이사비 지원사업",
  "provider": "local",
  "views": 24226,
  "sidoName": "경기도",
  "sigunguName": "의왕시",
  "department": "경기도 의왕시 경제환경국 기업일자리과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "이사비 지원을 통해 주거취약 청년가구의 주거비용 부담을 경감하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005293&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-09"
 },
 {
  "id": "WLF00002322",
  "name": "65세이상 저소득 노인가구 건강보험료 지원",
  "provider": "local",
  "views": 24056,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "구례군",
  "department": "전남광주통합특별시 구례군 주민복지과",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "65세이상 저소득 노인가구 건강보험료및 노인장기요양보험료 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002322&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00000103",
  "name": "노인장기요양보험 복지용구 급여",
  "provider": "central",
  "views": 23893,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "신체건강",
   "생활지원"
  ],
  "payTypes": [
   "현물지급",
   "기타"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "장기요양 수급자에게 일상생활 또는 신체활동 지원 및 인지 기능의 유지 향상에 필요한 용구를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000103&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001098",
  "name": "온가족보듬사업",
  "provider": "central",
  "views": 23814,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "multicultural",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [
   "정신건강",
   "생활지원",
   "안전·위기",
   "보호·돌봄"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "취약가족 및 긴급·위기가족이 가족 기능을 회복하고 정서적, 경제적 자립역량을 강화할 수 있도록 합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001098&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001071",
  "name": "우수학생 국가장학금 지원",
  "provider": "central",
  "views": 23714,
  "sidoName": null,
  "sigunguName": null,
  "department": "과학기술정보통신부",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [
   "생활지원",
   "교육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "반기",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "이공계 우수 학생을 조기 발굴, 학비를 지원하여 이공계 진학 유도 및 미래의 핵심인재로 육성을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001071&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000923",
  "name": "의료급여 중증질환, 희귀질환 및 중증난치질환자 지원",
  "provider": "central",
  "views": 23688,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "multicultural",
   "veteran",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "의료급여 수급권자에 대한 의료비를 지원하여 저소득층 국민보건 향상과 사회복지 증진에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000923&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001895",
  "name": "무연고 기초수급자 간병비 지원",
  "provider": "local",
  "views": 23439,
  "sidoName": "경기도",
  "sigunguName": "연천군",
  "department": "경기도 연천군 행정복지국 복지정책과",
  "targets": [
   "single-parent",
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "우편"
  ],
  "onlineApply": null,
  "summary": "위기상황에 해당되는 중한 질병 또는 부상으로 인하여 의료기관에 입원한 무연고 기초생활수급자(생계,의료,주거)의 간병비를 지원함으로써 의료비 부담 완화도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001895&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00000093",
  "name": "버팀목대출보증",
  "provider": "central",
  "views": 23303,
  "sidoName": null,
  "sigunguName": null,
  "department": "금융위원회",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "주거",
   "서민금융"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "제도권 금융기관을 이용하기 어려운 금융소외계층의 주거안정을 위해 주택금융신용보증기금을 통한 보증을 지원하여 서민의 주거안정을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000093&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003197",
  "name": "국가장학금(Ⅰ, Ⅱ유형)",
  "provider": "central",
  "views": 23214,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "누구나 경제적 여건에 관계없이 의지와 능력에 따라 대학교육의 기회를 가질 수 있도록 소득연계를 통한 대학 등록금을 차등 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003197&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005033",
  "name": "아동용품구입비 지원",
  "provider": "central",
  "views": 23045,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "infant",
   "child"
  ],
  "themes": [
   "생활지원",
   "입양·위탁"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "위기아동 가정보호 및 전문가정위탁 사업에 참여하는 가정에 아동 보호에 필요한 물품 구입을 위한 비용을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005033&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005641",
  "name": "기형아 검사 비용 지원",
  "provider": "local",
  "views": 23043,
  "sidoName": "경상남도",
  "sigunguName": "거창군",
  "department": "경상남도 거창군 보건소 건강증진과",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "기형아검사비용에 대한 출산가정의 경제적 부담을 경감시켜 출생아 수 증가에 기여하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005641&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-19"
 },
 {
  "id": "WLF00002372",
  "name": "기초생활지원(차상위계층지원)",
  "provider": "local",
  "views": 23027,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "화순군",
  "department": "전남광주통합특별시 화순군 사회복지과",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "차상위계층 장애인, 한부모가족 등에게 생활에 필요한 지원금을 제공함으로써 대상자의 복지 향상에 기여함을 목적",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002372&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-04"
 },
 {
  "id": "WLF00004207",
  "name": "경기도 청년노동자 통장(舊경기도 일하는 청년 통장)",
  "provider": "local",
  "views": 22815,
  "sidoName": "경기도",
  "sigunguName": null,
  "department": "경기도 사회적경제국 청년기회과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급",
   "지역화폐"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "도내 청년노동자의 근로의지 고취 및 자산형성 지원을 통한 자립기반 마련",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004207&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-22"
 },
 {
  "id": "WLF00003547",
  "name": "장애인통합복지카드 발급비, 배송비 지원사업",
  "provider": "local",
  "views": 22390,
  "sidoName": "충청북도",
  "sigunguName": "진천군",
  "department": "충청북도 진천군 복지행정국 가족친화과",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "○장애인 통합복지카드 발급수수료 및 통합카드 배송비지원을 통한 장애인의 편의지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003547&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00000049",
  "name": "에너지 취약계층 고효율조명기기 무상교체 지원(취약계층 에너지복지사업)",
  "provider": "central",
  "views": 21769,
  "sidoName": null,
  "sigunguName": null,
  "department": "기후에너지환경부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "에너지"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "에너지 취약계층인 저소득층 및 복지시설에 고효율 조명기기(LED) 무상교체로 전기요금을 줄이고 전력수요 절감에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000049&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000057",
  "name": "공공분양",
  "provider": "central",
  "views": 21566,
  "sidoName": null,
  "sigunguName": null,
  "department": "국토교통부",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "주거"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "저소득층의 주거안정 및 무주택자의 내 집 마련 기회를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000057&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000040",
  "name": "선천성대사이상 검사 및 환아관리",
  "provider": "central",
  "views": 21533,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "infant",
   "child",
   "teen"
  ],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현금지급",
   "현물지급"
  ],
  "cycle": "분기",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "선천성대사이상의 유무를 조기에 발견·치료함으로써 장애발생을 사전에 예방하여 영유아의 건강 증진을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000040&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00006154",
  "name": "정신건강 심리상담 바우처사업",
  "provider": "local",
  "views": 21446,
  "sidoName": "강원특별자치도",
  "sigunguName": "영월군",
  "department": "강원특별자치도 영월군 보건소 건강증진과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "우울/불안 등 정서적 어려움이 있는 국민에게 대화 기반의 전문 심리상담 서비스를 제공하여, 국민의 마음건강 돌봄, 자살 예방 및 정신질환 조기발견",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006154&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-11"
 },
 {
  "id": "WLF00001951",
  "name": "아동급식지원사업",
  "provider": "local",
  "views": 21431,
  "sidoName": "제주특별자치도",
  "sigunguName": "제주시",
  "department": "제주특별자치도 제주시 복지위생국 주민복지과",
  "targets": [
   "single-parent",
   "low-income"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "저소득가정의 아동들이 건강하고 행복하게 자랄 수 있도록 가정환경 및 욕구에 맞는 급식을 효율적으로 제공하고자 아동급식 사업 추진계획을 수립하고 시행하고자함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001951&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-19"
 },
 {
  "id": "WLF00004662",
  "name": "보훈대상자 생계지원금 지급",
  "provider": "central",
  "views": 21305,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran",
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "저소득 고령 보훈대상자에게 생계지원금을 지급하여 안정된 생활을 돕습니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004662&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005427",
  "name": "청년 이사비용 지원사업",
  "provider": "local",
  "views": 21277,
  "sidoName": "강원특별자치도",
  "sigunguName": "속초시",
  "department": "강원특별자치도 속초시 경제관광국 지역경제과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급",
   "지역화폐"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "부동산 시장의 영향 및 경제적 어려움 등으로 이사가 잦아 주거 불안정을 겪는 청년들의 이사비용을 지원하여 청년들의 실질적 주거 안정 및 삶의 질 향상에 기여하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005427&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-22"
 },
 {
  "id": "WLF00003235",
  "name": "입양아동 양육수당 지원",
  "provider": "central",
  "views": 21243,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "infant",
   "child",
   "teen"
  ],
  "themes": [
   "생활지원",
   "입양·위탁"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "입양아동 양육수당 지원을 통해 입양가정의 경제적 부담을 완화하여 국내입양 활성화 및 아동의 건전한 육성을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003235&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004353",
  "name": "결혼장려금 지원",
  "provider": "local",
  "views": 21219,
  "sidoName": "경상남도",
  "sigunguName": "산청군",
  "department": "경상남도 산청군 미래전략담당관",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "결혼비용부담 완화로 결혼친화적 문화 정착에 기여하여 저출산 문제 대응 및 관내 인구유입 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004353&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00000067",
  "name": "의료급여 장애인보조기기 지원",
  "provider": "central",
  "views": 21171,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "의료급여수급 장애인에게 장애인보조기기비용을 지원하여 저소득 장애인의 삶의 질 향상과 사회복지 증진에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000067&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000097",
  "name": "국가유공자등생활조정수당",
  "provider": "central",
  "views": 21155,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "저소득 국가유공자 등 및 그 유족의 생활안정 및 복지향상을 위해  생활조정수당을 지급합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000097&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000884",
  "name": "미래두배 청년통장(구 청년희망통장)",
  "provider": "local",
  "views": 20972,
  "sidoName": "대전광역시",
  "sigunguName": null,
  "department": "대전광역시 복지국 청년정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "지역에서 성실히 일하는 청년들의 안정적인 미래 준비와 자립을 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000884&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-24"
 },
 {
  "id": "WLF00001361",
  "name": "경기도 산후조리비 지원",
  "provider": "local",
  "views": 20964,
  "sidoName": "경기도",
  "sigunguName": null,
  "department": "경기도 보건건강국 건강증진과",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "youth",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "출산가정의 경제적 부담 완화 및 산모신생아 건강보호",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001361&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-19"
 },
 {
  "id": "WLF00000048",
  "name": "국가유공자등대부지원",
  "provider": "central",
  "views": 20901,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "생활지원",
   "주거",
   "서민금융"
  ],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "국가유공자 등의 주거안정과 자립기반 조성을 위하여 장기로 저금리 대출을 실시합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000048&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005693",
  "name": "출산가정 산후조리비 지원",
  "provider": "local",
  "views": 20670,
  "sidoName": "부산광역시",
  "sigunguName": "남구",
  "department": "부산광역시 남구 보건소 건강증진과",
  "targets": [],
  "lifeStages": [
   "middle-age",
   "pregnancy",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "산후조리비 지원을 통해 산모의 건강증진 및 출산가구의 경제적 부담경감을 도모하여 안정적인 출산환경을 조성에 기여",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005693&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-30"
 },
 {
  "id": "WLF00001161",
  "name": "표준모자보건수첩 제공",
  "provider": "central",
  "views": 20652,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "infant",
   "pregnancy"
  ],
  "themes": [
   "신체건강",
   "임신·출산"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "표준모자보건수첩 보급으로 임신부터 영유아기까지 각종 검사 및 건강관리 안내, 예방접종, 검진(검사) 등 건강기록 유지, 양육에 대한 필수·객관적 정보 제공으로 모성과 영유아의 건강증진을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001161&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003010",
  "name": "한부모가족 난방비 지원",
  "provider": "local",
  "views": 20143,
  "sidoName": "충청북도",
  "sigunguName": null,
  "department": "충청북도 양성평등가족정책관",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [
   "youth",
   "teen",
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "한부모가족의 난방비 지원으로 경제적 부담 해소 및 월동기 생활안정 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003010&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-25"
 },
 {
  "id": "WLF00004946",
  "name": "대전형 양육기본수당",
  "provider": "local",
  "views": 20063,
  "sidoName": "대전광역시",
  "sigunguName": null,
  "department": "대전광역시 복지국 아동보육과",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "저출산 심화로 출산 장려, 출생 초기 양육비용 부담 경감으로 사회적 책임을 강화하고 질 높은 양육 서비스 및 친화적인 분위기 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004946&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-12"
 },
 {
  "id": "WLF00003945",
  "name": "공공근로사업",
  "provider": "local",
  "views": 19858,
  "sidoName": "경상남도",
  "sigunguName": "창녕군",
  "department": "경상남도 창녕군 건설산업국 일자리경제과",
  "targets": [
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "youth",
   "senior",
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "부서별 지역 실정에 맞는 사업을 발굴, 추진하여 저소득 실업자에게 구직기간 동안 한시적으로 공공부문에 일자리를 제공하여 생계보조를 통한 사회 안전망 역할 및 근로 기회 부여",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003945&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-25"
 },
 {
  "id": "WLF00006181",
  "name": "자녀출산 무주택가구 주거비 지원",
  "provider": "local",
  "views": 19790,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 여성가족실 저출생담당관",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "youth",
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "모바일앱",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "무주택 가구의 주거비 부담을 줄여 안정된 주거환경 속에서 자녀를 출산 할 수 있도록 지원하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006181&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-09"
 },
 {
  "id": "WLF00001120",
  "name": "교육복지우선지원사업",
  "provider": "central",
  "views": 19720,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "multicultural",
   "disability",
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "정신건강",
   "문화·여가",
   "교육",
   "보호·돌봄"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "취약계층 학생이 밀집한 학교(초,중,고)를 선정하여 집중 지원함으로써 교육, 문화, 복지 수준을 높이고 교육격차를 해소합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001120&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00006076",
  "name": "제주 청년 희망충전 월세 지원",
  "provider": "local",
  "views": 19662,
  "sidoName": "제주특별자치도",
  "sigunguName": null,
  "department": "제주특별자치도 건설주택국 주택토지과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "- 국토교통부 「청년월세 한시 특별지원」 사업 대상자인 청년기본법(19~34세)상 청년에서 제외되는 도 청년 기본조례상 청년(35~39세)에 의한 청년에 임차료를 제공하여 주거비 부담 경감",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006076&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-11"
 },
 {
  "id": "WLF00000059",
  "name": "희망복지지원단 통합사례관리",
  "provider": "central",
  "views": 19487,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "정신건강",
   "생활지원",
   "주거",
   "일자리",
   "안전·위기",
   "보호·돌봄"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "지역주민의 다양한 욕구에 맞춤형 서비스를 연계, 제공함으로써 지역주민의 안정적인 삶을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000059&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001108",
  "name": "주택담보노후연금보증",
  "provider": "central",
  "views": 19401,
  "sidoName": null,
  "sigunguName": null,
  "department": "금융위원회",
  "targets": [],
  "lifeStages": [
   "middle-age",
   "senior"
  ],
  "themes": [
   "생활지원",
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "노후생활에 어려움을 겪는 노인에 대해 보유하고 있는 주택을 담보로 매월 일정금액의 대출금을 연금형식으로 지급하여 안정적인 노후 생활을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001108&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004012",
  "name": "중증장애인 의료비 지원",
  "provider": "local",
  "views": 19284,
  "sidoName": "제주특별자치도",
  "sigunguName": "서귀포시",
  "department": "제주특별자치도 서귀포시 복지위생국 장애인복지과",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문",
   "우편"
  ],
  "onlineApply": null,
  "summary": "ㅇ 장애로 인하여 의료비 지출이 높은 중증장애인의 의료비를 지원함으로써 장애인과 그 가족의 정신적 고통과 경제적 부담을 경감\nㅇ 경제적 조건 없이 의료비를 지원하여 중증 장애인의 소외감 해소",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004012&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-05"
 },
 {
  "id": "WLF00002402",
  "name": "장수수당",
  "provider": "local",
  "views": 19194,
  "sidoName": "제주특별자치도",
  "sigunguName": "제주시",
  "department": "제주특별자치도 제주시 복지위생국 노인복지과",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "경로 효친하는 사회 분위기를 조성하고, 노인들의 노후생활의 안정을 도모하기 위하여 80세 이상 노인에게 장수수당 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002402&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-11"
 },
 {
  "id": "WLF00000098",
  "name": "국가유공자재가복지지원",
  "provider": "central",
  "views": 18984,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "주",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "국가유공자 등 보훈대상자의 안락하고 영예로운 노후 생활을 보장하기 위해 재가복지 서비스를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000098&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004605",
  "name": "참전명예수당 및 사망한 참전유공자 배우자 수당 및 사망위로금",
  "provider": "local",
  "views": 18864,
  "sidoName": "경상북도",
  "sigunguName": "경주시",
  "department": "경상북도 경주시 시민행정국 복지정책과",
  "targets": [
   "veteran"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "분기",
  "applyMethods": [
   "방문",
   "우편"
  ],
  "onlineApply": null,
  "summary": "6.25전쟁 및 월남전쟁에 참전한 참전유공자 및 사망한 참전유공자의 배우자에 대한 예우 및 처우개선",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004605&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00000054",
  "name": "국가보훈대상자 보훈장학금",
  "provider": "central",
  "views": 18739,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "반기",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "보훈관계 법령상 학비가 면제되지 않는 대학원 재학 국가유공자, 5·18민주유공자, 보훈보상대상자 본인 등에 대해 장학지원을 하여 면학의욕을 고취합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000054&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004104",
  "name": "어린이집차액보육료지원",
  "provider": "local",
  "views": 18645,
  "sidoName": "전남광주통합특별시",
  "sigunguName": null,
  "department": "전남광주통합특별시 여성가족국 여성가족과",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "□ 사업개요(광주권역)\n  ❍ 지원대상: 민간·가정 등 정부 미지원 시설 이용 만3~5세 아동\n    - (제외) 외국인 국적 아동\n  ❍ 지 원 액: 정부지원보육료와 각 시설별 수납한도액 단가의 차액\n    ※ 유형별·연령별 지원액은 보육정책위원회에서 각 시설별 수납한도액 결정 (‘23. 1월말 경) 후 별도 통보(예정)\n  ❍ 지급기준일: 매월 1일\n  ❍ 지원절차: 아이행복카드사업 적용(보건복지부)\n    - 생성일: 매월 1일, 24시 기준(바우처)\n    - 지급방법: 입·퇴소일 기준으로 일할 계산\n  ❍ 보건복지부 보육사업안내의 보육료 지원기준 준용\n    - 어린이집: 보육료 결제(아이행복카드)\n    - 자치구\n      · 사업비를 지급일 전월 25일까지 지정 계좌로 예탁, 보육통합시스템 수수료\n        차감 설정, 생성내역 확인(타 시도 주민등록 아동 지급 제외 처리)\n\n □ 예 산 액 : 3,446백만원(시비 70%, 구비 30%)",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004104&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-22"
 },
 {
  "id": "WLF00001136",
  "name": "보험급여(건강보험 장애인보조기기)",
  "provider": "central",
  "views": 18616,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "건강보험가입자 및 피부양자 중 「장애인복지법」에 따라 등록한 장애인이 장애인보조기기를 구입할 경우 구입금액 일부를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001136&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003186",
  "name": "양육비 이행 원스톱 종합서비스",
  "provider": "central",
  "views": 18552,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [
   "infant",
   "child",
   "teen"
  ],
  "themes": [
   "법률"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "양육비를 받지 못해 어려움을 겪고 있는 미혼, 이혼 한부모가 양육비를 원활하게 지급받을 수 있도록 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003186&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00006313",
  "name": "건강보험 임신출산 진료비(국민행복카드)",
  "provider": "central",
  "views": 18540,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "infant",
   "pregnancy"
  ],
  "themes": [
   "임신·출산",
   "보육"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "임산부와 영유아의 의료비 부담을 경감하여 출산 친화적 환경을 조성하고, 주기적인 산전 진찰로 건강한 태아를 분만할 수 있도록 임산부와 2세 미만 영유아의 진료비 등의 본인부담금(급여·비급여) 결제에 사용할 수 있는 이용권을 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006313&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000030",
  "name": "육아종합지원서비스 제공",
  "provider": "central",
  "views": 18515,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [
   "보육"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "분기",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "영유아와 부모를 위한 종합적인 육아종합서비스를 제공하는 육아종합지원센터 운영비를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000030&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003067",
  "name": "저소득주민 생활안정지원(긴급생계,긴급의료)",
  "provider": "local",
  "views": 18474,
  "sidoName": "경상남도",
  "sigunguName": "양산시",
  "department": "경상남도 양산시 문화복지국 주민생활지원과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "저소득주민의 생활안정 도모하고 자립자활 증진에 기여",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003067&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-08-01"
 },
 {
  "id": "WLF00003820",
  "name": "아동급식비 지원(학기중 토공휴일)",
  "provider": "local",
  "views": 18407,
  "sidoName": "울산광역시",
  "sigunguName": "남구",
  "department": "울산광역시 남구 복지교육국 여성가족과",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "teen",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "실물바우처"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "우편",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "저소득 가정의 아동들이 건강하게 자랄 수 있도록 급식지원 등을 통해 결식예방 및 영양개선",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003820&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00003169",
  "name": "정신건강복지센터 운영",
  "provider": "central",
  "views": 18329,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "정신건강"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "일반인은 물론 아동&middot;청소년에게 발생할 수 있는 정신건강문제의 예방, 조기발견 및 상담, 치료, 재활을 통해 사회복귀를 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003169&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005765",
  "name": "전라남도 청년부부 결혼축하금 지원사업",
  "provider": "local",
  "views": 18302,
  "sidoName": "전남광주통합특별시",
  "sigunguName": null,
  "department": "전남광주통합특별시 인구청년이민국 청년희망과",
  "targets": [],
  "lifeStages": [
   "middle-age",
   "teen",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "도내 거주중인 청년층의 결혼 초기 경제적 부담 완화 및 안정적인 지역 정착을 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005765&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00003276",
  "name": "일반 상환 학자금대출",
  "provider": "central",
  "views": 18255,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age"
  ],
  "themes": [
   "교육",
   "서민금융"
  ],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "반기",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "학자금이 필요한 대학(원)생 및 학점은행제 학습자에게 저리로 학자금대출을 지원하여 균등한 고등교육 기회를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003276&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003597",
  "name": "아동급식지원",
  "provider": "local",
  "views": 18201,
  "sidoName": "강원특별자치도",
  "sigunguName": null,
  "department": "강원특별자치도 인제군 행정복지국 체육청소년과",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "teen",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "결식이 우려되는 저소득층 아동에게 가정환경 및 선호에 맞는 효율적인 급식제공으로 결식 우려 해소",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003597&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-11"
 },
 {
  "id": "WLF00002391",
  "name": "의료급여수급권자 무료진료비 지원",
  "provider": "local",
  "views": 18149,
  "sidoName": "대구광역시",
  "sigunguName": "달서구",
  "department": "대구광역시 달서구 복지문화국 복지정책과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "기초의료급여수급권자가 입원 시 발생되는 본인부담금 및 비급여 진료비 지원(1인 1회, 50만원 한도)",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002391&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00002254",
  "name": "강원특별자치도 육아기본수당 지원사업",
  "provider": "local",
  "views": 18117,
  "sidoName": "강원특별자치도",
  "sigunguName": null,
  "department": "강원특별자치도 복지보건국 복지정책과",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "infant",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "모바일",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "육아부담경감을 통한 출산장려 및 저출산 극복",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002254&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-11"
 },
 {
  "id": "WLF00000052",
  "name": "인문100년장학금",
  "provider": "central",
  "views": 18112,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [
   "생활지원",
   "교육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "반기",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "인문사회계열 우수학생에게 학자금을 지원하여 인문학 소양을 갖춘 인재를 양성할 수 있도록 장학금을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000052&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001131",
  "name": "국가보훈대상자 지원(수업료면제)",
  "provider": "central",
  "views": 18100,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "반기",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "국가유공자와 그 유족 또는 가족이 교육기관에서 필요한 교육을 받음으로써 건전한 사회인으로 자립할 수 있도록 교육비를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001131&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00006034",
  "name": "다자녀가정 특별지원(대학등록금)",
  "provider": "local",
  "views": 18055,
  "sidoName": "강원특별자치도",
  "sigunguName": null,
  "department": "강원특별자치도 복지보건국 복지정책과",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "다자녀가정에 대한 경제적 지원을 통해 자녀양육 부담 경감 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006034&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-11"
 },
 {
  "id": "WLF00005482",
  "name": "저소득층 자녀 안경구입비 지원",
  "provider": "local",
  "views": 18003,
  "sidoName": "제주특별자치도",
  "sigunguName": null,
  "department": "제주특별자치도 복지가족국 복지정책과",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "teen",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "◇ 저소득층 자녀 중 시력 교정이 필요한 학생에게 안경구입비 지원 \n ◇ 사전 시력 저하 예방 및 경제적 부담 완화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005482&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-25"
 },
 {
  "id": "WLF00001154",
  "name": "중증장애인근로자 출퇴근비용 지원 사업",
  "provider": "central",
  "views": 17944,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "일자리"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "중증장애인 근로자에게 출퇴근비용을 지원하여 중증장애인의 근로의욕을 고취하고 안정적인 직업생활 유지를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001154&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002547",
  "name": "저소득층 맞춤형지원 사업",
  "provider": "local",
  "views": 17847,
  "sidoName": "울산광역시",
  "sigunguName": "동구",
  "department": "울산광역시 동구 복지문화국 복지지원과",
  "targets": [],
  "lifeStages": [
   "senior",
   "middle-age",
   "child",
   "infant",
   "teen",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "동구주민으로서 질병, 실직, 노령, 장애, 이혼 등으로 생활에 어려움을 겪고 있는 저소득층에 대하여 기본적인 생계유지를 위해 맞춤형으로 지원함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002547&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-14"
 },
 {
  "id": "WLF00004633",
  "name": "한부모가족동절기수당(난방비)지원",
  "provider": "local",
  "views": 17720,
  "sidoName": "경기도",
  "sigunguName": "안산시",
  "department": "경기도 안산시 복지국 여성보육과",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "한부모가족의 동절기 난방비 부담을 완화하여 생활안정 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004633&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00001755",
  "name": "장애인거주시설 무연고 기초수급자 간병비 지원",
  "provider": "local",
  "views": 17701,
  "sidoName": "제주특별자치도",
  "sigunguName": "제주시",
  "department": "제주특별자치도 제주시 복지위생국 장애인복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "middle-age",
   "senior",
   "infant",
   "child",
   "youth",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷",
   "우편"
  ],
  "onlineApply": null,
  "summary": "기초생활보장수급자 등 저소득층이 병원 입원 시 간병해 줄 보호자가 없는 경우 간병인을 지원함으로써 안심하고 진료를 받을 수 있는 환경조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001755&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-28"
 },
 {
  "id": "WLF00001146",
  "name": "시설 퇴소청소년 자립지원수당 지급",
  "provider": "central",
  "views": 17550,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [],
  "lifeStages": [
   "teen",
   "youth"
  ],
  "themes": [
   "생활지원",
   "보호·돌봄"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "청소년쉼터 퇴소 및 청소년자립지원관 사례관리 중 또는 사례관리가 종료된 청소년에게 자립지원수당을 지급하여 안정적인 자립기반 마련을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001146&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004300",
  "name": "저소득층집수리사업",
  "provider": "local",
  "views": 17540,
  "sidoName": "경상북도",
  "sigunguName": "울릉군",
  "department": "경상북도 울릉군 주민복지과",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "child",
   "middle-age",
   "youth",
   "senior",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "저소득 취약계층의 노후 불량주택을 개보수하여 열악한 주거환경을 개선함으로써 주거복지 증진 및 삶의 질 향상 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004300&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-15"
 },
 {
  "id": "WLF00000837",
  "name": "다문화가족 지원사업",
  "provider": "central",
  "views": 17458,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "multicultural"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "일자리",
   "교육"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "다문화가족의 안정적인 정착과 가족생활을 지원하기 위해 가족교육/상담/한국어 문화프로그램, 자녀지원, 직업교육 등 서비스를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000837&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002425",
  "name": "청년 희망디딤돌 통장 개설 운영",
  "provider": "local",
  "views": 17383,
  "sidoName": "전남광주통합특별시",
  "sigunguName": null,
  "department": "전남광주통합특별시 인구청년이민국 청년희망과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "우편"
  ],
  "onlineApply": null,
  "summary": "도내 일하는 청년의 자산형성 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002425&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00001180",
  "name": "학대피해아동 쉼터 설치 및 운영",
  "provider": "central",
  "views": 17332,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "정신건강",
   "문화·여가",
   "안전·위기",
   "보호·돌봄"
  ],
  "payTypes": [
   "시설입소"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "학대피해아동에게 보호와 치료, 양육서비스 등을 제공함으로써 심신의 회복과 원가정 복귀를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001180&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00006111",
  "name": "부산형 산후조리비 지원사업",
  "provider": "local",
  "views": 17114,
  "sidoName": "부산광역시",
  "sigunguName": null,
  "department": "부산광역시 부산진구 보건소",
  "targets": [],
  "lifeStages": [
   "youth",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "-출산, 산후 회복 등에 소요되는 출산 가정의 경제적 부담을 완화하고 산모의 건강지원 및 출산 장려 분위기 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006111&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-10-22"
 },
 {
  "id": "WLF00002784",
  "name": "장수수당",
  "provider": "local",
  "views": 17018,
  "sidoName": "경기도",
  "sigunguName": "안산시",
  "department": "경기도 안산시 복지국 노인복지과",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "경로효친의 사회적 분위기를 조성하고, 장수노인의 노후생활 안정을 지원하기 위함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002784&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00002559",
  "name": "어린이집보육교사장기근속수당지원",
  "provider": "local",
  "views": 16961,
  "sidoName": "대구광역시",
  "sigunguName": "중구",
  "department": "대구광역시 중구 관광복지국 복지정책과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "동일한 어린이집에 장기 근무하는 보육 교사에게 장기 근속 수당을 지급하여 보육 서비스 질을 높임.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002559&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00000031",
  "name": "노후준비서비스",
  "provider": "central",
  "views": 16886,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "국민의 체계적 노후준비와 건강한 노후생활을 위해 재무·건강·여가·대인관계 등 분야별 종합적인 정보와 서비스를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000031&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005853",
  "name": "장애인 개인예산제 운영",
  "provider": "central",
  "views": 16840,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "장애인의 선택권 강화, 서비스 칸막이를 제거하여 탄력적으로 서비스를 이용할 수 있도록 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005853&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003229",
  "name": "긴급복지 사회복지시설이용지원",
  "provider": "central",
  "views": 16839,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "보호·돌봄"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "생계곤란 등의 위기상황에 처하여 도움이 필요한 사람을 일시적으로 신속하게 지원함으로써 이들이 위기상황에서 벗어나도록 합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003229&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003627",
  "name": "산모신생아건강관리사예외지원 확대실시사업",
  "provider": "local",
  "views": 16829,
  "sidoName": "충청북도",
  "sigunguName": "제천시",
  "department": "충청북도 제천시 보건소 건강관리과",
  "targets": [],
  "lifeStages": [
   "teen",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "산모신생아 건강증진 및 출산가정의 경제적 부담경감(아이낳기 좋은 환경조성)\n대상자 가정에서 방문산후도우미 서비스를 이용함으로써 신생아 집단감염 차단\n출산장려 정책 확대로 저출산 극복과 사회적 일자리 창출",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003627&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00006195",
  "name": "국민기초생활수급자 세대 수도요금 감면",
  "provider": "local",
  "views": 16821,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 서울아리수본부 본부 요금관리부 요금제도과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "감면"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "서울특별시 국민기초생활수급자에 대한 수도(상하수도)요금 감면제도를 시행하여 국민기초생활수급자 가구의 생활안정을 도모하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006195&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-20"
 },
 {
  "id": "WLF00004302",
  "name": "취약계층냉난방비 지원사업",
  "provider": "local",
  "views": 16754,
  "sidoName": "경상북도",
  "sigunguName": "울릉군",
  "department": "경상북도 울릉군 주민복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "폭염대비 취약계층 냉방용품구입 및 동절기 취약계층 난방연료비 지원을 통한 계절적 취약계층 복지증진 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004302&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-29"
 },
 {
  "id": "WLF00003251",
  "name": "산림보호지원단",
  "provider": "central",
  "views": 16711,
  "sidoName": null,
  "sigunguName": null,
  "department": "산림청",
  "targets": [
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "일자리"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "산림보호 분야의 안정적인 일자리 창출로 취업 취약계층을 지원하고, 불법산림훼손 계도, 감시 및 산림정화활동을 통해 건전한 산림생태계를 유지합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003251&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001170",
  "name": "장기요양급여 이용지원",
  "provider": "central",
  "views": 16704,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "신체건강",
   "보호·돌봄"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "요양등급 판정을 받은 저소득 고령 국가유공자 등에 대하여 재가요양기관이나 장기요양기관 등의 서비스 이용에 따른 본인부담금의 일부를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001170&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000028",
  "name": "공동육아나눔터 운영",
  "provider": "central",
  "views": 16671,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [],
  "lifeStages": [
   "infant",
   "child"
  ],
  "themes": [
   "보육"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "육아 공간 및 돌봄 프로그램 제공, 이웃 간 자녀 돌봄 품앗이 활동 지원을 통해 양육 부담을 경감하고 돌봄친화적 분위기를 조성합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000028&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002993",
  "name": "저소득층 성인여성 위생용품 지급",
  "provider": "local",
  "views": 16628,
  "sidoName": "경기도",
  "sigunguName": "오산시",
  "department": "경기도 오산시 복지교육국 가족보육과",
  "targets": [
   "single-parent",
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "반기",
  "applyMethods": [
   "방문",
   "우편"
  ],
  "onlineApply": null,
  "summary": "저소득 성인여성 (만25~50세)에게 위생용품(생리대)을 지급하여 경제적 부담 경감을 통한 생활안정 지원 및 여성의 건강과 인권을 증진하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002993&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00000505",
  "name": "시간연장보육시설 지원",
  "provider": "local",
  "views": 16590,
  "sidoName": "경상남도",
  "sigunguName": "남해군",
  "department": "경상남도 남해군 행정복지국 주민행복과",
  "targets": [],
  "lifeStages": [
   "child",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "시간연장 보육교사에 대한 인센티브 제공으로 취약계증 보육 강화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000505&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-15"
 },
 {
  "id": "WLF00004451",
  "name": "장애인 하이패스 감면단말기 보급 사업",
  "provider": "local",
  "views": 16585,
  "sidoName": "경상북도",
  "sigunguName": null,
  "department": "경상북도 복지건강국 장애인복지과",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "middle-age",
   "youth",
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "전화"
  ],
  "onlineApply": null,
  "summary": "장애인용 하이패스 감면단말기 보급사업을 추진하여 장애인의 고속도로 이용 편의증진을 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004451&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-28"
 },
 {
  "id": "WLF00004976",
  "name": "다자녀가정 고등학교 입학축하금 지원",
  "provider": "local",
  "views": 16553,
  "sidoName": "대구광역시",
  "sigunguName": null,
  "department": "대구광역시 청년여성교육국 출산보육과",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "둘째아 이상 고등학교 입학 자녀에게 입학축하금을 지원하여 경제적 부담 경감과 출산지원 정책에 대한 시민의 체감도 향상에 기여하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004976&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-08"
 },
 {
  "id": "WLF00003280",
  "name": "전립선등 노인성질환 예방관리",
  "provider": "central",
  "views": 16458,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "middle-age",
   "senior"
  ],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "현물지급",
   "프로그램/서비스(서비스)"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "고령화와 함께 급증하고 있는 전립선 질환 등을 조기에 진단하고, 예방과 관리를 위한 교육 및 홍보를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003280&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003163",
  "name": "국민기초생활보장수급자 수도요금 감면",
  "provider": "local",
  "views": 16410,
  "sidoName": "강원특별자치도",
  "sigunguName": "철원군",
  "department": "강원특별자치도 철원군 주민생활지원실",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "teen",
   "youth",
   "infant",
   "child",
   "middle-age",
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "감면"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "생활이 어려운 기초생활수급자생계, 의료, 주거급여 수급자)에게 수도요금을 감면하여 최저생활을 보장하는 것을 목적으로 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003163&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-13"
 },
 {
  "id": "WLF00003254",
  "name": "청소년방과후아카데미운영지원",
  "provider": "central",
  "views": 16395,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "생활지원",
   "교육"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "방과후 돌봄이 필요한 취약계층 청소년에게 체험활동, 학습지원, 급식, 상담 등 종합서비스 제공을 통한 건강한 성장과 자립을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003254&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001904",
  "name": "아동급식비 지원(결식아동급식)",
  "provider": "local",
  "views": 16248,
  "sidoName": "강원특별자치도",
  "sigunguName": "양양군",
  "department": "강원특별자치도 양양군 교육체육과",
  "targets": [
   "single-parent",
   "low-income"
  ],
  "lifeStages": [
   "child",
   "infant",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "주",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "저소득 가정의 아동들이 건강하게 자랄 수 있도록 급식지원 등을 통해 결식예방 및 영양개선",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001904&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-12"
 },
 {
  "id": "WLF00005403",
  "name": "다자녀 양육바우처 지원",
  "provider": "local",
  "views": 16207,
  "sidoName": "경기도",
  "sigunguName": "과천시",
  "department": "경기도 과천시 경제복지국 가족아동과",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [
   "child"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "분기",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "만혼화 현상과 함께 출산․양육비용 등의 경제적 부담으로 인해 출산을 기피하는 경향이 나타나고 있음.\n이러한 경향은 다자녀가정 형성을 저해하는 주요 원인으로 작용하고 있어, 다자녀가정에 대한 양육비 지원을 통해 자녀 양육으로 인한 경제적 부담을 완화하고 저출산 및 인구감소에 대응하기 위함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005403&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-19"
 },
 {
  "id": "WLF00002195",
  "name": "출산장려금+출산육아지원금 지원",
  "provider": "local",
  "views": 16189,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "나주시",
  "department": "전남광주통합특별시 나주시 보건소 보건행정과",
  "targets": [],
  "lifeStages": [
   "infant",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급",
   "지역화폐"
  ],
  "cycle": "반기",
  "applyMethods": [
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "출생가정에 경제적 지원을 통한 양육부담 경감, 출생친화적 환경 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002195&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00004847",
  "name": "용인시 입학준비금 지원",
  "provider": "local",
  "views": 15985,
  "sidoName": "경기도",
  "sigunguName": "용인시",
  "department": "경기도 용인시 교육문화체육관광국 교육청소년과",
  "targets": [],
  "lifeStages": [
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "모바일",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "초‧중‧고등학교 신입생 가정의 교육비 부담을 경감하고 교육복지의 공공성 강화하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004847&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00002495",
  "name": "저소득 한부모가족 자립지원(대학신입생등록금)",
  "provider": "local",
  "views": 15893,
  "sidoName": "제주특별자치도",
  "sigunguName": "서귀포시",
  "department": "제주특별자치도 서귀포시 복지위생국 여성가족과",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [
   "youth",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "저소득 한부모가족 자녀의 대학 입학에 따른 경제적 부담을 덜어주기 위하여 입학지원금 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002495&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-08"
 },
 {
  "id": "WLF00005116",
  "name": "출생아 기저귀 (확대)지원사업",
  "provider": "local",
  "views": 15808,
  "sidoName": "충청북도",
  "sigunguName": "괴산군",
  "department": "충청북도 괴산군 보건소 건강증진과",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "분기",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "고물가 현상 등으로 양육에 소요되는 경제적 부담이 증가하고 있어 기저귀 구매비용 지원대상 확대를 통해 비용을 경감하고 양육친화적 환경을 조성하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005116&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-28"
 },
 {
  "id": "WLF00003581",
  "name": "발달재활서비스지원 (시자체사업)",
  "provider": "local",
  "views": 15678,
  "sidoName": "강원특별자치도",
  "sigunguName": "춘천시",
  "department": "강원특별자치도 춘천시 복지국 장애인복지과",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "장애아동 재활치료 바우처사업(국고보조사업)에서 소득기준초과로 제외된 장애아동의 재활치료비용을 지원함으로써 장애아동의 재활을 지원하고 장애아동 가정의 경제적 부담을 경감하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003581&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-06-19"
 },
 {
  "id": "WLF00005894",
  "name": "생계급여수급자 대학생 월세 및 기숙사비 지원",
  "provider": "local",
  "views": 15660,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "해남군",
  "department": "전남광주통합특별시 해남군 복지정책과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "기존 주거급여지원으로 보호받지 못하거나 주거급여 지원의 한도로 인해 어려움이 있는 생계급여 수급가구의 대학생에게 월세 및 기숙사비를 지원함으로써 경제적 부담 완화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005894&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00002983",
  "name": "기초생활수급자 쓰레기봉투 지원",
  "provider": "local",
  "views": 15607,
  "sidoName": "경상남도",
  "sigunguName": "창원시",
  "department": "경상남도 창원시 복지여성보건국 사회복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "teen",
   "youth",
   "child",
   "infant",
   "middle-age",
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "분기",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "기초생활수급자에게(생계.의료) 쓰레기봉투를 무상지원하여 쾌적한 주거환경 유지",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002983&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-05"
 },
 {
  "id": "WLF00001113",
  "name": "(특수교육대상자) 치료지원서비스",
  "provider": "central",
  "views": 15528,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "infant",
   "child",
   "teen"
  ],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "특수교육대상자의 교육을 효율적으로 지원하기 위해 관련 서비스를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001113&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005363",
  "name": "신생아 출생지원금 지원",
  "provider": "local",
  "views": 15497,
  "sidoName": "충청남도",
  "sigunguName": "당진시",
  "department": "충청남도 당진시 문화복지국 여성가족과",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "- 신생아 출생을 축하하고 산모와 신생아의 건강관리 도모\n- 생애초기 아동양육에 따른 경제적 부담 경감",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005363&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-05-31"
 },
 {
  "id": "WLF00005566",
  "name": "아동건강체험활동비 지원",
  "provider": "local",
  "views": 15487,
  "sidoName": "제주특별자치도",
  "sigunguName": null,
  "department": "제주특별자치도 복지가족국 아동보육청소년과",
  "targets": [],
  "lifeStages": [
   "child"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "신체적 정서적으로 심화되는 아동의 다양한 건강 문제 해결을 통한 아동의 건강한 성장과 활동을 돕기 위해 최소한의 필요 경비를 지원하는 사업입니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005566&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-31"
 },
 {
  "id": "WLF00002404",
  "name": "저소득층 기저귀·조제분유 지원사업",
  "provider": "local",
  "views": 15429,
  "sidoName": "충청북도",
  "sigunguName": "괴산군",
  "department": "충청북도 괴산군 보건소 건강증진과",
  "targets": [
   "multi-child",
   "disability",
   "single-parent",
   "low-income"
  ],
  "lifeStages": [
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "분기",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "저소득층 영아(0~24개월)가정의 육아 필수재인 기저귀 및 조제분유 지원을 통해 경제적 부담 경감 및 아이 낳기 좋은 환경을 조성하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002404&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-28"
 },
 {
  "id": "WLF00003256",
  "name": "외국인근로자 등 의료지원",
  "provider": "central",
  "views": 15326,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "건강보험, 의료급여 등 각종 의료보장 제도에 의해 지원을 받을 수 없는 외국인근로자 등을 대상으로 입원·수술이 필요한 경우에 의료비를 지원하여 최소한의 건강한 삶의 질 보장합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003256&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005038",
  "name": "청년13(일+삶)통장 지원 사업",
  "provider": "local",
  "views": 15323,
  "sidoName": "전남광주통합특별시",
  "sigunguName": null,
  "department": "전남광주통합특별시 교육청년국 청년정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "광주 근로정년의 소액단기 저축지원 및 금융역량강화를 통한 청년의 경제적 자립과 생활안정 지원 등",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005038&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00003905",
  "name": "신입생 입학준비금 지원",
  "provider": "local",
  "views": 15237,
  "sidoName": "서울특별시",
  "sigunguName": "강북구",
  "department": "서울특별시 강북구 행정관리국 교육지원과",
  "targets": [],
  "lifeStages": [
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "우편",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "교육의 공공성을 강화하고 학부모의 교육비 부담경감 및 보편적 교육복지의 확대 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003905&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-06"
 },
 {
  "id": "WLF00000096",
  "name": "제대군인전직지원금",
  "provider": "central",
  "views": 15169,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [
   "middle-age"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "실업상태의 군인연금 비대상자에게 제대군인 전직지원금을 지급하여 중·장기복무 제대군인의 생활안정을 도모하고 취업과 창업을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000096&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004712",
  "name": "평택시 청년 전월세보증금 대출이자 지원",
  "provider": "local",
  "views": 15139,
  "sidoName": "경기도",
  "sigunguName": "평택시",
  "department": "경기도 평택시 기획항만경제실 청년정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "반기",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "평택시에 거주하는 청년의 주거비 부담 완화 및 사회진입을 지원하여 청년들이 정주하고 싶은 도시 평택을 만들고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004712&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-19"
 },
 {
  "id": "WLF00003923",
  "name": "임산부 가사돌봄 지원사업",
  "provider": "local",
  "views": 15136,
  "sidoName": "서울특별시",
  "sigunguName": "성동구",
  "department": "서울특별시 성동구 복지국 성평등가족과",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "임산부 및 출산가정에 가사서비스를 제공함으로써 안전한 출산을 도모하고, 가사노동의 부담을 경감하고 일·가정 양립 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003923&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00001451",
  "name": "청년 어학·자격시험 응시료 지원사업",
  "provider": "local",
  "views": 15084,
  "sidoName": "경기도",
  "sigunguName": null,
  "department": "경기도 안양시 청년정책관",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "청년의 구직활동에 필요한 어학시험 응시료 지원을 통해 경제적 부담을 경감시키고 취업률 향상 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001451&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-06"
 },
 {
  "id": "WLF00005024",
  "name": "장애인 자립지원 시범사업",
  "provider": "central",
  "views": 15048,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "youth",
   "middle-age"
  ],
  "themes": [
   "신체건강",
   "생활지원",
   "주거",
   "일자리"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)",
   "기타"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "지역사회 자립을 희망하는 장애인 대상 주택 및 주거서비스 지원을 통해 장애인의 지역사회 자립 및 안정적 정착을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005024&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005171",
  "name": "광주청년구직활동지원사업",
  "provider": "local",
  "views": 15045,
  "sidoName": "전남광주통합특별시",
  "sigunguName": null,
  "department": "전남광주통합특별시 교육청년국 청년정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "지역 미취업 청년들의 다양한 구직활동에 필요한 비용을 지원하여 청년의 지역사회 진입과 자립을 촉진\n(기존사업명 광주청년드림수당 및 활동지원으로, 2025년도부터 사업명 변경)",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005171&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-25"
 },
 {
  "id": "WLF00004863",
  "name": "대상포진 예방접종 지원사업",
  "provider": "local",
  "views": 14979,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "강진군",
  "department": "전남광주통합특별시 강진군 보건소",
  "targets": [],
  "lifeStages": [
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "만50세 이상 어르신에게 대상포진 예방접종 비용을 지원하여 질병에 따른 경제적 부담을 줄이고 군민 건강증진 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004863&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-28"
 },
 {
  "id": "WLF00001084",
  "name": "여성긴급전화 1366센터 운영 지원",
  "provider": "central",
  "views": 14953,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "정신건강",
   "안전·위기",
   "법률"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "가정폭력·성폭력·스토킹 등 폭력 피해자에 대해 신고접수 및 긴급상담, 관련 기관 및 시설과의 연계, 피해자에 대해 긴급구조를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001084&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004313",
  "name": "출산지원금 지급",
  "provider": "local",
  "views": 14872,
  "sidoName": "경기도",
  "sigunguName": "부천시",
  "department": "경기도 부천시 복지국 여성다문화과",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "출산 가정의 경제적 부담 완화, 지역 인구 유출 억제 및 정주 여건 개선을 위하여 출산지원금 지급",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004313&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00003804",
  "name": "저소득가구 동절기 난방비 지원사업",
  "provider": "local",
  "views": 14843,
  "sidoName": "강원특별자치도",
  "sigunguName": "화천군",
  "department": "강원특별자치도 화천군 주민복지과",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "기초생활보장수급자를 포함한 저소득층세대에 난방연료별 난방비를 적기에 제공함으로써 저소득층의 안전한 월동을 유도하고 삶의 질 향상에 기여",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003804&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-19"
 },
 {
  "id": "WLF00005468",
  "name": "임산부 교통비 지원사업",
  "provider": "local",
  "views": 14828,
  "sidoName": "인천광역시",
  "sigunguName": null,
  "department": "인천광역시 여성가족국 영유아정책과",
  "targets": [],
  "lifeStages": [
   "youth",
   "pregnancy",
   "teen",
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "현금지급",
   "지역화폐"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "모바일앱",
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "교통약자인 임산부에게 교통비 지원을 통해 건강한 출산 도모 및 경제적 부담 완화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005468&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00005866",
  "name": "서울시 1인 자영업자 등 배우자 출산휴가급여 지원",
  "provider": "local",
  "views": 14793,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 여성가족실 저출생담당관",
  "targets": [],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "자영업자 등의 모성보호와 경제적 부담 완화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005866&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-03-12"
 },
 {
  "id": "WLF00003223",
  "name": "고난도 보호대상아동 맞춤형 사례관리서비스",
  "provider": "central",
  "views": 14770,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "child"
  ],
  "themes": [
   "정신건강",
   "생활지원",
   "교육"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "경계선지능아동에 특화된 자립지원서비스를 제공하여 자립능력을 향상하고, 전문인력 양성을 통해 보호대상아동에게 양질의 맞춤형 서비스를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003223&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001101",
  "name": "폭력피해자 주거지원 사업",
  "provider": "central",
  "views": 14747,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "infant",
   "child",
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "주거",
   "안전·위기"
  ],
  "payTypes": [
   "시설입소",
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "가정폭력, 성폭력 등 폭력피해자들의 자립을 지원하고 사회 적응 여건을 조성하고자, 폭력 피해여성과 그 가족들이 공동으로 생활할 수 있는 주거 공간을 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001101&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005647",
  "name": "천안시 임산부 교통비 지원사업",
  "provider": "local",
  "views": 14729,
  "sidoName": "충청남도",
  "sigunguName": "천안시",
  "department": "충청남도 천안시 복지문화국 여성가족과",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "임산부에게 이동 편의를 제공, 출산가정의 경제적 부담을 경감",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005647&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00001834",
  "name": "다자녀가정 입학준비금(중학생) 지원사업",
  "provider": "local",
  "views": 14724,
  "sidoName": "대구광역시",
  "sigunguName": "달서구",
  "department": "대구광역시 달서구 복지국 가족정책과",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "둘째 자녀 이상 가정에 중학생 입학준비금을 지원하여 양육과 교육에 소요되는 경제적 부담을 경감함으로써 출산장려 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001834&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-16"
 },
 {
  "id": "WLF00004890",
  "name": "아빠 육아휴직 장려금 지원",
  "provider": "local",
  "views": 14709,
  "sidoName": "경기도",
  "sigunguName": "광명시",
  "department": "경기도 광명시 돌봄복지국 성평등가족과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "남성 근로자의 육아휴직을 장려하고 양육에 따른 경제적 부담을 완화하여 일과 가정생활의 양립 및 가족 친화적인 사회환경 조성을 목적",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004890&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-15"
 },
 {
  "id": "WLF00002555",
  "name": "청년사회진입 활동비 지원(부산 청년디딤돌카드+)",
  "provider": "local",
  "views": 14628,
  "sidoName": "부산광역시",
  "sigunguName": null,
  "department": "부산광역시 청년산학국 청년정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "미취업 청년들에게 구직활동 비용 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002555&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-04"
 },
 {
  "id": "WLF00002543",
  "name": "산모신생아 건강관리지원 확대(자체, 구 공공산후조리지원)",
  "provider": "local",
  "views": 14624,
  "sidoName": "대전광역시",
  "sigunguName": null,
  "department": "대전광역시 체육건강국 질병관리과",
  "targets": [],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "1. 건강보험료 기준중위소득 150%초과 출산가정에 건강관리사를 파견하여 산모의 산후 회복과 신생아의 양육을 지원\n2. 산모신생아 건강관리사 양성을 통해 사회적 일자리 창출\n3. 정부지원 산모신생아 건강관리지원사업 대상자 확대를 통해 출산가정의 경제적 부담을 경감하고, 안전한 산후조리 서비스 지원과 출산·양육에 대한 공동책임 실현",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": 150,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002543&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-11"
 },
 {
  "id": "WLF00004634",
  "name": "장애인활동지원서비스 서구 추가 사업",
  "provider": "local",
  "views": 14619,
  "sidoName": "대구광역시",
  "sigunguName": "서구",
  "department": "대구광역시 서구 복지생활국 사회복지과",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "법정급여로 제공되는 활동지원 시간 외에 추가로 필요하다고 인정되는 경우 구비로 활동지원시간을 추가 지원함으로써 장애인의 삶의 질을 높이고 장애인 가족의 돌봄 부담을 경감하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004634&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-08"
 },
 {
  "id": "WLF00004692",
  "name": "청년 주거금융지원(고양 청년둥지론) - 신청 마감",
  "provider": "local",
  "views": 14487,
  "sidoName": "경기도",
  "sigunguName": "고양시",
  "department": "경기도 고양시 일자리재정국 일자리정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "분기",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "청년 가구의 전세 및 반전세 임차보증금 대출 추천 및 이자 일부 지원하여 청년층의 주거비를 완화하고 청년에게 더 나은 주거환경 제공",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004692&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-13"
 },
 {
  "id": "WLF00005857",
  "name": "부산, 함께돌봄(부산형 통합돌봄)사업",
  "provider": "local",
  "views": 14418,
  "sidoName": "부산광역시",
  "sigunguName": null,
  "department": "부산광역시 사회복지국 복지정책과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "시민 누구나 사는 곳에서 건강하고 행복하게 생활할 수 있도록 가사ㆍ식사ㆍ일상생활지원 등 다양한 돌봄서비스를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005857&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-04-22"
 },
 {
  "id": "WLF00003555",
  "name": "차상위계층 건강보험료 지원",
  "provider": "local",
  "views": 14409,
  "sidoName": "경기도",
  "sigunguName": "구리시",
  "department": "경기도 구리시 복지문화국 복지정책과",
  "targets": [
   "single-parent",
   "low-income"
  ],
  "lifeStages": [
   "infant",
   "child",
   "middle-age",
   "senior",
   "youth",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "차상위계층(한부모 등) 중 건강보험료가 보건복지부가 정한 최저보험료 (2025년 최저보험료: 22,340원/ 매년 변경됨 )이하인 세대에  건강보험료를 지원하여 건강한 생활유지와 복지향상을 도모함을 목적으로  함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003555&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-08"
 },
 {
  "id": "WLF00004557",
  "name": "SOS 긴급복지 (인천형 긴급복지)",
  "provider": "local",
  "views": 14393,
  "sidoName": "인천광역시",
  "sigunguName": null,
  "department": "인천광역시 보건복지국 복지정책과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급",
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "전화",
   "방문"
  ],
  "onlineApply": null,
  "summary": "현행 법·제도로는 지원받기 어려운 갑작스러운 위기상황으로 생계유지가  곤란한 시민에게 필요한 복지서비스를 신속하게 지원하여 위기상황에서 벗어날 수 있도록 돕는 인천형 긴급복지 제도",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004557&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00005437",
  "name": "저소득층 자녀교육비 지원사업",
  "provider": "local",
  "views": 14383,
  "sidoName": "충청남도",
  "sigunguName": null,
  "department": "충청남도 기획조정실 고등교육정책담당관",
  "targets": [],
  "lifeStages": [
   "teen",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "실물바우처"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문",
   "우편"
  ],
  "onlineApply": null,
  "summary": "국가 교육복지 혜택에서 소외된 도내 저소득층 가구 자녀들의 교육 기회를 보장하고자 학습능력개발비, 교재비를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005437&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-06-30"
 },
 {
  "id": "WLF00004703",
  "name": "미혼모부 양육지원",
  "provider": "local",
  "views": 14374,
  "sidoName": "서울특별시",
  "sigunguName": "강서구",
  "department": "서울특별시 강서구 복지가족국 출산보육과",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "미혼모부의 양육부담 완화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004703&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-15"
 },
 {
  "id": "WLF00006264",
  "name": "생활안정자금(융자)(이차보전)",
  "provider": "central",
  "views": 14295,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [
   "multi-child",
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "일자리"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "근로자, 특수형태근로종사자, 1인 자영업자가 혼례·자녀 양육 등을 대출할 대, 대출 이자의 일부를 근로복지공단이 지원해 금융부담을 완화합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006264&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00006162",
  "name": "광주형 대중교통비 지원(광주G-패스)",
  "provider": "local",
  "views": 14256,
  "sidoName": "전남광주통합특별시",
  "sigunguName": null,
  "department": "광주광역시 통합공항교통국 대중교통과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "감면",
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "광주광역시 시민을 대상으로 생애 주기별 맞춤형 대중교통비 지원을 통해 시민들의 교통비 부담과 탄소배출은 줄이고, 대중교통 이용을 활성화하여 기후 위기에 대응하기 위한 정책입니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006162&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-05"
 },
 {
  "id": "WLF00002651",
  "name": "국민기초생활보장(생계·의료급여 수급자)  명절위문금 지급",
  "provider": "local",
  "views": 14240,
  "sidoName": "서울특별시",
  "sigunguName": "관악구",
  "department": "서울특별시 관악구 복지가족국 생활복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "기초생계·의료급여 수급자의 최저생활 수준 충족을 위하여 법정급여 외 명절위문금의 부가급여를 추가 지원하여 저소득 시민의 생활안정을 도모하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002651&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-04"
 },
 {
  "id": "WLF00005883",
  "name": "울산아이문화패스",
  "provider": "local",
  "views": 14230,
  "sidoName": "울산광역시",
  "sigunguName": null,
  "department": "울산광역시 문화관광체육국 문화예술과",
  "targets": [],
  "lifeStages": [
   "child"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "년",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "○ 문화예술시장의 잠재적 수요층인 아동(초등학생 연령)을 대상으로  문화예술 활동 지원 통한 문화예술 향유기회 제공 및 문화격차 완화\n ○ 문화예술‧체육 분야 및 예체능 학원 등에 사용 가능한 선불카드(지원금) 지원하여 지역 경제 활성화 도모\n ○ 저출산 시대 아동 양육 가구의 경제적 부담 경감 통한 인구감소 대응\n ○ 산업, 문화의 축에 ‘시민생활’을 포함하여 시민이 일상에서 변화를 체감하고 울산시민의 자부심을 느낄 수 있는 ‘생활체감형’ 사업 추진",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005883&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00003243",
  "name": "보훈요양원 이용지원",
  "provider": "central",
  "views": 14171,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "생활지원",
   "보호·돌봄"
  ],
  "payTypes": [
   "감면",
   "시설입소"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "장기요양이 필요한 국가유공자 등이 보훈요양원을 이용할 시, 본인부담금의 일부를 지원함으로써 경제적인 부담을 덜고 안락한 노후생활을 할 수 있도록 보장합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003243&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005035",
  "name": "강원도 청년 디딤돌 2배 적금 지원",
  "provider": "local",
  "views": 14094,
  "sidoName": "강원특별자치도",
  "sigunguName": null,
  "department": "강원특별자치도 경제국 일자리청년과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "일하는 청년의 자산형성 및 경제적 자립 촉진",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005035&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00003996",
  "name": "대상포진 예방접종 지원사업",
  "provider": "local",
  "views": 14032,
  "sidoName": "충청북도",
  "sigunguName": "증평군",
  "department": "충청북도 증평군 보건소",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "대상포진 예방접종 지원 대상자를 위한 질병에 따른 경제적 부담을 줄이고 건강증진을 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003996&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-11"
 },
 {
  "id": "WLF00006229",
  "name": "국민내일배움카드제 직업훈련지원(훈련비, 훈련장려금)",
  "provider": "central",
  "views": 14007,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "급격한 기술발전에 적응하고 노동시장 변화에 대응하는 사회안전망 차원에서 생애에 걸친 역량개발 향상 등을 위해 국민 스스로 직업능력개발훈련을 실시할 수 있도록 훈련비 등을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006229&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005102",
  "name": "광주다움 통합돌봄",
  "provider": "local",
  "views": 13998,
  "sidoName": "전남광주통합특별시",
  "sigunguName": null,
  "department": "전남광주통합특별시 보건복지본부 복지정책관 돌봄정책과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문",
   "전화"
  ],
  "onlineApply": null,
  "summary": "빈틈없는 전 생애주기 지역사회 통합돌봄 서비스망 구축하여,\n돌봄이 필요한 시민 누구나 필요할 때 원스톱으로 집에서 돌봄 서비스(13종)를 받을 수 있는 사업입니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005102&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-22"
 },
 {
  "id": "WLF00001062",
  "name": "정보통신보조기기 보급",
  "provider": "central",
  "views": 13931,
  "sidoName": null,
  "sigunguName": null,
  "department": "과학기술정보통신부",
  "targets": [
   "veteran",
   "disability",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "장애인의 기능적 한계를 보완개선하여 정보화를 통한 역량을 증진할 수 있도록 정보통신보조기기 보급을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001062&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000948",
  "name": "학교 밖 청소년 지원",
  "provider": "central",
  "views": 13928,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [],
  "lifeStages": [
   "teen"
  ],
  "themes": [
   "생활지원",
   "일자리",
   "교육"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "학교 밖 청소년의 개인적 수요와 특성을 고려한 상담, 교육, 직업체험 및 취업, 자립지원 프로그램을 제공하여 건강한 사회구성원으로 성장하도록 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000948&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005850",
  "name": "전라남도ㆍ시군 출생기본소득 지원",
  "provider": "local",
  "views": 13921,
  "sidoName": "전남광주통합특별시",
  "sigunguName": null,
  "department": "전남광주통합특별시 인구청년이민국 인구정책과",
  "targets": [],
  "lifeStages": [
   "child",
   "teen",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐",
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "'24년 1월 1일부터 출생하여 전남에 출생신고를 하고 주민등록 주소를 둔 모든 아이에게 1~18세까지 18년간 출생기본소득을 지원함으로써 양육부담 경감 및 결혼·출산에 대한 긍정적 인식 확산으로 도내 출생률 제고 및 지방소멸 위기 극복",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005850&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00006215",
  "name": "청년내일채움공제",
  "provider": "central",
  "views": 13885,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [],
  "lifeStages": [
   "teen",
   "youth"
  ],
  "themes": [
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "청년-기업-정부 3자 적립을 통해 제조·건설업 중소기업 등에 취업한 청년의 장기근속을 유도합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006215&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001832",
  "name": "기초생활수급자 명절위문금",
  "provider": "local",
  "views": 13858,
  "sidoName": "경상남도",
  "sigunguName": "창원시",
  "department": "경상남도 창원시 복지여성보건국 사회복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "child",
   "infant",
   "middle-age",
   "senior",
   "teen",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "기초수급자(생계.의료)에게 명절 위문금 지원으로 생활안정 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001832&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-05"
 },
 {
  "id": "WLF00000023",
  "name": "농어가목돈마련저축 저축장려금 지급",
  "provider": "central",
  "views": 13832,
  "sidoName": null,
  "sigunguName": null,
  "department": "금융위원회",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "농어가목돈마련저축 만기시 저축장려금을 지급하여 농어민의 재산 형성을 지원하고 저축 의욕을 높여 안정된 생활기반 조성에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000023&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001556",
  "name": "장애인 택시 바우처 지원",
  "provider": "local",
  "views": 13813,
  "sidoName": "경기도",
  "sigunguName": "성남시",
  "department": "경기도 성남시 복지국 장애인복지과",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "장애인 이동권 지원을 위한 장애인 택시 바우처 도입",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001556&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00002405",
  "name": "산후조리비용 지원",
  "provider": "local",
  "views": 13726,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "광양시",
  "department": "전남광주통합특별시 광양시 보건소 출생보건과",
  "targets": [],
  "lifeStages": [
   "youth",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "광양시에 거주하는 산모와 신생아의 건강관리 및 출산 장려 분위기 조성을 위함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002405&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-25"
 },
 {
  "id": "WLF00005410",
  "name": "서울런(Seoul-Learn)",
  "provider": "local",
  "views": 13726,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 평생교육국 교육지원정책과",
  "targets": [
   "low-income",
   "multicultural",
   "veteran",
   "single-parent"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "사회경제적 이유로 교육자원에 접근이 어려운 취약계층에게 공적 플랫폼을 통해 다양한 교육 서비스를 지원함으로써 공정한 교육 기회를 제공하기 위한 사업임",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005410&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-16"
 },
 {
  "id": "WLF00006170",
  "name": "기후동행카드 다자녀·저소득층 할인제도 운영",
  "provider": "local",
  "views": 13700,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 교통실 교통기획관 교통정책과",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "부정기",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "- 출산 친화 분위기 조성 및 교통복지 실현을 위해 맞춤형 할인지원 필요\n- 다자녀부모 및 저소득층에 기후동행카드 권종당 최대 17천원 할인",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006170&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-09-18"
 },
 {
  "id": "WLF00005871",
  "name": "저소득 노인 안경구입비 지원",
  "provider": "local",
  "views": 13675,
  "sidoName": "제주특별자치도",
  "sigunguName": null,
  "department": "제주특별자치도 복지가족국 노인복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "경제적 어려움을 겪는 저소득층 노인에게 안경 구입비를 지원하여 시력 보호 및 눈 건강 유지 도움",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005871&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-04"
 },
 {
  "id": "WLF00005319",
  "name": "인천광역시교육청 다자녀 신학년 학습 준비비",
  "provider": "local",
  "views": 13663,
  "sidoName": "인천광역시",
  "sigunguName": "인천광역시교육청",
  "department": "인천광역시교육청 교육행정국 안전복지과",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [
   "teen",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "출산률 저하에 따른 사회문제에 적극 대처하고 양육에 유리한 환경 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005319&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00005820",
  "name": "다자녀가정 종량제봉투 지원",
  "provider": "local",
  "views": 13613,
  "sidoName": "전북특별자치도",
  "sigunguName": "김제시",
  "department": "전북특별자치도 김제시 복지환경국 자원순환과",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [
   "infant",
   "child",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "분기",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "종량제봉투를 지원하여 다자녀 가정의 경제적 부담을 완화하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005820&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00001137",
  "name": "독립유공자 손자녀 가계지원비",
  "provider": "central",
  "views": 13571,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "광복 이후 사망한 독립유공자의 손자녀에게 가계지원비를 지급합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001137&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002820",
  "name": "국민기초생활보장수급자 명절위문금 지원",
  "provider": "local",
  "views": 13568,
  "sidoName": "서울특별시",
  "sigunguName": "영등포구",
  "department": "서울특별시 영등포구 복지국 생활보장과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "국민기초수급자(생계급여, 의료급여)에게 명절맞이 위로금을 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002820&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00000156",
  "name": "한부모가족 자녀 대학등록금 등 지원",
  "provider": "local",
  "views": 13544,
  "sidoName": "충청남도",
  "sigunguName": null,
  "department": "충청남도 인구전략국 여성가족정책과",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [
   "teen",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "대학 등록금 지원을 통한 대학 입학에 따른 저소득 한부모가족의 경제적 부담 경감하고, 균등한 교육 기회 제공",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000156&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00002121",
  "name": "청년 주택자금 대출이자 지원사업",
  "provider": "local",
  "views": 13479,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "광양시",
  "department": "전남광주통합특별시 광양시 미래산업국 청년일자리과",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "E-mail",
   "방문"
  ],
  "onlineApply": null,
  "summary": "신혼부부·다자녀가정 및 미혼 청년 부채의 높은 비중을 차지하는 주택마련 주거비용의 경감을 위해 대출이자를 지원하여 주거안정 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002121&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00000912",
  "name": "저소득 한부모가정 자녀 특기교육비 지원",
  "provider": "local",
  "views": 13479,
  "sidoName": "경기도",
  "sigunguName": "이천시",
  "department": "경기도 이천시 복지환경국 여성보육과",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "저소득 한부모가족 자녀의 학원비를 지원하여 사교육비 부담을 덜어주고 교육기회 제공",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000912&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00004374",
  "name": "기초생활수급자 근로능력평가용진단서 발급비용 지원 사업",
  "provider": "local",
  "views": 13454,
  "sidoName": "경상남도",
  "sigunguName": "김해시",
  "department": "경상남도 김해시 복지국 생활보장과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "매년 근로능력평가를 실시하고 있으나 생계급여만으로 생활하는 수급자에게는 진단서 발급비용이 부담으로 작용하고 있고 이로 인해 유효기간 만료기간이 지나도 미제출하는 사례가 있어 본 제도를 신설해 수급자 가계부담을 경감하고 미제출로 인한 불이익을 방지하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004374&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00004192",
  "name": "충청남도 행복키움수당",
  "provider": "local",
  "views": 13439,
  "sidoName": "충청남도",
  "sigunguName": null,
  "department": "충청남도 인구전략국 인구정책과",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "저출산 극복 및 자녀양육에 대한 경제적 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004192&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-25"
 },
 {
  "id": "WLF00005107",
  "name": "전북형 청년활력수당",
  "provider": "local",
  "views": 13345,
  "sidoName": "전북특별자치도",
  "sigunguName": null,
  "department": "전북특별자치도 기획조정실 인구청년정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "기타",
   "지역화폐"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "구직 청년의  생활안정 및 사회진입 촉진 등",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005107&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-04"
 },
 {
  "id": "WLF00005461",
  "name": "신혼부부 전세대출금 이자지원 사업",
  "provider": "local",
  "views": 13332,
  "sidoName": "경기도",
  "sigunguName": "시흥시",
  "department": "경기도 시흥시 도시주택국 주택과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "무주택 신혼부부의 주거비 부담을 완화하고 안정된 정주여건 조성으로 혼인과  저출산 문제 극복",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005461&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-04"
 },
 {
  "id": "WLF00005816",
  "name": "다자녀 상수도 요금감면",
  "provider": "local",
  "views": 13331,
  "sidoName": "전북특별자치도",
  "sigunguName": "고창군",
  "department": "전북특별자치도 고창군 상하수도사업소",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [
   "infant",
   "teen",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "감면"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "다자녀 가정의 생활에 밀접한 복지 서비스(감면)제공",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005816&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-07"
 },
 {
  "id": "WLF00001080",
  "name": "산재근로자 생활안정자금융자",
  "provider": "central",
  "views": 13245,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "서민금융"
  ],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "산재노동자에게 생활안정 자금 융자를 통해 필요한 자금을 신속하게 지원하고 안정된 생활을 유지하도록 도와드립니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001080&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005623",
  "name": "어르신 보청기 및 성인용 보행기 지원",
  "provider": "local",
  "views": 13243,
  "sidoName": "부산광역시",
  "sigunguName": "기장군",
  "department": "부산광역시 기장군 문화복지국 노인장애인복지과",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "관내 어르신 중 난청 또는 거동이 불편하여 일상생활에 불편을 겪고 있으나 복지용구 지원을 받지 못하는 어르신들에게 의료보조기구를 지원하여 건강한 노후 생활 및 삶의 질 향상에 기여하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005623&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00002444",
  "name": "출산장려 지원사업(출산지원금 지원)",
  "provider": "local",
  "views": 13188,
  "sidoName": "서울특별시",
  "sigunguName": "용산구",
  "department": "서울특별시 용산구 생활지원국 가족정책과",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "다자녀 가구를 중심으로 구 출산지원금 지원 기준을 개정하여 다자녀 가구의 경제적 부담을 완화하고 출산장려 분위기를 조성하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002444&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-16"
 },
 {
  "id": "WLF00001111",
  "name": "취약지역 어르신 문화누림",
  "provider": "central",
  "views": 13145,
  "sidoName": null,
  "sigunguName": null,
  "department": "문화체육관광부",
  "targets": [],
  "lifeStages": [
   "middle-age",
   "senior"
  ],
  "themes": [
   "문화·여가"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "취약지역 노인의 문화예술 접근성 및 향유기회 확대를 위한 맞춤형 문화활동 지원을 통해 연령, 지역간 문화격차를 해소합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001111&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003208",
  "name": "장기복무제대군인 취업지원",
  "provider": "central",
  "views": 13137,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [
   "youth",
   "middle-age"
  ],
  "themes": [
   "일자리"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "10년 이상 복무하고 전역한 장기복무 제대군인의 원활한 사회복귀를 위해 취업을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003208&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005536",
  "name": "에너지이용취약계층 등유바우처 지원사업",
  "provider": "local",
  "views": 13120,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "남구",
  "department": "전남광주통합특별시 남구 문화환경국 탄소중립과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "- 등유 가격의 급격한 인상에 따른 등유 사용가구의 연료비 부담 가중\n- 정부와 시에서 추진하는 난방연료 지원사업과 별개로 우리구에서 등유 부족분을 추가로 지원하는 보편적 에너지공급으로 에너지 복지 향상에 기여코자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005536&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00000033",
  "name": "노인복지민간단체지원",
  "provider": "central",
  "views": 13063,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "신체건강",
   "정신건강",
   "생활지원",
   "일자리",
   "문화·여가",
   "보호·돌봄"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "노인단체 활동을 육성, 지원하여 노인들의 사회참여 및 권익향상을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000033&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000051",
  "name": "고엽제환자2세수당",
  "provider": "central",
  "views": 13018,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "고엽제후유증환자의 자녀가 안정된 생활을 할 수 있도록  장애 정도에 따른 수당을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000051&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004925",
  "name": "저소득계층 임대보증금 지원사업",
  "provider": "local",
  "views": 12997,
  "sidoName": "전북특별자치도",
  "sigunguName": null,
  "department": "전라북도 건설교통국 주택건축과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "전화"
  ],
  "onlineApply": null,
  "summary": "주거지원이 필요한 무주택 저소득계층이 장기임대주택에 거주할 수 있도록 임대보증금을 지원하여 주거안정과 주거수준 향상 기여",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004925&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-04"
 },
 {
  "id": "WLF00005031",
  "name": "발달장애인 긴급돌봄사업",
  "provider": "central",
  "views": 12982,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "teen",
   "youth"
  ],
  "themes": [
   "생활지원",
   "보호·돌봄"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "보호자의 긴급한 상황(입원, 경조사, 심리적 소진 등)으로 긴급돌봄이 필요한 발달장애인에게 일시적 돌봄을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005031&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000831",
  "name": "(임신출산)임산부 차량 주차료 감면",
  "provider": "local",
  "views": 12981,
  "sidoName": "대전광역시",
  "sigunguName": "서구",
  "department": "대전광역시 서구 안전건설국 주차행정과",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "감면"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "임산부 주차료 감면으로 출산장려 사회분위기 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000831&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-16"
 },
 {
  "id": "WLF00004000",
  "name": "참전명예수당 및 참전유공자 유족(배우자) 수당 지원",
  "provider": "local",
  "views": 12980,
  "sidoName": "강원특별자치도",
  "sigunguName": "횡성군",
  "department": "강원특별자치도 횡성군 복지정책과",
  "targets": [
   "veteran"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "참전의 명예를 선양하고 횡성군민의 애국정신 함양에 이바지함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004000&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-06-30"
 },
 {
  "id": "WLF00005838",
  "name": "다자녀 차량 구입에 대한 취득세 감면",
  "provider": "local",
  "views": 12967,
  "sidoName": "전북특별자치도",
  "sigunguName": "남원시",
  "department": "전북특별자치도 남원시 자치행정국 재정과",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "감면"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "다자녀 가정 차량 구입 시 취득세 감면으로 비용 부담 완화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005838&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-05"
 },
 {
  "id": "WLF00001491",
  "name": "국민기초생활 보장지원(월동난방비, 대학생전공교재비, 이사비용, 쓰레기봉투비, 진단서 발급비용)",
  "provider": "local",
  "views": 12965,
  "sidoName": "경기도",
  "sigunguName": "과천시",
  "department": "경기도 과천시 경제복지국 복지정책과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior",
   "middle-age",
   "infant",
   "child",
   "teen",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "국민기초생활 보장지원을 통한 수급자의 안정적 생활 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001491&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-12"
 },
 {
  "id": "WLF00002715",
  "name": "저소득주민 특별생계보호사업",
  "provider": "local",
  "views": 12956,
  "sidoName": "서울특별시",
  "sigunguName": "마포구",
  "department": "서울특별시 마포구 복지동행국 복지정책과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "생활이 어려운 저소득 주민 및 국민기초수급자에게 특별생계비 및 (장기요양보험료 포함)건강보험료체납분, 공공요금 체납분을 지원함으로써 실제 생활이 어려운 저소득주민을 지원, 복지사각지대를 해소하 고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002715&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00006333",
  "name": "건강보험 산정특례",
  "provider": "central",
  "views": 12923,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "infant",
   "child",
   "teen",
   "youth",
   "middle-age",
   "senior",
   "pregnancy"
  ],
  "themes": [
   "신체건강",
   "보호·돌봄"
  ],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "암 등 중증질환, 희귀질환, 중증난치질환자의 의료비 부담을 완화하여 필수의료 보장을 강화합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006333&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000139",
  "name": "근로능력평가용 진단서 발급비용 지원",
  "provider": "local",
  "views": 12921,
  "sidoName": "경상남도",
  "sigunguName": "거제시",
  "department": "경상남도 거제시 복지국 사회복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "근로능력판정에 소요되는 경비 지원으로 저소득 가구의 가계부담 경감",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000139&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-16"
 },
 {
  "id": "WLF00005981",
  "name": "가평군 청년 1인가구 월세 지원사업",
  "provider": "local",
  "views": 12831,
  "sidoName": "경기도",
  "sigunguName": "가평군",
  "department": "경기도 가평군 기획예산담당관",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "분기",
  "applyMethods": [
   "우편",
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "청년들의 안정적인 정주기반 조성을 위해 지역 정착을 유도하고 순유출을 방지하고자 관내 청년들에게 월세 자금을 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005981&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00000043",
  "name": "보상금",
  "provider": "central",
  "views": 12786,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "독립(국가)유공자, 보훈보상대상자의 생활 안정과 복지 향상을 위하여 보상금을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000043&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005380",
  "name": "진주시 출산축하금 지원",
  "provider": "local",
  "views": 12761,
  "sidoName": "경상남도",
  "sigunguName": "진주시",
  "department": "경상남도 진주시 복지여성국 여성가족과",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "출산가정의 경제적 부담을 완화하고, 산모• 신생아의 건강관리를 위하여 출산축하금을 지급함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005380&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00000058",
  "name": "소상공인지원(융자)",
  "provider": "central",
  "views": 12733,
  "sidoName": null,
  "sigunguName": null,
  "department": "중소벤처기업부",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "서민금융"
  ],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "국가경제의 균형발전을 도모하기 위하여 소상공인의 창업 및 경영 개선 활동을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000058&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004198",
  "name": "다자녀 가정 기저귀 지원 사업",
  "provider": "local",
  "views": 12683,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "담양군",
  "department": "전남광주통합특별시 담양군 보건소 보건행정과",
  "targets": [],
  "lifeStages": [
   "infant",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현물지급",
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "육아 필수재인 기저귀 지원을 통해 경제적 부담 경감 및 아이 낳기 좋은 환경 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004198&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00003674",
  "name": "장애인복지카드 배송서비스",
  "provider": "local",
  "views": 12683,
  "sidoName": "충청남도",
  "sigunguName": "홍성군",
  "department": "충청남도 홍성군 행정복지국 가정행복과",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "신규 등록장애인 및 복지카드 재발급 신청자의 복지카드 우편 배송비를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003674&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00002012",
  "name": "경북 청년 사랑채움사업",
  "provider": "local",
  "views": 12607,
  "sidoName": "경상북도",
  "sigunguName": null,
  "department": "경상북도 지방시대정책국 청년정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "분기",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "가. 미혼 청년근로자의 목돈마련을 통한 결혼 유도 및 출산율 제고\n 나. 중소·중견기업 청년근로자의 미래 자산형성 지원으로 조기 이직 방지",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002012&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00001409",
  "name": "무연고수급자장례비지원",
  "provider": "local",
  "views": 12532,
  "sidoName": "충청남도",
  "sigunguName": "아산시",
  "department": "충청남도 아산시 문화복지국 사회복지과",
  "targets": [],
  "lifeStages": [
   "middle-age",
   "senior",
   "child",
   "infant",
   "teen",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "무연고국민기초생활보장수급자장례비지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001409&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-05"
 },
 {
  "id": "WLF00003239",
  "name": "고용복지플러스센터",
  "provider": "central",
  "views": 12531,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "일자리"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "국민들이 한 곳만 방문하면 다양한 고용과 복지, 금융 서비스 등을 받을 수 있도록 고용센터를 중심으로 고용, 복지,금융 등 서비스 기관이 한 공간에서 서비스를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003239&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003190",
  "name": "의료급여(의료급여대지급금지원)",
  "provider": "central",
  "views": 12505,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "multicultural",
   "veteran",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "정신건강"
  ],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "의료급여 수급권자에 대한 의료비를 지원하여 저소득층 국민보건 향상과 사회복지 증진에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003190&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001853",
  "name": "익산시 신혼부부 청년 주택 전세보증금 대출이자 지원사업",
  "provider": "local",
  "views": 12494,
  "sidoName": "전북특별자치도",
  "sigunguName": "익산시",
  "department": "전북특별자치도 익산시 건설국 주택과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "감면",
   "현금대여(융자)"
  ],
  "cycle": "분기",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "무주택 청년 신혼부부의 초기 정착에 따른 주거비용 부담을 해소하여 장기적 주거여건 형성 및 인구유출 방지",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001853&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-20"
 },
 {
  "id": "WLF00002953",
  "name": "저소득층 자녀 무료안경지원",
  "provider": "local",
  "views": 12484,
  "sidoName": "경상남도",
  "sigunguName": null,
  "department": "경상남도 보건의료국 의료정책과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "teen",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "저소득층 자녀 초중고등학생의 건강증진을 도모하고 학업의욕 고취 및 학교생활에 활력을 제공하기 위한 무료 안경지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002953&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-12"
 },
 {
  "id": "WLF00002055",
  "name": "저소득층 특별생계비 지원",
  "provider": "local",
  "views": 12464,
  "sidoName": "제주특별자치도",
  "sigunguName": "서귀포시",
  "department": "제주특별자치도 서귀포시 복지위생국 주민복지과",
  "targets": [],
  "lifeStages": [
   "infant",
   "child",
   "senior",
   "middle-age",
   "teen",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급",
   "프로그램/서비스(서비스)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "실질적으로 생활이 곤란하지만 부양의무자 기준 등 기초생활보장 선정기준에 부적합하여 지원을 받지 못하는 저소득층에게 한시적으로 생계비 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002055&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-05-31"
 },
 {
  "id": "WLF00002765",
  "name": "대상포진 예방접종 지원 사업",
  "provider": "local",
  "views": 12424,
  "sidoName": "서울특별시",
  "sigunguName": "동대문구",
  "department": "서울특별시 동대문구 보건소 건강관리과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "65세 이상 어르신 중, 기초생활수급자 및 차상위계층에게 대상포진 예방접종 비용을 지원하여 질병에 따른 경제적 부담을 줄이고 구민의 건강증진을 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002765&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-06"
 },
 {
  "id": "WLF00001141",
  "name": "지역사회 청소년통합지원체계(청소년안전망)",
  "provider": "central",
  "views": 12417,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [],
  "lifeStages": [
   "child",
   "teen",
   "youth"
  ],
  "themes": [
   "정신건강",
   "생활지원",
   "교육",
   "보호·돌봄"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "학업중단, 가출, 인터넷 중독 등 위기에 처한 청소년의  건강한 성장과 복지증진을 위해 상담·보호·교육·자립 등 맞춤형 서비스를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001141&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004165",
  "name": "공공근로사업",
  "provider": "local",
  "views": 12413,
  "sidoName": "경상남도",
  "sigunguName": "밀양시",
  "department": "경상남도 밀양시 나노경제국 지역경제과",
  "targets": [
   "multicultural",
   "veteran"
  ],
  "lifeStages": [
   "youth",
   "senior",
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "지역 실정에 맞는 사업을 발굴, 추진하여 취업취약계층 실업자에게 구직기간 동안 한시적으로 공공부문의 일자리를 제공하여 생계보조를 통한 사회 안전망 역할 및 근로 기회 부여",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004165&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00004981",
  "name": "대상포진 예방접종",
  "provider": "local",
  "views": 12367,
  "sidoName": "전북특별자치도",
  "sigunguName": "완주군",
  "department": "전북특별자치도 완주군 보건소 보건관리과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior",
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "전화",
   "방문"
  ],
  "onlineApply": null,
  "summary": "- 대상포진 예방접종을 통해 대상포진 발생 및 합병증 감소",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004981&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-04"
 },
 {
  "id": "WLF00002893",
  "name": "출산공무원 축하지원금",
  "provider": "local",
  "views": 12363,
  "sidoName": "충청북도",
  "sigunguName": "음성군",
  "department": "충청북도 음성군 행정복지국 자치행정과",
  "targets": [],
  "lifeStages": [
   "child",
   "infant",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "출산공무원에게 복지포인트를 이용하여 축하금을 지원함으로써 출산율 제고에 기여하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002893&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00001122",
  "name": "국가유공자 등 LPG차량 세금인상분 지원",
  "provider": "central",
  "views": 12257,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "실물바우처"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "국가유공상이자 등이 보철용으로 사용하는 LPG차량에 대해, 차량 유류비의 세금인상분을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001122&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005034",
  "name": "장애인 건강주치의 시범사업",
  "provider": "central",
  "views": 12257,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "장애인에게 건강주치의를 통한 만성질환 및 장애 관련 건강관리 서비스를 제공하여 의료서비스 이용 접근성을 향상시킵니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005034&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001159",
  "name": "입원 및 격리치료명령 결핵환자 부양가족생활보호비 지원",
  "provider": "central",
  "views": 12219,
  "sidoName": null,
  "sigunguName": null,
  "department": "질병관리청",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "결핵예방법에 따라 입원 및 격리치료 명령을 받은 결핵환자의 격리기간 동안 발생한 소득상실을 보전하기 위해 환자 본인 또는 그 부양가족에게 생활보호비를 지급합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001159&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001099",
  "name": "농업인 건강보험료 지원",
  "provider": "central",
  "views": 12189,
  "sidoName": null,
  "sigunguName": null,
  "department": "농림축산식품부",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "정신건강",
   "생활지원"
  ],
  "payTypes": [
   "감면"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "의료 이용 접근성이 낮은 농어촌 거주 농업인에 대해 건강보험료 일부를 지원하여 생활안정과 복지증진을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001099&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001316",
  "name": "무료간병 온종일서비스",
  "provider": "local",
  "views": 12170,
  "sidoName": "전북특별자치도",
  "sigunguName": "남원시",
  "department": "전북특별자치도 남원시 자치행정국 주민복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "전화"
  ],
  "onlineApply": null,
  "summary": "- 홀로 사는 수급자 및 차상위층 의료위기 대처 방안으로 입원시 간병비를 최대 14일간 지원\n- 간병비 부담으로 홀몸가정이 생계위기에 빠지지 않도록 보호",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001316&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-16"
 },
 {
  "id": "WLF00004398",
  "name": "태아기형아검사비 지원",
  "provider": "local",
  "views": 12124,
  "sidoName": "경상남도",
  "sigunguName": "김해시",
  "department": "경상남도 김해시 김해시보건소 건강증진과",
  "targets": [],
  "lifeStages": [
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "실물바우처"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "출생아 감소, 저출산 해소를 위한 다양한 지원 방안 모색 필요\n태아기형아 검사비를 지원하여 선천성기형을 조기 발견하고 치료 \n및 재활로 연계시킴으로써 임신에 대한 사회적 지원 강화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004398&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00004233",
  "name": "신혼부부 및 청년 전월세 대출이자 지원사업",
  "provider": "local",
  "views": 12078,
  "sidoName": "경기도",
  "sigunguName": "광명시",
  "department": "경기도 광명시 도시재생국 주택과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "광명시에 정착하는 신혼부부 및 청년의 주거비 부담을 완화하여 안정된 주거환경 조성하고자 신혼부부 및 청년 무주택자에게 전월세 보증금 대출 이자 지원 사업입니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004233&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-06-06"
 },
 {
  "id": "WLF00001377",
  "name": "수원시 자녀 출산·입양 지원금",
  "provider": "local",
  "views": 12049,
  "sidoName": "경기도",
  "sigunguName": "수원시",
  "department": "경기도 수원시 여성가족국 여성정책과",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "저출산 및 고령사회 기본법 및 입양 특례법에 따라  출산 · 입양 장려 분위기를 조성하기 위하여, 첫째자녀 이상 출산가정과 넷째자녀 이상 입양가정을 대상으로 자녀 출산 · 입양 지원금을 지급하여 시민의 삶의 질 향상에 기여함을 목적으로 함\n ※ 「수원시 자녀 출산ㆍ입양 지원금 지급 조례」일부개정 (2025. 11. 13.)  / 2026. 1. 1.부터 지급대상자 확대 : 둘째자녀 이상  → 첫째자녀 이상",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001377&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-16"
 },
 {
  "id": "WLF00005802",
  "name": "다자녀가정 수도요금 감면",
  "provider": "local",
  "views": 12001,
  "sidoName": "전북특별자치도",
  "sigunguName": "진안군",
  "department": "전북특별자치도 진안군 안전환경국 상하수도과",
  "targets": [],
  "lifeStages": [
   "child",
   "teen",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "감면"
  ],
  "cycle": "월",
  "applyMethods": [
   "우편",
   "방문"
  ],
  "onlineApply": null,
  "summary": "2자녀이상 10톤까지 상수도요금 감면\n(막내가 만 18세 이상시 종료)",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005802&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-08"
 },
 {
  "id": "WLF00000998",
  "name": "보훈병원 진료",
  "provider": "central",
  "views": 11975,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "정신건강"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "국가보훈대상자가 건강한 생활을 유지할 수 있도록 보훈병원 진료비의 일부 또는 전액을 국가가 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000998&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004029",
  "name": "출산양육지원금 지원",
  "provider": "local",
  "views": 11955,
  "sidoName": "서울특별시",
  "sigunguName": "강남구",
  "department": "서울특별시 강남구 복지생활국 보육지원과",
  "targets": [],
  "lifeStages": [
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "사회적 여건 및 가치관의 변화로 인한 출산율 저하와 고령화 사회 진입에  따른 인구 불균형 문제가 야기되어 출산양육 지원금 지원을 함으로써 출산에  대한 긍정적 인식 제고를 통해 출산을 장려",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004029&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00000071",
  "name": "여성경제활동 촉진지원(여성새로일하기지원센터 사업)",
  "provider": "central",
  "views": 11943,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "일자리"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "경력단절여성 등을 대상으로 취업상담, 직업교육, 인턴, 취업 연계 및 사후관리까지 종합취업서비스를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000071&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004424",
  "name": "차상위계층 건강보험료 지급",
  "provider": "local",
  "views": 11935,
  "sidoName": "경상남도",
  "sigunguName": "하동군",
  "department": "경상남도 하동군 기획행정국 주민행복과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "차상위계층 중  65세 이상 노인세대 및 장애인세대, 한부모세대 건강보험료 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004424&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-15"
 },
 {
  "id": "WLF00003185",
  "name": "청소년치료재활센터 운영",
  "provider": "central",
  "views": 11894,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "low-income",
   "single-parent"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "정신건강",
   "교육",
   "보호·돌봄"
  ],
  "payTypes": [
   "시설입소"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "정서·행동에 어려움을 겪는 만 9~18세 청소년을 대상으로 종합적·전문적 치유재활 서비스를 제공하는 거주형 기숙치유시설을 운영하여 청소년의 일상생활 영위 및 건강한 성장을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003185&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003263",
  "name": "WEE 클래스 상담지원",
  "provider": "central",
  "views": 11812,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "정신건강"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "초중고 학교부적응 학생 및 위기학생, 일반학생에 대한 학교생활 적응 및 치유를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003263&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005120",
  "name": "노인 무릎 인공관절 수술비 지원사업",
  "provider": "local",
  "views": 11807,
  "sidoName": "전북특별자치도",
  "sigunguName": "부안군",
  "department": "전북특별자치도 부안군 보건소 건강증진과",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "우편"
  ],
  "onlineApply": null,
  "summary": "무릎 관절증으로 지속적인 통증에 시달리거나 경제적인 이유로 수술을 받지 못하는 \n부안군 거주 만 70세 이상 노인에게 무릎인공관절수술 의료비 등을 지원하여 경제적 부담 경감 및 건강한 삶의 개선에 도움을 주고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005120&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-04"
 },
 {
  "id": "WLF00001350",
  "name": "산모신생아 건강관리지원사업",
  "provider": "local",
  "views": 11803,
  "sidoName": "인천광역시",
  "sigunguName": "강화군",
  "department": "인천광역시 강화군 보건소 건강증진과",
  "targets": [],
  "lifeStages": [
   "infant",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "출산가정에 건강관리사를 파견하여 산모의 산후 회복과 신생아의 양육을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001350&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-14"
 },
 {
  "id": "WLF00004650",
  "name": "청소년성문화센터설치운영",
  "provider": "central",
  "views": 11796,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "아동ㆍ청소년이 다양한 도구와 매체를 활용하여 자기 주도적으로 학습할 수 있는 상설 성교육 공간을 구축, 운영합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004650&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004697",
  "name": "신혼부부 전세자금 대출이자 지원",
  "provider": "local",
  "views": 11767,
  "sidoName": "전남광주통합특별시",
  "sigunguName": null,
  "department": "전남광주통합특별시 여성가족국 여성가족과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "반기",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "주거비 마련 부담때문에 결혼을 고민하는 청년층과 아이낳이 키우기 좋은 환경에서 아이를 키우고 싶은 신혼부부의 주거안정을 위해 전세자금 대출이자를 지원.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004697&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00006006",
  "name": "울주군 청년 주택 임차비용 지원",
  "provider": "local",
  "views": 11690,
  "sidoName": "울산광역시",
  "sigunguName": "울주군",
  "department": "울산광역시 울주군 경제산업국 일자리지원과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "분기",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "❍ 무주택 청년의 경제적 부담의 큰 부분을 차지하는 주택 임차보증금 대출이자 또는 월세를 지원하여 청년의 경제적 부담을 경감하고 정주 여건을 개선하기 위함\n❍ 고금리, 고물가로 인해 취업을 준비하거나 사회 초년생인 청년들의 주거비 부담이 가중되고 있음.\n❍ 저출생・고령화로 인구 구조가 변화하면서 본격적인 인구 감소 시대로 접어들고, 특히 청년 인구는 더 빠르게 감소하고 있음. 우리군 청년(19세~34세) 인구는 36,558명으로, 우리군 전체 인구의 16.7%로 이는 전국 평균 26.8%과 비교해서 한참 낮으며, 청년 인구는 지속적으로 감소하고 있어 청년유출을 막을 수 있는 제도적 지원이 반드시 필요",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006006&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00000846",
  "name": "서울형 장애인 부가급여",
  "provider": "local",
  "views": 11682,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 복지정책실 복지기획관 장애인자립지원과",
  "targets": [
   "low-income",
   "disability"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "저소득 중증장애인에게 장애로 인해 추가 지출되는 비용은 보전하기 위해 지자체 부가급여 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000846&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-27"
 },
 {
  "id": "WLF00004357",
  "name": "국가보훈대상자 보훈예우수당 지급",
  "provider": "local",
  "views": 11678,
  "sidoName": "서울특별시",
  "sigunguName": "동대문구",
  "department": "서울특별시 동대문구 주민복지국 복지정책과",
  "targets": [
   "veteran"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급",
   "기타"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "◆사업목적 : 동대문구에 거주하고 있는 국가보훈대상자 예우 및 지원\n◆지원대상 : 동대문구에 거주하고 있는 국가보훈대상자(단, 서울시 참전명예수당 수급자 제외)\n◆신청방법 : 주소지 동주민센터에 신청서 작성 제출\n◆신청서류 : 국가유공자 보훈예우수당 지급신청서(구비서류 포함)\n◆신청자격 : 본인 및 배우자(자녀)\n◆지   급 : 신청한 달의 다음 달부터 지급\n◆지급방법 : 매월 25일경 본인 계좌입금\n◆지급금액 : 월 80,000원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004357&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-11"
 },
 {
  "id": "WLF00002602",
  "name": "저소득 한부모가족 명절위문금 지원",
  "provider": "local",
  "views": 11661,
  "sidoName": "서울특별시",
  "sigunguName": "서대문구",
  "department": "서울특별시 서대문구 복지문화체육국 가족정책과",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [
   "middle-age",
   "senior",
   "infant",
   "child",
   "youth",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "저소득 한부모가족의 최저생활 수준 충족을 위해 법정급여 외 명절(설, 추석)위문금 지급",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002602&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-15"
 },
 {
  "id": "WLF00003259",
  "name": "중증장애인지원고용",
  "provider": "central",
  "views": 11655,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "일자리"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "독립적인 직업생활영위가 어려운 중증장애인의 고용 증진을 위해 직무수행에 필요한 기술과 직장적응을 취업 전 사업체 현장에서 지도하여 취업으로 연계합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003259&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005328",
  "name": "디딤돌 안정소득 (인천형 기초생활보장)",
  "provider": "local",
  "views": 11642,
  "sidoName": "인천광역시",
  "sigunguName": null,
  "department": "인천광역시 보건복지국 복지정책과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "중앙 정부의 제도권 밖 비수급 빈곤층에 「디딤돌 안정소득」을 지원함으로써, \n복지사각지대 해소 및 지역사회 내 사회안전망을 강화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005328&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00003853",
  "name": "무주택 노인 주거비",
  "provider": "local",
  "views": 11636,
  "sidoName": "제주특별자치도",
  "sigunguName": "제주시",
  "department": "제주특별자치도 제주시 복지위생국 노인복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "무주택 독거노인들에게 주거비 지원으로 경제적 어려움 해소",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003853&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00002532",
  "name": "출산장려금 지급",
  "provider": "local",
  "views": 11635,
  "sidoName": "부산광역시",
  "sigunguName": "동래구",
  "department": "부산광역시 동래구 경제복지국 복지정책과",
  "targets": [],
  "lifeStages": [
   "infant",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "자녀를 출산한 가정에 대하여 출산장려금을 지급함으로써 출산가정에 경제적 부담을 경감시키고, 임신과 출산 친화적인 사회분위기를 조성해 구민 만족도를 증가시키고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002532&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00004356",
  "name": "무주택 다자녀가구 전세자금 대출이자 지원사업",
  "provider": "local",
  "views": 11603,
  "sidoName": "부산광역시",
  "sigunguName": "연제구",
  "department": "부산광역시 연제구 복지교육국 생활보장과",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "다자녀가구의 주거비 부담 완화를 위해 전세자금 대출이자를 지원하여 저출산 문제 해결에 기여",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004356&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-14"
 },
 {
  "id": "WLF00004110",
  "name": "주택바우처 사업(전주형 주거급여)",
  "provider": "local",
  "views": 11551,
  "sidoName": "전북특별자치도",
  "sigunguName": "전주시",
  "department": "전북특별자치도 전주시 덕진구 건축과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "정부의 기초주거급여 지원에서 제외된 차상위계층에 대한 지원 확대로 \n저소득 임차가구의 주거안정 및 주거복지 사각지대 최소화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004110&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00006258",
  "name": "건강보험 임의계속가입제도",
  "provider": "central",
  "views": 11530,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "신체건강",
   "생활지원",
   "보호·돌봄"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "실업자에 대한 경제적 부담을 완화하고자 임의계속보험료가 지역보험료보다 적은 경우 임의계속보험료를 납부할 수 있도록 하는 특례 제도입니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006258&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003682",
  "name": "다자녀(2명이상)가정 대학생 생활지원금 지원",
  "provider": "local",
  "views": 11511,
  "sidoName": "경상남도",
  "sigunguName": "산청군",
  "department": "경상남도 산청군 미래전략담당관",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [
   "teen",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "다자녀가정의 대학생 자녀 생활지원금을 지원함으로써 다자녀가정의 경제적 부담 완화 및 안정적 정착지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003682&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00002522",
  "name": "출산지원금",
  "provider": "local",
  "views": 11503,
  "sidoName": "경기도",
  "sigunguName": "고양시",
  "department": "경기도 고양시 복지여성국 여성가족과",
  "targets": [],
  "lifeStages": [
   "infant",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "저출생 극복을 위한 출산장려 목적으로 출산에 따른 경제적비용 부담 경감을 위하여 출산가정에 일정금액을 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002522&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00003217",
  "name": "장애인자립생활지원센터 지원",
  "provider": "central",
  "views": 11461,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원",
   "안전·위기"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "장애인 대상 권익옹호, 동료상담, 개인별 자립지원 등 서비스를 통해 장애인의 자립생활에 필요한 역량강화와 지역사회의 다양한 사회참여 활동을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003217&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005222",
  "name": "산후조리비 지원사업",
  "provider": "local",
  "views": 11455,
  "sidoName": "인천광역시",
  "sigunguName": "남동구",
  "department": "인천광역시 남동구 보건소 건강증진과",
  "targets": [
   "single-parent",
   "multicultural",
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "pregnancy",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "취약계층 출산가정 산후조리비 지원으로 경제적 부담을 경감하고 아이 낳기 좋은 환경조성으로 임산부와 영유아의 건강증진 및 저출산 극복 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005222&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00004719",
  "name": "서울 디딤돌소득 시범사업",
  "provider": "local",
  "views": 11435,
  "sidoName": "서울특별시",
  "sigunguName": null,
  "department": "서울특별시 복지실 복지기획관 디딤돌소득과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷",
   "전화",
   "방문"
  ],
  "onlineApply": null,
  "summary": "취약계층을 더 두텁게 보호하고 소득양극화를 완화하기 위한 미래 복지모델 구축",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004719&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-07"
 },
 {
  "id": "WLF00005736",
  "name": "스마트 노인돌봄 서비스",
  "provider": "local",
  "views": 11425,
  "sidoName": "제주특별자치도",
  "sigunguName": null,
  "department": "제주특별자치도 복지가족국 노인복지과",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현물대여",
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문",
   "전화"
  ],
  "onlineApply": null,
  "summary": "인공지능(AI) 돌봄스피커 및 안부전화를 통해 홀로사는 노인에 대한 24시간 응급상황을 관제하고 정서지원 서비스 제공",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005736&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-05-31"
 },
 {
  "id": "WLF00006107",
  "name": "경기도 분만취약지 임산부 교통비 지원사업",
  "provider": "local",
  "views": 11421,
  "sidoName": "경기도",
  "sigunguName": null,
  "department": "경기도 보건건강국 응급의료과",
  "targets": [],
  "lifeStages": [
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "○ 임산부의 의료접근성을 높여 안전한 임신·출산환경 조성 및 모자 건강증진 도모\n ○ 임산부 교통비 지원을 통해 의료장벽 해소 및 경제적 부담 완화에 도움",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006107&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-13"
 },
 {
  "id": "WLF00003232",
  "name": "농업인안전보험",
  "provider": "central",
  "views": 11420,
  "sidoName": null,
  "sigunguName": null,
  "department": "농림축산식품부",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age"
  ],
  "themes": [
   "생활지원",
   "안전·위기"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "농업인이 농작업 중 발생한 피해를 보상받기 위해 가입하는 정책보험 보험료의 일부를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003232&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000226",
  "name": "저소득층 월동난방비지원사업",
  "provider": "local",
  "views": 11415,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "구례군",
  "department": "전남광주통합특별시 구례군 주민복지과",
  "targets": [],
  "lifeStages": [
   "teen",
   "infant",
   "child",
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급",
   "현물지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "동절기 사회 취약계층 및 위기세대에게 동절기 난방비를 지원 \n  따뜻하고 훈훈한 겨울나기를 통해 저소득가구의 생활안정을 \n  도모하여 더 나은 복지구례 실현",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000226&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-25"
 },
 {
  "id": "WLF00004764",
  "name": "태아 기형아 선별 검사비 지원",
  "provider": "local",
  "views": 11396,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "순천시",
  "department": "전남광주통합특별시 순천시 시민복지국 보육아동과",
  "targets": [],
  "lifeStages": [
   "youth",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "만혼고령출산 증가에 따른 체게적인 산전관리로 건강한 자녀의 출산을 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004764&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00003205",
  "name": "중장년 기술창업센터 지원사업",
  "provider": "central",
  "views": 11386,
  "sidoName": null,
  "sigunguName": null,
  "department": "중소벤처기업부",
  "targets": [],
  "lifeStages": [
   "middle-age",
   "senior"
  ],
  "themes": [
   "일자리",
   "교육"
  ],
  "payTypes": [
   "시설입소"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "경력, 네트워크, 전문성을 보유한 중장년 (예비)창업자의 기술창업 활성화를 위해 창업교육과 창업거점 등을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003205&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003189",
  "name": "중증장애인직업재활지원",
  "provider": "central",
  "views": 11370,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "일자리",
   "교육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "사각지대 없는 촘촘한 직업재활서비스 제공을 통해 중증장애인의 자립기반을 마련하고 사회참여 증진을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003189&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004632",
  "name": "출산장려금",
  "provider": "local",
  "views": 11303,
  "sidoName": "경상북도",
  "sigunguName": "칠곡군",
  "department": "경상북도 칠곡군 보건소 건강증진과",
  "targets": [],
  "lifeStages": [
   "infant",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "출산가정에 대한 경제적 지원을 통하여 저출산 문제를 극복하고 영유아의 건강한 양육을 위한 사회 환경 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004632&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-06-14"
 },
 {
  "id": "WLF00004579",
  "name": "여성농업인 생생카드 지원사업",
  "provider": "local",
  "views": 11295,
  "sidoName": "전북특별자치도",
  "sigunguName": null,
  "department": "전북특별자치도 농생명축산산업국 농생명정책과",
  "targets": [],
  "lifeStages": [
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "문화적 여건이 열악한 농어촌 여성농어업인에게 문화활동 기회 제공",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004579&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-28"
 },
 {
  "id": "WLF00001172",
  "name": "취업취약계층 고용지원 사업",
  "provider": "central",
  "views": 11288,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age"
  ],
  "themes": [
   "일자리",
   "교육"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "취업에 어려움을 겪는 취약계층에게 전문심리상담과 집단상담, 취업특강 등 구직자 취업역량강화 프로그램을 제공하여 자신감 회복, 직업선택, 구직기술 향상 등을 효과적으로 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001172&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004558",
  "name": "저소득층 상수도 사용료 감면사업",
  "provider": "local",
  "views": 11269,
  "sidoName": "강원특별자치도",
  "sigunguName": "원주시",
  "department": "강원특별자치도 원주시 상하수도사업소 경영관리과",
  "targets": [
   "disability",
   "low-income",
   "multi-child"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "감면"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "수급자 가구의 상수도 사용료 감면을 통한 생활안정 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004558&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-25"
 },
 {
  "id": "WLF00005439",
  "name": "화성시 청년 전월세 보증금 대출이자 지원사업",
  "provider": "local",
  "views": 11267,
  "sidoName": "경기도",
  "sigunguName": "화성시",
  "department": "경기도 화성시 성평등가족국 청년청소년과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "청년 주거비 지원을 통한 주거안정",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005439&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00000259",
  "name": "장애인복지카드 배송비 지원",
  "provider": "local",
  "views": 11262,
  "sidoName": "충청북도",
  "sigunguName": "음성군",
  "department": "충청북도 음성군 행정복지국 복지정책과",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "child",
   "infant",
   "senior",
   "teen",
   "youth",
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "장애인이 복지카드 신청 후 수령 시 읍·면사무소를 재방문하는 번거로움을 해소하고 복지카드 등기 배송 시 등기배송료(3,820원)를 지원하여 장애인 복지증진에 기여",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000259&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00006046",
  "name": "맘편한 산후조리비 지원",
  "provider": "local",
  "views": 11260,
  "sidoName": "인천광역시",
  "sigunguName": null,
  "department": "인천광역시 여성가족국 영유아정책과",
  "targets": [
   "single-parent",
   "multicultural",
   "low-income",
   "disability"
  ],
  "lifeStages": [
   "middle-age",
   "infant",
   "pregnancy",
   "teen",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "'23년 인천 잠정 합계출산율 0.69명(전국 0.72명)으로 심각한 저출산 문제 극복을 위해 출산가정에 산후조리비 지원으로 산모와 신생아의 건강증진 도모 및 친출산 환경 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006046&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-31"
 },
 {
  "id": "WLF00005192",
  "name": "모다드림 청년통장 지원사업",
  "provider": "local",
  "views": 11213,
  "sidoName": "경상남도",
  "sigunguName": null,
  "department": "경상남도 교육청년국 청년정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "청년 근로자에게 목돈마련을 위한 공제금 지원을 통해 장기근속을 유도하고 고임금 근로자와의 격차 해소",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005192&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00004614",
  "name": "여수시 출산지원금 지원사업",
  "provider": "local",
  "views": 11181,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "여수시",
  "department": "전남광주통합특별시 여수시 보건소 건강증진과",
  "targets": [],
  "lifeStages": [
   "infant",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "모성 및 영유아의 생명과 건강을 보호하고 건전한 출산과 양육을 도모함으로써 여수시의 경쟁력을 높이고 시민의 삶의 질 향상에 이바지함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004614&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00004466",
  "name": "참전명예수당 및 보훈명예수당 지원",
  "provider": "local",
  "views": 11181,
  "sidoName": "충청남도",
  "sigunguName": "홍성군",
  "department": "충청남도 홍성군 행정복지국 복지정책과",
  "targets": [
   "veteran"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "국가유공자 예우 및 관련 단체 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004466&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00004079",
  "name": "울주군 출산장려금 지원",
  "provider": "local",
  "views": 11181,
  "sidoName": "울산광역시",
  "sigunguName": "울주군",
  "department": "울산광역시 울주군 복지교육국 여성가족과",
  "targets": [],
  "lifeStages": [
   "infant",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "출산장려",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004079&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-06-20"
 },
 {
  "id": "WLF00006033",
  "name": "여성농업인 행복바우처 확대 지원",
  "provider": "local",
  "views": 11166,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "무안군",
  "department": "전남광주통합특별시 무안군 농업기술센터 농업정책과",
  "targets": [],
  "lifeStages": [
   "senior",
   "youth",
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)",
   "지역화폐"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "여성농업인의 삶의 질 향상을 위한 복지서비스 강화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006033&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00005336",
  "name": "뇌 MRI·MRA 검사비 지원",
  "provider": "local",
  "views": 11100,
  "sidoName": "인천광역시",
  "sigunguName": "영종구",
  "department": "인천광역시 중구 국제도시행정국 복지지원과",
  "targets": [
   "single-parent",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "저소득 주민의 경제적 부담을 경감시키고 복지체감도 향상에 기여",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005336&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-14"
 },
 {
  "id": "WLF00005414",
  "name": "강남구 신혼부부 청년 전월세 대출이자 지원사업",
  "provider": "local",
  "views": 11069,
  "sidoName": "서울특별시",
  "sigunguName": "강남구",
  "department": "서울특별시 강남구 도시환경국 주택과",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "우편",
   "방문"
  ],
  "onlineApply": null,
  "summary": "강남구 거주 신혼부부 및 청년 주거비 부담 완화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005414&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-01"
 },
 {
  "id": "WLF00001953",
  "name": "중증장애인 의료비 지원",
  "provider": "local",
  "views": 11064,
  "sidoName": "제주특별자치도",
  "sigunguName": "제주시",
  "department": "제주특별자치도 제주시 복지위생국 장애인복지과",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "우편"
  ],
  "onlineApply": null,
  "summary": "ㅇ 장애로 인하여 의료비 지출이 높은 중증장애인의 의료비를 지원함으로써 장애인과 그 가족의 정신적 고통과 경제적 부담을 경감\nㅇ 경제적 조건 없이 의료비를 지원하여 중증 장애인의 소외감 해소",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001953&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-08"
 },
 {
  "id": "WLF00002800",
  "name": "아빠 육아휴직 장려금 지원사업",
  "provider": "local",
  "views": 11023,
  "sidoName": "부산광역시",
  "sigunguName": "수영구",
  "department": "부산광역시 수영구 복지환경국 가족행복과",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "아빠 육아휴직 장려금을 지급하여 남성의 육아참여 기회를 높이고 일과 가정생활의 양립 분위기를 조성하여 출산율 제고에 기여하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002800&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-04"
 },
 {
  "id": "WLF00006041",
  "name": "안산시 청년 부동산 중개보수 및 이사비 지원사업",
  "provider": "local",
  "views": 11019,
  "sidoName": "경기도",
  "sigunguName": "안산시",
  "department": "경기도 안산시 청년정책관",
  "targets": [
   "disability",
   "veteran",
   "multicultural"
  ],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "잦은 이사, 임차비 상승 등으로 경제적 어려움을 겪고 있는 청년 가구의 주거비 부담 완화와 생활 안전망 강화에 기여하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006041&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00001391",
  "name": "효도수당",
  "provider": "local",
  "views": 11001,
  "sidoName": "경기도",
  "sigunguName": "시흥시",
  "department": "경기도 시흥시 복지국 노인복지과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "3세대 이상 가구에 효도수당을 지급함으로써 경로효친의 건전한 가족제도 정착과 지역사회의 효문화 확산에 기여",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001391&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-15"
 },
 {
  "id": "WLF00003275",
  "name": "범죄피해자에 대한 경제적 지원 사업",
  "provider": "central",
  "views": 10982,
  "sidoName": null,
  "sigunguName": null,
  "department": "대검찰청",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "정신건강",
   "생활지원",
   "교육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "범죄피해자자에 대해 치료, 생계비, 학자금, 긴급생활안정비, 장례비 지급 등을 통해 범죄피해자의 피해회복 및 재활에 기여합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003275&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00006099",
  "name": "경기임산부 친환경농산물 지원",
  "provider": "local",
  "views": 10982,
  "sidoName": "경기도",
  "sigunguName": null,
  "department": "경기도 농수산생명과학국 친환경농업과",
  "targets": [],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "수시",
  "applyMethods": [
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "ㅇ 친환경농산물의 중장기적인 고정 소비층 확보에 따른 안정적인 소비체계 확립 및 친환경 농업을 통한 환경 보전 등 사회적 가치 구현\n\nㅇ 임산부에게 친환경농산물 공급을 통한 건강한 임신ㆍ출산 환경 조성 및 건강한 먹거리 인식제고",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006099&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-13"
 },
 {
  "id": "WLF00005072",
  "name": "탈모 치료비 지원",
  "provider": "local",
  "views": 10978,
  "sidoName": "충청남도",
  "sigunguName": "보령시",
  "department": "충청남도 보령시 보건소 건강증진과",
  "targets": [],
  "lifeStages": [
   "teen",
   "youth",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "탈모로 정신적, 육체적 고통을 받고 있는 대상자(49세 이하)에게 일상생활에 자신감을 부여하고 건강한 사회 구성원으로서 역할을 수행할 수 있도록 지원하는 사업입니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005072&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-06-06"
 },
 {
  "id": "WLF00006227",
  "name": "유선전화(인터넷요금전화포함), 초고속(인터넷통신)요금감면",
  "provider": "central",
  "views": 10971,
  "sidoName": null,
  "sigunguName": null,
  "department": "과학기술정보통신부",
  "targets": [
   "veteran",
   "disability",
   "low-income"
  ],
  "lifeStages": [
   "child",
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "감면"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "사회적 취약계층을 대상으로 가계통신비 부담완화를 위해 통신요금을 감면합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006227&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001308",
  "name": "저소득층 및 사회복지시설 생활자 지원사업(명절위로금)",
  "provider": "local",
  "views": 10949,
  "sidoName": "경기도",
  "sigunguName": "평택시",
  "department": "경기도 평택시 복지국 복지정책과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "반기",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "저소득층 및 사회복지시설 생활자 명절위로금 지급",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001308&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-19"
 },
 {
  "id": "WLF00002005",
  "name": "노인고용촉진장려금 지원",
  "provider": "local",
  "views": 10947,
  "sidoName": "제주특별자치도",
  "sigunguName": "서귀포시",
  "department": "제주특별자치도 서귀포시 복지위생국 노인복지과",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "분기",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "○ 노인의 능력과 적성에 맞는 사회적 일자리 창출을 통한 사회참여 유도\n○ 노인인력 활용에 대한 사회적 인식개선 및 민간참여 도모\n○ 노인을 지속적으로 고용하는 사업체에 대하여 장려금을 지원함으로써 사업체의 적극 참여 유도",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002005&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00005323",
  "name": "방과후학교 자유수강권 지원",
  "provider": "local",
  "views": 10923,
  "sidoName": "경상북도",
  "sigunguName": "경상북도교육청",
  "department": "경상북도교육청 정책국 행복교육지원과",
  "targets": [
   "multi-child",
   "single-parent",
   "low-income"
  ],
  "lifeStages": [
   "teen",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "감면"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "저소득, 다자녀가정 학생 등에 대한 지속적이고 실질적인 지원을 통한 교육기회 확대 및 계층 간 교육격차 완화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005323&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-06-19"
 },
 {
  "id": "WLF00004680",
  "name": "시흥형 기본교통비 지원 사업",
  "provider": "local",
  "views": 10911,
  "sidoName": "경기도",
  "sigunguName": "시흥시",
  "department": "경기도 시흥시 안전교통국 대중교통과",
  "targets": [],
  "lifeStages": [
   "teen",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "분기",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "청소년 이동 기본권 강화 및 균등한 교육의 기회 제공, 대중교통 이용 활성화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004680&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00006241",
  "name": "정신질환자 치료비 지원 사업",
  "provider": "central",
  "views": 10886,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "정신건강",
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "조현병 등 정신질환 발병 초기에 집중적인 치료를 유도하고 응급상황 입원 및 퇴원 후에도 꾸준한 치료를 받을 수 있도록 치료비를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006241&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005528",
  "name": "인천 재직청년 복지포인트",
  "provider": "local",
  "views": 10757,
  "sidoName": "인천광역시",
  "sigunguName": null,
  "department": "인천광역시 청년정책담당관",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "기타",
   "지역화폐"
  ],
  "cycle": "분기",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "인천형 청년 근로장려 인센티브 지원의 일환으로 인천 중소제조기업 재직청년들의 장기근속 유도 및 삶의 질 향상을 위해 복지포인트를 지급하는 사업입니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005528&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-15"
 },
 {
  "id": "WLF00003982",
  "name": "신혼부부 주택 매입.전세자금 대출이자 지원 안내",
  "provider": "local",
  "views": 10741,
  "sidoName": "울산광역시",
  "sigunguName": "울주군",
  "department": "울산광역시 울주군 복지교육국 여성가족과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "분기",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "신혼부부 가구에게 대출이자 지원을 통해 울주군 조기정착 및 인구유입에 기여하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003982&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-06-20"
 },
 {
  "id": "WLF00003270",
  "name": "입양·가정위탁아동 심리치료 지원",
  "provider": "central",
  "views": 10740,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "infant",
   "child",
   "teen",
   "youth"
  ],
  "themes": [
   "정신건강",
   "입양·위탁",
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "국내입양, 가정위탁아동 중 과잉행동장애(ADHD), 정서불안장애 등으로 인해 상담, 치료가 필요한 아동의 심리정서 검사, 치료비를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003270&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005227",
  "name": "산모·신생아 건강관리 지원사업 본인부담금 지원",
  "provider": "local",
  "views": 10730,
  "sidoName": "경기도",
  "sigunguName": "광주시",
  "department": "경기도 광주시 보건소 오포건강생활지원센터",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "출산가정에 산모·신생아 건강관리사를 파견하여 산모의 산후회복과 신생아의 양육을 지원하고, 출산가정의 경제적 부담을 경감하여 아이낳기 좋은 환경 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005227&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00003662",
  "name": "출산장려금 및 출생아 건강보험료 지원",
  "provider": "local",
  "views": 10692,
  "sidoName": "경상북도",
  "sigunguName": "청송군",
  "department": "경상북도 청송군 보건의료원",
  "targets": [],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "자녀의 출산 및 양육에 소요되는 청송군민들의 경제적 부담 경감",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003662&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00003182",
  "name": "산림복지일자리(산림서비스도우미)",
  "provider": "central",
  "views": 10681,
  "sidoName": null,
  "sigunguName": null,
  "department": "산림청",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "일자리"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "숲길등산지도사, 숲생태관리인, 수목원코디네이터 등 산림서비스 도우미를 고용하여 일자리를 창출하고, 국민에게 산림서비스를 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003182&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001083",
  "name": "디지털배움터",
  "provider": "central",
  "views": 10648,
  "sidoName": null,
  "sigunguName": null,
  "department": "과학기술정보통신부",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "AI·디지털 전환에 대응하여, AI·디지털 취약계층을 대상으로 키오스크부터 생성형 AI 활용법까지 AI·디지털 역량강화 교육을 제공합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001083&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003678",
  "name": "기초생활수급 노인 월동난방비 지원",
  "provider": "local",
  "views": 10631,
  "sidoName": "경기도",
  "sigunguName": null,
  "department": "경기도 복지국 노인복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "기초생활보장 수급자 노인가구에 난방비를 지원하여 생활안정 및 건강관리 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003678&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-11"
 },
 {
  "id": "WLF00004022",
  "name": "출생축하금 지원",
  "provider": "local",
  "views": 10629,
  "sidoName": "경상북도",
  "sigunguName": "포항시",
  "department": "경상북도 포항시 복지국 여성가족과",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "출생아 가정의 경제적 부담경감을 통한 출산장려 분위기 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004022&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00006115",
  "name": "화성시 청년 부동산 중개보수 및 이사비 지원",
  "provider": "local",
  "views": 10616,
  "sidoName": "경기도",
  "sigunguName": "화성시",
  "department": "경기도 화성시 성평등가족국 청년청소년과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "화성시 청년의 주거비 부담 완화를 통한 주거안정 및 정주여건 제고",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006115&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00003170",
  "name": "장애인 창업점포 지원사업",
  "provider": "central",
  "views": 10606,
  "sidoName": null,
  "sigunguName": null,
  "department": "중소벤처기업부",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [
   "일자리",
   "서민금융"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "반기",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "창업의지가 있는 장애인 예비창업자 및 재창업자(업종전환희망자)에게 창업공간을 지원하여 경제적 자립을 돕습니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003170&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002594",
  "name": "복지대상가정 자녀 학원 수강 교재비",
  "provider": "local",
  "views": 10601,
  "sidoName": "경기도",
  "sigunguName": "동두천시",
  "department": "경기도 동두천시 자치행정국 복지정책과",
  "targets": [
   "single-parent",
   "low-income"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "복지대상가정 자녀 학원 수강 교재비 (매월 최대 100천 원)",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002594&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-19"
 },
 {
  "id": "WLF00000300",
  "name": "'힘내라!' 청년 도서 구입비 지원 사업",
  "provider": "local",
  "views": 10594,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "광양시",
  "department": "전라남도 광양시 교육보육센터 도서관과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "청년층의 취업관련 도서 구입 지원을 통한 경제적 부담 완화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000300&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00005270",
  "name": "경기도 소규모 노후주택 집수리 지원사업",
  "provider": "local",
  "views": 10575,
  "sidoName": "경기도",
  "sigunguName": null,
  "department": "경기도 도시주택실 도시재생과",
  "targets": [
   "single-parent",
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "우편"
  ],
  "onlineApply": null,
  "summary": "사업목적 : 노후․불량 주택의 성능개선을 통해 주거취약계층의 주거환경개선 및 거주민의 주거복지 증진 \n\n□ 사업근거\n ○ 경기도 소규모 노후주택 집수리 지원 조례(′24. 5. 16. 전부개정)\n□ 사업개요\n ○ (대상지역) 도내 전지역\n ○ (대상주택) 사용승인일로부터 20년 이상 경과한 노후 단독주택, 15년 이상 경과한 30세대 미만 공동주택\n ○ (사업내용) 옥상방수, 도색, 주차장 조성 등 집수리 비용 지원\n ○ (지원금액)  단독주택(최대1,200만원), 공동주택(최대 공용1,600만원, 전유500만원)\n   - 자부담 10%[주거취약계층(기초생활수급자, 차상위계층, 한부모가정) 면제]\n ○ (선정기준) (1순위) 주거취약계층, 반지하 주택 소유자 → (2순위) 중위소득100% 이하, 기초연금수급자 가구 → (3순위) 일반가구",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": 100,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005270&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-07-04"
 },
 {
  "id": "WLF00001614",
  "name": "장수축하금 및 장수효도수당 지급",
  "provider": "local",
  "views": 10574,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "남구",
  "department": "전남광주통합특별시 남구 희망복지국 으뜸효정책과",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "아름다운 전통문화유산인 효를 장려하고 실천할 수 있는 사회적 분위기를 고양시켜 지역사회 효행문화 발전에 이바지함을 목표로함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001614&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00003272",
  "name": "의사상자지원",
  "provider": "central",
  "views": 10567,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "신체건강",
   "정신건강",
   "생활지원",
   "일자리",
   "교육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "본인의 직무와는 상관없이 타인의 생명이나 신체 또는 재산을 구하다가 사망하거나 부상을 입은 사람, 그 유족 또는 가족을 예우하고 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003272&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001932",
  "name": "효드림복지카드(바우처)",
  "provider": "local",
  "views": 10522,
  "sidoName": "인천광역시",
  "sigunguName": null,
  "department": "인천광역시 여성가족국 노인정책과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "75세 이상 기초수급자, 차상위(취약층) 어르신 복지증진 및 삶의 질 향상",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001932&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00001064",
  "name": "6.25자녀수당",
  "provider": "central",
  "views": 10515,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "6.25 전쟁 중 전사하거나 순직한 전몰군경 혹은 순직군경 자녀의 생활안정과 복지향상을 위하여 수당을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001064&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002707",
  "name": "안산 행복플러스카드",
  "provider": "local",
  "views": 10503,
  "sidoName": "경기도",
  "sigunguName": "안산시",
  "department": "경기도 안산시 복지국 여성보육과",
  "targets": [
   "multi-child"
  ],
  "lifeStages": [
   "child",
   "infant",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문",
   "모바일앱"
  ],
  "onlineApply": null,
  "summary": "출산 친화적인 사회 분위기 조성을 위하여 다자녀가정 및 임산부에 공공시설 사용료를 감면하여 경제적 부담을 완화하고 출산을 장려하고 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002707&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00003539",
  "name": "다문화가족 지원",
  "provider": "local",
  "views": 10501,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "영암군",
  "department": "전남광주통합특별시 영암군 문화복지국 가족행복과",
  "targets": [
   "multicultural"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "다문화가족에 대한 각종 지원사업 운영으로 우리문화에 조기정착 유도",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003539&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00005511",
  "name": "초·중·고 입학준비금 지원",
  "provider": "local",
  "views": 10498,
  "sidoName": "충청남도",
  "sigunguName": "충청남도교육청",
  "department": "충청남도교육청 교육국 유아교육복지과",
  "targets": [],
  "lifeStages": [
   "teen",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "초·중·고 신입생 입학준비금 지원을 통한 경제적 부담 경감과 미래세대 투자를 통한 저출산 극복·교육의 공공성 강화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005511&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-04"
 },
 {
  "id": "WLF00000065",
  "name": "발달장애인 공공후견지원 사업",
  "provider": "central",
  "views": 10484,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "생활지원",
   "법률"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "의사결정능력 부족으로 어려움을 겪고 있는 성인 발달장애인에게 공공후견서비스를 제공하여 자립생활을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000065&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001118",
  "name": "고등학교 무상교육",
  "provider": "central",
  "views": 10469,
  "sidoName": null,
  "sigunguName": null,
  "department": "교육부",
  "targets": [],
  "lifeStages": [
   "teen"
  ],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "기타"
  ],
  "cycle": "년",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "초·중·고 교육의 공공성을 강화하고, 학생·학부모의 교육비 부담을 덜어드립니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001118&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002633",
  "name": "참전유공자 배우자수당",
  "provider": "local",
  "views": 10457,
  "sidoName": "대전광역시",
  "sigunguName": null,
  "department": "대전광역시 복지국 보훈정책추진단",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "6,25 또는 월남전 참전유공자가 사망하였을 경우 그 배우자에게 월 8만원 지급",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002633&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-28"
 },
 {
  "id": "WLF00005650",
  "name": "신입생 입학준비금 지원",
  "provider": "local",
  "views": 10443,
  "sidoName": "서울특별시",
  "sigunguName": "노원구",
  "department": "서울특별시 노원구 미래교육국 미래교육과",
  "targets": [],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "E-mail"
  ],
  "onlineApply": null,
  "summary": "신입생 입학준비금 지원을 통한 학부모의 교육비 부담 경감 및 보편적 교육복지 실현",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005650&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00002663",
  "name": "장수축하금 지급",
  "provider": "local",
  "views": 10406,
  "sidoName": "서울특별시",
  "sigunguName": "광진구",
  "department": "서울특별시 광진구 복지국 어르신복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "고령화 사회를 맞이하여 저소득 장수노인들에게 장수축하금을 지급함으로써 노후생활의 안정과 장수를 기원하며 경로효친의 사회적 분위기 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002663&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2024-05-30"
 },
 {
  "id": "WLF00004844",
  "name": "신혼부부 결혼장려금 지원사업",
  "provider": "local",
  "views": 10402,
  "sidoName": "경상북도",
  "sigunguName": "영천시",
  "department": "경상북도 영천시 행정지원국 인구교육과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "비혼, 만혼 경향이 심화됨에 따라 수반되는 저출산 문제로 인해 인구 붕괴가 현실화 되고있음. 인구증가의 궁극적인 조건인 ‘결혼’에 대한 지원을 기존보다 늘려 출산을 장려하고 청년층의 인구확보 및 신혼부부의 안정적 기반 조성으로 인구감소에 대응하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004844&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00006273",
  "name": "햇살론특례",
  "provider": "central",
  "views": 10397,
  "sidoName": null,
  "sigunguName": null,
  "department": "금융위원회",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "서민금융"
  ],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "소득 증빙이 어렵거나 신용등급이 상대적으로 낮아 햇살론 일반보증을 이용하기 어려운 최저신용자를 제도권 금융으로 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006273&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005697",
  "name": "큰아이돌봄비용지원",
  "provider": "local",
  "views": 10383,
  "sidoName": "충청남도",
  "sigunguName": "예산군",
  "department": "충청남도 예산군 보건소 건강증진과",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "child",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "산후도우미 사용 시, 큰아이돌봄서비스 추가비용 아이당 1일 5,000원 최대 20일 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005697&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00001552",
  "name": "청소년증 발급",
  "provider": "local",
  "views": 10370,
  "sidoName": "경상북도",
  "sigunguName": "청도군",
  "department": "경상북도 청도군 행정안전복지국 평생보장과",
  "targets": [],
  "lifeStages": [
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "실물바우처"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "모든 청소년들에게 해당 연령에 대한 신분 확인과 교통수단, 문화시설 등에서의 할인 혜택제공을 통해 생활의 편의 및 다양한 문화 체험 기회를 보장함으로써 청소년의 건강한 성장을 지원함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001552&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-21"
 },
 {
  "id": "WLF00004961",
  "name": "남원시 청년 주거 정착 지원사업",
  "provider": "local",
  "views": 10368,
  "sidoName": "전북특별자치도",
  "sigunguName": "남원시",
  "department": "전북특별자치도 남원시 기획조정실 기획예산과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "반기",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "월세주택에 거주중인 청년을 대상으로 월세 최대 16만원씩 12개월 지원(자격유지시 최대 5년 지원)",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004961&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-16"
 },
 {
  "id": "WLF00003175",
  "name": "결혼이민자 통번역 서비스",
  "provider": "central",
  "views": 10363,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [
   "multicultural"
  ],
  "lifeStages": [
   "youth",
   "middle-age"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "입국초기의 결혼이민자와 다문화가족이 생활 속에서 의사소통에 불편함이 없도록 통역과 번역 서비스를 지원하며 통·번역 인력채용 등으로 자립을 돕습니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003175&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002362",
  "name": "장애인통합복지카드(A형)발급수수료 지원사업",
  "provider": "local",
  "views": 10362,
  "sidoName": "대구광역시",
  "sigunguName": "수성구",
  "department": "대구광역시 수성구 복지국 복지정책과",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "감면"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "기존 장애인통합복지카드(A형) 발급 비용을 지원함으로써 장애인들의 복지서비스 증진 및 보편적 복지를 실편하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002362&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00001066",
  "name": "참전명예수당",
  "provider": "central",
  "views": 10352,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "참전유공자에게 수당을 지급하여 생활안정과 복지향상을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001066&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004001",
  "name": "저소득 재가노인 식사배달",
  "provider": "local",
  "views": 10344,
  "sidoName": "경기도",
  "sigunguName": null,
  "department": "경기도 복지국 노인복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "주",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "가정 형편이 어렵거나 기타 부득이한 사유로 점심을 거르시는 거동불편 어르신에게 식사 배달 사업을 통해 노인 급식 수준 향상",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004001&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-11"
 },
 {
  "id": "WLF00002961",
  "name": "공영장례비지원",
  "provider": "local",
  "views": 10340,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "신안군",
  "department": "전남광주통합특별시 신안군 문화예술관광국 노인건강과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문",
   "우편"
  ],
  "onlineApply": null,
  "summary": "가족해체와 빈곤 등으로 인하여 장례를 치를 수 없는 사람의 장례를 지원함으로써\n고인의 존엄성을 유지하고 상부상조의 공동체 의식과\n'요람에서 무덤까지'라는 사회복지의 가치를 실현하는 것을 목적으로 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002961&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-06"
 },
 {
  "id": "WLF00003216",
  "name": "국가보훈대상자학습보조비지급",
  "provider": "central",
  "views": 10337,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [],
  "themes": [
   "교육"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "반기",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "국가보훈 관계법령에 따른 교육지원대상자에 대해 학용품구입 등 교육에 필요한 부대비용 명목의 교육비를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003216&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005481",
  "name": "난청 어르신 보청기 지원 사업",
  "provider": "local",
  "views": 10294,
  "sidoName": "경상북도",
  "sigunguName": "영천시",
  "department": "경상북도 영천시 문화관광복지국 사회복지과",
  "targets": [
   "low-income",
   "disability"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "반기",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "❏ 난청은 노년기의 대표적인 건강문제로 의사소통 장애뿐 아니라 사회적 고립, 우울감 증가 및 인지기능 저하의 원인으로 작용하고 있음.\n ❏ 보청기는 난청으로 인한 기능 저하를 개선하는 가장 효과적인 보조기기이나, 높은 구입비용으로 인해 경제적 부담감을 느끼는 어르신이 많아 공공 차원의 지원 필요성이 지속적으로 제기되어 왔음.\n ❏ 이에 「영천시 난청 어르신 보청기 지원 조례」에 따라 난청 어르신에게 보청기 구입비를 지원하여 건강한 노후생활과 복지증진에 기여하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005481&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-05"
 },
 {
  "id": "WLF00001341",
  "name": "청소년증발급",
  "provider": "local",
  "views": 10287,
  "sidoName": "서울특별시",
  "sigunguName": "노원구",
  "department": "서울특별시 노원구 교육복지국 아동청소년과",
  "targets": [],
  "lifeStages": [
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "청소년 공적신분증",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001341&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00001181",
  "name": "중앙노인돌봄지원기관 운영지원",
  "provider": "central",
  "views": 10264,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [
   "생활지원",
   "보호·돌봄"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "분기",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "중앙노인돌봄지원기관 수탁운영 법인을 지원하여 노인맞춤돌봄서비스 등의 원활한 추진을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001181&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004329",
  "name": "장기요양서비스 이용자 본인일부 부담금 지원",
  "provider": "local",
  "views": 10246,
  "sidoName": "경상남도",
  "sigunguName": "함양군",
  "department": "경상남도 함양군 경제복지국 노인복지과",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문",
   "팩스"
  ],
  "onlineApply": null,
  "summary": "치매, 중풍 등 노인성질환으로 군민들이 장기요양등급판정을 받고 장기요양서비스(재가 또는 시설급여)를 받고 있으나, 저소득층 군민들은 본인부담금의 부담 때문에 장기요양서비스를 받지 못하는 등 노인복지 사각지대 해소를 위해 본인부담금의 일부를 지원 코자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004329&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-07"
 },
 {
  "id": "WLF00004066",
  "name": "산후조리비용 지원",
  "provider": "local",
  "views": 10232,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "순천시",
  "department": "전남광주통합특별시 순천시 시민복지국 보육아동과",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "youth",
   "middle-age",
   "infant"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "산후조리비용을 지원해 산모와 신생아의 건강 보호",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004066&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-20"
 },
 {
  "id": "WLF00003833",
  "name": "창원시 신혼부부 전세자금 대출이자 지원",
  "provider": "local",
  "views": 10209,
  "sidoName": "경상남도",
  "sigunguName": "창원시",
  "department": "경상남도 창원시 도시정책국 주택정책과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "신혼부부의 주거비 부담 완화 및 안정된 정주여건 조성으로 혼인과 저출산 문제를 해결",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003833&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-11"
 },
 {
  "id": "WLF00001072",
  "name": "가정폭력·성폭력 등 폭력 피해자 무료법률지원",
  "provider": "central",
  "views": 10202,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "안전·위기",
   "법률"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "가정폭력 및 성폭력, 스토킹, 교제폭력 피해자 대상 무료법률지원을 통해 권익을 보호합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001072&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003930",
  "name": "중증장애인활동보조추가지원(구비지원)",
  "provider": "local",
  "views": 10195,
  "sidoName": "대구광역시",
  "sigunguName": "중구",
  "department": "대구광역시 중구 주민복지국 생활보장과",
  "targets": [
   "disability"
  ],
  "lifeStages": [
   "youth",
   "teen",
   "senior",
   "middle-age",
   "child"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "법정급여로 제공되는 장애인활동지원 시간 외에 추가로 필요하다고 인정되는 경우 구비로 활동지원시간을 추가로 지원하여 중증장애인의 일상생활 영위와 자립을 돕고 장애인 가족의 돌봄 부담을 경감하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003930&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00004841",
  "name": "결혼축하금 지원 사업",
  "provider": "local",
  "views": 10194,
  "sidoName": "경상남도",
  "sigunguName": "진주시",
  "department": "경상남도 진주시 복지여성국 여성가족과",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "결혼장려 분위기를 조성하고 신혼부부에게 경제적 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004841&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00003832",
  "name": "출산축하금 지원사업",
  "provider": "local",
  "views": 10186,
  "sidoName": "경상남도",
  "sigunguName": "창원시",
  "department": "경상남도 창원시 복지여성보건국 여성가족과",
  "targets": [],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "출산축하금을 지원하여 영아의 출산을 축하하고 출산가정에 경제적 지원을 하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003832&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-21"
 },
 {
  "id": "WLF00000896",
  "name": "중독관리통합지원센터 지원",
  "provider": "central",
  "views": 10176,
  "sidoName": null,
  "sigunguName": null,
  "department": "보건복지부",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "정신건강"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "중독관리통합지원센터를 설치·운영하여 통합적인 문제 음주자 및 알코올 등 중독자 관리체계를 구축하고, 중독자 조기발견·상담·치료·재활 및 사회로의 복귀를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000896&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004057",
  "name": "화성시 무상교통 사업",
  "provider": "local",
  "views": 10167,
  "sidoName": "경기도",
  "sigunguName": "화성시",
  "department": "경기도 화성시 교통국 대중교통과",
  "targets": [],
  "lifeStages": [
   "child",
   "youth",
   "senior",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷",
   "모바일"
  ],
  "onlineApply": null,
  "summary": "시민의 이동권 보장 및 대중교통이용 활성화",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004057&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-31"
 },
 {
  "id": "WLF00001085",
  "name": "산재근로자원직장복귀지원",
  "provider": "central",
  "views": 10161,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "일자리",
   "안전·위기"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "산업재해로 장해를 입은 근로자가 기존 직장으로 복귀할 수 있도록 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001085&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00003641",
  "name": "신장장애인 투석비 및 이식검사비 지원",
  "provider": "local",
  "views": 10120,
  "sidoName": "충청북도",
  "sigunguName": "청주시",
  "department": "충청북도 청주시 복지국 장애인복지과",
  "targets": [
   "low-income",
   "disability"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "신장장애인 투석비용 및 이식검사비 지원을 통한 경제적 부담 경감",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003641&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-20"
 },
 {
  "id": "WLF00001090",
  "name": "장애인고용장려금",
  "provider": "central",
  "views": 10119,
  "sidoName": null,
  "sigunguName": null,
  "department": "고용노동부",
  "targets": [
   "disability"
  ],
  "lifeStages": [],
  "themes": [
   "일자리"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "장애인 의무고용률을 초과하여 장애인을 고용하는 사업주에게 고용장려금을 지급하여 장애인 근로자의 직업생활 안정을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001090&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00000848",
  "name": "의료급여수급자 노인틀니 본인부담금 지원",
  "provider": "local",
  "views": 10090,
  "sidoName": "부산광역시",
  "sigunguName": "중구",
  "department": "부산광역시 중구 경제복지국 생활보장과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "팩스",
   "방문",
   "우편"
  ],
  "onlineApply": null,
  "summary": "치아의 결손으로 음식물 섭취가 자유롭지 못한 65세 이상 의료급여 수급 어르신을 대상으로 의치(틀니)시술 시 \n본인부담금을  지원하여 구강기능 회복에 기여하고 건강한 생활을 영위토록 지원코자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000848&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-25"
 },
 {
  "id": "WLF00003203",
  "name": "사망일시금",
  "provider": "central",
  "views": 10077,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "독립(국가)유공자, 보훈보상대상자 및 그 유족이 사망한 경우 생활 안정과 복지 향상을 위하여 사망일시금을 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003203&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001105",
  "name": "가정폭력피해자 치료회복 프로그램 및 의료비지원",
  "provider": "central",
  "views": 10032,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [],
  "lifeStages": [],
  "themes": [
   "신체건강",
   "정신건강",
   "안전·위기"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "가정폭력피해자 등의 정신적, 육체적 회복을 위한 프로그램을 제공하고 의료비를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001105&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004576",
  "name": "임산부 교통비 지원",
  "provider": "local",
  "views": 10016,
  "sidoName": "경상남도",
  "sigunguName": "밀양시",
  "department": "경상남도 밀양시 보건소 건강증진과",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "교통비 지원으로 임산부에 대한 배려와 이용편의를 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004576&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00005373",
  "name": "초등학생 입학축하금 지원사업",
  "provider": "local",
  "views": 10009,
  "sidoName": "경기도",
  "sigunguName": "양주시",
  "department": "경기도 양주시 복지교육국 미래교육과",
  "targets": [],
  "lifeStages": [
   "child"
  ],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "양주시 교육의 공공성 강화 및 교육복지 실현에 기여하기 위함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005373&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-04"
 },
 {
  "id": "WLF00002982",
  "name": "기초생활보장수급자 자녀 교통비 지원",
  "provider": "local",
  "views": 10007,
  "sidoName": "경상남도",
  "sigunguName": "창원시",
  "department": "경상남도 창원시 복지여성보건국 사회복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "child",
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "분기",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "기초생활보장수급자(생계,의료) 자녀들에게(중.고등학생)교통비를 지원하여 저소득 가구의 지출 부담 경감",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002982&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-04"
 },
 {
  "id": "WLF00001065",
  "name": "고엽제후유의증수당",
  "provider": "central",
  "views": 10002,
  "sidoName": null,
  "sigunguName": null,
  "department": "국가보훈부",
  "targets": [
   "veteran"
  ],
  "lifeStages": [],
  "themes": [
   "생활지원"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "고엽제후유의증환자에게 수당을 지급하여 생활안정과 복지향상을 도모합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001065&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00005759",
  "name": "충청북도 농어업인 공익수당 지원",
  "provider": "local",
  "views": 10002,
  "sidoName": "충청북도",
  "sigunguName": null,
  "department": "충청북도 농정국 농업정책과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "지역화폐",
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "사업목적 \n\n - 농업농촌이 가지고 있는 공익적 기능의 보전 및 증진을 통하여 지속가능한 농업 농촌환경 조성과 도민의 삶의 질 향상 도모\n - 농업인의 삶의 질 향상 및 농촌사회 공동화 대응, 농업인 소득안정 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005759&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2025-05-31"
 },
 {
  "id": "WLF00001145",
  "name": "디지털미디어 피해 청소년 회복 지원 사업(청소년 인터넷·스마트폰 과의존 치료비 지원)",
  "provider": "central",
  "views": 9995,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [],
  "lifeStages": [
   "child",
   "teen",
   "youth"
  ],
  "themes": [
   "정신건강"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "급격한 미디어 환경의 변화와 청소년의 매체이용 증가로 인한 사이버도박, 인터넷･스마트폰 과의존 등의 디지털미디어 역기능으로부터 청소년을 보호합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001145&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002933",
  "name": "저소득 한부모가족 자립지원",
  "provider": "local",
  "views": 9989,
  "sidoName": "경상남도",
  "sigunguName": null,
  "department": "경상남도 복지여성국 여성가족과",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [
   "teen",
   "child",
   "infant",
   "middle-age"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "저소득 한부모가족의 가족기능 유지 및 건강한 생활 영위",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002933&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00001229",
  "name": "여성농업인 행복바우처 지원",
  "provider": "local",
  "views": 9973,
  "sidoName": "대전광역시",
  "sigunguName": null,
  "department": "대전광역시 경제과학국 농생명정책과",
  "targets": [],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "농업을 주생계수단으로 하면서 가사를 병행하는 여성농업인에게 문화활동 등 기회를 제공하여 삶의 질 향상 및 복지증진에 기여",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001229&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2024-06-04"
 },
 {
  "id": "WLF00002471",
  "name": "서초구 기초수급자 이사지원",
  "provider": "local",
  "views": 9946,
  "sidoName": "서울특별시",
  "sigunguName": "서초구",
  "department": "서울특별시 서초구 주민생활국 사회복지과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "이사비용 마련에 어려움을 겪는 서초구 저소득 주민에 법정급여 외 이사비용을 지원하여 생활안정을 도모하는 사업입니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002471&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-19"
 },
 {
  "id": "WLF00004850",
  "name": "임신부 가사돌봄 서비스",
  "provider": "local",
  "views": 9942,
  "sidoName": "서울특별시",
  "sigunguName": "중구",
  "department": "서울특별시 중구 복지환경국 가족정책과",
  "targets": [],
  "lifeStages": [
   "pregnancy",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "인터넷",
   "방문"
  ],
  "onlineApply": null,
  "summary": "임신부의 가정내 가사돌보미 파견, 가사서비스 등 지원\n    - 가사 돌봄서비스(청소, 설거지, 세탁, 정리정돈 등)\n    - 임신부 돌봄서비스 (임신부 식사 및 간단한 반찬준비, 개인위생 보조)",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004850&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-15"
 },
 {
  "id": "WLF00003125",
  "name": "양주시 출산축하금 지원사업",
  "provider": "local",
  "views": 9921,
  "sidoName": "경기도",
  "sigunguName": "양주시",
  "department": "경기도 양주시 복지교육국 가족아동과",
  "targets": [],
  "lifeStages": [
   "infant",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "신생아의 탄생을 축하하고 출산가정의 경제적 부담을 경감하여 임신과 출산에 유리한 환경 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003125&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-13"
 },
 {
  "id": "WLF00001860",
  "name": "강원특별자치도 청년 취업준비 쿠폰 지원사업",
  "provider": "local",
  "views": 9903,
  "sidoName": "강원특별자치도",
  "sigunguName": null,
  "department": "강원도 경제국 일자리과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "월",
  "applyMethods": [
   "모바일",
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "도내 미취업 청년들의 구직활동을 위한 필요 경비 지원으로 취업취약계층인 미취업 청년들의 취업동기 부여 및 노동시장 조기 진입 유도, 경제적 부담경감을 도모하고자 함.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001860&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2024-06-13"
 },
 {
  "id": "WLF00003615",
  "name": "다문화가족 지원(가족센터 특화프로그램)",
  "provider": "local",
  "views": 9805,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "고흥군",
  "department": "전남광주통합특별시 고흥군 가족행복과",
  "targets": [
   "multicultural"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "* 다문화가족에 대한 사회적 차별 및 편견을 예방하고 사회구성원이 문화적 다양성을 인정하고 존중할 수 있도록 교육과 홍보, 결혼 이민자 등이 필요한 기본적 정보제공 및 사회적응 교육과 직업교육·훈련 등을 받을 수 있도록 필요한 지원\n * 가족의 유형별로 이원화되어 있는 가족지원서비스를 가족의 유형에 상관없이 한 곳에서 보편적이고 포괄적인 서비스 제공\n * 다문화가족의 안정적인 정착과 가족생활을 지원하기 위해 가족 및 자녀 교육상담, 통ㆍ번역 및 정보 제공, 역량 강화 지원 등 종합적인 서비스를 제공하여 다문화가족의 조기정착 및 사회ㆍ경제적 자립 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003615&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-27"
 },
 {
  "id": "WLF00004149",
  "name": "65세 이상 기초생활수급자 및 75세 이상 대상포진 예방접종",
  "provider": "local",
  "views": 9787,
  "sidoName": "서울특별시",
  "sigunguName": "광진구",
  "department": "서울특별시 광진구 보건소 건강관리과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "기타"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "인공면역 획득을 통한 발병률  및 합병증 감소, 건강증진 도모 및 경제적 부담 절감",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004149&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-20"
 },
 {
  "id": "WLF00003035",
  "name": "저소득층 건강보험료 지원 사업",
  "provider": "local",
  "views": 9759,
  "sidoName": "충청남도",
  "sigunguName": "홍성군",
  "department": "충청남도 홍성군 행정복지국 복지정책과",
  "targets": [
   "single-parent",
   "disability"
  ],
  "lifeStages": [
   "middle-age",
   "senior",
   "infant",
   "child",
   "teen",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급",
   "기타"
  ],
  "cycle": "월",
  "applyMethods": [
   "전화"
  ],
  "onlineApply": null,
  "summary": "질병, 노령, 장애 등으로 생활에 어려움을 겪고있는 저소득세대에게 국민건강보험료 및 장기요양보험료를 지원함으로써 군민의 건강증진과 사회복지 향상을 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003035&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00005774",
  "name": "다자녀가정 다둥이카드 발급(전북은행)",
  "provider": "local",
  "views": 9735,
  "sidoName": "전북특별자치도",
  "sigunguName": "전주시",
  "department": "전북특별자치도 전주시 인구청년정책국 인구정책과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "감면"
  ],
  "cycle": "수시",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "전주시에 주민등록을 둔 2자녀 이상 가정 중에서 자녀 중 1명 이상이 만 18세 이하인 가정에 경제적 부담 완화 및 출생 장려 환경 조성",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005774&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-29"
 },
 {
  "id": "WLF00000532",
  "name": "임신부 기형아 검사 지원사업",
  "provider": "local",
  "views": 9725,
  "sidoName": "경상북도",
  "sigunguName": "구미시",
  "department": "경상북도 구미시 구미보건소 건강증진과",
  "targets": [],
  "lifeStages": [
   "middle-age",
   "youth",
   "teen",
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "실물바우처"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "산전 기형아검사비 지원으로 임신 전 의료비 부담 경감에 기여하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000532&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00001032",
  "name": "청년 임차보증금 대출이자 지원(머물자리론)",
  "provider": "local",
  "views": 9720,
  "sidoName": "부산광역시",
  "sigunguName": null,
  "department": "부산광역시 청년산학국 청년정책과",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "인터넷"
  ],
  "onlineApply": null,
  "summary": "목돈마련이 어려운 청년(대학생, 취업준비생, 직장인)의 주거비 부담 경감을 위해 임차보증금 대출·이자 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001032&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-04"
 },
 {
  "id": "WLF00000018",
  "name": "전라남도 농어민 공익수당 지원사업",
  "provider": "local",
  "views": 9713,
  "sidoName": "전남광주통합특별시",
  "sigunguName": null,
  "department": "전남광주통합특별시 농수산본부 농수산정책관 농업정책과",
  "targets": [],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "지역화폐"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "농어민 공익수당 지급으로 농어업과 농처온의 공익적·다원적 가치에 대해 보상하고 인구감소, 고령화 등 농어촌 문제를 해결하여 지속가능한 농어촌 발전 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000018&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-17"
 },
 {
  "id": "WLF00004437",
  "name": "울주군 청소년성장지원금 지원사업",
  "provider": "local",
  "views": 9681,
  "sidoName": "울산광역시",
  "sigunguName": "울주군",
  "department": "울산광역시 울주군 복지교육국 여성가족과",
  "targets": [],
  "lifeStages": [
   "teen"
  ],
  "themes": [],
  "payTypes": [
   "현물지급",
   "실물바우처"
  ],
  "cycle": "분기",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "학업을 이어나가는 지역 청소년들의 경제적 부담을 낮추고, 건전하게 성장하여 미래 사회 구성원으로서의 역할을 수행할 수 있도록 울주군의 미래인재 양성을 위하여 지급하는 복지지원 제도",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004437&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00002331",
  "name": "국민기초생활보장수급자 쓰레기봉투 및 음식물쓰레기봉투 지원",
  "provider": "local",
  "views": 9672,
  "sidoName": "인천광역시",
  "sigunguName": "미추홀구",
  "department": "인천광역시 미추홀구 복지환경국 기초생활보장과",
  "targets": [
   "low-income"
  ],
  "lifeStages": [],
  "themes": [],
  "payTypes": [
   "현물지급"
  ],
  "cycle": "월",
  "applyMethods": [],
  "onlineApply": null,
  "summary": "국민기초생활보장수급자에게 쓰레기봉투 및 음식물 쓰레기봉투를 지원을 통한 고독사 예방",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002331&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00002428",
  "name": "청년 희망 디딤돌 통장 지원사업",
  "provider": "local",
  "views": 9672,
  "sidoName": "전남광주통합특별시",
  "sigunguName": "영광군",
  "department": "전남광주통합특별시 영광군 인구교육정책실",
  "targets": [],
  "lifeStages": [
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "월",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "청년이 안정되고 구체적인 미래 계획을 수립할 수 있도록 재정적 지원을 통한 저소득 근로청년의 자립의욕 고취",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002428&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-14"
 },
 {
  "id": "WLF00006268",
  "name": "불법사금융예방대출",
  "provider": "central",
  "views": 9666,
  "sidoName": null,
  "sigunguName": null,
  "department": "금융위원회",
  "targets": [
   "low-income"
  ],
  "lifeStages": [
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "서민금융"
  ],
  "payTypes": [
   "현금대여(융자)"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "불법사금융에 노출되기 쉬운 저신용·저소득 금융취약계층의 대출수요를 정책서민금융으로 흡수하기 위해 소액의 생계비를 긴급하게 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006268&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00002306",
  "name": "장수축하금 지원",
  "provider": "local",
  "views": 9645,
  "sidoName": "서울특별시",
  "sigunguName": "노원구",
  "department": "서울특별시 노원구 주민복지국 어르신지원과",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "만 90세, 만 100세(노원구 거주기간 1년이상)자에 대하여 재산과 관계없이 장수축하금을 지급하여 노인의 보건 및 복지증진을 기하고 경로효친의 사회적 분위기를 조성하는데 필요한 사항을 규정함을 목적으로 한다",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002306&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-03"
 },
 {
  "id": "WLF00005505",
  "name": "어르신 병원동행서비스 사업",
  "provider": "local",
  "views": 9613,
  "sidoName": "강원특별자치도",
  "sigunguName": null,
  "department": "강원특별자치도 복지보건국 노인복지과",
  "targets": [],
  "lifeStages": [
   "senior"
  ],
  "themes": [],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [
   "전화",
   "방문"
  ],
  "onlineApply": null,
  "summary": "돌봄이 필요한 노인과 병원동행하여 의료서비스 받을 수 있도록 지원",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00005505&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-08-04"
 },
 {
  "id": "WLF00006278",
  "name": "서민금융진흥원 소액보험(한부모가정의료보험)",
  "provider": "central",
  "views": 9587,
  "sidoName": null,
  "sigunguName": null,
  "department": "금융위원회",
  "targets": [
   "single-parent"
  ],
  "lifeStages": [
   "child",
   "teen",
   "youth",
   "middle-age",
   "senior"
  ],
  "themes": [
   "서민금융"
  ],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "경제적 기반이 취약하고, 불의의 사고로 마주할 수 있는 경제적 위기에 대응 할 수 있도록 보험계약의 체결·유지를 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006278&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00001990",
  "name": "산모 신생아 건강관리 본인부담금 지원",
  "provider": "local",
  "views": 9577,
  "sidoName": "강원특별자치도",
  "sigunguName": null,
  "department": "강원도 보건체육국 공공의료과",
  "targets": [],
  "lifeStages": [
   "pregnancy"
  ],
  "themes": [],
  "payTypes": [
   "현금지급"
  ],
  "cycle": "1회성",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "산모 신생아 건강관리 지원사업의 본인부담금 일부를 지원하여 출산가정의 경제적 부담 경감 및 아이낳고 키우기 좋은 환경을 조성하고자 함",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001990&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2026-07-23"
 },
 {
  "id": "WLF00003200",
  "name": "청소년동반자프로그램 운영",
  "provider": "central",
  "views": 9565,
  "sidoName": null,
  "sigunguName": null,
  "department": "성평등가족부",
  "targets": [],
  "lifeStages": [
   "child",
   "teen",
   "youth"
  ],
  "themes": [
   "정신건강",
   "생활지원",
   "보호·돌봄"
  ],
  "payTypes": [
   "프로그램/서비스(서비스)"
  ],
  "cycle": "수시",
  "applyMethods": [],
  "onlineApply": false,
  "summary": "위기 청소년을 대상으로 전문가가 찾아가서 심층상담을 하고, 청소년 동반자 프로그램을 통해 심리적·정서적 지지를 얻을 수 있도록 지원합니다.",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003200&wlfareInfoReldBztpCd=01",
  "baseYear": null,
  "updatedAt": null
 },
 {
  "id": "WLF00004037",
  "name": "여성농업인 복지바우처 지원",
  "provider": "local",
  "views": 9565,
  "sidoName": "강원특별자치도",
  "sigunguName": null,
  "department": "강원도 농정국 농정과",
  "targets": [],
  "lifeStages": [
   "middle-age",
   "senior",
   "youth"
  ],
  "themes": [],
  "payTypes": [
   "전자바우처(바우처)"
  ],
  "cycle": "년",
  "applyMethods": [
   "방문"
  ],
  "onlineApply": null,
  "summary": "농작업, 가사, 육아를 병행하는 여성농업인에게 문화 혜택의 기회 제공으로 영농의욕 고취 및 삶의 질 향상 도모",
  "outline": null,
  "eligibility": null,
  "selectionCriteria": null,
  "supportContent": null,
  "applyMethod": null,
  "applySteps": [],
  "medianPercent": null,
  "applyStart": null,
  "applyEnd": null,
  "contacts": [],
  "homepages": [],
  "lawBasis": [],
  "forms": [],
  "officialUrl": "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004037&wlfareInfoReldBztpCd=02",
  "baseYear": null,
  "updatedAt": "2024-06-15"
 }
];

/** 데이터 파일을 마지막으로 갱신한 날. sitemap의 lastmod에 쓴다. */
export const SERVICES_UPDATED = "2026-08-31";
