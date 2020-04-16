const passport = require('passport');
const LocalStrategy = require('passport-local');

const { User } = require('../models');

passport.use(
  new LocalStrategy(
    async (username, password, done) => {
      try {
        const currentUser = await User.findOne({ where: { username } });
        if (!currentUser) { return done(null, false); }
        const valid = await currentUser.validPassword(password);
        if (!valid) { return done(null, false); }
        return done(null, currentUser);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return done(null, false);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
