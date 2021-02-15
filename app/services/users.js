const { User } = require('../models');
const { databaseError } = require('../errors');
const logger = require('../logger');

const persist = userData =>
  User.create(userData).catch(error => {
    logger.error(`Error creating user: ${error.message}`);
    throw databaseError(`Cannot create user: ${error.message}`);
  });

module.exports = {
  persist
};
