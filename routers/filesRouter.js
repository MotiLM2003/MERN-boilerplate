const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const {
  importCustomer,
  executeImportCustomer,
} = require('../controllers/filesController');

router.post('/import-customers', importCustomer);
router.post('/execute-import-customers', executeImportCustomer);

module.exports = router;
