#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["externaltariffapplication.client/nuget.config", "externaltariffapplication.client/"]
COPY ["ExternalTariffApplication.Server/ExternalTariffApplication.Server.csproj", "ExternalTariffApplication.Server/"]
COPY ["externaltariffapplication.client/externaltariffapplication.client.esproj", "externaltariffapplication.client/"]
RUN dotnet restore "./ExternalTariffApplication.Server/./ExternalTariffApplication.Server.csproj"
COPY . .
WORKDIR "/src/ExternalTariffApplication.Server"
RUN dotnet build "./ExternalTariffApplication.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ExternalTariffApplication.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ExternalTariffApplication.Server.dll"]