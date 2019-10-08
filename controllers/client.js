const Client = require('../models/client');

exports.getClients = (req, res, next) => {
  Client.findAll()
    .then(clients => {
      res.json(clients);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getClient = (req, res, next) => {
  const { id } = req.params;
  Client.findByPk(id)
    .then(client => {
      res.json(client);
    })
    .catch(err => console.log(err));
};

exports.createClient = (req, res) => {
  const {
    nit,
    fullname,
    address,
    phone,
    credit_limit,
    visits_percentage
  } = req.body;
  Client.create({
    nit,
    fullname,
    address,
    phone,
    credit_limit,
    available_credit: credit_limit,
    visits_percentage
  })
    .then(client => {
      res.json(client);
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
