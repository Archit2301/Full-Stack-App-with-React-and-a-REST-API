'use strict';

const { Model } = require('sequelize');

// Course schema defined that has belongs to association with the user model

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {    
    static associate(models) {
    }
  }
  Course.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter a course title',
          },
          notEmpty: {
            msg: 'Please enter a course title',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A course description is required',
          },
          notEmpty: {
            msg: 'A course description is required',
          },
        },
      },
      estimatedTime: DataTypes.STRING,
      materialsNeeded: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Course',
    }
  );

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: 'student', 
      foreignKey: {
        fieldName: 'userId',
      },
    });
  };

  return Course;
};