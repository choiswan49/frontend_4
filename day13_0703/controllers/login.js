// const cookieParser = require('cookie-parser');
// const expires = require('express');
const path = require('path');
const fs = require('fs');
const model = require('../model/users.json');

const getLogin = (req, res)=>{
    console.log('getLogin : ', req.session); // 확인
    try{
        const { username } = req.session;
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
    console.log('postLogin : ', req.session); // 세션 가져오기

    // reagister : put, delete, read 추가해야 함
    if (req.session.user){
        res.send({success : true, message : '이미 로그인 되어 있습니다.'}); // 로그아웃 버튼 띄우기
    }
    const {user_id, user_pwd} = req.body;
    try{
        const rows = fs.readFileSync(path.join(__dirname, '..', 'model', 'users.json'));
        const users = JSON.parse(rows);

        const find = users.find(data=>data.user_id === user.user_id && data.user_pwd === user_pwd);
        if (find && !req.session.user){
            // login 된 후에 사용자 인증이 완료되었다고 쿠키 생성

            req.session.user={
                id : 'new session',
                name : user_id,
                maxAge : 5000,
                domain : 'example.com',
                expires : new Date(),
                authorized : true,
            }
            console.log('postLogin2 : ', req.session);
            // res.cookie('username', `${find.user_id}`, {
                
            //     // httpOnly : true,
            //     // secure : true,
            //     authorized : true
            // })

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