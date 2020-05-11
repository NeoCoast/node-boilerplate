const passport = require('passport');
const authRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const userRenderer = require('../services/renderers/userRenderer');

authRouter.post('/login', passport.authenticate('local', { session: false }), async (req, res) => {
  const currentUser = req.user;
  const userForToken = {
    username: currentUser.username,
    id: currentUser.id,
  };
  const token = jwt.sign({ user: userForToken }, process.env.SECRET_KEY);
  res.setHeader('token', token);
  return res.status(200).json({
    user: userRenderer.show(currentUser),
  });
});


module.exports = authRouter;
