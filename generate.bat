@echo off
REM Generate Articles from Google Apps Script Web App
REM This script requires Node.js to be installed

echo.
echo ========================================
echo Warta Jabar Article Generator
echo ========================================
echo.

REM Check if Node is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Choose the LTS version and run the installer.
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js found
node --version

echo.
echo Running generator...
echo.

REM Run the generator
node tools/generate.js

if %ERRORLEVEL% equ 0 (
    echo.
    echo [SUCCESS] Articles generated!
    echo.
    echo Next steps:
    echo  1. Open news.html in your browser
    echo  2. Check that articles are loaded
    echo  3. Test pagination, search, filters
    echo.
) else (
    echo.
    echo [ERROR] Generator failed!
    echo Check the error message above.
    echo.
)

pause
