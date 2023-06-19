// 비동기처리 : async
// try{}catch()finally{}

const fs = require('fs');
const fsPromises = require('fs').promises; // 비동기처리하는 파일 모듈
const path = require('path');

const fileOptions = async()=>{
    try{
        const data = await fsPromises.readFile('./datas/lorem.txt', "utf-8")
        console.log("1. readfile", data);
        console.log("2. console.log");

        await fsPromises.writeFile('./datas/newWrite.txt', data);
        console.log('3. write complete');

        await fsPromises.appendFile('./datas/newWrite.txt', 'append txt');
        console.log('4. appendFile');

        await fsPromises.rename('./datas/newWrite.txt', './datas/rename.txt', err=>{if(err) throw err});
        console.log('5. rename');

        if (!fs.existsSync('./model')){
            await fs.mkdir("./model", err=> {if(err) throw err});
        }
        console.log('6. mkdir')

        // fs.readdir('./', (err, filelist)=>{
        //     console.log(filelist)    
        // })
        const filelist = await fsPromises.readdir('./', err=>{if(err) throw err});
        console.log('7.', filelist);

        await fsPromises.unlink(path.join(__dirname, "datas", "rename.txt"));
        console.log('8. unlink');
    }catch(err){
        // err 처리
        console.log(err);
        // err=>{if(err) throw err}
        // err 발생시 err 받아서 처리
    }finally{
        // 생략 가능
        // try 코드가 실행돼도, catch 구문이 실행돼도 실행
        console.log("finally 반드시 실행");
        // db.close
    }
}

fileOptions();