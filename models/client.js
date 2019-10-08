const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Client = sequelize.define('client', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nit: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'NIT is required'
      }
    }
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Fullname is required'
      }
    }
  },
  address: Sequelize.STRING,
  phone: Sequelize.STRING,
  credit_limit: {
    type: Sequelize.DECIMAL(13, 2),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Credit limit is required'
      }
    }
  },
  available_credit: {
    type: Sequelize.DECIMAL(13, 2),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Available credit is required'
      }
    }
  },
  visits_percentage: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Visits percentage is required'
      }
    }
  }
});

module.exports = Client;
