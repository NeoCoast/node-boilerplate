import Ajv from 'ajv';

import logger from '#services/logger.js';

const validator = new Ajv({ allErrors: true, async: true });

const validateInput = (IV, data, res, next) => {
  const validate = validator.compile(IV);
  const valid = validate(data);

  if (!valid) {
    logger.debug(`AJV error: {${JSON.stringify(validate.errors)}}\
 for data: ${typeof data === 'object' ? JSON.stringify(data) : data}`);

    return res.status(400).json({
      error: validate.errors,
    });
  }

  return next();
};

export default validateInput;
