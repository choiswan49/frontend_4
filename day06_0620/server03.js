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
        else if (req.url.includes('/images') && req.method === 'GET'){
            // const data = await fs.readFileSync( path.join(__dirname, 'subdir', 'index.html'));
            res.writeHead(200, {'Content-type' : contentType});
            // res.write(data);
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