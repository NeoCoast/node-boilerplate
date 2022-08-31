import { models } from '#models/index.js';

const createUserDA = async ({
  firstName,
  lastName,
  username,
  email,
  password,
}) => {
  try {
    return await models.User.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });
  } catch (error) {
    throw error;
  }
};

const getUserByPropsDA = async ({ userId, ...props }) => {
  try {
    const prop = userId ? { id: userId } : props;
    const user = await models.User.findOne(
      {
        where: prop,
      },
    );

    return user;
  } catch (error) {
    throw error;
  }
};

export { createUserDA, getUserByPropsDA };
