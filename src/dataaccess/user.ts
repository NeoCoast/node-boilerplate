import { models } from '@models/index';

interface User {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
}

const createUserDA = async ({
  firstName,
  lastName,
  username,
  email,
  password,
}: User) => {
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

const getUserByPropsDA = async ({ userId, ...props }: { userId: number }) => {
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
