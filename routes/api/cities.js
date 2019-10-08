const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const cityController = require('../../controllers/city');

router.get('/:stateId', cityController.getCitiesByState);

router.post('/', auth, cityController.createCity);

module.exports = router;
