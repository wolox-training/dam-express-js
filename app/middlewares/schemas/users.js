const { validDomains } = require('../../constants/domains');

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
        return domain[1] ? validDomains.includes(domain[1]) : true;
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

module.exports = {
  userSignUp
};