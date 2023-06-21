const http = require('http');
const fs = require('fs');
const PORT = 3000;
const path = require('path');

const server = http.createServer();
server.on('request', async (req, res)=>{
    let filePath = path.join(__dirname, 'views', req.url === '/' ? 'index.html' : req.url );

    let contentType = 'text/html;charset=utf-8';
    let extname = path.extname(filePath);
    
    switch(extname){
        case '.css': contentType = 'text/css'; break;
        case '.js': contentType = 'text/javascript'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.png': contentType = 'image/png'; break;
        case '.git': contentType = 'image/gif'; break;
        case '.json': contentType = 'application/json'; break;
        case '.mp3': contentType = 'audio/mp3'; break;
        case '.mp4': contentType = 'video/mp5'; break;
        case '.txt.' : contentType = 'text/plan';
    }

    try{
        res.writeHead(200, {'Content-type' : contentType});
        // localhost:3000 => views/index.html
        if (req.url === '/' && req.method === 'GET'){
            const data = await fs.readFileSync( path.join(__dirname, 'views', 'index.html'));
            res.writeHead(200, {'Content-type' : contentType});
            res.write(data);
            res.end();
        }
        // localhost:3000/swap => views/ha_swap.html
        else if (req.url === '/swap' && req.method === 'GET'){
            const data = await fs.readFileSync( path.join(__dirname, 'views', 'ha_swap.html'));
            res.writeHead(200, {'Content-type' : contentType});
            res.write(data);
        }
        // localhost:3000/subdir => subdir/index.html
        else if (req.url === '/subdir' && req.method === 'GET'){
            const data = await fs.readFileSync( path.join(__dirname, 'subdir', 'index.html'));
            res.writeHead(200, {'Content-type' : contentType});
            res.write(data);
        }
        else if (req.url.includes('jpg') || extname.includes('png') || extname.includes('gif')){
            const content = fs.readFileSync(filePath);
            res.end(content);
        }
        else if (req.url.includes('css')){
            // node의 서버로 진행하기 때문에 불편
            // 2개 이상이면 각각 조건을 여러 개 만들어야 함
            const content = fs.readFileSync(path.join(__dirname, 'views', 'ha_swap.css' ));
            res.end(content);
        }
        else if (req.url.includes('js')){
            const content = fs.readFileSync(path.join(__dirname, 'views', 'script', 'javascript.js' ));
            res.end(content);
        }

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
        
        res.end();
    }catch(err){
        console.log(err);
    }

    
})

server.listen(PORT, ()=>{
    console.log('listing PORT', PORT);
})

/*
다양한 url 처리
localhost:3000 => views/index.html
localhost:3000/swap => views/ha_swap.html
localhost:3000/subdir => subdir/index.html
*/

/*
git init
git branch -M master
git remote add origin https://github.com/choiswan49/frontend_4.git

git pull origin master
수정

git add .
git commit -m "설명"
git config --global user.email ""
git config --global user.name ""
git push -u origin master
*/