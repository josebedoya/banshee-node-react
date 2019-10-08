const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Visit = sequelize.define('visit', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  net: {
    type: Sequelize.DECIMAL(13, 2),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'NET is required'
      }
    }
  },
  visit_total: {
    type: Sequelize.DECIMAL(13, 2),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Visit total is required'
      }
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'description is required'
      }
    }
  }
});

module.exports = Visit;
