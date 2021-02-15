const signUp = userData => ({
  id: userData.id,
  email: userData.email,
  first_name: userData.firstName,
  last_name: userData.lastName,
  created_at: userData.createdAt,
  updated_at: userData.updatedAt
});

module.exports = {
  signUp
};
