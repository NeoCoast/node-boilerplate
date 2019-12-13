const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, // DATABASE NAME
  process.env.DB_USERNAME, // USERNAME
  process.env.DB_PASSWORD, // PASSWORD
  { // OPTIONS
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.'); // eslint-disable-line no-console
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err); // eslint-disable-line no-console
  });

module.exports = sequelize;
