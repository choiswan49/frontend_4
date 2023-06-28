const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = 3000;

app.use(express.json()); // json 포맷 사용
app.use(express.urlencoded({extended:false})); // form 데이터 읽기

app.get('/cookie', (req, res)=>{
    res.sendFile(path.join(__dirname, 'cookie.html'));
})

app.listen(PORT, ()=>{
    console.log('listening port ', PORT);
})