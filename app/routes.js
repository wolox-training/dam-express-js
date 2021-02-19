// const controller = require('./controllers/controller');
const { userSignUp, userSignIn } = require('./middlewares/schemas/users');
const { validateSchema } = require('./middlewares/validator');
const { authenticateUser } = require('./middlewares/users');

const { healthCheck } = require('./controllers/healthCheck');

const { signUp, signIn } = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateSchema(userSignUp), signUp);
  app.post('/users/sessions', validateSchema(userSignIn), authenticateUser, signIn);
};
