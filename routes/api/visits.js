const express = require('express');
const router = express.Router();

const visitController = require('../../controllers/visit');

router.get('/', visitController.getVisits);

router.get('/:id', visitController.getVisit);

router.post('/', visitController.createVisit);

module.exports = router;
