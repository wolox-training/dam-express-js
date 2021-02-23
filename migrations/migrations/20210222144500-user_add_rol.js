const { USER } = require('../../app/constants/rols');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'rol', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: USER
    }),
  down: queryInterface => queryInterface.removeColumn('users', 'rol')
};
