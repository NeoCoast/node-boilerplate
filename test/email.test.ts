import { faker } from '@faker-js/faker';
import { createUser } from '@business/user';
import { fakeUser } from './helpers';
import jwt from "jsonwebtoken"

import request from 'supertest';

import app from '@server';

const api = request(app);

let user;
let token: string;

beforeAll(async () => {
  user = await createUser(fakeUser());

  const userForToken = {
    email: user.user.email,
    id: user.user.id,
  };

  token = jwt.sign({ user: userForToken }, process.env.SECRET_KEY);
})

describe("POST email", () => {
  const to = faker.internet.email();
  const subject = faker.lorem.sentence();
  const text = faker.lorem.paragraph();
  const html = faker.lorem.paragraph();

  test("send an email", (done) => {
    api
      .post("/api/email")
      .send({
        to,
        subject,
        text,
        html,
      })
      .set('token', token)
      .end((err: Error, res: Response) => {
        if (err) return done(err);

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("accepted");
        expect(res.body).toHaveProperty("rejected");
        expect(res.body).toHaveProperty("response");

        return done()
      })
  });
});
