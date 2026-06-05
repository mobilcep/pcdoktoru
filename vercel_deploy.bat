@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo === PC Doktoru — Vercel deploy (tools/site) ===
echo.

where npx >nul 2>&1 || (echo Node/npx yok. Node.js kurun. & pause & exit /b 1)

echo [1/3] Oturum kontrolu...
call npx vercel@latest whoami 2>nul
if errorlevel 1 (
  echo.
  echo Vercel giris gerekli — tarayicida acilan linki onaylayin.
  call npx vercel@latest login
)

echo.
echo [2/3] Onizleme deploy...
set SCOPE=--scope numexai-1029s-projects

call npx vercel@latest link --yes %SCOPE% 2>nul

echo.
echo [2/3] Production deploy...
call npx vercel@latest deploy --prod --yes %SCOPE%
if errorlevel 1 (echo Prod deploy basarisiz. & pause & exit /b 1)

echo.
echo [3/3] Alan adi (ilk seferde)...
call npx vercel@latest domains add pcdoktoru.com.tr %SCOPE% 2>nul
call npx vercel@latest domains add www.pcdoktoru.com.tr %SCOPE% 2>nul

echo.
echo === TAMAM ===
echo Site: https://pcdoktoru.com.tr  (DNS ayarindan sonra)
echo Indir linki: site-config.js icindeki GitHub Releases URL
echo.
echo DNS (alan adi paneli):
echo   A     @   -^>  76.76.21.21
echo   CNAME www -^>  cname.vercel-dns.com
echo.
pause
