const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const agentController = require('../../controllers/agent');

router.get('/', auth, agentController.getAgents);

module.exports = router;
