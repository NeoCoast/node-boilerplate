import { Router } from 'express';
import passport from 'passport';

import sendMail from '@services/node-mailer';
import emailValidator from './input-validators/emails_body';
import validateInput from '@middleware/validateInput';

const router = Router();

interface EmailOptions {
  to: String,
  subject: String,
  text: String,
  html: String,
}


router.post(
  '/',
validateInput(emailValidator),
   passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const {
      to,
      subject,
      text,
      html,
    }: EmailOptions = req.body;

    try {
      const email = await sendMail({
        to,
        subject,
        text,
        html,
      });

      return res.status(200).send(email);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },
);

export default router;
