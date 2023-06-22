const fs = require('fs');

const data = fs.readFileSync('./data/seafood.CSV', 'utf-8');
// console.log(data);

const lines = data.split('\n');
// console.log(lines.slice(0, 10));

const title = lines.slice(0, 1); // 제목만 가지기
const titleAry = title[0].split(',');
// console.log(titleAry);

const lines10 = lines.slice(0, 10);
const mLines = [];
lines10.forEach(line=>{
    const str = line.substring(1, line.length-1); // ' 등을 잘라내기
    mLines.push(str);
})

// console.log(mLines);
const objectAry = [];

mLines.forEach(line=>{
    const ary = line.split(',');
    let object = {}

    ary.forEach((data, index)=>{
        // object[`key${index}`] = data;
        object[`${titleAry[index]}`] = data;
    })
    objectAry.push(object)
})

console.log(objectAry);

fs.writeFileSync('./data/seafood.json',
    JSON.stringify(objectAry, null, '   '),
    'utf-8',
    err=>console.log(err)
)