import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';

import { getUserByProps } from '@business/user';
import { models } from '@models/index';

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (
      email: string,
      password: string,
      done: (value1?: any, value2?: any) => void,
    ) => {
      try {
        const currentUser = await models.User.findOne({ where: { email } });

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
      const currentUser = await getUserByProps({ email: token.user.email });

      return done(null, currentUser);
    } catch (error) {
      return done(error);
    }
  }),
);
