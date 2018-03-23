module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Reviews', {
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
      review: {
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
      },
      businessId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Businesses',
          key: 'id',
          as: 'businessId'
        }
      }
    }),
  down: queryInterface => queryInterface.dropTable('Reviews')
};
