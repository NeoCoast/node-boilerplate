import axios from 'axios';
import applyConverters from 'axios-case-converter';

const HTTP = applyConverters(
  axios.create({
    baseURL: `${process.env.API_URL}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
);

export default HTTP;
