const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const clientController = require('../../controllers/client');

// @route get api/clients
// @desc List of clients
// @access Private
router.get('/', clientController.getClients);

// @route get api/client/id
// @desc Get client by id
// @access Private
router.get('/:id', clientController.getClient);

// @route post api/clients
// @desc Create a client
// @access Private
router.post('/', clientController.createClient);

module.exports = router;
