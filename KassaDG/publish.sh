rm -rf ./bin
rm -rf ./ClientApp/dist
dotnet publish -c Release /p:PublishSingleFile=true /p:PublishTrimmed=true -r linux-x64
mkdir ./bin/Release/netcoreapp3.1/linux-x64/Persistence
cd ../Persistence
mv KassaDG.db KassaDG.db.bak.build
source ~/.bashrc
dotnet ef database update
mv KassaDG.db KassaDG.db.clean
mv KassaDG.db.bak.build KassaDG.db
cd ../KassaDG
cp ../setup.sh ./bin/Release/netcoreapp3.1/linux-x64
cp ../Kassa_desktop_launcher.sh ./bin/Release/netcoreapp3.1/linux-x64
cp ../Persistence/KassaDG.db.clean ./bin/Release/netcoreapp3.1/linux-x64/Persistence/KassaDG.db
mkdir ./bin/Release/netcoreapp3.1/linux-x64/publish/token.json/
cp -R token.json/ ./bin/Release/netcoreapp3.1/linux-x64/publish/token.json/
zip -r KassaDG_linux-x64 ./bin/Release/netcoreapp3.1/linux-x64/publish ./bin/Release/netcoreapp3.1/linux-x64/Persistence ./bin/Release/netcoreapp3.1/linux-x64/setup.sh ./bin/Release/netcoreapp3.1/linux-x64/Kassa_desktop_launcher.sh
