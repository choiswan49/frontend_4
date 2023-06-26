// application app
// express => 함수들의 모음 => 미들웨어
// http 포함
// 미들웨어(함수) : get, put, post, delete, set, use
// set : 기본 정의, 뷰엔진 정의

const express = require('express');
const path = require('path');
const app = express();
// const PORT = 3000;
app.set('PORT', 3000);

app.get('/', (req,res)=>{
    console.log('get method');
})
app.post('/', (req,res)=>{
    console.log('post method');
})
app.delete('/', (req,res)=>{
    console.log('delete method');
})
app.put('/', (req,res)=>{
    console.log('put method');
})

// app.listen('PORT', ()=>{
//     console.log(`server running on port ${'PORT'}`);
// })
app.listen(app.get('PORT'), ()=>{
    console.log(`server running on port ${app.get('PORT')}`);
})