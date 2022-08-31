import supertest from 'supertest';
import { expect } from 'expect';
import { faker } from '@faker-js/faker';

import app from '#server';
import { models } from '#models/index.js';

const api = supertest(app);
const { User } = models;

describe('login', () => {
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();

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

    it('returns user data and token in header', async () => {
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

      expect(res.headers.token).not.toBe(null);
    });
  });
});
