'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpenseTracker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExpenseTracker.init({
    type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    remarks: DataTypes.STRING,
    receivedFrom: DataTypes.STRING,
    givenTo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ExpenseTracker',
  });
  return ExpenseTracker;
};