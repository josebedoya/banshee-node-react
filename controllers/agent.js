const Agent = require('../models/agent');

exports.getAgents = (req, res, next) => {
  Agent.findAll()
    .then(agents => {
      res.json(agents);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.createAgent = async (req, res) => {
  const { name } = req.body;
  try {
    const agent = await Agent.create({
      name
    });
    res.json(agent);
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
