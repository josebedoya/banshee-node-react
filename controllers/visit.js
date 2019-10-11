const Visit = require('../models/visit');
const Client = require('../models/client');

exports.getVisits = async (req, res, next) => {
  try {
    const visits = await Visit.findAll();
    res.json(visits);
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

exports.getVisit = (req, res, next) => {
  const { id } = req.params;
  Visit.findByPk(id)
    .then(visit => {
      res.json(visit);
    })
    .catch(err => console.log(err));
};

exports.postVisit = async (req, res) => {
  const { agentId, clientId, net, description, visits_percentage } = req.body;
  const total = (Number(net) * (100 - Number(visits_percentage))) / 100;
  try {
    const visit = await Visit.create({
      agentId,
      clientId,
      net,
      description,
      visit_total: total,
      userId: 1
    });
    res.json(visit);
    updateAvailableCredit(clientId, total);
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

exports.updateVisit = async (req, res) => {
  const { id } = req.params;
  const { net, description } = req.body;
  try {
    const visit = await Visit.update(
      { net, description },
      { where: { id: id } }
    );
    Visit.findByPk(id)
      .then(visitUpdated => {
        res.json(visitUpdated);
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

exports.deleteVisit = async (req, res) => {
  const { id } = req.params;
  try {
    const visit = await Visit.destroy({
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

const updateAvailableCredit = (id, total) => {
  Client.findByPk(id)
    .then(client => {
      let newTotal = client.available_credit - total;
      Client.update({ available_credit: newTotal }, { where: { id: id } });
    })
    .catch(err => {
      console.log(err);
    });
};
