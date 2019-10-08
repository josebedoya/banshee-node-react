const Comment = require('../models/comment');

exports.getComments = (req, res, next) => {
  Comment.findAll()
    .then(comment => {
      res.json(comment);
    })
    .catch(err => {
      console.log(err);
    });
};
