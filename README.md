### Work in progress

`docker-compose up`

`docker-compose stop`

`docker-compose down` __Careful, data from db may be lost__

http://localhost:3002 Client - html/css/js(reactjs)

http://localhost:5002 Backend - dotnet core web api.

[Live demo](https://weather.robins.nu) running `master` branch.

### Todo
1. Add redux for state management and refactor code
2. Add favorite locations to a list
3. Require authentication for favoriting locations to a personal list
4. Add data store (firebase?) so each authenticated user has its own list of favorited locations
