const Visit = require('../models/visit');

exports.getVisits = (req, res, next) => {
  Visit.findAll()
    .then(visits => {
      res.json(visits);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getVisit = (req, res, next) => {
  const { id } = req.params;
  Visit.findByPk(id)
    .then(visit => {
      res.json(visit);
    })
    .catch(err => console.log(err));
};

exports.createVisit = (req, res) => {
  const { net, description } = req.body;
  Visit.create({
    net,
    description
  })
    .then(visit => {
      res.json(visit);
    })
    .catch(err => {
      res.status(422).json({
        errors: err.errors.map(error => {
          return {
            attribute: error.path,
            message: error.message
          };
        })
      });
    });
};
