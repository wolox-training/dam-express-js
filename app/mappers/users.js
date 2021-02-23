const signUp = (userData, { rol }) => ({
  email: userData.email,
  password: userData.password,
  firstName: userData.first_name,
  lastName: userData.last_name,
  rol
});

module.exports = {
  signUp
};
