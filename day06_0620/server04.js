const http = require('http');
const fs = require('fs');
const PORT = 3000;
const path = require('path');

const server = http.createServer();
server.on('request', async (req, res)=>{
    let filePath = path.join(__dirname, 'views', req.url === '/' ? 'index.html' : req.url );

    let contentType;
    let extname = path.extname(filePath);

    switch(extname){
        case '.html': contentType = 'text/html'; break;
        case '.css': contentType = 'text/css'; break;
        case '.js': contentType = 'text/javascript'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.png': contentType = 'image/png'; break;
        case '.git': contentType = 'image/gif'; break;
        case '.json': contentType = 'application/json'; break;
        case '.mp3': contentType = 'audio/mp3'; break;
        case '.mp4': contentType = 'video/mp5'; break;
        default : contentType = 'text/plan'
    }

    try{
        // localhost:3000/user
        if (req.url === '/user' && req.method === 'GET'){
            const user = {
                first_name : 'swan',
                last_name : 'choi'
            }
            res.writeHead(200, {'Content-type' : 'application/json'});
            // res.write(JSON.stringify(user));
            res.end(JSON.stringify(user));
        }
        // localhost:3000/users
        else if (req.url === '/users' && req.method === 'GET'){
            const data = await fs.readFileSync( path.join(__dirname, 'model', 'users.json'));
            res.writeHead(200, {'Content-type' : contentType});
            // res.write(data);
            res.end(data); // 읽어온 자체가 문자열임으로 전환 필요 X
        }
        // localhost:3000/name/last_name=kim
        else if (req.url.includes('/name') && req.method === 'GET'){
            const data = await fs.readFileSync( path.join(__dirname, 'model', 'users.json'));
            const users = JSON.parse(data);
            // console.log(users);
            const nameAry = req.url.split('/');
            // console.log(nameAry); // [ '', 'name', 'last_name=kim' ]
            const name = nameAry[nameAry.length-1].split('=')[1]; // ['last_name', 'kim']
            // console.log(name);

            // 추후 query 공부 예정

            const find = users.find(user=>user.last_name === name);
            // console.log(find);
            
            if(!find){
                const err = {
                    message : "Name not found"
                }
                res.end(JSON.stringify(err))
            }
            res.writeHead(200, {'Content-type' : 'application/json'});
            res.end(JSON.stringify(find));
        }
        
    }catch(err){
        console.log(err);
    }

    
})

server.listen(PORT, ()=>{
    console.log('listing PORT', PORT);
})

/*
다양한 url 처리
localhost:3000/user => 한 명
localhost:3000/users => 모든 유저 표시
localhost:3000/user/name=kim => 이름이 김
*/