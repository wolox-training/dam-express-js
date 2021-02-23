const { factory } = require('factory-girl');
const faker = require('faker');
const { USER } = require('../../app/constants/rols');

const db = require('../../app/models');

factory.define('User', db.User, {
  id: factory.sequence('user.id', n => n),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: factory.sequence('user.email', n => `${faker.internet.userName().toLowerCase()}${n}@wolox.co`),
  password: faker.internet.password(10, false, /[0-9A-Z]/),
  rol: USER
});

exports.build = () => factory.build('User');
exports.create = userData => factory.create('User', userData);
exports.createMany = () => factory.createMany('User', 5);
exports.attributes = () => factory.attrs('User');
