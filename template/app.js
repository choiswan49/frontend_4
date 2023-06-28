/*
// 회원가입
/register/post
/register/get : confirm get
/register/confirm : post, get
/register/delete
/register/:id delete
/register/put
/register/:id put

// 로그인
/login/get
/login/post
/logout/get|post

// 장바구니, product
/product/:id get
/product/get/list
/product/post
/product/delete
/product/put
*/

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = 3000;

app.use('/', express.static('/public')); // 공유폴더 지정
app.use('/product', express.static(path.join(__dirname, '/model'))); // 공유폴더 지정
app.use(express.json()); // json 포맷 사용
app.use(express.urlencoded({extended:false})); // form 데이터 읽기

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})
app.get('/register', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'register.html'))
})
app.get('/register/:id', (req, res)=>{
    // 회원 정보 확인을 위해 내 정보를 보고 싶을 때 
    res.sendFile(path.join(__dirname, 'views', 'register.html'))
    const {id} = req.params; // url, body 등으로 전달받은 모든 데이터는 문자열
    const rows = fs.readFileSync(path.join(__dirname, 'model', 'users.json'));
    const users = JSON.parse(rows);

    const find = users.find(data=>data.id === Number(id));
    if (find){
        res.send({success : true, message : find})
    }else{
        res.send({success : true, message : '데이터를 찾을 수 없습니다.'})
    }
})
app.get('/register/confirm', (req, res)=>{})

app.post('/register', (req, res)=>{
    // err 제어 제외
    const newUser = req.body;
    const rows = fs.readFileSync(path.join(__dirname, 'model', 'users.json'));
    const users = JSON.parse(rows);

    // 기존 데이터에 중복되는 아이디 존재하는지 확인 후 
    // 존재하면 새로운 아이디로 유도 | 존재하지 않으면 가입
    const find = users.find(data=>data.user_id === newUser.user_id);
    if(find){
        res.send({success : false, message : '이미 존재하는 아이디입니다.'})
    }else{
        const id = users[users.length - 1].id + 1;
        // newUser.id = id; // id 속성을 맨 뒤에 추가
        const inputUser = {id, ...newUser}; // 맨 앞에 추가. 순서 상관 없음
        console.log("newUser : ", inputUser);
        users.push(inputUser);
        fs.writeFileSync(path.join(__dirname, 'model', 'users.json'),
            JSON.stringify(users, null, " "),
            'utf-8',
            err=>console.log(err)
        )
    
        const res_message = {
            success : 'ok',
            message : '회원가입 완료'
        }
        res.send(res_message);
    }

})
app.delete('/register', (req, res)=>{
    // id를 전달 받아서 id와 같은 데이터가 있다면 정상적으로 삭제
    // id를 전달 받아서 id와 같은 데이터가 없다면 err
    try{
        const user = req.body;
        const rows = fs.readFileSync(path.join(__dirname, 'model', 'users.json'));
        const users = JSON.parse(rows);

        const find = users.find(data=>data.user_id === user.user_id && data.user_pwd === user.user_pwd);
        if (!find){
            res.send({success : false, message : '사용자가 존재하지 않습니다'})
        }else{
            const index = users.indexOf(find);
            users.splice(index, 1); // 원본 수정, 리턴은 삭제된 값

            fs.writeFileSync(
                path.join(__dirname, 'model', 'users.json'),
                JSON.stringify(users, null, '    '),
                'utf-8',
                err=>console.log(err)
            );
            res.send({success : true, message : '삭제 되었습니다'})
        }
    }catch(err){
        console.log(err);
    }
});
app.delete('/register/:id', (req, res)=>{
    try{
        const {id} = req.params; // url, body 등으로 전달받은 모든 데이터는 문자열
        const rows = fs.readFileSync(path.join(__dirname, 'model', 'users.json'));
        const users = JSON.parse(rows);

        const find = users.find(data=>data.id === Number(id));
        if (!find){
            res.send({success : false, message : '사용자가 존재하지 않습니다'})
        }else{
            const index = users.indexOf(find);
            users.splice(index, 1);

            fs.writeFileSync(
                path.join(__dirname, 'model', 'users.json'),
                JSON.stringify(users, null, '    '),
                'utf-8',
                err=>console.log(err)
            );
            res.send({success : true, message : '삭제 되었습니다'})
        }
    }catch(err){
        console.log(err);
    } 
});
app.put('/register', (req, res)=>{
    // 수정할 데이터를 전달 받아서 찾아서 수정 후 새로 고침
    const user = req.body;
    const rows = fs.readFileSync(path.join(__dirname, 'model', 'users.json'));
    const users = JSON.parse(rows);
    // 수정할 수 없는 데이터 : user_id, 수정할 데이터 : user_pwd
    const find = users.find(data=>data.user_id === user.user_id);
    
    // if (!find) res.send({success : true, message : '아이디를 찾을 수 없습니다'})

    const newUser = {user_id: user.user_id, user_pwd : user.user_pwd ? user.user_pwd : find.user_pwd};
    // 수정할 데이터를 입력했다면 수정하고, 그렇지 않다면 원래 데이터를 입력 // 필요 x
    const index = users.indexOf(find);
    find.user_pwd = user.user_pwd;  // 데이터 수정

    const filter = users.filter(data=>data.user_id !== user.user_id);
    // filter.push(find); // 데이터 맨 아래 삽입 // id 번호를 발생시킬 때 중복 번호 생성 가능
    // filter.push(newUser); // 필요 x

    users.splice(index, 1, find); // 지운 위치에 새로 삽입


    fs.writeFileSync(
        path.join(__dirname, 'model', 'users.json'),
        JSON.stringify(users, null, '    '),
        'utf-8',
        err=>console.log(err)
    );
    res.send({success : true, message : '수정 되었습니다'})
});


 // 로그인 화면
app.get('/login', (req, res)=>{
    try{
        res.sendFile(path.join(__dirname, 'views', 'login.html'));
    }catch(err){
        console.log(err);
        res.status(500).send({success:false, message:'내부적 오류'})
    }
});

// 로그인 버튼 클릭 시
// db에 정보가 존재하면 로그인, 없으면 err
app.post('/login', (req, res)=>{
    const user = req.body;
    const {user_id, user_pwd} = req.body;
    try{
        const rows = fs.readFileSync(path.join(__dirname, 'model', 'users.json'));
        const users = JSON.parse(rows);

        const find = users.find(data=>data.user_id === user.user_id && data.user_pwd === user_pwd);
        if (find){
            res.send({success : true, message : user_id})
        }else{
            res.send({success : false, message : '사용자를 찾을 수 없습니다.'})
        }
    }catch(err){
        console.log(err);
        res.status(500).send({success:false, message:'내부적 오류'})
    }
});
app.post('/logout', (req, res)=>{});
// app.get('/logout', (req, res)=>{});
// 쿠키, 섹션 이용시 필요

app.get('/product', (req, res)=>{
    try{
        res.sendFile(path.join(__dirname, 'views', 'product.html'));
    }catch(err){
        console.log(err);
        res.status(500).send({success:false, message:'내부적 오류'})
    }
});
app.post('/product', (req, res)=>{});
app.delete('/product', (req, res)=>{});
app.put('/product', (req, res)=>{});

app.listen(PORT, ()=>{
    console.log('listening port ', PORT);
})