import { sequelize } from '../services/database.js';

before(async () => await sequelize.sync());

after(async () => await sequelize.drop());
