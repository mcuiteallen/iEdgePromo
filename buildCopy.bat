@echo off

call npm run build

echo Start to copy

rmdir D:\nginx\nginx-1.16.1\pwa \s \q
robocopy D:\vue-todo-pwa\dist D:\nginx\nginx-1.16.1\pwa /E

:END