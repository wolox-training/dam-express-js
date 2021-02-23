const userService = require('../services/users');
const userMapper = require('../mappers/users');
const userSerializer = require('../serializers/users');
const logger = require('../logger');
const jwt = require('../helpers/jwt');
const { USER, ADMIN } = require('../constants/rols');

const signUp = async (req, res, next) => {
  try {
    const userData = userMapper.signUp(req.body, { rol: USER });
    const newUser = await userService.create(userData);
    logger.info(`user with name: ${newUser.firstName} created successfully`);
    res.status(201).send(userSerializer.signUp(newUser));
  } catch (error) {
    logger.error(`Error signUp user: ${error.message}`);
    next(error);
  }
};

const signUpAdmin = async (req, res, next) => {
  try {
    const userData = userMapper.signUp(req.body, { rol: ADMIN });
    const newUser = await userService.upsert(userData, ['rol']);
    if (newUser) {
      logger.info(`admin user with name: ${userData.firstName} created successfully`);
      res.sendStatus(201);
    } else {
      logger.info(`admin user with name: ${userData.firstName} updated successfully`);
      res.sendStatus(200);
    }
  } catch (error) {
    logger.error(`Error signUp admin user: ${error.message}`);
    next(error);
  }
};

const signIn = (req, res, next) => {
  try {
    logger.info(`trying sign in: ${req.body.email}`);
    const userFound = req.user;
    logger.info(`generating token for user: ${req.body.email}`);
    const token = jwt.encode({ userId: userFound.id, email: userFound.email, permissions: [userFound.rol] });

    res.status(200).send({ token });
  } catch (error) {
    logger.error(`Error signUp user: ${error.message}`);
    next(error);
  }
};

const getAll = async ({ query }, res, next) => {
  try {
    const users = await userService.getAll(query);
    res.status(200).send(users);
  } catch (error) {
    logger.error(`Error get all users: ${error.message}`);
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
  getAll,
  signUpAdmin
};
