const Client = require('../models/client');

exports.getClients = async (req, res, next) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
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

exports.getClient = (req, res, next) => {
  const { id } = req.params;
  Client.findByPk(id)
    .then(client => {
      res.json(client);
    })
    .catch(err => console.log(err));
};

exports.postClient = async (req, res) => {
  const {
    nit,
    fullname,
    address,
    phone,
    credit_limit,
    visits_percentage,
    countryId,
    stateId,
    cityId
  } = req.body;
  try {
    const client = await Client.create({
      nit,
      fullname,
      address,
      phone,
      credit_limit,
      available_credit: credit_limit,
      visits_percentage,
      countryId,
      stateId,
      cityId,
      userId: 1
    });
    res.json(client);
  } catch (err) {
    res.status(422).json({
      errors: err.errors.map(error => {
        return {
          attribute: error.path,
          message: error.message
        };
      })
    });
  }
};

exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const {
    nit,
    fullname,
    address,
    phone,
    countryId,
    stateId,
    cityId
  } = req.body;
  try {
    const client = await Client.update(
      { nit, fullname, address, phone, countryId, stateId, cityId },
      { where: { id: id } }
    );
    Client.findByPk(id)
      .then(clientUpdated => {
        res.json(clientUpdated);
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

exports.deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.destroy({
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
