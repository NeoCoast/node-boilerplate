const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

require('dotenv').config();

const app = express();

app.use(passport.initialize());

require('./config/passport');

app.use(express.json());

app.options('*', cors());

app.use(cors());

app.use(morgan('dev'));

const usersController = require('./controllers/usersController');
const authController = require('./controllers/authController');

app.use('/api', authController);
app.use('/api/users', usersController);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on port ${process.env.APP_PORT}...`); // eslint-disable-line no-console
});

module.exports = app;
