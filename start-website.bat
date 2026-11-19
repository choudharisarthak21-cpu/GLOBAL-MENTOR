@echo off
title Global Mentor Dev Server
echo Starting Global Mentor...
set PATH=C:\Program Files\nodejs;%PATH%
start http://localhost:5173
call npm.cmd run dev
pause
