const router = require('express').Router();

const { User } = require('../models');

const helpers = require('../helpers');

router.post('/', helpers.validateFields(['name']), async (req, res) => {
  const {
    name,
  } = req.body;

  try {
    const user = await User.create({ name });

    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({
      error: 'An internal error occurred',
    });
  }
});

module.exports = router;
