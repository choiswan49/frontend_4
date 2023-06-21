const http = require('http');
const fs = require('fs');
const PORT = 3000;
const path = require('path');

const server = http.createServer();
server.on('request', async (req, res)=>{
    let filePath = path.join(__dirname, 'views', req.url === '/' ? 'ha_swap.html' : req.url );
    // console.log(filePath); // 모든 요청 출력

    let contentType = 'text/html;charset=utf-8';
    let extname = path.extname(filePath);
    
/*
    if (extname === '.css'){
        contentType = 'text/css'
    }else if (extname === '.jpg'){
        contentType = 'image/jpg'
    }
*/

    switch(extname){
        case '.css': contentType = 'text/css'; break;
        case '.js': contentType = 'text/javascript'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.png': contentType = 'image/png'; break;
        case '.git': contentType = 'image/gif'; break;
        case '.json': contentType = 'application/json'; break;
        case '.mp3': contentType = 'audio/mp3'; break;
        case '.mp4': contentType = 'video/mp5'; break;
        default : contentType = 'text/html'
    }

    console.log(filePath, contentType); // 요청 확장자 상세 정보 확인

    const data = await fs.readFileSync(filePath);
    res.writeHead(200, {'Content-type' : contentType});
    res.write(data);
    res.end();
})

server.listen(PORT, ()=>{
    console.log('listing PORT', PORT);
})

/*
콘텐츠 처리 방식
html
josn
img
video
audio
zip
*/