const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  username: DataTypes.STRING,
  password_hash: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;