const signUp = userData => ({
  email: userData.email,
  password: userData.password,
  firstName: userData.first_name,
  lastName: userData.last_name
});

module.exports = {
  signUp
};
