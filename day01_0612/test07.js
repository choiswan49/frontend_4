// module 가져오기
const {userName, user} = require('./module');
console.log(userName, user);

const {userName : un, user : u} = require('./module');
console.log(un, u);

// 만들어진 모듈 npm
// npm i data-fns