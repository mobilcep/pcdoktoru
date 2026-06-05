@echo off
chcp 65001 >nul
cd /d "%~dp0"
set SCOPE=--scope numexai-1029s-projects
set REPO=https://github.com/mobilcep/pcdoktoru-site.git

echo.
echo === PC Doktoru — Git + Vercel baglantisi ===
echo.
echo ONCE: GitHub'da bos repo acin (mobilcep hesabi):
echo   https://github.com/new
echo   Repository name: pcdoktoru-site
echo   Public, README EKLEMEYIN (bos repo)
echo.
pause

git remote remove origin 2>nul
git remote add origin %REPO%
echo.
echo [1/3] GitHub'a push (tarayicida giris istenebilir)...
git push -u origin main
if errorlevel 1 (
  echo.
  echo Push basarisiz. GitHub'da repo olusturdunuz mu? mobilcep ile giris yapin.
  pause
  exit /b 1
)

echo.
echo [2/3] Vercel projesine Git bagla...
call npx vercel@latest git connect %REPO% %SCOPE%
if errorlevel 1 (
  echo.
  echo CLI baglanti basarisiz — Vercel panelden de yapabilirsiniz:
  echo   vercel.com -^> site projesi -^> Settings -^> Git -^> Connect
  echo   Repo: mobilcep/pcdoktoru-site, Production Branch: main
  pause
  exit /b 1
)

echo.
echo [3/3] Production deploy tetikle...
call npx vercel@latest deploy --prod --yes %SCOPE%

echo.
echo === TAMAM ===
echo Artik: git add . ^&^& git commit ^&^& git push  -^>  otomatik Vercel deploy
echo Site: https://pcdoktoru.com.tr
echo.
pause
