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
