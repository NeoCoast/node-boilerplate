import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';

import logger from '#services/logger.js';
import users from '#routes/users.js';
import authController from '#routes/auth.js';
import '#config/passport.js';

const app = express();

app.use(passport.initialize());

app.use(express.json());

app.options('*', cors());

app.use(cors());

app.use(morgan('combined', {
  stream: {
    write: (text) => logger.info(text),
  },
}));

app.use('/api', authController);
app.use('/api/users', users);

app.listen(process.env.APP_PORT, () => {
  logger.info(`Server running on port ${process.env.APP_PORT}`);
  logger.info('AdminBro is running at /admin');
});

export default app;
