FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM node:10.15-alpine AS client 
ARG skip_client_build=false 
WORKDIR /app 
COPY ./ClientApp . 
RUN npm install 
RUN npm run-script build

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["./KassaDG.csproj", "./KassaDG/"]
RUN dotnet restore "./KassaDG.csproj"
COPY . .
WORKDIR "/src/KassaDG"
RUN dotnet build "KassaDG.csproj" -c Release -o /app/build
FROM build AS publish
RUN dotnet publish "KassaDG.csproj" -c Release -o /app/publish
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=client /app/dist /app/dist
ENTRYPOINT ["dotnet", "KassaDG.dll"]