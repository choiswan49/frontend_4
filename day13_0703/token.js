// token 생성해서 암호화된 토큰으로 사용자 인증
// 2가지
// accesstoken : 로그인할 때, 아주 짧은 시간동안만 살아있도록
// refreshtoken : accesstoken을 갱신할 때
// npm i jsonwebtoken

const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const PORT = 3000;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
app.use(cookieParser());

app.use('/', express.static('/public')); // 공유폴더 지정
app.use('/product', express.static(path.join(__dirname, '/model'))); // 공유폴더 지정
app.use(express.json()); // json 포맷 사용
app.use(express.urlencoded({extended:false})); // form 데이터 읽기

app.post('/login', (req, res)=>{
    const {user_id, user_pwd} = req.body;

    const rows = fs.readFileSync(path.join(__dirname, '.', 'model', 'users.json'));
    const users = JSON.parse(rows);

    const find = users.find(data=>data.user_id === user_id && data.user_pwd === user_pwd );
    // console.log(find);

    if (!find){
        res.send({success : false, message : '사용자를 찾을 수 없습니다.'})
    }else{
        try{
            const accesstoken = jwt.sign({
                    user_id : find.user_id,
                    user_pwd : find.user_pwd
                },
                'accesstoken_pwd',
                {
                    expiresIn : '10s',
                    issuer : 'choiswan'
                }
            )
            res.cookie('AccessToken', accesstoken, {
                secure : false,
                httpOnly : true
            })
            const refreshtoken = jwt.sign({
                    user_id : find.user_id,
                    user_pwd : find.user_pwd
                },
                'refreshtoken_pwd',
                {
                    expiresIn : '24h',
                    issuer : 'choiswan'
                }
            )
            res.cookie('RefreshToken', refreshtoken, {
                secure : false,
                httpOnly : true
            })
            res.send({success : true, message : '로그인'});
        }catch(err){
            console.log(err);
            res.status(500).send({success : false, message : '사용자를 확인할 수 없습니다'})
        }
    }
})
app.get('/access', (req, res)=>{
    const token = req.cookies.AccessToken;
    res.cookie('AccessToken', ''); // 지우는 방법 (or res.clearCookie)
    console.log(token);
})

app.listen(PORT, ()=>{
    console.log('listening port ', PORT);
})