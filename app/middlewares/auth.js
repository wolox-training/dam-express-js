const auth = require('express-jwt');

const config = require('../../config');
const { handleAuthError } = require('./errors');

const checkAuth = [auth(config.common.session), handleAuthError];

module.exports = {
  checkAuth
};
