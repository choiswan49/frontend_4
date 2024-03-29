// const cookieParser = require('cookie-parser');
// const expires = require('express');
const fs = require('fs');
const path = require('path');
const model = require('../model/users.json');

const getLogin = (req, res)=>{
    console.log('getLogin : ', req.cookies); // 확인
    try{
        const { username } = req.cookies;
        console.log(username)
        if (!username){
            res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
        }else{
            req.redirect('/');
            // 쿠키가 존재하면 로그인한 상태로 index.html
        }
    }catch(err){
        console.log(err);
        res.status(500).send({success:false, message:'내부적 오류'})
    }
}
const postLogin = (req, res)=>{
    const user = req.body;
    console.log('postLogin : ', req.cookies); // 쿠키 가져오기
    const {user_id, user_pwd} = req.body;
    try{
        const rows = fs.readFileSync(path.join(__dirname, '..', 'model', 'users.json'));
        const users = JSON.parse(rows);

        const find = users.find(data=>data.user_id === user.user_id && data.user_pwd === user_pwd);
        if (find){
            // login 된 후에 사용자 인증이 완료되었다고 쿠키 생성
            res.cookie('username', `${find.user_id}`, {
                maxAge : 5000,
                domain : 'example.com',
                expires : new Date(),
                // httpOnly : true,
                // secure : true,
                authorized : true
            })

            res.setHeader('set-cookie', `username=${find.user_id}`)
            res.send({success : true, message : user_id})
        }else{
            res.send({success : false, message : '사용자를 찾을 수 없습니다.'})
        }
    }catch(err){
        console.log(err);
        res.status(500).send({success:false, message:'내부적 오류'})
    }
}

module.exports = {
    getLogin,
    postLogin
}

// sessiong 숨겨서 사용
// jwt : 암호화된 토큰