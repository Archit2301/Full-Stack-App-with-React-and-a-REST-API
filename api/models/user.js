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
            msg: 'First name is required',
          },
          notEmpty: {
            msg: 'First name is required',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Last name is required',
          },
          notEmpty: {
            msg: 'Last name is required',
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
            msg: 'An email address is required',
          },
          notEmpty: {
            msg: 'An email address is required',
          },
          isEmail: {
            msg: 'Please enter a valid email address',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A password is required',
          },
          notEmpty: {
            msg: 'A password is required',
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