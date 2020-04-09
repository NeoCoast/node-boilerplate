const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});
  User.associate = (/* models */) => {
    // associations can be defined here
  };

  User.prototype.validPassword = async function validPassword(password) {
    return bcrypt.compare(password, this.password);
  };

  User.addHook('beforeSave', 'encryptPassword', async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword; // eslint-disable-line no-param-reassign
  });

  return User;
};
