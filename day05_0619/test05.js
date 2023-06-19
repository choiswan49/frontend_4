const http = require('http');
const PORT = 3000;
/*
const users = [
    {
        first_name:"swan",
        last_name: "choi"
    }
]

const server = http.createServer((request, resopnse)=>{
    resopnse.statusCode = 200;
    resopnse.setHeader('Content-type', 'application/json')
    // resopnse.write(JSON.stringify(users));
    // resopnse.end();

    resopnse.end(JSON.stringify(users))
});
*/
const fs = require('fs');
const fsPromises = fs.promises;
/*
const server = http.createServer((request, resopnse)=>{
    resopnse.statusCode = 200;
    resopnse.setHeader('Content-type', 'application/json');
    
    // const data = fsPromises.readFile('./model/users.json', 'utf-8');
    const data = fs.readFileSync('./model/users.json');

    fs.write('./my-data.txt', data);
    resopnse.end(data);
});
*/
const server = http.createServer(async(request, resopnse)=>{
    resopnse.statusCode = 200;
    resopnse.setHeader('Content-type', 'application/json');
    
    const data = await fsPromises.readFile('./model/users.json', 'utf-8');
    // const data = fs.readFileSync('./users.json');

    await fsPromises.writeFile('./my-data.txt', data);
    resopnse.end(data);
});

server.listen(PORT, ()=>{
    console.log('listening PORT ', PORT);
});