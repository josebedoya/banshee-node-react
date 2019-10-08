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

exports.createCountry = async (req, res) => {
  const { name } = req.body;
  try {
    const country = await Country.create({
      name
    });
    res.json(country);
  } catch (err) {
    res.status(422).json({
      errors: err.errors.map(error => {
        return {
          attribute: error.path,
          msg: error.message
        };
      })
    });
  }
};
