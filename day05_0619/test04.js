// nodejs <-> js
// npm 프로그램 설치 도구: package 매니저 역할
// http 모듈 내장 하고 있음 : 서버 만들 수 있음

const http = require('http');
const fs = require('fs');
const fsPromises = fs.promises;
/*
const server = http.createServer((request, response)=>{
    fs.readFile('./test01.html', 'utf-8', (err, data)=>{
        // console.log(data);
        response.statusCode = 200;
        response.setHeader('Content-type', 'text/html');
        response.write(data);
        response.end();
    })
});
*/

const html = require('./views/template.js');

const server = http.createServer((request, response)=>{
    // const data = fsPromises.readFile('./test01.html', 'utf-8');
    // promises => 처리 한단계 더 필요
    // const data = fs.readFileSync('./test01.html');
    const data = html('korea_it');
    response.statusCode = 200;
    response.setHeader('Content-type', 'text/html');
    response.write(data);
    response.end();
});
const PORT = 3000;
server.listen(PORT, ()=>{
    console.log('listening PORT ', PORT);
});