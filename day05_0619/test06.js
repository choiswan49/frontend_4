const http = require('http');
const server = http.createServer();
const PORT = 3000;

const fs = require('fs');
server.on('request', (req, res)=>{
    console.log('request');
    fs.readFile('./images/hyundai.jpg', (err, data)=>{
        // res.setHeader('Content-type', 'image/jpg');
        // res.statusCode = 200;

        res.writeHead(200, {'Content-type' : 'image/jpg'})
        res.write(data);
        res.end();
    });
})

server.listen(PORT, ()=>{
    console.log('listening PORT ', PORT);
});