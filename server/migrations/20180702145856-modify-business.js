module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Businesses',
      'image_url',
      Sequelize.STRING
    );
  },

  down: queryInterface => queryInterface.dropTable('Businesses')
};
