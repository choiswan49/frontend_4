const express = require('express');
const router = express.Router();
const path = require('path');
const {getIndex} = require('../controllers/root.js')

router.get('/', getIndex);

module.exports = router;