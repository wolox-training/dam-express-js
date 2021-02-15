// const controller = require('./controllers/controller');
const { userSignUp, validate } = require('./middlewares/schemas/users');
const { healthCheck } = require('./controllers/healthCheck');

const { signUp } = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validate(userSignUp), signUp);
};
