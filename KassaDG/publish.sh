rm -rf ./bin
rm -rf ./ClientApp/dist
dotnet publish -c Release /p:PublishSingleFile=true /p:PublishTrimmed=true -r linux-x64
mkdir ./bin/Release/netcoreapp3.1/linux-x64/Persistence
cp ../Persistence/KassaDG.db ./bin/Release/netcoreapp3.1/linux-x64/Persistence/KassaDG.db
mkdir ./bin/Release/netcoreapp3.1/linux-x64/KassaDG/token.json/
cp -R token.json/ ./bin/Release/netcoreapp3.1/linux-x64/KassaDG/token.json/