# Warta Jabar Article Generator (PowerShell)
# Run articles generator from Google Apps Script Web App

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Warta Jabar Article Generator" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node is installed
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue

if (-not $nodeCheck) {
    Write-Host "[ERROR] Node.js is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Choose the LTS version and run the installer." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[OK] Node.js found" -ForegroundColor Green
node --version

Write-Host ""
Write-Host "Running generator..." -ForegroundColor Cyan
Write-Host ""

# Run the generator
node tools/generate.js

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[SUCCESS] Articles generated!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host " 1. Open news.html in your browser"
    Write-Host " 2. Check that articles are loaded"
    Write-Host " 3. Test pagination, search, filters"
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "[ERROR] Generator failed!" -ForegroundColor Red
    Write-Host "Check the error message above."
    Write-Host ""
}

Read-Host "Press Enter to exit"
