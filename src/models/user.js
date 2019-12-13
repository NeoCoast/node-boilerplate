const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define(
  'user',
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

User.sync();

module.exports = User;
