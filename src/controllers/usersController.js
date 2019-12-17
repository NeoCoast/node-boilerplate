const router = require('express').Router();

const User = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const user = await User.create({ name: req.body.name });

    res.json({ success: true, user });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
