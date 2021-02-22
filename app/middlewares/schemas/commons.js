const pagination = {
  offset: {
    in: ['query'],
    isInt: {
      options: {
        min: 0
      },
      errorMessage: 'offset must be a valid number greater than zero'
    },
    toInt: true
  },
  limit: {
    in: ['query'],
    isInt: {
      options: {
        min: 0,
        max: 20
      },
      errorMessage: 'limit must be a valid number greater than zero and less than 20'
    },
    toInt: true
  }
};

module.exports = {
  pagination
};
