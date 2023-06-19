/*
const math = require('./modules/math');
// math = {add, sub}

console.log(math.add(1,2));
console.log(math.sub(11,2));
*/

const {add, sub} = require('./modules/math');
// 전개 연산자
// 필요한 속성만 꺼내올 수도 있고 순서도 상관 없음

console.log(add(50,100));
console.log(sub(150,100));

const {mod} = require('./modules/math');
console.log(mod(50,9));
// 필요한 기능만 꺼내기 가능