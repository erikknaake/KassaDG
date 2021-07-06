FROM mcr.microsoft.com/dotnet/sdk:3.1-alpine AS builder
RUN apk add --update nodejs npm
RUN dotnet tool install --global dotnet-ef
RUN export PATH="$PATH:/root/.dotnet/tools"

WORKDIR /app
COPY Persistence/Persistence.csproj ./Persistence/Persistence.csproj
COPY DriveSync/DriveSync.csproj ./DriveSync/DriveSync.csproj
COPY KassaDG/KassaDG.csproj ./KassaDG/KassaDG.csproj
COPY KassaDG.sln ./

WORKDIR /app/KassaDG
RUN dotnet restore -r linux-musl-x64
WORKDIR /app
COPY DriveSync ./DriveSync
COPY Persistence ./Persistence
COPY KassaDG ./KassaDG
WORKDIR /app/KassaDG
RUN dotnet publish "KassaDG.csproj" -c Release /p:PublishSingleFile=true /p:PublishTrimmed=true -r linux-musl-x64 --no-restore

WORKDIR /app/Persistence
COPY Persistence/KassaDG.db.clean ./KassaDG.db
#RUN dotnet-ef database update

FROM alpine:3.9.6
RUN apk add --update libstdc++ libintl
ENV ASPNETCORE_URLS=http://+:80  
ENV DATABASE_CAN_BE_RESET=true
COPY --from=builder /app/KassaDG/bin/Release/netcoreapp3.1/linux-musl-x64/publish/ ./
COPY --from=builder /app/Persistence/KassaDG.db ./Persistence/KassaDG.db
COPY --from=builder /app/Persistence/KassaDG.db ./Persistence/KassaDG.db.clean
EXPOSE 80
CMD ["./KassaDG"]
