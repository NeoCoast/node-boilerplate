import { Router } from 'express';
import passport from 'passport';

import { createUser, getUserByProps } from '@business/user';
  import validateInput from '@middleware/validateInput';
import userValidator from './input-validators/users_body';

const router = Router();

interface User {
  user?: {
    id: number,
    email: string,
    username: string,
    firstName: string,
    lastName: string,
  }
}

interface requestedUser {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
}

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const currentUser = await getUserByProps({ id: parseInt(req.params.id, 10) })

    if (currentUser?.user?.id === parseInt(req.params.id, 10)) {
      return res.status(200).send(currentUser);
    }

    return res.status(403).send('Forbidden');
  }
);

router.post(
  '/',
validateInput(userValidator),
  async (req, res) => {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
    }: requestedUser = req.body;

    try {
      const user = await createUser({
        firstName,
        lastName,
        username,
        email,
        password,
      });

      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },
);

export default router;
