FROM microsoft/dotnet:2.1-sdk as builder  

RUN mkdir -p /var/app
WORKDIR /var/app 
COPY ./backend/backend.csproj . 
RUN dotnet restore ./backend.csproj 
COPY ./backend .
RUN dotnet publish -c release -o published 

FROM microsoft/dotnet:2.1-runtime

WORKDIR /var/app/
COPY --from=builder /var/app/published .
ENV ASPNETCORE_URLS=http://*:5000
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "backend.dll"]
