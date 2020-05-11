const router = require('express').Router();

const { User } = require('../models');
const validateFields = require('../middleware/validateFields');

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
    return res.status(500).send({
      error: err.message,
    });
  }
});

module.exports = router;
