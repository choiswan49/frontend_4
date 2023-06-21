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
        res.writeHead(200, {'Content-type' : contentType});
        // localhost:3000 => views/index.html
        if (req.url === '/' && req.method === 'GET'){
            const data = await fs.readFileSync( path.join(__dirname, 'views', 'index.html'));
            res.write(data);
        }
        // localhost:3000/swap => views/ha_swap.html
        else if (req.url === '/swap' && req.method === 'GET'){
            const data = await fs.readFileSync( path.join(__dirname, 'views', 'ha_swap.html'));
            res.write(data);
        }
        // localhost:3000/subdir => subdir/index.html
        else if (req.url === '/subdir' && req.method === 'GET'){
            const data = await fs.readFileSync( path.join(__dirname, 'subdir', 'index.html'));
            res.write(data);
        }
        res.end();
    }catch(err){

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