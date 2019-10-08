const State = require('../models/state');

exports.getStatesByCountry = (req, res, next) => {
  State.findAll({
    where: {
      countryId: req.params.countryId
    }
  })
    .then(state => {
      res.json(state);
    })
    .catch(err => {
      console.log(err);
    });
};
