const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  comment: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'comment is required'
      }
    }
  }
});

module.exports = Comment;
