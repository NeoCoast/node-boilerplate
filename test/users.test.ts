// userController.test.ts
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/server';

import { createUser } from '@business/user';

import { fakeUser } from './helpers/index';

const api = request(app);

let user;
let token;
let createdUser;

beforeAll(async () => {
  const createdUserFetch = await createUser(fakeUser());

  createdUser = createdUserFetch.user;
  user = fakeUser();

  const userForToken = {
    email: createdUser.email,
    id: createdUser.id,
  };

  token = jwt.sign({ user: userForToken }, process.env.SECRET_KEY);
});

describe('POST SignUp user', () => {
  test('create a user', (done) => {
    api
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).toEqual(200);
        expect(res.body.user).toMatchObject({
          id: expect.any(Number),
          firstname: user.firstName,
          lastname: user.lastName,
          username: user.username,
          email: user.email,
        });

        return done();
      });
  });

  test('create a user with missing properties', (done) => {
    api
      .post('/api/users')
      .send({})
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).toEqual(400);
        expect(res.body.issues[0]).toMatchObject({ message: 'firstName is required' });
        expect(res.body.issues[1]).toMatchObject({ message: 'lastName is required' });
        expect(res.body.issues[2]).toMatchObject({ message: 'Email is required' });
        expect(res.body.issues[3]).toMatchObject({ message: 'Username is required' });
        expect(res.body.issues[4]).toMatchObject({ message: 'Password is required' });

        return done();
      });
  });
});

describe('GET users', () => {
  test('get one user', (done) => {
    try {
      api
        .get(`/api/users/${createdUser.id}`)
        .set('Accept', '*/*')
.set('token', token)
        .set('token', token)
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
