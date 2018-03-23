require('pg').defaults.parseInt8 = true;

export default (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    phonenumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    employees: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Business.asosciate = (models) => {
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Business.hasMany(models.Review, {
      foreignKey: 'businessId',
      as: 'reviews'
    });
  };
  return Business;
};
