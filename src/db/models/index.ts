import { Sequelize, DataTypes } from 'sequelize';

import User from '@models/user';

import config from '../database';

const sequelize = new Sequelize(config);

(async () => await sequelize.sync({ alter: true }))();

// Every Model should be declared and exported in this file to work
const models = {
  User: User(sequelize, DataTypes),
};

export { models, sequelize };
