const City = require('../models/city');

exports.getCitiesByState = (req, res, next) => {
  City.findAll({
    where: {
      stateId: req.params.stateId
    }
  })
    .then(city => {
      res.json(city);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.createCity = async (req, res) => {
  const { name, countryId, stateId } = req.body;
  try {
    const city = await City.create({
      name,
      countryId,
      stateId
    });
    res.json(city);
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
