const logger = require('../logger');
const errors = require('../errors');
const userService = require('../services/users');

const checkPassword = async (userFound, req) => {
  const isCorrectPassword = await userFound.isCorrectPassword(req.body.password);
  if (!isCorrectPassword) throw errors.notFound('invalid email or password');
  return isCorrectPassword;
};

const findUser = async req => {
  logger.info(`trying get user: ${req.body.email}`);
  const userFound = await userService.findByEmail(req.body.email);
  if (!userFound) throw errors.notFound('invalid email or password');
  return userFound;
};

const authenticateUser = async (req, res, next) => {
  try {
    const userFound = await findUser(req);
    await checkPassword(userFound, req);
    Object.assign(req, { user: userFound });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticateUser
};
