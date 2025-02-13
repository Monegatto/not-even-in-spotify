// models/searchHistory.js
module.exports = (sequelize, DataTypes) => {
  const SearchHistory = sequelize.define('SearchHistory', {
    trackName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    albumName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artistName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    searchTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Data e hora atual
    },
  });

  // Associa o histórico de buscas ao modelo User
  SearchHistory.associate = function (models) {
    SearchHistory.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return SearchHistory;
};
