const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.options('*', cors());

app.use(cors());

// PARSE .ENV FILE
require('dotenv').config();

const usersController = require('./controllers/usersController');

app.use('/user', usersController);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on port ${process.env.APP_PORT}...`); // eslint-disable-line no-console
});
