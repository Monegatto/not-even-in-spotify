const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Senhas dos usuários
    const password = 'senhaSegura123';
    const hashedPassword = await bcrypt.hash(password, 10);  // Gera o hash da senha

    await queryInterface.bulkInsert('User', [
      {
        email: 'giovaniohira@gmail.com',
        password: hashedPassword,  // Senha já com hash
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'joaomonegatto@gmail.com',
        password: hashedPassword,  // Senha já com hash
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'willianwatanabe@gmail.com',
        password: hashedPassword,  // Senha já com hash
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  },
};
