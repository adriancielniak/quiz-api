
# Quiz API

## Getting Started

- Make sure that you have at leat 3.9 docker version

- Clone the repository and install the necessary dependencies 

```bash
$ git clone https://github.com/adriancielniak/quiz-api.git

$ npm install
 
$ ./install-dependencies.sh
```

## Running the app

```bash
# run database
$ dokcer-compose up -d

# run api
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Install TypeORM

```bash
npm install typeorm @nestjs/typeorm --save
```

## Install Dotenv

```bash
npm i dotenv
```

## Install pg

```bash
npm install pg --sav
```

## install graphQL 

```bash
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql
```