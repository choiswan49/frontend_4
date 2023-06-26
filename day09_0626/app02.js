const exp = require('constants');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.set('PORT', 3000);
app.use((req, res, next)=>{
    console.log('method : ', req.method, ' url : ', req.url );
    next();
})

app.use(express.static(path.join(__dirname, 'views'))); // css, js 고유 폴더를 등록
app.use(express.static(path.join(__dirname, 'public'))); // css, js 고유 폴더를 등록
// public/script
// public/style
// public/images
// views/html
// model/data

app.use(express.json()); // json 형태 데이터를 처리하도록 해주는 미들웨어

app.get('/', (req,res)=>{
    console.log('1. get');
    // res.send('문자열');
    res.status(200).send('<h1>문자열</h1>')
    // res.send('<h1>문자열</h1>');

    // res.send(JSON.stringify({"first_name" : "swan"}));
    // res.json({"first_name" : "gildong"});
    // res.sendFile(path.join(__dirname, 'views', 'index.html')) 
})
app.get('/ha-swap', (req,res)=>{
    console.log('1. get');
    // css, js 못읽음
    res.sendFile(path.join(__dirname, 'views', 'ha_swap.html')) // html 처리
})

app.get('/subdir', (req, res)=>{
    res.sendFile(path.join(__dirname, 'subdir', 'index.html'))
})
// app.get('/model', (req, res)=>{
//     const users = require('./model/users.json')
//     res.json(users)
// })
app.get('/model', (req, res)=>{
    const users = fs.readFileSync('./model/users.json', "utf-8")
    res.send(users)
})

// localhost:3000/user/kim/test
app.get('/user/:user_id/:user_pwd', (req, res)=>{
    const user = req.params;
    //{"user_id": "kim"}
    //{"user_id": "kim", "user_pwd": "test"}
    res.send(user)
})

// localhost:3000/customer/kim/test
app.get('/customer/:user_id/:user_pwd', (req, res)=>{
    const {user_id, user_pwd} = req.params;
    res.send({user_id, user_pwd})
})

// localhost:3000/user
app.post('/', (req,res)=>{
    const user = {
        user_id : req.body.user_id,
        user_pwd : req.body.user_pwd
    }
    console.log(user);
    res.send(user)
})

app.post('/user', (req,res)=>{
    const user = req.body;
    console.log(user);
    res.send(user)
})


app.delete('/', (req,res)=>{
    const delUser = req.body;
    const response = fs.readFileSync('./model/users.json'); // 읽고
    const users = JSON.parse(response)
    const filter = users.filter(data=>data.user_id !== delUser.user_id); // 지우고

    // 쓰고
    fs.writeFileSync('./model/users.json', 
            JSON.stringify(filter, null, "  "),
            'utf-8',
            err=>console.log(err)
    )
    // 처리 결과 응답
    res.send({success: true, message: delUser.user_id + '삭제'})
})
app.put('/', (req,res)=>{
    console.log('4. put');
})

app.listen(app.get('PORT'), ()=>{
    console.log(`server running on port ${app.get('PORT')}`);
})