FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS builder
RUN apk add --update nodejs npm

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


FROM alpine:3.17.0
RUN apk add --update libstdc++ libintl && \
    apk add --no-cache libgcc && \
    mkdir /Persistence && \
    touch /Persistence/KassaDG.db && chmod +rw /Persistence/KassaDG.db 
ENV ASPNETCORE_URLS=http://+:80  
ENV DATABASE_CAN_BE_RESET=true
ENV DbFile=/Persistence/KassaDG.db
COPY --from=builder /app/KassaDG/bin/Release/net7.0/linux-musl-x64/publish/ ./

EXPOSE 80
CMD ["./KassaDG"]
