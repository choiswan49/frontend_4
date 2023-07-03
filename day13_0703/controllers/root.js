// const cookieParser = require('cookie-parser');
// const expires = require('express');
const path = require('path');
const fs = require('fs');
const model = require('../model/users.json');

const getIndex =  (req, res)=>{
    console.log('getIndex : ', req.session); // 확인

    if (req.session.user){
        // logion 상태 // logout
        res.send({success : 'login', message : '로그인 완료'})
    }
    // app.use() 미들웨어에 등록
    // res.cookie('brand',`korea_it`, {
    //     maxAge : 1 * 60 * 60 * 24 * 30,
    //     domain : 'koreait.com',
    //     expires : new Date(),
    //     // httpOnly : true,
    //     // secure : true
    // })
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
}

module.exports = { getIndex }