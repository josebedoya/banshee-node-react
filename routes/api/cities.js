const express = require('express');
const router = express.Router();

const cityController = require('../../controllers/city');

router.get('/:stateId', cityController.getCitiesByState);

module.exports = router;
