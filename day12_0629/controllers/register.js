const path = require('path');
const fs = require('fs');

const getRegister = (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'))
}

const getIdRegister = (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'))
    const {id} = req.params;
    const rows = fs.readFileSync(path.join(__dirname, 'model', 'users.json'));
    const users = JSON.parse(rows);

    const find = users.find(data=>data.id === Number(id));
    if (find){
        res.send({success : true, message : find})
    }else{
        res.send({success : true, message : '데이터를 찾을 수 없습니다.'})
    }
}

const getConfirm = (req, res)=>{
    res.send('register/confirm');
}

const postRegister = (req, res)=>{
    
    const newUser = req.body;
    const rows = fs.readFileSync(path.join(__dirname, '..', 'model', 'users.json'));
    const users = JSON.parse(rows);

    const find = users.find(data=>data.user_id === newUser.user_id);
    if(find){
        res.send({success : false, message : '이미 존재하는 아이디입니다.'})
    }else{
        const id = users[users.length - 1].id + 1;
        const inputUser = {id, ...newUser}; 
        console.log("newUser : ", inputUser);
        users.push(inputUser);
        fs.writeFileSync(path.join(__dirname, '..', 'model', 'users.json'),
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
}

const delRegister = (req, res)=>{
    try{
        const user = req.body;
        const rows = fs.readFileSync(path.join(__dirname, '..', 'model', 'users.json'));
        const users = JSON.parse(rows);

        const find = users.find(data=>data.user_id === user.user_id && data.user_pwd === user.user_pwd);
        if (!find){
            res.send({success : false, message : '사용자가 존재하지 않습니다'})
        }else{
            const index = users.indexOf(find);
            users.splice(index, 1); 

            fs.writeFileSync(
                path.join(__dirname, '..', 'model', 'users.json'),
                JSON.stringify(users, null, '    '),
                'utf-8',
                err=>console.log(err)
            );
            res.send({success : true, message : '삭제 되었습니다'})
        }
    }catch(err){
        console.log(err);
    }
}

const delParamRegister = (req, res)=>{
    try{
        const {id} = req.params;
        const rows = fs.readFileSync(path.join(__dirname, '..', 'model', 'users.json'));
        const users = JSON.parse(rows);

        const find = users.find(data=>data.id === Number(id));
        if (!find){
            res.send({success : false, message : '사용자가 존재하지 않습니다'})
        }else{
            const index = users.indexOf(find);
            users.splice(index, 1);

            fs.writeFileSync(
                path.join(__dirname, '..', 'model', 'users.json'),
                JSON.stringify(users, null, '    '),
                'utf-8',
                err=>console.log(err)
            );
            res.send({success : true, message : '삭제 되었습니다'})
        }
    }catch(err){
        console.log(err);
    } 
}

const putRegister = (req, res)=>{
    const user = req.body;
    const rows = fs.readFileSync(path.join(__dirname, '..', 'model', 'users.json'));
    const users = JSON.parse(rows);
    const find = users.find(data=>data.user_id === user.user_id);

    const newUser = {user_id: user.user_id, user_pwd : user.user_pwd ? user.user_pwd : find.user_pwd};
    const index = users.indexOf(find);
    find.user_pwd = user.user_pwd; 

    users.splice(index, 1, find);

    fs.writeFileSync(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(users, null, '    '),
        'utf-8',
        err=>console.log(err)
    );
    res.send({success : true, message : '수정 되었습니다'})
}

module.exports = {
    getRegister,
    getIdRegister,
    getConfirm,
    postRegister,
    delRegister,
    delParamRegister,
    putRegister,
}