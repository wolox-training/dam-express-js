const { validationResult, checkSchema } = require('express-validator');
const errors = require('../../errors');

const domainValid = ['wolox.co', 'wolox.ar'];

const userSignUp = {
  first_name: {
    isEmpty: {
      negated: true,
      errorMessage: 'first_name must be valid'
    }
  },
  email: {
    isEmail: {
      errorMessage: 'Email must be a valid email'
    },
    custom: {
      options: value => {
        const domain = value.split('@');
        return domain[1] ? domainValid.includes(domain[1]) : true;
      },
      errorMessage: 'Email must be a wolox domain'
    }
  },
  password: {
    isLength: {
      options: {
        min: 8,
        max: undefined
      },
      errorMessage: 'password must be at least 8 characters'
    },
    isAlphanumeric: {
      errorMessage: 'password must have only alphanumeric characters'
    }
  }
};

const validateErrors = (next, errorsMessages) => {
  if (errorsMessages.length === 0) {
    next();
  } else {
    next(errors.badRequest(errorsMessages.map(error => error.msg)));
  }
};

const validate = schema => [
  checkSchema(schema),
  (req, res, next) => validateErrors(next, validationResult(req).array())
];

module.exports = {
  validate,
  userSignUp
};
