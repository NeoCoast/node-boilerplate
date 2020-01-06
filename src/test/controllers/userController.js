const request = require('supertest');
const expect = require('expect');
const faker = require('faker');

const User = require('../../models/user');

const app = require('../../server');

describe('User Controller Tests', () => {
  describe('Create User', () => {
    it('Should save a user if the data is correct', (done) => {
      const name = faker.name.findName();

      request(app)
        .post('/users')
        .send({
          name,
        })
        .expect(200)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body.user.name).toBe(name);
          expect(res.body.success).toBe(true);

          User.findOne({ where: { name } }).then((user) => {
            expect(user.dataValues.name).toBe(name);
          });

          return done();
        });
    });

    it('Should not save a user if the correct data is not sent', (done) => {
      request(app)
        .post('/users')
        .send({})
        .expect(400)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body.error.missingFields.length).not.toBe(0);

          return done();
        });
    });
  });
});
