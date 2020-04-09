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
