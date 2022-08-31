import { Sequelize } from 'sequelize';

import User from '#models/user.js';

import config from '../database.js';

const { DataTypes } = Sequelize;

const sequelize = new Sequelize(config);

(async () => await sequelize.sync({ alter: true }))();

// Every Model should be declared and exported in this file to work
const models = {
  User: User(sequelize, DataTypes),
};

export { models, sequelize };
