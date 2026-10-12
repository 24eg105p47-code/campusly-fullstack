@echo off
cd /d "%~dp0frontend"
echo Installing frontend packages if needed, then starting at http://localhost:5500 ...
if not exist node_modules call npm install
call npm run dev
pause
