const request = require('supertest');
const expect = require('expect');
const faker = require('faker');

const { User } = require('../../models');

const app = require('../../server');

const api = request(app);

const username = faker.internet.userName();
const email = faker.internet.email();
const password = faker.internet.password();

describe('login', () => {
  describe('sending bad user data', () => {
    it('should return an error', async () => {
      api
        .post('/api/login')
        .send({
          username,
          password,
        })
        .expect(400);
    });
  });

  describe('sending correct user data', () => {
    before(async () => {
      await User.create({
        email,
        username,
        password,
      });
    });

    it('returns user data and cookie in header', async () => {
      const res = await api
        .post('/api/login')
        .send({
          username,
          password,
        })
        .expect(200);

      expect(res.body.user).toMatchObject({
        username,
        email,
      });

      const [cookie] = res.headers['set-cookie'].pop().split(';');
      expect(cookie).not.toBe(null);
    });
  });
});

describe('logout', () => {
  describe('when user isn\'t logged in', () => {
    it('returns an error', async () => {
      await api
        .delete('/api/logout')
        .expect(401);
    });
  });

  describe('when user is logged in', () => {
    let cookie;

    before(async () => {
      const login = await api
        .post('/api/login')
        .send({
          username,
          password,
        });

      [cookie] = login.headers['set-cookie'].pop().split(';');
    });

    it('user can\'t use authenticated endpoints', async () => {
      await api
        .delete('/api/logout')
        .set('Cookie', cookie)
        .expect(200);

      const authenticatedEndpoint = await api
        .delete('/api/logout')
        .set('Cookie', cookie);

      expect(authenticatedEndpoint.status).toBe(401);
    });
  });
});
