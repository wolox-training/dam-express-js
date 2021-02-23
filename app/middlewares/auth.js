const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

const config = require('../../config');
const { handleAuthError, handlePermissionsError } = require('./errors');

const checkAuth = [auth(config.common.session), handleAuthError];
const checkPermissions = permissions => [guard.check(permissions), handlePermissionsError];

module.exports = {
  checkAuth,
  checkPermissions
};
