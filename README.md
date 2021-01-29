<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with GraphQL and JWT authentication.  
First-class integration with [TSCore](https://github.com/ClementNerma/TSCore).

## Instructions

Populate the `.env` file with the following variables:

```dotenv
# Database
DB_HOST=...
DB_NAME=...
DB_USERNAME=...
DB_PASSWORD=...

# Authentication
JWT_SECRET=...
```

Database is PostgreSQL by default.

Then start the development server:

```shell
yarn start:dev
```

Database can be synchronized by MikroORM with:

```shell
yarn db:sync
```
