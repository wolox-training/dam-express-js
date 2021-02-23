const errors = require('../errors');
const logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.DATABASE_ERROR]: 503,
  [errors.BAD_REQUEST]: 400,
  [errors.UNAUTHORIZED]: 401,
  [errors.FORBIDDEN]: 403,
  [errors.NOT_FOUND]: 404,
  [errors.DEFAULT_ERROR]: 500
};

exports.handle = (error, req, res, next) => {
  if (error.internalCode) res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};

exports.handleAuthError = (error, req, res, next) => {
  if (error.name && error.name === 'UnauthorizedError') return next(errors.unauthorized(error.message));
  return next(error);
};

exports.handlePermissionsError = (error, req, res, next) => {
  if (error.name && error.name === 'UnauthorizedError') return next(errors.forbidden(error.message));
  return next(error);
};
