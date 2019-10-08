const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const countryController = require('../../controllers/country');

router.get('/', countryController.getCountries);

router.post('/', auth, countryController.createCountry);

module.exports = router;
