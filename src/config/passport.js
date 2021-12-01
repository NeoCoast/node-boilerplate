import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';

import { User } from '#services/database.js';

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

passport.use(
  new JWTstrategy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromHeader('token'),
  }, async (token, done) => {
    try {
      const currentUser = await User.findOne({ where: { username: token.user.username } });
      return done(null, currentUser);
    } catch (error) {
      return done(error);
    }
  }),
);
