const user = require('./user');

module.exports = {
  ...user,
  Error: {
    type: 'object',
    properties: {
      message: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      internal_code: {
        type: 'string'
      }
    }
  }
};
