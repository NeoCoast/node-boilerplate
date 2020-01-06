exports.validateFields = (requiredFields) => (req, res, next) => {
  const missingFields = requiredFields.map((requiredField) => !req.body[requiredField] && requiredField).filter((missingField) => missingField);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: { missingFields },
    });
  }

  return next();
};
