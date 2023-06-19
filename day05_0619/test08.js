const {v4:uuid} = require('uuid');
// Math.random() 난수 발생 모듈

for (let a=0; a < 10; a++){
    console.log(uuid());
    // log 유일화한 번호
}