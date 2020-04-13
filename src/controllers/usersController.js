const router = require('express').Router();
const passport = require('passport');

const { User } = require('../models');
const validateFields = require('../middleware/validateFields');

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const currentUser = req.user;
  if (currentUser.id === parseInt(req.params.id, 10)) {
    return res.status(200).send({ user: currentUser });
  }

  return res.status(403).send('Forbidden');
});

router.post('/', validateFields(['username', 'email', 'password']), async (req, res) => {
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

    return res.status(200).send({ user });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = router;
