const express = require('express');
const router = express.Router();
const controller = require('../controllers/registrations');

// Basic CRUD
router.get('/', controller.getAll);
router.get('/details', controller.getRegistrationsWithDetails);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
