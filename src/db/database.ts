import 'dotenv/config';

import logger from '@services/logger';

const configurations = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'boilerplate_dev',
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    port: process.env.DB_PORT,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'boilerplate_test',
    host: 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: (msg) => logger.info(msg),
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
  },
};

console.log('NODE_ENV', process.env.NODE_ENV);
export default configurations[process.env.NODE_ENV];