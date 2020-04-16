const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const db = require('../models');

const sessionStore = new SequelizeStore({
  db: db.sequelize,
});

sessionStore.sync();

module.exports = sessionStore;
