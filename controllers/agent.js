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
