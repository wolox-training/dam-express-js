const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.NUMBER_API_ERROR = 'numberapi_error';
exports.numberApiError = message => internalError(message, exports.NUMBER_API_ERROR);

exports.BAD_REQUEST = 'bad_request';
exports.badRequest = message => internalError(message, exports.BAD_REQUEST);

exports.NOT_FOUND = 'not_found';
exports.notFound = message => internalError(message, exports.NOT_FOUND);
