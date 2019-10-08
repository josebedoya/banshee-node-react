const Sequelize = require('sequelize');

const sequelize = new Sequelize('banshee', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
