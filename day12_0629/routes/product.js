const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const {
    getProduct,
    postProduct,
    delProduct,
    putProduct
} = require('../controllers/product')

router.get('/', getProduct);
router.post('/', postProduct);
router.delete('/', delProduct);
router.put('/', putProduct);

/*
// localhost:3000/product/sub
router.get('/sub', getSubProduct);
router.post('/sub', postSubProduct);
router.delete('/sub', delSubProduct);
router.put('/sub', putSubProduct);
*/

module.exports = router;