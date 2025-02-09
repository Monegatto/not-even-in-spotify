const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password_hash: DataTypes.STRING,
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password_hash);
  };

  return User;
};