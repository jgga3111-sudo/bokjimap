@echo off
chcp 65001 > nul
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"

echo ============================================
echo  복지맵 - 오늘치 상세 수집
echo ============================================
echo.
echo  공공데이터포털 개발계정 한도: 하루 1,000콜
echo  이 스크립트는 900건만 받습니다(재시도 여유분 100).
echo  한도는 자정(KST)에 초기화됩니다.
echo.
echo  이미 받은 것은 건너뛰므로 여러 번 돌려도 안전합니다.
echo.

node --env-file=.env.local scripts/fetch-detail.mjs 900
if errorlevel 1 goto :failed

echo.
echo --- 수집한 것을 사이트 데이터로 변환 ---
node scripts/build-data.mjs 600
if errorlevel 1 goto :failed

echo.
echo --- 데이터 정합성 점검 ---
node scripts/audit-data.mjs
if errorlevel 1 goto :failed

echo.
echo ============================================
echo  끝났습니다.
echo  배포는 클로드에게 "수집 끝났어"라고 말씀하세요.
echo ============================================
goto :end

:failed
echo.
echo ############################################
echo  중간에 실패했습니다. 위 메시지를 클로드에게
echo  그대로 보여주세요.
echo ############################################

:end
echo.
pause
