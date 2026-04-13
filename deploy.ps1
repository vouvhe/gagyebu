# 가계부 배포 스크립트 - 프로젝트 폴더에서 실행
$env:PATH = 'C:\Program Files\nodejs;C:\Program Files\GitHub CLI;' + $env:PATH

# 스크립트가 있는 폴더로 이동
Set-Location $PSScriptRoot

$msg = if ($args[0]) { $args[0] } else { "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" }

Write-Host "`n[1/3] Git 커밋 & Push..." -ForegroundColor Cyan
git add .
git commit -m $msg
git push origin master

Write-Host "`n[2/3] Vercel 배포 중..." -ForegroundColor Cyan
$env:VERCEL_ORG_ID     = "team_BNQ2pr4rmKiNNi4eyt4YZDNP"
$env:VERCEL_PROJECT_ID = "prj_yxaWA3E8hTcnmGHM2HH35LXMZVHG"
node "C:\Users\yonghwan.kim\AppData\Roaming\npm\node_modules\vercel\dist\vc.js" --prod --yes

Write-Host "`n[3/3] 완료!" -ForegroundColor Green
Write-Host "URL: https://gagyebu-vert.vercel.app" -ForegroundColor Yellow
