const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth');

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/', authController.login);

module.exports = router;
