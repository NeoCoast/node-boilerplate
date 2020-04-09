const request = require('supertest');
const expect = require('expect');
const faker = require('faker');

const { User } = require('../../models');

const app = require('../../server');

describe('User Controller Tests', () => {
  describe('Create User', () => {
    describe('with correct data', () => {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      it('Should save and return the user', async () => {
        const res = await request(app)
          .post('/users')
          .send({
            username,
            email,
            password,
          })
          .expect(200);

        expect(res.body.user).toMatchObject({
          username,
          email,
        });

        const newUser = await User.findOne({ where: { username } });
        expect(newUser).not.toBe(null);
      });
    });

    it('Should not save a user if the correct data is not sent', async () => {
      const res = await request(app)
        .post('/users')
        .send({})
        .expect(400);

      expect(res.body.error.missingFields.length).not.toBe(0);
    });
  });
});
