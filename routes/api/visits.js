const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const visitController = require('../../controllers/visit');

router.get('/', auth, visitController.getVisits);

router.get('/:id', auth, visitController.getVisit);

router.post('/', auth, visitController.createVisit);

module.exports = router;
