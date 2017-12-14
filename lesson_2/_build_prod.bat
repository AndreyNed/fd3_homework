del public\* /q
set NODE_ENV=production
rem .\node_modules\.bin\webpack --progress
rem start /w .\node_modules\.bin\webpack --progress
cmd.exe /c ".\node_modules\.bin\webpack --progress"
xcopy /E /Y for_public\* public\
xcopy /E /Y images\* public\images\
xcopy /E /Y docs\* public\docs\
git add public
pause