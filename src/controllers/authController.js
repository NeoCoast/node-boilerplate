import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { show } from '../services/renderers/userRenderer.js';

const router = Router();

router.post('/login', passport.authenticate('local', { session: false }), async (req, res) => {
  const currentUser = req.user;
  const userForToken = {
    username: currentUser.username,
    id: currentUser.id,
  };
  const token = jwt.sign({ user: userForToken }, process.env.SECRET_KEY);
  res.setHeader('token', token);
  return res.status(200).json({
    user: show(currentUser),
  });
});

export default router;
