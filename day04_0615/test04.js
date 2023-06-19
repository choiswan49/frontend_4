const fs = require('fs');
const path = require('path');

// 비동기처리 async : 순차처리
const data = fs.readFileSync('./datas/lorem.txt', 'utf-8', (err)=>console.log(err));
console.log('1. ', data);
console.log('2. 콘솔 제일 먼저 처리');


