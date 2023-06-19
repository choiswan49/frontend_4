const fs = require('fs');
const path = require('path');

// fs.readFile('./datas/lorem.txt', (err, data)=>{
//     if(err) consolog.error(err);
//     console.log(data); // <Buffer 6c 6f 72 65 6d 20 74 78 74>
//     console.log(data.toString()); // lorem txt
// })

// fs.readFile('./datas/lorem.txt', 'utf-8', (err, data)=>{
//     if(err) consolog.error(err);
//     console.log(data); // lorem txt
    
// })

const readPath = path.join(__dirname, 'datas', 'lorem.txt');
console.log(readPath);  // D:\frontend\frontend_4\day04_0615\datas\lorem.txt

fs.readFile(readPath, 'utf-8', (err, data)=>{
    if(err) consolog.error(err);
    console.log(data); // lorem txt
    
})
const readJson = path.join(__dirname, 'datas', 'user.json');

// 동기처리, 비동기처리 async
// fs.readFile(readJson, (err, data)=>{
//     if(err) consolog.error(err);
//     console.log(data); // Buffer 
//     console.log(data.toString()); // 문자열 그래도 read

//     const user = JSON.parse(data);
//     console.log(user); // js Object
//     console.log(user.first_name); // js Object

//     const {first_name, last_name} = JSON.parse(data);
//     console.log(first_name, last_name);
// })

const myUser = require('./datas/user.json');
console.log(myUser);

// node.js : 코드 순서대로 처리된다는 보장 X
// 싱글쓰레드 : 한번에 하나의 코드만 실행
// 처리 순서 달라짐, data 읽기 전에 처리될 가능성
// 비동기 처리 : 순차 처리 되도록