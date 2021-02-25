module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'Weet',
    {
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {
      underscored: true,
      tableName: 'weets',
      timestamps: true
    }
  );
  Weet.associate = models => {
    Weet.belongsTo(models.User);
  };
  return Weet;
};
