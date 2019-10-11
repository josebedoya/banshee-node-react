const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const agentController = require('../../controllers/agent');

router.get('/', auth, agentController.getAgents);

router.post('/', auth, agentController.postAgent);

router.put('/:id', auth, agentController.updateAgent);

router.delete('/:id', auth, agentController.deleteAgent);

module.exports = router;
