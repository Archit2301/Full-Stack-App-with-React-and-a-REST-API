'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

// User model defined that has many association with the course model
module.exports = (sequelize, DataTypes) => {
  class User extends Model {    
    static associate(models) {
      
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter the first name',
          },
          notEmpty: {
            msg: 'Please enter the first name',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter the last name',
          },
          notEmpty: {
            msg: 'Please enter the last name',
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'The email you entered already exists',
        },
        validate: {
          notNull: {
            msg: 'Please enter an email address',
          },
          notEmpty: {
            msg: 'Please enter an email address',
          },
          isEmail: {
            msg: 'Email address should be in a valid format',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter a password',
          },
          notEmpty: {
            msg: 'Please enter a password',
          },
        },
        set(val) {
          if (val) {
            const hashedPassword = bcrypt.hashSync(val, 10);
            this.setDataValue('password', hashedPassword);
          }
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Course, {
      as: 'student', 
      foreignKey: {
        fieldName: 'userId',
      },
    });
  };

  return User;
};