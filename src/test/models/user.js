const expect = require('expect');
const faker = require('faker');

const { User } = require('../../models');

describe('Tests User', () => {
  // Save correct data
  const name = faker.name.findName();

  it('Should save the user to database', (done) => {
    User.create({ name }).then((user) => {
      expect(user.name === name);

      done();
    });
  });
});
