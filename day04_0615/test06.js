const fs = require('fs');
const path = require('path');

const writePath = path.join(__dirname, 'datas', 'writeLorem.txt');
// 폴더 부정확하면 err
fs.writeFile(writePath, 'data 쓰기', err=>{
    console.log(err)
    console.log("1. write")
});

// 읽어와서 쓰기
fs.readFile('./datas/lorem.txt', 'utf-8', (err, data)=>{
    console.log("2.", data);
    
    // 기존 파일 있으면 추가, 없으면 만들어 추가
    fs.appendFile(writePath, data, err=>{
        console.log(err)
        console.log("3. write")
    });
});

fs.rename(
    path.join(__dirname, "datas", "writeLorem.txt"),
    path.join(__dirname, "datas", "newName.txt"),
    (err)=>{
        console.log("4. rename");
    }
)

fs.appendFile(
    path.join(__dirname, 'datas', 'append.txt'),
    "append 확인",
    (err)=>{
        console.log(err);
        console.log("5. appendFile")
    }
)