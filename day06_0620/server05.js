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
        if (req.url.includes('/name') && req.method === 'GET'){
            const data = await fs.readFileSync( path.join(__dirname, 'model', 'users.json'));
            const users = JSON.parse(data);

            // url
            const url = require('url');
            const reqUrl = url.parse(req.url); // 문자열 => js
            const myurl = url.format(reqUrl); // js => 문자열

            console.log(reqUrl.query); // ? 뒤 querystring

            // querystring
            const query = require('querystring');
            // const myQuery = query.stringify('last_name=you&op=test&html=tag'); // js => 문자열
            const myQuery = query.parse(reqUrl.query); // 문자열 => js
            console.log('myQuery', JSON.stringify(myQuery));


            const find = users.find(user=>user.last_name === myQuery.last_name);

            
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