import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';
import { models } from '#models/index.js';

import { getUserByProps } from '#business/user.js';

passport.use(
  new LocalStrategy(
    async (username, password, done) => {
      try {
        const currentUser = await models.User.findOne({ where: { username } });
        if (!currentUser) { return done(null, false); }
        const valid = await currentUser.validPassword(password);
        if (!valid) { return done(null, false); }
        const newUser = {
          id: currentUser.id,
          email: currentUser.email,
          username: currentUser.username,
          firstname: currentUser.firstName,
          lastname: currentUser.lastName,
        };
        return done(null, newUser);
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
      const currentUser = await getUserByProps({ username: token.user.username });

      return done(null, currentUser);
    } catch (error) {
      return done(error);
    }
  }),
);
