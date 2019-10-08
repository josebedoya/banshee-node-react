const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    if (!password) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Password is required' }] });
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    //
    await User.create({ name, email, password: user.password });
    //

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
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
