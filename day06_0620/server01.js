// http 모듈을 이용해 서버 구동
const http = require('http');
const fs = require('fs');
const PORT = 3000;
const path = require('path');

const server = http.createServer();
server.on('request', async (req, res)=>{
    // await 처리할 일
    console.log(req.method, req.url)
    // localhost:3000/users/?name=kim // GET /users/?name=kim

    if( req.method === 'GET'){
        const data = await fs.readFileSync(path.join(__dirname, 'views', 'index.html'));

        res.writeHead(200, {'Content-type' : ' text/html;charset=utf-8'});
        // res.write('요청 method GET');
        res.write(data);
        res.end();
    }else if( req.method === 'POST'){
        res.writeHead(200, {'Content-type' : ' text/html;charset=utf-8'});
        // res.write('요청 method POST');
        res.write(JSON.stringify({message : '요청 method POST'}));
        res.end();
    }else if( req.method === 'DELETE'){
        res.writeHead(200, {'Content-type' : ' text/html;charset=utf-8'});
        // res.write('요청 method DELETE');
        // req.body
        // req.prams
        // req.query
        // req.header
        // const {user} = req.body;
        res.write(JSON.stringify({response : '삭제'}))
        res.end();
    }else if( req.method === 'PUT'){
        res.writeHead(200, {'Content-type' : ' text/html;charset=utf-8'});
        res.write(JSON.stringify({response : ' 수정'}));
        res.end();
    }
})

server.listen(PORT, ()=>{
    console.log('listing PORT', PORT);
})

/*
요청 방식 : CRUD(create, read, update, delete)
GET : read, 게시판 읽기
POST : create, 회원 가입
PUT, PATCH : 업데이트, 수정
DELETE : 삭제, 회원 탈퇴

요청 URL
GET : http://localhost:3000/
POST : http://localhost:3000/
DELETE : http://localhost:3000/
PUT : http://localhost:3000/
PATCH : http://localhost:3000/

요청 테스트 도구 : THUNDER CLIENT, POSTMAN, ISOMNIA
*/