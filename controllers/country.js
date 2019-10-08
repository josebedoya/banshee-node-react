const Country = require('../models/country');

exports.getCountries = (req, res, next) => {
  Country.findAll()
    .then(country => {
      res.json(country);
    })
    .catch(err => {
      console.log(err);
    });
};
