FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 5000
EXPOSE 5001
RUN publish -c Release /p:PublishSingleFile=true /p:PublishTrimmed=true -r linux-x64
RUN mkdir ./bin/Release/netcoreapp3.1/linux-x64/Persistence
RUN cp ../Persistence/KassaDG.db ./bin/Release/netcoreapp3.1/linux-x64/Persistence/KassaDG.db
