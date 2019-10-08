const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const stateController = require('../../controllers/state');

router.get('/:countryId', stateController.getStatesByCountry);

router.post('/', auth, stateController.createState);

module.exports = router;
