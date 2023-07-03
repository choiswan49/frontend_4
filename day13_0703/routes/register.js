const express = require('express');
const router = express.Router();
const {
    getRegister,
    getIdRegister,
    getConfirm,
    postRegister,
    delRegister,
    delParamRegister,
    putRegister,
} = require('../controllers/register');

router.get('/', getRegister)
router.get('/:id', getIdRegister)
router.get('/confirm', getConfirm)

router.post('/', postRegister)

router.delete('/', delRegister);
router.delete('/:id', delParamRegister );

router.put('/', putRegister);

module.exports = router;