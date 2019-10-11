const Agent = require('../models/agent');

exports.getAgents = async (req, res, next) => {
  try {
    const agents = await Agent.findAll();
    res.json(agents);
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

exports.postAgent = async (req, res) => {
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

exports.updateAgent = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const agent = await Agent.update({ name }, { where: { id: id } });
    Agent.findByPk(id)
      .then(agentUpdated => {
        res.json(agentUpdated);
      })
      .catch(err => {
        console.log(err);
      });
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

exports.deleteAgent = async (req, res) => {
  const { id } = req.params;
  try {
    const agent = await Agent.destroy({
      where: {
        id: id
      }
    });
    res.json({ id: Number(id) });
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
