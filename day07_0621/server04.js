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
        // put : localhost:3000/firts_name=kim
        // patch : localhost:3000/firts_name=kim
        // put 전체 데이터 수정, patch 일부 데이터 수정할 때
        // 브라우저 <-> 서버
        if (req.url === '/put' && req.method === 'GET'){
            const data = await fs.readFileSync( path.join(__dirname, 'views', 'put.html'));
            res.writeHead(200, {'Content-type' : contentType});
            res.write(data);
        }else if (req.url.includes('name') && req.method === 'PUT'){
            let body = '';
            req.on('data', (chunk)=>{
                body = chunk.toString();
            })

            req.on('end', ()=>{
                const {first_name, last_name} = JSON.parse(body);
                // first_name=>last_name 수정
                // userId 찾아서 비밀번호만 바꾸기

                const response = fs.readFileSync(path.join(__dirname, 'model', 'users.json'));
                const users = JSON.parse(response);

                const find = users.find(data=>data.first_name === first_name);
                // console.log(find);
                if(!find){
                    const message = {
                        success : 'fail',
                        message : '데이터를 찾을 수 없습니다'
                    }
                    res.end(JSON.stringify(message))
                }else{
                    find.last_name = last_name ? last_name : find.last_name;

                    // const index = users.indexOf(find); // 수정하려는 데이터 위치
                    const filter = users.filter(data=>data.first_name !== first_name); // 지우고
                    filter.push(find); // 수정 추가

                    fs.writeFileSync(
                        path.join(__dirname, 'model', 'users.json'),
                        JSON.stringify(filter, null, "    "),
                        "utf-8",
                        (err)=>{
                            console.log(err);
                        }
                    )
                }
                
                const content = {
                    success : 'ok',
                    message : '수정 완료'
                }
                res.end(JSON.stringify(content));
            })
        }
        else if (req.url.includes('first') && req.method === 'PUT'){
            // delete : localhost:3000/?firts_name=kim
            // localhost:3000/?first=swan&last=choi
            const url = require('url');
            const queryUrl = url.parse(req.url);
            const query = queryUrl.query;
            // console.log('query', query); // first=name

            const reqQuery = require('querystring');
            // const params = reqQuery.parse(query);
            // console.log(params); //{ first: 'swan', last: 'choi' }
            const {first, last} = reqQuery.parse(query);
            console.log(first, last);

            const response = fs.readFileSync(path.join(__dirname, "model", 'users.json'));
            const users = JSON.parse(response);

            const find = users.find( data=>data.first_name !== first );

            find.last_name = last_name ? last_name : find.last_name;

            // const index = users.indexOf(find); // 수정하려는 데이터 위치
            const filter = users.filter(data=>data.first_name !== first_name); // 지우고
            filter.push(find); // 수정 추가

            fs.writeFileSync(
                path.join(__dirname, 'model', 'users.json'),
                JSON.stringify(filter, null, "  "),
                err=>console.log(err)
            )
            const message = {
                success : 'ok',
                message : '삭제 완료'
            }
            res.end(JSON.stringify(message));
        }
    }catch(err){
        console.log(err);
    }  
    res.end();
})
server.listen(PORT, ()=>{
    console.log('listing PORT', PORT);
})