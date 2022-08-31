import { sequelize } from '#models/index.js';

before(async () => await sequelize.sync());

after(async () => await sequelize.drop());
