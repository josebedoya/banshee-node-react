const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const clientController = require('../../controllers/client');

// @route get api/clients
// @desc List of clients
// @access Private
router.get('/', auth, clientController.getClients);

// @route get api/client/id
// @desc Get client by id
// @access Private
router.get('/:id', auth, clientController.getClient);

// @route post api/clients
// @desc Create a client
// @access Private
router.post('/', auth, clientController.postClient);

router.put('/:id', auth, clientController.updateClient);

router.delete('/:id', auth, clientController.deleteClient);

module.exports = router;
