module.exports = {
    up: async (queryInterface) => {
      await queryInterface.bulkInsert('User', [{
        username: 'admin',
        password_hash: 'senha_criptografada',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('User', null, {});
    },
  };