const expect = require('expect');
const faker = require('faker');
const bcrypt = require('bcrypt');

const { User } = require('../../models');

describe('Tests User', () => {
  // Save correct data
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  it('Should save hashed password to database', async () => {
    const user = await User.create({ username, email, password });
    const passwordValid = await bcrypt.compare(password, user.password);

    expect(passwordValid).toBe(true);
  });
});

describe('validPassword', () => {
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  let user;

  before(async () => {
    user = await User.create({
      username,
      email,
      password,
    });
  });

  describe('when passing wrong password', async () => {
    it('expects false', async () => {
      expect(await user.validPassword('badPassword')).toBe(false);
    });
  });

  describe('when passing correct password', async () => {
    it('expects true', async () => {
      expect(await user.validPassword(password)).toBe(true);
    });
  });
});
