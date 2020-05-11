module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'boilerplate_dev',
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: null,
    password: null,
    database: 'boilerplate_test',
    host: 'localhost',
    dialect: 'postgres',
    logging: () => {},
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};
