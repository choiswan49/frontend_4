const fs = require('fs');
const path = require('path');
const model = require('../model/users.json');

const getIndex =  (req, res)=>{
    console.log('getIndex : ', req.cookies); // 확인

    res.cookie('brand', 'korea_it', {
        maxAge : 1 * 60 * 60 * 24 * 30,
        domain : 'koreait.com',
        expires : new Date(),
        httpOnly : true,
        secure : true
    })
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
}

module.exports = { getIndex }