import Ajv from 'ajv';

import logger from '../services/logger.js';

const validator = new Ajv({ allErrors: true, async: true });

const validateInput = (IV, param) => (req, res, next) => {
  const validate = validator.compile(IV);
  const valid = validate(req[param]);

  if (!valid) {
    logger.debug(`AJV error: {${JSON.stringify(validate.errors)}}\
 for data: ${typeof req[param] === 'object' ? JSON.stringify(req[param]) : req[param]}`);

    return res.status(400).json({
      error: validate.errors,
    });
  }

  return next();
};

export default validateInput;
