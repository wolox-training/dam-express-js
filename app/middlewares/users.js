const logger = require('../logger');
const errors = require('../errors');
const userService = require('../services/users');

const checkPassword = async (userFound, password) => {
  const isCorrectPassword = await userFound.isCorrectPassword(password);
  if (!isCorrectPassword) throw errors.notFound('invalid email or password');
  return isCorrectPassword;
};

const findUser = async email => {
  logger.info(`trying get user: ${email}`);
  const userFound = await userService.findByEmail(email);
  if (!userFound) throw errors.notFound('invalid email or password');
  return userFound;
};

const authenticateUser = async (req, res, next) => {
  try {
    const userFound = await findUser(req.body.email);
    await checkPassword(userFound, req.body.password);
    Object.assign(req, { user: userFound });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticateUser
};
