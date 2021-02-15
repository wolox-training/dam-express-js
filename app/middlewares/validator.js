const { validationResult, checkSchema } = require('express-validator');
const errors = require('../errors');

const validateErrors = (next, errorsMessages) => {
  if (errorsMessages.length === 0) {
    next();
  } else {
    next(errors.badRequest(errorsMessages.map(error => error.msg)));
  }
};

const validateSchema = schema => [
  checkSchema(schema),
  (req, res, next) => validateErrors(next, validationResult(req).array())
];

module.exports = {
  validateSchema
};
