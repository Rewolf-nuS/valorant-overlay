@echo off

cd /d %~dp0

del /q ".\dist\client\*"
copy ".\client\*" ".\dist\client"
del /q ".\dist\client\index.html"
del /q ".\dist\client\valorant-overlay.ts"

copy ".\.env" ".\dist\.env"