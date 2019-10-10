const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const authController = require('../../controllers/auth');

// @route    GET api/auth
// @desc     Get user data
// @access   Private
router.get('/', auth, authController.getUserAuth);

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/', authController.login);

module.exports = router;
