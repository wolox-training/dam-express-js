const jwt = require('jwt-simple');
const { secret } = require('../../config').common.session;

const encode = payload => jwt.encode(payload, secret);
const decoded = token => jwt.decode(token, secret);

module.exports = {
  encode,
  decoded
};
