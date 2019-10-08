const express = require('express');
const router = express.Router();

const clientController = require('../../controllers/client');

// @route get api/clients
// @desc List of clients
// @access Public
router.get('/', clientController.getClients);

// @route get api/client/id
// @desc Get client by id
// @access Public
router.get('/:id', clientController.getClient);

// @route post api/clients
// @desc Create a client
// @access Public
router.post('/', clientController.createClient);

// @route get api/clients
// @desc List of clients
// @access Public
// router.get('/', (req, res) => {
//   db.query('SELECT * FROM client', (err, rows) => {
//     if (err) return res.send(err);
//     return res.json({
//       clients: rows
//     });
//   });
// });

// // @route get api/clients
// // @desc Get a client
// // @access Public
// router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   db.query(`SELECT * FROM client WHERE client_id = ${id}`, (err, row) => {
//     if (err) return res.send(err);
//     return res.json({
//       client: row
//     });
//   });

//   // db.execute('SELECT * FROM client WHERE client_id = ?', [id])
//   //   .then(() => res.send(res))
//   //   .catch(error => res.send(error));
// });

// // @route post api/clients
// // @desc Create a client
// // @access Public
// router.post(
//   '/',
//   [
//     check('nit', 'NIT is required')
//       .not()
//       .isEmpty(),
//     check('name', 'Name is required')
//       .not()
//       .isEmpty(),
//     check('lastname', 'Lastname is required')
//       .not()
//       .isEmpty(),
//     check('phone', 'Phone is required')
//       .not()
//       .isEmpty(),
//     check('credit_limit', 'Credit limit is required')
//       .not()
//       .isEmpty()
//   ],
//   (req, res) => {
//     const { nit, name, lastname, address, phone, credit_limit } = req.body;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }
//     db.execute(
//       'INSERT INTO client (nit, name, lastname, address, phone, credit_limit) VALUES (?, ?,?,?,?,?)',
//       [nit, name, lastname, address, phone, credit_limit]
//     )
//       .then(() => res.send('Client created'))
//       .catch(error => res.send(error));
//   }
// );

module.exports = router;
