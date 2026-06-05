@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo === PC Doktoru — Vercel lisans + env kurulumu ===
echo.

where npx >nul 2>&1 || (echo Node yok. & pause & exit /b 1)
set SCOPE=--scope numexai-1029s-projects

echo [1] Blob store (manuel — bir kez):
echo   vercel.com ^> pcdoktoru ^> Storage ^> Create Database ^> Blob
echo   Store adi: pcd-lisans-data
echo   BLOB_READ_WRITE_TOKEN otomatik eklenir.
echo.
pause

echo [2] Gizli anahtarlar uretiliyor...
for /f %%a in ('powershell -NoProfile -Command "[guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N')"') do set RND=%%a
set LISANS_GIZLI=%RND%
for /f %%a in ('powershell -NoProfile -Command "[guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N')"') do set RND2=%%a
set ODEME_GIZLI=%RND2%
for /f %%a in ('powershell -NoProfile -Command "[guid]::NewGuid().ToString('N')"') do set ADMIN=%RND%

echo LISANS_GIZLI=%LISANS_GIZLI%
echo ODEME_GIZLI=%ODEME_GIZLI%
echo LISANS_ADMIN_GIZLI=%ADMIN%
echo.
echo Bu degerleri not edin! vercel env add ile ekleniyor...

echo %LISANS_GIZLI%| npx vercel@latest env add LISANS_GIZLI production %SCOPE%
echo %ODEME_GIZLI%| npx vercel@latest env add ODEME_GIZLI production %SCOPE%
echo %ADMIN%| npx vercel@latest env add LISANS_ADMIN_GIZLI production %SCOPE%

echo.
echo [3] Production deploy...
call npx vercel@latest deploy --prod --yes %SCOPE%

echo.
echo [4] Beta anahtarlari yukle:
echo   set LISANS_ADMIN_GIZLI=%ADMIN%
echo   node scripts\seed-anahtarlar.mjs
echo.
echo [5] Test: https://pcdoktoru.com.tr/api/lisans/saglik
echo.
pause
