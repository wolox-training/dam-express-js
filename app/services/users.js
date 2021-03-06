const { User } = require('../models');
const { handleDatabaseError } = require('../helpers/errors');

const create = userData => User.create(userData).catch(handleDatabaseError('Error creating user'));
const upsert = (userData, fieldsUpdated) =>
  User.upsert(userData, { fields: fieldsUpdated }).catch(
    handleDatabaseError('Error creating/updating admin user')
  );

const findOne = query => User.findOne(query);

const findByEmail = email => findOne({ where: { email } });

const getAll = ({ offset, limit }) =>
  User.findAll({ offset, limit, attributes: { exclude: ['password'] } }).catch(
    handleDatabaseError('Error getting all users')
  );

module.exports = {
  create,
  getAll,
  findByEmail,
  upsert
};
