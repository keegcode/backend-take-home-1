# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2022-07-21
### Added
- Graceful Shutdown on SIGTERM event
- Dockerfile for node.js and docker-compose.yml for entire application
- Swagger UI
- MIT License
- README.md
### Changed
- Cron for fetching countries statistics
- .env.example

## [0.3.1] - 2022-06-21
### Added
- Unit test for countries API cron-task

## [0.3.0] - 2022-06-21
### Added
- HTTP Method for fetching countries list
- HTTP Method for fetching country statistics by code
- Cron Task for updating statistics

## [0.2.0] - 2022-06-21
### Added
- HTTP Method for sign-in
- HTTP Method for sign-up

## [0.1.0] - 2022-06-21
### Added
- Auth provider for managing authentication and authorization methods
- Migrations for users table
- API validator
- Dependencies provider
- Utils functions
- API exceptions with default set
- Web API server builder
- Default API schema
### Changed
- Configuration files for knex and eslint

## [0.0.1] - 2022-06-21
### Added
- ESLint config
- Knex config
- Dockerfile, docker-compose and .dockerignore files
- .gitignore
- npm project
- .env.example for environment variables 
- README.md