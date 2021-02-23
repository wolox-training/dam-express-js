const { hash, compare } = require('../helpers/crypto');

const hashPassword = async user => {
  const { password } = user;
  const hashedPassword = await hash(password);
  Object.assign(user, { password: hashedPassword });
};

function isCorrectPassword(enteredPassword) {
  return compare(enteredPassword, this.password);
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      underscored: true,
      tableName: 'users',
      timestamps: true
    }
  );

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);
  User.prototype.isCorrectPassword = isCorrectPassword;

  return User;
};
