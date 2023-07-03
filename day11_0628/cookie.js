const express = require('express');
const app = express();
const fs = require('fs');
const cookieParser = require('cookie-parser'); // npm i cookie-parser
const path = require('path');
const PORT = 3000;

app.use(cookieParser()); // 미들웨어에 등록

app.use(express.json()); // json 포맷 사용
app.use(express.urlencoded({extended:false})); // form 데이터 읽기

// app.get('/cookie', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'cookie.html'));
// })
app.get('/', (req, res)=>{
    // res.sendFile(path.join(__dirname, 'index.html'));
    res.send('hello cookie!!')
})
app.get('/cookie-set', (req, res)=>{
    // res.setHeader('set-cookie', 'foo=bar');
    // res.cookie('fizz','buzz')
    res.cookie('foo','bar', {
        maxAge : 5000,
        domain : 'example.com',
        expires : new Date(),
        httpOnly : true,
        secure : true
    })
    res.send('쿠키 초기화')
})
app.get('/cookie-del', (req, res)=>{
    res.clearCookie('fizz');
    res.send('쿠키 삭제')
})
// 쿠키 읽기
app.get('/cookie-get', (req, res)=>{
    console.log(req.cookies); // 요청으로부터 쿠키 읽기 // 복수형
    res.send(req.cookies);
})


app.listen(PORT, ()=>{
    console.log('listening port ', PORT);
})