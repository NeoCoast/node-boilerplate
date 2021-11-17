import { Router } from 'express';
import passport from 'passport';

import { show } from '../services/renderers/userRenderer.js';

import { User } from '../services/database.js';
import userIV from './input-validators/users_body.js';
import validateInput from '../middleware/validateInput.js';

const router = Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const currentUser = req.user;

  if (currentUser.id === parseInt(req.params.id, 10)) {
    return res.status(200).send({
      user: show(currentUser),
    });
  }

  return res.status(403).send('Forbidden');
});

router.post('/',
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
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password,
      });

      return res.status(200).send({
        user: show(user),
      });
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  });

export default router;
