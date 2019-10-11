const Country = require('../models/country');
const State = require('../models/state');
const City = require('../models/city');

exports.getLocations = async (req, res, next) => {
  try {
    const locations = await Country.findAll({
      include: [{ model: State, include: [{ model: City }] }]
    });
    res.json(locations);
  } catch {
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
