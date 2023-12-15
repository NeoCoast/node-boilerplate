// userController.test.ts
import request from 'supertest';
import jwt from 'jsonwebtoken';

import { fakeUser } from './helpers/index';
import { createUser } from '@business/user';

import app from '../src/server';

const api = request(app);

let token;
let createdUser;
let fakeCreatedUser;

beforeAll(async () => {
  fakeCreatedUser = fakeUser();
  const createdUserFetch = await createUser(fakeCreatedUser);

  createdUser = createdUserFetch.user;

  const userForToken = {
    email: createdUser.email,
    id: createdUser.id,
  };

  token = jwt.sign({ user: userForToken }, process.env.SECRET_KEY);
});

describe('POST login user', () => {
  test('user login', (done) => {
    try {
      api
        .post('/api/login')
        .send({
          email: fakeCreatedUser.email,
          password: fakeCreatedUser.password,
        })
        .end((err, res) => {
          if (err) return done(err);

          expect(res.status).toEqual(200);

          return done();
        });
    } catch (error) {
      console.log(error);
    }
  });
});
