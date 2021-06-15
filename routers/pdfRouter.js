const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

const { save, get } = require('../controllers/pdfController.js');

router.post('/save/', save);
router.get('/get/:customerId/:itemId', get);

module.exports = router;
