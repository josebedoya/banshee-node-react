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

exports.createState = async (req, res) => {
  const { name, countryId } = req.body;
  try {
    const state = await State.create({
      name,
      countryId
    });
    res.json(state);
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
