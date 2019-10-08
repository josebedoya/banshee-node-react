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

// exports.validate = method => {
//   switch (method) {
//     case 'createClient': {
//       return [
//         check('nit', 'NIT is required')
//           .not()
//           .isEmpty(),
//         check('fullname', 'Fullname is required')
//           .not()
//           .isEmpty(),
//         check('credit_limit', 'Credit limit is required')
//           .not()
//           .isEmpty()
//       ];
//     }
//   }
// };

exports.createClient = (req, res) => {
  const {
    nit,
    fullname,
    address,
    phone,
    credit_limit,
    available_credit,
    visits_percentage
  } = req.body;
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ errors: errors.array() });
  // }
  Client.create({
    nit,
    fullname,
    address,
    phone,
    credit_limit,
    available_credit,
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
