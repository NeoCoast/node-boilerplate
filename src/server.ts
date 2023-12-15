import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';

import logger from '@services/logger';
import users from '@routes/users';
import authController from '@routes/auth';
import email from '@routes/email';
import '@config/passport';

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

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/api', authController);
app.use('/api/users', users);
app.use('/api/email', email);

export default app;
