const { sequelize } = require('../models');

before(async () => {
  await sequelize.sync();
});

after(async () => {
  await sequelize.drop();
});
