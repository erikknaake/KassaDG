cd ..
xcopy .\\KassaDG_windows-x64 %userprofile%\\.KassaDG_windows-x64\\ /E/H
copy .\\KassaDG_windows-x64\\Kassa_desktop_launcher.sh %userprofile%\\Desktop\\
rmdir /s/q .\\KassaDG_windows-x64