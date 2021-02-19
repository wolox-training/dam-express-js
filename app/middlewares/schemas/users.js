const { validDomains } = require('../../constants/domains');

const emailValidation = {
  isEmail: {
    errorMessage: 'Email must be a valid email'
  },
  custom: {
    options: value => {
      if (!value) return false;
      const [, domain] = value.split('@');
      return domain ? validDomains.includes(domain) : true;
    },
    errorMessage: 'Email must be a wolox domain'
  }
};

const passwordvalidation = {
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
};

const userSignUp = {
  first_name: {
    isEmpty: {
      negated: true,
      errorMessage: 'first_name must be valid'
    }
  },
  email: emailValidation,
  password: passwordvalidation
};

const userSignIn = {
  email: emailValidation,
  password: passwordvalidation
};

module.exports = {
  userSignUp,
  userSignIn
};
