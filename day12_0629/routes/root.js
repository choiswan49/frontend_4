const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res)=>{
    res.cookie('brand',`korea_it`, {
        maxAge : 1 * 60 * 60 * 24 * 30,
        domain : 'koreait.com',
        expires : new Date(),
        httpOnly : true,
        secure : true
    })
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
});

module.exports = router;