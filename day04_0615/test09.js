// stream 처리 : buffer 직접 데이터를 읽고 쓰게 만들어주기

const fs = require('fs');
const readStream = fs.createReadStream('./datas/lorem100.txt');
const writeStream = fs.createWriteStream('./datas/bigData.txt');

// readStream.on('data', (chunk)=>{
//     console.log("---------------------------------------- NEW CHUNK ----------------------------------");
//     console.log(chunk.toString());

//     writeStream.write(chunk);
// })

// 직접 쓰기
readStream.pipe(writeStream);