// nodejs <-> js
// npm 프로그램 설치 도구: package 매니저 역할
// http 모듈 내장 하고 있음 : 서버 만들 수 있음

const http = require('http');
const server = http.createServer();
const PORT = 3000;
server.listen(PORT, ()=>{
    console.log('listening PORT ', PORT);
});