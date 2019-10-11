const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const locationController = require('../../controllers/location');

router.get('/', auth, locationController.getLocations);

module.exports = router;
