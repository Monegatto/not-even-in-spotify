module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'User'  // Especifica o nome da tabela no banco de dados
  });

  // Hook para criptografar a senha antes de salvar no banco de dados
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.associate = function (models) {
    // Associações com outros modelos
    User.hasMany(models.SearchHistory, {
      foreignKey: 'userId',
      as: 'searchHistories',
    });
  };

  return User;
};
