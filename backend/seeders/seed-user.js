module.exports = {
    up: async (queryInterface) => {
      await queryInterface.bulkInsert('Users', [{
        username: 'admin',
        password_hash: 'senha_criptografada', // Use bcrypt para criptografar a senha
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('Users', null, {});
    },
  };