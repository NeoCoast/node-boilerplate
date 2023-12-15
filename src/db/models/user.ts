import { compare, hash } from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});

  User.associate = (/* models */) => {
    // associations should be defined here
  };

  User.prototype.validPassword = async function validPassword(password) {
    return compare(password, this.password);
  };

  User.addHook('beforeSave', 'encryptPassword', async (user) => {
    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword; // eslint-disable-line no-param-reassign
  });

  return User;
};
