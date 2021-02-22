const { userSignUp, userSignIn } = require('./middlewares/schemas/users');
const { validateSchema } = require('./middlewares/validator');
const { authenticateUser } = require('./middlewares/users');

const { healthCheck } = require('./controllers/healthCheck');

const { signUp, signIn, getAll } = require('./controllers/users');

const { pagination } = require('./middlewares/schemas/commons');
const { checkAuth } = require('./middlewares/auth');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateSchema(userSignUp), signUp);
  app.get('/users', checkAuth, validateSchema(pagination), getAll);
  app.post('/users/sessions', validateSchema(userSignIn), authenticateUser, signIn);
};
