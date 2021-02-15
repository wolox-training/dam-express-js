const bcrypt = require('bcryptjs');

const saltRounds = 8;

const hash = value => bcrypt.hash(value, saltRounds);

module.exports = {
  hash
};
