// const controller = require('./controllers/controller');
const { userSignUp } = require('./middlewares/schemas/users');
const { validateSchema } = require('./middlewares/validator');
const { healthCheck } = require('./controllers/healthCheck');

const { signUp } = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateSchema(userSignUp), signUp);
};
