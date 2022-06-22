## Requirements
***
- Node.js v16
- Postgresql v14
- Docker and docker-compose for docker files
## Installation
***
#### Make sure to set up .env file using .env.example for reference!
### Local
````
$ npm install
$ npm start
````
### Docker
````
$ docker compose up --build
````
## Commands
***
### Migrations
````
$ npm run migrate
````
### Seeds (Populate DB with data)
````
$ npm run seed
````
### Tests
````
$ npm run test
````
### Tests Coverage
````
$ npm run test:coverage
````
### Linter
````
$ npm run format
````
## Swagger UI
***
Swagger UI can be accessed by following /api path