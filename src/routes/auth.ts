import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

interface User {
  id?: number,
  email?: string,
}

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    const currentUser: User = req.user;

    const userForToken = {
      email: currentUser.email,
      id: currentUser.id,
    };

    const token = jwt.sign({ user: userForToken }, process.env.SECRET_KEY);

    res.setHeader('token', token);

    return res.status(200).json({
      user: currentUser,
    });
  });

export default router;
