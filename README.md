# node-boilerplate
Boilerplate for Node.js applications

## Main Characteristics

- Environment: [Node.js](https://nodejs.org/en/) v16.13.0
- Framework: [Express.js](https://expressjs.com/) v4.17.1
- Test framework: [Mocha](https://mochajs.org/) v7.1.0
- Database: [Sequelize v5.22.4](https://sequelize.org/v5/) (ORM) and [PostgreSQL](https://www.postgresql.org/) with [node-postgres](https://node-postgres.com/) v8.7.1

## Other features

#### dotenv
We use [dotenv](https://github.com/motdotla/dotenv) for environment variables

#### Passport, jsonwebtoken, bcrypt
[Passport](http://www.passportjs.org/) is used for authentication, with [Local Strategy](http://www.passportjs.org/packages/passport-local/) (for username and password authentication) and [JWT Strategy](http://www.passportjs.org/packages/passport-jwt/) (for token authentication)
[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) is used for creating session tokens and [bcrypt](https://github.com/kelektiv/node.bcrypt.js) for encrypting user passwords before saving to the DB.

#### Morgan and Winston
[Morgan](https://github.com/expressjs/morgan) is used to log incoming requests, combined with [Winston](https://github.com/winstonjs/winston) for a super logging experience.

## Tests

We use mocha, [supertest](https://github.com/visionmedia/supertest) and [expect](https://www.npmjs.com/package/expect) for writing tests. On top of that we use [faker](https://www.npmjs.com/package/faker) for creating realistic-looking data for tests. Tests can be run using the command `npm run test`. [Pre-commit](https://github.com/observing/pre-commit) is used to run tests before committing changes. Changes shouldn't be committed unless all tests are passing, but this step can be skipped using the `-n` flag.


## Code Quality

We use [ESLint](https://eslint.org/) with [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) plugin for linting. You can run the linter with `npm run lint`. [Pre-commit](https://github.com/observing/pre-commit) is used to run the linter before committing changes. Changes shouldn't be committed unless approved bt the linter, but this step can be skipped using the `-n` flag.

## Using this boilerplate

Use the command `npm run start` to run this boilerplate. We use [nodemon](https://nodemon.io/) to detect changes in the source code and update the app on the fly.

We use [sequelize-cli](https://github.com/sequelize/cli) to write and run migrations to the database. Run `sequelize-cli db:migrate` to run initial migrations.

When receiving and responding to a request, the flow should be controller -> service -> model -> service -> controller -> render service. Most requests shouldn't be handled directly by controllers, instead they should be delegated to services where the business logic can be found. You can read more about this [here](https://medium.com/neocoast/save-time-with-a-boilerplate-project-e6323d2ab612?source=friends_link&sk=a039e11a207fb8d79068cbed36c56f3b)
