import { createUserDA, getUserByPropsDA } from '#dataaccess/user.js';

const createUser = async ({
  firstName,
  lastName,
  username,
  email,
  password,
}) => {
  try {
    const user = await createUserDA({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstname: user.firstName,
        lastname: user.lastName,
      },
      code: 'Success',
    };
  } catch (error) {
    throw error;
  }
};

const getUserByProps = async (props) => {
  try {
    const user = await getUserByPropsDA(props);

    if (!user) {
      return {
        code: 'The user does not exist',
      };
    }

    const newUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstname: user.firstName,
      lastname: user.lastName,
    };

    return {
      user: newUser,
      code: 'Success',
    };
  } catch (error) {
    throw error;
  }
};

export { createUser, getUserByProps };
