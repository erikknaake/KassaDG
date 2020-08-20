cd ~/.KassaDG_linux-x64/publish

./KassaDG & 
which /usr/bin/google-chrome-stable | grep 'which no'
if [ $? -eq 1 ]; then
	/usr/bin/google-chrome-stable http://localhost:5000 &
else
	google-chrome http://localhost:5000 &
	
fi
wait
