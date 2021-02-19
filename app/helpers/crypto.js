const bcrypt = require('bcryptjs');

const saltRounds = 8;

const hash = value => bcrypt.hash(value, saltRounds);
const compare = (value, hashedPassword) => bcrypt.compare(value, hashedPassword);

module.exports = {
  hash,
  compare
};
