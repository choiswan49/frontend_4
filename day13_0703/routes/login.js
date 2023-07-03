const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const {
    getLogin,
    postLogin
} = require('../controllers/login')

// 로그인 화면
router.get('/', getLogin);

// 로그인 버튼 클릭 시
// db에 정보가 존재하면 로그인, 없으면 err
router.post('/', postLogin);

module.exports = router;