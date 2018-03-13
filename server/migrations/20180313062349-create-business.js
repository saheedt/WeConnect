module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Businesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        validate: {
          notEmpty: true
        },
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        validate: {
          notEmpty: true
        },
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        validate: {
          notEmpty: true
        },
        allowNull: false,
        type: Sequelize.STRING
      },
      phonenumber: {
        validate: {
          notEmpty: true
        },
        allowNull: false,
        type: Sequelize.INTERGER
      },
      employees: {
        validate: {
          notEmpty: true
        },
        allowNull: false,
        type: Sequelize.INTERGER
      },
      category: {
        validate: {
          notEmpty: true
        },
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('Businesses')
};
