import { Sequelize } from 'sequelize';

import config from '#config/database.js';

import UserModel from '#models/user.js';

const { DataTypes } = Sequelize;

const sequelize = new Sequelize(config);
(async () => await sequelize.sync({ alter: true }))();

// Every Model should be declared and exported in this file to work
const User = UserModel(sequelize, DataTypes);

export {
  sequelize,
  User,
};
