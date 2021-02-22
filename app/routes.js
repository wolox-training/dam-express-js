const auth = require('express-jwt');

const { userSignUp, userSignIn } = require('./middlewares/schemas/users');
const { validateSchema } = require('./middlewares/validator');
const { authenticateUser } = require('./middlewares/users');

const { healthCheck } = require('./controllers/healthCheck');

const { signUp, signIn, getAll } = require('./controllers/users');
const config = require('../config');
const { pagination } = require('./middlewares/schemas/commons');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateSchema(userSignUp), signUp);
  app.get('/users', auth(config.common.session), validateSchema(pagination), getAll);
  app.post('/users/sessions', validateSchema(userSignIn), authenticateUser, signIn);
};
