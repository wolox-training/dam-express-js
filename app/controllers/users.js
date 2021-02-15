const userService = require('../services/users');
const userMapper = require('../mappers/users');
const userSerializer = require('../serializers/users');
const logger = require('../logger');

const signUp = async (req, res, next) => {
  try {
    const userData = userMapper.signUp(req.body);
    const newUser = await userService.persist(userData);
    logger.info(`user with name: ${newUser.firstName} created successfully`);
    res.status(201).send(userSerializer.signUp(newUser));
  } catch (error) {
    logger.error(`Error signUp user: ${error.message}`);
    next(error);
  }
};

module.exports = {
  signUp
};
