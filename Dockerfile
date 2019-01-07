FROM microsoft/dotnet:2.1-sdk AS builder

WORKDIR /var/app
COPY ./backend .
ENV ASPNETCORE_URLS=http://*:5000
ENV ASPNETCORE_ENVIRONMENT=Development
# Use native linux file polling for better performance
ENV DOTNET_USE_POLLING_FILE_WATCHER 1
RUN dotnet restore ./backend.csproj
ENTRYPOINT [ "dotnet", "watch", "run"]