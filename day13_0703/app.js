const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cookieParser = require('cookie-parser');
const expiresSession = require('express-session');

const root = require('./routes/root');
const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');
const product = require('./routes/product');

app.use(cookieParser());

// getIndex()
app.use(expiresSession({
    name : 'Ko_SID',
    secret : 'my section password',
    resave : true,
    saveUninitialized : true,
    cookie : {
        brandname : 'korea',
        // maxAge : 1 * 10,
    }
}))
app.use('/', express.static('/public')); // 공유폴더 지정
app.use('/product', express.static(path.join(__dirname, '/model'))); // 공유폴더 지정

app.use(express.json()); // json 포맷 사용
app.use(express.urlencoded({extended:false})); // form 데이터 읽기

app.use('/', root); //localhost:3000/
app.use('/register', register); //localhost:3000/register
app.use('/login', login); //localhost:3000/login
app.use('/logout', logout); 
app.use('/product', product); //localhost:3000/product
// app.use('/sub', subProduct); //localhost:3000/sub

app.listen(PORT, ()=>{
    console.log('listening port ', PORT);
})