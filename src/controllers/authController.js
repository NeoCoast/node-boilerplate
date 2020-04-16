const passport = require('passport');
const authRouter = require('express').Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

authRouter.post('/login', passport.authenticate('local'), async (req, res) => {
  const currentUser = req.user;
  req.login(currentUser, (err) => {
    if (err) return res.status(500).send();

    return res.status(200).send({ user: currentUser });
  });
});

authRouter.delete('/logout', ensureAuthenticated, async (req, res) => {
  req.logout();
  res.status(200).send();
});


module.exports = authRouter;
