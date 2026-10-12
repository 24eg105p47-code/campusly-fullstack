@echo off
cd /d "%~dp0backend"
echo Starting Campusly backend at http://localhost:8081 ...
call mvn spring-boot:run
pause
