/*
const bcrypt = require('bcrypt');
// 암호화 기법

const user_pwd = 12345;

async passwordHandle(user_pwd)=>{
    const hashedPwd = await bcrypt.hash(user_pwd, 10);
    const match = await bcrypt.compare(userpwd, hashedPwd)
    return match;
    console.log(hashedPwd)
}
// promises 처리 필요
passwordHandle(user_pwd);
*/
const bcrypt = require('bcrypt');
const saltRounds = 10; // 암호화할 자리수
const Password = '12345';

// 암호화
bcrypt.hash(Password, saltRounds, function(err, hash){
    console.log(hash);

    // 복호화
    bcrypt.compare(Password, hash, function(err, result) {
        console.log(result);
        // true면 login
    });
})