const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Agent = sequelize.define('agent', {
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

module.exports = Agent;
