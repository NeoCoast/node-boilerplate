import { faker } from '@faker-js/faker';

const fakeUser = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
});

const fakeEmail = () => ({
  to: faker.internet.email(),
  subject: faker.lorem.sentence(),
  text: faker.lorem.paragraph(),
  html: faker.lorem.paragraph(),
});

export { fakeUser, fakeEmail };
