const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const City = sequelize.define('city', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'name is required'
      }
    }
  }
});

module.exports = City;
