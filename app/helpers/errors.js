const logger = require('../logger');
const { databaseError } = require('../errors');

const handleDatabaseError = message => error => {
  logger.error(`${message}: ${error.message}`);
  throw databaseError(`${message}: ${error.message}`);
};

module.exports = {
  handleDatabaseError
};
