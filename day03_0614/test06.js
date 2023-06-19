const fs = require('fs');
// 파일 read, write
// 폴더 mkdir, rmdir

process.on('mkdir',()=>{
    console.log('폴더 생성 완료')
})
process.on('rmdir',()=>{
    console.log('폴더 삭제 완료')
})

setTimeout(()=>{
    fs.mkdir('./newDir', (err)=>{
        console.log(err)
    });
    process.emit('mkdir');
},1000)

setTimeout(()=>{
    fs.rmdir('./newDir', (err)=>{
        console.log(err)
    })
    process.emit('rmdir')
},3000)

