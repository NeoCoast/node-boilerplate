const request = require('supertest');
const expect = require('expect');
const faker = require('faker');

const { User } = require('../../models');

const app = require('../../server');

const api = request(app);

describe('User Controller Tests', () => {
  describe('Create User', () => {
    describe('with correct data', () => {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      it('Should save and return the user', async () => {
        const res = await api
          .post('/api/users')
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
      const res = await api
        .post('/api/users')
        .send({})
        .expect(400);

      expect(res.body.error.missingFields.length).not.toBe(0);
    });
  });

  describe('show', () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    before(async () => {
      await User.create({
        username,
        email,
        password,
      });
    });

    describe('when not logged in', () => {
      it('expects an error', async () => {
        await api
          .get('/api/users/1')
          .expect(401);
      });
    });

    describe('when logged in', () => {
      let token;
      let currentUser;

      before(async () => {
        const login = await api
          .post('/api/login')
          .send({
            username,
            password,
          });

        currentUser = login.body.user;
        token = login.headers.token;
      });

      describe('when requesting own data', () => {
        it('should return user data', async () => {
          const res = await api
            .get(`/api/users/${currentUser.id}`)
            .set('token', token)
            .expect(200);

          expect(res.body.user).toMatchObject({
            username,
            email,
          });
        });
      });

      describe('when requesting another user\'s data', () => {
        it('should return an error', async () => {
          await api
            .get('/api/users/0')
            .set('token', token)
            .expect(403);
        });
      });
    });
  });
});
