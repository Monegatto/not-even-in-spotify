// migrations/xxxxxx-create-search-history.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('SearchHistories', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        trackName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        albumName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        artistName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        searchTime: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'User',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('SearchHistories');
    },
  };
  