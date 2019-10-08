const express = require('express');
const router = express.Router();

const agentController = require('../../controllers/agent');

router.get('/', agentController.getAgents);

module.exports = router;
