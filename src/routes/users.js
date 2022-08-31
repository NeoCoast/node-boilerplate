import { Router } from 'express';
import passport from 'passport';

import validateInput from '#middleware/validateInput.js';
import { createUser } from '#business/user.js';

import userIV from './input-validators/users_body.js';

const router = Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const currentUser = req.user;

  if (currentUser.user.id === parseInt(req.params.id, 10)) {
    return res.status(200).send(currentUser);
  }

  return res.status(403).send('Forbidden');
});

router.post(
  '/',
  (req, res, next) => validateInput(userIV, req.body, res, next),
  async (req, res) => {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
    } = req.body;

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
