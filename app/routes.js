const { userSignUp, userSignIn } = require('./middlewares/schemas/users');
const { validateSchema } = require('./middlewares/validator');
const { authenticateUser } = require('./middlewares/users');

const { healthCheck } = require('./controllers/healthCheck');

const { signUp, signIn, getAll, signUpAdmin } = require('./controllers/users');

const { pagination } = require('./middlewares/schemas/commons');
const { checkAuth, checkPermissions } = require('./middlewares/auth');
const { ADMIN } = require('./constants/rols');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateSchema(userSignUp), signUp);
  app.get('/users', checkAuth, validateSchema(pagination), getAll);
  app.post('/users/sessions', validateSchema(userSignIn), authenticateUser, signIn);
  app.post('/admin/users', validateSchema(userSignUp), checkAuth, checkPermissions(ADMIN), signUpAdmin);
};
